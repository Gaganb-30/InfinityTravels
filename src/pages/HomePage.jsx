// src/pages/HomePage.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import Icon, { WhatsAppIcon } from "../components/ui/Icon";
import SectionHeading from "../components/ui/SectionHeading";
import Rail from "../components/ui/Rail";
import DestinationTile from "../components/ui/DestinationTile";
import PackageCard from "../components/ui/PackageCard";
import CardSkeleton from "../components/ui/CardSkeleton";
import EnquiryForm from "../components/ui/EnquiryForm";
import SEO from "../components/ui/SEO";
import SearchAutocomplete from "../components/ui/SearchAutocomplete";
import Countdown from "../components/ui/Countdown";
import {
  BRAND, trustStats, budgetOptions, travellerOptions,
  experienceTiles, whyUs, feedbackWall, trustBadges, dealWindows,
} from "../utils/siteConfig";

/* ── Hero slides ─────────────────────────────────────── */
const SLIDES = [
  {
    kicker: "Honeymoon Collection",
    title: "Somewhere quiet,\njust the two of you",
    sub: "Overwater villas in the Maldives, rice-terrace mornings in Bali.",
    img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1800&auto=format&fit=crop",
  },
  {
    kicker: "Kashmir & the Himalaya",
    title: "The valley,\nbefore the crowds",
    sub: "Shikara at first light, Gulmarg meadows, a houseboat that feels like home.",
    img: "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1800&auto=format&fit=crop",
  },
  /*
  {
    kicker: "International Escapes",
    title: "Further than\nyou think",
    sub: "Dubai, Switzerland, Vietnam and Japan — visas and transfers handled.",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1800&auto=format&fit=crop",
  },
  */
];

/* ── Static content (no backend model yet — edit freely) ─ */
const GROUP_DEPARTURES = [
  { tag: "Spiritual", duration: "8N/9D", title: "Char Dham Yatra by Road", date: "25 October 2026", seats: 20, booked: 14, price: 21999 },
  { tag: "Adventure", duration: "9N/10D", title: "Ladakh Motorcycle Expedition", date: "15 November 2026", seats: 15, booked: 11, price: 29999 },
  { tag: "Cultural", duration: "4N/5D", title: "Rann of Kutch Winter Festival", date: "20 December 2026", seats: 25, booked: 15, price: 17999 },
  // { tag: "Island", duration: "5N/6D", title: "Maldives Small-Group Escape", date: "18 January 2027", seats: 10, booked: 7, price: 74999 },
];

