import { createClient } from '@/lib/supabase/server'
import { IcPlus, IcSparkle } from '@/components/ui/Icons'
import Link from 'next/link'

export default async function ActivitiesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: activities = [] } = await supabase
    .from('activities')
    .select('*, contact:contacts(name, vertical)')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div style={{ padding: '28px 32px 56px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 26, gap: 24 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Actividades</div>
          <div style={{ color: 'var(--muted)', fontSize: 13.5, marginTop: 6 }}>{(activities ?? []).length} eventos registrados</div>
        </div>
      </div>

      {(activities ?? []).length === 0 ? (
        <div className="card" style={{ padding: 48, textAlign: 'center' }}>
          <div style={{ display: 'inline-grid', placeItems: 'center', width: 56, height: 56, borderRadius: 14, background: 'var(--gradient-brand-soft)', color: 'var(--teal)', marginBottom: 16 }}>
            <IcSparkle size={24} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>No hay actividades</div>
          <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 6 }}>
            Las actividades se crean desde el detalle de un contacto.
          </div>
          <Link href="/contacts" className="btn primary" style={{ marginTop: 18, display: 'inline-flex' }}>
            Ver contactos
          </Link>
        </div>
      ) : (
        <div className="card">
          {(activities ?? []).map((a: any) => (
            <div key={a.id} style={{ display: 'grid', gridTemplateColumns: '40px 1fr auto', gap: 14, alignItems: 'flex-start', padding: '16px 22px', borderTop: '1px solid var(--border-soft)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, border: '1px solid rgba(0,212,170,0.25)', background: 'rgba(0,212,170,0.06)', display: 'grid', placeItems: 'center', color: 'var(--teal)' }}>
                <IcSparkle size={16} />
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  {a.contact?.name} · {a.kind}
                </div>
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--muted-2)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                {new Date(a.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
