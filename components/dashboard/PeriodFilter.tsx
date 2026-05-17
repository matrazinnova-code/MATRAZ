'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { IcCalendar, IcChevDown } from '@/components/ui/Icons'

const OPTIONS = [
  { value: '30',  label: 'Últimos 30 días' },
  { value: '90',  label: 'Últimos 90 días' },
  { value: '180', label: 'Últimos 6 meses' },
  { value: '365', label: 'Último año' },
  { value: 'all', label: 'Todo el historial' },
]

export default function PeriodFilter() {
  const router      = useRouter()
  const searchParams = useSearchParams()
  const current     = searchParams.get('period') ?? '90'
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = (val: string) => {
    setOpen(false)
    const params = new URLSearchParams(searchParams.toString())
    params.set('period', val)
    router.push(`/?${params.toString()}`)
  }

  const label = OPTIONS.find((o) => o.value === current)?.label ?? 'Últimos 90 días'

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        className="btn ghost"
        onClick={() => setOpen((o) => !o)}
        style={{ gap: 8 }}
      >
        <IcCalendar size={15} />
        {label}
        <IcChevDown size={13} style={{ marginLeft: 2 }} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 200,
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 10, overflow: 'hidden', minWidth: 190,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}>
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => select(opt.value)}
              style={{
                display: 'block', width: '100%', padding: '9px 16px',
                background: opt.value === current ? 'rgba(0,212,170,0.08)' : 'none',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                fontSize: 13, fontWeight: opt.value === current ? 600 : 400,
                color: opt.value === current ? 'var(--teal)' : '#fff',
              }}
              onMouseEnter={(e) => { if (opt.value !== current) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={(e) => { if (opt.value !== current) e.currentTarget.style.background = 'none' }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
