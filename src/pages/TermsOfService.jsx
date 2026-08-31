// src/pages/TermsOfService.jsx
import React from "react";
import SEO from "../components/ui/SEO";

const TermsOfService = () => {
  return (
    <main className="pb-20">
      <SEO title="Terms of Service" description="The terms that apply when you use the Infinity Miles Holiday website and book our travel services." path="/terms-of-service" />
      <header className="max-w-4xl mx-auto px-8 pt-14 pb-10 text-center">
        <p className="font-label uppercase tracking-[0.2em] text-sm mb-4" style={{ color: 'var(--orange-dark)' }}>Legal</p>
        <h1 className="section-title is-centered" style={{ fontSize: "clamp(1.8rem, 1.3rem + 2vw, 2.6rem)" }}>
          Terms of Service
        </h1>
        <p className="text-slate-500 mt-4 text-lg">Last updated: May 2026</p>
      </header>

      <section className="max-w-4xl mx-auto px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12 space-y-8" data-legal="1" style={{ lineHeight: '1.8', color: 'var(--ink-muted)' }}>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>1. Acceptance of Terms</h2>
            <p>By accessing and using the Infinity Miles Holiday website (<strong>infinitymilesholiday.com</strong>), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.</p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>2. Services</h2>
            <p>Infinity Miles Holiday provides travel planning, tour packages, destination information, and booking facilitation services. All services are subject to availability and confirmation.</p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>3. Booking & Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All bookings are subject to availability and confirmation by Infinity Miles Holiday.</li>
              <li>A booking is confirmed only upon receipt of the required deposit or full payment as communicated at the time of booking.</li>
              <li>Prices are subject to change without prior notice until a booking is confirmed.</li>
              <li>All prices are in Indian Rupees (INR) unless otherwise stated.</li>
              <li>Payment can be made through the methods specified at the time of booking.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>4. Travel Documents</h2>
            <p>It is the sole responsibility of the traveller to ensure that they hold valid travel documents including but not limited to passports, visas, travel insurance, and vaccination certificates. Infinity Miles Holiday shall not be responsible for any consequences arising from invalid or missing documents.</p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>5. Cancellation & Refunds</h2>
            <p>Cancellation and refund policies are detailed in our <a href="/privacy-policy" style={{ color: 'var(--orange-dark)', textDecoration: 'underline' }}>Privacy Policy</a> page. By making a booking, you agree to the cancellation charges outlined therein.</p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>6. Liability</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Infinity Miles Holiday acts as an intermediary between travellers and service providers (hotels, airlines, transport companies, etc.).</li>
              <li>We shall not be liable for any loss, damage, injury, accident, delay, or irregularity caused by third-party service providers.</li>
              <li>We are not responsible for any force majeure events including natural disasters, pandemics, political unrest, strikes, or governmental actions that may affect travel plans.</li>
              <li>Our liability is limited to the cost of the booked services.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>7. Traveller Conduct</h2>
            <p>Travellers are expected to behave responsibly and respectfully during tours. Infinity Miles Holiday reserves the right to remove any traveller from a tour without refund if their conduct is deemed disruptive, dangerous, or in violation of local laws and customs.</p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>8. Intellectual Property</h2>
            <p>All content on this website, including text, images, logos, graphics, and design, is the property of Infinity Miles Holiday and is protected by applicable copyright and trademark laws. Unauthorised reproduction or distribution is prohibited.</p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>9. Changes to Terms</h2>
            <p>Infinity Miles Holiday reserves the right to modify these Terms of Service at any time. Changes will be effective upon posting to this page. Continued use of our services constitutes acceptance of the revised terms.</p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>10. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in India.</p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: 'var(--navy)' }}>11. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <div className="bg-slate-50 rounded-lg p-6 mt-3">
              <p className="font-semibold" style={{ color: 'var(--navy)' }}>Infinity Miles Holiday</p>
              <p>Email: <a href="mailto:info.infinitymiles@gmail.com" style={{ color: 'var(--orange-dark)' }}>info.infinitymiles@gmail.com</a></p>
              <p>Phone: <a href="tel:+917291099670" style={{ color: 'var(--orange-dark)' }}>+91 72910 99670</a></p>
              <p>Website: <a href="https://infinitymilesholiday.com" style={{ color: 'var(--orange-dark)' }}>infinitymilesholiday.com</a></p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default TermsOfService;
