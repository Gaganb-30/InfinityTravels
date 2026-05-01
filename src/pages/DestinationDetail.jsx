// src/pages/DestinationDetail.js
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
        <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={altText} src={images[0]} />
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

const DestinationDetail = () => {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("919310798965");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getDestination(slug);
        setDestination(data.destination);
        setPackages(data.packages || []);
        const config = await api.getWhatsAppNumber();
        setWhatsappNumber(config.whatsappNumber);
      } catch (err) {
        console.error("Failed to fetch destination:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-12 w-60 bg-surface-container-low animate-pulse rounded mb-4" />
        <div className="h-16 w-96 bg-surface-container-low animate-pulse rounded mb-8" />
        <div className="h-[500px] bg-surface-container-low animate-pulse rounded-xl" />
      </main>
    );
  }

  if (!destination) {
    return (
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-12 text-center py-32">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">travel_explore</span>
        <h2 className="font-headline text-3xl text-slate-400">Destination not found</h2>
        <Link to="/destinations" className="text-primary font-semibold mt-4 inline-block hover:underline">
          ← Back to Destinations
        </Link>
      </main>
    );
  }

  // Collect all unique images for carousel
  const allImages = [destination.heroImage, ...(destination.galleryImages || [])].filter(Boolean);
  const hasMultipleImages = allImages.length > 1;

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 md:px-12">
      {/* Header Section */}
      <header className="mb-12">
        <nav className="flex items-center gap-2 mb-4 text-on-surface-variant text-sm font-label uppercase tracking-widest">
          <Link to="/destinations" className="hover:text-primary transition-colors">{destination.continent}</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span>{destination.country}</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary font-semibold">{destination.name}</span>
        </nav>
        <h1 className="font-headline text-5xl md:text-6xl text-on-surface font-bold tracking-tight mb-4">
          {destination.name}: {destination.tagline || 'A Curated Horizon'}
        </h1>
        <div className="flex items-center gap-6 text-on-surface-variant flex-wrap">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">location_on</span>
            <span className="text-sm font-medium">{destination.country}, {destination.continent}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">category</span>
            <span className="text-sm font-medium">{destination.type}</span>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${destination.category === 'Domestic' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
            }`}>
            {destination.category}
          </span>
          <span className="bg-secondary-container/10 text-on-secondary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            {destination.tier}
          </span>
        </div>
      </header>

      {/* Gallery — Carousel when multiple images, single image otherwise */}
      <section className="mb-16">
        {hasMultipleImages ? (
          <ImageCarousel images={allImages} altText={destination.name} />
        ) : (
          <div className="h-[500px] overflow-hidden rounded-xl bg-surface-container">
            <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={destination.name} src={destination.heroImage} />
          </div>
        )}
      </section>

      {/* Description */}
      <section className="mb-16 max-w-4xl">
        <h2 className="font-headline text-3xl font-bold mb-6">About {destination.name}</h2>
        <p className="text-lg text-on-surface-variant leading-relaxed">{destination.description}</p>
        {destination.seasons?.length > 0 && (
          <div className="flex gap-2 mt-6">
            <span className="text-sm font-semibold text-on-surface-variant mr-2">Best Seasons:</span>
            {destination.seasons.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">{s}</span>
            ))}
          </div>
        )}
      </section>

      {/* Packages for this destination */}
      {packages.length > 0 && (
        <section className="mb-16">
          <h2 className="font-headline text-3xl font-bold mb-8">
            Packages in {destination.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg._id} className="bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow transition-all hover:shadow-2xl">
                <div className="h-52 overflow-hidden relative">
                  <img alt={pkg.name} className="w-full h-full object-cover" src={pkg.image} />
                  {pkg.badge && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                      {pkg.badge}
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                    {pkg.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-headline text-xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-on-surface-variant text-sm mb-4 leading-relaxed line-clamp-2">{pkg.description}</p>

                  {/* Package Tags */}
                  {pkg.tags?.length > 0 && (
                    <div className="flex gap-1.5 mb-4 flex-wrap">
                      {pkg.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-blue-50 text-[#1B5E96] text-[10px] font-semibold">{tag}</span>
                      ))}
                      {pkg.tags.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 text-[10px] font-semibold">+{pkg.tags.length - 3}</span>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400">Estimate</span>
                      <span className="text-lg font-bold text-primary">{formatPriceRange(pkg.priceRange)}</span>
                    </div>
                    <Link to={`/packages/${pkg.slug}`} className="text-primary font-bold text-sm uppercase tracking-widest hover:underline">
                      Details
                    </Link>
                  </div>
                  <a
                    href={generateWhatsAppLink({
                      whatsappNumber,
                      packageName: pkg.name,
                      destination: destination.name,
                      priceRange: pkg.priceRange,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    Book via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-slate-900 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #1B5E96 0%, transparent 50%)" }}></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl text-white mb-4">Interested in {destination.name}?</h2>
          <p className="text-slate-400 text-lg mb-8">Contact us to plan your perfect trip to {destination.name}, {destination.country}.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact" className="bg-primary-container text-on-primary-container px-10 py-4 rounded-full font-bold hover:brightness-110 transition-all">
              Contact Us
            </Link>
            <a
              href={generateWhatsAppLink({
                whatsappNumber,
                destination: `${destination.name}, ${destination.country}`,
                packageName: 'Custom Trip',
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-10 py-4 rounded-full font-bold hover:bg-green-700 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DestinationDetail;
