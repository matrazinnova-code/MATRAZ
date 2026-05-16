import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import KpiCard from '@/components/dashboard/KpiCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import PipelineDonut from '@/components/dashboard/PipelineDonut'
import TopDeals from '@/components/dashboard/TopDeals'
import { IcWallet, IcBrief, IcTarget, IcClock, IcCalendar, IcPhone, IcMail, IcVideo, IcMessage, IcPlus, IcChevDown } from '@/components/ui/Icons'
import type { Deal, Activity } from '@/lib/supabase/database.types'

const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  call:    <IcPhone size={16} />,
  email:   <IcMail size={16} />,
  meeting: <IcVideo size={16} />,
  note:    <IcMessage size={16} />,
  task:    <IcCalendar size={16} />,
}

// Static sparkline data — replace with time-series queries in production
const SPARKS = {
  revenue: [18,22,21,28,27,32,36,38,44,49,53,58],
  deals:   [12,14,15,13,18,20,22,24,26,28,32,34],
  close:   [28,29,32,30,33,34,36,37,38,39,41,43],
  acts:    [14,13,12,11,12,10,11,9,10,9,8,8],
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch all deals
  const { data: deals = [] } = await supabase
    .from('deals')
    .select('*, company:companies(*)')
    .eq('user_id', user!.id)
    .neq('stage', 'lost')

  const safeDeals = (deals ?? []) as Deal[]

  // KPI aggregates
  const totalRevenue = safeDeals
    .filter((d) => d.stage === 'won')
    .reduce((s, d) => s + d.value, 0)
  const activeDeals = safeDeals.filter((d) => d.stage !== 'won').length
  const wonCount = safeDeals.filter((d) => d.stage === 'won').length
  const closeRate = safeDeals.length > 0 ? (wonCount / safeDeals.length) * 100 : 0

  // Pipeline donut by vertical
  const verticalTotals = safeDeals
    .filter((d) => d.stage !== 'won')
    .reduce((acc, d) => {
      acc[d.vertical] = (acc[d.vertical] ?? 0) + d.value
      return acc
    }, {} as Record<string, number>)

  const donutData = [
    { label: 'Healthcare', value: verticalTotals.healthcare ?? 0, color: '#00B4D8' },
    { label: 'IT',         value: verticalTotals.it ?? 0,         color: '#7B5FFF' },
    { label: 'Business',   value: verticalTotals.business ?? 0,   color: '#C0C0C8' },
  ]
  const pipelineTotal = donutData.reduce((s, d) => s + d.value, 0)

  // Top 5 open deals by value
  const topDeals = [...safeDeals]
    .filter((d) => d.stage !== 'won')
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  // Recent activities
  const { data: activities = [] } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const safeActivities = (activities ?? []) as Activity[]

  // Real monthly revenue from won deals (current year)
  const currentYear = new Date().getFullYear()
  const wonDeals = safeDeals.filter((d) => d.stage === 'won')
  const revSeries = { healthcare: Array(12).fill(0), it: Array(12).fill(0), business: Array(12).fill(0) }
  for (const d of wonDeals) {
    const date = new Date(d.updated_at ?? d.created_at)
    if (date.getFullYear() !== currentYear) continue
    const month = date.getMonth()
    const v = d.vertical as 'healthcare' | 'it' | 'business'
    if (revSeries[v]) revSeries[v][month] += Math.round(d.value / 1000)
  }

  const fmt = (v: number) =>
    v >= 1_000_000 ? `€${(v / 1_000_000).toFixed(2)}M` : `€${(v / 1000).toFixed(0)}K`

  return (
    <div style={{ padding: '28px 32px 56px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 26, gap: 24 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Buenas tardes 👋
          </div>
          <div style={{ color: 'var(--muted)', fontSize: 13.5, marginTop: 6 }}>
            Pipeline activo ·{' '}
            <b style={{ color: 'var(--teal)' }}>{fmt(pipelineTotal)}</b> en curso · Vista{' '}
            <b style={{ color: '#fff' }}>Q2 2026</b>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn ghost">
            <IcCalendar size={15} /> Últimos 90 días <IcChevDown size={13} />
          </button>
          <Link href="/deals/new" className="btn primary">
            <IcPlus size={15} /> Nuevo deal
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <KpiCard
          label="Revenue cerrado"
          value={fmt(totalRevenue)}
          delta={null}
          deltaLabel={wonCount > 0 ? `${wonCount} deal${wonCount !== 1 ? 's' : ''} cerrado${wonCount !== 1 ? 's' : ''}` : 'Sin deals cerrados aún'}
          icon={<IcWallet size={16} />}
          points={revSeries.healthcare.map((v, i) => v + revSeries.it[i] + revSeries.business[i])}
          gradientId="sp1"
        />
        <KpiCard
          label="Deals activos"
          value={String(activeDeals)}
          delta={null}
          deltaLabel={`${safeDeals.length} deal${safeDeals.length !== 1 ? 's' : ''} en total`}
          icon={<IcBrief size={16} />}
          points={SPARKS.deals}
          gradientId="sp2"
        />
        <KpiCard
          label="Tasa de cierre"
          value={`${closeRate.toFixed(1)}%`}
          delta={null}
          deltaLabel={safeDeals.length > 0 ? `${wonCount} de ${safeDeals.length} deals` : 'Sin datos aún'}
          icon={<IcTarget size={16} />}
          points={SPARKS.close}
          gradientId="sp3"
        />
        <KpiCard
          label="Actividades recientes"
          value={String(safeActivities.length)}
          delta={null}
          deltaLabel="últimas registradas"
          icon={<IcClock size={16} />}
          points={SPARKS.acts}
          gradientId="sp4"
        />
      </div>

      {/* Revenue chart + Donut */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 16, marginBottom: 24 }}>
        <div className="card">
          <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Revenue cerrado · 2026</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Distribución mensual por vertical</div>
            </div>
          </div>
          <div style={{ padding: '22px 22px 8px' }}>
            <RevenueChart {...revSeries} />
          </div>
        </div>

        <div className="card">
          <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Mix de pipeline</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Por vertical · valor en curso</div>
          </div>
          <div style={{ padding: 22 }}>
            <PipelineDonut data={donutData} total={pipelineTotal} />
          </div>
        </div>
      </div>

      {/* Activities + Top Deals */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card">
          <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Actividades recientes</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{safeActivities.length} eventos registrados</div>
            </div>
          </div>
          {safeActivities.length === 0 ? (
            <div style={{ padding: '32px 22px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
              No hay actividades aún. Añade una desde el detalle de contacto.
            </div>
          ) : (
            safeActivities.map((a) => (
              <div key={a.id} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 14, alignItems: 'flex-start', padding: '16px 22px', borderTop: '1px solid var(--border-soft)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, border: '1px solid rgba(0,212,170,0.25)', background: 'rgba(0,212,170,0.06)', display: 'grid', placeItems: 'center', color: 'var(--teal)' }}>
                  {ACTIVITY_ICONS[a.kind] ?? <IcMessage size={16} />}
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                    {new Date(a.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="card">
          <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Top deals abiertos</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Mayor valor · probabilidad ponderada</div>
            </div>
            <Link href="/pipeline" className="btn ghost" style={{ height: 32, padding: '0 12px', fontSize: 12 }}>
              Ver pipeline
            </Link>
          </div>
          {topDeals.length === 0 ? (
            <div style={{ padding: '32px 22px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
              No hay deals abiertos. <Link href="/deals/new" style={{ color: 'var(--teal)' }}>Crea uno</Link>
            </div>
          ) : (
            <TopDeals deals={topDeals} />
          )}
        </div>
      </div>
    </div>
  )
}
