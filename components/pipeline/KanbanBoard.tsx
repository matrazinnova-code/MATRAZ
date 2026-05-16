'use client'

import { useState, useCallback } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import KanbanColumn from './KanbanColumn'
import DealCard from './DealCard'
import { moveDeal } from '@/lib/actions'
import type { Deal, DealStage } from '@/lib/supabase/database.types'

export const STAGES: { id: DealStage; title: string; color: string }[] = [
  { id: 'lead',        title: 'Lead',        color: '#8A8A8F' },
  { id: 'qualified',   title: 'Qualified',   color: '#C0C0C8' },
  { id: 'proposal',    title: 'Proposal',    color: '#00B4D8' },
  { id: 'negotiation', title: 'Negotiation', color: '#7B5FFF' },
  { id: 'closing',     title: 'Closing',     color: '#E040A0' },
  { id: 'won',         title: 'Won',         color: '#00D4AA' },
]

export default function KanbanBoard({ initialDeals }: { initialDeals: Deal[] }) {
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const byStage = useCallback(
    (stage: DealStage) =>
      deals.filter((d) => d.stage === stage).sort((a, b) => a.position - b.position),
    [deals]
  )

  const stageSum = useCallback(
    (stage: DealStage) => byStage(stage).reduce((s, d) => s + d.value, 0),
    [byStage]
  )

  const activeDeal = activeId ? deals.find((d) => d.id === activeId) : null

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string)
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null)
    if (!over) return

    const draggedId = active.id as string
    const overId = over.id as string

    // overId can be a stage id (dropped on column) or a deal id (dropped on card)
    const targetStage = (STAGES.find((s) => s.id === overId)?.id ??
      deals.find((d) => d.id === overId)?.stage) as DealStage | undefined

    if (!targetStage) return

    const draggedDeal = deals.find((d) => d.id === draggedId)
    if (!draggedDeal || draggedDeal.stage === targetStage) return

    // Optimistic update
    setDeals((prev) =>
      prev.map((d) =>
        d.id === draggedId ? { ...d, stage: targetStage, position: 999 } : d
      )
    )

    // Persist to Supabase
    moveDeal(draggedId, targetStage, 999)
  }

  const totalPipeline = deals.reduce((s, d) => s + d.value, 0)
  const fmt = (v: number) =>
    v >= 1_000_000 ? `€${(v / 1_000_000).toFixed(2)}M` : `€${(v / 1000).toFixed(0)}K`

  return (
    <div>
      {/* Summary bar */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>
          {deals.length} deals ·{' '}
          <b style={{ color: '#fff' }}>valor total {fmt(totalPipeline)}</b>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
          {STAGES.map((s) => {
            const count = byStage(s.id).length
            if (count === 0) return null
            return (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
                {s.title} <b style={{ color: '#fff' }}>({count})</b>
              </div>
            )
          })}
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(240px, 1fr))',
          gap: 12,
          overflowX: 'auto',
          paddingBottom: 16,
          minWidth: 0,
        }}>
          {STAGES.map((stage) => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              deals={byStage(stage.id)}
              sum={stageSum(stage.id)}
              activeId={activeId}
            />
          ))}
        </div>

        <DragOverlay>
          {activeDeal && (
            <div style={{ transform: 'rotate(2deg)', opacity: 0.9 }}>
              <DealCard deal={activeDeal} isDragOverlay />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
