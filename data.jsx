/* Demo data for Matraz Innova CRM */

const VERTICALS = {
  business:   { key: 'business',   label: 'Business',   color: '#C0C0C8' },
  healthcare: { key: 'healthcare', label: 'Healthcare', color: '#00B4D8' },
  it:         { key: 'it',         label: 'IT',         color: '#7B5FFF' },
};

const STATUSES = {
  lead:     { key: 'lead',     label: 'Lead' },
  prospect: { key: 'prospect', label: 'Prospect' },
  customer: { key: 'customer', label: 'Customer' },
};

const CONTACTS = [
  { id: 1, name: 'Lucía Marín',      role: 'Chief Medical Officer',   company: 'Bioteca Labs',      industry: 'Pharma R&D',      vertical: 'healthcare', status: 'customer', value: 248000, last: '2d',  email: 'lucia.marin@bioteca.com',     phone: '+34 612 224 901', city: 'Barcelona, ES',  initial: 'LM' },
  { id: 2, name: 'Diego Ferraro',    role: 'VP of Engineering',        company: 'NovaCore Systems',  industry: 'Healthtech SaaS', vertical: 'it',         status: 'prospect', value: 184500, last: '5h',  email: 'd.ferraro@novacore.io',       phone: '+34 698 113 472', city: 'Madrid, ES',     initial: 'DF' },
  { id: 3, name: 'Amara Okonkwo',    role: 'Head of Strategy',         company: 'Vector Partners',   industry: 'Consulting',      vertical: 'business',   status: 'lead',     value: 96000,  last: '1w',  email: 'amara@vectorpartners.co',     phone: '+44 207 998 1430', city: 'London, UK',     initial: 'AO' },
  { id: 4, name: 'Sara Brunner',     role: 'Director of Operations',   company: 'Helixa Pharma',     industry: 'Biotech',         vertical: 'healthcare', status: 'customer', value: 412000, last: '1d',  email: 's.brunner@helixa.de',         phone: '+49 30 220 4188',  city: 'Berlin, DE',     initial: 'SB' },
  { id: 5, name: 'Mateo Iglesias',   role: 'CTO',                      company: 'Quantix MedTech',   industry: 'Medical devices', vertical: 'it',         status: 'prospect', value: 134200, last: '3d',  email: 'mateo@quantix.health',        phone: '+34 644 776 020',  city: 'Valencia, ES',   initial: 'MI' },
  { id: 6, name: 'Henrik Valsdóttir', role: 'Finance Director',        company: 'Northwind Capital', industry: 'Healthcare PE',   vertical: 'business',   status: 'prospect', value: 220000, last: '4d',  email: 'h.valsdottir@nw-capital.eu',  phone: '+354 552 7811',    city: 'Reykjavík, IS',  initial: 'HV' },
  { id: 7, name: 'Priya Raghavan',   role: 'Clinical Trials Lead',     company: 'Mendelia Genomics', industry: 'Genomics',        vertical: 'healthcare', status: 'lead',     value: 76500,  last: '2w',  email: 'priya@mendelia.bio',          phone: '+1 415 220 7741',  city: 'San Francisco',  initial: 'PR' },
  { id: 8, name: 'Joaquín Pereira',  role: 'Data Platform Lead',       company: 'Astra Health Cloud',industry: 'Healthtech',      vertical: 'it',         status: 'customer', value: 312000, last: '8h',  email: 'jp@astra.health',             phone: '+351 21 998 7012', city: 'Lisboa, PT',     initial: 'JP' },
  { id: 9, name: 'Elena Costa',      role: 'Managing Partner',         company: 'Costa Advisory',    industry: 'Consulting',      vertical: 'business',   status: 'customer', value: 158000, last: '6d',  email: 'elena@costa-advisory.it',     phone: '+39 06 4520 8810', city: 'Rome, IT',       initial: 'EC' },
  { id:10, name: 'Tomasz Wieczorek', role: 'Head of Infrastructure',   company: 'Synapse Systems',   industry: 'IT Services',     vertical: 'it',         status: 'lead',     value: 64000,  last: '11d', email: 'tomasz.w@synapse-sys.eu',     phone: '+48 22 449 1102',  city: 'Warsaw, PL',     initial: 'TW' },
  { id:11, name: 'Camille Aubert',   role: 'Regulatory Affairs',       company: 'Atlas Biopharma',   industry: 'Pharma',          vertical: 'healthcare', status: 'prospect', value: 198000, last: '1d',  email: 'c.aubert@atlasbio.fr',        phone: '+33 1 4422 9015',  city: 'Paris, FR',      initial: 'CA' },
  { id:12, name: 'Reza Hashemi',     role: 'Strategy Consultant',      company: 'Brightline Group',  industry: 'Consulting',      vertical: 'business',   status: 'lead',     value: 52000,  last: '3w',  email: 'reza@brightline.group',       phone: '+1 646 770 2110',  city: 'New York',       initial: 'RH' },
];

