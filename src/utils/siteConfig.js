// src/utils/siteConfig.js — single source of truth for brand + navigation
export const BRAND = {
  name: "Infinity Miles Holiday",
  shortName: "Infinity Miles",
  tagline: "Smart Journeys. Infinite Horizons.",
  logoLight: "https://i.postimg.cc/DypvTyC7/logo3.png",
  logoDark: "https://i.postimg.cc/m2Px73S8/logo2.png",
  phoneDisplay: "+91 72910 99670",
  phone: "+917291099670",
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || "917291099670",
  email: "info.infinitymiles@gmail.com",
  city: "Noida, Uttar Pradesh",
  address: "Noida, Uttar Pradesh – 201301, India",
  hours: "Mon–Sun · 9 AM – 9 PM IST",
  socials: {
    facebook:  "https://www.facebook.com/infinitymiles",
    instagram: "https://www.instagram.com/infinitymiles",
    youtube:   "https://www.youtube.com/@infinitymiles",
    whatsapp:  `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || "917291099670"}`,
  },
};

export const promoStrip = "🔥 Summer Sale — Save up to 35% on select holidays";

export const trustStats = [
  { value: "12,000+", label: "Happy Travellers" },
  { value: "100+", label: "Destinations" },
  { value: "4.8/5", label: "Average Rating" },
  { value: "24/7", label: "Expert Support" },
];

export const budgetOptions = [
  { label: "Any Budget", value: "" },
  { label: "Under ₹10,000", value: "0-10000" },
  { label: "₹10,000 – ₹25,000", value: "10000-25000" },
  { label: "₹25,000 – ₹50,000", value: "25000-50000" },
  { label: "₹50,000 – ₹1 Lakh", value: "50000-100000" },
  { label: "Above ₹1 Lakh", value: "100000-1000000" },
];

export const travellerOptions = [
  "1 Person", "2 People", "3 People", "4 People",
  "5 People", "6 People", "7 People", "8+ People",
];

export const quickDestinations = [
  "Kashmir", "Kerala", "Goa", "Rajasthan", "Himachal Pradesh", "Andaman",
  "Bali", "Dubai", "Thailand", "Maldives", "Switzerland", "Vietnam",
  "Singapore", "Paris", "Custom / Other",
];

// ── Mega-menu structure ────────────────────────────────
export const NAV = [
  {
    label: "Domestic Tours",
    to: "/destinations?category=Domestic",
    columns: [
      { title: "North India", links: [
        { label: "Kashmir", to: "/destinations?category=Domestic&search=Kashmir" },
        { label: "Himachal Pradesh", to: "/destinations?category=Domestic&search=Himachal" },
        { label: "Uttarakhand", to: "/destinations?category=Domestic&search=Uttarakhand" },
        { label: "Ladakh", to: "/destinations?category=Domestic&search=Ladakh" },
      ]},
      { title: "South India", links: [
        { label: "Kerala", to: "/destinations?category=Domestic&search=Kerala" },
        { label: "Karnataka", to: "/destinations?category=Domestic&search=Karnataka" },
        { label: "Tamil Nadu", to: "/destinations?category=Domestic&search=Tamil" },
        { label: "Andaman Islands", to: "/destinations?category=Domestic&search=Andaman" },
      ]},
      { title: "West & Central", links: [
        { label: "Goa", to: "/destinations?category=Domestic&search=Goa" },
        { label: "Rajasthan", to: "/destinations?category=Domestic&search=Rajasthan" },
        { label: "Gujarat", to: "/destinations?category=Domestic&search=Gujarat" },
        { label: "Madhya Pradesh", to: "/destinations?category=Domestic&search=Madhya" },
      ]},
      { title: "East & North-East", links: [
        { label: "Meghalaya", to: "/destinations?category=Domestic&search=Meghalaya" },
        { label: "Sikkim", to: "/destinations?category=Domestic&search=Sikkim" },
        { label: "Darjeeling", to: "/destinations?category=Domestic&search=Darjeeling" },
        { label: "Assam", to: "/destinations?category=Domestic&search=Assam" },
      ]},
    ],
  },
  {
    label: "International Tours",
    to: "/destinations?category=International",
    columns: [
      { title: "South-East Asia", links: [
        { label: "Bali", to: "/destinations?category=International&search=Bali" },
        { label: "Thailand", to: "/destinations?category=International&search=Thailand" },
        { label: "Vietnam", to: "/destinations?category=International&search=Vietnam" },
        { label: "Singapore", to: "/destinations?category=International&search=Singapore" },
      ]},
      { title: "Middle East", links: [
        { label: "Dubai", to: "/destinations?category=International&search=Dubai" },
        { label: "Abu Dhabi", to: "/destinations?category=International&search=Abu" },
        { label: "Oman", to: "/destinations?category=International&search=Oman" },
        { label: "Turkey", to: "/destinations?category=International&search=Turkey" },
      ]},
      { title: "Europe", links: [
        { label: "Switzerland", to: "/destinations?category=International&search=Switzerland" },
        { label: "Paris", to: "/destinations?category=International&search=Paris" },
        { label: "Italy", to: "/destinations?category=International&search=Italy" },
        { label: "Greece", to: "/destinations?category=International&search=Greece" },
      ]},
      { title: "Islands", links: [
        { label: "Maldives", to: "/destinations?category=International&search=Maldives" },
        { label: "Mauritius", to: "/destinations?category=International&search=Mauritius" },
        { label: "Seychelles", to: "/destinations?category=International&search=Seychelles" },
        { label: "Sri Lanka", to: "/destinations?category=International&search=Sri" },
      ]},
    ],
  },
  {
    label: "Packages",
    to: "/packages",
    columns: [
      { title: "By Occasion", links: [
        { label: "Honeymoon", to: "/packages?tag=Honeymoon" },
        { label: "Family Holidays", to: "/packages?tag=Family" },
        { label: "Group Tours", to: "/packages?tag=Group" },
        { label: "Corporate & MICE", to: "/packages?tag=Corporate" },
      ]},
      { title: "By Style", links: [
        { label: "Luxury", to: "/packages?type=Heritage" },
        { label: "Adventure", to: "/packages?type=Adventure" },
        { label: "Beach & Island", to: "/packages?type=Island" },
        { label: "Cultural & Heritage", to: "/packages?type=Cultural" },
      ]},
      { title: "By Budget", links: [
        { label: "Under ₹15,000", to: "/packages?maxBudget=15000" },
        { label: "₹15,000 – ₹35,000", to: "/packages?minBudget=15000&maxBudget=35000" },
        { label: "₹35,000 – ₹75,000", to: "/packages?minBudget=35000&maxBudget=75000" },
        { label: "Above ₹75,000", to: "/packages?minBudget=75000" },
      ]},
    ],
  },
  {
    label: "Experiences",
    to: "/destinations",
    columns: [
      { title: "Travel Your Way", links: [
        { label: "Beach Escapes", to: "/destinations?type=Beach" },
        { label: "Mountain Retreats", to: "/destinations?type=Mountain" },
        { label: "Adventure Trails", to: "/destinations?type=Adventure" },
        { label: "Heritage Journeys", to: "/destinations?type=Heritage" },
      ]},
      { title: "More Ideas", links: [
        { label: "Island Getaways", to: "/destinations?type=Island" },
        { label: "City Breaks", to: "/destinations?type=Urban" },
        { label: "Nature & Wildlife", to: "/destinations?type=Nature" },
        { label: "Desert Safaris", to: "/destinations?type=Desert" },
      ]},
    ],
  },
  { label: "About", to: "/about-us" },
  { label: "Contact", to: "/contact" },
];

