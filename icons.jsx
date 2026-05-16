/* Stroke 1.5 icons, teal by default via currentColor */
const Ic = ({ d, size = 18, viewBox = "0 0 24 24", children, fill = "none" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill={fill} stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
);

const IcHome = (p) => <Ic {...p}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" /></Ic>;
const IcUsers = (p) => <Ic {...p}><circle cx="9" cy="8" r="3.2"/><path d="M2.5 19a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M21.5 18a4.5 4.5 0 0 0-6-4.2"/></Ic>;
const IcKanban = (p) => <Ic {...p}><rect x="3" y="4" width="4.5" height="16" rx="1.2"/><rect x="9.75" y="4" width="4.5" height="10" rx="1.2"/><rect x="16.5" y="4" width="4.5" height="13" rx="1.2"/></Ic>;
const IcBrief = (p) => <Ic {...p}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/></Ic>;
const IcChart = (p) => <Ic {...p}><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></Ic>;
const IcCalendar = (p) => <Ic {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 3v4M16 3v4"/></Ic>;
const IcMail = (p) => <Ic {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></Ic>;
const IcCog = (p) => <Ic {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8L4.2 7.1A2 2 0 1 1 7 4.3l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1c0 .7.4 1.3 1 1.5a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.2.6.8 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Ic>;
const IcSearch = (p) => <Ic {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></Ic>;
const IcBell = (p) => <Ic {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/></Ic>;
const IcPlus = (p) => <Ic {...p}><path d="M12 5v14M5 12h14"/></Ic>;
const IcFilter = (p) => <Ic {...p}><path d="M3 5h18l-7 8v6l-4-2v-4z"/></Ic>;
const IcChevDown = (p) => <Ic {...p}><polyline points="6 9 12 15 18 9"/></Ic>;
const IcChevRight = (p) => <Ic {...p}><polyline points="9 6 15 12 9 18"/></Ic>;
const IcArrowUp = (p) => <Ic {...p}><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></Ic>;
const IcArrowDown = (p) => <Ic {...p}><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></Ic>;
const IcPhone = (p) => <Ic {...p}><path d="M22 16.9v2.6a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.2 4 2 2 0 0 1 4.2 2h2.6a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L7.8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/></Ic>;
const IcMessage = (p) => <Ic {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Ic>;
const IcVideo = (p) => <Ic {...p}><path d="M23 7l-7 5 7 5z"/><rect x="1" y="5" width="15" height="14" rx="2"/></Ic>;
const IcCheck = (p) => <Ic {...p}><polyline points="20 6 9 17 4 12"/></Ic>;
const IcDoc = (p) => <Ic {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h8M8 17h6"/></Ic>;
const IcMore = (p) => <Ic {...p}><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></Ic>;
const IcStar = (p) => <Ic {...p}><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9 12 2"/></Ic>;
const IcMapPin = (p) => <Ic {...p}><path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.8"/></Ic>;
const IcBuilding = (p) => <Ic {...p}><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 7h2M8 11h2M8 15h2M14 7h2M14 11h2M14 15h2M9 21v-3h6v3"/></Ic>;
const IcGlobe = (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></Ic>;
const IcLinkedin = (p) => <Ic {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2a4 4 0 0 1 2-2z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></Ic>;
const IcSparkle = (p) => <Ic {...p}><path d="M12 3l1.8 4.6L18 9.5l-4.2 1.9L12 16l-1.8-4.6L6 9.5l4.2-1.9z"/><path d="M19 17l.8 1.7L21 19l-1.2.3-.8 1.7-.8-1.7L17 19l1.2-.3z"/></Ic>;
const IcFlask = (p) => <Ic {...p}><path d="M9 2h6"/><path d="M10 2v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L14 8V2"/><path d="M7 14h10"/></Ic>;
const IcTrendUp = (p) => <Ic {...p}><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></Ic>;
const IcWallet = (p) => <Ic {...p}><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h16v4"/><path d="M3 7v12a2 2 0 0 0 2 2h16v-9H5a2 2 0 0 1-2-2z"/><circle cx="17" cy="14" r="1"/></Ic>;
const IcTarget = (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></Ic>;
const IcClock = (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></Ic>;
const IcX = (p) => <Ic {...p}><path d="M18 6L6 18M6 6l12 12"/></Ic>;

Object.assign(window, {
  Ic, IcHome, IcUsers, IcKanban, IcBrief, IcChart, IcCalendar, IcMail, IcCog,
  IcSearch, IcBell, IcPlus, IcFilter, IcChevDown, IcChevRight, IcArrowUp, IcArrowDown,
  IcPhone, IcMessage, IcVideo, IcCheck, IcDoc, IcMore, IcStar, IcMapPin, IcBuilding,
  IcGlobe, IcLinkedin, IcSparkle, IcFlask, IcTrendUp, IcWallet, IcTarget, IcClock, IcX
});
