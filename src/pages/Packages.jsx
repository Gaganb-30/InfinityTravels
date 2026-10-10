// src/pages/Packages.jsx
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../utils/api";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import SEO from "../components/ui/SEO";
import PackageCard from "../components/ui/PackageCard";
import CardSkeleton from "../components/ui/CardSkeleton";
import { budgetOptions } from "../utils/siteConfig";

const TYPES = ["Coastal", "Mountain", "Urban", "Desert", "Forest", "Cultural", "Adventure", "Island", "Heritage", "Nature"];
const DURATIONS = [
  { label: "Any length", value: "" },
  { label: "Up to 4 days", value: "1-4" },
  { label: "5 – 10 days", value: "5-10" },
  { label: "11 days +", value: "11+" },
];
const SORTS = [
  { label: "Recommended", value: "" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Top rated", value: "rating" },
  { label: "Longest trips", value: "duration" },
];

export default function Packages() {
  const [params, setParams] = useSearchParams();
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [panel, setPanel] = useState(false);

  const search = params.get("search") || "";
  const type = params.get("type") || "";
  const tag = params.get("tag") || "";
  const duration = params.get("duration") || "";
  const sort = params.get("sort") || "";
  const minBudget = params.get("minBudget") || "";
  const maxBudget = params.get("maxBudget") || "";
  const budgetKey = minBudget || maxBudget ? `${minBudget || 0}-${maxBudget || ""}` : "";
  const [term, setTerm] = useState(search);

  useEffect(() => setTerm(search), [search]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    (async () => {
      try {
        const d = await api.getPackages({}).catch(() => []);
        if (alive) setAll(Array.isArray(d) ? d : []);
      } finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, []);

  const patch = (updates) => {
    const next = new URLSearchParams(params);
    Object.entries(updates).forEach(([k, v]) => { if (v) next.set(k, v); else next.delete(k); });
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    const lo = minBudget ? Number(minBudget) : null;
    const hi = maxBudget ? Number(maxBudget) : null;

    let out = all.filter((p) => {
      // Domestic packages only for now
      const isInternational =
        p.destination?.category === "International" ||
        (p.destination?.country && p.destination.country.toLowerCase() !== "india") ||
        (p.location && !p.location.toLowerCase().includes("india"));
      if (isInternational) return false;

      const price = p?.priceRange?.min ?? 0;
      if (type && p.type !== type) return false;
      if (tag && !(p.tags || []).some((t) => t.toLowerCase().includes(tag.toLowerCase()))) return false;
      if (lo != null && price < lo) return false;
      if (hi != null && price > hi) return false;
      if (duration) {
        const days = p.days || 0;
        if (duration === "1-4" && !(days >= 1 && days <= 4)) return false;
        if (duration === "5-10" && !(days >= 5 && days <= 10)) return false;
        if (duration === "11+" && !(days >= 11)) return false;
      }
      if (q) {
        const hay = `${p.name} ${p.location || ""} ${p.description || ""} ${(p.tags || []).join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const price = (p) => p?.priceRange?.min ?? 0;
    if (sort === "price-asc") out = [...out].sort((a, b) => price(a) - price(b));
    if (sort === "price-desc") out = [...out].sort((a, b) => price(b) - price(a));
    if (sort === "rating") out = [...out].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sort === "duration") out = [...out].sort((a, b) => (b.days || 0) - (a.days || 0));
    return out;
  }, [all, search, type, tag, duration, sort, minBudget, maxBudget]);

  const activeCount = [search, type, tag, duration, budgetKey].filter(Boolean).length;

  const Filters = () => (
    <>
      <Group label="Budget per person">
        <div style={{ display: "grid", gap: 6 }}>
          {budgetOptions.map((b) => {
            const on = budgetKey === b.value || (!b.value && !budgetKey);
            return (
              <button
                key={b.label}
                onClick={() => {
                  const [lo, hi] = (b.value || "").split("-");
                  patch({ minBudget: lo && lo !== "0" ? lo : "", maxBudget: hi || "" });
                }}
                style={{ ...RADIO, borderColor: on ? "var(--navy)" : "var(--line)", background: on ? "var(--orange-pale)" : "#fff" }}
              >
                <span style={{ ...DOT, borderColor: on ? "var(--navy)" : "var(--line)" }}>
                  {on && <span style={DOT_IN} />}
                </span>
                {b.label}
              </button>
            );
          })}
        </div>
      </Group>

      <Group label="Trip length">
        <div style={{ display: "grid", gap: 6 }}>
          {DURATIONS.map((d) => {
            const on = duration === d.value;
            return (
              <button key={d.label} onClick={() => patch({ duration: d.value })}
                      style={{ ...RADIO, borderColor: on ? "var(--navy)" : "var(--line)", background: on ? "var(--orange-pale)" : "#fff" }}>
                <span style={{ ...DOT, borderColor: on ? "var(--navy)" : "var(--line)" }}>
                  {on && <span style={DOT_IN} />}
                </span>
                {d.label}
              </button>
            );
          })}
        </div>
      </Group>

      <Group label="Style of trip">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {[{ label: "All", value: "" }, ...TYPES.map((t) => ({ label: t, value: t }))].map((o) => {
            const on = type === o.value;
            return (
              <button key={o.label} onClick={() => patch({ type: o.value })}
                      style={{
                        padding: "6px 13px", borderRadius: 999, cursor: "pointer", fontFamily: "inherit",
                        fontSize: 12.5, fontWeight: 700, transition: "all .18s ease",
                        border: `1.5px solid ${on ? "var(--navy)" : "var(--line)"}`,
                        background: on ? "var(--navy)" : "#fff", color: on ? "#fff" : "var(--ink-muted)",
                      }}>
                {o.label}
              </button>
            );
          })}
        </div>
      </Group>

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
        title="Tour Packages & Holiday Itineraries"
        description="Fixed-price tour packages with transparent inclusions — honeymoon, family, adventure, luxury and group departures. Every itinerary is adjustable."
        path="/packages"
      />
      <PageHero
        eyebrow="Curated itineraries"
        title="Tour packages"
        sub="Fixed-price itineraries you can book as they are, or use as a starting point — every one of them is adjustable."
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1800&auto=format&fit=crop"
        crumbs={[{ label: "Packages" }]}
      />

      {/* ── Category quick-filter tabs ── */}
      <div style={{ borderBottom: "1px solid var(--line)", background: "#fff", position: "sticky", top: 64, zIndex: 30 }}>
        <div className="shell" style={{ overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 8, padding: "12px 0", flexWrap: "nowrap", minWidth: "max-content" }}>
            {[
              { label: "All Packages",   tagVal: "",          typeVal: "", icon: "🌍" },
              { label: "Budget",         tagVal: "",          typeVal: "", budgetMax: "15000", icon: "💰" },
              { label: "Premium",        tagVal: "",          typeVal: "", budgetMin: "25000", budgetMax: "75000", icon: "⭐" },
              { label: "Luxury",         tagVal: "",          typeVal: "", budgetMin: "75000", icon: "💎" },
              { label: "Honeymoon",      tagVal: "Honeymoon", typeVal: "", icon: "❤️" },
              { label: "Family",         tagVal: "Family",    typeVal: "", icon: "👨‍👩‍👧" },
              { label: "Group Tours",    tagVal: "Group",     typeVal: "", icon: "👥" },
              { label: "Adventure",      tagVal: "",          typeVal: "Adventure", icon: "⛰️" },
            ].map((cat) => {
              const isActive = (
                tag === (cat.tagVal || "") &&
                type === (cat.typeVal || "") &&
                (cat.budgetMax ? maxBudget === cat.budgetMax : !cat.budgetMax || cat.label === "All Packages") &&
                (cat.budgetMin ? minBudget === cat.budgetMin : !cat.budgetMin || cat.label === "All Packages")
              ) || (cat.label === "All Packages" && !tag && !type && !minBudget && !maxBudget);
              return (
                <button
                  key={cat.label}
                  className={`pkg-cat-tab${isActive ? " active" : ""}`}
                  onClick={() => {
                    if (cat.label === "All Packages") { clearAll(); return; }
                    patch({
                      tag: cat.tagVal || "",
                      type: cat.typeVal || "",
                      minBudget: cat.budgetMin || "",
                      maxBudget: cat.budgetMax || "",
                    });
                  }}
                >
                  {cat.icon} {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="shell" style={{ display: "grid", gap: 30 }}>
          {/* Toolbar */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
              <Icon name="search" size={17} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)" }} />
              <input className="field" style={{ paddingLeft: 42 }} placeholder="Search packages…"
                     value={term} onChange={(e) => setTerm(e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && patch({ search: term })} />
            </div>
            <button onClick={() => patch({ search: term })} className="btn btn-navy">Search</button>
            <select className="field" style={{ width: "auto", minWidth: 180 }}
                    value={sort} onChange={(e) => patch({ sort: e.target.value })}>
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <button onClick={() => setPanel(!panel)} className="btn btn-outline im-pkg-toggle">
              <Icon name="tag" size={15} /> Filters{activeCount > 0 ? ` (${activeCount})` : ""}
            </button>
          </div>

          <div className="im-pkg-layout">
            <aside className={`im-pkg-filters${panel ? " is-open" : ""}`}>
              <div style={{ position: "sticky", top: 92, display: "grid", gap: 22 }}>
                <Filters />
              </div>
            </aside>

            <div>
              <p style={{ color: "var(--ink-muted)", fontSize: ".88rem", margin: "0 0 18px" }}>
                {loading ? "Loading packages…" : (
                  <><strong style={{ color: "var(--navy)" }}>{results.length}</strong> package{results.length === 1 ? "" : "s"} available</>
                )}
              </p>

              {loading ? (
                <CardSkeleton count={6} inline={false} width={"100%"} height={420} />
              ) : results.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", background: "var(--surface-muted)", borderRadius: 16 }}>
                  <Icon name="compass" size={38} style={{ color: "var(--ink-faint)" }} />
                  <h3 style={{ margin: "14px 0 6px", fontSize: "1.05rem" }}>No packages match that combination</h3>
                  <p style={{ color: "var(--ink-muted)", fontSize: ".88rem", margin: "0 0 18px" }}>
                    Loosen a filter, or ask us to build something to your brief.
                  </p>
                  <button onClick={clearAll} className="btn btn-orange btn-sm">Reset filters</button>
                </div>
              ) : (
                <div className="im-pkg-grid">
                  {results.map((p) => <PackageCard key={p._id} pkg={p} width="100%" />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .im-pkg-layout { display: grid; grid-template-columns: 250px 1fr; gap: 34px; }
        .im-pkg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .im-pkg-toggle { display: none; }
        @media (max-width: 1180px) { .im-pkg-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 860px) {
          .im-pkg-layout { grid-template-columns: 1fr; }
          .im-pkg-toggle { display: inline-flex !important; }
          .im-pkg-filters { display: none; }
          .im-pkg-filters.is-open { display: block; padding: 18px; background: var(--surface-muted); border-radius: 14px; }
          .im-pkg-filters.is-open > div { position: static !important; }
        }
        @media (max-width: 560px) { .im-pkg-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}

function Group({ label, children }) {
  return (
    <div>
      <h4 style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--orange-dark)", margin: "0 0 11px" }}>
        {label}
      </h4>
      {children}
    </div>
  );
}

const RADIO = {
  display: "flex", alignItems: "center", gap: 9, width: "100%",
  padding: "9px 12px", borderRadius: 9, cursor: "pointer", textAlign: "left",
  fontSize: 12.8, fontWeight: 600, color: "var(--ink)", fontFamily: "inherit",
  border: "1.5px solid var(--line)", transition: "all .16s ease",
};
const DOT = {
  width: 15, height: 15, borderRadius: "50%", border: "1.5px solid var(--line)",
  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
};
const DOT_IN = { width: 7, height: 7, borderRadius: "50%", background: "var(--navy)" };
