// src/pages/HomePage.js
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { formatPriceRange } from "../utils/whatsapp";

const HomePage = () => {
  const [destinations, setDestinations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dests, pkgs, tests] = await Promise.all([
          api.getFeaturedDestinations(),
          api.getPopularPackages(),
          api.getTestimonials(3),
        ]);
        setDestinations(dests);
        setPackages(pkgs);
        setTestimonials(tests);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = async (value) => {
    setSearchQuery(value);
    if (value.length >= 2) {
      const results = await api.search(value);
      setSearchResults(results);
      setSearchOpen(true);
    } else {
      setSearchResults(null);
      setSearchOpen(false);
    }
  };

  return (
    <main className="pt-0">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Breathtaking mountain landscape with mist"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-white font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-8 drop-shadow-xl">
            Explore the World with Infinity Miles Holiday
          </h1>
          {/* Floating Search Bar */}
          <div ref={searchRef} className="relative">
            <div className="bg-white/90 backdrop-blur-xl p-2 rounded-full shadow-2xl max-w-2xl mx-auto flex items-center gap-2 border border-white/20">
              <div className="flex-1 px-6 py-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">search</span>
                <input
                  className="bg-transparent border-none p-0 focus:ring-0 text-on-surface placeholder:text-slate-400 w-full font-medium outline-none text-lg"
                  placeholder="Search destinations or packages..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && searchQuery && navigate(`/destinations?search=${searchQuery}`)}
                />
              </div>
              <button
                onClick={() => searchQuery && navigate(`/destinations?search=${searchQuery}`)}
                className="cta-gradient text-white p-4 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            {/* Search Dropdown */}
            {searchOpen && searchResults && (
              <div className="absolute top-full mt-2 left-0 right-0 max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 z-50 text-left">
                {searchResults.destinations?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Destinations</h4>
                    {searchResults.destinations.map((d) => (
                      <Link
                        key={d._id}
                        to={`/destinations/${d.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <img src={d.heroImage} alt={d.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-semibold text-on-surface">{d.name}</p>
                          <p className="text-sm text-slate-500">{d.country} · {d.tier}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults.packages?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Packages</h4>
                    {searchResults.packages.map((p) => (
                      <Link
                        key={p._id}
                        to={`/packages/${p.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-semibold text-on-surface">{p.name}</p>
                          <p className="text-sm text-slate-500">{p.location} · {formatPriceRange(p.priceRange)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
                {(!searchResults.destinations?.length && !searchResults.packages?.length) && (
                  <p className="text-slate-400 text-center py-4">No results found for "{searchQuery}"</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Destinations — Bento Puzzle Grid */}
      <section className="py-20 bg-white">
        <div className="px-8 max-w-7xl mx-auto mb-10 flex justify-between items-end">
          <div>
            <span className="label-md font-bold text-primary tracking-widest uppercase text-xs mb-2 block">
              The Collection
            </span>
            <h2 className="font-headline text-4xl font-extrabold text-on-surface">
              Featured Destinations
            </h2>
          </div>
          <Link to="/destinations" className="text-primary font-semibold hover:underline flex items-center gap-2">
            View All <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className="px-8 max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`rounded-2xl bg-slate-100 animate-pulse ${i === 0 ? 'md:col-span-2 md:row-span-2 h-[400px]' : 'h-[192px]'}`} />
              ))}
            </div>
          ) : (
            <div className="home-bento-grid" style={{ display: 'grid', gridAutoRows: '192px', gap: '12px' }}>
              {destinations.slice(0, 9).map((dest, idx) => {
                // Bento pattern: first card is large (2x2), rest are 1x1, with a couple being wider (2x1)
                const spanClass = idx === 0
                  ? { gridColumn: 'span 2', gridRow: 'span 2' }
                  : idx === 5 || idx === 7
                    ? { gridColumn: 'span 2', gridRow: 'span 1' }
                    : {};
                return (
                  <Link
                    to={`/destinations/${dest.slug}`}
                    key={dest._id}
                    className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md block"
                    style={{ ...spanClass, minHeight: 0 }}
                  >
                    <img
                      alt={dest.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={dest.heroImage}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                    <div className="absolute bottom-0 p-4">
                      <h3 className={`text-white font-headline font-bold leading-tight ${idx === 0 ? 'text-2xl mb-2' : 'text-sm mb-0.5'}`}>{dest.name}</h3>
                      <p className={`text-white/70 ${idx === 0 ? 'text-sm' : 'text-[10px]'}`}>{dest.country}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Popular Packages — Bento Puzzle Grid */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="label-md font-bold text-secondary tracking-widest uppercase text-xs mb-2 block">
            Curated Journeys
          </span>
          <h2 className="font-headline text-4xl font-extrabold text-on-surface">
            Popular Packages
          </h2>
        </div>
        <div className="home-bento-grid" style={{ display: 'grid', gridAutoRows: '180px', gap: '12px' }}>
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className={`rounded-2xl bg-slate-100 animate-pulse ${i === 0 ? '' : ''}`} style={i === 0 ? { gridColumn: 'span 2', gridRow: 'span 2' } : {}} />
            ))
          ) : (
            packages.slice(0, 9).map((pkg, idx) => {
              // Bento pattern: idx 0 = big (2x2), idx 3 = wide (2x1), rest normal
              const spanStyle = idx === 0
                ? { gridColumn: 'span 2', gridRow: 'span 2' }
                : idx === 3 || idx === 6
                  ? { gridColumn: 'span 2', gridRow: 'span 1' }
                  : {};
              const isBig = idx === 0;
              return (
                <Link
                  to={`/packages/${pkg.slug}`}
                  key={pkg._id}
                  className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md block"
                  style={{ ...spanStyle, textDecoration: 'none', color: 'inherit', minHeight: 0 }}
                >
                  <img
                    alt={pkg.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={pkg.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  {/* Duration badge */}
                  <div className={`absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full font-bold text-primary ${isBig ? 'px-3 py-1 text-xs' : 'px-2 py-0.5 text-[9px]'}`}>
                    {pkg.duration}
                  </div>
                  {/* Content overlay */}
                  <div className={`absolute bottom-0 left-0 right-0 ${isBig ? 'p-6' : 'p-3'}`}>
                    <h3 className={`text-white font-headline font-bold leading-tight ${isBig ? 'text-2xl mb-2' : 'text-sm mb-1'}`}>
                      {pkg.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className={`text-white/90 font-bold ${isBig ? 'text-lg' : 'text-xs'}`}>
                        {formatPriceRange(pkg.priceRange)}
                      </span>
                      {isBig && (
                        <span className="text-white/70 text-sm font-medium flex items-center gap-1">
                          View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-5 rounded-xl bg-surface-container-low transition-all hover:bg-surface-container-lowest hover:shadow-lg group">
            <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-2xl">hotel</span>
            </div>
            <h3 className="font-headline text-lg font-bold mb-1">Luxury Stays</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Handpicked boutique hotels and 5-star resorts tailored to your comfort.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-5 rounded-xl bg-surface-container-low transition-all hover:bg-surface-container-lowest hover:shadow-lg group">
            <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-secondary text-2xl">map</span>
            </div>
            <h3 className="font-headline text-lg font-bold mb-1">Curated Itineraries</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Unique experiences designed by locals and travel experts for authentic discovery.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-5 rounded-xl bg-surface-container-low transition-all hover:bg-surface-container-lowest hover:shadow-lg group" onClick={() => navigate('/contact')}>
            <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-tertiary text-2xl">support_agent</span>
            </div>
            <h3 className="font-headline text-lg font-bold mb-1">24/7 Support</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Peace of mind with a dedicated concierge available at any time, anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface-container-low overflow-hidden">
        <div className="px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <span className="label-md font-bold text-primary tracking-widest uppercase text-xs mb-2 block">
              Voices of Infinity
            </span>
            <h2 className="font-headline text-4xl font-extrabold text-on-surface mb-8">
              Authentic stories from our travelers
            </h2>
            {testimonials.length > 0 && (
              <div className="bg-white p-10 rounded-2xl editorial-shadow relative">
                <span className="material-symbols-outlined text-secondary/20 text-8xl absolute top-4 right-8">
                  format_quote
                </span>
                <p className="text-xl italic font-headline text-on-surface-variant leading-loose mb-8 relative z-10">
                  "{testimonials[0].quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    alt={testimonials[0].name}
                    className="w-16 h-16 rounded-full object-cover"
                    src={testimonials[0].avatar}
                  />
                  <div>
                    <h4 className="font-bold text-on-surface">{testimonials[0].name}</h4>
                    <p className="text-sm text-slate-500">{testimonials[0].location}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img className="rounded-2xl h-64 w-full object-cover" alt="Tuscan landscape" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnM80F7IVRXt0kROm2JTsj9g6IPz8BLtNmb-x621jvR3aNEKsKj5rNfU7zBD7g2b5Onh_YlW4N1HRLOBDNPpFAhTZi4WkzmUuULSSE89AwfSzMygCKzHw91YrW2eZAg82cvwA_wzt7Ewu9dYjc8Ymjc6TGHLQgXeZhaRtxTXE9ZL6mxmpwI-9jqnc0I3J2OnOnBHxYxAnff6cPMe8z_U52neH7vu8Ay5SBkRrVOkEsuqmu4_4c0vVM9ubi7eJcouJnnE8xw_MR-mJB" />
              <img className="rounded-2xl h-48 w-full object-cover" alt="Luxury resort" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9lJaZN3Ev56ZLJTStGfb5AMkhnSA4NEFdKDqrZxbH9yPaQXh2GhfSXjZOpeV7RsMZ4Kgx0ofTF2eZwsrt9xAP3DVNRz_DKK_T3oaPMxBXgwIkfteUTuZ7qD123gn0OEMGnIL3Nos4g_t64Ja_v3kIV8TVmKXBe5otG2MrBU9Wktm6NVfpPo3F8fkCSJwVObfqM1OsbVOtsAvMvMrLMbRL7A94_V-cAwjKcDCxCwmXPzjGqv5NzD8qag76R4I6GeuECf3jmjxvwoSJ" />
            </div>
            <div className="pt-8 space-y-4">
              <img className="rounded-2xl h-48 w-full object-cover" alt="Tea ceremony" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDISU6lJwFt3ggY7k_8H91ll0JdmgWKYefy0csvojSO2CF1MIyMT8eeoL4FwWNwJjsN5TvtFBGH6AUpvbGba2iSBep9H5sxvo9FlHpdff6B15s9tT1b0STdWXN5aMktDrZVbQm7jmZzGaJq2Xi1K84TJ1tWDJKb1pj5CKcluonNSWXVYkdzqwzoWotjbceZzC2AJnSOV0Bgk_67Dc0ybOl4jas6vNPrkMU_bMUr0vYjWAqQOSuOlSzAOxLe_Ez0af31pJWtsAqe6Fku" />
              <img className="rounded-2xl h-64 w-full object-cover" alt="Dubai skyline" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD83hi7VRPw1oot6fg-QZxfJ_OfkuOD7wUjhvuIXUxe_EWRxnKlbtgd72-lBkkaXZfinEussmuFSSuex6gGsSocMLs3d6XvTiMHGehbEXyeYxlTZQc6i_rt027YYTwz07saFGn6w8hSzhIBlNcFwG8kT04-9HE0mvtGRaXzm0VHCYjkgOSs-0IVN5ow-YXa2Sp6eP_F5MZ9TKQlnJG9wZ79AVN-SV1z1BdZ9Vwds5R0GD_ut4926g8B0cphK7U23rJNG6ggUHAqzJAa" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      {/* <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[500px] flex items-center justify-center text-center p-8 shadow-2xl">
          <img
            alt="Newsletter Background"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrvoxh0MxPnPiDgE5B52XG-Pie4-XbuwjKoWXmuFrmdMYxtCQ2pIIRL1u7RG4UadeTMdY02j_eHF-gYLpwuSKYibs8RvEfDdMkQoq6blKET3fqaU32Y0_5GUdrrWOtaQeKsMzG_rBu6zJpOKg5m293kCzo2sybyS-28JtjsZFxKF9ow8BKmSI1eu2maTMki6g1KaDZRxz88mLWp4ssvJ_Xh7fYsWXxLs-pZP4w267S9IlodkwZ5Lr8h_j3E3w4A7vcyggJI43WLV4K"
          />
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6">
              Join the Infinity Circle
            </h2>
            <p className="text-white/90 text-lg mb-10 leading-relaxed">
              Subscribe to receive exclusive travel guides, early access to boutique packages, and curated wanderlust inspiration directly to your inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                className="flex-1 px-8 py-4 rounded-full border-none focus:ring-2 focus:ring-secondary text-on-surface bg-white/95 outline-none"
                placeholder="Your email address"
                type="email"
              />
              <button className="cta-gradient text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95">
                Subscribe Now
              </button>
            </div>
            <p className="text-white/70 text-xs mt-6">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default HomePage;
