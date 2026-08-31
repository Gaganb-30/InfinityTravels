// src/pages/Destinations.jsx
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../utils/api";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import SEO from "../components/ui/SEO";
import DestinationTile from "../components/ui/DestinationTile";
import CardSkeleton from "../components/ui/CardSkeleton";

const TYPES = ["Beach", "Mountain", "Adventure", "Nature", "Urban", "Cultural", "Desert", "Coastal", "Island", "Heritage"];
const TIERS = ["Luxury", "Premium", "Value"];

export default function Destinations() {
  const [params, setParams] = useSearchParams();
  const [all, setAll] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [panel, setPanel] = useState(false);

  const category = params.get("category") || "";
  const type = params.get("type") || "";
  const tier = params.get("tier") || "";
  const country = params.get("country") || "";
  const search = params.get("search") || "";
  const [term, setTerm] = useState(search);

  useEffect(() => setTerm(search), [search]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    (async () => {
      try {
        const [d, c] = await Promise.all([
          api.getDestinations({}).catch(() => []),
          api.getCountries().catch(() => []),
        ]);
        if (!alive) return;
        setAll(Array.isArray(d) ? d : []);
        setCountries(Array.isArray(c) ? c : []);
      } finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, []);

  const patch = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    return all.filter((d) => {
      if (category && d.category !== category) return false;
      if (type && d.type !== type) return false;
      if (tier && d.tier !== tier) return false;
      if (country && d.country !== country) return false;
      if (q) {
        const hay = `${d.name} ${d.country} ${d.tagline || ""} ${d.description || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [all, category, type, tier, country, search]);

  const activeCount = [category, type, tier, country, search].filter(Boolean).length;

  const Filters = () => (
    <>
      <FilterGroup label="Region">
        <Pills value={category} onPick={(v) => patch("category", v)}
               options={[{ label: "All", value: "" }, { label: "Within India", value: "Domestic" }, { label: "International", value: "International" }]} />
      </FilterGroup>

      <FilterGroup label="Type of place">
        <Pills value={type} onPick={(v) => patch("type", v)}
               options={[{ label: "All", value: "" }, ...TYPES.map((t) => ({ label: t, value: t }))]} />
      </FilterGroup>

      <FilterGroup label="Budget tier">
        <Pills value={tier} onPick={(v) => patch("tier", v)}
               options={[{ label: "Any", value: "" }, ...TIERS.map((t) => ({ label: t, value: t }))]} />
      </FilterGroup>

      {countries.length > 0 && (
        <FilterGroup label="Country">
          <select className="field" value={country} onChange={(e) => patch("country", e.target.value)}>
            <option value="">All countries</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </FilterGroup>
      )}

      {activeCount > 0 && (
        <button onClick={clearAll} className="btn btn-outline btn-sm" style={{ width: "100%" }}>
          <Icon name="close" size={14} /> Clear all filters
        </button>
      )}
    </>
  );

  return (
    <main>
      <SEO
        title="Destinations in India & Abroad"
        description="Browse every destination we cover — Kashmir, Kerala, Goa, Rajasthan, Bali, Dubai, the Maldives and more. Filter by region, style and budget."
        path="/destinations"
      />
      <PageHero
        eyebrow="Where to next"
        title="Destinations"
        sub="Every place below is one we book regularly and know first-hand — filter by region, style or budget to narrow it down."
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1800&auto=format&fit=crop"
        crumbs={[{ label: "Destinations" }]}
      />

      <section className="section">
        <div className="shell" style={{ display: "grid", gap: 30 }}>
          {/* Search + mobile filter toggle */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 240 }}>
              <Icon name="search" size={17} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)" }} />
              <input
                className="field" style={{ paddingLeft: 42 }}
                placeholder="Search destinations…" value={term}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && patch("search", term)}
              />
            </div>
            <button onClick={() => patch("search", term)} className="btn btn-navy">Search</button>
            <button onClick={() => setPanel(!panel)} className="btn btn-outline im-filter-toggle">
              <Icon name="tag" size={15} /> Filters{activeCount > 0 ? ` (${activeCount})` : ""}
            </button>
          </div>

          <div className="im-dest-layout">
            {/* Sidebar */}
            <aside className={`im-filters${panel ? " is-open" : ""}`}>
              <div style={{ position: "sticky", top: 92, display: "grid", gap: 22 }}>
                <Filters />
              </div>
            </aside>

            {/* Results */}
            <div>
              <p style={{ color: "var(--ink-muted)", fontSize: ".88rem", margin: "0 0 18px" }}>
                {loading ? "Loading destinations…" : (
                  <><strong style={{ color: "var(--navy)" }}>{results.length}</strong> destination{results.length === 1 ? "" : "s"} found</>
                )}
              </p>

              {loading ? (
                <CardSkeleton count={6} inline={false} width={"100%"} height={320} />
              ) : results.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", background: "var(--surface-muted)", borderRadius: 16 }}>
                  <Icon name="compass" size={38} style={{ color: "var(--ink-faint)" }} />
                  <h3 style={{ margin: "14px 0 6px", fontSize: "1.05rem" }}>Nothing matches those filters</h3>
                  <p style={{ color: "var(--ink-muted)", fontSize: ".88rem", margin: "0 0 18px" }}>
                    Try widening the search, or tell us what you have in mind and we'll build it.
                  </p>
                  <button onClick={clearAll} className="btn btn-orange btn-sm">Reset filters</button>
                </div>
              ) : (
                <div className="im-dest-grid">
                  {results.map((d) => (
                    <DestinationTile key={d._id} dest={d} width="100%" height={330} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .im-dest-layout { display: grid; grid-template-columns: 250px 1fr; gap: 34px; }
        .im-dest-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .im-filter-toggle { display: none; }
        @media (max-width: 1080px) { .im-dest-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 860px) {
          .im-dest-layout { grid-template-columns: 1fr; }
          .im-filter-toggle { display: inline-flex !important; }
          .im-filters { display: none; }
          .im-filters.is-open { display: block; padding: 18px; background: var(--surface-muted); border-radius: 14px; }
          .im-filters.is-open > div { position: static !important; }
        }
        @media (max-width: 560px) { .im-dest-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}

function FilterGroup({ label, children }) {
  return (
    <div>
      <h4 style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--orange-dark)", margin: "0 0 11px" }}>
        {label}
      </h4>
      {children}
    </div>
  );
}

function Pills({ options, value, onPick }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.label} onClick={() => onPick(o.value)}
            style={{
              padding: "6px 13px", borderRadius: 999, cursor: "pointer",
              fontSize: 12.5, fontWeight: 700, fontFamily: "inherit",
              border: `1.5px solid ${on ? "var(--navy)" : "var(--line)"}`,
              background: on ? "var(--navy)" : "#fff",
              color: on ? "#fff" : "var(--ink-muted)",
              transition: "all .18s ease",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