export const experienceTiles = [
  { label: "Honeymoon", icon: "heart", to: "/packages?tag=Honeymoon", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop" },
  { label: "Adventure", icon: "mountain", to: "/packages?type=Adventure", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop" },
  { label: "Family", icon: "users", to: "/packages?tag=Family", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop" },
  { label: "Luxury", icon: "sparkles", to: "/packages?type=Heritage", img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop" },
  { label: "Beach", icon: "compass", to: "/destinations?type=Beach", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop" },
  { label: "Wildlife", icon: "leaf", to: "/destinations?type=Nature", img: "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=800&auto=format&fit=crop" },
  { label: "Spiritual", icon: "globe", to: "/packages?type=Cultural", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800&auto=format&fit=crop" },
  { label: "City Breaks", icon: "camera", to: "/destinations?type=Urban", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop" },
];

export const whyUs = [
  { icon: "shield", title: "Safe & Fully Vetted", body: "Every hotel, transfer and guide on our roster is checked in person before it reaches your itinerary." },
  { icon: "headset", title: "Real People, Round the Clock", body: "A named trip manager stays reachable before, during and after your holiday — not a chatbot queue." },
  { icon: "wallet", title: "Transparent Pricing", body: "The quote you approve is the price you pay. No surprise supplements the week before departure." },
  { icon: "compass", title: "Built Around You", body: "Tell us your pace, your budget and your must-sees; we design the route from scratch to match." },
  { icon: "hotel", title: "Handpicked Stays", body: "From boutique homestays to five-star resorts, chosen for location and service rather than commission." },
  { icon: "doc", title: "Visa & Documentation", body: "Checklists, appointment slots and application tracking handled by a dedicated documentation desk." },
  { icon: "users", title: "Travellers Who Return", body: "A large share of our bookings come from repeat guests and the friends they send our way." },
  { icon: "leaf", title: "Travel That Gives Back", body: "We favour local operators, community stays and low-impact routes wherever the itinerary allows." },
];

// ── WhatsApp-style traveller feedback (edit freely) ─────
export const feedbackWall = [
  {
    name: "Karan Bhatia", when: "Yesterday", time: "10:32 AM",
    text: "Back from Thailand — 6 nights, 3 cities, everything ran on time. What I appreciated most was the pricing being flat: what you quoted in March is what I paid in August.",
  },
  {
    name: "Nisha Verma", when: "2 days ago", time: "6:45 PM",
    text: "Maldives was unreal. You handled the visa, the seaplane transfer and the resort switch when our first pick was full — and told us about the switch before we had to ask.",
  },
  {
    name: "Sumit & Preethi", when: "3 days ago", time: "2:15 PM",
    text: "We've booked Kashmir through two other agencies before. The difference here was the pace — nobody rushed us out of the houseboat at 6am to tick off another valley.",
  },
  {
    name: "Deepak Pillai", when: "5 days ago", time: "9:00 AM",
    text: "Sent my parents to Switzerland for their anniversary. They're not confident travellers and your team called them at each transfer point. That mattered more than the itinerary.",
  },
];

export const trustBadges = [
  { icon: "shield", label: "Registered travel operator" },
  { icon: "lock", label: "Secure payment options" },
  { icon: "headset", label: "Named planner per booking" },
  { icon: "doc", label: "Visa documentation support" },
];

// Deal expiry windows, in days from today (used by the countdown timers)
export const dealWindows = [12, 21, 34, 47];
