/* New Deal form */
function NewDeal({ goto }) {
  const [vertical, setVertical] = React.useState('healthcare');
  const [stage, setStage] = React.useState('qualified');
  const [value, setValue] = React.useState(180000);
  const [name, setName] = React.useState('Plataforma de farmacovigilancia — Fase I');
  const [company, setCompany] = React.useState('Atlas Biopharma');
  const [contact, setContact] = React.useState('Camille Aubert');
  const [closeDate, setCloseDate] = React.useState('2026-07-18');
  const [probability, setProbability] = React.useState(65);
  const [tags, setTags] = React.useState(['EMEA', 'Regulatory', 'Pilot']);
  const [tagInput, setTagInput] = React.useState('');
  const [description, setDescription] = React.useState(
    'Diseño e implementación de plataforma de pharmacovigilancia para mercado EMEA. Incluye dashboard FDA-ready, trazabilidad de eventos adversos y integración con sistemas legados del cliente. Pilot de 90 días con opción de roll-out completo en Q4.'
  );

  const removeTag = (t) => setTags(tags.filter(x => x !== t));
  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="crumbs" style={{ marginBottom: 8 }}>
            <span onClick={() => goto('pipeline')} style={{ cursor: 'pointer' }}>Pipeline</span>
            <IcChevRight size={12} />
            <span className="crumb-current">Nuevo deal</span>
          </div>
          <div className="page-title">Nuevo deal</div>
          <div className="page-subtitle">Captura una oportunidad y asígnala a una etapa del pipeline.</div>
        </div>
        <div className="stepper">
          <div className="step-pill active"><span className="step-num">1</span> Detalles</div>
          <div className="step-line" />
          <div className="step-pill"><span className="step-num">2</span> Stakeholders</div>
          <div className="step-line" />
          <div className="step-pill"><span className="step-num">3</span> Resumen</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>
        <div className="card">
          <div className="form-card-head">
            <div>
              <div className="card-title">Información del deal</div>
              <div className="card-sub">Los campos marcados con <span style={{ color: 'var(--teal)' }}>•</span> son obligatorios.</div>
            </div>
            <button className="btn ghost" style={{ height: 32, padding: '0 12px', fontSize: 12 }}>
              <IcSparkle size={13} /> Sugerir con IA
            </button>
          </div>

          <div style={{ padding: 24 }}>
            <div className="form-grid">
              <div className="field full">
                <label className="label">Nombre del deal <span className="req">•</span></label>
                <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Ej. Implementación CRM — Fase I" />
              </div>

              <div className="field full">
                <label className="label">Vertical <span className="req">•</span></label>
                <div className="seg">
                  {Object.values(VERTICALS).map(v => (
                    <div key={v.key}
                         className={"seg-opt " + v.key + (vertical === v.key ? ' active' : '')}
                         onClick={() => setVertical(v.key)}>
                      <span className="badge-dot" style={{ background: v.color }} />{v.label}
                    </div>
                  ))}
                </div>
                <span className="help">Se aplicará el color de acento correspondiente al deal en pipeline y reportes.</span>
              </div>

              <div className="field">
                <label className="label">Empresa <span className="req">•</span></label>
                <input className="input" value={company} onChange={e => setCompany(e.target.value)} />
              </div>

              <div className="field">
                <label className="label">Contacto principal <span className="req">•</span></label>
                <select className="select" value={contact} onChange={e => setContact(e.target.value)}>
                  {CONTACTS.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div className="field">
                <label className="label">Valor del deal <span className="req">•</span></label>
                <div className="input-prefix">
                  <span>€</span>
                  <input className="input tnum" type="number" value={value} onChange={e => setValue(+e.target.value)} />
                </div>
              </div>

              <div className="field">
                <label className="label">Probabilidad de cierre</label>
                <div className="input-prefix">
                  <input className="input tnum" type="number" value={probability} max="100" min="0" onChange={e => setProbability(+e.target.value)} style={{ paddingLeft: 12, paddingRight: 32 }} />
                  <span style={{ left: 'auto', right: 12 }}>%</span>
                </div>
              </div>

              <div className="field">
                <label className="label">Etapa inicial</label>
                <select className="select" value={stage} onChange={e => setStage(e.target.value)}>
                  {STAGES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
              </div>

              <div className="field">
                <label className="label">Fecha estimada de cierre</label>
                <input className="input" type="date" value={closeDate} onChange={e => setCloseDate(e.target.value)} />
              </div>

              <div className="field full">
                <label className="label">Tags</label>
                <div className="tags-input">
                  {tags.map(t => (
                    <span key={t} className="tag">{t} <span className="x" onClick={() => removeTag(t)}><IcX size={11} /></span></span>
                  ))}
                  <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={addTag} placeholder="Añadir tag y pulsar Enter…" />
                </div>
              </div>

              <div className="field full">
                <label className="label">Descripción</label>
                <textarea className="textarea" value={description} onChange={e => setDescription(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="form-card-foot">
            <button className="btn ghost" onClick={() => goto('pipeline')}>Cancelar</button>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn">Guardar borrador</button>
              <button className="btn primary"><IcCheck size={15} /> Crear deal</button>
            </div>
          </div>
        </div>

        {/* Live summary rail */}
        <div className="deal-summary">
          <div className="deal-summary-head">
            <div className="lbl">Valor ponderado</div>
            <div className="val">€{Math.round(value * probability / 100).toLocaleString('en-US')}</div>
            <div className="ctx">{probability}% probabilidad sobre €{value.toLocaleString('en-US')}</div>
          </div>
          <div className="deal-summary-body">
            <div className="sum-row"><span className="lbl">Vertical</span>
              <span className="val">
                <span className={"badge " + vertical}>
                  <span className="badge-dot" style={{ background: VERTICALS[vertical].color }} />
                  {VERTICALS[vertical].label}
                </span>
              </span>
            </div>
            <div className="sum-row"><span className="lbl">Etapa</span><span className="val">{STAGES.find(s => s.id === stage)?.title}</span></div>
            <div className="sum-row"><span className="lbl">Empresa</span><span className="val">{company}</span></div>
            <div className="sum-row"><span className="lbl">Contacto</span><span className="val">{contact}</span></div>
            <div className="sum-row"><span className="lbl">Cierre</span><span className="val tnum">{closeDate}</span></div>
            <div className="sum-row"><span className="lbl">Tags</span>
              <span style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'flex-end', maxWidth: 180 }}>
                {tags.slice(0, 3).map(t => <span key={t} className="tag" style={{ fontSize: 10.5 }}>{t}</span>)}
                {tags.length > 3 && <span className="muted" style={{ fontSize: 11 }}>+{tags.length - 3}</span>}
              </span>
            </div>
            <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
            <div className="sum-row">
              <span className="lbl">Owner</span>
              <span className="val" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="cell-avatar" style={{ width: 22, height: 22, fontSize: 9.5, background: 'rgba(0,212,170,0.10)', color: 'var(--teal)', borderColor: 'rgba(0,212,170,0.3)' }}>IM</span>
                Iván Martín
              </span>
            </div>
            <div style={{ marginTop: 6, padding: 12, background: 'rgba(0,212,170,0.05)', border: '1px solid rgba(0,212,170,0.2)', borderRadius: 8, display: 'flex', gap: 10 }}>
              <IcSparkle size={16} style={{ color: 'var(--teal)', flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
                <b style={{ color: '#fff' }}>Sugerencia IA:</b> deals similares en Healthcare cierran 11 días antes con un equipo de 2 stakeholders adicionales.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.NewDeal = NewDeal;
