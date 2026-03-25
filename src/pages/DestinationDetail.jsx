// src/pages/DestinationDetail.js
import React, { useState } from "react";

const DestinationDetail = () => {
  const [guests, setGuests] = useState(2);
  const [hotelStandard, setHotelStandard] = useState("5-Star Elite");

  const basePrice = 4850;
  const totalPrice = basePrice * guests + 150; // service fee $150

  const incrementGuests = () => setGuests((prev) => Math.min(prev + 1, 8));
  const decrementGuests = () => setGuests((prev) => Math.max(prev - 1, 1));

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-12">
      {/* Header Section */}
      <header className="mb-12">
        <nav className="flex items-center gap-2 mb-4 text-on-surface-variant text-sm font-label uppercase tracking-widest">
          <span>Europe</span>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span>Italy</span>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="text-primary font-semibold">Amalfi Coast</span>
        </nav>
        <h1 className="font-headline text-5xl md:text-6xl text-on-surface font-bold tracking-tight mb-4">
          The Amalfi Coast: A Curated Horizon
        </h1>
        <div className="flex items-center gap-6 text-on-surface-variant">
          <div className="flex items-center gap-1">
            <span
              className="material-symbols-outlined text-secondary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-semibold text-on-surface">4.9</span>
            <span className="text-sm">(124 Reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-sm font-medium">8 Days / 7 Nights</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">location_on</span>
            <span className="text-sm font-medium">
              Positano, Amalfi, Ravello
            </span>
          </div>
        </div>
      </header>

      {/* Gallery Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
        <div className="md:col-span-3 h-[500px] overflow-hidden rounded-xl bg-surface-container">
          <img
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            alt="Breathtaking wide view of Positano colorful houses on cliffside"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCh4g2x_nB5uyF5SzkCeWGnOhwQOuHwHWtnOdftn1snyU1Tw9bG_ykdfo_AwEKr4yo7O2p872AONY_HX_HP2oUoR2xsoo6V6_8wA62SVCV1N2QBBzBQNf6NNzfyjE0x9vWsgUV7K72X3g_yZmCDuuk3ilPvRpxr1xXMJTb0r1YGvDrR6J2Qzpzw3cla-iTn0PoJ47l2l3btjXIQJlK2fPGo57Qe-AlLx8-xN5fJtKlmSi057aNGiUpKtPXfA4RZYQUsxcmkzeVudP5"
          />
        </div>
        <div className="flex flex-col gap-4 h-[500px]">
          <div className="flex-1 overflow-hidden rounded-xl bg-surface-container">
            <img
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              alt="Classic Italian wooden boat on turquoise water"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXT3aZU5ML7k2d3eOpEIJI5mNG09PFONIjFxZzQuIz0nm5LWWMfrDo_j-EHDR7weQyG5lIFoEWEWtskGos6mbBfZtYXewVXM4acD6sNN5kENRdR1JSo5FvB453BLzo3OcXqCaUwjdiZo3RedT8Tcx8mSi_rNQ2W6wFCzffFZq8YnScepJGZr6zsFOJvym1w4jfsUNJW5gIA5djP_Bn0jWlV-LS5Cm80IrpqThCUoxYxyrp-lB9MS5xaHflT-Uroo6Y0mKbAbDsZ96L"
            />
          </div>
          <div className="flex-1 overflow-hidden rounded-xl bg-surface-container">
            <img
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              alt="Terrace overlook with lemon trees and sea view"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSP0w6aRchjavAFAO3QDjs4srq5jVmxtA__jmuTAT7v2-fZhQlUpFvqisQPBCgEIw3Uc8okQhFjemh7MIjb_eJMGXRQNcsIyEhaVNiqjaHE5B4iowWZHicAJvIfoutdvS4rblrvHauA5JK2yPFwCUMZBPmP-aIkf_H6iaZMeHMen2BXJt1lZZuAKMbWxbEkF5-lIziAHX8AQtSbmLeij8nR8wG4R0FFSUq-LaFfj0vIeTxlfN3vIYYe76TOva4z0OiGnhMnl2Jfsxq"
            />
          </div>
          <div className="relative flex-1 overflow-hidden rounded-xl bg-surface-container cursor-pointer group">
            <img
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              alt="Al fresco dining table with local Italian pasta"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJnHlJIo1NLva6qGeqrSyS7sBqzcuqriz6L_AuqXUB9ihkW_ZPBIJny3NlK2UVoMB4hiqh59NLnTvkEixT2CObrWdHWzrS5AL8T6yDnwHjd7BBbozJd69xV7428bFngFWGijv1rnWz6UF4muZ3w2P4PKMQgDv2HC2kVoRSvwmkyYwGwgwlhCBSnREMNJ7LHkTEMKQ42Xk8bZx8fjFD_xlqnSptPHGsbUH4iKaaLTfcl1adFwwmbXJOsB-ki2YqZ9ehn2nBebfzXFD4"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-on-surface/30">
              <span className="text-white font-label font-bold text-lg">
                +12 Photos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-16">
          {/* Tabs Navigation */}
          <div className="flex gap-10 border-b border-outline-variant/20 pb-4 overflow-x-auto no-scrollbar">
            <a
              href="#overview"
              className="text-primary font-semibold border-b-2 border-primary pb-4 whitespace-nowrap"
            >
              Overview
            </a>
            <a
              href="#itinerary"
              className="text-on-surface-variant hover:text-primary transition-colors pb-4 whitespace-nowrap"
            >
              Itinerary
            </a>
            <a
              href="#highlights"
              className="text-on-surface-variant hover:text-primary transition-colors pb-4 whitespace-nowrap"
            >
              Highlights
            </a>
            <a
              href="#inclusions"
              className="text-on-surface-variant hover:text-primary transition-colors pb-4 whitespace-nowrap"
            >
              What's Included
            </a>
            <a
              href="#reviews"
              className="text-on-surface-variant hover:text-primary transition-colors pb-4 whitespace-nowrap"
            >
              Reviews
            </a>
          </div>

          {/* Overview */}
          <section className="space-y-6" id="overview">
            <h2 className="font-headline text-3xl font-bold">
              The Amalfi Experience
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Surrender to the vertical charm of Italy's most celebrated
              coastline. This curated horizon journey takes you beyond the
              typical tourist path, blending the high-glamour of Positano with
              the secret terrace gardens of Ravello. Stay in restored
              12th-century monasteries and navigate the shimmering Tyrrhenian
              Sea on a private vintage gozzo boat.
            </p>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Every detail is choreographed for immersion—from sun-drenched
              lemon grove lunches to sunset aperitivos overlooking the
              Faraglioni rocks. This is not just travel; it is an editorial life
              experienced in real-time.
            </p>
          </section>

          {/* Highlights Bento */}
          <section className="space-y-8" id="highlights">
            <h2 className="font-headline text-3xl font-bold">
              Journey Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-low p-8 rounded-xl space-y-4">
                <span className="material-symbols-outlined text-secondary text-4xl">
                  hotel
                </span>
                <h3 className="font-headline text-xl font-bold">
                  Luxury Stays
                </h3>
                <p className="text-on-surface-variant">
                  Hand-picked iconic hotels with panoramic balconies and
                  Michelin-starred breakfast spreads.
                </p>
              </div>
              <div className="bg-surface-container-low p-8 rounded-xl space-y-4">
                <span className="material-symbols-outlined text-secondary text-4xl">
                  sailing
                </span>
                <h3 className="font-headline text-xl font-bold">
                  Private Boat Tours
                </h3>
                <p className="text-on-surface-variant">
                  A full-day exploration of the Capri grottos and hidden
                  swimming coves accessible only by water.
                </p>
              </div>
              <div className="bg-surface-container-low p-8 rounded-xl md:col-span-2 flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 overflow-hidden rounded-xl h-40">
                  <img
                    className="w-full h-full object-cover"
                    alt="Traditional Italian ceramic plates with fresh seafood"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRidDJ4FwqsoVY1bUfMUZjAfDXEt_e_sSqqOMor-t6DzDRg1ifPUFh26n3H4emAwYMGVP6YwZBn-IWenmhA-DGafFwdyPrtAMJrHHyR89M5WNvaHbNew0uRWuezc8yZhuTk59sxdKlGWs_hPY_p7Z6noYJNmBXP4ZaKuDU4XX9XqykjgTJ8KhCo3uHx4lbarGnVorwgL17K1LYmkpXppXB3u3FT9PIU8E5t1sm-f4Brm0SDi7wCNEnhKgWfdQFQBgCadvIu5ypJLKP"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <span className="material-symbols-outlined text-secondary text-4xl">
                    restaurant
                  </span>
                  <h3 className="font-headline text-xl font-bold">
                    Culinary Experiences
                  </h3>
                  <p className="text-on-surface-variant">
                    Private cooking class in a clifftop lemon grove followed by
                    a seven-course tasting menu paired with local Ravello wines.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Itinerary */}
          <section className="space-y-10" id="itinerary">
            <h2 className="font-headline text-3xl font-bold">Your Itinerary</h2>
            <div className="space-y-0">
              <div className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-secondary-container mt-2"></div>
                  <div className="w-0.5 h-full bg-surface-container-highest/50 my-2"></div>
                </div>
                <div className="pb-12">
                  <span className="font-label text-sm text-secondary font-bold tracking-widest uppercase">
                    Day 01
                  </span>
                  <h3 className="font-headline text-2xl font-bold mt-1 mb-3">
                    Welcome to the vertical city
                  </h3>
                  <p className="text-on-surface-variant">
                    Arrival in Naples and private chauffeur transfer to
                    Positano. Afternoon check-in at Le Sirenuse. Sunset
                    aperitivos on the terrace.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <span className="px-3 py-1 rounded-full bg-surface-bright border border-outline-variant/30 text-xs font-medium">
                      Transfer Included
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface-bright border border-outline-variant/30 text-xs font-medium">
                      Welcome Dinner
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-secondary-container mt-2"></div>
                  <div className="w-0.5 h-full bg-surface-container-highest/50 my-2"></div>
                </div>
                <div className="pb-12">
                  <span className="font-label text-sm text-secondary font-bold tracking-widest uppercase">
                    Day 02
                  </span>
                  <h3 className="font-headline text-2xl font-bold mt-1 mb-3">
                    Cobblestones & Caravaggios
                  </h3>
                  <p className="text-on-surface-variant">
                    Guided morning walk through the narrow boutiques of
                    Positano. Afternoon ferry to Amalfi Town to visit the
                    historic Duomo.
                  </p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-secondary-container mt-2"></div>
                  <div className="w-0.5 h-full bg-surface-container-highest/50 my-2"></div>
                </div>
                <div className="pb-12">
                  <span className="font-label text-sm text-secondary font-bold tracking-widest uppercase">
                    Day 03
                  </span>
                  <h3 className="font-headline text-2xl font-bold mt-1 mb-3">
                    Sailing the Azure
                  </h3>
                  <p className="text-on-surface-variant">
                    Private boat charter to Capri. Swimming at the Green Grotto
                    and a leisurely lunch at La Fontelina Beach Club.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Sticky Booking Sidebar */}
        <aside className="sticky top-32">
          <div className="bg-surface-container-lowest editorial-shadow rounded-xl p-8 space-y-8 border border-outline-variant/10">
            <div className="space-y-1">
              <span className="text-on-surface-variant text-sm font-label">
                Starting from
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-headline font-bold text-primary">
                  ${basePrice.toLocaleString()}
                </span>
                <span className="text-on-surface-variant">/ per person</span>
              </div>
            </div>
            <div className="space-y-6">
              {/* Travelers Selector */}
              <div className="space-y-3">
                <label className="font-label text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                  Travelers
                </label>
                <div className="flex items-center justify-between bg-surface-container-low p-4 rounded-lg">
                  <button
                    onClick={decrementGuests}
                    className="material-symbols-outlined cursor-pointer text-on-surface-variant hover:text-primary transition-colors"
                  >
                    remove_circle
                  </button>
                  <span className="font-bold text-lg">
                    {guests} Guest{guests !== 1 && "s"}
                  </span>
                  <button
                    onClick={incrementGuests}
                    className="material-symbols-outlined cursor-pointer text-primary hover:opacity-80 transition-colors"
                  >
                    add_circle
                  </button>
                </div>
              </div>
              {/* Hotel Toggle */}
              <div className="space-y-3">
                <label className="font-label text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                  Hotel Standard
                </label>
                <div className="flex p-1 bg-surface-container-low rounded-lg">
                  <button
                    onClick={() => setHotelStandard("3-Star")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      hotelStandard === "3-Star"
                        ? "bg-primary-container text-white shadow-md"
                        : "text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    3-Star
                  </button>
                  <button
                    onClick={() => setHotelStandard("5-Star Elite")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      hotelStandard === "5-Star Elite"
                        ? "bg-primary-container text-white shadow-md"
                        : "text-on-surface-variant hover:bg-surface-container"
                    }`}
                  >
                    5-Star Elite
                  </button>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-outline-variant/20 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">
                  ${basePrice.toLocaleString()} x {guests} Guest
                  {guests !== 1 && "s"}
                </span>
                <span className="font-medium">
                  ${(basePrice * guests).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Service Fee</span>
                <span className="font-medium">$150</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-xl">Total Estimate</span>
                <span className="font-headline font-bold text-2xl text-primary">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
            <button className="w-full py-5 bg-gradient-to-br from-primary-container to-primary text-white rounded-full font-bold text-lg shadow-lg hover:opacity-90 transition-all active:scale-[0.98]">
              Confirm Your Selection
            </button>
            <p className="text-center text-xs text-on-surface-variant font-medium">
              Free cancellation up to 30 days before departure.
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center gap-4 bg-secondary-fixed/30 p-6 rounded-xl">
            <span className="material-symbols-outlined text-secondary text-3xl">
              electric_bolt
            </span>
            <p className="text-center text-sm font-medium text-secondary-container">
              Only 3 slots remaining for the September window.
            </p>
          </div>
        </aside>
      </div>

      {/* Reviews Section */}
      <section
        className="mt-24 pt-16 border-t border-outline-variant/10"
        id="reviews"
      >
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold">
              Voices of the Horizon
            </h2>
            <p className="text-on-surface-variant">
              Authentic experiences from our global travelers.
            </p>
          </div>
          <button className="px-6 py-2 border border-primary text-primary rounded-full font-medium hover:bg-primary/5">
            Write a Review
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Review 1 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl space-y-4 editorial-shadow border border-outline-variant/5">
            <div className="flex gap-1 text-secondary">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <p className="italic text-on-surface-variant">
              "The attention to detail was unlike any other tour I've booked.
              The private boat day was the highlight of our entire Italian
              honeymoon."
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="User profile portrait"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmmKjcKxxBz5M2rrjHEd9kPL8QFsWVRRynojANesLLInfepGay4OHnDuu_Cj6Txj1RNNec3zRL20NiWgS7siw2q19Tbx5o2UuJWxZWaEYn5bavPR8WqULHWS9gfTUCEU4jb2OzxjU05Fr_Vg-BPwLN_iH_Ko7h8kLg3DxRZUTR2iXzM-RlMspVXPTN0s39nzSdduebQV7rdr1SwUDpTzPDlXjya19-zBfBDmhixV94zIqFBA9a2Kp7jjjQfpPTqr9OBz7vfDxie6X1"
                />
              </div>
              <div>
                <p className="font-bold text-sm">Elena Rodriguez</p>
                <p className="text-xs text-on-surface-variant">
                  Travelled Oct 2023
                </p>
              </div>
            </div>
          </div>
          {/* Review 2 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl space-y-4 editorial-shadow border border-outline-variant/5">
            <div className="flex gap-1 text-secondary">
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star_half
              </span>
            </div>
            <p className="italic text-on-surface-variant">
              "Infinity Miles truly understands luxury. Ravello was a dream. The
              only thing I'd change is staying two more days!"
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="User profile portrait"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcDbwWDImIIZ9sMJ9xpkbFZnEt0XnzwK00D2c-wg0y4PIg2KgI-vY3E6oWZEJz_FxvERpeQhfiyp52ULwpTVJBTp9pDHcjWrahnJ2uj_gpPlloyUPZUZld-gR7zvl1e6zrT_KHkRBAWOu901BCap1vM0KGWJQgVTASXNw47mHwAve_A4pdHrAmFxo_PBjK-Fl36tajU623kCId-bViYVo9G-HOskhMZHkYz3ZmzhAflssLn8nFZQiue8KTHwYIRvWIqvzXYcIgRGtj"
                />
              </div>
              <div>
                <p className="font-bold text-sm">Marcus Sterling</p>
                <p className="text-xs text-on-surface-variant">
                  Travelled Sep 2023
                </p>
              </div>
            </div>
          </div>
          {/* Review 3 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl space-y-4 editorial-shadow border border-outline-variant/5">
            <div className="flex gap-1 text-secondary">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <p className="italic text-on-surface-variant">
              "Exceeded expectations. The hotel selections were architectural
              masterpieces. Worth every single penny for the peace of mind."
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="User profile portrait"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8cRa0xnIINO_rz4t7IDYYZvdqUC5DQ-ZylUIDBS_JSkNARE9geP8TIh8Z2yXGAlsGd8-M3fRYEF3mjbkdu6rJHcL-26TEW_gnAQ7KtgoigCoagNXkJupeuw6tpLzubsYL9DNW3gVD4QZOHPTKGiASjmam4U79NrD1s6eEmhry40zKtMwcXMtGeOxbvBHfNYYcIxdXKzs_dt7d9IJ7IWaAPxNTF2Hw4OtIpSB81J36TS5PY5VPX0sVXjsuQEZjaiHIglOEmKH8BwMO"
                />
              </div>
              <div>
                <p className="font-bold text-sm">Sarah Jenkins</p>
                <p className="text-xs text-on-surface-variant">
                  Travelled July 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DestinationDetail;
