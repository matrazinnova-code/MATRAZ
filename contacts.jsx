/* Contacts list — search, vertical/status filters, sortable columns */
function Avatar({ initial, vertical }) {
  const color = vertical ? VERTICALS[vertical].color : '#8A8A8F';
  return (
    <div className="cell-avatar"
      style={{
        background: `linear-gradient(135deg, ${color}33 0%, ${color}11 100%)`,
        color, borderColor: `${color}44`
      }}>
      {initial}
    </div>
  );
}

function Contacts({ goto }) {
  const [query, setQuery] = React.useState('');
  const [vertical, setVertical] = React.useState('all');
  const [status, setStatus] = React.useState('all');
  const [sortKey, setSortKey] = React.useState('value');
  const [sortDir, setSortDir] = React.useState('desc');

  const filtered = React.useMemo(() => {
    let out = CONTACTS.filter(c => {
      const q = query.trim().toLowerCase();
      if (q && !(c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))) return false;
      if (vertical !== 'all' && c.vertical !== vertical) return false;
      if (status !== 'all' && c.status !== status) return false;
      return true;
    });
    out.sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey];
      const cmp = (typeof va === 'number') ? va - vb : String(va).localeCompare(String(vb));
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return out;
  }, [query, vertical, status, sortKey, sortDir]);

  const toggleSort = (k) => {
    if (sortKey === k) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(k); setSortDir('asc'); }
  };
  const arrow = (k) => sortKey === k ? <span className="sort-arrow">{sortDir === 'asc' ? '↑' : '↓'}</span> : null;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Contactos</div>
          <div className="page-subtitle">{filtered.length} de {CONTACTS.length} · filtros activos: {[vertical !== 'all' ? VERTICALS[vertical].label : null, status !== 'all' ? STATUSES[status].label : null].filter(Boolean).join(' · ') || 'Ninguno'}</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn ghost"><IcDoc size={15} /> Exportar CSV</button>
          <button className="btn primary"><IcPlus size={15} /> Nuevo contacto</button>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <span className="search-icon"><IcSearch size={16} /></span>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por nombre, empresa o email…" />
        </div>
        <div className="divider-v" />
        <span className="muted" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>Vertical</span>
        <div className={"chip " + (vertical === 'all' ? 'active' : '')} onClick={() => setVertical('all')}>Todas</div>
        {Object.values(VERTICALS).map(v => (
          <div key={v.key}
            className={"chip " + (vertical === v.key ? 'active' : '')}
            onClick={() => setVertical(v.key)}
            style={vertical === v.key ? { color: v.color, borderColor: v.color + '66', background: v.color + '14' } : null}>
            <span className="chip-dot" style={{ background: v.color }} />{v.label}
          </div>
        ))}
        <div className="divider-v" />
        <span className="muted" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>Estado</span>
        <div className={"chip " + (status === 'all' ? 'active' : '')} onClick={() => setStatus('all')}>Todos</div>
        {Object.values(STATUSES).map(s => (
          <div key={s.key} className={"chip " + (status === s.key ? 'active' : '')} onClick={() => setStatus(s.key)}>
            {s.label}
          </div>
        ))}
        <button className="btn ghost" style={{ marginLeft: 'auto' }}><IcFilter size={14} /> Más filtros</button>
      </div>

      <div className="card">
        <table className="contacts">
          <thead>
            <tr>
              <th className="sortable" onClick={() => toggleSort('name')} style={{ width: '24%' }}>Contacto {arrow('name')}</th>
              <th className="sortable" onClick={() => toggleSort('company')} style={{ width: '22%' }}>Empresa {arrow('company')}</th>
              <th>Vertical</th>
              <th>Estado</th>
              <th className="sortable tnum" onClick={() => toggleSort('value')} style={{ textAlign: 'right' }}>Valor {arrow('value')}</th>
              <th>Último contacto</th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} onClick={() => goto('contact-detail', c.id)}>
                <td>
                  <div className="cell-name">
                    <Avatar initial={c.initial} vertical={c.vertical} />
                    <div>
                      <div className="cell-name-main">{c.name}</div>
                      <div className="cell-name-sub">{c.role}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="cell-co">{c.company}</div>
                  <div className="cell-co-sub">{c.industry}</div>
                </td>
                <td>
                  <span className={"badge " + c.vertical}>
                    <span className="badge-dot" style={{ background: VERTICALS[c.vertical].color }} />
                    {VERTICALS[c.vertical].label}
                  </span>
                </td>
                <td>
                  <span className={"badge " + c.status}>
                    <span className="badge-dot" style={{ background: c.status === 'customer' ? '#00D4AA' : c.status === 'prospect' ? '#E040A0' : '#8A8A8F' }} />
                    {STATUSES[c.status].label}
                  </span>
                </td>
                <td className="cell-val" style={{ textAlign: 'right' }}>€{c.value.toLocaleString('en-US')}</td>
                <td className="muted tnum">hace {c.last}</td>
                <td>
                  <button className="icon-btn" style={{ width: 30, height: 30 }} onClick={(e) => e.stopPropagation()}><IcMore size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-foot">
          <span>Mostrando 1–{filtered.length} de 247 contactos</span>
          <div className="pager">
            <div className="pg">‹</div>
            <div className="pg active">1</div>
            <div className="pg">2</div>
            <div className="pg">3</div>
            <div className="pg">…</div>
            <div className="pg">21</div>
            <div className="pg">›</div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Contacts = Contacts;
window.Avatar = Avatar;
