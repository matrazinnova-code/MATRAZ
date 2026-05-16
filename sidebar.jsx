/* Matraz Innova — logotipo oficial (PNG lockup blanco) */
function MatrazLogo({ width = 168 }) {
  return (
    <img
      src="assets/matraz-innova-logo.png"
      alt="Matraz Innova"
      style={{ width, height: 'auto', display: 'block', userSelect: 'none' }}
      draggable={false}
    />
  );
}

function NavItem({ icon, label, count, active, onClick }) {
  return (
    <div className={"nav-item" + (active ? " active" : "")} onClick={onClick}>
      <span className="nav-icon">{icon}</span>
      <span>{label}</span>
      {count != null && <span className="nav-count">{count}</span>}
    </div>
  );
}

function Sidebar({ route, setRoute }) {
  const primary = [
    { id: 'dashboard', label: 'Dashboard',  icon: <IcHome /> },
    { id: 'contacts',  label: 'Contactos',  icon: <IcUsers />,  count: 247 },
    { id: 'pipeline',  label: 'Pipeline',   icon: <IcKanban />, count: 12 },
    { id: 'deals',     label: 'Deals',      icon: <IcBrief /> },
    { id: 'activities',label: 'Actividades',icon: <IcCalendar />, count: 8 },
  ];
  const secondary = [
    { id: 'reports', label: 'Reportes', icon: <IcChart /> },
    { id: 'inbox',   label: 'Inbox',    icon: <IcMail />, count: 3 },
    { id: 'settings',label: 'Ajustes',  icon: <IcCog /> },
  ];
  return (
    <aside className="sidebar">
      <div className="brand">
        <MatrazLogo width={172} />
        <div className="brand-tag">CRM · v2.0</div>
      </div>

      <div className="nav-section">
        <div className="nav-label">Workspace</div>
        {primary.map(n => (
          <NavItem key={n.id} {...n}
            active={route === n.id || (n.id === 'contacts' && route === 'contact-detail')}
            onClick={() => setRoute(n.id)} />
        ))}
      </div>

      <div className="nav-section">
        <div className="nav-label">Operaciones</div>
        {secondary.map(n => (
          <NavItem key={n.id} {...n} active={route === n.id} onClick={() => setRoute(n.id)} />
        ))}
      </div>

      <div className="sidebar-foot">
        <div className="user-pill">
          <div className="avatar">IM</div>
          <div style={{ minWidth: 0 }}>
            <div className="user-name">Iván Martín</div>
            <div className="user-role">Partner · Healthcare</div>
          </div>
          <div style={{ marginLeft: 'auto', color: 'var(--muted)' }}><IcChevRight size={14} /></div>
        </div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
window.MatrazLogo = MatrazLogo;
