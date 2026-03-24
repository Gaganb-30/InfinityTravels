// src/pages/Destinations.js
import React from "react";

const Destinations = () => {
  return (
    <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
      {/* Hero Title Section */}
      <section className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <p className="font-label text-secondary tracking-[0.2em] uppercase text-xs mb-4 font-bold">
            Curated Collections
          </p>
          <h1 className="font-headline text-6xl md:text-7xl text-on-surface leading-tight tracking-tighter">
            World Destinations
          </h1>
          <p className="mt-6 text-on-surface-variant text-lg max-w-lg leading-relaxed">
            Discover a world beyond boundaries. From the silent peaks of the
            Andes to the neon pulse of Tokyo, your next chapter begins here.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-4 text-primary font-semibold">
          <span className="text-sm">Scroll to explore</span>
          <span className="material-symbols-outlined animate-bounce">
            arrow_downward
          </span>
        </div>
      </section>

      {/* Filters Section */}
      <section className="mb-16">
        <div className="bg-surface-container-low p-6 rounded-3xl flex flex-wrap items-center gap-8 shadow-sm">
          <div className="flex flex-col gap-2">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold ml-1">
              Country
            </label>
            <select className="bg-surface-container-lowest border-none rounded-xl text-sm py-2.5 pl-4 pr-10 focus:ring-primary/20 min-w-[160px]">
              <option>All Countries</option>
              <option>Japan</option>
              <option>France</option>
              <option>Tanzania</option>
              <option>Peru</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold ml-1">
              Budget
            </label>
            <select className="bg-surface-container-lowest border-none rounded-xl text-sm py-2.5 pl-4 pr-10 focus:ring-primary/20 min-w-[160px]">
              <option>Any Budget</option>
              <option>Luxury</option>
              <option>Premium</option>
              <option>Value</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold ml-1">
              Season
            </label>
            <div className="flex gap-2">
              <button className="bg-primary text-on-primary px-4 py-2 rounded-xl text-sm font-medium">
                Summer
              </button>
              <button className="bg-surface-container-highest text-on-surface px-4 py-2 rounded-xl text-sm font-medium hover:bg-surface-variant transition-colors">
                Autumn
              </button>
              <button className="bg-surface-container-highest text-on-surface px-4 py-2 rounded-xl text-sm font-medium hover:bg-surface-variant transition-colors">
                Winter
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-auto">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold ml-1">
              Type
            </label>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 rounded-full border border-outline-variant/30 text-xs font-medium cursor-pointer hover:bg-surface-container-highest">
                Beach
              </span>
              <span className="px-3 py-1.5 rounded-full border border-outline-variant/30 text-xs font-medium cursor-pointer hover:bg-surface-container-highest">
                Mountain
              </span>
              <span className="px-3 py-1.5 rounded-full border border-outline-variant/30 text-xs font-medium cursor-pointer hover:bg-surface-container-highest">
                Adventure
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Destination Grid (Asymmetric Bento/Editorial) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Large Feature Card: Paris */}
        <div className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-surface-container-lowest editorial-shadow">
          <div className="aspect-[16/9] w-full overflow-hidden">
            <img
              alt="Eiffel Tower at sunset"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4xbGOaKsxjN97ELeC0kt7iSmW9inE_a5IcBKwFzkMiEAJbE1IxAyELKMXX0HiwtgG32dH1ehGtSmUXfUhiy8T5jn55qf4bFJnr_n-jbXBkKpyV0X6_5BRGtCtmW7-EYcem-7ahJBhuM7kB83FlVVD9dp9qCtCNY5mD0_UCDIUQMaLGEXsl88NDb3E3Vde6EwYzMuQZOyqbCDoayNQRQWFty2SqtQyVkO7n6Z4HGzlzu9Cu7bR-3QD7Z4ht9BU-DXxfazQuYsOY3Sm"
            />
          </div>
          <div className="p-10">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline text-4xl text-on-surface">
                Paris, France
              </h3>
              <span className="font-label text-sm text-secondary font-bold tracking-widest uppercase">
                Luxury Tier
              </span>
            </div>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl mb-8">
              Walk the cobblestone streets of Le Marais and witness the timeless
              elegance of the City of Light. A journey of art, cuisine, and
              romance awaits.
            </p>
            <button className="flex items-center gap-3 text-primary font-bold tracking-tight hover:gap-5 transition-all">
              EXPLORE DESTINATION
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Side Card: Tokyo */}
        <div className="md:col-span-4 group bg-surface-container-lowest rounded-[2.5rem] editorial-shadow flex flex-col">
          <div className="aspect-square w-full overflow-hidden rounded-t-[2.5rem]">
            <img
              alt="Neon lights of Tokyo"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeVMNubeyWnDFlQFw0ihqcpv-mNwURZAOPL_PhMTa2HY1Y6pOa3vTHD_QuKUPetVFX8-XHbU8MNBJtey5DWI-uFxt2OSENYQNuspDoTX66QQiFiYOlY9wjsUcDAJwPozdleoE5pcr_hfUyS2SpSyE_WAd5B11j_vM_SoqYsP62CUav3_ck2HHUjQ54NGDAPV64H_jFtjjUITDrYv2Ez366C7Bw9WsHy-KCWQF56A7qirESR6MJ9LQsslMSECaTSgVQJZbifN7GZMlX"
            />
          </div>
          <div className="p-8 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-headline text-2xl text-on-surface mb-3">
                Tokyo, Japan
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                A neon-lit symphony of tradition and futuristic innovation.
              </p>
            </div>
            <button className="w-full py-4 rounded-2xl bg-surface-container-high text-on-surface font-semibold hover:bg-primary hover:text-on-primary transition-all active:scale-95">
              Explore
            </button>
          </div>
        </div>

        {/* Row 2: Machu Picchu & Serengeti */}
        <div className="md:col-span-6 group bg-surface-container-lowest rounded-[2.5rem] editorial-shadow">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-t-[2.5rem]">
            <img
              alt="Ancient ruins of Machu Picchu"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBykTSOcudF4tEZ5OkFbQShq3658sTZuytCERzqtKlOUwUr53cImMOU3IuCPpCZVFOFtBnq5vtMyNh2_v5vh1Lfzs8BFfR7mTY1hYobHbZnX7AOyZWyvANCKgfIVXGGk1JEaVKLz5l2ow1OCdlyqYJfyOuF2rq-hDvEOApjo5nLFeQL0vxofT4tCvLsBrpAjyqUyPFDcqTRLpOoqv8qHaop1VsYPKzgqZyLvYVb0_miplusG19f80ANZauJMrn81ZavkMi92dkurLz5"
            />
          </div>
          <div className="p-10">
            <h3 className="font-headline text-3xl text-on-surface mb-4">
              Machu Picchu, Peru
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              Uncover the mysteries of the Incan Empire amidst the clouds of the
              Andes mountains.
            </p>
            <div className="flex items-center justify-between">
              <span className="bg-secondary-container/10 text-on-secondary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                Adventure
              </span>
              <button className="p-4 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center transition-transform hover:rotate-45">
                <span className="material-symbols-outlined">north_east</span>
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 group bg-surface-container-lowest rounded-[2.5rem] editorial-shadow">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-t-[2.5rem]">
            <img
              alt="Wildlife in the Serengeti"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEEw_PPBqq94Smrm-zivW5LhkxtBdn-8Ivdd11jQOAZoFUvFkiiXK3m9wFSBFF3iiY27l08X_Sk7BvhOwZJdgwg1rRy7ankh1jJKrm-UHnORGrkJ3EC7JvCXH54S4fv8CQIyEoGPmS8ybQfWo1VmzoGCKABrlEVLQoKJwQbhMyTROYIXL8hHwJUEYf4qKxQ-ExVWeAdwgwCaGIv90sQJvk5maxhm_lerTmOl0N1vJTaG-qbdj4J1mgVfpEhbrFXhG1l1CV61jsWEq_"
            />
          </div>
          <div className="p-10">
            <h3 className="font-headline text-3xl text-on-surface mb-4">
              Serengeti, Tanzania
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              Experience the majestic great migration and the untamed beauty of
              the African savannah.
            </p>
            <div className="flex items-center justify-between">
              <span className="bg-secondary-container/10 text-on-secondary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                Nature
              </span>
              <button className="p-4 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center transition-transform hover:rotate-45">
                <span className="material-symbols-outlined">north_east</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Segment */}
      <section className="mt-32 bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #0077be 0%, transparent 50%)",
          }}
        ></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl md:text-5xl text-white mb-6">
            Receive Secret Itineraries
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Join 50,000+ wanderers and receive our hand-crafted travel guides
            once a month.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="flex-1 px-8 py-5 rounded-full bg-slate-800 border-none text-white focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="Your email address"
              type="email"
            />
            <button className="bg-primary-container text-on-primary-container px-10 py-5 rounded-full font-bold shadow-xl shadow-primary/20 hover:brightness-110 transition-all">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Destinations;
