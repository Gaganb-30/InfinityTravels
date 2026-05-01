// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const isDestinationsActive = location.pathname.startsWith("/destinations");

  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDestDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDestOpen(false);
  }, [location.pathname, location.search]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setDestDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDestDropdownOpen(false), 200);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "About Us", path: "/about-us" },
  ];

  const renderDesktopLink = (link) => (
    <Link
      key={link.path}
      to={link.path}
      style={{
        ...desktopLinkStyle,
        ...(isActive(link.path) ? activeLinkStyle : {}),
      }}
      onMouseEnter={(e) => {
        if (!isActive(link.path)) {
          e.target.style.color = "#D4782F";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive(link.path)) {
          e.target.style.color = "#475569";
        }
      }}
    >
      {link.name}
    </Link>
  );

  return (
    <>
      <nav style={navStyle}>
        <div style={navInnerStyle}>
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/logo3.png"
              alt="Infinity Miles Logo"
              style={{ height: "60px", width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div style={desktopNavStyle}>
            {navLinks.map((link) => renderDesktopLink(link))}

            {/* Destinations Dropdown */}
            <div
              ref={dropdownRef}
              style={{ position: "relative" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setDestDropdownOpen((prev) => !prev)}
                style={{
                  ...desktopLinkStyle,
                  ...buttonResetStyle,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500",
                  gap: "4px",
                  cursor: "pointer",
                  ...(isDestinationsActive ? activeLinkStyle : {}),
                }}
                onMouseEnter={(e) => {
                  if (!isDestinationsActive) {
                    e.currentTarget.style.color = "#D4782F";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isDestinationsActive) {
                    e.currentTarget.style.color = "#475569";
                  }
                }}
              >
                Destinations
              </button>

              {/* Dropdown Panel */}
              <div
                style={{
                  ...dropdownPanelStyle,
                  opacity: destDropdownOpen ? 1 : 0,
                  transform: destDropdownOpen ? "scale(1)" : "scale(0.95)",
                  pointerEvents: destDropdownOpen ? "auto" : "none",
                }}
              >
                <div style={{ padding: "8px" }}>
                  <Link
                    to="/destinations?category=Domestic"
                    onClick={() => setDestDropdownOpen(false)}
                    style={dropdownItemStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FFF7ED")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span className="material-symbols-outlined" style={{ color: "#1B5E96", transition: "transform 0.2s" }}>
                      flag
                    </span>
                    <div>
                      <span style={{ fontWeight: 600, color: "#1e293b", fontSize: "14px", display: "block" }}>
                        Domestic
                      </span>
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                        Explore India
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/destinations?category=International"
                    onClick={() => setDestDropdownOpen(false)}
                    style={dropdownItemStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FFF7ED")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span className="material-symbols-outlined" style={{ color: "#1B5E96", transition: "transform 0.2s" }}>
                      public
                    </span>
                    <div>
                      <span style={{ fontWeight: 600, color: "#1e293b", fontSize: "14px", display: "block" }}>
                        International
                      </span>
                      <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                        Go Global
                      </span>
                    </div>
                  </Link>
                  <div style={{ borderTop: "1px solid #f1f5f9", marginTop: "4px", paddingTop: "4px" }}>
                    <Link
                      to="/destinations"
                      onClick={() => setDestDropdownOpen(false)}
                      style={dropdownItemStyle}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#FFF7ED")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <span className="material-symbols-outlined" style={{ color: "#D4782F", transition: "transform 0.2s" }}>
                        travel_explore
                      </span>
                      <div>
                        <span style={{ fontWeight: 600, color: "#1e293b", fontSize: "14px", display: "block" }}>
                          All Destinations
                        </span>
                        <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                          Browse everything
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Us — after Destinations */}
            {renderDesktopLink({ name: "Contact Us", path: "/contact" })}
          </div>

          {/* Right side: Book Now (desktop) + Hamburger (mobile) */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Book Now CTA - desktop only */}
            <Link
              to="/contact"
              className="cta-gradient-warm"
              style={bookNowStyle}
            >
              Book Now
            </Link>

            {/* Hamburger - mobile only */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              style={hamburgerStyle}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        style={{
          ...mobileOverlayStyle,
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
        }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        style={{
          ...mobilePanelStyle,
          transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div style={{ padding: "80px 24px 24px" }}>
          {/* Close button at the top of mobile panel */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={mobileCloseStyle}
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>
              close
            </span>
          </button>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                ...mobileLinkStyle,
                ...(isActive("/") ? mobileActiveLinkStyle : {}),
              }}
            >
              <span className="material-symbols-outlined" style={mobileIconStyle}>home</span>
              Home
            </Link>

            {/* Mobile Destinations Accordion */}
            <div>
              <button
                onClick={() => setMobileDestOpen((prev) => !prev)}
                style={{
                  ...mobileLinkStyle,
                  ...buttonResetStyle,
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  ...(isDestinationsActive ? mobileActiveLinkStyle : {}),
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span className="material-symbols-outlined" style={mobileIconStyle}>explore</span>
                  Destinations
                </div>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "20px",
                    transition: "transform 0.3s",
                    transform: mobileDestOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  expand_more
                </span>
              </button>

              <div
                style={{
                  maxHeight: mobileDestOpen ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                <div style={{ paddingLeft: "44px", paddingTop: "4px", display: "flex", flexDirection: "column", gap: "2px" }}>
                  <Link
                    to="/destinations?category=Domestic"
                    onClick={() => setMobileMenuOpen(false)}
                    style={mobileSubLinkStyle}
                  >
                    🇮🇳 Domestic
                  </Link>
                  <Link
                    to="/destinations?category=International"
                    onClick={() => setMobileMenuOpen(false)}
                    style={mobileSubLinkStyle}
                  >
                    🌍 International
                  </Link>
                  <Link
                    to="/destinations"
                    onClick={() => setMobileMenuOpen(false)}
                    style={mobileSubLinkStyle}
                  >
                    📍 All Destinations
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/packages"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                ...mobileLinkStyle,
                ...(isActive("/packages") ? mobileActiveLinkStyle : {}),
              }}
            >
              <span className="material-symbols-outlined" style={mobileIconStyle}>luggage</span>
              Packages
            </Link>

            <Link
              to="/about-us"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                ...mobileLinkStyle,
                ...(isActive("/about-us") ? mobileActiveLinkStyle : {}),
              }}
            >
              <span className="material-symbols-outlined" style={mobileIconStyle}>info</span>
              About Us
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                ...mobileLinkStyle,
                ...(isActive("/contact") ? mobileActiveLinkStyle : {}),
              }}
            >
              <span className="material-symbols-outlined" style={mobileIconStyle}>mail</span>
              Contact Us
            </Link>
          </div>

          {/* Mobile Book Now CTA */}
          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e2e8f0" }}>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="cta-gradient-warm"
              style={mobileBookNowStyle}
            >
              Book Now
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Inject responsive CSS overrides for breakpoints */}
      <style>{responsiveCSS}</style>
    </>
  );
};

/* ── Inline Styles ─────────────────────────────────────────────── */

const navStyle = {
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 50,
  background: "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const navInnerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 32px",
  maxWidth: "100%",
  margin: "0 auto",
};

const desktopNavStyle = {
  display: "none", // hidden by default (mobile-first), shown via CSS media query
  alignItems: "center",
  gap: "32px",
  fontFamily: "'Inter', sans-serif",
  fontSize: "16px",
  letterSpacing: "-0.01em",
};

const desktopLinkStyle = {
  transition: "color 0.3s",
  paddingBottom: "4px",
  color: "#475569",
  textDecoration: "none",
  fontWeight: 500,
};

const activeLinkStyle = {
  fontWeight: 600,
  color: "#1B5E96",
  borderBottom: "2px solid #1B5E96",
};

const buttonResetStyle = {
  background: "none",
  border: "none",
  padding: 0,
  font: "inherit",
};

const dropdownPanelStyle = {
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  marginTop: "12px",
  width: "224px",
  background: "rgba(255,255,255,0.97)",
  backdropFilter: "blur(20px)",
  borderRadius: "16px",
  boxShadow: "0 20px 60px -12px rgba(0,0,0,0.15)",
  border: "1px solid #f1f5f9",
  overflow: "hidden",
  transition: "all 0.3s",
  transformOrigin: "top center",
};

const dropdownItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 16px",
  borderRadius: "12px",
  transition: "background 0.2s",
  textDecoration: "none",
  color: "inherit",
};

const bookNowStyle = {
  display: "none", // hidden by default (mobile-first), shown via CSS
  alignItems: "center",
  color: "white",
  padding: "10px 24px",
  borderRadius: "999px",
  fontWeight: 500,
  textDecoration: "none",
  boxShadow: "0 4px 12px rgba(212, 120, 47, 0.3)",
  transition: "transform 0.2s, box-shadow 0.2s",
  fontSize: "15px",
};

const hamburgerStyle = {
  display: "flex", // shown by default (mobile-first), hidden via CSS
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#475569",
  padding: "4px",
  borderRadius: "8px",
  transition: "background 0.2s",
};

const mobileOverlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.3)",
  zIndex: 40,
  transition: "opacity 0.3s",
};

const mobilePanelStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "min(320px, 85vw)",
  background: "rgba(255,255,255,0.98)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  zIndex: 55,
  transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
  overflowY: "auto",
  boxShadow: "-8px 0 30px rgba(0,0,0,0.1)",
};

const mobileCloseStyle = {
  position: "absolute",
  top: "20px",
  right: "20px",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#475569",
  padding: "4px",
  borderRadius: "8px",
};

const mobileLinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "14px 16px",
  borderRadius: "12px",
  color: "#334155",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "16px",
  transition: "background 0.2s",
};

const mobileActiveLinkStyle = {
  background: "rgba(27, 94, 150, 0.08)",
  color: "#1B5E96",
  fontWeight: 600,
};

const mobileIconStyle = {
  fontSize: "22px",
  color: "#1B5E96",
};

const mobileSubLinkStyle = {
  display: "block",
  padding: "10px 16px",
  borderRadius: "8px",
  color: "#475569",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: 500,
  transition: "background 0.2s, color 0.2s",
};

const mobileBookNowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  color: "white",
  padding: "14px 24px",
  borderRadius: "14px",
  fontWeight: 600,
  textDecoration: "none",
  fontSize: "16px",
  width: "100%",
  boxShadow: "0 4px 12px rgba(212, 120, 47, 0.3)",
};

/* ── Responsive CSS injected via <style> tag ─────────────────── */
const responsiveCSS = `
  /* Desktop: show nav links + book now, hide hamburger */
  @media (min-width: 768px) {
    /* Target desktop nav container */
    nav > div > div:nth-child(2) {
      display: flex !important;
    }
    /* Target Book Now CTA link */
    a[href="/contact"].cta-gradient-warm {
      display: inline-flex !important;
    }
    /* Hide hamburger */
    button[aria-label="Toggle menu"] {
      display: none !important;
    }
  }

  /* Mobile: hide desktop nav + book now, show hamburger */
  @media (max-width: 767px) {
    nav > div > div:nth-child(2) {
      display: none !important;
    }
    a[href="/contact"].cta-gradient-warm {
      display: none !important;
    }
    button[aria-label="Toggle menu"] {
      display: flex !important;
    }
  }
`;

export default Navbar;
