// src/pages/PackageDetail.jsx — Luxytrix-style full layout
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../utils/api";
import { generateWhatsAppLink } from "../utils/whatsapp";
import Icon, { WhatsAppIcon } from "../components/ui/Icon";
import SEO from "../components/ui/SEO";
import { BRAND } from "../utils/siteConfig";

/* ── default FAQs shown when package has none ── */
const DEFAULT_FAQS = [
  {
    question: "Can I customise this package?",
    answer: "Absolutely! Every package is fully customisable. You can upgrade hotel category, add or remove days, change dates, add special experiences, or combine with other destinations. Contact our team for a personalised quote.",
  },
  {
    question: "What is the cancellation policy?",
    answer: "Free cancellation up to 30 days before departure for a full refund. 15–30 days: 25% charge. 7–14 days: 50% charge. Less than 7 days: 75% charge. Date changes allowed subject to availability.",
  },
  {
    question: "When is the best time to book?",
    answer: "We recommend booking at least 4–6 weeks in advance to secure your preferred hotel and dates. For peak season travel (October–March), book 2–3 months ahead.",
  },
  {
    question: "Is travel insurance included?",
    answer: "Travel insurance is not included by default but is strongly recommended. We can help arrange comprehensive travel insurance covering medical emergencies, trip cancellation, and baggage loss.",
  },
];

const WHY_BOOK = [
  { icon: "shield",  text: "100% Verified Hotels" },
  { icon: "tag",     text: "Best Price Guarantee" },
  { icon: "headset", text: "24/7 Support" },
  { icon: "refresh", text: "Flexible Cancellation" },
  { icon: "magic",   text: "100% Customisable" },
];