const ARTICLES = [
  {
    tag: "Destination Guide", read: "8 min read", date: "12 August 2026",
    title: "Kashmir month by month: when the valley actually looks like the photos",
    excerpt: "Almond blossom in March, tulips in April, saffron in October — a straight answer on what each season really offers, and what it costs.",
    img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1000&auto=format&fit=crop",
    feature: true,
  },
  {
    tag: "Planning", read: "6 min read", date: "28 July 2026",
    title: "Bali in ten days without rushing a single morning",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
  },
  {
    tag: "Budget", read: "7 min read", date: "9 July 2026",
    title: "What a Dubai holiday genuinely costs in 2026",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [domestic, setDomestic] = useState([]);
  const [intl, setIntl] = useState([]);
  const [packages, setPackages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState(0);
  const [search, setSearch] = useState({ q: "", budget: "", date: "", travellers: "2 People" });

  /* Data */
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [dom, itl, pkgs, tst] = await Promise.all([
          api.getDestinations({ category: "Domestic" }).catch(() => []),
          api.getDestinations({ category: "International" }).catch(() => []),
          api.getPopularPackages().catch(() => []),
          api.getTestimonials(8).catch(() => []),
        ]);
        if (!alive) return;
        setDomestic(Array.isArray(dom) ? dom : []);
        setIntl(Array.isArray(itl) ? itl : []);
        // Only show domestic packages
        const domesticPkgs = (Array.isArray(pkgs) ? pkgs : []).filter(
          (p) => !p.location || p.location.toLowerCase().includes("india") || (p.destination?.country && p.destination.country.toLowerCase() === "india")
        );
        setPackages(domesticPkgs);
        setTestimonials(Array.isArray(tst) ? tst : []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  /* Hero rotation */
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, []);

  const runSearch = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (search.q) p.set("search", search.q);
    if (search.budget) {
      const [lo, hi] = search.budget.split("-");
      if (lo && lo !== "0") p.set("minBudget", lo);
      if (hi) p.set("maxBudget", hi);
    }
    navigate(`/packages?${p.toString()}`);
  };

  const deals = packages
    .filter((p) => p?.priceRange?.max > p?.priceRange?.min)
    .slice(0, 4);
  const luxury = [...packages]
    .sort((a, b) => (b?.priceRange?.min || 0) - (a?.priceRange?.min || 0))
    .slice(0, 6);
  const dealEnds = dealWindows.map((d) => {
    const t = new Date();
    t.setDate(t.getDate() + d);
    return t.toISOString();
  });
  const active = SLIDES[slide];
  const waLink = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.shortName}! I'd like a holiday quote.`)}`;

  return (
    <main>
      <SEO
        path="/"
        description={`${BRAND.name} plans unhurried, honestly priced holidays across India and abroad — Kashmir, Kerala, Bali, Dubai, the Maldives and more. Free quote from a real planner.`}
        image={SLIDES[0].img}
      />

      {/* ══ HERO ══════════════════════════════════════ */}
      <section style={H.hero}>
        {SLIDES.map((s, i) => (
          <div key={i} style={{ ...H.slide, opacity: i === slide ? 1 : 0 }}>
            <img src={s.img} alt={s.title || ""} style={H.slideImg} loading={i === 0 ? "eager" : "lazy"} />
          </div>
        ))}
        <span style={H.veil} />

        <div className="shell" style={H.heroInner}>
          <div style={{ maxWidth: 620 }} key={slide} className="fade-up">
            <div className="glass fade-in" style={H.heroBadge}>
              <span>🏆 India's No.1 Travel Brand</span>
            </div>
            <span className="badge badge-glass" style={{ marginBottom: 18 }}>
              <Icon name="sparkles" size={12} /> {active.kicker}
            </span>
            <h1 style={H.h1}>
              {active.title.split("\n").map((line, i) => (
                <span key={i} style={{ display: "block" }}>{line}</span>
              ))}
            </h1>
            <p style={H.heroSub}>{active.sub}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
              <Link to="/packages" className="btn btn-orange btn-lg">
                <Icon name="compass" size={17} /> Explore Packages
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg">
                <WhatsAppIcon size={17} /> Plan My Trip
              </a>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 34 }}>
              {SLIDES.map((_, i) => (
                <button
                  key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`}
                  style={{
                    width: i === slide ? 30 : 10, height: 8, borderRadius: 999, border: "none",
                    cursor: "pointer", transition: "width .3s ease, background .3s ease",
                    background: i === slide ? "var(--orange)" : "rgba(255,255,255,.45)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="im-hero-form">
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* ══ TRUST STATS ═══════════════════════════════ */}
      <section className="section-navy" style={{ paddingBlock: 32 }}>
        <div className="shell im-stats" style={H.stats}>
          {trustStats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "var(--orange-light)", lineHeight: 1.1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: ".8rem", color: "rgba(255,255,255,.78)", marginTop: 5, fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SEARCH BAND ═══════════════════════════════ */}
      <section style={{ background: "linear-gradient(120deg, var(--navy) 0%, var(--navy-700) 100%)", paddingBlock: 34 }}>
        <div className="shell">
          <p style={H.searchKicker}>
            <Icon name="search" size={14} /> SEARCH OUR FULL COLLECTION
          </p>
          <form onSubmit={runSearch} style={H.searchCard} className="im-search-card">
            <div>
              <label className="field-label"><Icon name="pin" size={12} /> Destination</label>
              <SearchAutocomplete placeholder="Where do you want to go?" onSubmitPath="/packages" />
            </div>
            <div>
              <label className="field-label"><Icon name="wallet" size={12} /> Budget</label>
              <select className="field" value={search.budget} onChange={(e) => setSearch({ ...search, budget: e.target.value })}>
                {budgetOptions.map((b) => <option key={b.label} value={b.value}>{b.label}</option>)}
              </select>
            </div>
            <div>
              <label className="field-label"><Icon name="calendar" size={12} /> Travel Date</label>
              <input className="field" type="date" value={search.date}
                     onChange={(e) => setSearch({ ...search, date: e.target.value })} />
            </div>
            <div>
              <label className="field-label"><Icon name="users" size={12} /> Travellers</label>
              <select className="field" value={search.travellers} onChange={(e) => setSearch({ ...search, travellers: e.target.value })}>
                {travellerOptions.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-navy" style={{ height: 44, alignSelf: "end" }}>
              <Icon name="search" size={16} /> Search
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
            <span style={{ color: "rgba(255,255,255,.6)", fontSize: 12, fontWeight: 600 }}>Popular:</span>
            {["Kashmir", "Bali", "Dubai", "Goa", "Kerala", "Maldives"].map((c) => (
              <Link key={c} to={`/packages?search=${c}`} style={H.chip}>{c}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DOMESTIC ══════════════════════════════════ */}
      {(loading || domestic.length > 0) && (
  <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Across India" eyebrowIcon="mountain"
              title="Discover India's finest destinations"
              sub="From snow-line Himalayan valleys to the backwaters of the south — the routes we know best, priced honestly."
              viewAll="/destinations?category=Domestic"
            />
            {loading ? <CardSkeleton /> : (
              <Rail autoScroll>
                {domestic.slice(0, 14).map((d) => <DestinationTile key={d._id} dest={d} />)}
              </Rail>
            )}
          </div>
        </section>
      )}

      {/* ══ INTERNATIONAL ═════════════════════════════ */}
      {/* {(loading || intl.length > 0) && (
        <section className="section section-muted">
          <div className="shell">
            <SectionHeading
              eyebrow="Beyond borders" eyebrowIcon="plane"
              title="Explore the world with us"
              sub="Thirty-plus countries, with visas, transfers and local guides arranged before you land."
              viewAll="/destinations?category=International"
            />
            {loading ? <CardSkeleton /> : (
              <Rail autoScroll>
                {intl.slice(0, 14).map((d) => <DestinationTile key={d._id} dest={d} />)}
              </Rail>
            )}
          </div>
        </section>
      )} */}

      {/* ══ POPULAR PACKAGES ══════════════════════════ */}
      {(loading || packages.length > 0) && (
  <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Most booked" eyebrowIcon="star"
              title="Our travellers' favourites"
              sub="The itineraries people keep coming back to, and recommending to friends."
              viewAll="/packages"
            />
            {loading ? <CardSkeleton width={320} height={420} /> : (
              <Rail autoScroll>
                {packages.map((p) => <PackageCard key={p._id} pkg={p} width={320} />)}
              </Rail>
            )}
          </div>
        </section>
      )}

      {/* ══ DEALS ═════════════════════════════════════ */}
      {deals.length > 0 && (
        <section className="section section-navy">
          <div className="shell">
            <SectionHeading
              eyebrow="Limited time" eyebrowIcon="fire"
              title="This month's best fares"
              sub="Seasonal pricing on a handful of itineraries. When the allocation is gone, it's gone."
              centered
            />
            <div style={H.dealGrid} className="im-deal-grid">
              {deals.map((p, i) => {
                const off = Math.round(((p.priceRange.max - p.priceRange.min) / p.priceRange.max) * 100);
                return (
                  <Link key={p._id} to={`/packages/${p.slug}`} style={H.dealCard}>
                    <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                      <img src={p.image} alt={p.name} loading="lazy"
                           style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <span className="badge badge-hot" style={{ position: "absolute", top: 10, left: 10 }}>
                        {off}% OFF
                      </span>
                      {p.duration && (
                        <span className="badge badge-glass" style={{ position: "absolute", top: 10, right: 10 }}>
                          {p.duration}
                        </span>
                      )}
                    </div>
                    <div style={{ padding: 14 }}>
                      <h3 style={{ fontSize: ".95rem", fontWeight: 800, margin: "0 0 8px", lineHeight: 1.3 }}>
                        {p.name}
                      </h3>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                        <span className="price-strike">₹{p.priceRange.max.toLocaleString("en-IN")}</span>
                        <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--navy)" }}>
                          ₹{p.priceRange.min.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div style={{ marginTop: 10 }}>
                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".07em", color: "var(--ink-faint)", marginBottom: 5 }}>
                          OFFER ENDS IN
                        </div>
                        <Countdown endsAt={dealEnds[i % dealEnds.length]} />
                      </div>
                      <span className="btn btn-orange btn-sm" style={{ width: "100%", marginTop: 12 }}>
                        View Deal
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div style={H.dealCta}>
              <div>
                <h3 style={{ color: "#fff", fontSize: "1.12rem", fontWeight: 800, margin: 0 }}>
                  Want these before they go public?
                </h3>
                <p style={{ color: "rgba(255,255,255,.75)", fontSize: ".85rem", margin: "5px 0 0" }}>
                  We send the month's fares to our WhatsApp list first.
                </p>
              </div>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                <WhatsAppIcon size={17} /> Join the list
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ══ LUXURY ════════════════════════════════════ */}
      {luxury.length > 0 && (
        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Special & luxury" eyebrowIcon="sparkles"
              title="When the detail is the point"
              sub="Private villas, chartered transfers and guides worth the fee — arranged end to end."
              viewAll="/packages?minBudget=75000"
            />
            {loading ? <CardSkeleton width={320} height={420} /> : (
              <Rail autoScroll>
                {luxury.map((p) => <PackageCard key={p._id} pkg={p} width={320} />)}
              </Rail>
            )}
          </div>
        </section>
      )}

      {/* ══ GROUP DEPARTURES ══════════════════════════ */}
      <section className="section section-muted">
        <div className="shell">
          <SectionHeading
            eyebrow="Fixed departures" eyebrowIcon="calendar"
            title="Upcoming group tours"
            sub="Set dates, guaranteed departures, and a small group of people travelling at the same pace as you."
            viewAll="/packages?tag=Group"
          />
          <div style={H.groupGrid} className="im-group-grid">
            {GROUP_DEPARTURES.map((g) => {
              const left = g.seats - g.booked;
              const pct = Math.round((g.booked / g.seats) * 100);
              return (
                <div key={g.title} className="card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <span className="badge badge-navy">{g.tag}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink-muted)" }}>{g.duration}</span>
                  </div>

                  <h3 style={{ fontSize: "1rem", fontWeight: 800, margin: 0, lineHeight: 1.35 }}>{g.title}</h3>

                  <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: ".82rem", color: "var(--ink-muted)" }}>
                    <Icon name="calendar" size={14} style={{ color: "var(--orange-dark)" }} />
                    Departs {g.date}
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 5 }}>
                      <span style={{ color: "var(--ink-muted)" }}>{g.booked} of {g.seats} seats taken</span>
                      <strong style={{ color: left <= 4 ? "var(--hot)" : "var(--navy)" }}>{left} left</strong>
                    </div>
                    <div style={{ height: 6, borderRadius: 999, background: "var(--surface-sunken)", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: left <= 4 ? "var(--hot)" : "var(--orange)" }} />
                    </div>
                  </div>

                  <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 10.5, color: "var(--ink-faint)", fontWeight: 700 }}>PER PERSON</div>
                      <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--navy)" }}>
                        ₹{g.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.shortName}! I'd like to join the ${g.title} departing ${g.date}.`)}`}
                      target="_blank" rel="noopener noreferrer" className="btn btn-orange btn-sm"
                    >
                      Reserve
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCES ═══════════════════════════════ */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Travel your way" eyebrowIcon="compass"
            title="Explore by experience"
            sub="Tell us the kind of trip you're after and we'll shape the route around it."
            centered
          />
          <div style={H.expGrid} className="im-exp-grid">
            {experienceTiles.map((t) => (
              <Link key={t.label} to={t.to} className="tile" style={{ height: 170 }}>
                <img src={t.img} alt={t.label} loading="lazy" />
                <span className="tile-veil" />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "#fff" }}>
                  <span style={H.expIcon}><Icon name={t.icon} size={20} /></span>
                  <span style={{ fontWeight: 800, fontSize: ".92rem" }}>{t.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className="section section-muted">
          <div className="shell">
            <SectionHeading
              eyebrow="Verified reviews" eyebrowIcon="star"
              title="What our travellers say"
              sub="Unedited feedback from people who booked with us and came back."
              centered
            />

            <div style={H.quoteWrap}>
              <Icon name="quote" size={54} style={{ color: "rgba(251,146,60,.18)", position: "absolute", top: 20, right: 26 }} />
              <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icon key={i} name="star" size={16}
                        style={{ color: i <= (testimonials[quote]?.rating || 5) ? "var(--orange)" : "#dbe3ec" }} />
                ))}
              </div>
              <p style={{ fontSize: "1.06rem", lineHeight: 1.75, color: "var(--ink)", margin: 0, position: "relative", zIndex: 1 }}>
                {testimonials[quote]?.quote}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 13, marginTop: 22 }}>
                {testimonials[quote]?.avatar && (
                  <img src={testimonials[quote].avatar} alt={testimonials[quote].name}
                       style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover" }} />
                )}
                <div>
                  <div style={{ fontWeight: 800, color: "var(--navy)" }}>{testimonials[quote]?.name}</div>
                  <div style={{ fontSize: ".8rem", color: "var(--ink-faint)" }}>
                    {[testimonials[quote]?.location, testimonials[quote]?.travelDate].filter(Boolean).join(" · ")}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 7, marginTop: 24, justifyContent: "center" }}>
                {testimonials.slice(0, 6).map((_, i) => (
                  <button key={i} onClick={() => setQuote(i)} aria-label={`Review ${i + 1}`}
                          style={{
                            width: i === quote ? 26 : 9, height: 8, borderRadius: 999, border: "none", cursor: "pointer",
                            background: i === quote ? "var(--orange)" : "var(--line)", transition: "width .25s ease",
                          }} />
                ))}
              </div>
            </div>

            <div style={H.ratingRow} className="im-rating-row">
              {[
                { src: "Google Reviews", score: "4.8/5" },
                { src: "TripAdvisor", score: "4.9/5" },
                { src: "Facebook", score: "4.7/5" },
              ].map((r) => (
                <div key={r.src} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--navy)" }}>{r.score}</div>
                  <div style={{ fontSize: ".78rem", color: "var(--ink-muted)" }}>on {r.src}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ WHATSAPP FEEDBACK WALL ════════════════════ */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Straight from the chat" eyebrowIcon="check"
            title="What people message us afterwards"
            sub="Unedited notes travellers sent on WhatsApp once they were home."
            centered
          />

          <div style={H.chatGrid} className="im-chat-grid">
            {feedbackWall.map((f) => (
              <div key={f.name} style={H.chatCard}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={H.avatar}>{f.name.charAt(0)}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: ".86rem", color: "var(--navy)" }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-faint)" }}>{f.when}</div>
                  </div>
                  <WhatsAppIcon size={17} className="im-wa-mark" />
                </div>

                <div style={H.bubble}>
                  <p style={{ margin: 0, fontSize: ".86rem", lineHeight: 1.65, color: "var(--ink)" }}>{f.text}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, marginTop: 7 }}>
                    <span style={{ fontSize: 10, color: "var(--ink-faint)" }}>{f.time}</span>
                    <Icon name="check" size={11} strokeWidth={3} style={{ color: "#34b7f1" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={H.chatCta}>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, margin: 0 }}>
                Ask us anything before you commit
              </h3>
              <p style={{ fontSize: ".85rem", color: "var(--ink-muted)", margin: "5px 0 0" }}>
                Real planners, not a bot queue. No obligation to book.
              </p>
            </div>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
              <WhatsAppIcon size={17} /> Start a chat
            </a>
          </div>

          {/* Trust badges */}
          <div style={H.badgeRow} className="im-badge-row">
            {trustBadges.map((b) => (
              <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={H.badgeIcon}><Icon name={b.icon} size={16} /></span>
                <span style={{ fontSize: ".83rem", fontWeight: 700, color: "var(--navy)" }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ════════════════════════════════════ */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={`Why ${BRAND.shortName}`} eyebrowIcon="shield"
            title="Planned by people who've been there"
            sub="No call-centre scripts, no mystery mark-ups — just a small team that plans trips properly."
            centered
          />
          <div style={H.whyGrid} className="im-why-grid">
            {whyUs.map((w) => (
              <div key={w.title} className="card" style={{ padding: 22 }}>
                <span style={H.whyIcon}><Icon name={w.icon} size={20} /></span>
                <h3 style={{ fontSize: ".98rem", fontWeight: 800, margin: "14px 0 7px" }}>{w.title}</h3>
                <p style={{ fontSize: ".85rem", lineHeight: 1.65, color: "var(--ink-muted)", margin: 0 }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BAND ══════════════════════════════════ */}
      <section style={H.ctaBand}>
        <div className="shell" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.5rem, 1.1rem + 1.7vw, 2.2rem)", fontWeight: 800, margin: 0 }}>
            Tell us where you'd like to wake up
          </h2>
          <p style={{ color: "rgba(255,255,255,.8)", maxWidth: 560, margin: "14px auto 26px", lineHeight: 1.7 }}>
            Send us a rough idea — dates, budget, who's travelling — and we'll come back with a
            realistic plan and a price, usually the same day.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-orange btn-lg">
              <Icon name="send" size={17} /> Get a Free Quote
            </Link>
            <a href={`tel:${BRAND.phone}`} className="btn btn-ghost btn-lg">
              <Icon name="phone" size={17} /> {BRAND.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* ══ BLOG ══════════════════════════════════════ */}
      {/* <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Travel journal" eyebrowIcon="doc"
            title="Guides worth reading before you book"
            sub="Written by our planners after the trip, not before it."
            viewAll="/destinations" viewAllLabel="All destinations"
          />
          <div style={H.blogGrid} className="im-blog-grid">
            {ARTICLES.map((a) => (
              <article key={a.title} className="card" style={{ display: "flex", flexDirection: "column", gridColumn: a.feature ? "span 2" : "span 1" }}>
                <div style={{ aspectRatio: a.feature ? "16/9" : "16/10", overflow: "hidden" }}>
                  <img src={a.img} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: 18 }}>
                  <span className="badge" style={{ background: "var(--surface-sunken)", color: "var(--navy)" }}>{a.tag}</span>
                  <h3 style={{ fontSize: a.feature ? "1.2rem" : ".98rem", fontWeight: 800, margin: "11px 0 8px", lineHeight: 1.35 }}>
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p style={{ fontSize: ".87rem", lineHeight: 1.65, color: "var(--ink-muted)", margin: "0 0 12px" }}>
                      {a.excerpt}
                    </p>
                  )}
                  <div style={{ display: "flex", gap: 14, fontSize: 11.5, color: "var(--ink-faint)" }}>
                    <span>{a.date}</span><span>·</span><span>{a.read}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      {/* ══ Responsive ════════════════════════════════ */}
      <style>{`
        .im-search-card { grid-template-columns: 2fr 1.2fr 1.2fr 1.2fr auto; }
        .im-deal-grid   { grid-template-columns: repeat(4, 1fr); }
        .im-group-grid  { grid-template-columns: repeat(4, 1fr); }
        .im-exp-grid    { grid-template-columns: repeat(4, 1fr); }
        .im-why-grid    { grid-template-columns: repeat(4, 1fr); }
        .im-blog-grid   { grid-template-columns: repeat(4, 1fr); }
        .im-chat-grid   { grid-template-columns: repeat(4, 1fr); }
        .im-stats       { grid-template-columns: repeat(4, 1fr); }
        .im-badge-row   { grid-template-columns: repeat(4, 1fr); }
        .im-wa-mark     { margin-left: auto; color: var(--wa-green-dark); }

        @media (max-width: 1080px) {
          .im-search-card { grid-template-columns: 1fr 1fr !important; }
          .im-deal-grid, .im-group-grid, .im-why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .im-blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .im-chat-grid, .im-badge-row { grid-template-columns: repeat(2, 1fr) !important; }
          .im-blog-grid > article:first-child { grid-column: span 2 !important; }
        }
        @media (max-width: 900px) {
          .im-hero-form { display: none !important; }
          .im-exp-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .im-search-card { grid-template-columns: 1fr !important; }
          .im-deal-grid, .im-group-grid, .im-why-grid { grid-template-columns: 1fr !important; }
          .im-exp-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .im-blog-grid { grid-template-columns: 1fr !important; }
          .im-chat-grid, .im-badge-row { grid-template-columns: 1fr !important; }
          .im-blog-grid > article:first-child { grid-column: span 1 !important; }
          .im-rating-row { gap: 26px !important; }
          .im-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </main>
  );
}

