export function EnergyDiagram({ compact = false }: { compact?: boolean }) {
  return <div className={`energy-visual ${compact ? 'compact' : ''}`}>
    <svg viewBox="0 0 560 460" role="img" aria-label="Концептуальная схема: энергоцентр с газопоршневой установкой связывает инвестора, поставщика и потребителя энергии">
      <defs>
        <pattern id={compact ? 'grid-small' : 'grid'} width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#ccd5dd" strokeWidth=".6" /></pattern>
        <linearGradient id={compact ? 'roof-small' : 'roof'} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#c4d0da"/></linearGradient>
      </defs>
      <rect width="560" height="460" fill={`url(#${compact ? 'grid-small' : 'grid'})`} opacity=".65" />
      <g fill="none" stroke="#9aaebb" strokeWidth="1.3" strokeDasharray="4 6">
        <path d="M280 78V134M280 352v38H114v-35M425 303h66V161h-38M132 269H70V161h46"/>
        <ellipse cx="280" cy="280" rx="225" ry="110"/>
      </g>
      <g stroke="#8298a9" strokeWidth="1.2" strokeLinejoin="round">
        <path d="m91 299 192-102 199 97-189 111Z" fill="#d8e1e7"/>
        <path d="M91 299v12l202 107v-13Z" fill="#b8c8d5"/>
        <path d="m293 405 189-111v12L293 418Z" fill="#9db3c4"/>
        <path d="m147 226 135-70 143 72-132 75Z" fill={`url(#${compact ? 'roof-small' : 'roof'})`}/>
        <path d="M147 226v91l146 77v-91Z" fill="#e9eef2"/>
        <path d="m293 303 132-75v91l-132 75Z" fill="#b4c7d5"/>
        <path d="m160 229 120-62 129 64-116 65Z" fill="#edf2f4"/>
        <path d="m169 235 110-57M189 245l110-57M210 255l110-57M231 266l110-57M252 276l110-57M273 287l110-57" stroke="#becbd6"/>
        <path d="m162 255 26 14v48l-26-14ZM198 274l26 14v48l-26-14ZM234 293l26 14v48l-26-14Z" fill="#173852"/>
        <path d="m166 264 18 10m-18-2 18 10m-18-2 18 10m-18-2 18 10m18-17 18 10m-18-2 18 10m-18-2 18 10m-18-2 18 10m18-17 18 10m-18-2 18 10m-18-2 18 10m-18-2 18 10" stroke="#7796aa"/>
        <path d="m308 313 37-21v60l-37 21Z" fill="#183a54"/>
        <path d="m358 285 51-29v29l-51 29Z" fill="#f2a900"/>
        <path d="M371 278v29m13-36v29m13-37v29" stroke="#9f720b"/>
        <path d="m340 179 11-6v-65l-11 6Z" fill="#8fa6b7"/>
        <path d="m330 174 10 5v-65l-10-5Z" fill="#dce6ec"/>
        <path d="m330 109 11-6 10 5-11 6Z" fill="#183a54"/>
        <path d="m362 190 11-6v-65l-11 6Z" fill="#8fa6b7"/>
        <path d="m352 185 10 5v-65l-10-5Z" fill="#dce6ec"/>
        <path d="m352 120 11-6 10 5-11 6Z" fill="#183a54"/>
      </g>
      <path d="m111 330 83 44m133 14 81-47" stroke="#f2a900" strokeWidth="5" strokeLinecap="round"/>
      <g fill="#0b1f3a" fontFamily="Segoe UI, sans-serif" fontSize="12" fontWeight="600">
        <rect x="211" y="35" width="138" height="45" rx="5" fill="#0b1f3a"/><text x="280" y="63" textAnchor="middle" fill="white">Инвестор</text>
        <rect x="18" y="116" width="155" height="47" rx="5" fill="white" stroke="#c8d3dd"/><circle cx="36" cy="140" r="4" fill="#f2a900"/><text x="50" y="144">Поставщик ГПУ</text>
        <rect x="378" y="116" width="165" height="47" rx="5" fill="white" stroke="#c8d3dd"/><circle cx="395" cy="140" r="4" fill="#f2a900"/><text x="408" y="137">Площадка</text><text x="408" y="153" fontSize="10" fontWeight="400">и потребитель энергии</text>
        <rect x="36" y="343" width="154" height="43" rx="5" fill="white" stroke="#c8d3dd"/><text x="113" y="369" textAnchor="middle">Команда платформы</text>
      </g>
      <g fill="#f2a900" stroke="white" strokeWidth="2"><circle cx="280" cy="95" r="5"/><circle cx="70" cy="243" r="5"/><circle cx="491" cy="243" r="5"/></g>
    </svg>
    <div className="diagram-caption"><span className="diagram-mark" aria-hidden="true">↗</span><span>Газопоршневая генерация<br/><small>Концептуальная схема взаимодействия</small></span></div>
  </div>;
}
