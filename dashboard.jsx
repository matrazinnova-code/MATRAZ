/* Dashboard */
function Sparkline({ points, w = 130, h = 60, gradientId = "spark-g" }) {
  const max = Math.max(...points), min = Math.min(...points);
  const dx = w / (points.length - 1);
  const norm = (v) => h - 4 - ((v - min) / (max - min || 1)) * (h - 12);
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * dx} ${norm(p)}`).join(' ');
  const area = `${d} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg className="kpi-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00D4AA" />
          <stop offset="100%" stopColor="#7B5FFF" />
        </linearGradient>
        <linearGradient id={gradientId + '-f'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#7B5FFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId}-f)`} />
      <path d={d} fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.8" />
    </svg>
  );
}

function Kpi({ label, value, delta, deltaLabel, icon, points, gradientId }) {
  const up = delta >= 0;
  return (
    <div className="card kpi">
      <div className="kpi-label">
        <span className="kpi-icon">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="kpi-value">{value}</div>
      <div className={"kpi-delta " + (up ? "up" : "down")}>
        {up ? <IcArrowUp size={12} /> : <IcArrowDown size={12} />}
        {Math.abs(delta).toFixed(1)}%
        <span className="muted">{deltaLabel}</span>
      </div>
      <Sparkline points={points} gradientId={gradientId} />
    </div>
  );
}

