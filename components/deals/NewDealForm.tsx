'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IcChevRight, IcSparkle, IcCheck, IcX } from '@/components/ui/Icons'
import { createDeal } from '@/lib/actions'
import type { Vertical, DealStage, Contact, Company } from '@/lib/supabase/database.types'

interface Props {
  contacts: Pick<Contact, 'id' | 'name' | 'vertical'>[]
  companies: Pick<Company, 'id' | 'name'>[]
}

const VERTICALS: { key: Vertical; label: string }[] = [
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'it',         label: 'IT' },
  { key: 'business',   label: 'Business' },
]

const STAGES: { id: DealStage; title: string }[] = [
  { id: 'lead',        title: 'Lead' },
  { id: 'qualified',   title: 'Qualified' },
  { id: 'proposal',    title: 'Proposal' },
  { id: 'negotiation', title: 'Negotiation' },
  { id: 'closing',     title: 'Closing' },
  { id: 'won',         title: 'Won' },
]

export default function NewDealForm({ contacts, companies }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [vertical, setVertical] = useState<Vertical>('healthcare')
  const [stage, setStage] = useState<DealStage>('qualified')
  const [value, setValue] = useState(180000)
  const [probability, setProbability] = useState(65)
  const [tags, setTags] = useState<string[]>(['EMEA', 'Regulatory'])
  const [tagInput, setTagInput] = useState('')
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [contactId, setContactId] = useState('')
  const [closeDate, setCloseDate] = useState('')
  const [description, setDescription] = useState('')

  const removeTag = (t: string) => setTags(tags.filter((x) => x !== t))
  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const selectedCompany = companies.find((c) => c.name === company)

    startTransition(async () => {
      setError(null)
      const res = await createDeal({
        title: title.trim(),
        value,
        vertical,
        stage,
        probability,
        close_date: closeDate || undefined,
        description: description.trim() || undefined,
        tags,
        owner_name: 'IM',
        contact_id: contactId || undefined,
        company_id: selectedCompany?.id,
      })
      if (res.error) { setError(res.error); return }
      router.push('/pipeline')
    })
  }

  const weighted = Math.round(value * probability / 100)
  const selectedStage = STAGES.find((s) => s.id === stage)

  return (
    <form onSubmit={handleSubmit}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 26, gap: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--muted)', fontSize: 13, marginBottom: 8 }}>
            <Link href="/pipeline" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Pipeline</Link>
            <IcChevRight size={12} />
            <span style={{ color: '#fff', fontWeight: 600 }}>Nuevo deal</span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Nuevo deal</div>
          <div style={{ color: 'var(--muted)', fontSize: 13.5, marginTop: 6 }}>Captura una oportunidad y asígnala a una etapa del pipeline.</div>
        </div>

        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {[
            { n: 1, label: 'Detalles', active: true },
            { n: 2, label: 'Stakeholders', active: false },
            { n: 3, label: 'Resumen', active: false },
          ].map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {i > 0 && <div style={{ width: 18, height: 1, background: 'var(--border)' }} />}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: s.active ? '#fff' : 'var(--muted)', fontWeight: 500 }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%',
                  display: 'grid', placeItems: 'center',
                  fontSize: 11, fontWeight: 700,
                  background: s.active ? 'var(--gradient)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${s.active ? 'transparent' : 'var(--border)'}`,
                  color: s.active ? '#0A0A0B' : 'inherit',
                }}>
                  {s.n}
                </span>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
        {/* Main form */}
        <div className="card">
          {/* Form header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 24px', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Información del deal</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                Los campos con <span style={{ color: 'var(--teal)' }}>•</span> son obligatorios.
              </div>
            </div>
            <button type="button" className="btn ghost" style={{ height: 32, padding: '0 12px', fontSize: 12 }}>
              <IcSparkle size={13} /> Sugerir con IA
            </button>
          </div>

          {/* Fields */}
          <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 20px' }}>
            {/* Deal name */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label className="field-label">Nombre del deal <span className="req">•</span></label>
              <input
                className="input"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Plataforma de farmacovigilancia — Fase I"
              />
            </div>

            {/* Vertical */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 7 }}>
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

            {/* Company */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label className="field-label">Empresa <span className="req">•</span></label>
              <input
                className="input"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                list="companies-list"
                placeholder="Atlas Biopharma"
              />
              <datalist id="companies-list">
                {companies.map((c) => <option key={c.id} value={c.name} />)}
              </datalist>
            </div>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label className="field-label">Contacto principal <span className="req">•</span></label>
              <select className="select-input" value={contactId} onChange={(e) => setContactId(e.target.value)}>
                <option value="">— Seleccionar —</option>
                {contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            {/* Value */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label className="field-label">Valor del deal <span className="req">•</span></label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontWeight: 600, fontSize: 13.5 }}>€</span>
                <input
                  className="input"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  style={{ paddingLeft: 28, fontVariantNumeric: 'tabular-nums' }}
                />
              </div>
            </div>

            {/* Probability */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label className="field-label">Probabilidad de cierre</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="input"
                  type="number"
                  min={0}
                  max={100}
                  value={probability}
                  onChange={(e) => setProbability(Number(e.target.value))}
                  style={{ paddingRight: 32, fontVariantNumeric: 'tabular-nums' }}
                />
                <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 13.5 }}>%</span>
              </div>
            </div>

            {/* Stage */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label className="field-label">Etapa inicial</label>
              <select className="select-input" value={stage} onChange={(e) => setStage(e.target.value as DealStage)}>
                {STAGES.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
            </div>

            {/* Close date */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label className="field-label">Fecha estimada de cierre</label>
              <input
                className="input"
                type="date"
                value={closeDate}
                onChange={(e) => setCloseDate(e.target.value)}
              />
            </div>

            {/* Tags */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label className="field-label">Tags</label>
              <div className="tags-input">
                {tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                    <span style={{ cursor: 'pointer', opacity: 0.6 }} onClick={() => removeTag(t)}>
                      <IcX size={11} />
                    </span>
                  </span>
                ))}
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  placeholder="Añadir tag y pulsar Enter…"
                  style={{ background: 'transparent', border: 'none', color: '#fff', flex: 1, minWidth: 100, outline: 'none', font: 'inherit', padding: '4px 6px', fontSize: 13 }}
                />
              </div>
            </div>

            {/* Description */}
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 7 }}>
              <label className="field-label">Descripción</label>
              <textarea
                className="textarea-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe el alcance del proyecto, objetivos y contexto relevante…"
              />
            </div>
          </div>

          {error && (
            <div style={{ margin: '0 24px', padding: '10px 14px', background: 'rgba(224,64,160,0.08)', border: '1px solid rgba(224,64,160,0.25)', borderRadius: 8, color: 'var(--magenta)', fontSize: 13 }}>
              {error}
            </div>
          )}

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.15)', borderRadius: '0 0 12px 12px' }}>
            <Link href="/pipeline" className="btn ghost">Cancelar</Link>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" className="btn">Guardar borrador</button>
              <button type="submit" className="btn primary" disabled={pending || !title.trim()}>
                <IcCheck size={15} /> {pending ? 'Creando…' : 'Crear deal'}
              </button>
            </div>
          </div>
        </div>

        {/* Live summary rail */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          {/* Gradient header */}
          <div style={{ padding: '20px 22px 18px', background: 'var(--gradient)', color: '#0A0A0B' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 700, opacity: 0.7 }}>
              Valor ponderado
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 8, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
              €{weighted.toLocaleString('en-US')}
            </div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
              {probability}% probabilidad sobre €{value.toLocaleString('en-US')}
            </div>
          </div>

          {/* Summary rows */}
          <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Vertical',  value: VERTICALS.find((v) => v.key === vertical)?.label ?? '—' },
              { label: 'Etapa',     value: selectedStage?.title ?? '—' },
              { label: 'Empresa',   value: company || '—' },
              { label: 'Cierre',    value: closeDate || '—' },
            ].map((r) => (
              <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                <span style={{ color: 'var(--muted)', fontSize: 11.5, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, flex: 1 }}>{r.label}</span>
                <span style={{ fontWeight: 600 }}>{r.value}</span>
              </div>
            ))}

            {tags.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13 }}>
                <span style={{ color: 'var(--muted)', fontSize: 11.5, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, flex: 1 }}>Tags</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'flex-end', maxWidth: 180 }}>
                  {tags.slice(0, 3).map((t) => (
                    <span key={t} className="tag" style={{ fontSize: 10.5 }}>{t}</span>
                  ))}
                  {tags.length > 3 && <span style={{ color: 'var(--muted)', fontSize: 11 }}>+{tags.length - 3}</span>}
                </div>
              </div>
            )}

            <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />

            {/* AI suggestion */}
            <div style={{ marginTop: 6, padding: 12, background: 'rgba(0,212,170,0.05)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 8, display: 'flex', gap: 10 }}>
              <span style={{ color: 'var(--teal)', flexShrink: 0, marginTop: 1 }}><IcSparkle size={16} /></span>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
                <b style={{ color: '#fff' }}>Sugerencia IA:</b> deals similares en Healthcare cierran 11 días antes con 2 stakeholders adicionales.
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
