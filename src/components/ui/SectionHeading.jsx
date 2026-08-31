// src/components/ui/SectionHeading.jsx
import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function SectionHeading({ eyebrow, eyebrowIcon, title, sub, viewAll, viewAllLabel = "View All", centered = false }) {
  return (
    <div
      style={{
        display: "flex", flexWrap: "wrap",
        alignItems: centered ? "center" : "flex-end",
        justifyContent: centered ? "center" : "space-between",
        gap: 20, marginBottom: 28,
        textAlign: centered ? "center" : "left",
        flexDirection: centered ? "column" : undefined,
      }}
    >
      <div style={{ maxWidth: centered ? 720 : 660 }}>
        {eyebrow && (
          <span className="eyebrow" style={{ marginBottom: 10 }}>
            {eyebrowIcon && <Icon name={eyebrowIcon} size={13} />}
            {eyebrow}
          </span>
        )}
        <h2 className={`section-title${centered ? " is-centered" : ""}`}>{title}</h2>
        {sub && <p className="section-sub" style={centered ? { marginInline: "auto" } : undefined}>{sub}</p>}
      </div>
      {viewAll && (
        <Link to={viewAll} className="link-more">
          {viewAllLabel} <Icon name="arrowRight" size={16} />
        </Link>
      )}
    </div>
  );
}
