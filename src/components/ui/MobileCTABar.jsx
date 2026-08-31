// src/components/ui/MobileCTABar.jsx — fixed bottom action bar on small screens
import { Link, useLocation } from "react-router-dom";
import Icon, { WhatsAppIcon } from "./Icon";
import { BRAND } from "../../utils/siteConfig";

export default function MobileCTABar() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return null;

  const waLink = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    `Hi ${BRAND.shortName}! I'd like a holiday quote.`
  )}`;

  return (
    <>
      <div className="im-mobile-cta">
        <a href={`tel:${BRAND.phone}`} style={ITEM}>
          <Icon name="phone" size={17} /> Call
        </a>
        <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ ...ITEM, color: "var(--wa-green-dark)" }}>
          <WhatsAppIcon size={17} /> WhatsApp
        </a>
        <Link to="/contact" style={{ ...ITEM, background: "linear-gradient(135deg, var(--orange-light), var(--orange))", color: "var(--navy-900)", borderRadius: 9, margin: 5 }}>
          <Icon name="send" size={16} /> Get Quote
        </Link>
      </div>

      <style>{`
        .im-mobile-cta { display: none; }
        @media (max-width: 720px) {
          .im-mobile-cta {
            display: grid !important;
            grid-template-columns: 1fr 1fr 1.2fr;
            position: fixed; left: 0; right: 0; bottom: 0; z-index: 46;
            background: #fff; border-top: 1px solid var(--line);
            box-shadow: 0 -4px 20px rgba(15,45,94,.12);
            padding-bottom: env(safe-area-inset-bottom, 0);
          }
          body { padding-bottom: 58px; }
        }
      `}</style>
    </>
  );
}

const ITEM = {
  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
  padding: "14px 8px", fontSize: ".82rem", fontWeight: 800,
  color: "var(--navy)", textDecoration: "none",
};