/* ── styles ─────────────────────────────────────────── */
const H = {
  hero: { position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", overflow: "hidden" },
  heroBadge: {
    display: "inline-flex", alignItems: "center", gap: 8,
    color: "#fff", fontSize: ".85rem", fontWeight: 600,
    padding: "8px 16px", borderRadius: 999, marginBottom: 16,
  },
  slide: { position: "absolute", inset: 0, transition: "opacity 1.1s ease" },
  slideImg: { width: "100%", height: "100%", objectFit: "cover" },
  veil: { position: "absolute", inset: 0, background: "linear-gradient(to bottom right, rgba(0,0,0,.65), rgba(0,0,0,.45), rgba(0,0,0,.50))" },
  heroInner: {
    position: "relative", zIndex: 2, display: "flex", alignItems: "center",
    justifyContent: "space-between", gap: 40, paddingBlock: 56, width: "100%",
  },
  h1: { color: "#fff", fontSize: "clamp(2.1rem, 1.3rem + 3.4vw, 3.9rem)", fontWeight: 800, lineHeight: 1.05, margin: 0, letterSpacing: "-0.03em" },
  heroSub: { color: "rgba(255,255,255,.86)", fontSize: "clamp(.95rem, .9rem + .3vw, 1.12rem)", marginTop: 18, maxWidth: 480, lineHeight: 1.6 },
  stats: { display: "grid", gap: 20 },
  searchKicker: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    color: "rgba(255,255,255,.8)", fontSize: 12, fontWeight: 800,
    letterSpacing: ".12em", margin: "0 0 16px",
  },
  searchCard: {
    display: "grid", gap: 14, background: "#fff",
    padding: 20, borderRadius: 16, boxShadow: "0 18px 44px rgba(0,0,0,.22)",
  },
  chip: {
    background: "rgba(255,255,255,.14)", color: "#fff", padding: "5px 13px",
    borderRadius: 999, fontSize: 12, fontWeight: 600, textDecoration: "none",
    border: "1px solid rgba(255,255,255,.2)",
  },
  dealGrid: { display: "grid", gap: 18 },
  dealCard: {
    background: "#fff", borderRadius: 16, overflow: "hidden", textDecoration: "none",
    color: "inherit", boxShadow: "0 10px 28px rgba(0,0,0,.2)", display: "block",
  },
  dealCta: {
    marginTop: 30, padding: "20px 24px", borderRadius: 16,
    background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.16)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 18, flexWrap: "wrap",
  },
  groupGrid: { display: "grid", gap: 18 },
  expGrid: { display: "grid", gap: 14 },
  expIcon: {
    width: 46, height: 46, borderRadius: "50%",
    background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.3)",
    display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)",
  },
  quoteWrap: {
    position: "relative", background: "#fff", borderRadius: 20, padding: "34px 32px",
    maxWidth: 720, margin: "0 auto", border: "1px solid var(--line)",
    boxShadow: "0 14px 40px rgba(56,11,22,.08)",
  },
  ratingRow: {
    display: "flex", justifyContent: "center", gap: 56,
    marginTop: 34, flexWrap: "wrap",
  },
  whyGrid: { display: "grid", gap: 18 },
  whyIcon: {
    width: 44, height: 44, borderRadius: 12, display: "flex",
    alignItems: "center", justifyContent: "center",
    background: "linear-gradient(135deg, rgba(222,178,88,.24), rgba(194,143,50,.18))",
    color: "var(--orange-dark)",
  },
  ctaBand: {
    position: "relative", paddingBlock: 68, overflow: "hidden",
    background: "linear-gradient(120deg, var(--navy-900) 0%, var(--navy-700) 100%)",
  },
  blogGrid: { display: "grid", gap: 20 },
  chatGrid: { display: "grid", gap: 16 },
  chatCard: {
    background: "#f0f6ef", borderRadius: 14, padding: 16,
    border: "1px solid #dfeadd",
  },
  avatar: {
    width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
    background: "var(--navy)", color: "#fff", fontWeight: 800, fontSize: ".82rem",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  bubble: {
    background: "#fff", borderRadius: "12px 12px 12px 4px",
    padding: "12px 14px", boxShadow: "0 1px 2px rgba(0,0,0,.08)",
  },
  chatCta: {
    marginTop: 26, padding: "20px 24px", borderRadius: 16,
    background: "var(--surface-muted)", border: "1px solid var(--line)",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 18, flexWrap: "wrap",
  },
  badgeRow: {
    marginTop: 26, paddingTop: 22, borderTop: "1px solid var(--line)",
    display: "grid", gap: 18,
  },
  badgeIcon: {
    width: 34, height: 34, borderRadius: 9, flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(194,143,50,.15)", color: "var(--orange-dark)",
  },
};
