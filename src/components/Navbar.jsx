// src/components/Navbar.jsx — Luxytrix-style redesign with orange accent
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon, { WhatsAppIcon } from "./ui/Icon";
import { BRAND, NAV, promoStrip } from "../utils/siteConfig";

export default function Navbar() {
  const [open, setOpen]     = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [acc, setAcc]       = useState(null);
  const [solid, setSolid]   = useState(false);
  const closeTimer          = useRef(null);
  const { pathname, search } = useLocation();

  useEffect(() => { setDrawer(false); setOpen(null); setAcc(null); }, [pathname, search]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawer]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setOpen(null); setDrawer(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const enter = (label) => { clearTimeout(closeTimer.current); setOpen(label); };
  const leave = () => { closeTimer.current = setTimeout(() => setOpen(null), 140); };

  const waLink = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    `Hi ${BRAND.shortName}! I'd like help planning a trip.`
  )}`;

  return (
    <>
      {/* ── Top contact strip ─────────────────────────── */}
      <div className="im-topbar" style={S.topBar}>
        <div className="shell" style={S.topInner}>
          {/* Left: contact info */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <a href={`tel:${BRAND.phone}`} style={S.topLink}>
              <Icon name="phone" size={12} /> {BRAND.phoneDisplay}
            </a>
            <a href={`mailto:${BRAND.email}`} style={S.topLink}>
              <Icon name="mail" size={12} /> {BRAND.email}
            </a>
            <span style={{ ...S.topLink, opacity: .85 }}>
              <Icon name="pin" size={12} /> {BRAND.city}
            </span>
          </div>

          {/* Right: promo badge + social icons */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={S.promo}>{promoStrip}</span>
            <div className="im-topbar-social" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <a href={BRAND.socials.facebook}  target="_blank" rel="noopener noreferrer" style={S.socialIcon} aria-label="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href={BRAND.socials.instagram} target="_blank" rel="noopener noreferrer" style={S.socialIcon} aria-label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href={BRAND.socials.youtube}   target="_blank" rel="noopener noreferrer" style={S.socialIcon} aria-label="YouTube">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" style={S.socialIcon} aria-label="WhatsApp">
                <WhatsAppIcon size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main bar ──────────────────────────────────── */}
      <header style={{ ...S.bar, boxShadow: solid ? "0 4px 20px rgba(56,11,22,.10)" : "0 1px 0 var(--line)" }}>
        <div className="shell" style={S.barInner}>
          <Link to="/" style={S.logoWrap} aria-label={BRAND.name}>
            <img src={BRAND.logoLight} alt={BRAND.name} style={S.logo} />
          </Link>

          {/* Desktop nav */}
          <nav style={S.nav} className="im-desktop-nav">
            {NAV.map((item) => {
              const active = open === item.label;
              const isContact = item.label === "Contact";
              return (
                <div
                  key={item.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => item.columns && enter(item.label)}
                  onMouseLeave={() => item.columns && leave()}
                >
                  <Link
                    to={item.to}
                    style={{
                      ...S.navLink,
                      color: active ? "var(--orange-dark)" : "var(--navy)",
                    }}
                    onClick={() => setOpen(null)}
                  >
                    {item.label}
                    {isContact && (
                      <span className="badge-hot-pulse" style={{ marginLeft: 4 }}>HOT</span>
                    )}
                    {item.columns && (
                      <Icon name="chevronDown" size={13}
                        style={{ transform: active ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
                    )}
                  </Link>

                  {item.columns && active && (
                    <div
                      className="im-mega-menu"
                      style={{ gridTemplateColumns: `repeat(${item.columns.length}, minmax(140px, 1fr))` }}
                      onMouseEnter={() => enter(item.label)}
                      onMouseLeave={() => leave()}
                    >
                      <div style={{ display: "grid", gap: 24, gridTemplateColumns: `repeat(${item.columns.length}, 1fr)` }}>
                        {item.columns.map((col) => (
                          <div key={col.title}>
                            <div className="im-mega-col-title">{col.title}</div>
                            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 2 }}>
                              {col.links.map((l) => (
                                <li key={l.label}>
                                  <Link to={l.to} className="im-mega-link" onClick={() => setOpen(null)}>
                                    {l.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div style={S.megaFoot}>
                        <Link to={item.to} className="link-more" onClick={() => setOpen(null)}>
                          View all {item.label.toLowerCase()} <Icon name="arrowRight" size={15} />
                        </Link>
                        <Link to="/contact" className="btn btn-orange btn-sm" style={{ marginLeft: "auto" }} onClick={() => setOpen(null)}>
                          <Icon name="magic" size={14} /> Customise Trip
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
               className="btn btn-wa btn-sm im-hide-sm">
              <WhatsAppIcon size={16} /> WhatsApp
            </a>
            <Link to="/contact" className="btn btn-orange btn-sm im-hide-xs">
              <Icon name="send" size={15} /> Get Quote
            </Link>
            <button
              onClick={() => setDrawer(true)} aria-label="Open menu"
              className="im-burger" style={S.burger}
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ─────────────────────────────── */}
      {drawer && (
        <>
          <div style={S.scrim} onClick={() => setDrawer(false)} />
          <aside style={S.drawer}>
            <div style={S.drawerHead}>
              <img src={BRAND.logoLight} alt={BRAND.name} style={{ height: 34 }} />
              <button onClick={() => setDrawer(false)} aria-label="Close menu" style={S.iconBtn}>
                <Icon name="close" size={22} />
              </button>
            </div>

            <nav style={{ padding: "8px 0", overflowY: "auto", flex: 1 }}>
              {NAV.map((item) => (
                <div key={item.label} style={{ borderBottom: "1px solid var(--line)" }}>
                  {item.columns ? (
                    <>
                      <button
                        onClick={() => setAcc(acc === item.label ? null : item.label)}
                        style={S.accBtn}
                      >
                        {item.label}
                        <Icon name="chevronDown" size={16}
                          style={{ transform: acc === item.label ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
                      </button>
                      {acc === item.label && (
                        <div style={{ padding: "0 20px 14px" }}>
                          {item.columns.map((col) => (
                            <div key={col.title} style={{ marginBottom: 12 }}>
                              <div className="im-mega-col-title" style={{ marginBottom: 6 }}>{col.title}</div>
                              {col.links.map((l) => (
                                <Link key={l.label} to={l.to} style={S.drawerSub}>{l.label}</Link>
                              ))}
                            </div>
                          ))}
                          <Link to={item.to} className="link-more" style={{ fontSize: ".82rem" }}>
                            View all <Icon name="arrowRight" size={14} />
                          </Link>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link to={item.to} style={{ ...S.accBtn, display: "block", textDecoration: "none" }}>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div style={S.drawerFoot}>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ width: "100%" }}>
                <WhatsAppIcon size={17} /> Chat on WhatsApp
              </a>
              <Link to="/contact" className="btn btn-orange" style={{ width: "100%" }}>
                <Icon name="send" size={16} /> Get a Free Quote
              </Link>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 4 }}>
                <a href={BRAND.socials.facebook}  target="_blank" rel="noopener noreferrer" style={S.drawerSocial}><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
                <a href={BRAND.socials.instagram} target="_blank" rel="noopener noreferrer" style={S.drawerSocial}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                <a href={BRAND.socials.youtube}   target="_blank" rel="noopener noreferrer" style={S.drawerSocial}><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg></a>
              </div>
              <a href={`tel:${BRAND.phone}`} style={{ ...S.topLink, color: "var(--ink-muted)", justifyContent: "center", marginTop: 4 }}>
                <Icon name="phone" size={13} /> {BRAND.phoneDisplay}
              </a>
            </div>
          </aside>
        </>
      )}

      {/* Responsive rules */}
      <style>{`
        .im-burger { display: none; }
        @media (max-width: 1100px) {
          .im-desktop-nav { display: none !important; }
          .im-burger { display: inline-flex !important; }
        }
        @media (max-width: 860px)  { .im-topbar { display: none !important; } }
        @media (max-width: 640px)  { .im-hide-sm { display: none !important; } }
        @media (max-width: 420px)  { .im-hide-xs { display: none !important; } }
      `}</style>
    </>
  );
}

/* ── styles ─────────────────────────────────────────── */
const S = {
  topBar: { background: "var(--navy)", color: "#fff", fontSize: 12 },
  topInner: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 16, paddingBlock: 8, flexWrap: "wrap",
  },
  topLink: {
    display: "inline-flex", alignItems: "center", gap: 6,
    color: "#fff", textDecoration: "none", fontWeight: 500,
  },
  socialIcon: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    color: "rgba(255,255,255,.75)", transition: "color .18s ease",
  },
  promo: {
    display: "inline-flex", alignItems: "center", gap: 6,
    background: "var(--orange)", color: "#fff",
    padding: "3px 12px", borderRadius: 999, fontWeight: 800, fontSize: 11.5,
  },
  bar: {
    position: "sticky", top: 0, zIndex: 40, background: "#fff",
    transition: "box-shadow .2s ease",
  },
  barInner: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 18, minHeight: 64,
  },
  logoWrap: { display: "flex", alignItems: "center", flexShrink: 0 },
  logo: { height: 42, width: "auto", objectFit: "contain" },
  nav: { display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center" },
  navLink: {
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "20px 12px", textDecoration: "none",
    fontSize: ".875rem", fontWeight: 700, whiteSpace: "nowrap",
    transition: "color .18s ease",
  },
  megaFoot: {
    display: "flex", alignItems: "center", gap: 12,
    borderTop: "1px solid var(--line)", paddingTop: 16, marginTop: 16,
  },
  burger: {
    background: "transparent", border: "none", color: "var(--navy)",
    padding: 6, cursor: "pointer", alignItems: "center",
  },
  iconBtn: { background: "transparent", border: "none", color: "var(--navy)", cursor: "pointer", padding: 4 },
  scrim: { position: "fixed", inset: 0, background: "rgba(26,6,13,.55)", zIndex: 60, backdropFilter: "blur(2px)" },
  drawer: {
    position: "fixed", top: 0, right: 0, bottom: 0, width: "min(360px, 88vw)",
    background: "var(--surface)", zIndex: 61, display: "flex", flexDirection: "column",
    boxShadow: "-8px 0 40px rgba(26,6,13,.24)",
  },
  drawerHead: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 20px", borderBottom: "1px solid var(--line)",
  },
  accBtn: {
    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "15px 20px", background: "transparent", border: "none", cursor: "pointer",
    fontSize: ".95rem", fontWeight: 700, color: "var(--navy)", fontFamily: "inherit", textAlign: "left",
  },
  drawerSub: {
    display: "block", padding: "7px 0", fontSize: ".86rem",
    color: "var(--ink-muted)", textDecoration: "none",
  },
  drawerSocial: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    color: "var(--ink-muted)", transition: "color .18s ease",
  },
  drawerFoot: {
    padding: 20, borderTop: "1px solid var(--line)",
    display: "flex", flexDirection: "column", gap: 10,
  },
};
