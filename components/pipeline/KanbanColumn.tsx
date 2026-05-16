'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import DealCard from './DealCard'
import { IcPlus } from '@/components/ui/Icons'
import type { Deal, DealStage } from '@/lib/supabase/database.types'

interface Props {
  stage: { id: DealStage; title: string; color: string }
  deals: Deal[]
  sum: number
  activeId: string | null
}

export default function KanbanColumn({ stage, deals, sum, activeId }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id })

  const fmt = (v: number) =>
    v >= 1_000_000 ? `€${(v / 1_000_000).toFixed(2)}M` : `€${(v / 1000).toFixed(0)}K`

  const barBg =
    stage.id === 'won'
      ? 'linear-gradient(90deg, #00D4AA, #7B5FFF)'
      : stage.color

  return (
    <div
      className={`kanban-col ${isOver ? 'drag-over' : ''}`}
      ref={setNodeRef}
    >
      {/* Column header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 14px 12px' }}>
        <span style={{
          fontSize: 12.5, fontWeight: 700,
          letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>
          {stage.title}
        </span>
        <span style={{
          fontSize: 11, fontWeight: 600, color: 'var(--muted)',
          background: 'rgba(255,255,255,0.04)',
          padding: '2px 7px', borderRadius: 6, marginLeft: 'auto',
        }}>
          {deals.length}
        </span>
      </div>

      {/* Color bar */}
      <div style={{ height: 3, borderRadius: 4, margin: '0 14px 12px', background: barBg }} />

      {/* Sum */}
      <div style={{ padding: '0 14px 12px', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 500 }}>
        Total · <b style={{ color: '#fff', fontWeight: 700, letterSpacing: '-0.005em', textTransform: 'none', fontSize: 13 }}>{fmt(sum)}</b>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 10px 12px', flex: 1 }}>
        <SortableContext items={deals.map((d) => d.id)} strategy={verticalListSortingStrategy}>
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              isDragging={activeId === deal.id}
            />
          ))}
        </SortableContext>

        <button className="k-add" style={{
          border: '1px dashed var(--border)',
          borderRadius: 10, padding: 9,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          color: 'var(--muted)', fontSize: 12,
          cursor: 'pointer', background: 'transparent',
          transition: '160ms',
          marginTop: 'auto',
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--teal)'
            e.currentTarget.style.borderColor = 'rgba(0,212,170,0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--muted)'
            e.currentTarget.style.borderColor = 'var(--border)'
          }}
        >
          <IcPlus size={13} /> Añadir deal
        </button>
      </div>
    </div>
  )
}
