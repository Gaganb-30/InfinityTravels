// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const isDestinationsActive = location.pathname.startsWith("/destinations");

  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav shadow-sm">
      <div className="flex justify-between items-center px-8 py-4 max-w-full mx-auto">
        <Link
          to="/"
          className="text-2xl font-bold font-headline text-sky-900 tracking-tight"
        >
          Infinity Miles Travel
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 font-label text-lg tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors duration-300 pb-1 ${
                isActive(link.path)
                  ? "text-sky-700 font-semibold border-b-2 border-sky-700"
                  : "text-slate-600 hover:text-sky-500"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Destinations Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setDestDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1 transition-colors duration-300 pb-1 cursor-pointer ${
                isDestinationsActive
                  ? "text-sky-700 font-semibold border-b-2 border-sky-700"
                  : "text-slate-600 hover:text-sky-500"
              }`}
            >
              Destinations
              <span
                className={`material-symbols-outlined text-sm transition-transform duration-200 ${
                  destDropdownOpen ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>

            {/* Dropdown Panel */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 origin-top ${
                destDropdownOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="p-2">
                <Link
                  to="/destinations?category=Domestic"
                  onClick={() => setDestDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors group"
                >
                  <span className="material-symbols-outlined text-sky-600 group-hover:scale-110 transition-transform">
                    flag
                  </span>
                  <div>
                    <span className="font-semibold text-slate-800 text-sm block">
                      Domestic
                    </span>
                    <span className="text-xs text-slate-400">
                      Explore India
                    </span>
                  </div>
                </Link>
                <Link
                  to="/destinations?category=International"
                  onClick={() => setDestDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors group"
                >
                  <span className="material-symbols-outlined text-sky-600 group-hover:scale-110 transition-transform">
                    public
                  </span>
                  <div>
                    <span className="font-semibold text-slate-800 text-sm block">
                      International
                    </span>
                    <span className="text-xs text-slate-400">
                      Go Global
                    </span>
                  </div>
                </Link>
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <Link
                    to="/destinations"
                    onClick={() => setDestDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-sky-50 transition-colors group"
                  >
                    <span className="material-symbols-outlined text-sky-600 group-hover:scale-110 transition-transform">
                      travel_explore
                    </span>
                    <div>
                      <span className="font-semibold text-slate-800 text-sm block">
                        All Destinations
                      </span>
                      <span className="text-xs text-slate-400">
                        Browse everything
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button className="material-symbols-outlined text-slate-600 hover:text-sky-500 transition-colors">
            search
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden material-symbols-outlined text-slate-600"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? "close" : "menu"}
          </button>

          <Link
            to="/contact"
            className="hidden md:block cta-gradient text-white px-6 py-2.5 rounded-full font-medium transition-transform active:scale-95 shadow-md hover:shadow-lg"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 px-8 py-4 space-y-3">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Home</Link>
          <Link to="/destinations?category=Domestic" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">🇮🇳 Domestic Destinations</Link>
          <Link to="/destinations?category=International" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">🌍 International Destinations</Link>
          <Link to="/packages" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Packages</Link>
          <Link to="/about-us" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">About Us</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sky-700 font-semibold">Contact / Book Now</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
