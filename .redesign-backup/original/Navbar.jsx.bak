// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const isDestinationsActive = location.pathname.startsWith("/destinations");
  const isHomePage = location.pathname === "/";

  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Track scroll position for transparent navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll(); // check initial position
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  ];

  // Navbar is always white, so always use dark text
  const linkColor = "#475569";
  const activeLinkDynamic = { fontWeight: 600, color: "#1B5E96", borderBottom: "2px solid #1B5E96" };

  const renderDesktopLink = (link) => (
    <Link
      key={link.path}
      to={link.path}
      style={{
        ...desktopLinkStyle,
        color: linkColor,
        ...(isActive(link.path) ? activeLinkDynamic : {}),
      }}
      onMouseEnter={(e) => {
        if (!isActive(link.path)) {
          e.target.style.color = "#D4782F";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive(link.path)) {
          e.target.style.color = linkColor;
        }
      }}
    >
      {link.name}
    </Link>
  );

  return (
    <>
      {/* Top Info Strip */}
      <div style={topStripStyle}>
        <div style={topStripInnerStyle}>
          {/* Left: Social Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a href="https://www.instagram.com/infinitymilesholiday" target="_blank" rel="noopener noreferrer" style={topStripLinkStyle} aria-label="Instagram">
              <svg style={{ width: '14px', height: '14px', fill: 'currentColor' }} viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href={`https://wa.me/917291099670`} target="_blank" rel="noopener noreferrer" style={topStripLinkStyle} aria-label="WhatsApp">
              <svg style={{ width: '14px', height: '14px', fill: 'currentColor' }} viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </a>
          </div>
          {/* Right: Phone Number */}
          <a href="tel:+917291099670" style={topStripLinkStyle}>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>call</span>
            +91 72910 99670
          </a>
        </div>
      </div>

      <nav style={{
        ...navStyle,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.06)" : "0 1px 2px rgba(0,0,0,0.03)",
      }}>
        <div style={navInnerStyle}>
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://i.postimg.cc/DypvTyC7/logo3.png"
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
                onClick={() => { clearTimeout(timeoutRef.current); setDestDropdownOpen((prev) => !prev); }}
                style={{
                  ...desktopLinkStyle,
                  ...buttonResetStyle,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500",
                  gap: "4px",
                  cursor: "pointer",
                  color: linkColor,
                  ...(isDestinationsActive ? activeLinkDynamic : {}),
                }}
                onMouseEnter={(e) => {
                  if (!isDestinationsActive) {
                    e.currentTarget.style.color = "#D4782F";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isDestinationsActive) {
                    e.currentTarget.style.color = linkColor;
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

            {/* About Us — commented out */}
            {/* {renderDesktopLink({ name: "About Us", path: "/about-us" })} */}

            {/* Contact Us */}
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
              <span className="material-symbols-outlined" style={{ fontSize: "28px", color: "#475569" }}>
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

            {/* About Us — commented out */}
            {/* <Link
              to="/about-us"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                ...mobileLinkStyle,
                ...(isActive("/about-us") ? mobileActiveLinkStyle : {}),
              }}
            >
              <span className="material-symbols-outlined" style={mobileIconStyle}>info</span>
              About Us
            </Link> */}

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

const TOP_STRIP_HEIGHT = 32;

const topStripStyle = {
  position: 'fixed',
  top: 0,
  width: '100%',
  height: `${TOP_STRIP_HEIGHT}px`,
  zIndex: 51,
  background: '#1B5E96',
  color: '#ffffff',
  fontSize: '13px',
  fontFamily: "'Inter', sans-serif",
};

const topStripInnerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  padding: '0 32px',
  maxWidth: '100%',
  margin: '0 auto',
};

const topStripLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  color: 'rgba(255,255,255,0.9)',
  textDecoration: 'none',
  transition: 'color 0.2s',
};

const navStyle = {
  position: "fixed",
  top: `${TOP_STRIP_HEIGHT}px`,
  width: "100%",
  zIndex: 50,
  transition: "background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease",
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
