const MONTHS = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']

interface RevenueChartProps {
  healthcare: number[]
  it: number[]
  business: number[]
}

export default function RevenueChart({ healthcare, it, business }: RevenueChartProps) {
  const W = 760, H = 240, P = 28
  const totals = healthcare.map((_, i) => healthcare[i] + it[i] + business[i])
  const max = Math.max(...totals) * 1.12
  const dx = (W - P * 2) / (MONTHS.length - 1)
  const ny = (v: number) => H - P - (v / max) * (H - P * 2)

  const linePts = totals.map((v, i) => `${P + i * dx},${ny(v)}`)
  const linePath = linePts.map((p, i) => (i === 0 ? 'M' : 'L') + p).join(' ')
  const areaPath = `${linePath} L ${P + (MONTHS.length - 1) * dx} ${H - P} L ${P} ${H - P} Z`

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(max * t))

  return (
    <div>
      <div style={{ display: 'flex', gap: 18, marginBottom: 8, padding: '0 6px' }}>
        {[
          { color: '#00B4D8', label: 'Healthcare' },
          { color: '#7B5FFF', label: 'IT' },
          { color: '#C0C0C8', label: 'Business' },
        ].map((l) => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: l.color, display: 'inline-block' }} />
            {l.label}
          </div>
        ))}
      </div>
      <svg
        width="100%"
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        style={{ display: 'block' }}
      >
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
            <text x={6} y={ny(t) + 4} fill="#6A6A70" fontSize="10" fontFamily="JetBrains Mono, monospace">
              €{t}K
            </text>
          </g>
        ))}
        <path d={areaPath} fill="url(#line-fill)" />
        <path d={linePath} fill="none" stroke="url(#line-stroke)" strokeWidth="2.2" />
        {totals.map((v, i) => {
          const cx = P + i * dx
          const cy = ny(v)
          const isLast = i === totals.length - 1
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={isLast ? 5 : 3} fill="#0A0A0B"
                stroke={isLast ? '#00D4AA' : '#7B5FFF'} strokeWidth={isLast ? 2.2 : 1.5} />
              {isLast && (
                <g>
                  <rect x={cx - 56} y={cy - 38} width={48} height={22} rx={5} fill="#1A1A1E" stroke="#00D4AA" strokeWidth="1" />
                  <text x={cx - 32} y={cy - 23} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600" fontFamily="JetBrains Mono, monospace">
                    €{v}K
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 6px 14px' }}>
        {MONTHS.map((m) => (
          <span key={m} style={{ font: '500 11px/1 JetBrains Mono, monospace', color: 'var(--muted-2)' }}>{m}</span>
        ))}
      </div>
    </div>
  )
}
