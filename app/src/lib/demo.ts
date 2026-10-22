export type LeadRole = 'investor' | 'project_owner' | 'supplier';
export type ContactMethod = 'phone' | 'email' | 'telegram';
export interface DemoLead {
  role: LeadRole; projectId?: string; fullName: string; contactMethod: ContactMethod;
  contact: string; company: string; description: string; consentAccepted: boolean;
}
export type Errors = Partial<Record<'fullName' | 'contact' | 'consentAccepted', string>>;
export function validateLead(lead: DemoLead): Errors {
  const errors: Errors = {};
  if (!lead.fullName.trim()) errors.fullName = 'Укажите ФИО.';
  const contact = lead.contact.trim();
  if (!contact) errors.contact = 'Укажите контакт выбранного типа.';
  else if (lead.contactMethod === 'phone' && (!/^\+?[\d\s().-]+$/.test(contact) || !/^[1-9]\d{6,14}$/.test(contact.replace(/\D/g, '')))) errors.contact = 'Проверьте номер телефона.';
  else if (lead.contactMethod === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) errors.contact = 'Проверьте адрес электронной почты.';
  else if (lead.contactMethod === 'telegram' && !/^@[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(contact)) errors.contact = 'Укажите имя пользователя Telegram в формате @username.';
  if (!lead.consentAccepted) errors.consentAccepted = 'Подтвердите ознакомление с проектом согласия.';
  return errors;
}
/** Local demonstration only. Never persists, logs or transmits the payload. */
export async function submitDemoLead(lead: DemoLead, options: { forceError?: boolean; delayMs?: number } = {}): Promise<{ status: 'demo-success' }> {
  if (Object.keys(validateLead(lead)).length) throw new Error('validation');
  await new Promise(resolve => setTimeout(resolve, options.delayMs ?? 600));
  if (options.forceError) throw new Error('demo-error');
  return { status: 'demo-success' };
}
