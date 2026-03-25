// src/pages/Contact.js
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Plan a new trip",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would integrate with an API or email service
    alert("Thank you! Our team will reach out shortly.");
    setFormData({
      name: "",
      email: "",
      subject: "Plan a new trip",
      message: "",
    });
  };

  return (
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-8 py-16 text-center md:text-left">
        <p className="text-secondary font-label uppercase tracking-[0.2em] text-sm mb-4">
          Get in touch
        </p>
        <h1 className="font-headline text-5xl md:text-7xl text-on-surface font-bold tracking-tight leading-tight">
          Start Your <br className="hidden md:block" /> Journey with Us
        </h1>
      </header>

      {/* Contact Content Grid */}
      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block font-label text-sm text-on-surface-variant tracking-wider uppercase">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline/50"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label text-sm text-on-surface-variant tracking-wider uppercase">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline/50"
                  placeholder="hello@voyage.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block font-label text-sm text-on-surface-variant tracking-wider uppercase">
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
              >
                <option>Plan a new trip</option>
                <option>Corporate travel</option>
                <option>Booking inquiry</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block font-label text-sm text-on-surface-variant tracking-wider uppercase">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
                className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline/50"
                placeholder="Tell us about your dream destination..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="editorial-gradient text-white w-full md:w-auto px-12 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-3"
            >
              Send Message
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>

        {/* Right: Info & Socials */}
        <div className="lg:col-span-5 space-y-12">
          {/* Contact Cards */}
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">
                  phone_iphone
                </span>
              </div>
              <div>
                <h4 className="font-headline text-xl mb-1">Call Us</h4>
                <p className="text-on-surface-variant text-lg font-light">
                  +1 (800) 555-0199
                </p>
                <p className="text-on-surface-variant text-sm mt-1">
                  Mon-Fri, 9am - 6pm EST
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">mail</span>
              </div>
              <div>
                <h4 className="font-headline text-xl mb-1">Email Us</h4>
                <p className="text-on-surface-variant text-lg font-light">
                  concierge@infinitymiles.com
                </p>
                <p className="text-on-surface-variant text-sm mt-1">
                  Response within 24 hours
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">
                  location_on
                </span>
              </div>
              <div>
                <h4 className="font-headline text-xl mb-1">Visit Us</h4>
                <p className="text-on-surface-variant text-lg font-light">
                  72 Madison Avenue, 14th Floor
                </p>
                <p className="text-on-surface-variant text-sm mt-1">
                  New York, NY 10016
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="pt-8 border-t-0 bg-surface-container-low p-8 rounded-xl">
            <h4 className="font-headline text-2xl mb-6">Join Our Community</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full border border-outline/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full border border-outline/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.132 0 3.771-2.249 3.771-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.397 2.966 7.397 6.93 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full border border-outline/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mt-24 max-w-7xl mx-auto px-8">
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 bg-slate-200 grayscale opacity-80"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjap9Z2HNdzykR7wRfehDm1d1H0ekv-LLm1TaYAvIuF8J2_cGe-h-Z-c3LgMi4N8E0Wgo2dBjp-5ZBQO1xD_qHvbGirlB06cCOedTgCgHmjxOLmysjLHG79LqmlyT4H5YP2p3pBHLzB2QhMa32l6Efp7AoxaLLXxTZk8UD_X4HaIbHFIOcgjGzS2PHyWGoyIKRbnHqRYvxS00y7YdbBVNaC5_mvoYrItN_LzHB8KCXZoRHiyyzVL6mWpAoMoWUvCQwSZSiIbGsP4S_')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          {/* Interactive Overlay Pins */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping"></div>
              <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </div>
              <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
                <p className="font-headline text-sm font-bold">
                  Infinity Miles HQ
                </p>
              </div>
            </div>
          </div>
          {/* Map Branding Overlays */}
          <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-xs hidden md:block border border-outline-variant/20">
            <h5 className="font-headline font-bold text-lg mb-2">Our Studio</h5>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              Located in the heart of the Flatiron District, we're ready to
              design your next masterpiece.
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold text-sm hover:underline flex items-center gap-2"
            >
              Get Directions
              <span className="material-symbols-outlined text-sm">
                open_in_new
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
