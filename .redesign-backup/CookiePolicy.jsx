// src/pages/CookiePolicy.jsx
import React from "react";

const CookiePolicy = () => {
  return (
    <main className="pt-32 pb-20">
      <header className="max-w-4xl mx-auto px-8 py-16 text-center">
        <p className="font-label uppercase tracking-[0.2em] text-sm mb-4" style={{ color: '#D4782F' }}>Legal</p>
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight leading-tight" style={{ color: '#1e293b' }}>
          Cookie Policy
        </h1>
        <p className="text-slate-500 mt-4 text-lg">Last updated: May 2026</p>
      </header>

      <section className="max-w-4xl mx-auto px-8">
        <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 space-y-8" style={{ lineHeight: '1.8', color: '#334155' }}>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: '#1B5E96' }}>1. What Are Cookies?</h2>
            <p>Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website. They help the website remember your preferences and improve your browsing experience.</p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: '#1B5E96' }}>2. How We Use Cookies</h2>
            <p className="mb-3">Infinity Miles Holiday (<strong>infinitymilesholiday.com</strong>) uses cookies for the following purposes:</p>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-5">
                <h4 className="font-semibold mb-1" style={{ color: '#1B5E96' }}>Essential Cookies</h4>
                <p className="text-sm">These are necessary for the website to function properly. They enable basic features like page navigation and secure access. The website cannot function properly without these cookies.</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-5">
                <h4 className="font-semibold mb-1" style={{ color: '#1B5E96' }}>Analytics Cookies</h4>
                <p className="text-sm">These cookies help us understand how visitors interact with our website by collecting anonymous information. This helps us improve our website's performance and user experience.</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-5">
                <h4 className="font-semibold mb-1" style={{ color: '#1B5E96' }}>Functional Cookies</h4>
                <p className="text-sm">These cookies allow the website to remember choices you make (such as your preferred language or region) and provide enhanced, more personalised features.</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-5">
                <h4 className="font-semibold mb-1" style={{ color: '#1B5E96' }}>Marketing Cookies</h4>
                <p className="text-sm">These cookies track your online activity to help deliver more relevant advertising or limit the number of times you see an advertisement. We may share this information with third parties for this purpose.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: '#1B5E96' }}>3. Third-Party Cookies</h2>
            <p>Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. Third-party services we may use include:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Google Analytics (for website usage analysis)</li>
              <li>Social media platforms (for sharing and engagement)</li>
              <li>WhatsApp Business (for customer communication)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: '#1B5E96' }}>4. Managing Cookies</h2>
            <p className="mb-3">You can control and manage cookies in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Browser Settings:</strong> Most browsers allow you to view, manage, delete, and block cookies. Please note that blocking certain cookies may impact website functionality.</li>
              <li><strong>Opt-Out Links:</strong> Some third-party services provide opt-out mechanisms. For example, you can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: '#D4782F', textDecoration: 'underline' }}>Google Analytics Opt-out Browser Add-on</a>.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: '#1B5E96' }}>5. Changes to This Policy</h2>
            <p>We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will be posted on this page with an updated revision date.</p>
          </div>

          <div>
            <h2 className="font-headline text-2xl font-bold mb-4" style={{ color: '#1B5E96' }}>6. Contact Us</h2>
            <p>If you have any questions about our use of cookies, please contact us:</p>
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

export default CookiePolicy;
