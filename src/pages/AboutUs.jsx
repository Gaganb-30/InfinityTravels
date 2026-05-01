// src/pages/AboutUs.js
import React from "react";

const AboutUs = () => {
  return (
    <main className="pt-24">
      {/* Hero Section: Brand Story */}
      <section className="relative min-h-[819px] flex items-center overflow-hidden px-8 md:px-20">
        <div className="absolute inset-0 z-0">
          <img
            alt="Luxury travel background"
            className="w-full h-full object-cover opacity-90"
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="font-label text-secondary tracking-[0.2em] uppercase text-sm mb-6 block font-semibold">
            Our Origin
          </span>
          <h1 className="font-headline text-5xl md:text-7xl text-on-surface mb-8 leading-[1.1] tracking-tight">
            Defining luxury travel through narrative and curation.
          </h1>
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-xl">
            We believe travel is more than a destination; it's the prose of a
            life well-lived. Infinity Miles was born from the desire to craft
            journeys that resonate as deeply as a masterpiece.
          </p>
        </div>
      </section>

      {/* Mission & Vision: Editorial Layout */}
      <section className="py-24 px-8 md:px-20 bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-5">
            <div className="bg-surface-container-low p-12 rounded-xl">
              <span className="font-label text-primary tracking-widest text-xs uppercase mb-4 block">
                Our Purpose
              </span>
              <h2 className="font-headline text-4xl text-on-surface mb-6">
                Inspiring the modern explorer
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Our mission is to dissolve the boundaries between the traveler
                and the world. We curate experiences that challenge the ordinary
                and elevate the spirit of discovery.
              </p>
              <div className="flex items-center gap-4 group cursor-pointer">
                <span className="w-12 h-[1px] bg-outline-variant group-hover:w-16 group-hover:bg-primary transition-all duration-500"></span>
                <span className="font-label text-sm font-semibold group-hover:text-primary transition-colors">
                  Our Vision for 2030
                </span>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 pt-12">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4 translate-y-12">
                <img
                  alt="Vision image 1"
                  className="rounded-xl w-full h-[400px] object-cover shadow-lg"
                  src="https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DD"
                />
                <h3 className="font-headline text-xl mt-4">Unrivaled Access</h3>
                <p className="text-sm text-on-surface-variant">
                  Opening doors to the world's most guarded cultural treasures.
                </p>
              </div>
              <div className="space-y-4">
                <img
                  alt="Vision image 2"
                  className="rounded-xl w-full h-[400px] object-cover shadow-lg"
                  src="https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHRyYXZlbGluZ3xlbnwwfHwwfHx8MA%3D%3D"
                />
                <h3 className="font-headline text-xl mt-4">Conscious Luxury</h3>
                <p className="text-sm text-on-surface-variant">
                  Crafting journeys that honor both the traveler and the
                  terrain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Philosophy: Atmospheric Block */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Philosophy Background"
            className="w-full h-full object-cover grayscale brightness-50"
            src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fHRyYXZlbGluZ3xlbnwwfHwwfHx8MA%3D%3D"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-8">
          <div className="inline-block p-4 bg-secondary-container/20 backdrop-blur-md rounded-full mb-8">
            <span className="material-symbols-outlined text-secondary">
              auto_awesome
            </span>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl text-white mb-10 leading-tight">
            "Travel is the only thing you buy that makes you richer in stories,
            not just memories."
          </h2>
          <div className="flex justify-center items-center gap-6">
            <div className="h-[1px] w-12 bg-white/30"></div>
            <p className="font-label text-white/80 tracking-widest text-sm uppercase">
              The Infinity Philosophy
            </p>
            <div className="h-[1px] w-12 bg-white/30"></div>
          </div>
        </div>
      </section>

      {/* Team Section: Bento Grid */}
      <section className="py-32 px-8 md:px-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="font-headline text-5xl text-on-surface mb-4">
              The Curators
            </h2>
            <p className="text-on-surface-variant max-w-xl">
              Meet the visionaries weaving the threads of your next great
              narrative.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Founder */}
            <div className="md:col-span-2 group">
              <div className="relative overflow-hidden rounded-xl h-[500px] bg-surface-container-highest">
                <img
                  alt="Julian Vance"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1M6_zmcEQZSoPpoPI6UozykxcWGgTg8J6ZEbpLjx9y3vPkTo73wQI2f8oOXh0UIISRjLdmRLPcg7lJUWGSgaquQTrVuK11qHF2blYd-0Lh-RqR54OAVicQItFYCOIP3ayGQLl1e_tniDAQBppUSK9DJxRiEFL9lp55s8iUmgb3kR1Az7R70hIeu2Bp4It9PR8uggrd3_lQ_odQxGOXiDqKhcYzbbDN8AiXqK07e-Gg2BfxvL3B_giTo-B8lZjt5c5bAe5Db4tl1YZ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="text-white/70 font-label text-xs uppercase tracking-widest mb-1">
                    Founder &amp; CEO
                  </p>
                  <h3 className="font-headline text-3xl text-white">
                    Julian Vance
                  </h3>
                </div>
              </div>
            </div>
            {/* Team Member 1 */}
            <div className="group">
              <div className="relative overflow-hidden rounded-xl h-[500px] bg-surface-container-highest">
                <img
                  alt="Elena Rossi"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0mduCF4lQ24t2vGcdypfr9zuNNs96IFia0bC3J-eNbuG71A0K4ysiNp4Y4yfq0SlyTd6hw4rcPOEhbhe7dixtj9yh1gyetWusGpgr1gb720TuuipoYGwNS3fzJ7j1rFnNmtmjT-wAZSEhug1elVIZUivLAAolpOgvHAHLw_cykqnOV4DS2DiJ2dnRMCJY4CrmyS27SkzZlJYmIBrN9MbnmA4rutwSDShvdg9HmEwuRz_0vqKc1Uzs75NTvHuostJEXza1DfchGTrJ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-white/70 font-label text-xs uppercase tracking-widest mb-1">
                    Chief Curator
                  </p>
                  <h3 className="font-headline text-xl text-white">
                    Elena Rossi
                  </h3>
                </div>
              </div>
            </div>
            {/* Team Member 2 */}
            <div className="group">
              <div className="relative overflow-hidden rounded-xl h-[500px] bg-surface-container-highest">
                <img
                  alt="Marcus Thorne"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAvQC_KlTJqUr-4c0Lb5TaXvqOVCH_Z0VhOyybV3En2xUDNWQpnacN5cT-ImXZMbietlpoCf62iawkbdkBcCnxBC3g3fiLnRJnBRzOlZb86DfFnpOH6LDQWjEaCnn7tyAc7QJJBYGbBTpFsIOexcre06RxrVtcfMsPR8qhHABvoo75uMq6cXgT1qpTPqbr_jsJd6Dnc9opLADFQBCzKf97vS9tpArJ9y8OSDPAhvKw3fpL8ZzkNUABm3mV00K3acq8-MwywkJ2rgpm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-white/70 font-label text-xs uppercase tracking-widest mb-1">
                    Expedition Lead
                  </p>
                  <h3 className="font-headline text-xl text-white">
                    Marcus Thorne
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section: Asymmetric */}
      <section className="py-24 px-8 md:px-20 bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary-fixed/30 rounded-full blur-3xl"></div>
            <img
              alt="Our Values"
              className="rounded-xl editorial-shadow relative z-10"
              src="https://images.unsplash.com/photo-1524842495237-6abc737eae1f?q=80&w=892&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
          <div>
            <h2 className="font-headline text-4xl text-on-surface mb-12">
              The Infinity Standard
            </h2>
            <ul className="space-y-10">
              <li className="flex gap-6">
                <span className="text-secondary font-headline text-2xl italic">
                  01.
                </span>
                <div>
                  <h4 className="font-headline text-xl mb-2">
                    Narrative First
                  </h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    We don't sell hotels; we sell chapters of a story that
                    you'll tell for generations.
                  </p>
                </div>
              </li>
              <li className="flex gap-6">
                <span className="text-secondary font-headline text-2xl italic">
                  02.
                </span>
                <div>
                  <h4 className="font-headline text-xl mb-2">
                    Radical Quality
                  </h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    Vetted by experts, tested by enthusiasts. If it isn't
                    exceptional, it isn't on our map.
                  </p>
                </div>
              </li>
              <li className="flex gap-6">
                <span className="text-secondary font-headline text-2xl italic">
                  03.
                </span>
                <div>
                  <h4 className="font-headline text-xl mb-2">Quiet Presence</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    We manage the chaos so you can enjoy the silence of a hidden
                    desert canyon.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
