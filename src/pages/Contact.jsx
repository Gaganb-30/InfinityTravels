// src/pages/Contact.jsx
import { useState } from "react";
import { api } from "../utils/api";
import Icon, { WhatsAppIcon } from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import SEO from "../components/ui/SEO";
import { BRAND } from "../utils/siteConfig";

const SUBJECTS = [
  "Plan a new trip",
  "Question about a package",
  "Existing booking",
  "Group or corporate travel",
  "Visa assistance",
  "Something else",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: SUBJECTS[0], message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setError("");
    try {
      const res = await api.submitContact(form);
      if (res?.error) setError(res.error);
      else {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" });
      }
    } catch {
      setError("Something went wrong sending that. Please try WhatsApp or give us a call.");
    } finally {
      setSubmitting(false);
    }
  };

  const waLink = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi ${BRAND.shortName}! I'd like to plan a trip.`)}`;

  return (
    <main>
      <SEO
        title="Contact Us & Get a Free Quote"
        description="Tell us your dates, budget and who's travelling. A real planner replies with a realistic itinerary and a firm price — usually the same day."
        path="/contact"
      />
      <PageHero
        eyebrow="Get in touch"
        title="Let's plan something good"
        sub="Tell us roughly what you have in mind — dates, budget, who's coming — and we'll come back with a realistic plan and a price."
        image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1800&auto=format&fit=crop"
        crumbs={[{ label: "Contact" }]}
      />

      {/* Quick contact strip */}
      <section style={{ background: "var(--surface-muted)", borderBottom: "1px solid var(--line)" }}>
        <div className="shell im-contact-strip">
          {[
            { icon: "phone", label: "Call us", value: BRAND.phoneDisplay, href: `tel:${BRAND.phone}` },
            { icon: "mail", label: "Email us", value: BRAND.email, href: `mailto:${BRAND.email}` },
            { icon: "pin", label: "Find us", value: BRAND.address },
            { icon: "clock", label: "Open", value: BRAND.hours },
          ].map((c) => (
            <div key={c.label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={STRIP_ICON}><Icon name={c.icon} size={17} /></span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                  {c.label}
                </div>
                {c.href ? (
                  <a href={c.href} style={{ color: "var(--navy)", fontWeight: 700, fontSize: ".88rem", textDecoration: "none", wordBreak: "break-word" }}>
                    {c.value}
                  </a>
                ) : (
                  <div style={{ color: "var(--navy)", fontWeight: 700, fontSize: ".88rem" }}>{c.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell im-contact-layout">
          {/* Form */}
          <div style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 18, padding: "clamp(22px, 3vw, 36px)", boxShadow: "0 14px 38px rgba(56,11,22,.07)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", paddingBlock: 40 }}>
                <span style={{ ...STRIP_ICON, width: 62, height: 62, margin: "0 auto 18px", background: "rgba(22,163,74,.12)", color: "#16a34a" }}>
                  <Icon name="check" size={30} strokeWidth={3} />
                </span>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: "0 0 8px" }}>Message received</h3>
                <p style={{ color: "var(--ink-muted)", margin: "0 0 24px", lineHeight: 1.7 }}>
                  One of our planners will get back to you shortly — usually within a few working hours.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h2 className="section-title" style={{ fontSize: "1.5rem" }}>Send us an enquiry</h2>

                <div style={{ display: "grid", gap: 16, marginTop: 26 }}>
                  <div className="im-form-row">
                    <div>
                      <label className="field-label" htmlFor="name">Your name *</label>
                      <input id="name" name="name" className="field" required
                             value={form.name} onChange={change} placeholder="Full name" />
                    </div>
                    <div>
                      <label className="field-label" htmlFor="phone">Phone / WhatsApp</label>
                      <input id="phone" name="phone" type="tel" className="field"
                             value={form.phone} onChange={change} placeholder="+91 …" />
                    </div>
                  </div>

                  <div>
                    <label className="field-label" htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" className="field" required
                           value={form.email} onChange={change} placeholder="you@example.com" />
                  </div>

                  <div>
                    <label className="field-label" htmlFor="subject">What's this about?</label>
                    <select id="subject" name="subject" className="field" value={form.subject} onChange={change}>
                      {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="field-label" htmlFor="message">Tell us more *</label>
                    <textarea id="message" name="message" className="field" required rows={6}
                              value={form.message} onChange={change}
                              placeholder="Where you'd like to go, rough dates, how many travelling, and any budget you have in mind."
                              style={{ resize: "vertical", minHeight: 130 }} />
                  </div>

                  {error && (
                    <div style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.25)", color: "#b91c1c", padding: "11px 14px", borderRadius: 10, fontSize: ".86rem" }}>
                      {error}
                    </div>
                  )}

                  <button type="submit" disabled={submitting} className="btn btn-orange btn-lg"
                          style={{ width: "100%", opacity: submitting ? .7 : 1 }}>
                    {submitting ? "Sending…" : <><Icon name="send" size={17} /> Send enquiry</>}
                  </button>

                  <p style={{ fontSize: 11.5, color: "var(--ink-faint)", textAlign: "center", margin: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <Icon name="lock" size={12} /> Your details go to our planning team only. No marketing lists.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Side */}
          <aside style={{ display: "grid", gap: 18, alignContent: "start" }}>
            <div style={{ ...SIDE, background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-700) 100%)", color: "#fff", border: "none" }}>
              <h3 style={{ color: "#fff", fontSize: "1.08rem", fontWeight: 800, margin: "0 0 8px" }}>
                Prefer to just chat?
              </h3>
              <p style={{ fontSize: ".87rem", lineHeight: 1.65, color: "rgba(255,255,255,.78)", margin: "0 0 18px" }}>
                WhatsApp is the fastest way to reach us. Send a message and a real planner picks it up.
              </p>
              <div style={{ display: "grid", gap: 9 }}>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ width: "100%" }}>
                  <WhatsAppIcon size={16} /> Message on WhatsApp
                </a>
                <a href={`tel:${BRAND.phone}`} className="btn btn-ghost" style={{ width: "100%" }}>
                  <Icon name="phone" size={15} /> {BRAND.phoneDisplay}
                </a>
              </div>
            </div>

            <div style={SIDE}>
              <h3 style={{ fontSize: "1.02rem", fontWeight: 800, margin: "0 0 14px" }}>What happens next</h3>
              <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 14 }}>
                {[
                  "We read your note and check availability for your dates.",
                  "You get a draft itinerary with hotels and a firm per-person price.",
                  "We adjust it as many times as you like — no charge until you're happy.",
                  "Confirm, and we handle bookings, transfers and paperwork.",
                ].map((step, i) => (
                  <li key={i} style={{ display: "flex", gap: 12 }}>
                    <span style={STEP_NUM}>{i + 1}</span>
                    <span style={{ fontSize: ".87rem", lineHeight: 1.6, color: "var(--ink-muted)" }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .im-contact-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 26px; padding-block: 24px; }
        .im-contact-layout { display: grid; grid-template-columns: 1fr 340px; gap: 34px; align-items: start; }
        .im-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 1000px) {
          .im-contact-layout { grid-template-columns: 1fr; }
          .im-contact-strip { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .im-contact-strip { grid-template-columns: 1fr; }
          .im-form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}

const STRIP_ICON = {
  width: 40, height: 40, borderRadius: 11, flexShrink: 0,
  display: "flex", alignItems: "center", justifyContent: "center",
  background: "rgba(194,143,50,.14)", color: "var(--orange-dark)",
};
const SIDE = {
  background: "#fff", border: "1px solid var(--line)", borderRadius: 16,
  padding: 22, boxShadow: "0 10px 28px rgba(56,11,22,.07)",
};
const STEP_NUM = {
  width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
  background: "var(--navy)", color: "#fff", fontSize: 12, fontWeight: 800,
  display: "flex", alignItems: "center", justifyContent: "center",
};
