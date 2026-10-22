import brief from './brief.json';

export const content = brief;
export type LeadRole = 'investor' | 'project_owner' | 'supplier';
export const project = {
  ...brief.projects[0],
  presentation: {
    amountValue: new Intl.NumberFormat('ru-RU').format(brief.projects[0].sourceFacts.amountRub / 1_000_000),
    amountUnit: 'млн ₽',
    amountLabel: 'Предварительная сумма из брифа',
    paybackValue: new Intl.NumberFormat('ru-RU').format(brief.projects[0].sourceFacts.paybackYears),
    paybackUnit: 'года',
    paybackLabel: 'Ориентир из брифа, требует проверки по модели',
  },
  returnMetric: { ...brief.projects[0].returnMetric, metricName: null, scenario: null, modelDate: null, modelVersion: null, expenses: null, taxesIncluded: null },
  verification: brief.projects[0].verification.map((item, index) => ({
    ...item, status: 'not_provided',
    scope: ['Первичная техническая и экономическая оценка', 'Комплектация, поставка и сервис', 'Площадка, потребление и контрагент', 'Состав актива, права и обязательства'][index],
    openQuestions: ['Исходные данные, методика расчёта, состав расходов и комиссия', 'Предложение поставщика, сроки, условия поставки и обслуживания', 'Потребитель, режим работы, доступность газа и условия покупки энергии', 'Форма приобретения, передача прав, назначение и стороны договоров'][index],
  })),
};
export const roleNames: Record<LeadRole, string> = { investor: 'Инвестор', project_owner: 'Площадка или проект', supplier: 'Поставщик' };
export const cashflowSteps = ['Приобретение проекта', 'Эксплуатационные поступления', 'Расходы и комиссия', 'Денежный поток инвестора'];
export const commissionText = 'Платформа получает комиссию за согласованные услуги. Размер, база расчёта, плательщик и момент оплаты раскрываются в условиях конкретного проекта';
export const expertiseRoles = [
  { title: 'Платформа', text: 'Собирает исходные данные, организует предварительную оценку, взаимодействие сторон и подготовку материалов. Сопровождает согласованные этапы.' },
  { title: 'Поставщик ГПУ', text: 'Прорабатывает техническое решение, комплектацию, условия поставки и сервиса. Подтверждает свои обязательства документами.' },
  { title: 'Инвестор', text: 'Изучает расчёты, риски, договоры и состав приобретаемых прав. Принимает решение о приобретении проекта.' },
];
