'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { IcX } from '@/components/ui/Icons'
import { createContact, createCompany } from '@/lib/actions'
import type { Vertical, ContactStatus } from '@/lib/supabase/database.types'

interface Props {
  onClose: () => void
}

const VERTICALS: { key: Vertical; label: string }[] = [
  { key: 'business',   label: 'Business' },
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'it',         label: 'IT' },
]

export default function AddContactModal({ onClose }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [vertical, setVertical] = useState<Vertical>('healthcare')
  const [status, setStatus] = useState<ContactStatus>('lead')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const companyName = fd.get('company') as string

    startTransition(async () => {
      setError(null)
      let companyId: string | undefined

      if (companyName.trim()) {
        const res = await createCompany({ name: companyName.trim() })
        if (res.error) { setError(res.error); return }
        companyId = res.data?.id
      }

      const res = await createContact({
        name: fd.get('name') as string,
        role: (fd.get('role') as string) || undefined,
        email: (fd.get('email') as string) || undefined,
        phone: (fd.get('phone') as string) || undefined,
        city: (fd.get('city') as string) || undefined,
        vertical,
        status,
        company_id: companyId,
        lead_score: 0,
      })

      if (res.error) { setError(res.error); return }
      router.refresh()
      onClose()
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 24px', borderBottom: '1px solid var(--border)' }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Nuevo contacto</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>Los campos con • son obligatorios</div>
          </div>
          <button className="icon-btn" onClick={onClose} style={{ width: 32, height: 32 }}>
            <IcX size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ padding: '22px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 20px' }}>
            <div style={{ gridColumn: '1 / -1' }} className="flex flex-col gap-2">
              <label className="field-label">Nombre completo <span className="req">•</span></label>
              <input name="name" required className="input" placeholder="Lucía Marín" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="field-label">Cargo</label>
              <input name="role" className="input" placeholder="Chief Medical Officer" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="field-label">Empresa</label>
              <input name="company" className="input" placeholder="Bioteca Labs" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="field-label">Email</label>
              <input name="email" type="email" className="input" placeholder="lucia@empresa.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="field-label">Teléfono</label>
              <input name="phone" className="input" placeholder="+34 612 224 901" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="field-label">Ciudad</label>
              <input name="city" className="input" placeholder="Barcelona, ES" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="field-label">Estado</label>
              <select
                className="select-input"
                value={status}
                onChange={(e) => setStatus(e.target.value as ContactStatus)}
              >
                <option value="lead">Lead</option>
                <option value="prospect">Prospect</option>
                <option value="customer">Customer</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }} className="flex flex-col gap-2">
              <label className="field-label">Vertical <span className="req">•</span></label>
              <div className="seg">
                {VERTICALS.map((v) => (
                  <div
                    key={v.key}
                    className={`seg-opt ${v.key} ${vertical === v.key ? 'active' : ''}`}
                    onClick={() => setVertical(v.key)}
                  >
                    {v.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div style={{ margin: '0 24px', padding: '10px 14px', background: 'rgba(224,64,160,0.08)', border: '1px solid rgba(224,64,160,0.25)', borderRadius: 8, color: 'var(--magenta)', fontSize: 13 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, padding: '18px 24px', borderTop: '1px solid var(--border)', marginTop: 8 }}>
            <button type="button" className="btn ghost" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn primary" disabled={pending}>
              {pending ? 'Guardando…' : 'Crear contacto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
