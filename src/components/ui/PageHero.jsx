// src/components/ui/PageHero.jsx — Luxytrix-style banner used on all inner pages
import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function PageHero({ eyebrow, title, sub, image, crumbs = [], height = 360 }) {
  return (
    <section style={{ position: "relative", minHeight: height, display: "flex", alignItems: "center", overflow: "hidden" }}>
      {image && (
        <img
          src={image} alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
        />
      )}
      {/* Gradient overlay — dark left to lighter right like Luxytrix */}
      <span style={{
        position: "absolute", inset: 0,
        background: image
          ? "linear-gradient(100deg, rgba(10,31,66,.92) 0%, rgba(10,31,66,.65) 55%, rgba(10,31,66,.40) 100%)"
          : "linear-gradient(120deg, var(--navy-900) 0%, var(--navy-700) 100%)",
      }} />

      <div className="shell" style={{ position: "relative", zIndex: 1, paddingBlock: 52 }}>
        {/* Breadcrumbs */}
        {crumbs.length > 0 && (
          <nav style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 18, flexWrap: "wrap" }}>
            <Link to="/" style={C.crumb}>Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Icon name="chevronRight" size={12} style={{ color: "rgba(255,255,255,.45)" }} />
                {c.to
                  ? <Link to={c.to} style={C.crumb}>{c.label}</Link>
                  : <span style={{ ...C.crumb, color: "var(--orange-light)", fontWeight: 700 }}>{c.label}</span>}
              </span>
            ))}
          </nav>
        )}

        {/* Orange eyebrow */}
        {eyebrow && (
          <div style={C.eyebrow}>
            <span style={C.eyebrowDot} />
            {eyebrow}
          </div>
        )}

        <h1 className="fade-in-up" style={{ color: "#fff", fontSize: "clamp(1.8rem, 1.2rem + 2.4vw, 2.9rem)", fontWeight: 900, margin: 0, lineHeight: 1.12, letterSpacing: "-0.03em" }}>
          {title}
        </h1>
        {sub && (
          <p className="fade-in-up delay-1" style={{ color: "rgba(255,255,255,.82)", maxWidth: 620, marginTop: 14, lineHeight: 1.7, fontSize: ".97rem" }}>
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}

const C = {
  crumb: { color: "rgba(255,255,255,.7)", fontSize: 12.5, textDecoration: "none", fontWeight: 600 },
  eyebrow: {
    display: "inline-flex", alignItems: "center", gap: 8,
    fontSize: 11, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase",
    color: "var(--orange-light)", marginBottom: 14,
  },
  eyebrowDot: {
    width: 6, height: 6, borderRadius: "50%",
    background: "var(--orange-light)", flexShrink: 0,
  },
};
