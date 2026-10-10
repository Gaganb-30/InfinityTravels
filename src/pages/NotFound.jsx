// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import Icon, { WhatsAppIcon } from "../components/ui/Icon";
import SEO from "../components/ui/SEO";
import { BRAND } from "../utils/siteConfig";

export default function NotFound() {
  const waLink = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.shortName}! I was looking for something on your site.`)}`;

  return (
    <main>
      <SEO title="Page not found" noIndex path="/404" />
      <section style={{ background: "linear-gradient(120deg, var(--navy-900) 0%, var(--navy-700) 100%)", paddingBlock: 76 }}>
        <div className="shell" style={{ textAlign: "center", maxWidth: 620 }}>
          <div style={{ fontSize: "clamp(3.4rem, 2rem + 7vw, 6rem)", fontWeight: 800, color: "var(--orange-light)", lineHeight: 1 }}>
            404
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.35rem, 1.1rem + 1.3vw, 1.9rem)", fontWeight: 800, margin: "16px 0 12px" }}>
            This page has wandered off
          </h1>
          <p style={{ color: "rgba(255,255,255,.8)", lineHeight: 1.7, margin: "0 0 28px" }}>
            The link may be out of date, or the trip may have moved to a new season.
            Try the collections below — or just ask us directly.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/" className="btn btn-orange btn-lg"><Icon name="compass" size={17} /> Back to home</Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg">
              <WhatsAppIcon size={17} /> Ask us
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <h2 className="section-title is-centered" style={{ fontSize: "1.3rem" }}>Popular places to start</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 30 }}>
            {[
              { to: "/destinations?category=Domestic", icon: "mountain", label: "Holidays in India" },
              // { to: "/destinations?category=International", icon: "plane", label: "International trips" },
              { to: "/packages", icon: "tag", label: "All tour packages" },
              { to: "/contact", icon: "send", label: "Get a free quote" },
            ].map((c) => (
              <Link key={c.to} to={c.to} className="card" style={{ padding: 22, textAlign: "center", textDecoration: "none", color: "inherit" }}>
                <span style={{ width: 44, height: 44, borderRadius: 12, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--orange-pale)", color: "var(--orange-dark)" }}>
                  <Icon name={c.icon} size={20} />
                </span>
                <div style={{ fontWeight: 800, fontSize: ".92rem", marginTop: 12 }}>{c.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
