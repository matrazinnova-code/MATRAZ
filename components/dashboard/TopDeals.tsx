import { VerticalBadge } from '@/components/ui/Badge'
import type { Deal } from '@/lib/supabase/database.types'

export default function TopDeals({ deals }: { deals: Deal[] }) {
  const maxValue = Math.max(...deals.map((d) => d.value), 1)

  return (
    <div>
      {deals.map((d) => (
        <div
          key={d.id}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto auto',
            gap: 12,
            alignItems: 'center',
            padding: '14px 22px',
            borderTop: '1px solid var(--border-soft)',
          }}
        >
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600 }}>{d.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <VerticalBadge vertical={d.vertical} />
              <span style={{ color: 'var(--muted)', fontSize: 12 }}>
                {d.company?.name ?? '—'}
              </span>
            </div>
          </div>
          <div style={{ width: 110, height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
            <i style={{
              display: 'block', height: '100%',
              width: `${Math.round((d.value / maxValue) * 100)}%`,
              background: 'var(--gradient)',
              borderRadius: 99,
            }} />
          </div>
          <div style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600, fontSize: 13, minWidth: 80, textAlign: 'right' }}>
            €{(d.value / 1000).toFixed(0)}K
          </div>
        </div>
      ))}
    </div>
  )
}
