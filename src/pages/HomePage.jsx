// src/pages/HomePage.js
const HomePage = () => {
  return (
    <main className="pt-0">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Breathtaking mountain landscape with mist"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN0bl2w6UanVhpueRMK6iMr1IBW_Yeq2aQ2-EBatc9bvWf355qkKqRb8uHak6-U3-ClraHaNgBGWPSYx1qmtu_KoMCoPbyqDEVtjR3ITCm9XEp4fjbKGgxY53PwsEriTIijnb9ZSDYt7tqinwuHcptj-m9HgJJNpbzezDeE07XHoHoVZkx5UvnJkyloiAEuot1o2kVQnSfQRn6RjKZ-ZJ99jXwWhabJjDhM2neFD23046AOsHbIsweOXED8Qoxe2QlrHS0v3-eaFEy"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-white font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-8 drop-shadow-xl">
            Explore the World with Infinity Miles Travel
          </h1>
          {/* Floating Search Bar */}
          <div className="bg-white/90 backdrop-blur-xl p-2 rounded-2xl md:rounded-full shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-2 border border-white/20">
            <div className="flex-1 w-full px-6 py-3 flex flex-col items-start border-r-0 md:border-r border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                Destination
              </span>
              <input
                className="bg-transparent border-none p-0 focus:ring-0 text-on-surface placeholder:text-slate-400 w-full font-medium"
                placeholder="Where to?"
                type="text"
              />
            </div>
            <div className="flex-1 w-full px-6 py-3 flex flex-col items-start border-r-0 md:border-r border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                Date Range
              </span>
              <input
                className="bg-transparent border-none p-0 focus:ring-0 text-on-surface placeholder:text-slate-400 w-full font-medium"
                placeholder="Add dates"
                type="text"
              />
            </div>
            <div className="flex-1 w-full px-6 py-3 flex flex-col items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                Travelers
              </span>
              <input
                className="bg-transparent border-none p-0 focus:ring-0 text-on-surface placeholder:text-slate-400 w-full font-medium"
                placeholder="Add guests"
                type="text"
              />
            </div>
            <button className="w-full md:w-auto cta-gradient text-white p-4 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-surface-container-low transition-all hover:bg-surface-container-lowest hover:shadow-xl group">
            <div className="w-16 h-16 rounded-2xl bg-primary-container/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-3xl">
                hotel
              </span>
            </div>
            <h3 className="font-headline text-xl font-bold mb-3">
              Luxury Stays
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              Handpicked boutique hotels and 5-star resorts tailored to your
              comfort.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-surface-container-low transition-all hover:bg-surface-container-lowest hover:shadow-xl group">
            <div className="w-16 h-16 rounded-2xl bg-secondary-container/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-secondary text-3xl">
                map
              </span>
            </div>
            <h3 className="font-headline text-xl font-bold mb-3">
              Curated Itineraries
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              Unique experiences designed by locals and travel experts for
              authentic discovery.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-surface-container-low transition-all hover:bg-surface-container-lowest hover:shadow-xl group">
            <div className="w-16 h-16 rounded-2xl bg-tertiary-container/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-tertiary text-3xl">
                support_agent
              </span>
            </div>
            <h3 className="font-headline text-xl font-bold mb-3">
              24/7 Support
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              Peace of mind with a dedicated concierge available at any time,
              anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Destinations (Grid) */}
      <section className="py-24 bg-surface-bright">
        <div className="px-8 max-w-7xl mx-auto mb-12 flex justify-between items-end">
          <div>
            <span className="label-md font-bold text-primary tracking-widest uppercase text-xs mb-2 block">
              The Collection
            </span>
            <h2 className="font-headline text-4xl font-extrabold text-on-surface">
              Featured Destinations
            </h2>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-primary hover:text-white hover:border-primary transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:bg-primary hover:text-white hover:border-primary transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kyoto */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
            <img
              alt="Kyoto Temple"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNclNECedoflhi0cSxAK6iHlR7hRNLu-FP9Ds_Yo4LWCG5G3dy-XdbgfPsiPwmUJ9-MLn2ryHQv-nFMBRHMZcua6P0K3qVSO8hMhJyqOb9LivFh88WiJm0GO0novTC_QAvasT7k-L7wHuVvY-DQePmzJQZDNkgCTwACGRrPGgD6ZcOWhGoFrRUflw56-ktIXWdwGeJi4JpuPf4kKECa0UGB5bDNfcinhONm45HXpIjTBekK7aA_4Lb5y7pCRGojJtfgg-e11V53d1r"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 p-8">
              <h3 className="text-white font-headline text-3xl font-bold mb-2">
                Kyoto
              </h3>
              <p className="text-white/80 text-sm mb-4">Japan</p>
              <button className="text-white font-semibold flex items-center gap-2 group/btn">
                Explore{" "}
                <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
          {/* Amalfi */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
            <img
              alt="Amalfi Coast"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgU2JZLkDHJxrrhKi9py-SiyrOo27ZtVGYXzR0JYUopr1E3Ibpv3_qvlpYkUNdLstKmH2IXqhRuuAhW9ZjaHHy0g-34t4H_pup4Iq5F6CNTEiWFcc5vV7HUn3H7kNOgXbgrR59yu2uxBzLxD3SPXZzut2M2nGscaAKMUh-1DNZDEtyD3m12hauvZbVouA236xoMs4k2ItQykHouC7TYPPKh01MSI80ZxSnZle2ch1smW041LBFAd9-RTmn3tCXvsvupBK1rzJXTKeI"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 p-8">
              <h3 className="text-white font-headline text-3xl font-bold mb-2">
                Amalfi Coast
              </h3>
              <p className="text-white/80 text-sm mb-4">Italy</p>
              <button className="text-white font-semibold flex items-center gap-2 group/btn">
                Explore{" "}
                <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
          {/* London */}
          <div className="relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
            <img
              alt="London City"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWS1kF1W3NmmdC0E1TJZH7mz3wZQN4pazlT5zjr0Q_JLl9SgL9xqgbhHru2lyLke453Xiqythv7j1hMDnvXszY4DCT2DwDUCT9N6TxBCNzRV6TGo33fmAPRAfl_F7hKsD-4VQmDtrxdkNPMg7syezuqULWaF8RgSznadcctkToLFUvlj8J97y8aDdHT3UGXayjLQu99qy9pT3-YYDaZ0IpXVxX_a1ccpPdBw7ayyuPqV5AqTvFqFFLEUv_akoeb0B_jfRUFzPpeuWg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 p-8">
              <h3 className="text-white font-headline text-3xl font-bold mb-2">
                London
              </h3>
              <p className="text-white/80 text-sm mb-4">United Kingdom</p>
              <button className="text-white font-semibold flex items-center gap-2 group/btn">
                Explore{" "}
                <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="label-md font-bold text-secondary tracking-widest uppercase text-xs mb-2 block">
            Curated Journeys
          </span>
          <h2 className="font-headline text-4xl font-extrabold text-on-surface">
            Popular Packages
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Royal Rajasthan */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-2xl">
            <div className="h-64 overflow-hidden relative">
              <img
                alt="Rajasthan Palace"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUD45bMtlYj3wamllJkxC1g1fATuM2HB5i8iRQ3Q615ywyjjwueCJIiB3jbmczY55KSc8wDPkVms-f0534L5eH1KnLAJWwqLrphsbuZQWyNlm8t6DpIOt6uykunN4HZpLG1p79lARv5bIJYI85bnI6AgtBXGUVJlvsvaNfrSZta3jZN7Oht1h-u_UJ9AyoQPpNepbui4bA-KltK348ejHE5rfVaXvcqruWehmWHAAq-vF4Nzcd0PKwENo0vGtHSJQQC31nQScZeQFi"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                8 DAYS
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-headline text-2xl font-bold mb-2">
                Royal Rajasthan
              </h3>
              <div className="flex items-center gap-1 text-secondary-container mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
                <span className="text-xs text-on-surface-variant font-medium ml-1">
                  4.9 (124 Reviews)
                </span>
              </div>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                Experience the grandeur of Indian royalty through palaces,
                desert safaris, and vibrant culture.
              </p>
              <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Starting from</span>
                  <span className="text-xl font-bold text-primary">$1,850</span>
                </div>
                <button className="text-primary font-bold text-sm uppercase tracking-widest hover:underline">
                  View Details
                </button>
              </div>
            </div>
          </div>
          {/* Parisian Romance */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-2xl">
            <div className="h-64 overflow-hidden relative">
              <img
                alt="Paris View"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUUfCqgJ9Gbeyb42FOx7CdP978XZRHfyL8E0m5xpMYFLeOnAcuKhdXz5X-QYt41OeYf5ZTJexqqtSkCn770mDAFMOJt-HX2k4hkcA0qPFoLe80bOMfBz9c1RSFDQBAIat1VHsjDRzYhYosw008ZyhohnTgPA3QgnfiNBaE8g9tD04GUlIj4szjCv271iaYQG86jJ4_HWLXljKLNANNHHuLaJDx2FFmLM5Y5kOiad2U65YQD35dRmP6EYe5_2xaEt5h9Mv2sa_yNf2z"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                5 DAYS
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-headline text-2xl font-bold mb-2">
                Parisian Romance
              </h3>
              <div className="flex items-center gap-1 text-secondary-container mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
                <span className="text-xs text-on-surface-variant font-medium ml-1">
                  5.0 (210 Reviews)
                </span>
              </div>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                A dreamy getaway featuring private Seine cruises, Michelin
                dining, and boutique art gallery tours.
              </p>
              <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Starting from</span>
                  <span className="text-xl font-bold text-primary">$2,400</span>
                </div>
                <button className="text-primary font-bold text-sm uppercase tracking-widest hover:underline">
                  View Details
                </button>
              </div>
            </div>
          </div>
          {/* Amalfi Odyssey */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-2xl">
            <div className="h-64 overflow-hidden relative">
              <img
                alt="Amalfi Coast"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx1L2HRSyo8bdV-E1DxTPX44ytpj83WlSuzoWElEXuKdO63QuVzfumHEBnvslucNBWz4crdyNvbOnAZroo8WgPDRkRhfobkWqGR9bNIpf8P-d8HDcfk5Lr4OZq85VVuvAySk6F5btkhifFM-PcC7icsKKwaz0_xPcwJi3uBA-zibzZDP4vTjWKthTc7SS6nOUUEysn6_zc0Sxh-P6bLl_vIkycqpWOuR9S2qW2PpDfXItGSnAQE0sUChrtmkryFhULfJ-16woCKuuH"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                10 DAYS
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-headline text-2xl font-bold mb-2">
                Amalfi Odyssey
              </h3>
              <div className="flex items-center gap-1 text-secondary-container mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
                <span className="text-xs text-on-surface-variant font-medium ml-1">
                  4.8 (89 Reviews)
                </span>
              </div>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                Sail along the rugged coastline, taste local lemon delicacies,
                and hike the Path of the Gods.
              </p>
              <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Starting from</span>
                  <span className="text-xl font-bold text-primary">$3,200</span>
                </div>
                <button className="text-primary font-bold text-sm uppercase tracking-widest hover:underline">
                  View Details
                </button>
              </div>
            </div>
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
            <div className="bg-white p-10 rounded-2xl editorial-shadow relative">
              <span className="material-symbols-outlined text-secondary/20 text-8xl absolute top-4 right-8">
                format_quote
              </span>
              <p className="text-xl italic font-headline text-on-surface-variant leading-loose mb-8 relative z-10">
                "The itinerary was flawless. Every detail, from the private
                transfers in Tokyo to the boutique ryokan in Kyoto, was handled
                with absolute care. Infinity Miles didn't just book a trip; they
                crafted a memory that will last a lifetime."
              </p>
              <div className="flex items-center gap-4">
                <img
                  alt="Traveler Profile"
                  className="w-16 h-16 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9oesH0vsVn-VKaJcdeGdVyBZ0pvedrq82fGKGpAhplUM_XtrEosGFN5gdOmwkScCpQvL8goGCUTYS7j9Np8g5frwqGn-tVf0u9AE-6GS4l1DHdK8GA0ah1tNkzNiUwlnNyffWD_d5G_XGxL-df1hH5XM-w59zMOl7-Ws-Gfqcu_uOZRWewbPt-1gXnlQaoeKmKg1YlNweH22fIN2gRzXys8pLbMXur90ovF-XPRe_G2PGXMWWqKn_p8joknyAFxohKp3P7uaDXqDQ"
                />
                <div>
                  <h4 className="font-bold text-on-surface">Elena Rodriguez</h4>
                  <p className="text-sm text-slate-500">
                    Explorer from New York
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                className="rounded-2xl h-64 w-full object-cover"
                alt="Tuscan landscape"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnM80F7IVRXt0kROm2JTsj9g6IPz8BLtNmb-x621jvR3aNEKsKj5rNfU7zBD7g2b5Onh_YlW4N1HRLOBDNPpFAhTZi4WkzmUuULSSE89AwfSzMygCKzHw91YrW2eZAg82cvwA_wzt7Ewu9dYjc8Ymjc6TGHLQgXeZhaRtxTXE9ZL6mxmpwI-9jqnc0I3J2OnOnBHxYxAnff6cPMe8z_U52neH7vu8Ay5SBkRrVOkEsuqmu4_4c0vVM9ubi7eJcouJnnE8xw_MR-mJB"
              />
              <img
                className="rounded-2xl h-48 w-full object-cover"
                alt="Luxury resort"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9lJaZN3Ev56ZLJTStGfb5AMkhnSA4NEFdKDqrZxbH9yPaQXh2GhfSXjZOpeV7RsMZ4Kgx0ofTF2eZwsrt9xAP3DVNRz_DKK_T3oaPMxBXgwIkfteUTuZ7qD123gn0OEMGnIL3Nos4g_t64Ja_v3kIV8TVmKXBe5otG2MrBU9Wktm6NVfpPo3F8fkCSJwVObfqM1OsbVOtsAvMvMrLMbRL7A94_V-cAwjKcDCxCwmXPzjGqv5NzD8qag76R4I6GeuECf3jmjxvwoSJ"
              />
            </div>
            <div className="pt-8 space-y-4">
              <img
                className="rounded-2xl h-48 w-full object-cover"
                alt="Tea ceremony"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDISU6lJwFt3ggY7k_8H91ll0JdmgWKYefy0csvojSO2CF1MIyMT8eeoL4FwWNwJjsN5TvtFBGH6AUpvbGba2iSBep9H5sxvo9FlHpdff6B15s9tT1b0STdWXN5aMktDrZVbQm7jmZzGaJq2Xi1K84TJ1tWDJKb1pj5CKcluonNSWXVYkdzqwzoWotjbceZzC2AJnSOV0Bgk_67Dc0ybOl4jas6vNPrkMU_bMUr0vYjWAqQOSuOlSzAOxLe_Ez0af31pJWtsAqe6Fku"
              />
              <img
                className="rounded-2xl h-64 w-full object-cover"
                alt="Dubai skyline"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD83hi7VRPw1oot6fg-QZxfJ_OfkuOD7wUjhvuIXUxe_EWRxnKlbtgd72-lBkkaXZfinEussmuFSSuex6gGsSocMLs3d6XvTiMHGehbEXyeYxlTZQc6i_rt027YYTwz07saFGn6w8hSzhIBlNcFwG8kT04-9HE0mvtGRaXzm0VHCYjkgOSs-0IVN5ow-YXa2Sp6eP_F5MZ9TKQlnJG9wZ79AVN-SV1z1BdZ9Vwds5R0GD_ut4926g8B0cphK7U23rJNG6ggUHAqzJAa"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
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
              Subscribe to receive exclusive travel guides, early access to
              boutique packages, and curated wanderlust inspiration directly to
              your inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                className="flex-1 px-8 py-4 rounded-full border-none focus:ring-2 focus:ring-secondary text-on-surface bg-white/95"
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
      </section>
    </main>
  );
};

export default HomePage;
