interface DonutData {
  label: string
  value: number
  color: string
}

export default function PipelineDonut({ data, total }: { data: DonutData[]; total: number }) {
  const totalVal = data.reduce((s, d) => s + d.value, 0)
  const R = 64, C = 84, sw = 16
  const circ = 2 * Math.PI * R
  let acc = 0

  const totalM = (total / 1_000_000).toFixed(2)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
      <div style={{ position: 'relative', width: 168, height: 168, flexShrink: 0 }}>
        <svg width="168" height="168" viewBox="0 0 168 168">
          <circle cx={C} cy={C} r={R} fill="none" stroke="#22222A" strokeWidth={sw} />
          {data.map((d, i) => {
            const len = totalVal > 0 ? (d.value / totalVal) * circ : 0
            const dash = `${len} ${circ - len}`
            const el = (
              <circle
                key={i}
                cx={C}
                cy={C}
                r={R}
                fill="none"
                stroke={d.color}
                strokeWidth={sw}
                strokeDasharray={dash}
                strokeDashoffset={-acc}
                transform="rotate(-90 84 84)"
                strokeLinecap="butt"
              />
            )
            acc += len
            return el
          })}
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'grid', placeItems: 'center',
          textAlign: 'center',
          pointerEvents: 'none',
        }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
              Pipeline
            </div>
            <div className="gradient-text" style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 4 }}>
              €{totalM}M
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {data.map((d) => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color, display: 'inline-block' }} />
            <span style={{ fontWeight: 500 }}>{d.label}</span>
            <span style={{ color: 'var(--muted)', marginLeft: 'auto', fontVariantNumeric: 'tabular-nums' }}>
              {totalVal > 0 ? Math.round((d.value / totalVal) * 100) : 0}%
            </span>
            <span style={{ color: 'var(--muted-2)', fontSize: 11, fontVariantNumeric: 'tabular-nums', width: 60, textAlign: 'right' }}>
              €{(d.value / 1_000_000).toFixed(2)}M
            </span>
          </div>
        ))}
        <div style={{ marginTop: 4, paddingTop: 12, borderTop: '1px solid var(--border-soft)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)' }}>
          <span>Valor total</span>
          <span style={{ color: '#fff', fontWeight: 600 }}>€{totalM}M</span>
        </div>
      </div>
    </div>
  )
}