/* Stacked area-line chart */
function RevenueChart() {
  const W = 760, H = 240, P = 28;
  const months = REVENUE_SERIES.months;
  const hc = REVENUE_SERIES.healthcare;
  const it = REVENUE_SERIES.it;
  const bz = REVENUE_SERIES.business;
  const totals = hc.map((_, i) => hc[i] + it[i] + bz[i]);
  const max = Math.max(...totals) * 1.12;
  const min = 0;
  const dx = (W - P * 2) / (months.length - 1);
  const ny = (v) => H - P - ((v - min) / (max - min)) * (H - P * 2);
  const linePts = totals.map((v, i) => `${P + i * dx},${ny(v)}`);
  const linePath = linePts.map((p, i) => (i === 0 ? 'M' : 'L') + p).join(' ');
  const areaPath = `${linePath} L ${P + (months.length - 1) * dx} ${H - P} L ${P} ${H - P} Z`;

  // y-axis ticks
  const ticks = [0, 0.25, 0.5, 0.75, 1].map(t => Math.round(max * t));

  return (
    <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="line-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00D4AA" />
          <stop offset="100%" stopColor="#7B5FFF" />
        </linearGradient>
        <linearGradient id="line-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#7B5FFF" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={P} x2={W - P} y1={ny(t)} y2={ny(t)} stroke="#2A2A30" strokeDasharray="2 4" strokeWidth="1" />
          <text x={6} y={ny(t) + 4} fill="#6A6A70" fontSize="10" fontFamily="JetBrains Mono">€{t}K</text>
        </g>
      ))}
      <path d={areaPath} fill="url(#line-fill)" />
      <path d={linePath} fill="none" stroke="url(#line-stroke)" strokeWidth="2.2" />
      {totals.map((v, i) => {
        const cx = P + i * dx, cy = ny(v);
        const isLast = i === totals.length - 1;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={isLast ? 5 : 3} fill="#0A0A0B"
                    stroke={isLast ? "#00D4AA" : "#7B5FFF"} strokeWidth={isLast ? 2.2 : 1.5} />
            {isLast && (
              <g>
                <rect x={cx - 56} y={cy - 38} width={48} height={22} rx={5} fill="#1A1A1E" stroke="#00D4AA" strokeWidth="1" />
                <text x={cx - 32} y={cy - 23} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600" fontFamily="JetBrains Mono">€{v}K</text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Donut() {
  const data = [
    { label: 'Healthcare', value: 1.42, color: '#00B4D8' },
    { label: 'IT',         value: 0.98, color: '#7B5FFF' },
    { label: 'Business',   value: 0.62, color: '#C0C0C8' },
  ];
  const total = data.reduce((s, d) => s + d.value, 0);
  const R = 64, C = 84, sw = 16;
  let acc = 0;
  const circ = 2 * Math.PI * R;
  return (
    <div className="donut-row">
      <div style={{ position: 'relative', width: 168, height: 168 }}>
        <svg className="donut-svg" viewBox="0 0 168 168">
          <circle cx={C} cy={C} r={R} fill="none" stroke="#22222A" strokeWidth={sw} />
          {data.map((d, i) => {
            const len = (d.value / total) * circ;
            const dash = `${len} ${circ - len}`;
            const seg = (
              <circle key={i} cx={C} cy={C} r={R} fill="none"
                stroke={d.color} strokeWidth={sw}
                strokeDasharray={dash}
                strokeDashoffset={-acc}
                transform="rotate(-90 84 84)"
                strokeLinecap="butt" />
            );
            acc += len;
            return seg;
          })}
        </svg>
        <div className="donut-center" style={{ inset: 0, display: 'grid', placeItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Pipeline</div>
            <div className="gradient-text" style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 4 }}>€3.02M</div>
          </div>
        </div>
      </div>
      <div className="donut-list">
        {data.map(d => (
          <div key={d.label} className="donut-item">
            <span className="donut-swatch" style={{ background: d.color }} />
            <span className="donut-name">{d.label}</span>
            <span className="donut-pct">{Math.round((d.value / total) * 100)}%</span>
            <span style={{ width: 60, textAlign: 'right' }} className="donut-val">€{d.value.toFixed(2)}M</span>
          </div>
        ))}
        <div style={{ marginTop: 4, paddingTop: 12, borderTop: '1px solid var(--border-soft)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)' }}>
          <span>Deals activos</span><span style={{ color: '#fff', fontWeight: 600 }}>34</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)' }}>
          <span>Ticket promedio</span><span style={{ color: '#fff', fontWeight: 600 }}>€88.7K</span>
        </div>
      </div>
    </div>
  );
}

function ActivityFeed() {
  const icons = {
    call: <IcPhone size={16} />,
    email: <IcMail size={16} />,
    meeting: <IcVideo size={16} />,
    note: <IcDoc size={16} />,
    task: <IcCheck size={16} />,
    doc: <IcDoc size={16} />,
    star: <IcSparkle size={16} />,
    video: <IcVideo size={16} />,
    message: <IcMessage size={16} />,
  };
  return (
    <div className="activity-list">
      {UPCOMING.map(u => (
        <div className="activity-item" key={u.id}>
          <div className="activity-ico">{icons[u.kind]}</div>
          <div>
            <div className="activity-title">{u.title}</div>
            <div className="activity-meta">{u.meta}</div>
          </div>
          <div className="activity-time">›</div>
        </div>
      ))}
    </div>
  );
}

function Dashboard({ goto }) {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Buenas tardes, Iván <span style={{ display: 'inline-block', transform: 'translateY(-2px)' }}>👋</span></div>
          <div className="page-subtitle">Tu pipeline cerró la semana con <b style={{ color: 'var(--teal)' }}>+18.4%</b> vs. el plan trimestral · Vista <b style={{ color: '#fff' }}>Q2 2026</b></div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn ghost"><IcCalendar size={15} /> Últimos 90 días <IcChevDown size={13} /></button>
          <button className="btn primary" onClick={() => goto('new-deal')}><IcPlus size={15} /> Nuevo deal</button>
        </div>
      </div>

      <div className="kpi-grid">
        <Kpi label="Revenue total"     value="€2.84M"  delta={18.4}  deltaLabel="vs. trimestre anterior"  icon={<IcWallet size={16} />} points={[18,22,21,28,27,32,36,38,44,49,53,58]} gradientId="sp1" />
        <Kpi label="Deals activos"     value="34"      delta={12.0}  deltaLabel="este trimestre"          icon={<IcBrief size={16} />}  points={[12,14,15,13,18,20,22,24,26,28,32,34]} gradientId="sp2" />
        <Kpi label="Tasa de cierre"    value="42.7%"   delta={3.2}   deltaLabel="vs. media histórica"     icon={<IcTarget size={16} />} points={[28,29,32,30,33,34,36,37,38,39,41,43]} gradientId="sp3" />
        <Kpi label="Próximas actividades" value="8"    delta={-4.5}  deltaLabel="vs. semana anterior"     icon={<IcClock size={16} />}  points={[14,13,12,11,12,10,11,9,10,9,8,8]} gradientId="sp4" />
      </div>

      <div className="row-2">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Revenue cerrado · 2026</div>
              <div className="card-sub">Distribución mensual por vertical · gradiente teal → violet</div>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#00B4D8' }} /> Healthcare</div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#7B5FFF' }} /> IT</div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#C0C0C8' }} /> Business</div>
            </div>
          </div>
          <div className="chart-wrap">
            <RevenueChart />
            <div className="chart-x">
              {REVENUE_SERIES.months.map(m => <span key={m}>{m}</span>)}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Mix de pipeline</div>
              <div className="card-sub">Por vertical · valor en curso</div>
            </div>
            <button className="icon-btn" style={{ width: 32, height: 32 }}><IcMore size={16} /></button>
          </div>
          <div className="donut-wrap">
            <Donut />
          </div>
        </div>
      </div>

      <div className="row-2b">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Próximas actividades</div>
              <div className="card-sub">8 elementos en las próximas 2 semanas</div>
            </div>
            <button className="btn ghost" style={{ height: 32, padding: '0 12px', fontSize: 12 }}>Ver agenda</button>
          </div>
          <ActivityFeed />
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Top deals abiertos</div>
              <div className="card-sub">Mayor valor · probabilidad ponderada</div>
            </div>
            <button className="btn ghost" style={{ height: 32, padding: '0 12px', fontSize: 12 }}>Ver pipeline</button>
          </div>
          <div>
            {TOP_DEALS.map((d, i) => (
              <div className="deal-row" key={i}>
                <div>
                  <div className="deal-name">{d.name}</div>
                  <div className="deal-co">
                    <span className={"badge " + d.vertical} style={{ marginRight: 8 }}>
                      <span className="badge-dot" style={{ background: VERTICALS[d.vertical].color }} />
                      {VERTICALS[d.vertical].label}
                    </span>
                    {d.company}
                  </div>
                </div>
                <div className="deal-bar"><i style={{ width: d.progress + '%' }} /></div>
                <div className="deal-val">€{(d.value / 1000).toFixed(0)}K</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;
