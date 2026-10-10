// src/pages/DestinationDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../utils/api";
import Icon, { WhatsAppIcon } from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import SEO from "../components/ui/SEO";
import PackageCard from "../components/ui/PackageCard";
import SectionHeading from "../components/ui/SectionHeading";
import { BRAND } from "../utils/siteConfig";

export default function DestinationDetail() {
  const { slug } = useParams();
  const [dest, setDest] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true); setError(false);
    (async () => {
      try {
        const res = await api.getDestination(slug);
        if (!alive) return;
        if (!res || res.error) { setError(true); return; }
        setDest(res.destination || res);
        setPackages(Array.isArray(res.packages) ? res.packages : []);
      } catch { if (alive) setError(true); }
      finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, [slug]);

  if (loading) {
    return (
      <main className="section">
        <div className="shell" style={{ display: "grid", gap: 20 }}>
          <div className="skeleton" style={{ height: 300 }} />
          <div className="skeleton" style={{ height: 24, width: "45%" }} />
          <div className="skeleton" style={{ height: 140 }} />
        </div>
      </main>
    );
  }

  if (error || !dest) {
    return (
      <main className="section">
        <div className="shell" style={{ textAlign: "center", paddingBlock: 60 }}>
          <Icon name="compass" size={44} style={{ color: "var(--ink-faint)" }} />
          <h1 style={{ fontSize: "1.5rem", margin: "16px 0 8px" }}>We couldn't find that destination</h1>
          <p style={{ color: "var(--ink-muted)", marginBottom: 24 }}>
            It may have been renamed or retired from the current season.
          </p>
          <Link to="/destinations" className="btn btn-orange">Browse all destinations</Link>
        </div>
      </main>
    );
  }

  const gallery = (dest.galleryImages || []).filter(Boolean);
  const waLink = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    `Hi ${BRAND.shortName}! I'd like to plan a trip to ${dest.name}. Could you share options and pricing?`
  )}`;

  return (
    <main>
      <SEO
        title={`${dest.name} Tour Packages`}
        description={(dest.description || dest.tagline || `Plan a trip to ${dest.name} with ${BRAND.shortName}.`).slice(0, 158)}
        image={dest.heroImage}
        path={`/destinations/${dest.slug}`}
      />
      <PageHero
        eyebrow={[dest.country, dest.category].filter(Boolean).join(" · ")}
        title={dest.name}
        sub={dest.tagline}
        image={dest.heroImage}
        height={380}
        crumbs={[{ label: "Destinations", to: "/destinations" }, { label: dest.name }]}
      />

      {/* Quick facts */}
      <section style={{ background: "var(--surface-muted)", borderBottom: "1px solid var(--line)" }}>
        <div className="shell" style={{ display: "flex", flexWrap: "wrap", gap: 30, paddingBlock: 20 }}>
          {[
            dest.country && { icon: "pin", label: "Country", value: dest.country },
            dest.type && { icon: "compass", label: "Best for", value: dest.type },
            dest.tier && { icon: "sparkles", label: "Tier", value: dest.tier },
            dest.seasons?.length && { icon: "calendar", label: "Best season", value: dest.seasons.join(", ") },
          ].filter(Boolean).map((f) => (
            <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={FACT_ICON}><Icon name={f.icon} size={16} /></span>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                  {f.label}
                </div>
                <div style={{ fontWeight: 700, fontSize: ".88rem", color: "var(--navy)" }}>{f.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Overview + CTA */}
      <section className="section">
        <div className="shell im-detail-grid" style={{ display: "grid", gap: 34 }}>
          <div>
            <h2 className="section-title">About {dest.name}</h2>
            <p style={{ marginTop: 18, lineHeight: 1.85, color: "var(--ink-muted)", fontSize: ".97rem", whiteSpace: "pre-line" }}>
              {dest.description || `Tell us how long you have and what you'd like out of ${dest.name}, and we'll shape an itinerary around it.`}
            </p>

            {gallery.length > 0 && (
              <>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 800, margin: "34px 0 14px" }}>Gallery</h3>
                <div className="im-gallery">
                  {gallery.map((src, i) => (
                    <button key={i} onClick={() => setLightbox(src)} style={GAL_BTN}>
                      <img src={src} alt={`${dest.name} ${i + 1}`} loading="lazy"
                           style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside>
            <div style={SIDE_CARD}>
              <span className="badge badge-orange"><Icon name="sparkles" size={11} /> Plan this trip</span>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: "12px 0 8px" }}>
                Interested in {dest.name}?
              </h3>
              <p style={{ fontSize: ".87rem", color: "var(--ink-muted)", lineHeight: 1.65, margin: "0 0 18px" }}>
                Send us your dates and rough budget — we'll come back with a route, hotels and a
                firm price, usually the same day.
              </p>
              <div style={{ display: "grid", gap: 9 }}>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ width: "100%" }}>
                  <WhatsAppIcon size={16} /> Enquire on WhatsApp
                </a>
                <Link to="/contact" className="btn btn-navy" style={{ width: "100%" }}>
                  <Icon name="send" size={15} /> Request a callback
                </Link>
                <a href={`tel:${BRAND.phone}`} className="btn btn-outline" style={{ width: "100%" }}>
                  <Icon name="phone" size={15} /> {BRAND.phoneDisplay}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related packages */}
      {packages.length > 0 && (
        <section className="section section-muted">
          <div className="shell">
            <SectionHeading
              eyebrow="Ready to book" eyebrowIcon="tag"
              title={`${dest.name} packages`}
              sub="Fixed itineraries for this destination — each one adjustable to your dates and pace."
              viewAll="/packages"
            />
            <div className="im-related-grid">
              {packages.map((p) => <PackageCard key={p._id} pkg={p} width="100%" />)}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={LIGHTBOX}>
          <button onClick={() => setLightbox(null)} aria-label="Close" style={LIGHTBOX_X}>
            <Icon name="close" size={26} />
          </button>
          <img src={lightbox} alt="" style={{ maxWidth: "92vw", maxHeight: "88vh", borderRadius: 12, objectFit: "contain" }} />
        </div>
      )}

      <style>{`
        .im-detail-grid { grid-template-columns: 1fr 330px; align-items: start; }
        .im-detail-grid aside > div { position: sticky; top: 92px; }
        .im-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .im-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 1080px) { .im-related-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 900px) {
          .im-detail-grid { grid-template-columns: 1fr !important; }
          .im-detail-grid aside > div { position: static !important; }
        }
        @media (max-width: 560px) {
          .im-gallery { grid-template-columns: repeat(2, 1fr); }
          .im-related-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}

const FACT_ICON = {
  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
  display: "flex", alignItems: "center", justifyContent: "center",
  background: "rgba(249,115,22,.12)", color: "var(--orange-dark)",
};
const SIDE_CARD = {
  background: "#fff", border: "1px solid var(--line)", borderRadius: 16,
  padding: 22, boxShadow: "0 12px 32px rgba(56,11,22,.08)",
};
const GAL_BTN = {
  padding: 0, border: "none", cursor: "pointer", borderRadius: 12,
  overflow: "hidden", aspectRatio: "4/3", background: "var(--surface-sunken)",
};
const LIGHTBOX = {
  position: "fixed", inset: 0, zIndex: 90, background: "rgba(26,6,13,.95)",
  display: "flex", alignItems: "center", justifyContent: "center", padding: 20, cursor: "zoom-out",
};
const LIGHTBOX_X = {
  position: "absolute", top: 20, right: 24, background: "transparent",
  border: "none", color: "#fff", cursor: "pointer",
};
