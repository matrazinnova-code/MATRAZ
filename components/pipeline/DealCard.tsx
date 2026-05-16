'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { VerticalBadge } from '@/components/ui/Badge'
import { IcSparkle, IcMore, IcClock, IcCalendar } from '@/components/ui/Icons'
import { deleteDeal } from '@/lib/actions'
import type { Deal } from '@/lib/supabase/database.types'

interface Props {
  deal: Deal
  isDragging?: boolean
  isDragOverlay?: boolean
}

export default function DealCard({ deal, isDragging, isDragOverlay }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: deal.id })
  const [menuOpen, setMenuOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const menuRef = useRef<HTMLDivElement>(null)

  const style = isDragOverlay
    ? undefined
    : {
        transform: CSS.Transform.toString(transform),
        transition,
      }

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  const fmt = (v: number) =>
    v >= 1_000_000 ? `€${(v / 1_000_000).toFixed(2)}M` : `€${(v / 1000).toFixed(0)}K`

  const isHot = deal.stage === 'closing' && deal.value >= 200_000
  const ageDays = Math.floor((Date.now() - new Date(deal.created_at).getTime()) / 86_400_000)

  function handleDelete() {
    setMenuOpen(false)
    if (!confirm(`¿Eliminar "${deal.title}"?`)) return
    startTransition(() => deleteDeal(deal.id))
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`k-card ${isDragging ? 'dragging' : ''}`}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <VerticalBadge vertical={deal.vertical} />
        {isHot && (
          <span className="badge hot" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <IcSparkle size={10} /> Hot
          </span>
        )}

        {/* ··· menu */}
        <div ref={menuRef} style={{ marginLeft: 'auto', position: 'relative' }}>
          <button
            className="icon-btn"
            style={{ width: 22, height: 22, borderColor: 'transparent', background: 'transparent' }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o) }}
          >
            <IcMore size={14} />
          </button>

          {menuOpen && (
            <div style={{
              position: 'absolute', right: 0, top: '110%', zIndex: 50,
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '4px 0', minWidth: 140,
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}>
              <button
                disabled={isPending}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); handleDelete() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  width: '100%', padding: '8px 14px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#ff6b6b', fontSize: 13, textAlign: 'left',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,107,107,0.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >
                {isPending ? 'Eliminando…' : '🗑 Eliminar deal'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title + company */}
      <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{deal.title}</div>
      <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 3 }}>
        {deal.company?.name ?? deal.contact?.name ?? '—'}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
        <div style={{
          width: 22, height: 22, borderRadius: '50%',
          display: 'grid', placeItems: 'center',
          fontSize: 9.5, fontWeight: 700,
          background: 'rgba(0,212,170,0.10)',
          color: 'var(--teal)',
          border: '1px solid rgba(0,212,170,0.3)',
          flexShrink: 0,
        }}>
          {(deal.owner_name ?? 'IM').substring(0, 2).toUpperCase()}
        </div>
        <span style={{ color: 'var(--muted)', fontSize: 11.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {deal.contact?.name ?? deal.owner_name ?? '—'}
        </span>
        <span style={{ marginLeft: 'auto', fontVariantNumeric: 'tabular-nums', fontWeight: 700, fontSize: 13 }}>
          {fmt(deal.value)}
        </span>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, color: 'var(--muted-2)', fontSize: 11 }}>
        <IcClock size={11} />
        <span>{ageDays}d</span>
        <span style={{ width: 2, height: 2, background: 'currentColor', borderRadius: '50%' }} />
        <IcCalendar size={11} />
        <span>{deal.close_date ? new Date(deal.close_date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) : 'Sin fecha'}</span>
        {deal.probability != null && (
          <>
            <span style={{ width: 2, height: 2, background: 'currentColor', borderRadius: '50%' }} />
            <span>{deal.probability}%</span>
          </>
        )}
      </div>
    </div>
  )
}
