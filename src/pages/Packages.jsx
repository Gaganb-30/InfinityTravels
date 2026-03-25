// src/pages/Packages.js
import React, { useState } from "react";

const Packages = () => {
  // State for filter interactions (optional, but we'll set up for future)
  const [budget, setBudget] = useState(5000);
  const [selectedDurations, setSelectedDurations] = useState({
    "1-4 Days": false,
    "5-10 Days": false,
    "11+ Days": true,
  });
  const [selectedTypes, setSelectedTypes] = useState({
    Coastal: false,
    Mountain: true,
    Urban: false,
    Desert: false,
    Forest: false,
  });

  const handleDurationChange = (duration) => {
    setSelectedDurations((prev) => ({ ...prev, [duration]: !prev[duration] }));
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => ({ ...prev, [type]: !prev[type] }));
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
              <h3 className="font-headline text-xl mb-6 text-primary">
                Budget Range
              </h3>
              <div className="px-2">
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-4 text-sm font-medium text-on-surface-variant">
                  <span>$500</span>
                  <span>${budget}</span>
                  <span>$10,000+</span>
                </div>
              </div>
            </div>

            {/* Filter Group: Duration */}
            <div>
              <h3 className="font-headline text-xl mb-6 text-primary">
                Duration
              </h3>
              <div className="flex flex-col gap-3">
                {Object.keys(selectedDurations).map((duration) => (
                  <label
                    key={duration}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDurations[duration]}
                      onChange={() => handleDurationChange(duration)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary-container"
                    />
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors">
                      {duration}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: Destination Type */}
            <div>
              <h3 className="font-headline text-xl mb-6 text-primary">
                Destination Type
              </h3>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Amalfi Coast */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow transition-transform duration-500 hover:-translate-y-2">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  alt="Aerial view of a tropical turquoise beach lagoon"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5_nFiPFgg7uq1YpENSaveTpDPCTwOtYsC8wAhrS1cqCYGWuNzvsbo4m2piPD5QFiZcFaNPx16Sd-gMQq83kMlnEt5AaP_6knEQN9haPtbGM-3yrimZTMw8Po9lCPQXHd2BCs0a2ue-SFbwK_F01xBPpTszF2trrBfJ7ofMoLOickkK-8JyO40SkFs17bVrvbV1AcPQ_3KLw8aAPltet5VIQHcaF4FgwzjuunySZlgi1iVz2nA-swykz_6BIqBmE2fz0_FTLDMLOs1"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary tracking-widest uppercase">
                  Best Seller
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-headline text-2xl text-on-surface mb-1">
                      Amalfi Coast Serenity
                    </h3>
                    <span className="font-label text-sm text-on-surface-variant tracking-wider">
                      Italy, Europe
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-primary font-bold text-xl">
                      $2,450
                    </span>
                    <span className="text-xs text-outline font-medium">
                      Starting Price
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-8 text-on-surface-variant text-sm">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">
                      schedule
                    </span>
                    8D/7N
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">
                      hotel
                    </span>
                    5-Star Stay
                  </div>
                </div>
                <button className="w-full py-4 rounded-xl bg-surface-container-high text-on-surface font-semibold hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2">
                  View Details
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* Card 2: Maldives */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow transition-transform duration-500 hover:-translate-y-2">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  alt="Luxury overwater bungalow in the Maldives at sunset"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1LbVlKYjedrexvv4vFLE_YRFVhf22_e_7GES-iFS2oliAm1-vxo86vr0aDs_2334rw0QnygORt9R-pjkT0ETejS5oUoVx-SdX0lqjrxvye4A8zJ2BS_TpOXkb7T-AlgegN4tOJz2ZbSE3YVxJJ6TM-wvJjbg8tnNpmq7gq5UY8CM193a_5gJcI-VnJzf75MKtkxgdsLQ-U66vGg_wPbOjcvFnx12zAVDTR6AQeSjQu4vNSe7rnx-dSUnczYFOKmwXjAsA_a5QKq4P"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-headline text-2xl text-on-surface mb-1">
                      Maldivean Echoes
                    </h3>
                    <span className="font-label text-sm text-on-surface-variant tracking-wider">
                      Maldives, Indian Ocean
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-primary font-bold text-xl">
                      $4,200
                    </span>
                    <span className="text-xs text-outline font-medium">
                      Starting Price
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-8 text-on-surface-variant text-sm">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">
                      schedule
                    </span>
                    10D/9N
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">
                      sailing
                    </span>
                    Private Yacht
                  </div>
                </div>
                <button className="w-full py-4 rounded-xl bg-surface-container-high text-on-surface font-semibold hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2">
                  View Details
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* Card 3: Kyoto */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow transition-transform duration-500 hover:-translate-y-2">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  alt="Traditional Japanese Zen garden with autumn leaves"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHXBeHe4FJ6en28QVtjl52tU6d7r2I5YMBxwLPiCthycqSkI4nJBshj-vBDzpuYZPJJMGAEH3NNzL9bfkjCh2xdHJhEtWvqtp5INFexsoVSDoMmBQRHUP2I8wAX4RFVdcMIcLYyaAomIabsTGx8b_4WHRkIIz8epxh1pffFgYLZr8BBbJs7xZSFjS9giDG2CSxxP8yrPfJhJc3dNGGDWTD8W8KW58_bt2svwXyftzfKNLKy19kfzCsKWMoZCa2Bd5EubFZbvG5f6_B"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-headline text-2xl text-on-surface mb-1">
                      Kyoto Traditions
                    </h3>
                    <span className="font-label text-sm text-on-surface-variant tracking-wider">
                      Kyoto, Japan
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-primary font-bold text-xl">
                      $3,150
                    </span>
                    <span className="text-xs text-outline font-medium">
                      Starting Price
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-8 text-on-surface-variant text-sm">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">
                      schedule
                    </span>
                    6D/5N
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">
                      restaurant
                    </span>
                    Culinary Tour
                  </div>
                </div>
                <button className="w-full py-4 rounded-xl bg-surface-container-high text-on-surface font-semibold hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2">
                  View Details
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* Card 4: Pacific Coast Trail */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow transition-transform duration-500 hover:-translate-y-2">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  alt="Golden Gate Bridge shrouded in soft morning fog"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhQKeAaOwLL4QET6WPo7YZ8jF0e2VsSzyLal3aM8Yin8dYJrJcHJ_H1uOa05mzSX_otZ8bjZ3Rv5Cpb1kv3iE8YKXoUudRc7m30Fj2E66ynWtX6IgXDMOblfHQuM903t3dn_8MalFDuu-GuZ4WYci8XsXdaeFNIjbxYdefMS0CWUZSBdX5hy5YqzdZ0E3iKaZIzbjD32QYoYOrUaG_mDcnMlBkcjVS1fTPX_KpcjqFPbklDPgHVIYW0vPbMgMPJHpSEzUXqb3pSm8P"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-headline text-2xl text-on-surface mb-1">
                      Pacific Coast Trail
                    </h3>
                    <span className="font-label text-sm text-on-surface-variant tracking-wider">
                      California, USA
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-primary font-bold text-xl">
                      $1,890
                    </span>
                    <span className="text-xs text-outline font-medium">
                      Starting Price
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-8 text-on-surface-variant text-sm">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">
                      schedule
                    </span>
                    5D/4N
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-lg">
                      directions_car
                    </span>
                    Luxury Rental
                  </div>
                </div>
                <button className="w-full py-4 rounded-xl bg-surface-container-high text-on-surface font-semibold hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2">
                  View Details
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Pagination/Load More */}
          <div className="mt-16 flex justify-center">
            <button className="px-12 py-4 rounded-full border border-primary text-primary font-bold hover:bg-primary hover:text-on-primary transition-all active:scale-95">
              Discover More Packages
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Packages;
