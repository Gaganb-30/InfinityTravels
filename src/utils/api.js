const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE = `${BACKEND_URL.replace(/\/+$/, '')}/api`;

export const api = {
  // Destinations
  async getDestinations(filters = {}) {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_BASE}/destinations?${params}`);
    return res.json();
  },

  async getFeaturedDestinations() {
    const res = await fetch(`${API_BASE}/destinations/featured`);
    return res.json();
  },

  async getDestination(slug) {
    const res = await fetch(`${API_BASE}/destinations/${slug}`);
    return res.json();
  },

  async getCountries() {
    const res = await fetch(`${API_BASE}/destinations/countries`);
    return res.json();
  },

  // Packages
  async getPackages(filters = {}) {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_BASE}/packages?${params}`);
    return res.json();
  },

  async getPopularPackages() {
    const res = await fetch(`${API_BASE}/packages/popular`);
    return res.json();
  },

  async getPackage(slug) {
    const res = await fetch(`${API_BASE}/packages/${slug}`);
    return res.json();
  },

  // Testimonials
  async getTestimonials(limit) {
    const params = limit ? `?limit=${limit}` : '';
    const res = await fetch(`${API_BASE}/testimonials${params}`);
    return res.json();
  },

  // Search
  async search(query) {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
    return res.json();
  },

  // Contact
  async submitContact(data) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // WhatsApp config
  async getWhatsAppNumber() {
    const res = await fetch(`${API_BASE}/config/whatsapp`);
    return res.json();
  },
};
