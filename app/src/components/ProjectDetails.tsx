import { useRef, useState, type KeyboardEvent } from 'react';
import { content, project } from '../content';

export function ProjectDetails({ requestMaterials }: { requestMaterials: () => void }) {
  const [tab, setTab] = useState('parameters');
  const tabs = useRef<HTMLDivElement>(null);
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = project.tabs.findIndex(item => item.id === tab);
    const next = event.key === 'ArrowRight' ? (index + 1) % 4 : event.key === 'ArrowLeft' ? (index + 3) % 4 : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : -1;
    if (next < 0) return;
    event.preventDefault(); setTab(project.tabs[next].id); tabs.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }
  return <>
    <p className="notice">Демонстрационный пример. Параметры не подтверждены</p>
    <div className="tabs" role="tablist" aria-label="Подробности проекта" ref={tabs} onKeyDown={onKeyDown}>{project.tabs.map(item => <button key={item.id} id={`tab-${item.id}`} type="button" role="tab" aria-selected={tab === item.id} aria-controls={`panel-${item.id}`} tabIndex={tab === item.id ? 0 : -1} onClick={() => setTab(item.id)}>{item.label}</button>)}</div>
    <div className="tab-panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0}>
      {tab === 'parameters' && <><h3>Исходные параметры</h3><dl className="parameter-list"><div><dt>{project.presentation.amountLabel}</dt><dd>{project.presentation.amountValue} {project.presentation.amountUnit}</dd></div><div><dt>{project.presentation.paybackLabel}</dt><dd>≈ {project.presentation.paybackValue} {project.presentation.paybackUnit}</dd></div><div><dt>Мощность, регион, поставщик</dt><dd>Не предоставлено</dd></div></dl><p>{project.display.paybackNote}</p><p>{project.display.ownership}</p><p className="muted">Состав суммы, модель расчёта, учёт комиссии и расходов не подтверждены.</p></>}
      {tab === 'readiness' && <div className="verification-list">{project.verification.map(check => <article key={check.key} className="verification"><div className="verification-title"><h3>{check.title}</h3><span className="small-tag">{check.displayStatus}</span></div><p>{check.display}.</p><dl><div><dt>Тип проверки</dt><dd>{check.title}</dd></div><div><dt>Дата</dt><dd>{check.checkedAt ?? 'Не предоставлено'}</dd></div><div><dt>Источник / документ</dt><dd>{check.evidence ?? 'Не предоставлено'}</dd></div><div><dt>Область проверки</dt><dd>{check.scope}</dd></div><div><dt>Что остаётся открытым</dt><dd>{check.openQuestions}</dd></div></dl></article>)}</div>}
      {tab === 'economics' && <><h3>Расчётная доходность — после подготовки модели</h3><p>{project.display.yield}</p><p>{content.sections.economics.investorResult}</p><p>{content.sections.economics.commission.display}</p><p>Для расчёта необходимы метрика, период, сценарий, дата и версия модели, состав расходов, учёт комиссии и налогов. Обслуживание, ремонты, оборотные средства и финансирование также должны быть учтены.</p><p className="notice">{content.sections.economics.chart.emptyText}</p></>}
      {tab === 'materials' && <div className="empty-state"><span className="document-symbol" aria-hidden="true">▤</span><h3>Документы проекта</h3><p>{project.materials.emptyText}</p><button className="button primary" onClick={requestMaterials}>Запросить материалы <span aria-hidden="true">↗</span></button></div>}
    </div>
    <p className="detail-footnote">{project.display.detailNote}</p>
  </>;
}
