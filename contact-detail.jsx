/* Contact detail — timeline */
function ContactDetail({ contactId, goto }) {
  const c = CONTACTS.find(x => x.id === contactId) || CONTACTS[0];
  const [tab, setTab] = React.useState('overview');

  const icons = {
    call:    <IcPhone size={16} />,
    email:   <IcMail size={16} />,
    meeting: <IcVideo size={16} />,
    note:    <IcDoc size={16} />,
    task:    <IcCheck size={16} />,
    doc:     <IcDoc size={16} />,
    star:    <IcSparkle size={16} />,
  };

  return (
    <div className="page">
      <div className="crumbs" style={{ marginBottom: 18 }}>
        <span onClick={() => goto('contacts')} style={{ cursor: 'pointer' }}>Contactos</span>
        <IcChevRight size={12} />
        <span className="crumb-current">{c.name}</span>
      </div>

      <div className="detail">
        {/* Left rail: contact card */}
        <div>
          <div className="card contact-card">
            <div className="big-av">{c.initial}</div>
            <div className="contact-name">{c.name}</div>
            <div className="contact-role">{c.role}</div>
            <div className="contact-badges">
              <span className={"badge " + c.vertical}>
                <span className="badge-dot" style={{ background: VERTICALS[c.vertical].color }} />
                {VERTICALS[c.vertical].label}
              </span>
              <span className={"badge " + c.status}>
                <span className="badge-dot" style={{ background: c.status === 'customer' ? '#00D4AA' : c.status === 'prospect' ? '#E040A0' : '#8A8A8F' }} />
                {STATUSES[c.status].label}
              </span>
            </div>
            <div className="contact-actions">
              <button className="btn teal"><IcPhone size={14} /> Llamar</button>
              <button className="btn"><IcMail size={14} /> Email</button>
              <button className="btn" style={{ gridColumn: '1 / -1' }}><IcCalendar size={14} /> Agendar reunión</button>
            </div>

            <div className="contact-meta">
              <div className="meta-row">
                <span className="meta-ico"><IcBuilding size={16} /></span>
                <span className="meta-lbl">Empresa</span>
                <span className="meta-val">{c.company}</span>
              </div>
              <div className="meta-row">
                <span className="meta-ico"><IcMail size={16} /></span>
                <span className="meta-lbl">Email</span>
                <span className="meta-val" style={{ fontSize: 12 }}>{c.email}</span>
              </div>
              <div className="meta-row">
                <span className="meta-ico"><IcPhone size={16} /></span>
                <span className="meta-lbl">Tel.</span>
                <span className="meta-val tnum">{c.phone}</span>
              </div>
              <div className="meta-row">
                <span className="meta-ico"><IcMapPin size={16} /></span>
                <span className="meta-lbl">Sede</span>
                <span className="meta-val">{c.city}</span>
              </div>
              <div className="meta-row">
                <span className="meta-ico"><IcLinkedin size={16} /></span>
                <span className="meta-lbl">Social</span>
                <span className="meta-val" style={{ color: 'var(--teal)' }}>linkedin.com/in/{c.name.toLowerCase().replace(' ', '-')}</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 16, padding: 22 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>Lead score</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <div className="gradient-text" style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1 }}>92</div>
              <div style={{ color: 'var(--muted)', fontSize: 12 }}>/ 100 · alto</div>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 99, marginTop: 12, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '92%', background: 'var(--gradient)', borderRadius: 99 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11.5, color: 'var(--muted)' }}>
              <span>Engagement <b style={{ color: '#fff' }}>Alto</b></span>
              <span>Fit <b style={{ color: '#fff' }}>Excelente</b></span>
            </div>
          </div>
        </div>

        {/* Right: activity */}
        <div>
          <div className="tabs">
            {['overview','activities','deals','notes','files'].map(t => (
              <div key={t} className={"tab " + (tab === t ? 'active' : '')} onClick={() => setTab(t)}>
                {{overview:'Overview', activities:'Actividades', deals:'Deals', notes:'Notas', files:'Archivos'}[t]}
              </div>
            ))}
          </div>

          <div className="stats-grid">
            <div className="card stat-mini">
              <div className="lbl">Valor en pipeline</div>
              <div className="val">€{c.value.toLocaleString('en-US')}</div>
              <div className="sub"><span style={{ color: 'var(--teal)' }}>+12.4%</span> vs. trimestre anterior</div>
            </div>
            <div className="card stat-mini">
              <div className="lbl">Deals activos</div>
              <div className="val">3</div>
              <div className="sub">1 en negociación · 2 en cualificación</div>
            </div>
            <div className="card stat-mini">
              <div className="lbl">Último contacto</div>
              <div className="val">hace {c.last}</div>
              <div className="sub">Llamada de descubrimiento</div>
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div>
                <div className="card-title">Timeline de actividad</div>
                <div className="card-sub">{TIMELINE.length} eventos · últimos 30 días</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn ghost" style={{ height: 32, padding: '0 12px', fontSize: 12 }}><IcFilter size={13} /> Filtrar</button>
                <button className="btn teal" style={{ height: 32, padding: '0 12px', fontSize: 12 }}><IcPlus size={13} /> Añadir</button>
              </div>
            </div>
            <div style={{ padding: '6px 22px 18px' }}>
              <div className="timeline">
                {TIMELINE.map(t => (
                  <div key={t.id} className="tl-item">
                    <div className="tl-ico">{icons[t.kind]}</div>
                    <div>
                      <div className="tl-title">{t.title}</div>
                      <div className="tl-body">{t.body}</div>
                    </div>
                    <div className="tl-time">{t.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ContactDetail = ContactDetail;
