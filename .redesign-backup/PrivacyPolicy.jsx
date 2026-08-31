// src/pages/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="pt-32 pb-20">
      <header className="max-w-4xl mx-auto px-8 py-16 text-center">
        <p className="font-label uppercase tracking-[0.2em] text-sm mb-4" style={{ color: '#D4782F' }}>Legal</p>
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight leading-tight" style={{ color: '#1e293b' }}>
          Privacy Policy
        </h1>
        <p className="text-slate-500 mt-4 text-lg">Last updated: May 2026</p>
      </header>

      <section className="max-w-4xl mx-auto px-8">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 space-y-8" style={{ lineHeight: '1.8', color: '#334155' }}>

          <div>
            <p className="text-lg text-slate-600 italic mb-8">
              Going beyond sightseeing, our tours are crafted to immerse you in stories, cultures, and experiences that move you. Each journey is a thoughtfully designed package that excites, engages, and celebrates the joy of true discovery.
            </p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: '#1B5E96' }}>1. Information We Collect</h2>
            <p className="mb-3">At Infinity Miles Holiday (<strong>infinitymilesholiday.com</strong>), we collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and any other information you provide when filling out our contact form or booking inquiries.</li>
              <li><strong>Usage Data:</strong> Browser type, device information, pages visited, time spent on pages, and other analytics data collected through cookies and similar technologies.</li>
              <li><strong>Communication Data:</strong> Records of correspondence when you contact us via email, phone, or WhatsApp.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: '#1B5E96' }}>2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To process and respond to your travel inquiries and bookings</li>
              <li>To send you confirmation emails and booking-related communications</li>
              <li>To improve our website, services, and customer experience</li>
              <li>To send promotional offers and travel updates (only with your consent)</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: '#1B5E96' }}>3. Cancellation & Refund Policy</h2>

            <h3 className="font-semibold text-lg mb-3">(a) Cancellation of the entire tour by the Company</h3>
            <p className="mb-4">Every tour requires a minimum number of passengers to operate. If minimum numbers are not achieved, the tour may be cancelled by the Company on short notice. In such cases, we will offer you alternative tour dates / tours or you would have the option of travelling as individual travellers, not as part of the original tours. If the alternative date / tour is not acceptable or you do not wish to travel as individual travellers, we would refund the money paid by you without interest after deducting any costs incurred by us on your behalf, within a period of thirty days from the date of cancellation.</p>

            <h3 className="font-semibold text-lg mb-3">(b) Cancellation of booking(s) by the Company with cause</h3>
            <p className="mb-4">The Company reserves the right to cancel booking(s) of a Traveller or a group of Travellers in case these Travellers violate the Terms and Conditions of the booking, or default on some parts, such as delay in payments, failure to get visa, failure to get insurance, or No Show. The Company shall not be liable, at any time for any, direct, indirect, incidental, or consequential damages.</p>

            <h3 className="font-semibold text-lg mb-3">(c) Cancellation by the Traveller</h3>
            <p className="mb-4">If you wish to cancel your booking, you must inform us in writing. Such notification shall be deemed to have been given to us only on the date of the receipt of your letter, since we can act only on receipt.</p>

            <h3 className="font-semibold text-lg mb-3">(d) Cancellation Charges</h3>
            <p className="mb-3">The following cancellation charges shall apply irrespective of the reason for cancellation:</p>

            <div className="bg-slate-50 rounded-lg p-6 mb-4">
              <h4 className="font-semibold mb-3" style={{ color: '#1B5E96' }}>For trips excluding cruises:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between border-b border-slate-200 pb-2">
                  <span>Up to 75 days prior to departure</span>
                  <span className="font-semibold">₹10,000 + visa/ticket charges</span>
                </li>
                <li className="flex justify-between border-b border-slate-200 pb-2">
                  <span>74 to 45 days prior to departure</span>
                  <span className="font-semibold">75% of Package Cost</span>
                </li>
                <li className="flex justify-between border-b border-slate-200 pb-2">
                  <span>44 days or less prior to departure</span>
                  <span className="font-semibold">100% of Package Cost</span>
                </li>
                <li className="flex justify-between">
                  <span>No Show on the tour</span>
                  <span className="font-semibold">100% of Package Cost</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 mb-4">
              <h4 className="font-semibold mb-3" style={{ color: '#1B5E96' }}>For trips including cruises:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between border-b border-slate-200 pb-2">
                  <span>Up to 150 days prior to departure</span>
                  <span className="font-semibold">₹20,000 + visa/ticket charges</span>
                </li>
                <li className="flex justify-between border-b border-slate-200 pb-2">
                  <span>149 to 75 days prior to departure</span>
                  <span className="font-semibold">50% of Package Cost</span>
                </li>
                <li className="flex justify-between border-b border-slate-200 pb-2">
                  <span>74 to 45 days prior to departure</span>
                  <span className="font-semibold">75% of Package Cost</span>
                </li>
                <li className="flex justify-between border-b border-slate-200 pb-2">
                  <span>44 days or less prior to departure</span>
                  <span className="font-semibold">100% of Package Cost</span>
                </li>
                <li className="flex justify-between">
                  <span>No Show on the tour</span>
                  <span className="font-semibold">100% of Package Cost</span>
                </li>
              </ul>
            </div>

            <h3 className="font-semibold text-lg mb-3">(e) Visa Delays</h3>
            <p className="mb-4">In case of visa delay or refusal leading to your inability to partake the tour, you would be deemed to have cancelled on the date of intimation of such rejection.</p>

            <h3 className="font-semibold text-lg mb-3">(f) Visa-related Cancellation Charges</h3>
            <p className="mb-4">In case of delay or refusal of visa resulting in cancellation / deviation of tour immediately before original departure date, cancellation / re-booking charges must be borne by the Traveller.</p>

            <h3 className="font-semibold text-lg mb-3">(g) Payment Default</h3>
            <p>If you fail to pay the tour costs on time or if you commit any other default in relation to your booking, Infinity Miles Holiday reserves the right to cancel your booking with cause. In such cases, the cancellation charges shall be computed with reference to the date on which we issue you a notice of cancellation. If no notice of cancellation is issued by us, but your payment or default remains outstanding on the date of departure, the booking shall be deemed to have been cancelled by you without any advance notice, inviting the highest cancellation charge.</p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: '#1B5E96' }}>4. Data Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: '#1B5E96' }}>5. Third-Party Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required to provide our services (e.g., hotel bookings, airline reservations) or comply with law.</p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: '#1B5E96' }}>6. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and receive a copy of your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: '#1B5E96' }}>7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <div className="bg-slate-50 rounded-lg p-6 mt-3">
              <p className="font-semibold" style={{ color: '#1B5E96' }}>Infinity Miles Holiday</p>
              <p>Email: <a href="mailto:info.infinitymiles@gmail.com" style={{ color: '#D4782F' }}>info.infinitymiles@gmail.com</a></p>
              <p>Phone: <a href="tel:+917291099670" style={{ color: '#D4782F' }}>+91 72910 99670</a></p>
              <p>Website: <a href="https://infinitymilesholiday.com" style={{ color: '#D4782F' }}>infinitymilesholiday.com</a></p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
