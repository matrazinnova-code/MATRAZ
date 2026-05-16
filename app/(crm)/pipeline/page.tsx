import { createClient } from '@/lib/supabase/server'
import KanbanBoard from '@/components/pipeline/KanbanBoard'
import { IcFilter, IcUsers, IcPlus } from '@/components/ui/Icons'
import Link from 'next/link'
import type { Deal } from '@/lib/supabase/database.types'

export default async function PipelinePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: deals = [] } = await supabase
    .from('deals')
    .select('*, contact:contacts(name), company:companies(name)')
    .eq('user_id', user!.id)
    .neq('stage', 'lost')
    .order('position', { ascending: true })

  const safeDeals = (deals ?? []) as Deal[]
  const totalValue = safeDeals.reduce((s, d) => s + d.value, 0)
  const fmt = (v: number) =>
    v >= 1_000_000 ? `€${(v / 1_000_000).toFixed(2)}M` : `€${(v / 1000).toFixed(0)}K`

  return (
    <div style={{ padding: '28px 32px 56px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 26, gap: 24 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>Pipeline</div>
          <div style={{ color: 'var(--muted)', fontSize: 13.5, marginTop: 6 }}>
            {safeDeals.length} deals · valor total <b style={{ color: '#fff' }}>{fmt(totalValue)}</b> · arrastra para mover entre etapas
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn ghost"><IcFilter size={14} /> Filtros</button>
          <button className="btn ghost"><IcUsers size={14} /> Equipo · Todos</button>
          <Link href="/deals/new" className="btn primary"><IcPlus size={15} /> Nuevo deal</Link>
        </div>
      </div>

      <KanbanBoard initialDeals={safeDeals} />
    </div>
  )
}
