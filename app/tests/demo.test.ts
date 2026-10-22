import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { submitDemoLead, validateLead, type DemoLead } from '../src/lib/demo.ts';

const valid: DemoLead = { role: 'investor', projectId: 'industrial-energy-center', fullName: 'Тестовый пользователь', contactMethod: 'phone', contact: '+44 20 7946 0958', company: '', description: '', consentAccepted: true };
test('required fields and unchecked consent produce explicit errors', () => {
  assert.deepEqual(Object.keys(validateLead({ ...valid, fullName: ' ', contact: '', consentAccepted: false })), ['fullName', 'contact', 'consentAccepted']);
});
test('international phones, email and Telegram validate only selected channel', () => {
  for (const contact of ['+44 20 7946 0958', '+7 (999) 123-45-67', '+1 202-555-0123']) assert.deepEqual(validateLead({ ...valid, contact }), {});
  assert.deepEqual(validateLead({ ...valid, contactMethod: 'email', contact: 'test@example.org' }), {});
  assert.deepEqual(validateLead({ ...valid, contactMethod: 'telegram', contact: '@test_user' }), {});
  for (const [contactMethod, contact] of [['phone', '+7 letters 1234567'], ['phone', '123'], ['email', 'not-an-email'], ['telegram', 'username'], ['telegram', '@ab']] as const) assert.ok(validateLead({ ...valid, contactMethod, contact }).contact);
});
test('all three roles complete only as demo-success without mutating payload', async () => {
  for (const role of ['investor', 'project_owner', 'supplier'] as const) {
    const payload = { ...valid, role };
    const snapshot = structuredClone(payload);
    assert.deepEqual(await submitDemoLead(payload, { delayMs: 0 }), { status: 'demo-success' });
    assert.deepEqual(payload, snapshot);
  }
});
test('deterministic local error remains an error; explicit retry succeeds', async () => {
  await assert.rejects(submitDemoLead(valid, { forceError: true, delayMs: 0 }), /demo-error/);
  assert.deepEqual(await submitDemoLead(valid, { delayMs: 0 }), { status: 'demo-success' });
  await assert.rejects(submitDemoLead({ ...valid, consentAccepted: false }, { delayMs: 0 }), /validation/);
});
test('unconfirmed financial data and evidence remain null', () => {
  const data = JSON.parse(readFileSync(new URL('../src/content/brief.json', import.meta.url), 'utf8').replace(/^\uFEFF/, ''));
  assert.equal(data.projects.length, 1);
  assert.equal(data.projects[0].returnMetric.valuePercent, null);
  assert.equal(data.projects[0].interpretation.commissionIncluded, null);
  assert.equal(data.regulatoryStatus.registerEntry, null);
  assert.equal(data.sections.economics.commission.ratePercent, null);
  for (const check of data.projects[0].verification) {
    assert.equal(check.evidence, null); assert.equal(check.checkedAt, null); assert.equal(check.displayStatus, 'Не предоставлено');
  }
});
