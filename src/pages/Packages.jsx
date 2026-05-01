// src/pages/Packages.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import { formatPriceRange } from "../utils/whatsapp";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState(500000);
  const [selectedDuration, setSelectedDuration] = useState(null); // single selection: "1-4", "5-10", "11+" or null
  const [selectedTypes, setSelectedTypes] = useState({});
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const allTypes = [
    "Coastal", "Mountain", "Urban", "Desert", "Forest",
    "Cultural", "Adventure", "Island", "Heritage", "Nature",
  ];

  // Initialize selectedTypes from allTypes
  useEffect(() => {
    const initial = {};
    allTypes.forEach((t) => (initial[t] = false));
    setSelectedTypes(initial);
  }, []);

  const handleDurationChange = (duration) => {
    // Radio-style: toggle off if already selected, otherwise set
    setSelectedDuration((prev) => (prev === duration ? null : duration));
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const clearAllFilters = () => {
    setBudget(500000);
    setSelectedDuration(null);
    setSelectedTypes((prev) => {
      const cleared = {};
      Object.keys(prev).forEach((k) => (cleared[k] = false));
      return cleared;
    });
  };

  const activeFilterCount =
    (budget < 500000 ? 1 : 0) +
    (selectedDuration ? 1 : 0) +
    Object.values(selectedTypes).filter(Boolean).length;

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const filters = {};
        if (budget < 500000) filters.maxBudget = budget;

        if (selectedDuration) filters.duration = selectedDuration;

        const activeTypes = Object.entries(selectedTypes)
          .filter(([, v]) => v)
          .map(([k]) => k);
        if (activeTypes.length === 1) filters.type = activeTypes[0];

        const data = await api.getPackages(filters);
        setPackages(data);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [budget, selectedDuration, selectedTypes]);

  const durationOptions = [
    { key: "1-4", label: "1–4 Days", icon: "bolt" },
    { key: "5-10", label: "5–10 Days", icon: "calendar_month" },
    { key: "11+", label: "11+ Days", icon: "flight_takeoff" },
  ];

  // Budget slider percentage for gradient fill
  const sliderPercent = ((budget - 10000) / (500000 - 10000)) * 100;

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileFilterOpen]);

  /* ── Filter Sidebar Content (shared between desktop & mobile) ── */
  const filterContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Header with clear */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1B5E96", margin: 0 }}>
          Filters
          {activeFilterCount > 0 && (
            <span style={filterBadgeStyle}>{activeFilterCount}</span>
          )}
        </h2>
        {activeFilterCount > 0 && (
          <button onClick={clearAllFilters} style={clearBtnStyle}>
            Clear All
          </button>
        )}
      </div>

      {/* Budget Range */}
      <div>
        <h3 style={filterHeadingStyle}>
          <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#1B5E96" }}>payments</span>
          Budget Range
        </h3>
        <div style={{ padding: "0 4px" }}>
          <div style={{ position: "relative", height: "36px", display: "flex", alignItems: "center" }}>
            {/* Track background */}
            <div style={sliderTrackStyle} />
            {/* Track fill */}
            <div style={{ ...sliderFillStyle, width: `${sliderPercent}%` }} />
            {/* Native range input */}
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              style={sliderInputStyle}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
            <span style={sliderLabelStyle}>₹10,000</span>
            <span style={{
              ...sliderLabelStyle,
              fontWeight: 700,
              color: "#1B5E96",
              fontSize: "15px",
              background: "rgba(27, 94, 150, 0.08)",
              padding: "2px 10px",
              borderRadius: "8px",
            }}>
              ₹{budget.toLocaleString("en-IN")}
            </span>
            <span style={sliderLabelStyle}>₹5L+</span>
          </div>
        </div>
      </div>

      {/* Duration */}
      <div>
        <h3 style={filterHeadingStyle}>
          <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#1B5E96" }}>schedule</span>
          Duration
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {durationOptions.map((opt) => {
            const isSelected = selectedDuration === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => handleDurationChange(opt.key)}
                style={{
                  ...durationBtnStyle,
                  ...(isSelected ? durationBtnActiveStyle : {}),
                }}
              >
                <span className="material-symbols-outlined" style={{
                  fontSize: "20px",
                  color: isSelected ? "#fff" : "#1B5E96",
                }}>
                  {opt.icon}
                </span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Destination Type Tags */}
      <div>
        <h3 style={filterHeadingStyle}>
          <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#1B5E96" }}>landscape</span>
          Destination Type
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {allTypes.map((type) => {
            const isSelected = selectedTypes[type];
            return (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                style={{
                  ...tagBtnStyle,
                  ...(isSelected ? tagBtnActiveStyle : {}),
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <main style={{ paddingTop: "128px", paddingBottom: "96px", maxWidth: "1280px", margin: "0 auto" }} className="px-6 md:px-12">
      {/* Header Section */}
      <header style={{ marginBottom: "48px" }}>
        <span style={{ color: "#D4782F", textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "12px", fontWeight: 600, marginBottom: "16px", display: "block" }}>
          Curated Experiences
        </span>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em", marginBottom: "16px", lineHeight: 1.1 }}>
          Signature Travel <span style={{ fontStyle: "italic", fontWeight: 400 }}>Packages</span>
        </h1>
        <p style={{ maxWidth: "640px", color: "#64748b", fontSize: "18px", lineHeight: 1.7 }}>
          Discover our hand-picked journeys designed for the discerning
          traveler. From serene coastal escapes to vibrant cultural expeditions.
        </p>
      </header>

      {/* Mobile filter toggle */}
      <button
        onClick={() => setMobileFilterOpen(true)}
        style={mobileFilterToggleStyle}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>tune</span>
        Filters
        {activeFilterCount > 0 && (
          <span style={{ ...filterBadgeStyle, marginLeft: "4px" }}>{activeFilterCount}</span>
        )}
      </button>

      <div style={{ display: "flex", gap: "48px" }}>
        {/* Packages Grid — LEFT */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ height: "520px", borderRadius: "16px", background: "#f1f5f9" }} className="animate-pulse" />
              ))}
            </div>
          ) : packages.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "64px", color: "#cbd5e1", display: "block", marginBottom: "16px" }}>inventory_2</span>
              <h3 style={{ fontSize: "24px", color: "#94a3b8", marginBottom: "8px" }}>No packages found</h3>
              <p style={{ color: "#94a3b8" }}>Try adjusting your filters to see more options</p>
              <button onClick={clearAllFilters} style={{ ...clearBtnStyle, marginTop: "16px", fontSize: "15px" }}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg._id}
                  style={packageCardStyle}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 60px -12px rgba(0,0,0,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px -4px rgba(0,0,0,0.06)"; }}
                >
                  <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
                    <img
                      alt={pkg.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s" }}
                      src={pkg.image}
                      onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                      onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                    />
                    {pkg.badge && (
                      <div style={badgeStyle}>
                        {pkg.badge}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div>
                        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>{pkg.name}</h3>
                        <span style={{ fontSize: "13px", color: "#64748b", letterSpacing: "0.05em" }}>{pkg.location}</span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ display: "block", color: "#1B5E96", fontWeight: 700, fontSize: "18px" }}>{formatPriceRange(pkg.priceRange)}</span>
                        <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>Per Person</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", color: "#64748b", fontSize: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>schedule</span>
                        {pkg.duration}
                      </div>
                      {pkg.highlights?.[0] && (
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{pkg.highlights[0].icon}</span>
                          {pkg.highlights[0].title}
                        </div>
                      )}
                    </div>
                    <Link
                      to={`/packages/${pkg.slug}`}
                      style={viewDetailsBtnStyle}
                      onMouseEnter={(e) => { e.target.style.background = "#1B5E96"; e.target.style.color = "#fff"; }}
                      onMouseLeave={(e) => { e.target.style.background = "#f1f5f9"; e.target.style.color = "#0f172a"; }}
                    >
                      View Details
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Sidebar Filters — RIGHT */}
        <aside style={desktopSidebarStyle}>
          <div style={stickyFilterStyle}>
            {filterContent}
          </div>
        </aside>
      </div>

      {/* Mobile Filter Overlay */}
      <div
        style={{
          ...mobileOverlayBgStyle,
          opacity: mobileFilterOpen ? 1 : 0,
          pointerEvents: mobileFilterOpen ? "auto" : "none",
        }}
        onClick={() => setMobileFilterOpen(false)}
      />

      {/* Mobile Filter Panel */}
      <div
        style={{
          ...mobileFilterPanelStyle,
          transform: mobileFilterOpen ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Filters</h2>
          <button
            onClick={() => setMobileFilterOpen(false)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "24px", color: "#475569" }}>close</span>
          </button>
        </div>
        <div style={{ padding: "20px", overflowY: "auto", maxHeight: "calc(85vh - 60px)" }}>
          {filterContent}
        </div>
      </div>

      {/* Slider thumb custom styles */}
      <style>{sliderCSS}</style>
    </main>
  );
};

