// src/pages/AboutUs.jsx
import { Link } from "react-router-dom";
import Icon, { WhatsAppIcon } from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import SEO from "../components/ui/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import { BRAND, trustStats, whyUs } from "../utils/siteConfig";

const VALUES = [
  {
    icon: "compass",
    title: "Routes we've actually walked",
    body: "We don't resell a catalogue we've never seen. If an itinerary is on this site, someone on the team has done the drive, stayed at the hotel and eaten at the dhaba we're sending you to.",
  },
  {
    icon: "wallet",
    title: "One price, explained",
    body: "Every quote is itemised — stays, transfers, permits, taxes. If something isn't included we say so upfront, so the number you approve is the number you pay.",
  },
  {
    icon: "clock",
    title: "Pace over checklists",
    body: "Most itineraries try to fit too much in. We'd rather cut a stop and give you an unhurried morning than have you spend the holiday in a car.",
  },
  {
    icon: "headset",
    title: "One person, start to finish",
    body: "You get a named planner who knows your booking — not a ticket number and a different agent every time you call.",
  },
];

const MILESTONES = [
  { year: "Then", title: "A side project", body: "We started by planning trips for friends who kept asking how to do Kashmir or Kerala properly without overpaying." },
  { year: "Growing", title: "Word travelled", body: "Those friends sent their friends. We built relationships with hotels and drivers we'd use ourselves." },
  { year: "Today", title: "A small studio in Noida", body: "A compact team handling domestic and international holidays, group departures and corporate travel." },
  { year: "Next", title: "More of the same", body: "Deeper coverage of the routes we know, rather than a longer list of places we don't." },
];

