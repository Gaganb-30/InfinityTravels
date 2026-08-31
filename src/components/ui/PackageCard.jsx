// src/components/ui/PackageCard.jsx — Luxytrix-style premium card with orange accent
import { Link } from "react-router-dom";
import Icon from "./Icon";

const FALLBACK = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=900&auto=format&fit=crop";

export default function PackageCard({ pkg, width }) {
  const min  = pkg?.priceRange?.min;
  const cur  = pkg?.priceRange?.currency || "₹";
  const was  = pkg?.priceRange?.max;
  const off  = min && was && was > min ? Math.round(((was - min) / was) * 100) : null;
  const stops = (pkg.location || "").split(/[,→|]/).map((s) => s.trim()).filter(Boolean).slice(0, 3);
  const perks = (pkg.inclusions || []).slice(0, 3);

  return (
    <Link
      to={`/packages/${pkg.slug}`}
      style={{
        width, minWidth: width, display: "flex", flexDirection: "column",
        textDecoration: "none", color: "inherit",
        background: "#fff", borderRadius: "var(--radius-lg)", overflow: "hidden",
        boxShadow: "var(--shadow-card)", border: "1px solid var(--line)",
        transition: "transform .28s ease, box-shadow .28s ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "var(--shadow-card-hover)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "var(--shadow-card)"; }}
    >
      {/* Media */}
      <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden", background: "#eef2f7" }}>
        <img
          src={pkg.image || FALLBACK} alt={pkg.name} loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .7s ease" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.07)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
        />
        {/* Bottom gradient */}
        <span style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,31,66,.6), transparent 55%)" }} />

        {/* Badges */}
        {pkg.badge && (
          <span className="badge badge-orange" style={{ position: "absolute", top: 12, left: 12 }}>
            {pkg.badge}
          </span>
        )}
        {off > 0 && (
          <span className="badge badge-hot" style={{ position: "absolute", top: 12, left: pkg.badge ? 90 : 12 }}>
            {off}% OFF
          </span>
        )}
        {pkg.duration && (
          <span className="badge badge-glass" style={{ position: "absolute", top: 12, right: 12 }}>
            <Icon name="clock" size={11} /> {pkg.duration}
          </span>
        )}

        {/* Rating pill on image */}
        {pkg.rating > 0 && (
          <span className="rating-pill" style={{ position: "absolute", bottom: 12, right: 12 }}>
            <Icon name="star" size={11} style={{ color: "var(--orange)" }} /> {pkg.rating}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "16px 16px 14px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        {/* Location tags */}
        {stops.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {stops.map((s) => (
              <span key={s} style={{
                display: "inline-flex", alignItems: "center", gap: 3,
                fontSize: 11, fontWeight: 600, color: "var(--ink-muted)",
                background: "var(--surface-sunken)", padding: "3px 8px", borderRadius: 999,
              }}>
                <Icon name="pin" size={10} /> {s}
              </span>
            ))}
          </div>
        )}

        <h3 style={{ fontSize: "1.02rem", fontWeight: 800, margin: 0, lineHeight: 1.3, color: "var(--navy)" }}>
          {pkg.name}
        </h3>

        {/* Inclusions */}
        {perks.length > 0 && (
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: "4px 12px" }}>
            {perks.map((p) => (
              <li key={p} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "var(--ink-muted)" }}>
                <Icon name="check" size={11} style={{ color: "var(--orange-dark)", flexShrink: 0 }} strokeWidth={3} />
                <span style={{ maxWidth: 130, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Price footer */}
        <div style={{
          marginTop: "auto", paddingTop: 12, borderTop: "1px solid var(--line)",
          display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10,
        }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--ink-faint)", letterSpacing: ".04em", textTransform: "uppercase" }}>
              Starting from
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: "1.22rem", fontWeight: 900, color: "var(--navy)" }}>
                {cur}{Number(min || 0).toLocaleString("en-IN")}
              </span>
              {off > 0 && <span className="price-strike">{cur}{Number(was).toLocaleString("en-IN")}</span>}
            </div>
            <div style={{ fontSize: 10.5, color: "var(--ink-faint)" }}>per person</div>
          </div>
          <span className="btn btn-orange btn-sm">View Details</span>
        </div>
      </div>
    </Link>
  );
}
