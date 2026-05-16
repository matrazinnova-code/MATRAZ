import { IcSparkle } from '@/components/ui/Icons'
import Link from 'next/link'

export default function SettingsPage() {
  return (
    <div style={{ padding: '28px 32px 56px' }}>
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>Ajustes</div>
      <div className="card" style={{ padding: 48, textAlign: 'center', marginTop: 24 }}>
        <div style={{ display: 'inline-grid', placeItems: 'center', width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, rgba(0,212,170,0.18) 0%, rgba(123,95,255,0.18) 100%)', color: 'var(--teal)', marginBottom: 16 }}>
          <IcSparkle size={24} />
        </div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Sección en construcción</div>
        <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 6 }}>Esta sección estará disponible próximamente.</div>
        <Link href="/" className="btn primary" style={{ marginTop: 18, display: 'inline-flex' }}>Volver al Dashboard</Link>
      </div>
    </div>
  )
}
