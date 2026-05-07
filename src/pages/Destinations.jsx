// src/pages/Destinations.js
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../utils/api";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "";

  const [filters, setFilters] = useState({
    country: "All Countries",
    tier: "Any Budget",
    season: "",
    type: "",
    search: searchParams.get("search") || "",
    category: categoryFromUrl,
  });

  // Sync category from URL when it changes
  useEffect(() => {
    const c = searchParams.get("category") || "";
    setFilters((prev) => ({ ...prev, category: c }));
  }, [searchParams]);

  useEffect(() => {
    api.getCountries().then(setCountries).catch(console.error);
  }, []);

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const queryFilters = {};
        if (filters.category) queryFilters.category = filters.category;
        if (filters.country !== "All Countries") queryFilters.country = filters.country;
        if (filters.tier !== "Any Budget") queryFilters.tier = filters.tier;
        if (filters.season) queryFilters.season = filters.season;
        if (filters.type) queryFilters.type = filters.type;
        if (filters.search) queryFilters.search = filters.search;

        const data = await api.getDestinations(queryFilters);
        setDestinations(data);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, [filters]);

  const types = ["Beach", "Mountain", "Adventure", "Nature", "Urban", "Cultural", "Island", "Heritage"];
  const seasons = ["Summer", "Autumn", "Winter"];
  const budgets = ["Any Budget", "Luxury", "Premium", "Value"];

  const pageTitle = filters.category === "Domestic"
    ? "Domestic Destinations"
    : filters.category === "International"
      ? "International Destinations"
      : "World Destinations";

  const pageDescription = filters.category === "Domestic"
    ? "Explore the incredible diversity of India — from snow-capped Himalayas to tropical beaches, royal deserts to serene backwaters."
    : filters.category === "International"
      ? "Venture beyond borders. Discover stunning international destinations handpicked for unforgettable experiences."
      : "Discover a world beyond boundaries. From the silent peaks of the Himalayas to the neon pulse of Tokyo, your next chapter begins here.";

  return (
    <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
      {/* Hero Title Section */}
      <section className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <p className="font-label text-secondary tracking-[0.2em] uppercase text-xs mb-4 font-bold">
            {filters.category ? `${filters.category} · Curated Collections` : 'Curated Collections'}
          </p>
          <h1 className="font-headline text-6xl md:text-7xl text-on-surface leading-tight tracking-tighter">
            {pageTitle}
          </h1>
          <p className="mt-6 text-on-surface-variant text-lg max-w-lg leading-relaxed">
            {pageDescription}
          </p>

          {/* Category Toggle */}
          <div className="flex gap-3 mt-8">
            {['', 'Domestic', 'International'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilters({ ...filters, category: cat })}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${filters.category === cat
                  ? "cta-gradient-warm  text-white shadow-lg shadow-primary/25"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest"
                  }`}
              >
                {cat === '' ? '🌐 All' : cat === 'Domestic' ? '🇮🇳 Domestic' : '🌍 International'}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-primary font-semibold">
          <span className="text-sm">Scroll to explore</span>
          <span className="material-symbols-outlined animate-bounce">arrow_downward</span>
        </div>
      </section>

      {/* Filters Section */}
      <section className="mb-16">
        <div className="bg-surface-container-low p-6 rounded-3xl flex flex-wrap items-center gap-8 shadow-sm">
          <div className="flex flex-col gap-2">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold ml-1">
              Country
            </label>
            <select
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              className="bg-surface-container-lowest border-none rounded-xl text-sm py-2.5 pl-4 pr-10 focus:ring-primary/20 min-w-[160px]"
            >
              <option>All Countries</option>
              {countries.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold ml-1">
              Budget
            </label>
            <select
              value={filters.tier}
              onChange={(e) => setFilters({ ...filters, tier: e.target.value })}
              className="bg-surface-container-lowest border-none rounded-xl text-sm py-2.5 pl-4 pr-10 focus:ring-primary/20 min-w-[160px]"
            >
              {budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold ml-1">
              Season
            </label>
            <div className="flex gap-2">
              {seasons.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilters({ ...filters, season: filters.season === s ? "" : s })}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filters.season === s
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-highest text-on-surface hover:bg-surface-variant"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-auto">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold ml-1">
              Type
            </label>
            <div className="flex gap-2 flex-wrap">
              {types.slice(0, 4).map((t) => (
                <span
                  key={t}
                  onClick={() => setFilters({ ...filters, type: filters.type === t ? "" : t })}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition-colors ${filters.type === t
                    ? "border-primary bg-primary text-white"
                    : "border-outline-variant/30 hover:bg-surface-container-highest"
                    }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destination Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`rounded-2xl bg-slate-100 animate-pulse ${i === 0 ? 'md:col-span-2 md:row-span-2 h-[340px]' : 'h-[160px]'}`} />
          ))}
        </div>
      ) : destinations.length === 0 ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">travel_explore</span>
          <h3 className="font-headline text-2xl text-slate-400 mb-2">No destinations found</h3>
          <p className="text-slate-400">Try adjusting your filters</p>
        </div>
      ) : (
        <section className="home-bento-grid" style={{ display: 'grid', gridAutoRows: '180px', gap: '12px' }}>
          {destinations.map((dest, idx) => {
            // Bento pattern: idx 0 = large (2x2), idx 1 = tall (1x2), a couple are wide (2x1), rest 1x1
            const spanStyle = idx === 0
              ? { gridColumn: 'span 2', gridRow: 'span 2' }
              : idx === 1
                ? { gridRow: 'span 2' }
                : (idx === 4 || idx === 8)
                  ? { gridColumn: 'span 2' }
                  : {};
            const isLarge = idx === 0;
            const isTall = idx === 1;
            return (
              <Link
                to={`/destinations/${dest.slug}`}
                key={dest._id}
                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md block"
                style={{ ...spanStyle, minHeight: 0 }}
              >
                <img
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={dest.heroImage}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                {/* Category badge */}
                <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${dest.category === 'Domestic' ? 'bg-emerald-500/90 text-white' : 'bg-blue-500/90 text-white'}`}>
                  {dest.category}
                </div>
                {/* Content */}
                <div className={`absolute bottom-0 left-0 right-0 ${isLarge ? 'p-6' : 'p-3'}`}>
                  <h3 className={`text-white font-headline font-bold leading-tight ${isLarge ? 'text-2xl mb-2' : isTall ? 'text-lg mb-1' : 'text-sm mb-0.5'}`}>
                    {dest.name}
                  </h3>
                  <p className={`text-white/70 ${isLarge ? 'text-sm' : 'text-[10px]'}`}>{dest.country}</p>
                  {isLarge && (
                    <span className="flex items-center gap-2 text-white/80 text-sm font-medium mt-3 group-hover:gap-3 transition-all">
                      Explore <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="mt-32 bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #1B5E96 0%, transparent 50%)" }}></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl md:text-5xl text-white mb-6">Receive Secret Itineraries</h2>
          <p className="text-slate-400 text-lg mb-10">Join 50,000+ wanderers and receive our hand-crafted travel guides once a month.</p>
          <div className="flex flex-col md:flex-row gap-4">
            <input className="flex-1 px-8 py-5 rounded-full bg-slate-800 border-none text-white focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Your email address" type="email" />
            <button className="bg-primary-container text-on-primary-container px-10 py-5 rounded-full font-bold shadow-xl shadow-primary/20 hover:brightness-110 transition-all">Subscribe Now</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Destinations;