export default function PackageDetail() {
  const { slug } = useParams();
  const [pkg,        setPkg]        = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(false);
  const [tier,       setTier]       = useState(null);
  const [travellers, setTravellers] = useState(2);
  const [lightbox,   setLightbox]   = useState(null);
  const [openFaq,    setOpenFaq]    = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true); setError(false);
    (async () => {
      try {
        const res = await api.getPackage(slug);
        if (!alive) return;
        if (!res || res.error) { setError(true); return; }
        setPkg(res);
        setTier(res.hotelStandards?.[0]?.tier || null);
      } catch { if (alive) setError(true); }
      finally { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, [slug]);

  if (loading) return (
    <main className="section">
      <div className="shell" style={{ display: "grid", gap: 24 }}>
        <div className="skeleton" style={{ height: 400 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
          <div style={{ display: "grid", gap: 18 }}>
            <div className="skeleton" style={{ height: 28, width: "60%" }} />
            <div className="skeleton" style={{ height: 120 }} />
            <div className="skeleton" style={{ height: 200 }} />
          </div>
          <div className="skeleton" style={{ height: 380 }} />
        </div>
      </div>
    </main>
  );

  if (error || !pkg) return (
    <main className="section">
      <div className="shell" style={{ textAlign: "center", paddingBlock: 80 }}>
        <Icon name="compass" size={48} style={{ color: "var(--ink-faint)" }} />
        <h1 style={{ fontSize: "1.5rem", margin: "16px 0 8px" }}>Package not found</h1>
        <p style={{ color: "var(--ink-muted)", marginBottom: 24 }}>
          It may have sold out or been replaced with a newer itinerary.
        </p>
        <Link to="/packages" className="btn btn-orange">See all packages</Link>
      </div>
    </main>
  );

  const cur     = pkg.priceRange?.currency || "₹";
  const selected = (pkg.hotelStandards || []).find(h => h.tier === tier);
  const unit    = selected?.priceMin ?? pkg.priceRange?.min ?? 0;
  const was     = pkg.priceRange?.max;
  const off     = was && was > unit ? Math.round(((was - unit) / was) * 100) : null;
  const total   = unit * travellers;
  const gallery = [pkg.image, ...(pkg.galleryImages || [])].filter(Boolean);
  const stops   = (pkg.location || "").split(/[,→|]/).map(s => s.trim()).filter(Boolean).slice(0, 4);
  const faqs    = pkg.faqs?.length ? pkg.faqs : DEFAULT_FAQS;
  const reviews = pkg.reviews || [];
  const rb      = pkg.ratingBreakdown || {};
  const related = pkg.related || [];

  const waLink = generateWhatsAppLink({
    whatsappNumber: BRAND.whatsapp,
    packageName: pkg.name,
    destination: pkg.location || pkg.destination?.name,
    travelers: travellers,
    hotelStandard: tier || "Standard",
    priceRange: pkg.priceRange,
  });

  return (
    <main style={{ background: "var(--surface-muted)" }}>
      <SEO
        title={pkg.name}
        description={(pkg.description || `${pkg.name} — ${pkg.duration || ""} itinerary covering ${pkg.location || ""}.`).slice(0, 158)}
        image={pkg.image}
        path={`/packages/${pkg.slug}`}
      />

      {/* ── HERO IMAGE with overlaid title + pills ──────────── */}
      <section style={S.hero}>
        {pkg.image && (
          <img src={pkg.image} alt={pkg.name} style={S.heroImg} />
        )}
        <span style={S.heroVeil} />

        <div className="shell" style={S.heroInner}>
          {/* Breadcrumb */}
          <nav style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18 }}>
            <Link to="/" style={S.crumb}>Home</Link>
            <Icon name="chevronRight" size={12} style={{ color: "rgba(255,255,255,.45)" }} />
            <Link to="/packages" style={S.crumb}>Packages</Link>
            <Icon name="chevronRight" size={12} style={{ color: "rgba(255,255,255,.45)" }} />
            <span style={{ ...S.crumb, color: "var(--orange-light)", fontWeight: 700 }}>{pkg.name}</span>
          </nav>

          {pkg.badge && (
            <span className="badge badge-orange" style={{ marginBottom: 14 }}>{pkg.badge}</span>
          )}

          <h1 style={S.heroTitle}>{pkg.name}</h1>

          {/* Pills row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
            {pkg.duration && (
              <span className="badge badge-glass">
                <Icon name="clock" size={13} /> {pkg.duration}
              </span>
            )}
            {stops.map(s => (
              <span key={s} className="badge badge-glass">
                <Icon name="pin" size={13} /> {s}
              </span>
            ))}
            {pkg.rating > 0 && (
              <span className="badge badge-glass">
                <Icon name="star" size={13} style={{ color: "var(--orange-light)" }} /> {pkg.rating}/5 ({pkg.reviewCount || 0} reviews)
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── BODY: main col + sticky sidebar ─────────────────── */}
      <div className="shell im-pd-layout" style={{ paddingBlock: 40 }}>

        {/* ───── LEFT: main content ───── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

          {/* Package Overview */}
          <div style={S.card}>
            <h2 style={S.cardTitle}>Package Overview</h2>
            <p style={S.desc}>{pkg.description || "Full itinerary details available on request."}</p>

            {/* Package Highlights */}
            {(pkg.highlights?.length > 0 || pkg.inclusions?.length > 0) && (
              <div style={{ marginTop: 22, background: "var(--surface-muted)", borderRadius: 14, padding: 20 }}>
                <h3 style={S.subH}>Package Highlights</h3>
                <ul style={S.checkList}>
                  {(pkg.highlights?.length > 0
                    ? pkg.highlights.map(h => h.title)
                    : (pkg.inclusions || []).slice(0, 6)
                  ).map((item, i) => (
                    <li key={i} style={S.checkItem}>
                      <span style={S.checkDot}><Icon name="check" size={13} strokeWidth={3} /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Day-by-Day Itinerary */}
          {pkg.itinerary?.length > 0 && (
            <div style={S.card}>
              <h2 style={S.cardTitle}>Day-by-Day Itinerary</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 20 }}>
                {pkg.itinerary.map((d, i) => (
                  <div key={i} style={S.dayRow}>
                    {/* Number circle + connecting line */}
                    <div style={S.dayNumCol}>
                      <div style={S.dayCircle}>{d.day}</div>
                      {i < pkg.itinerary.length - 1 && <div style={S.dayLine} />}
                    </div>
                    {/* Content */}
                    <div style={S.dayContent}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <span style={S.dayBadge}>Day {d.day}</span>
                        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 800, color: "var(--navy)" }}>{d.title}</h3>
                      </div>
                      {d.description && (
                        <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: ".9rem", lineHeight: 1.75 }}>
                          {d.description}
                        </p>
                      )}
                      {d.tags?.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                          {d.tags.map(t => (
                            <span key={t} className="badge" style={{ background: "var(--orange-pale)", color: "var(--orange-dark)", fontSize: 11 }}>{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What's Included / Not Included — side by side */}
          {(pkg.inclusions?.length > 0 || pkg.exclusions?.length > 0) && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="im-inc-grid">
              {pkg.inclusions?.length > 0 && (
                <div style={{ ...S.incCard, borderLeft: "4px solid #16a34a" }}>
                  <h3 style={{ ...S.subH, display: "flex", alignItems: "center", gap: 8, margin: "0 0 16px", color: "#16a34a" }}>
                    <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="check" size={15} strokeWidth={3} style={{ color: "#16a34a" }} />
                    </span>
                    What's Included
                  </h3>
                  <ul style={S.checkList}>
                    {pkg.inclusions.map((x, i) => (
                      <li key={i} style={S.checkItem}>
                        <span style={{ ...S.checkDot, background: "#dcfce7", color: "#16a34a" }}>
                          <Icon name="check" size={12} strokeWidth={3} />
                        </span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pkg.exclusions?.length > 0 && (
                <div style={{ ...S.incCard, borderLeft: "4px solid var(--hot)" }}>
                  <h3 style={{ ...S.subH, display: "flex", alignItems: "center", gap: 8, margin: "0 0 16px", color: "var(--hot)" }}>
                    <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="close" size={15} strokeWidth={3} style={{ color: "var(--hot)" }} />
                    </span>
                    Not Included
                  </h3>
                  <ul style={S.checkList}>
                    {pkg.exclusions.map((x, i) => (
                      <li key={i} style={S.checkItem}>
                        <span style={{ ...S.checkDot, background: "#fee2e2", color: "var(--hot)" }}>
                          <Icon name="close" size={12} strokeWidth={3} />
                        </span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Photo Gallery */}
          {gallery.length > 1 && (
            <div style={S.card}>
              <h2 style={S.cardTitle}>Photo Gallery</h2>
              <div className="im-pd-gallery" style={{ marginTop: 16 }}>
                {gallery.map((src, i) => (
                  <button key={i} onClick={() => setLightbox(src)} style={S.galBtn}>
                    <img src={src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          <div style={S.card}>
            <h2 style={S.cardTitle}>Frequently Asked Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 16 }}>
              {faqs.map((f, i) => {
                const on = openFaq === i;
                return (
                  <div key={i} style={{ borderBottom: "1px solid var(--line)" }}>
                    <button
                      onClick={() => setOpenFaq(on ? null : i)}
                      style={S.faqBtn}
                    >
                      <span style={S.faqQ}>
                        <span style={S.faqIcon}>?</span>
                        {f.question}
                      </span>
                      <Icon name="chevronDown" size={18} style={{
                        color: "var(--ink-faint)", flexShrink: 0,
                        transform: on ? "rotate(180deg)" : "none", transition: "transform .2s ease",
                      }} />
                    </button>
                    {on && (
                      <div style={S.faqAns}>{f.answer}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Traveller Reviews */}
          {(reviews.length > 0 || pkg.rating > 0) && (
            <div style={S.card}>
              <h2 style={S.cardTitle}>Traveller Reviews</h2>

              {/* Rating summary */}
              {pkg.rating > 0 && (
                <div style={S.ratingRow}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "3rem", fontWeight: 900, color: "var(--navy)", lineHeight: 1 }}>{pkg.rating}</div>
                    <div style={{ display: "flex", gap: 3, justifyContent: "center", margin: "6px 0 4px" }}>
                      {[1,2,3,4,5].map(i => (
                        <Icon key={i} name="star" size={16} style={{ color: i <= Math.round(pkg.rating) ? "var(--orange)" : "#dbe3ec" }} />
                      ))}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 600 }}>{pkg.reviewCount || 0}+ reviews</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    {[
                      { label: "Itinerary Quality",  pct: rb.itineraryQuality || 95 },
                      { label: "Hotel Standards",    pct: rb.hotelStandards   || 92 },
                      { label: "Guide Knowledge",    pct: rb.guideKnowledge   || 94 },
                      { label: "Value for Money",    pct: rb.valueForMoney    || 90 },
                    ].map(row => (
                      <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink-muted)", minWidth: 140 }}>{row.label}</div>
                        <div style={{ flex: 1, height: 8, borderRadius: 999, background: "var(--surface-sunken)", overflow: "hidden" }}>
                          <div style={{ width: `${row.pct}%`, height: "100%", background: "linear-gradient(90deg, var(--orange-light), var(--orange))", borderRadius: 999 }} />
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--navy)", minWidth: 32 }}>{row.pct}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Review cards */}
              {reviews.length > 0 && (
                <div className="im-review-grid" style={{ marginTop: 22 }}>
                  {reviews.map((r, i) => (
                    <div key={i} style={S.reviewCard}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                        <div style={S.avatar}>{r.avatar || r.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}</div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: ".9rem", color: "var(--navy)" }}>{r.name}</div>
                          {r.city && <div style={{ fontSize: 12, color: "var(--ink-faint)" }}>{r.city}</div>}
                        </div>
                        <div style={{ marginLeft: "auto", display: "flex", gap: 2 }}>
                          {[1,2,3,4,5].map(i => (
                            <Icon key={i} name="star" size={13} style={{ color: i <= r.rating ? "var(--orange)" : "#dbe3ec" }} />
                          ))}
                        </div>
                      </div>
                      <p style={{ margin: 0, fontSize: ".86rem", lineHeight: 1.7, color: "var(--ink-muted)", fontStyle: "italic" }}>
                        "{r.text}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ───── RIGHT: sticky sidebar ───── */}
        <aside className="im-pd-side" style={{ alignSelf: "start" }}>
          <div style={{ position: "sticky", top: 80, display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Booking card */}
            <div style={S.bookCard}>
              {off && (
                <span className="badge badge-hot" style={{ marginBottom: 12 }}>{off}% OFF</span>
              )}
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-faint)", letterSpacing: ".05em" }}>STARTING FROM</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "4px 0 2px" }}>
                <span style={{ fontSize: "2.1rem", fontWeight: 900, color: "var(--navy)", lineHeight: 1 }}>
                  {cur}{Number(unit).toLocaleString("en-IN")}
                </span>
                {off && <span className="price-strike">{cur}{Number(was).toLocaleString("en-IN")}</span>}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 16 }}>per person</div>

              {/* Meta facts */}
              <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
                {pkg.duration && (
                  <div style={S.factRow}>
                    <Icon name="clock" size={15} style={{ color: "var(--orange)" }} />
                    <span style={{ color: "var(--ink-muted)", fontSize: ".87rem" }}>Duration: <strong style={{ color: "var(--navy)" }}>{pkg.duration}</strong></span>
                  </div>
                )}
                {pkg.location && (
                  <div style={S.factRow}>
                    <Icon name="pin" size={15} style={{ color: "var(--orange)" }} />
                    <span style={{ color: "var(--ink-muted)", fontSize: ".87rem" }}><strong style={{ color: "var(--navy)" }}>{stops.slice(0, 2).join(", ")}</strong></span>
                  </div>
                )}
                {pkg.rating > 0 && (
                  <div style={S.factRow}>
                    <Icon name="star" size={15} style={{ color: "var(--orange)" }} />
                    <span style={{ color: "var(--ink-muted)", fontSize: ".87rem" }}>
                      Rated <strong style={{ color: "var(--navy)" }}>{pkg.rating}/5</strong> ({pkg.reviewCount || 0} reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Hotel standard selector */}
              {pkg.hotelStandards?.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={S.sideLabel}><Icon name="hotel" size={13} /> Hotel Standard</div>
                  <div style={{ display: "grid", gap: 6 }}>
                    {pkg.hotelStandards.map(h => {
                      const on = tier === h.tier;
                      return (
                        <button key={h.tier} onClick={() => setTier(h.tier)}
                          style={{ ...S.tierBtn, borderColor: on ? "var(--orange)" : "var(--line)", background: on ? "rgba(249,115,22,.06)" : "#fff" }}>
                          <span style={{ fontWeight: 700, fontSize: ".85rem" }}>{h.tier}</span>
                          {h.priceMin != null && (
                            <span style={{ fontSize: ".82rem", fontWeight: 800, color: on ? "var(--orange-dark)" : "var(--navy)" }}>
                              {cur}{Number(h.priceMin).toLocaleString("en-IN")}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Travellers stepper */}
              <div style={{ marginBottom: 16 }}>
                <div style={S.sideLabel}><Icon name="users" size={13} /> Travellers</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <button onClick={() => setTravellers(Math.max(1, travellers - 1))} style={S.step}>−</button>
                  <span style={{ fontWeight: 800, fontSize: "1.1rem", minWidth: 28, textAlign: "center" }}>{travellers}</span>
                  <button onClick={() => setTravellers(Math.min(20, travellers + 1))} style={S.step}>+</button>
                  <span style={{ fontSize: ".82rem", color: "var(--ink-faint)", marginLeft: "auto" }}>
                    Total: <strong style={{ color: "var(--navy)" }}>{cur}{Number(total).toLocaleString("en-IN")}</strong>
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: "grid", gap: 10 }}>
                <Link to="/contact" className="btn btn-orange" style={{ width: "100%", padding: "14px 20px" }}>
                  <Icon name="send" size={16} /> Enquire Now
                </Link>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ width: "100%" }}>
                  <WhatsAppIcon size={16} /> WhatsApp Us
                </a>
                <a href={`tel:${BRAND.phone}`} className="btn btn-outline" style={{ width: "100%" }}>
                  <Icon name="phone" size={15} /> {BRAND.phoneDisplay}
                </a>
              </div>
              <p style={{ textAlign: "center", fontSize: 11.5, color: "var(--ink-faint)", margin: "12px 0 0" }}>
                Free consultation · No hidden charges
              </p>
            </div>

            {/* Why Book With Us */}
            <div style={S.bookCard}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--navy)", margin: "0 0 14px" }}>
                Why Book with {BRAND.shortName}?
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                {WHY_BOOK.map(w => (
                  <li key={w.text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: ".86rem", color: "var(--ink-muted)" }}>
                    <span style={S.whyIcon}><Icon name={w.icon} size={14} /></span>
                    {w.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* You May Also Like */}
            {related.length > 0 && (
              <div style={S.bookCard}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--navy)", margin: "0 0 14px" }}>
                  You May Also Like
                </h3>
                <div style={{ display: "grid", gap: 12 }}>
                  {related.map(r => (
                    <Link key={r._id || r.slug} to={`/packages/${r.slug}`} style={S.relatedItem}>
                      <img
                        src={r.image || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=120&q=80"}
                        alt={r.name} style={S.relatedImg}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: ".85rem", color: "var(--navy)", lineHeight: 1.3, marginBottom: 4 }}>
                          {r.name}
                        </div>
                        {r.duration && (
                          <div style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>{r.duration}</div>
                        )}
                        {r.priceRange?.min && (
                          <div style={{ fontSize: 13, fontWeight: 800, color: "var(--orange-dark)", marginTop: 4 }}>
                            {r.priceRange.currency || "₹"}{Number(r.priceRange.min).toLocaleString("en-IN")}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={S.lightbox}>
          <button onClick={() => setLightbox(null)} aria-label="Close" style={S.lightboxX}>
            <Icon name="close" size={28} />
          </button>
          <img src={lightbox} alt="" style={{ maxWidth: "92vw", maxHeight: "88vh", borderRadius: 14, objectFit: "contain" }} />
        </div>
      )}

      <style>{`
        .im-pd-layout { display: grid; grid-template-columns: 1fr 360px; gap: 32px; align-items: start; }
        .im-pd-side { align-self: start; }
        .im-inc-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .im-pd-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .im-review-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        /* Hide scrollbar on sidebar */
        .im-pd-side > div::-webkit-scrollbar { display: none; }
        .im-pd-side > div { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 1100px) {
          .im-pd-layout { grid-template-columns: 1fr; }
          .im-pd-side { order: -1; align-self: auto; }
          .im-pd-side > div { position: static !important; max-height: none !important; overflow-y: visible !important; }
        }
        @media (max-width: 640px) {
          .im-inc-grid, .im-review-grid { grid-template-columns: 1fr; }
          .im-pd-gallery { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </main>
  );
}

/* ── styles ──────────────────────────────────────────── */
const S = {
  hero: {
    position: "relative", minHeight: 420, display: "flex",
    alignItems: "flex-end", overflow: "hidden",
  },
  heroImg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
  heroVeil: {
    position: "absolute", inset: 0,
    background: "linear-gradient(to top, rgba(10,31,66,.95) 0%, rgba(10,31,66,.55) 50%, rgba(10,31,66,.2) 100%)",
  },
  heroInner: { position: "relative", zIndex: 2, paddingBlock: "48px 40px" },
  heroTitle: {
    color: "#fff", fontSize: "clamp(1.9rem, 1.2rem + 2.6vw, 3rem)",
    fontWeight: 900, lineHeight: 1.1, margin: 0, letterSpacing: "-0.03em",
  },
  crumb: { color: "rgba(255,255,255,.72)", fontSize: 12.5, textDecoration: "none", fontWeight: 600 },

  card: {
    background: "#fff", borderRadius: 16, padding: 28,
    boxShadow: "0 4px 20px rgba(15,45,94,.07)", border: "1px solid var(--line)",
  },
  cardTitle: { fontSize: "1.3rem", fontWeight: 900, color: "var(--navy)", margin: "0 0 4px", letterSpacing: "-0.02em" },
  subH: { fontSize: "1rem", fontWeight: 800, color: "var(--navy)", margin: "0 0 12px" },
  desc: { color: "var(--ink-muted)", lineHeight: 1.8, fontSize: ".96rem", margin: "10px 0 0" },

  checkList: { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 },
  checkItem: { display: "flex", alignItems: "flex-start", gap: 10, fontSize: ".9rem", color: "var(--ink-muted)", lineHeight: 1.55 },
  checkDot: {
    width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 1,
    background: "#dcfce7", color: "#16a34a",
    display: "flex", alignItems: "center", justifyContent: "center",
  },

  /* Itinerary timeline */
  dayRow: { display: "flex", gap: 16, paddingBottom: 24 },
  dayNumCol: { display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 },
  dayCircle: {
    width: 40, height: 40, borderRadius: "50%",
    background: "var(--navy)", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 900, fontSize: ".9rem", flexShrink: 0,
  },
  dayLine: { width: 2, flex: 1, background: "var(--line)", marginTop: 6 },
  dayContent: { flex: 1, paddingTop: 8 },
  dayBadge: {
    display: "inline-block", padding: "2px 10px", borderRadius: 999,
    background: "var(--orange-pale)", color: "var(--orange-dark)",
    fontSize: 11.5, fontWeight: 800,
  },

  /* Inclusions card */
  incCard: {
    background: "#fff", borderRadius: 14, padding: "20px 22px",
    boxShadow: "0 4px 14px rgba(15,45,94,.06)", border: "1px solid var(--line)",
  },

  /* FAQ */
  faqBtn: {
    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 12, padding: "18px 0", background: "transparent", border: "none",
    cursor: "pointer", fontFamily: "inherit", textAlign: "left",
  },
  faqQ: { display: "flex", alignItems: "flex-start", gap: 12, fontSize: ".95rem", fontWeight: 700, color: "var(--navy)" },
  faqIcon: {
    width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
    background: "var(--orange-pale)", color: "var(--orange-dark)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 14, fontWeight: 900,
  },
  faqAns: { padding: "0 0 18px 38px", fontSize: ".9rem", color: "var(--ink-muted)", lineHeight: 1.75 },

  /* Reviews */
  ratingRow: {
    display: "flex", gap: 32, alignItems: "center",
    background: "var(--surface-muted)", borderRadius: 14, padding: 20, marginTop: 18,
    flexWrap: "wrap",
  },
  reviewCard: {
    background: "var(--surface-muted)", borderRadius: 14, padding: "18px 20px",
    border: "1px solid var(--line)",
  },
  avatar: {
    width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
    background: "var(--navy)", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 800, fontSize: ".9rem",
  },

  /* Booking sidebar */
  bookCard: {
    background: "#fff", border: "1px solid var(--line)", borderRadius: 18,
    padding: 24, boxShadow: "0 8px 30px rgba(15,45,94,.10)",
  },
  factRow: { display: "flex", alignItems: "center", gap: 10 },
  sideLabel: {
    display: "flex", alignItems: "center", gap: 6,
    fontSize: 11.5, fontWeight: 800, color: "var(--navy)",
    letterSpacing: ".04em", textTransform: "uppercase",
    marginBottom: 8,
  },
  tierBtn: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    gap: 10, padding: "10px 13px", borderRadius: 9,
    border: "1.5px solid var(--line)", cursor: "pointer",
    fontFamily: "inherit", transition: "all .16s ease", background: "#fff",
  },
  step: {
    width: 38, height: 38, borderRadius: 9, border: "1.5px solid var(--line)",
    background: "#fff", cursor: "pointer", fontSize: "1.1rem",
    fontWeight: 700, color: "var(--navy)", fontFamily: "inherit",
  },
  whyIcon: {
    width: 28, height: 28, borderRadius: 7, flexShrink: 0,
    background: "var(--orange-pale)", color: "var(--orange-dark)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  relatedItem: {
    display: "flex", gap: 12, alignItems: "flex-start",
    textDecoration: "none", padding: "10px 0", borderBottom: "1px solid var(--line)",
  },
  relatedImg: { width: 70, height: 60, borderRadius: 8, objectFit: "cover", flexShrink: 0 },

  lightbox: {
    position: "fixed", inset: 0, zIndex: 90,
    background: "rgba(10,31,66,.94)", display: "flex",
    alignItems: "center", justifyContent: "center",
    padding: 20, cursor: "zoom-out",
  },
  lightboxX: {
    position: "absolute", top: 20, right: 24,
    background: "transparent", border: "none", color: "#fff", cursor: "pointer",
  },
  galBtn: {
    padding: 0, border: "none", cursor: "pointer",
    borderRadius: 10, overflow: "hidden",
    aspectRatio: "4/3", background: "var(--surface-sunken)",
  },
};
