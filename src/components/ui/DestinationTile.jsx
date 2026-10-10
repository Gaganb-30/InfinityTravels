// src/components/ui/DestinationTile.jsx — Luxytrix-style with orange accent
import { Link } from "react-router-dom";
import Icon from "./Icon";

const FALLBACK = "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=800&auto=format&fit=crop";

export default function DestinationTile({ dest, width = 300, height = 340 }) {
  const price = dest?.startingPrice ?? dest?.priceFrom;
  return (
    <Link
      to={`/destinations/${dest.slug}`}
      className="tile"
      style={{ width, height, minWidth: width }}
    >
      <img src={dest.heroImage || FALLBACK} alt={dest.name} loading="lazy" />
      <span className="tile-veil" />

      {dest.duration && (
        <span className="badge badge-glass" style={{ position: "absolute", top: 12, right: 12 }}>
          {dest.duration}
        </span>
      )}

      {/* Country badge top-left for international */}
      {dest.country && !dest.duration && (
        <span className="badge badge-orange" style={{ position: "absolute", top: 12, left: 12 }}>
          {dest.country}
        </span>
      )}

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "20px 16px 16px", background: "linear-gradient(to top, rgba(26,6,13,.95) 0%, rgba(26,6,13,0) 100%)" }}>
        <h3 style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 900, margin: 0, lineHeight: 1.15 }}>
          {dest.name}
        </h3>
        {dest.tagline && (
          <p style={{ color: "rgba(255,255,255,.8)", fontSize: ".82rem", margin: "4px 0 0" }}>
            {dest.tagline}
          </p>
        )}

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 12, gap: 10 }}>
          <div>
            {price != null && (
              <>
                <div className="price-label">Starting from</div>
                <div style={{ color: "#fff", fontSize: "1.05rem", fontWeight: 800 }}>
                  ₹{Number(price).toLocaleString("en-IN")}
                </div>
              </>
            )}
          </div>
          {dest.rating > 0 && (
            <span className="rating-pill">
              <Icon name="star" size={11} style={{ color: "var(--orange)" }} /> {dest.rating}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
