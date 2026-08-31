// src/components/FloatingButtons.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon, { WhatsAppIcon } from "./ui/Icon";
import { BRAND } from "../utils/siteConfig";

export default function FloatingButtons() {
  const [top, setTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waLink = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    `Hi ${BRAND.shortName}! I'm interested in your holiday packages.`
  )}`;

  return (
    <>
      {/* WhatsApp — bottom left */}
      <a
        href={waLink} target="_blank" rel="noopener noreferrer"
        aria-label="Chat on WhatsApp" className="pulse-ring"
        style={{ ...B.fab, left: 20, bottom: 24, background: "var(--wa-green)", color: "#fff" }}
      >
        <WhatsAppIcon size={27} />
      </a>

      {/* Call / enquiry stack — bottom right */}
      <div style={B.stack}>
        {top && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            style={{ ...B.mini, background: "#fff", color: "var(--navy)", border: "1px solid var(--line)" }}
          >
            <Icon name="chevronDown" size={18} style={{ transform: "rotate(180deg)" }} />
          </button>
        )}
        <a href={`tel:${BRAND.phone}`} aria-label="Call us"
           style={{ ...B.mini, background: "var(--navy)", color: "#fff" }}>
          <Icon name="phone" size={18} />
        </a>
        <Link to="/contact" aria-label="Get a quote"
              style={{ ...B.mini, background: "linear-gradient(135deg, var(--orange-light), var(--orange))", color: "var(--navy-900)" }}>
          <Icon name="send" size={18} />
        </Link>
      </div>
    </>
  );
}

const B = {
  fab: {
    position: "fixed", zIndex: 45,
    width: 54, height: 54, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 8px 24px rgba(0,0,0,.22)", textDecoration: "none",
  },
  stack: {
    position: "fixed", right: 20, bottom: 24, zIndex: 45,
    display: "flex", flexDirection: "column", gap: 10,
  },
  mini: {
    width: 46, height: 46, borderRadius: "50%", border: "none", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 6px 18px rgba(15,45,94,.22)", textDecoration: "none",
  },
};
