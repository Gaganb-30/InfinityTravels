// src/pages/PackageDetail.js
import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../utils/api";
import { generateWhatsAppLink, formatPriceRange } from "../utils/whatsapp";

/* ──────────── Image Carousel Component ──────────── */
const ImageCarousel = ({ images, altText }) => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, images.length, nextSlide]);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className="h-[500px] overflow-hidden rounded-xl bg-surface-container">
        <img className="w-full h-full object-cover" alt={altText} src={images[0]} />
      </div>
    );
  }

  return (
    <div
      className="relative h-[500px] overflow-hidden rounded-xl bg-surface-container group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            className="w-full h-full object-cover flex-shrink-0"
            alt={`${altText} ${i + 1}`}
            src={img}
          />
        ))}
      </div>

      {/* Nav Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white cursor-pointer"
      >
        <span className="material-symbols-outlined text-slate-800">chevron_left</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white cursor-pointer"
      >
        <span className="material-symbols-outlined text-slate-800">chevron_right</span>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === current ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
              }`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
        {current + 1} / {images.length}
      </div>
    </div>
  );
};

/* ──────────── Accordion Item Component ──────────── */
const AccordionItem = ({ day, isOpen, onToggle, isLast }) => {
  return (
    <div className={`border border-outline-variant/20 rounded-xl overflow-hidden transition-all mb-3 ${isOpen ? 'shadow-md shadow-primary/5' : ''}`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer ${isOpen ? 'bg-primary/5' : 'bg-surface-container-lowest hover:bg-surface-container-low'
          }`}
      >
        <div className="flex items-center gap-4">
          <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${isOpen ? 'bg-primary text-white' : 'bg-surface-container-highest text-on-surface-variant'
            }`}>
            {String(day.day).padStart(2, '0')}
          </span>
          <div>
            <span className="font-label text-xs text-secondary font-bold tracking-widest uppercase">
              Day {day.day}
            </span>
            <h3 className="font-headline text-lg font-bold text-on-surface">{day.title}</h3>
          </div>
        </div>
        <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-5 pb-5 pt-2 ml-14">
          <p className="text-on-surface-variant leading-relaxed">{day.description}</p>
          {day.tags?.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {day.tags.map((tag, j) => (
                <span key={j} className="px-3 py-1 rounded-full bg-surface-bright border border-outline-variant/30 text-xs font-medium text-on-surface-variant">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ──────────── Policy Section Accordion ──────────── */
const PolicySection = ({ icon, title, items, colorScheme, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const schemes = {
    blue: {
      bg: 'bg-blue-50',
      headerBg: 'hover:bg-blue-100/60',
      activeBg: 'bg-blue-100/40',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-900',
      bulletColor: 'text-blue-500',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200/60',
    },
    amber: {
      bg: 'bg-amber-50',
      headerBg: 'hover:bg-amber-100/60',
      activeBg: 'bg-amber-100/40',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      titleColor: 'text-amber-900',
      bulletColor: 'text-amber-500',
      textColor: 'text-amber-800',
      borderColor: 'border-amber-200/60',
    },
    rose: {
      bg: 'bg-rose-50',
      headerBg: 'hover:bg-rose-100/60',
      activeBg: 'bg-rose-100/40',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-600',
      titleColor: 'text-rose-900',
      bulletColor: 'text-rose-500',
      textColor: 'text-rose-800',
      borderColor: 'border-rose-200/60',
    },
  };

  const s = schemes[colorScheme] || schemes.blue;

  return (
    <div className={`${s.bg} rounded-xl border ${s.borderColor} overflow-hidden transition-all ${isOpen ? 'shadow-md' : ''}`} id={id}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-6 text-left transition-colors cursor-pointer ${isOpen ? s.activeBg : s.headerBg}`}
      >
        <div className="flex items-center gap-4">
          <span className={`w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center`}>
            <span className={`material-symbols-outlined ${s.iconColor}`}>{icon}</span>
          </span>
          <h3 className={`font-headline text-xl font-bold ${s.titleColor}`}>{title}</h3>
        </div>
        <span className={`material-symbols-outlined ${s.iconColor} transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div className={`transition-all duration-400 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-2">
          <ul className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className={`flex items-start gap-3 ${s.textColor}`}>
                <span className={`material-symbols-outlined text-sm mt-0.5 flex-shrink-0 ${s.bulletColor}`}>
                  arrow_circle_right
                </span>
                <span className="leading-relaxed text-[15px]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ──────────── FAQ Accordion ──────────── */
const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className={`border border-outline-variant/15 rounded-xl overflow-hidden transition-all ${isOpen ? 'shadow-md shadow-primary/5 border-primary/20' : ''}`}>
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer ${isOpen ? 'bg-primary/5' : 'bg-surface-container-lowest hover:bg-surface-container-low'
        }`}
    >
      <div className="flex items-center gap-3 flex-1 pr-4">
        <span className={`material-symbols-outlined text-lg flex-shrink-0 transition-colors ${isOpen ? 'text-primary' : 'text-on-surface-variant'}`}>
          help
        </span>
        <span className={`font-semibold text-[15px] ${isOpen ? 'text-primary' : 'text-on-surface'}`}>
          {question}
        </span>
      </div>
      <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
        expand_more
      </span>
    </button>
    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="px-5 pb-5 pt-1 ml-9">
        <p className="text-on-surface-variant leading-relaxed text-[15px]">{answer}</p>
      </div>
    </div>
  </div>
);

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I book a package?",
      answer: "You can book any package by clicking the 'Book via WhatsApp' button on the package page. Our travel expert will connect with you to finalize the itinerary, travel dates, and payment details. A 30% advance is required to confirm your booking."
    },
    {
      question: "Can I customize the itinerary?",
      answer: "Absolutely! All our packages are fully customizable. You can modify the number of days, destinations, hotel categories, activities, and more. Just let our travel expert know your preferences during the booking process."
    },
    {
      question: "What is included in the package price?",
      answer: "The package price typically includes accommodation, sightseeing as per itinerary, transfers, and meals as mentioned. Please refer to the 'What's Included' and 'Not Included' sections on each package page for specific details."
    },
    {
      question: "Is airfare/train fare included in the price?",
      answer: "Airfare and train fares are generally not included in the package price unless explicitly mentioned. The air fare is calculated at the time of proposal creation and is subject to change at the time of booking. 100% flight fare is required to issue the tickets."
    },
    {
      question: "What is the payment schedule?",
      answer: "A 30% advance is required at the time of booking. For domestic packages, 100% payment must be completed 10 days before departure. For international packages, full payment is required 15 days before the departure date."
    },
    {
      question: "Can I reschedule my trip?",
      answer: "Yes, you can prepone or postpone your trip once without additional charges, provided you inform us at least 15 days prior to your travel date in writing (email/SMS). A second reschedule may attract additional charges. Changes within 15 days of travel are generally not accepted."
    },
    {
      question: "What is the cancellation policy?",
      answer: "Cancellation charges depend on when you cancel: 30+ days before departure \u2014 10% of total cost; 15\u201329 days \u2014 25%; 7\u201314 days \u2014 50%; less than 7 days \u2014 no refund. Non-refundable components like flight tickets and visa fees are excluded from refunds."
    },
    {
      question: "Can I transfer my booking to someone else?",
      answer: "Yes! Your advance payment and invoice number are transferable. You can pass your booking to a friend or relative, provided the original terms and conditions are met first."
    },
    {
      question: "How are hotel categories selected?",
      answer: "We offer multiple hotel tier options for most packages. You can choose between standard, premium, or luxury categories. The price adjusts accordingly based on the hotel tier you select. You can see and compare options using the hotel selector on the booking sidebar."
    },
    {
      question: "What happens in case of natural disasters or strikes?",
      answer: "In rare cases like adverse climatic conditions or strikes, we will inform you in advance, and the package can be postponed without any extra charges. Your safety is our top priority, and we work closely with local authorities to ensure the best alternatives."
    }
  ];

  return (
    <section className="space-y-6" id="faq">
      <div className="flex items-center gap-3">
        <span className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
          <span className="material-symbols-outlined text-violet-600">quiz</span>
        </span>
        <h2 className="font-headline text-3xl font-bold">Frequently Asked Questions</h2>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            question={faq.question}
            answer={faq.answer}
            isOpen={openFAQ === i}
            onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
};

/* ──────────── Static Policy Data ──────────── */
const BOOKING_TERMS = [
  "30% advance to be paid at the time of booking.",
  "100% flight fare required to issue the tickets.",
  "Air fare is calculated at the time of proposal creation and is subject to change at the time of booking.",
  "100% payment is to be made for domestic packages before 10 days of departure date.",
  "100% payment is to be made for international packages before 15 days of departure date.",
  "In case of cancellation, standard cancellation policies will be applicable or may be changed as per the policies.",
];

const TERMS_CONDITIONS = [
  "In case client wishes to prepone/postpone his or her travel dates, we request you to kindly reach us 15 days prior to journey date via e-mail/SMS.",
  "The customers can prepone/postpone their tour once without any additional charges (if intimated before 15 days of travel date in written). However, postponing & preponing a second time will attract additional charges.",
  "Few service providers (Hoteliers, Transporters, etc.) may apply postpone/prepone charges even after meeting the above requirement. In such cases, the charges will be deducted from the advance amount deposited.",
  "In all prepone or postpone scenarios, the services and the costing will be subject to availability of Hotel/Volvo and season/off-season time.",
  "We do not accept any changes in plan within 15 days of travel date. However, in rare cases like adverse climatic conditions or strikes, package can be postponed which will be intimated to you beforehand.",
  "The validity to utilize your advance payment in prepone/postpone scenarios is 1 year from the date of advance payment.",
  "The advance payment and the invoice number allotted to you are transferable \u2014 you can pass on your booking to any of your friends/relatives (subject to meeting the above terms and conditions first).",
];

const CANCELLATION_POLICY = [
  "Cancellation 30 days or more before the departure date \u2014 10% of the total package cost will be charged.",
  "Cancellation between 15 to 29 days before departure \u2014 25% of the total package cost will be charged.",
  "Cancellation between 7 to 14 days before departure \u2014 50% of the total package cost will be charged.",
  "Cancellation less than 7 days before departure \u2014 No refund will be provided.",
  "Non-refundable components such as airline tickets, visa fees, and travel insurance premiums are excluded from all refund calculations.",
  "Refunds (if applicable) will be processed within 10\u201315 business days from the date of cancellation confirmation.",
  "In case of no-show or early departure, no refund will be applicable for the unused portion of the package.",
];

/* ──────────── Main PackageDetail Component ──────────── */
const PackageDetail = () => {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState(2);
  const [hotelStandard, setHotelStandard] = useState("5-Star Elite");
  const [whatsappNumber, setWhatsappNumber] = useState("919876543210");
  const [openDays, setOpenDays] = useState(new Set([1])); // Day 1 open by default

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getPackage(slug);
        setPkg(data);
        if (data.hotelStandards?.length > 0) {
          setHotelStandard(data.hotelStandards[data.hotelStandards.length - 1].tier);
        }
        if (data.itinerary?.length > 0) {
          setOpenDays(new Set([data.itinerary[0].day]));
        }
        const config = await api.getWhatsAppNumber();
        setWhatsappNumber(config.whatsappNumber);
      } catch (err) {
        console.error("Failed to fetch package:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const toggleDay = (dayNum) => {
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(dayNum)) next.delete(dayNum);
      else next.add(dayNum);
      return next;
    });
  };

  if (loading) {
    return (
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-8 w-40 bg-surface-container-low animate-pulse rounded mb-4" />
        <div className="h-14 w-80 bg-surface-container-low animate-pulse rounded mb-8" />
        <div className="h-[500px] bg-surface-container-low animate-pulse rounded-xl" />
      </main>
    );
  }

  if (!pkg) {
    return (
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-12 text-center py-32">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">inventory_2</span>
        <h2 className="font-headline text-3xl text-slate-400">Package not found</h2>
        <Link to="/packages" className="text-primary font-semibold mt-4 inline-block hover:underline">&larr; Back to Packages</Link>
      </main>
    );
  }

  const incrementGuests = () => setGuests((prev) => Math.min(prev + 1, 10));
  const decrementGuests = () => setGuests((prev) => Math.max(prev - 1, 1));

  const getAdjustedPrice = () => {
    const standard = pkg.hotelStandards?.find((h) => h.tier === hotelStandard);
    const adjustment = standard ? standard.priceAdjustmentPercent / 100 : 0;
    return {
      min: Math.round(pkg.priceRange.min * (1 + adjustment)),
      max: Math.round(pkg.priceRange.max * (1 + adjustment)),
      currency: pkg.priceRange.currency || "\u20B9",
    };
  };

  const adjustedPrice = getAdjustedPrice();

  const whatsappLink = generateWhatsAppLink({
    whatsappNumber,
    packageName: pkg.name,
    destination: pkg.location,
    travelers: guests,
    hotelStandard,
    priceRange: adjustedPrice,
  });

  // Combine main image + gallery for carousel
  const allImages = [pkg.image, ...(pkg.galleryImages || [])].filter(Boolean);

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-12">
      {/* Header */}
      <header className="mb-12">
        <nav className="flex items-center gap-2 mb-4 text-on-surface-variant text-sm font-label uppercase tracking-widest">
          <Link to="/packages" className="hover:text-primary transition-colors">Packages</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary font-semibold">{pkg.name}</span>
        </nav>
        <h1 className="font-headline text-5xl md:text-6xl text-on-surface font-bold tracking-tight mb-4">
          {pkg.name}
        </h1>
        <div className="flex items-center gap-6 text-on-surface-variant flex-wrap">
          {pkg.rating > 0 && (
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-semibold text-on-surface">{pkg.rating}</span>
              <span className="text-sm">({pkg.reviewCount} Reviews)</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-sm font-medium">{pkg.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">location_on</span>
            <span className="text-sm font-medium">{pkg.location}</span>
          </div>
          {pkg.badge && (
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {pkg.badge}
            </span>
          )}
        </div>

        {/* Package Tags */}
        {pkg.tags?.length > 0 && (
          <div className="flex gap-2 mt-6 flex-wrap">
            {pkg.tags.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold border border-sky-200/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Hero Image / Carousel */}
      <section className="mb-16">
        <ImageCarousel images={allImages} altText={pkg.name} />
      </section>

      {/* Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-16">
          {/* Overview */}
          <section className="space-y-6" id="overview">
            <h2 className="font-headline text-3xl font-bold">Overview</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">{pkg.description}</p>
          </section>

          {/* Highlights */}
          {/* {pkg.highlights?.length > 0 && (
            <section className="space-y-8" id="highlights">
              <h2 className="font-headline text-3xl font-bold">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pkg.highlights.map((h, i) => (
                  <div key={i} className={`bg-surface-container-low p-8 rounded-xl space-y-4 ${h.image ? 'md:col-span-2 flex flex-col md:flex-row gap-8 items-center' : ''}`}>
                    {h.image && (
                      <div className="md:w-1/3 overflow-hidden rounded-xl h-40">
                        <img className="w-full h-full object-cover" alt={h.title} src={h.image} />
                      </div>
                    )}
                    <div className={h.image ? 'flex-1 space-y-2' : ''}>
                      <span className="material-symbols-outlined text-secondary text-4xl">{h.icon}</span>
                      <h3 className="font-headline text-xl font-bold">{h.title}</h3>
                      <p className="text-on-surface-variant">{h.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )} */}

          {/* Itinerary Accordion */}
          {pkg.itinerary?.length > 0 && (
            <section className="space-y-6" id="itinerary">
              <div className="flex items-center justify-between">
                <h2 className="font-headline text-3xl font-bold">Your Itinerary</h2>
                <button
                  onClick={() => {
                    if (openDays.size === pkg.itinerary.length) {
                      setOpenDays(new Set());
                    } else {
                      setOpenDays(new Set(pkg.itinerary.map((d) => d.day)));
                    }
                  }}
                  className="text-primary text-sm font-semibold hover:underline cursor-pointer"
                >
                  {openDays.size === pkg.itinerary.length ? 'Collapse All' : 'Expand All'}
                </button>
              </div>
              <div>
                {pkg.itinerary.map((day, i) => (
                  <AccordionItem
                    key={i}
                    day={day}
                    isOpen={openDays.has(day.day)}
                    onToggle={() => toggleDay(day.day)}
                    isLast={i === pkg.itinerary.length - 1}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Inclusions & Exclusions */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pkg.inclusions?.length > 0 && (
              <div className="bg-green-50 p-8 rounded-xl">
                <h3 className="font-headline text-xl font-bold mb-4 text-green-800">What's Included</h3>
                <ul className="space-y-3">
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-green-700">
                      <span className="material-symbols-outlined text-green-600 text-sm mt-0.5">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {pkg.exclusions?.length > 0 && (
              <div className="bg-red-50 p-8 rounded-xl">
                <h3 className="font-headline text-xl font-bold mb-4 text-red-800">Not Included</h3>
                <ul className="space-y-3">
                  {pkg.exclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-red-700">
                      <span className="material-symbols-outlined text-red-500 text-sm mt-0.5">cancel</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* ── Booking Terms, T&C, Cancellation Policy ── */}
          <section className="space-y-4" id="policies">
            <h2 className="font-headline text-3xl font-bold mb-2">Policies & Terms</h2>
            <PolicySection
              icon="receipt_long"
              title="Booking Terms"
              items={BOOKING_TERMS}
              colorScheme="blue"
              id="booking-terms"
            />
            <PolicySection
              icon="gavel"
              title="Terms & Conditions"
              items={TERMS_CONDITIONS}
              colorScheme="amber"
              id="terms-conditions"
            />
            <PolicySection
              icon="event_busy"
              title="Cancellation Policy"
              items={CANCELLATION_POLICY}
              colorScheme="rose"
              id="cancellation-policy"
            />
          </section>

          {/* ── FAQ ── */}
          <FAQSection />
        </div>

        {/* Right: Sticky Booking Sidebar */}
        <aside className="sticky top-32">
          <div className="bg-surface-container-lowest editorial-shadow rounded-xl p-8 space-y-8 border border-outline-variant/10">
            <div className="space-y-1">
              <span className="text-on-surface-variant text-sm font-label">Estimated Price Range</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-headline font-bold text-primary">
                  {formatPriceRange(adjustedPrice)}
                </span>
              </div>
              <span className="text-on-surface-variant text-sm">per person</span>
            </div>

            <div className="space-y-6">
              {/* Travelers Selector */}
              <div className="space-y-3">
                <label className="font-label text-sm font-semibold uppercase tracking-wider text-on-surface-variant">Travelers</label>
                <div className="flex items-center justify-between bg-surface-container-low p-4 rounded-lg">
                  <button onClick={decrementGuests} className="material-symbols-outlined cursor-pointer text-on-surface-variant hover:text-primary transition-colors">
                    remove_circle
                  </button>
                  <span className="font-bold text-lg">{guests} Guest{guests !== 1 && "s"}</span>
                  <button onClick={incrementGuests} className="material-symbols-outlined cursor-pointer text-primary hover:opacity-80 transition-colors">
                    add_circle
                  </button>
                </div>
              </div>

              {/* Hotel Toggle — FIXED: proper selected color */}
              {pkg.hotelStandards?.length > 1 && (
                <div className="space-y-3">
                  <label className="font-label text-sm font-semibold uppercase tracking-wider text-on-surface-variant">Hotel Standard</label>
                  <div className="flex flex-col gap-2">
                    {pkg.hotelStandards.map((hs) => (
                      <button
                        key={hs.tier}
                        onClick={() => setHotelStandard(hs.tier)}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border cursor-pointer ${hotelStandard === hs.tier
                          ? "bg-yellow-50 text-black border-primary shadow-md shadow-primary/20"
                          : "bg-surface-container-low text-on-surface-variant border-outline-variant/20 hover:border-primary/30 hover:bg-surface-container"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{hs.tier}</span>
                          <span className={`text-xs ${hotelStandard === hs.tier ? 'text-black' : 'text-on-surface-variant/60'}`}>
                            {hs.priceAdjustmentPercent === 0 ? 'Base price' : `${hs.priceAdjustmentPercent}%`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-outline-variant/20 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Estimate per person</span>
                <span className="font-medium">{formatPriceRange(adjustedPrice)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Travelers</span>
                <span className="font-medium">{guests}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-lg">Total Estimate</span>
                <span className="font-headline font-bold text-xl text-primary">
                  {adjustedPrice.currency}{(adjustedPrice.min * guests).toLocaleString('en-IN')} - {adjustedPrice.currency}{(adjustedPrice.max * guests).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* WhatsApp Book Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-5 bg-green-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-green-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Book via WhatsApp
            </a>
            <p className="text-center text-xs text-on-surface-variant font-medium">
              Final pricing will be confirmed upon contact.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default PackageDetail;
