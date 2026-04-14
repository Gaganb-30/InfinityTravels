// src/pages/Contact.js
import React, { useState } from "react";
import { api } from "../utils/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Plan a new trip",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const result = await api.submitContact(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "Plan a new trip", message: "" });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-8 py-16 text-center md:text-left">
        <p className="text-secondary font-label uppercase tracking-[0.2em] text-sm mb-4">Get in touch</p>
        <h1 className="font-headline text-5xl md:text-7xl text-on-surface font-bold tracking-tight leading-tight">
          Start Your <br className="hidden md:block" /> Journey with Us
        </h1>
      </header>

      {/* Contact Content Grid */}
      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-sm">
          {submitted ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-green-500 text-6xl mb-4 block">check_circle</span>
              <h3 className="font-headline text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-on-surface-variant mb-6">Your inquiry has been submitted successfully. Our team will reach out shortly.</p>
              <button onClick={() => setSubmitted(false)} className="text-primary font-semibold hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block font-label text-sm text-on-surface-variant tracking-wider uppercase">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline/50 outline-none" placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <label className="block font-label text-sm text-on-surface-variant tracking-wider uppercase">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline/50 outline-none" placeholder="hello@voyage.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block font-label text-sm text-on-surface-variant tracking-wider uppercase">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline/50 outline-none" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <label className="block font-label text-sm text-on-surface-variant tracking-wider uppercase">Subject</label>
                  <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all">
                    <option>Plan a new trip</option>
                    <option>Corporate travel</option>
                    <option>Booking inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label text-sm text-on-surface-variant tracking-wider uppercase">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="6" required className="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-outline/50 outline-none" placeholder="Tell us about your dream destination..."></textarea>
              </div>
              <button type="submit" disabled={submitting} className="editorial-gradient text-white w-full md:w-auto px-12 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                {submitting ? 'Sending...' : 'Send Message'}
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Info & Socials */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">phone_iphone</span>
              </div>
              <div>
                <h4 className="font-headline text-xl mb-1">Call Us</h4>
                <p className="text-on-surface-variant text-lg font-light">+91 98765 43210</p>
                <p className="text-on-surface-variant text-sm mt-1">Mon-Sat, 10am - 7pm IST</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">mail</span>
              </div>
              <div>
                <h4 className="font-headline text-xl mb-1">Email Us</h4>
                <p className="text-on-surface-variant text-lg font-light">concierge@infinitymiles.com</p>
                <p className="text-on-surface-variant text-sm mt-1">Response within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <h4 className="font-headline text-xl mb-1">WhatsApp</h4>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-green-600 text-lg font-light hover:underline">
                  +91 98765 43210
                </a>
                <p className="text-on-surface-variant text-sm mt-1">Quick response on WhatsApp</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="pt-8 border-t-0 bg-surface-container-low p-8 rounded-xl">
            <h4 className="font-headline text-2xl mb-6">Join Our Community</h4>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-outline/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-outline/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-outline/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all" aria-label="YouTube">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
