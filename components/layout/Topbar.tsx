'use client'

import { usePathname, useRouter } from 'next/navigation'
import { IcSearch, IcPlus, IcBell, IcCalendar, IcChevRight } from '@/components/ui/Icons'

const BREADCRUMBS: Record<string, [string, string]> = {
  '/':           ['Workspace', 'Dashboard'],
  '/contacts':   ['Workspace', 'Contactos'],
  '/pipeline':   ['Workspace', 'Pipeline'],
  '/deals/new':  ['Pipeline', 'Nuevo deal'],
  '/activities': ['Workspace', 'Actividades'],
  '/reports':    ['Operaciones', 'Reportes'],
  '/inbox':      ['Operaciones', 'Inbox'],
  '/settings':   ['Operaciones', 'Ajustes'],
}

export default function Topbar() {
  const pathname = usePathname()
  const router = useRouter()

  // Match contact detail route
  const isContactDetail = pathname.startsWith('/contacts/') && pathname !== '/contacts'
  const [parent, current] = isContactDetail
    ? ['Contactos', 'Detalle']
    : (BREADCRUMBS[pathname] ?? ['Workspace', 'Dashboard'])

  return (
    <header className="topbar">
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--muted)', fontSize: 13 }}>
        <span>{parent}</span>
        <IcChevRight size={12} />
        <span style={{ color: '#fff', fontWeight: 600 }}>{current}</span>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginLeft: 'auto', width: 340 }}>
        <span style={{
          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
          color: 'var(--muted)',
        }}>
          <IcSearch size={16} />
        </span>
        <input
          placeholder="Buscar contactos, deals, empresas…"
          style={{
            width: '100%', height: 38,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border)',
            borderRadius: 9,
            color: '#fff',
            padding: '0 12px 0 38px',
            fontFamily: 'inherit',
            fontSize: 13,
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--teal)'
            e.currentTarget.style.background = 'rgba(0,212,170,0.04)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
          }}
        />
        <span style={{
          position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
          font: '500 10.5px var(--font-jetbrains, monospace)',
          color: 'var(--muted-2)',
          border: '1px solid var(--border)',
          padding: '2px 6px',
          borderRadius: 4,
        }}>
          ⌘K
        </span>
      </div>

      {/* Actions */}
      <button
        className="icon-btn"
        title="Nuevo deal"
        onClick={() => router.push('/deals/new')}
        style={{ width: 38, height: 38 }}
      >
        <IcPlus size={16} />
      </button>

      <button className="icon-btn" title="Notificaciones" style={{ width: 38, height: 38 }}>
        <IcBell size={16} />
        <span style={{
          position: 'absolute', top: 9, right: 10,
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--teal)',
          boxShadow: '0 0 0 2px var(--bg)',
        }} />
      </button>

      <button className="icon-btn" title="Calendario" style={{ width: 38, height: 38 }}>
        <IcCalendar size={16} />
      </button>
    </header>
  )
}
