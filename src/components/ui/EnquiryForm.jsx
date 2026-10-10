// src/components/ui/EnquiryForm.jsx — Luxytrix-style glassmorphism enquiry card
import { useState } from "react";
import Icon, { WhatsAppIcon } from "./Icon";
import { BRAND, quickDestinations, travellerOptions } from "../../utils/siteConfig";

export default function EnquiryForm() {
  const [form, setForm] = useState({
    name: "", phone: "", destination: "", date: "", travellers: "2 People",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const lines = [
      `Trip enquiry — ${BRAND.shortName}`,
      "",
      `Name: ${form.name || "—"}`,
      `Phone: ${form.phone || "—"}`,
      `Destination: ${form.destination || "Not decided yet"}`,
      `Travel date: ${form.date || "Flexible"}`,
      `Travellers: ${form.travellers}`,
      "",
      "Please share suitable options and pricing.",
    ];
    window.open(
      `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank", "noopener"
    );
  };

  return (
    <form onSubmit={submit} style={E.card}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <div style={E.quickTag}>
          <Icon name="bolt" size={11} /> Quick Enquiry
        </div>
        <h3 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 900, margin: "10px 0 4px", letterSpacing: "-0.02em" }}>
          Plan Your Dream Trip
        </h3>
        <p style={{ color: "rgba(255,255,255,.72)", fontSize: ".78rem", margin: 0 }}>
          Free quote · Expert reply in 30 min
        </p>
      </div>

      {/* Fields */}
      <div style={{ display: "grid", gap: 10 }}>
        <input
          className="field-glass" placeholder="Your Full Name"
          value={form.name} onChange={set("name")} required
        />
        <input
          className="field-glass" type="tel" placeholder="Phone / WhatsApp number"
          value={form.phone} onChange={set("phone")} required
        />
        <select className="field-glass" value={form.destination} onChange={set("destination")}>
          <option value="">Select destination</option>
          {quickDestinations.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <input className="field-glass" type="date" value={form.date} onChange={set("date")} />
          <select className="field-glass" value={form.travellers} onChange={set("travellers")}>
            {travellerOptions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-orange" style={{ width: "100%", marginTop: 4, padding: "13px 20px" }}>
          <WhatsAppIcon size={17} /> Get My Free Quote
        </button>
      </div>

      <p style={{ textAlign: "center", color: "rgba(255,255,255,.55)", fontSize: 11, margin: "12px 0 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
        <Icon name="lock" size={11} /> No spam. Your details stay private.
      </p>
    </form>
  );
}

const E = {
  card: {
    width: "100%", maxWidth: 380, padding: 24, borderRadius: 20,
    background: "rgba(255,255,255,.15)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,.25)",
    boxShadow: "0 24px 60px rgba(0,0,0,.35)",
  },
  quickTag: {
    display: "inline-flex", alignItems: "center", gap: 5,
    background: "rgba(194,143,50,.25)", color: "var(--orange-light)",
    fontSize: 11.5, fontWeight: 800, padding: "4px 12px", borderRadius: 999,
    border: "1px solid rgba(194,143,50,.35)",
  },
};
