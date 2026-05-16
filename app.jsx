/* App shell + router */
function Topbar({ route, goto }) {
  const labels = {
    dashboard: ['Workspace', 'Dashboard'],
    contacts: ['Workspace', 'Contactos'],
    'contact-detail': ['Contactos', 'Detalle'],
    pipeline: ['Workspace', 'Pipeline'],
    'new-deal': ['Pipeline', 'Nuevo deal'],
    deals: ['Workspace', 'Deals'],
    activities: ['Workspace', 'Actividades'],
    reports: ['Operaciones', 'Reportes'],
    inbox: ['Operaciones', 'Inbox'],
    settings: ['Operaciones', 'Ajustes'],
  };
  const [parent, current] = labels[route] || labels.dashboard;
  return (
    <header className="topbar">
      <div className="crumbs">
        <span>{parent}</span>
        <IcChevRight size={12} />
        <span className="crumb-current">{current}</span>
      </div>
      <div className="search">
        <span className="search-icon"><IcSearch size={16} /></span>
        <input placeholder="Buscar contactos, deals, empresas…" />
        <span className="kbd">⌘K</span>
      </div>
      <button className="icon-btn" title="Nuevo" onClick={() => goto('new-deal')}><IcPlus size={16} /></button>
      <button className="icon-btn" title="Notificaciones"><IcBell size={16} /><span className="dot" /></button>
      <button className="icon-btn" title="Calendario"><IcCalendar size={16} /></button>
    </header>
  );
}

function App() {
  const [route, setRoute] = React.useState('dashboard');
  const [contactId, setContactId] = React.useState(1);

  const goto = (r, id) => {
    if (r === 'contact-detail' && id != null) setContactId(id);
    setRoute(r);
    // scroll main back to top on route change
    requestAnimationFrame(() => {
      const main = document.querySelector('.main');
      if (main) main.scrollTop = 0;
      window.scrollTo({ top: 0 });
    });
  };

  let screen;
  switch (route) {
    case 'dashboard':       screen = <Dashboard goto={goto} />; break;
    case 'contacts':        screen = <Contacts goto={goto} />; break;
    case 'contact-detail':  screen = <ContactDetail contactId={contactId} goto={goto} />; break;
    case 'pipeline':        screen = <Pipeline goto={goto} />; break;
    case 'new-deal':        screen = <NewDeal goto={goto} />; break;
    default:                screen = <Empty route={route} goto={goto} />;
  }

  return (
    <React.Fragment>
      <div className="hex-bg" />
      <div className="app">
        <Sidebar route={route} setRoute={(r) => goto(r)} />
        <div className="main">
          <Topbar route={route} goto={goto} />
          {screen}
        </div>
      </div>
    </React.Fragment>
  );
}

function Empty({ route, goto }) {
  const titles = {
    deals: 'Deals',
    activities: 'Actividades',
    reports: 'Reportes',
    inbox: 'Inbox',
    settings: 'Ajustes',
  };
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">{titles[route] || 'Sección'}</div>
          <div className="page-subtitle">Esta vista aún no está incluida en el demo. Navega a Dashboard, Contactos o Pipeline.</div>
        </div>
      </div>
      <div className="card" style={{ padding: 48, textAlign: 'center' }}>
        <div style={{ display: 'inline-grid', placeItems: 'center', width: 56, height: 56, borderRadius: 14, background: 'var(--gradient-soft)', color: 'var(--teal)', marginBottom: 16 }}>
          <IcSparkle size={24} />
        </div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Sección en construcción</div>
        <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 6, maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
          Este prototipo cubre Dashboard, Contactos, Detalle, Pipeline Kanban y Nuevo Deal.
        </div>
        <button className="btn primary" style={{ marginTop: 18 }} onClick={() => goto('dashboard')}>Volver al Dashboard</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
