// src/pages/Packages.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import { formatPriceRange } from "../utils/whatsapp";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState(500000);
  const [selectedDurations, setSelectedDurations] = useState({
    "1-4": false,
    "5-10": false,
    "11+": false,
  });
  const [selectedTypes, setSelectedTypes] = useState({
    Coastal: false,
    Mountain: false,
    Urban: false,
    Desert: false,
    Forest: false,
    Cultural: false,
    Adventure: false,
  });

  const handleDurationChange = (duration) => {
    setSelectedDurations((prev) => ({ ...prev, [duration]: !prev[duration] }));
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const filters = {};
        filters.maxBudget = budget;

        // Find active duration filter
        const activeDuration = Object.entries(selectedDurations).find(([, v]) => v);
        if (activeDuration) filters.duration = activeDuration[0];

        // Find active type filter
        const activeType = Object.entries(selectedTypes).find(([, v]) => v);
        if (activeType) filters.type = activeType[0];

        const data = await api.getPackages(filters);
        setPackages(data);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [budget, selectedDurations, selectedTypes]);

  const durationLabels = {
    "1-4": "1-4 Days",
    "5-10": "5-10 Days",
    "11+": "11+ Days",
  };

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="mb-16">
        <span className="font-label text-secondary uppercase tracking-[0.2em] text-xs font-semibold mb-4 block">
          Curated Experiences
        </span>
        <h1 className="font-headline text-5xl md:text-6xl text-on-surface font-bold tracking-tight mb-6">
          Signature Travel <span className="italic font-normal">Packages</span>
        </h1>
        <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed">
          Discover our hand-picked journeys designed for the discerning
          traveler. From serene coastal escapes to vibrant cultural expeditions.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="sticky top-32 space-y-10">
            {/* Filter Group: Budget */}
            <div>
              <h3 className="font-headline text-xl mb-6 text-primary">Budget Range</h3>
              <div className="px-2">
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="5000"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-4 text-sm font-medium text-on-surface-variant">
                  <span>₹10,000</span>
                  <span>₹{budget.toLocaleString('en-IN')}</span>
                  <span>₹5,00,000+</span>
                </div>
              </div>
            </div>

            {/* Filter Group: Duration */}
            <div>
              <h3 className="font-headline text-xl mb-6 text-primary">Duration</h3>
              <div className="flex flex-col gap-3">
                {Object.keys(selectedDurations).map((duration) => (
                  <label key={duration} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedDurations[duration]}
                      onChange={() => handleDurationChange(duration)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary-container"
                    />
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors">
                      {durationLabels[duration]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: Destination Type */}
            <div>
              <h3 className="font-headline text-xl mb-6 text-primary">Destination Type</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(selectedTypes).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedTypes[type]
                        ? "border border-primary bg-primary text-on-primary"
                        : "border border-outline-variant bg-surface-bright hover:border-primary hover:text-primary"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Packages Grid */}
        <div className="flex-grow">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[600px] rounded-xl bg-surface-container-low animate-pulse" />
              ))}
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">inventory_2</span>
              <h3 className="font-headline text-2xl text-slate-400 mb-2">No packages found</h3>
              <p className="text-slate-400">Try adjusting your filters to see more options</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {packages.map((pkg) => (
                <div key={pkg._id} className="group bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow transition-transform duration-500 hover:-translate-y-2">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={pkg.image}
                    />
                    {pkg.badge && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary tracking-widest uppercase">
                        {pkg.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-headline text-2xl text-on-surface mb-1">{pkg.name}</h3>
                        <span className="font-label text-sm text-on-surface-variant tracking-wider">{pkg.location}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-primary font-bold text-lg">{formatPriceRange(pkg.priceRange)}</span>
                        <span className="text-xs text-outline font-medium">Per Person</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-8 text-on-surface-variant text-sm">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-lg">schedule</span>
                        {pkg.duration}
                      </div>
                      {pkg.highlights?.[0] && (
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-lg">{pkg.highlights[0].icon}</span>
                          {pkg.highlights[0].title}
                        </div>
                      )}
                    </div>
                    <Link
                      to={`/packages/${pkg.slug}`}
                      className="w-full py-4 rounded-xl bg-surface-container-high text-on-surface font-semibold hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2"
                    >
                      View Details
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Packages;