/* ── Styles ─────────────────────────────────────────────────────── */

const filterBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "8px",
  width: "22px",
  height: "22px",
  borderRadius: "50%",
  background: "#D4782F",
  color: "#fff",
  fontSize: "12px",
  fontWeight: 700,
};

const clearBtnStyle = {
  background: "none",
  border: "none",
  color: "#D4782F",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  padding: "4px 8px",
  borderRadius: "6px",
  transition: "background 0.2s",
};

const filterHeadingStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "15px",
  fontWeight: 600,
  color: "#334155",
  marginBottom: "16px",
  margin: "0 0 16px 0",
};

/* Slider styles */
const sliderTrackStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  height: "6px",
  borderRadius: "3px",
  background: "#e2e8f0",
};

const sliderFillStyle = {
  position: "absolute",
  left: 0,
  height: "6px",
  borderRadius: "3px",
  background: "linear-gradient(90deg, #1B5E96, #D4782F)",
};

const sliderInputStyle = {
  position: "relative",
  width: "100%",
  height: "6px",
  background: "transparent",
  WebkitAppearance: "none",
  MozAppearance: "none",
  appearance: "none",
  cursor: "pointer",
  zIndex: 2,
  margin: 0,
};

const sliderLabelStyle = {
  fontSize: "13px",
  color: "#64748b",
  fontWeight: 500,
};

