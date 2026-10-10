// src/components/Footer.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import Icon, { WhatsAppIcon } from "./ui/Icon";
import { BRAND } from "../utils/siteConfig";

const COLUMNS = [
  {
    title: "Domestic Tours",
    links: [
      { label: "Kashmir Holidays", to: "/destinations?category=Domestic&search=Kashmir" },
      { label: "Kerala Backwaters", to: "/destinations?category=Domestic&search=Kerala" },
      { label: "Goa Beach Breaks", to: "/destinations?category=Domestic&search=Goa" },
      { label: "Rajasthan Heritage", to: "/destinations?category=Domestic&search=Rajasthan" },
      { label: "Himachal Pradesh", to: "/destinations?category=Domestic&search=Himachal" },
      { label: "Andaman Islands", to: "/destinations?category=Domestic&search=Andaman" },
      { label: "Ladakh Expeditions", to: "/destinations?category=Domestic&search=Ladakh" },
    ],
  },
  /*
  {
    title: "International Tours",
    links: [
      { label: "Bali", to: "/destinations?category=International&search=Bali" },
      { label: "Dubai", to: "/destinations?category=International&search=Dubai" },
      { label: "Thailand", to: "/destinations?category=International&search=Thailand" },
      { label: "Maldives", to: "/destinations?category=International&search=Maldives" },
      { label: "Switzerland", to: "/destinations?category=International&search=Switzerland" },
      { label: "Singapore", to: "/destinations?category=International&search=Singapore" },
      { label: "Vietnam", to: "/destinations?category=International&search=Vietnam" },
    ],
  },
  */
  {
    title: "Tour Packages",
    links: [
      { label: "Honeymoon Packages", to: "/packages?tag=Honeymoon" },
      { label: "Family Holidays", to: "/packages?tag=Family" },
      { label: "Adventure Tours", to: "/packages?type=Adventure" },
      { label: "Budget Getaways", to: "/packages?maxBudget=15000" },
      { label: "Luxury Escapes", to: "/packages?minBudget=75000" },
      { label: "Group Departures", to: "/packages?tag=Group" },
      { label: "Corporate & MICE", to: "/packages?tag=Corporate" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | error

  const subscribe = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    setState("sending");
    try {
      const res = await api.submitContact({
        name: "Newsletter subscriber",
        email: value,
        subject: "Newsletter signup",
        message: `Please add ${value} to the deals and offers mailing list.`,
      });
      if (res?.error) setState("error");
      else { setState("done"); setEmail(""); }
    } catch {
      setState("error");
    }
  };

  const waLink = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    `Hi ${BRAND.shortName}! Please send me your latest holiday offers.`
  )}`;

  return (
    <footer style={{ background: "var(--navy-900)", color: "rgba(255,255,255,.78)" }}>
      {/* Newsletter band */}
      <div style={{ background: "linear-gradient(120deg, var(--navy) 0%, var(--navy-700) 100%)" }}>
        <div className="shell" style={F.newsWrap}>
          <div>
            <h3 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 800, margin: 0 }}>
              Offers worth opening, once a month
            </h3>
            <p style={{ margin: "6px 0 0", fontSize: ".88rem", color: "rgba(255,255,255,.75)" }}>
              Seasonal fares, new itineraries and honest destination advice. Unsubscribe any time.
            </p>
          </div>
          <form onSubmit={subscribe} style={F.newsForm}>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" aria-label="Email address"
              className="field-glass" style={{ minWidth: 220, flex: 1 }}
            />
            <button type="submit" className="btn btn-orange" disabled={state === "sending"}>
              {state === "done"
                ? <><Icon name="check" size={16} /> Subscribed</>
                : state === "sending" ? "Sending…" : "Subscribe"}
            </button>
          </form>
          {state === "done" && (
            <p style={{ flexBasis: "100%", margin: "4px 0 0", fontSize: ".8rem", color: "var(--orange-light)" }}>
              You're on the list — we'll be in touch when the next set of fares lands.
            </p>
          )}
          {state === "error" && (
            <p style={{ flexBasis: "100%", margin: "4px 0 0", fontSize: ".8rem", color: "#fca5a5" }}>
              That didn't go through. Please try again, or email us directly.
            </p>
          )}
        </div>
      </div>

      {/* Link columns */}
      <div className="shell" style={{ paddingBlock: 48 }}>
        <div className="im-footer-grid" style={F.grid}>
          {/* Brand block */}
          <div>
            <img src={BRAND.logoDark} alt={BRAND.name} style={{ height: 46, marginBottom: 16 }} />
            <p style={{ fontSize: ".86rem", lineHeight: 1.7, margin: "0 0 16px", maxWidth: 320 }}>
              A Noida-based travel studio building unhurried, well-priced holidays across India
              and beyond — planned by people who have actually walked the route.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              {[
                { href: BRAND.socials.facebook,  label: "Facebook",  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
                { href: BRAND.socials.instagram, label: "Instagram", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { href: BRAND.socials.youtube,   label: "YouTube",   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg> },
                { href: `https://wa.me/${BRAND.whatsapp}`, label: "WhatsApp", icon: <WhatsAppIcon size={16} /> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={F.socialBtn}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--orange)"; e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.14)"; e.currentTarget.style.color = "rgba(255,255,255,.75)"; }}
                >
                  {icon}
                </a>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span style={F.chip}><Icon name="shield" size={12} /> Verified Operator</span>
              <span style={F.chip}><Icon name="lock" size={12} /> Secure Payments</span>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 style={F.colTitle}>{col.title}</h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 9 }}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} style={F.link}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange-light)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.72)")}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 style={F.colTitle}>Get in Touch</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 13 }}>
              <li style={F.contactRow}>
                <Icon name="pin" size={15} style={{ color: "var(--orange-light)", marginTop: 2 }} />
                <span>{BRAND.address}</span>
              </li>
              <li style={F.contactRow}>
                <Icon name="phone" size={15} style={{ color: "var(--orange-light)", marginTop: 2 }} />
                <a href={`tel:${BRAND.phone}`} style={F.link}>{BRAND.phoneDisplay}</a>
              </li>
              <li style={F.contactRow}>
                <WhatsAppIcon size={15} />
                <a href={waLink} target="_blank" rel="noopener noreferrer" style={F.link}>
                  WhatsApp us
                </a>
              </li>
              <li style={F.contactRow}>
                <Icon name="mail" size={15} style={{ color: "var(--orange-light)", marginTop: 2 }} />
                <a href={`mailto:${BRAND.email}`} style={{ ...F.link, wordBreak: "break-all" }}>{BRAND.email}</a>
              </li>
              <li style={F.contactRow}>
                <Icon name="clock" size={15} style={{ color: "var(--orange-light)", marginTop: 2 }} />
                <span>{BRAND.hours}</span>
              </li>
            </ul>

            <div style={{ marginTop: 18, display: "grid", gap: 8 }}>
              <Link to="/about-us" style={F.link}>About us</Link>
              <Link to="/contact" style={F.link}>Plan a trip</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,.12)" }}>
        <div className="shell" style={F.legal}>
          <span style={{ fontSize: ".8rem" }}>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <Link to="/privacy-policy" style={{ ...F.link, fontSize: ".8rem" }}>Privacy Policy</Link>
            <Link to="/terms-of-service" style={{ ...F.link, fontSize: ".8rem" }}>Terms of Service</Link>
            <Link to="/cookie-policy" style={{ ...F.link, fontSize: ".8rem" }}>Cookie Policy</Link>
          </div>
        </div>
      </div>

      <style>{`
        .im-footer-grid { grid-template-columns: 1.4fr repeat(3, 1fr) 1.1fr; }
        @media (max-width: 1080px) { .im-footer-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 720px)  { .im-footer-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px)  { .im-footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}

const F = {
  newsWrap: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 24, paddingBlock: 30, flexWrap: "wrap",
  },
  newsForm: { display: "flex", gap: 10, flexWrap: "wrap", minWidth: 280 },
  grid: { display: "grid", gap: 36 },
  colTitle: {
    color: "#fff", fontSize: 11.5, fontWeight: 800, letterSpacing: ".1em",
    textTransform: "uppercase", margin: "0 0 16px",
  },
  link: {
    color: "rgba(255,255,255,.72)", textDecoration: "none",
    fontSize: ".86rem", transition: "color .18s ease",
  },
  contactRow: { display: "flex", alignItems: "flex-start", gap: 10, fontSize: ".86rem", lineHeight: 1.55 },
  chip: {
    display: "inline-flex", alignItems: "center", gap: 5,
    background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)",
    padding: "5px 11px", borderRadius: 999, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.85)",
  },
  socialBtn: {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    width: 36, height: 36, borderRadius: "50%",
    background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)",
    color: "rgba(255,255,255,.75)", textDecoration: "none",
    transition: "background .18s ease, border-color .18s ease, color .18s ease",
  },
  legal: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 16, paddingBlock: 18, flexWrap: "wrap",
  },
};