const STAGES = [
  { id: 'lead',        title: 'Lead',         color: '#8A8A8F' },
  { id: 'qualified',   title: 'Qualified',    color: '#C0C0C8' },
  { id: 'proposal',    title: 'Proposal',     color: '#00B4D8' },
  { id: 'negotiation', title: 'Negotiation',  color: '#7B5FFF' },
  { id: 'closing',     title: 'Closing',      color: '#E040A0' },
  { id: 'won',         title: 'Won',          color: '#00D4AA' },
];

const DEALS_INIT = [
  { id: 'd1',  title: 'Cardio platform — Phase II rollout',  company: 'Bioteca Labs',       contact: 'Lucía Marín',     vertical: 'healthcare', value: 248000, stage: 'closing',     owner: 'IM', age: 14 },
  { id: 'd2',  title: 'ERP migration to cloud-native',       company: 'NovaCore Systems',   contact: 'Diego Ferraro',   vertical: 'it',         value: 184500, stage: 'negotiation', owner: 'AR', age: 21 },
  { id: 'd3',  title: 'GTM strategy refresh — EMEA',         company: 'Vector Partners',    contact: 'Amara Okonkwo',   vertical: 'business',   value: 96000,  stage: 'qualified',   owner: 'IM', age: 6 },
  { id: 'd4',  title: 'Regulatory dossier automation',       company: 'Helixa Pharma',      contact: 'Sara Brunner',    vertical: 'healthcare', value: 412000, stage: 'won',         owner: 'CL', age: 45 },
  { id: 'd5',  title: 'IoT telemetry for surgical devices',  company: 'Quantix MedTech',    contact: 'Mateo Iglesias',  vertical: 'it',         value: 134200, stage: 'proposal',    owner: 'AR', age: 9 },
  { id: 'd6',  title: 'M&A diligence — Northwind portfolio', company: 'Northwind Capital',  contact: 'Henrik V.',       vertical: 'business',   value: 220000, stage: 'negotiation', owner: 'IM', age: 30 },
  { id: 'd7',  title: 'Clinical trial CRM integration',      company: 'Mendelia Genomics',  contact: 'Priya Raghavan',  vertical: 'healthcare', value: 76500,  stage: 'lead',        owner: 'CL', age: 3 },
  { id: 'd8',  title: 'Data lake & analytics buildout',      company: 'Astra Health Cloud', contact: 'Joaquín Pereira', vertical: 'it',         value: 312000, stage: 'closing',     owner: 'AR', age: 18 },
  { id: 'd9',  title: 'Operating model redesign',            company: 'Costa Advisory',     contact: 'Elena Costa',     vertical: 'business',   value: 158000, stage: 'proposal',    owner: 'IM', age: 12 },
  { id: 'd10', title: 'SOC2 readiness & audit',              company: 'Synapse Systems',    contact: 'Tomasz W.',       vertical: 'it',         value: 64000,  last: 'now',     stage: 'lead',     owner: 'CL', age: 1 },
  { id: 'd11', title: 'Drug-safety pharmacovigilance',       company: 'Atlas Biopharma',    contact: 'Camille Aubert',  vertical: 'healthcare', value: 198000, stage: 'qualified',   owner: 'IM', age: 7 },
  { id: 'd12', title: 'Commercial excellence program',       company: 'Brightline Group',   contact: 'Reza Hashemi',    vertical: 'business',   value: 52000,  stage: 'lead',        owner: 'CL', age: 4 },
];