/* Duration buttons */
const durationBtnStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1.5px solid #e2e8f0",
  background: "#fff",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
  color: "#334155",
  transition: "all 0.2s",
  textAlign: "left",
};

const durationBtnActiveStyle = {
  background: "linear-gradient(135deg, #1B5E96, #154A78)",
  borderColor: "#1B5E96",
  color: "#fff",
  boxShadow: "0 4px 12px rgba(27, 94, 150, 0.3)",
};

/* Tag buttons */
const tagBtnStyle = {
  padding: "8px 16px",
  borderRadius: "999px",
  border: "1.5px solid #e2e8f0",
  background: "#fff",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: 500,
  color: "#475569",
  transition: "all 0.2s",
};

const tagBtnActiveStyle = {
  background: "linear-gradient(135deg, #1B5E96, #154A78)",
  borderColor: "#1B5E96",
  color: "#fff",
  boxShadow: "0 4px 12px rgba(27, 94, 150, 0.25)",
};

/* Package card */
const packageCardStyle = {
  background: "#fff",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 24px -4px rgba(0,0,0,0.06)",
  transition: "transform 0.5s, box-shadow 0.5s",
};

const badgeStyle = {
  position: "absolute",
  top: "16px",
  right: "16px",
  background: "rgba(255,255,255,0.92)",
  backdropFilter: "blur(8px)",
  padding: "4px 14px",
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: 700,
  color: "#1B5E96",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const viewDetailsBtnStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  background: "#f1f5f9",
  color: "#0f172a",
  fontWeight: 600,
  fontSize: "14px",
  textDecoration: "none",
  transition: "all 0.3s",
  border: "none",
  cursor: "pointer",
};

/* Desktop sidebar */
const desktopSidebarStyle = {
  width: "300px",
  flexShrink: 0,
  display: "var(--desktop-filter-display, none)", // controlled by CSS
};

const stickyFilterStyle = {
  position: "sticky",
  top: "120px",
  background: "#fff",
  borderRadius: "20px",
  padding: "28px",
  boxShadow: "0 4px 24px -4px rgba(0,0,0,0.06)",
  border: "1px solid #f1f5f9",
};

/* Mobile filter */
const mobileFilterToggleStyle = {
  display: "var(--mobile-filter-display, flex)", // controlled by CSS
  alignItems: "center",
  gap: "8px",
  padding: "10px 20px",
  borderRadius: "12px",
  border: "1.5px solid #e2e8f0",
  background: "#fff",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 600,
  color: "#334155",
  marginBottom: "24px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
};

const mobileOverlayBgStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  zIndex: 60,
  transition: "opacity 0.3s",
};

const mobileFilterPanelStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  maxHeight: "85vh",
  background: "#fff",
  borderRadius: "20px 20px 0 0",
  zIndex: 65,
  transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 -8px 30px rgba(0,0,0,0.1)",
};

/* CSS for slider thumb + responsive layout */
const sliderCSS = `
  /* Slider thumb */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1B5E96, #154A78);
    border: 3px solid #fff;
    box-shadow: 0 2px 8px rgba(27, 94, 150, 0.4);
    cursor: pointer;
    transition: transform 0.2s;
  }
  input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }
  input[type="range"]::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1B5E96, #154A78);
    border: 3px solid #fff;
    box-shadow: 0 2px 8px rgba(27, 94, 150, 0.4);
    cursor: pointer;
  }
  input[type="range"]::-moz-range-track {
    background: transparent;
    height: 6px;
  }

  /* Responsive: show desktop sidebar, hide mobile toggle on lg+ */
  @media (min-width: 1024px) {
    aside {
      --desktop-filter-display: block !important;
      display: block !important;
    }
    button[style*="--mobile-filter-display"] {
      display: none !important;
    }
  }
  @media (max-width: 1023px) {
    aside {
      display: none !important;
    }
  }
`;

export default Packages;
