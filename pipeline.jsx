/* Pipeline Kanban — 6 stages with HTML5 drag & drop */
function Pipeline() {
  const [deals, setDeals] = React.useState(DEALS_INIT);
  const [dragId, setDragId] = React.useState(null);
  const [overCol, setOverCol] = React.useState(null);

  const byStage = (stage) => deals.filter(d => d.stage === stage);
  const sum = (stage) => byStage(stage).reduce((s, d) => s + d.value, 0);

  const onDragStart = (id) => (e) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = 'move';
    try { e.dataTransfer.setData('text/plain', id); } catch (_) {}
  };
  const onDragEnd = () => { setDragId(null); setOverCol(null); };
  const onDragOver = (col) => (e) => { e.preventDefault(); setOverCol(col); };
  const onDrop = (col) => (e) => {
    e.preventDefault();
    if (!dragId) return;
    setDeals(prev => prev.map(d => d.id === dragId ? { ...d, stage: col } : d));
    setDragId(null);
    setOverCol(null);
  };

  const fmt = (v) => v >= 1_000_000 ? `€${(v / 1_000_000).toFixed(2)}M` : `€${(v / 1000).toFixed(0)}K`;
  const totalPipeline = deals.reduce((s, d) => s + d.value, 0);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-title">Pipeline</div>
          <div className="page-subtitle">{deals.length} deals · valor total <b style={{ color: '#fff' }}>{fmt(totalPipeline)}</b> · arrastra para mover entre etapas</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn ghost"><IcFilter size={14} /> Filtros</button>
          <button className="btn ghost"><IcUsers size={14} /> Equipo · Todos</button>
          <button className="btn primary"><IcPlus size={15} /> Nuevo deal</button>
        </div>
      </div>

      <div className="kanban">
        {STAGES.map(stage => {
          const list = byStage(stage.id);
          const stageSum = sum(stage.id);
          const isOver = overCol === stage.id;
          return (
            <div key={stage.id}
              className={"column " + (isOver ? "drag-over" : "")}
              onDragOver={onDragOver(stage.id)}
              onDragLeave={() => setOverCol(prev => prev === stage.id ? null : prev)}
              onDrop={onDrop(stage.id)}>
              <div className="col-head">
                <span className="col-title">{stage.title}</span>
                <span className="col-count">{list.length}</span>
              </div>
              <div className="col-bar" style={{
                background: stage.id === 'won'
                  ? 'linear-gradient(90deg, #00D4AA, #7B5FFF)'
                  : stage.color
              }} />
              <div className="col-sum">Total · <b>{fmt(stageSum)}</b></div>
              <div className="col-body">
                {list.map(d => (
                  <div key={d.id}
                    className={"k-card " + (dragId === d.id ? "dragging" : "")}
                    draggable
                    onDragStart={onDragStart(d.id)}
                    onDragEnd={onDragEnd}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <span className={"badge " + d.vertical}>
                        <span className="badge-dot" style={{ background: VERTICALS[d.vertical].color }} />
                        {VERTICALS[d.vertical].label}
                      </span>
                      {stage.id === 'closing' && d.value >= 200000 && (
                        <span className="badge hot"><IcSparkle size={10} /> Hot</span>
                      )}
                      <button className="icon-btn" style={{ width: 22, height: 22, marginLeft: 'auto', borderColor: 'transparent', background: 'transparent' }}
                        onClick={(e) => e.stopPropagation()}><IcMore size={14} /></button>
                    </div>
                    <div className="k-card-title">{d.title}</div>
                    <div className="k-card-co">{d.company}</div>
                    <div className="k-card-foot">
                      <div className="cell-avatar" style={{ width: 22, height: 22, fontSize: 9.5, background: 'rgba(0,212,170,0.10)', color: 'var(--teal)', borderColor: 'rgba(0,212,170,0.3)' }}>{d.owner}</div>
                      <span className="muted" style={{ fontSize: 11.5 }}>{d.contact}</span>
                      <span className="k-card-val">{fmt(d.value)}</span>
                    </div>
                    <div className="k-card-meta">
                      <IcClock size={11} /> <span>{d.age}d en etapa</span>
                      <span className="sep" />
                      <IcCalendar size={11} /> <span>cierre Jun</span>
                    </div>
                  </div>
                ))}
                <button className="k-add"><IcPlus size={13} /> Añadir deal</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

window.Pipeline = Pipeline;