const REVENUE_SERIES = {
  // 12 months, monthly closed revenue in €K, by vertical
  months: ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'],
  healthcare: [120, 168, 152, 210, 244, 220, 265, 290, 310, 335, 358, 392],
  it:         [88,  102, 134, 158, 180, 196, 215, 240, 268, 290, 312, 348],
  business:   [54,   71,  82,  95, 108, 122, 130, 142, 155, 168, 176, 192],
};

const TIMELINE = [
  { id: 't1', kind: 'call',     title: 'Llamada de descubrimiento — 32 min',          body: 'Validación de necesidades regulatorias para el rollout en EMEA. Próximo paso: enviar borrador de propuesta antes del 22/05.',  time: 'Hoy · 10:42' },
  { id: 't2', kind: 'email',    title: 'Email enviado — “Propuesta v2.0 — Cardio platform”', body: 'Adjunto entregables, hitos y modelo de pricing por fases. Esperando feedback de Compliance.',  time: 'Ayer · 16:18' },
  { id: 't3', kind: 'meeting',  title: 'Videollamada con equipo clínico',             body: 'Walkthrough técnico con 4 stakeholders. Priorizan trazabilidad de eventos adversos y dashboards FDA-ready.',  time: '13 May · 14:00' },
  { id: 't4', kind: 'note',     title: 'Nota interna añadida por Iván Martín',        body: 'Lucía menciona que el comité aprueba pilotos hasta €280K sin escalado. Sweet spot del deal.',  time: '12 May · 09:05' },
  { id: 't5', kind: 'doc',      title: 'Documento adjunto — NDA mutuo firmado',       body: 'NDA cross-border ejecutado por ambas partes (matraz-nda-2026-118.pdf).',  time: '08 May · 11:50' },
  { id: 't6', kind: 'task',     title: 'Tarea completada — Discovery brief',          body: 'Brief de descubrimiento entregado por Ana R. Validado internamente.',  time: '05 May · 17:30' },
  { id: 't7', kind: 'star',     title: 'Lead calificado por Iván Martín',             body: 'Score 92/100. Healthcare · Enterprise · presupuesto confirmado.', time: '02 May · 09:00' },
];

const UPCOMING = [
  { id: 'u1', title: 'Demo con Bioteca Labs — Cardio v2',       meta: 'Hoy · 17:00 — 45m',   kind: 'video' },
  { id: 'u2', title: 'Sync regulatorio con Helixa Pharma',      meta: 'Mañana · 09:30 — 30m', kind: 'message' },
  { id: 'u3', title: 'Llamada de cierre — NovaCore Systems',    meta: 'Jue 18 · 11:00 — 45m', kind: 'call' },
  { id: 'u4', title: 'Workshop GTM con Vector Partners',        meta: 'Vie 19 · 15:30 — 2h',  kind: 'meeting' },
  { id: 'u5', title: 'Revisión de pipeline — equipo Q2',        meta: 'Lun 22 · 10:00 — 1h',  kind: 'meeting' },
];

const TOP_DEALS = [
  { name: 'Regulatory dossier automation',     company: 'Helixa Pharma',       value: 412000, progress: 92, vertical: 'healthcare' },
  { name: 'Data lake & analytics buildout',    company: 'Astra Health Cloud',  value: 312000, progress: 78, vertical: 'it' },
  { name: 'Cardio platform — Phase II',        company: 'Bioteca Labs',        value: 248000, progress: 68, vertical: 'healthcare' },
  { name: 'M&A diligence — Northwind',         company: 'Northwind Capital',   value: 220000, progress: 54, vertical: 'business' },
  { name: 'Drug-safety pharmacovigilance',     company: 'Atlas Biopharma',     value: 198000, progress: 41, vertical: 'healthcare' },
];

Object.assign(window, {
  VERTICALS, STATUSES, CONTACTS, STAGES, DEALS_INIT, REVENUE_SERIES, TIMELINE, UPCOMING, TOP_DEALS
});
