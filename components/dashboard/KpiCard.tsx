import { IcArrowUp, IcArrowDown } from '@/components/ui/Icons'

interface SparklineProps {
  points: number[]
  gradientId: string
}

function Sparkline({ points, gradientId }: SparklineProps) {
  const W = 130, H = 60
  const max = Math.max(...points), min = Math.min(...points)
  const dx = W / (points.length - 1)
  const norm = (v: number) => H - 4 - ((v - min) / (max - min || 1)) * (H - 12)
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * dx} ${norm(p)}`).join(' ')
  const area = `${d} L ${W} ${H} L 0 ${H} Z`

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.95 }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00D4AA" />
          <stop offset="100%" stopColor="#7B5FFF" />
        </linearGradient>
        <linearGradient id={`${gradientId}-f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#7B5FFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId}-f)`} />
      <path d={d} fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.8" />
    </svg>
  )
}

interface KpiCardProps {
  label: string
  value: string
  delta: number | null
  deltaLabel: string
  icon: React.ReactNode
  points: number[]
  gradientId: string
}

export default function KpiCard({ label, value, delta, deltaLabel, icon, points, gradientId }: KpiCardProps) {
  return (
    <div className="card kpi">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 600 }}>
        <span style={{
          width: 32, height: 32, borderRadius: 8,
          display: 'grid', placeItems: 'center',
          background: 'rgba(0,212,170,0.10)',
          color: 'var(--teal)',
          border: '1px solid rgba(0,212,170,0.2)',
        }}>
          {icon}
        </span>
        <span>{label}</span>
      </div>
      <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', marginTop: 14, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 10, fontSize: 12 }}>
        {delta !== null ? (
          <>
            {delta >= 0 ? <IcArrowUp size={12} /> : <IcArrowDown size={12} />}
            <span style={{ fontWeight: 600, color: delta >= 0 ? 'var(--teal)' : 'var(--magenta)' }}>
              {Math.abs(delta).toFixed(1)}%
            </span>
          </>
        ) : null}
        <span style={{ color: 'var(--muted)', fontWeight: 500 }}>{deltaLabel}</span>
      </div>
      <Sparkline points={points} gradientId={gradientId} />
    </div>
  )
}