export default function AboutUs() {
  const waLink = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.shortName}! I'd like to know more about your trips.`)}`;

  return (
    <main>
      <SEO
        title="About Us"
        description="A small Noida-based travel studio planning unhurried, honestly priced holidays across India and abroad."
        path="/about-us"
      />
      <PageHero
        eyebrow={`About ${BRAND.shortName}`}
        title="A travel studio, not a booking engine"
        sub="We're a small Noida-based team that plans holidays properly — fewer itineraries, better ones, priced without games."
        image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1800&auto=format&fit=crop"
        crumbs={[{ label: "About" }]}
      />

      {/* Stats */}
      <section className="section-navy" style={{ paddingBlock: 28 }}>
        <div className="shell im-about-stats">
          {trustStats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--orange-light)", lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: ".78rem", color: "rgba(255,255,255,.78)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="shell im-story">
          <div>
            <SectionHeading eyebrow="Our story" eyebrowIcon="sparkles" title="Why we started" />
            <div style={{ display: "grid", gap: 16, color: "var(--ink-muted)", lineHeight: 1.85, fontSize: ".97rem" }}>
              <p style={{ margin: 0 }}>
                Most people planning a holiday in India run into the same two problems: a wall of
                near-identical packages with prices that shift depending on who's asking, and an
                itinerary so packed that the trip becomes a logistics exercise.
              </p>
              <p style={{ margin: 0 }}>
                We built {BRAND.name} to do the opposite. We keep the list of destinations we cover
                deliberately narrow, so that for each one we know which hotel has the view worth
                paying for, which road is worth the extra two hours, and which "must-see" you can
                comfortably skip.
              </p>
              <p style={{ margin: 0 }}>
                Everything else follows from that — transparent quotes, a planner who stays with
                your booking, and an itinerary that leaves room in the day for the thing you'll
                actually remember.
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
              <Link to="/packages" className="btn btn-orange">
                <Icon name="compass" size={16} /> See our packages
              </Link>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                <WhatsAppIcon size={16} /> Talk to us
              </a>
            </div>
          </div>

          <div className="im-story-imgs">
            <img src="https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=800&auto=format&fit=crop"
                 alt="" loading="lazy" style={{ ...IMG, gridRow: "span 2", height: "100%" }} />
            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop"
                 alt="" loading="lazy" style={IMG} />
            <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop"
                 alt="" loading="lazy" style={IMG} />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section-muted">
        <div className="shell">
          <SectionHeading
            eyebrow="How we work" eyebrowIcon="shield"
            title="Four things we don't compromise on"
            centered
          />
          <div className="im-values">
            {VALUES.map((v) => (
              <div key={v.title} className="card" style={{ padding: 24 }}>
                <span style={VAL_ICON}><Icon name={v.icon} size={20} /></span>
                <h3 style={{ fontSize: "1.02rem", fontWeight: 800, margin: "14px 0 8px" }}>{v.title}</h3>
                <p style={{ fontSize: ".88rem", lineHeight: 1.7, color: "var(--ink-muted)", margin: 0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="The short version" eyebrowIcon="clock" title="How we got here" centered />
          <div className="im-timeline">
            {MILESTONES.map((m, i) => (
              <div key={m.title} style={{ position: "relative", paddingTop: 30 }}>
                <span style={{ ...DOT, background: i === MILESTONES.length - 1 ? "var(--orange)" : "var(--navy)" }} />
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--orange-dark)", marginBottom: 6 }}>
                  {m.year}
                </div>
                <h3 style={{ fontSize: ".98rem", fontWeight: 800, margin: "0 0 7px" }}>{m.title}</h3>
                <p style={{ fontSize: ".86rem", lineHeight: 1.7, color: "var(--ink-muted)", margin: 0 }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section section-muted">
        <div className="shell">
          <SectionHeading eyebrow="What you get" eyebrowIcon="check" title="Every trip, as standard" centered />
          <div className="im-about-why">
            {whyUs.map((w) => (
              <div key={w.title} style={{ display: "flex", gap: 14 }}>
                <span style={VAL_ICON}><Icon name={w.icon} size={18} /></span>
                <div>
                  <h3 style={{ fontSize: ".94rem", fontWeight: 800, margin: "0 0 5px" }}>{w.title}</h3>
                  <p style={{ fontSize: ".85rem", lineHeight: 1.65, color: "var(--ink-muted)", margin: 0 }}>{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(120deg, var(--navy-900) 0%, var(--navy-700) 100%)", paddingBlock: 62 }}>
        <div className="shell" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.4rem, 1.1rem + 1.5vw, 2.05rem)", fontWeight: 800, margin: 0 }}>
            Got a rough idea? That's enough to start.
          </h2>
          <p style={{ color: "rgba(255,255,255,.8)", maxWidth: 540, margin: "14px auto 26px", lineHeight: 1.7 }}>
            Send us dates and a budget range. We'll tell you honestly what's realistic and what it costs.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-orange btn-lg"><Icon name="send" size={17} /> Get a free quote</Link>
            <a href={`tel:${BRAND.phone}`} className="btn btn-ghost btn-lg"><Icon name="phone" size={17} /> {BRAND.phoneDisplay}</a>
          </div>
        </div>
      </section>

      <style>{`
        .im-about-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .im-story { display: grid; grid-template-columns: 1fr 420px; gap: 44px; align-items: center; }
        .im-story-imgs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .im-values { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .im-timeline { display: grid; grid-template-columns: repeat(4, 1fr); gap: 26px; border-top: 2px solid var(--line); }
        .im-about-why { display: grid; grid-template-columns: repeat(2, 1fr); gap: 26px 34px; }
        @media (max-width: 1000px) {
          .im-story { grid-template-columns: 1fr; }
          .im-values, .im-timeline { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 620px) {
          .im-about-stats { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .im-values, .im-timeline, .im-about-why { grid-template-columns: 1fr; }
          .im-timeline { border-top: none; }
        }
      `}</style>
    </main>
  );
}

const IMG = { width: "100%", height: 190, objectFit: "cover", borderRadius: 14, boxShadow: "0 12px 30px rgba(56,11,22,.12)" };
const VAL_ICON = {
  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
  display: "flex", alignItems: "center", justifyContent: "center",
  background: "linear-gradient(135deg, rgba(222,178,88,.24), rgba(194,143,50,.14))",
  color: "var(--orange-dark)",
};
const DOT = {
  position: "absolute", top: -7, left: 0, width: 13, height: 13,
  borderRadius: "50%", border: "3px solid #fff", boxShadow: "0 0 0 1px var(--line)",
};
