import { useRef, useState, type FormEvent } from 'react';
import { content, project, type LeadRole } from '../content';
import { submitDemoLead, validateLead, type DemoLead, type Errors, type ContactMethod } from '../lib/demo';

export function LeadForm({ role, projectId, openConsent }: { role: LeadRole; projectId?: string; openConsent: () => void }) {
  const copy = content.forms.roles[role], common = content.forms.common;
  const [lead, setLead] = useState<DemoLead>({ role, projectId, fullName: '', contactMethod: 'phone', contact: '', company: '', description: '', consentAccepted: false });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'input' | 'loading' | 'error' | 'success'>('input');
  const form = useRef<HTMLFormElement>(null);
  const update = <K extends keyof DemoLead>(key: K, value: DemoLead[K]) => {
    setLead(old => ({ ...old, [key]: value }));
    setErrors(old => ({ ...old, [key]: undefined }));
  };
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (state === 'loading') return;
    const nextErrors = validateLead(lead);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setState('loading');
    try { await submitDemoLead(lead); setState('success'); setLead(old => ({ ...old, fullName: '', contact: '', company: '', description: '', consentAccepted: false })); }
    catch { setState('error'); }
  }
  return <>
    <p className="modal-description">{copy.description}</p>
    <p className="notice">{content.forms.banner}</p>
    {state === 'success' ? <div className="success-state" role="status" tabIndex={-1} ref={node => node?.focus()}><span className="success-icon" aria-hidden="true">✓</span><h3>{common.successTitle}</h3><p>{common.successMessage}</p></div> :
      <form ref={form} onSubmit={submit} noValidate aria-busy={state === 'loading'}>
        <fieldset disabled={state === 'loading'} className="form-fields">
          {role === 'investor' && <label>Интересующий проект<select value={lead.projectId ?? ''} onChange={event => update('projectId', event.target.value || undefined)}><option value="">Обсудить участие в платформе</option><option value={project.id}>{project.title}</option></select></label>}
          <label htmlFor="fullName">{common.fullNameLabel}<input id="fullName" name="fullName" autoComplete="off" maxLength={150} placeholder={common.fullNamePlaceholder} value={lead.fullName} onChange={event => update('fullName', event.target.value)} aria-required="true" aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? 'name-error' : undefined}/></label>
          {errors.fullName && <p id="name-error" className="field-error" role="alert">{errors.fullName}</p>}
          <div className="form-row"><label htmlFor="method">{common.contactTypeLabel}<select id="method" value={lead.contactMethod} onChange={event => { setLead(old => ({ ...old, contactMethod: event.target.value as ContactMethod, contact: '' })); setErrors(old => ({ ...old, contact: undefined })); }}>{common.contactTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}</select></label>
            <label htmlFor="contact">{lead.contactMethod === 'phone' ? common.phoneLabel : lead.contactMethod === 'email' ? common.emailLabel : 'Telegram'}<input id="contact" name="contact" type={lead.contactMethod === 'phone' ? 'tel' : lead.contactMethod === 'email' ? 'email' : 'text'} autoComplete="off" maxLength={160} placeholder={lead.contactMethod === 'phone' ? common.phonePlaceholder : lead.contactMethod === 'email' ? common.emailPlaceholder : common.telegramPlaceholder} value={lead.contact} onChange={event => update('contact', event.target.value)} aria-required="true" aria-invalid={!!errors.contact} aria-describedby={errors.contact ? 'contact-error' : undefined}/></label></div>
          {errors.contact && <p id="contact-error" className="field-error" role="alert">{errors.contact}</p>}
          <label htmlFor="company">{common.companyLabel} <span className="optional">— необязательно</span><input id="company" value={lead.company} autoComplete="off" maxLength={200} onChange={event => update('company', event.target.value)}/></label>
          <label htmlFor="description">{common.descriptionLabel} <span className="optional">— необязательно</span><textarea id="description" rows={3} maxLength={2000} placeholder={copy.descriptionPlaceholder} value={lead.description} onChange={event => update('description', event.target.value)}/></label>
          <label className="checkbox-label"><input type="checkbox" checked={lead.consentAccepted} onChange={event => update('consentAccepted', event.target.checked)} aria-required="true" aria-invalid={!!errors.consentAccepted} aria-describedby="consent-hint consent-error"/>{common.consentLabel}</label>
          <div className="consent-details"><button type="button" className="text-link" onClick={openConsent}>Проект согласия</button><span className="small-tag">Демонстрационный текст</span><p id="consent-hint">{common.consentDemoHint}</p></div>
          <p id="consent-error" className="field-error" role={errors.consentAccepted ? 'alert' : undefined}>{errors.consentAccepted}</p>
          {state === 'error' && <p role="alert" className="field-error">{common.errorMessage}</p>}
          <button className="button primary form-submit" type="submit">{state === 'loading' ? common.loadingLabel : state === 'error' ? common.retryLabel : copy.submitLabel}<span aria-hidden="true">↗</span></button>
        </fieldset>
      </form>}
  </>;
}
