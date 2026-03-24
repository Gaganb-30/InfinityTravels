// const Footer = () => {
//   return <div>Footer</div>;
// };

// export default Footer;

// src/components/Footer.js
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-50 w-full border-t-0 py-16 px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="text-xl font-noto-serif text-sky-900 dark:text-white mb-6 font-bold">
          Infinity Miles Travel
        </div>
        <p className="font-inter text-sm text-slate-500 leading-relaxed">
          Redefining modern travel through curated experiences, sustainable
          luxury, and unparalleled local expertise.
        </p>
      </div>
      <div className="col-span-1">
        <h4 className="text-sky-900 font-bold mb-6 text-sm uppercase tracking-widest">
          Explore
        </h4>
        <ul className="space-y-4 font-inter text-sm text-slate-500">
          <li>
            <Link
              to="/destinations"
              className="hover:text-sky-600 transition-colors"
            >
              Destinations
            </Link>
          </li>
          <li>
            <Link
              to="/packages"
              className="hover:text-sky-600 transition-colors"
            >
              Tour Packages
            </Link>
          </li>
          <li>
            <a href="#" className="hover:text-sky-600 transition-colors">
              Travel Guides
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-sky-600 transition-colors">
              Special Offers
            </a>
          </li>
        </ul>
      </div>
      <div className="col-span-1">
        <h4 className="text-sky-900 font-bold mb-6 text-sm uppercase tracking-widest">
          Company
        </h4>
        <ul className="space-y-4 font-inter text-sm text-slate-500">
          <li>
            <Link
              to="/about-us"
              className="hover:text-sky-600 transition-colors"
            >
              About Us
            </Link>
          </li>
          <li>
            <a href="#" className="hover:text-sky-600 transition-colors">
              Sustainability
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-sky-600 transition-colors">
              Partner With Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-sky-600 transition-colors">
              Careers
            </a>
          </li>
        </ul>
      </div>
      <div className="col-span-1">
        <h4 className="text-sky-900 font-bold mb-6 text-sm uppercase tracking-widest">
          Legal &amp; Contact
        </h4>
        <ul className="space-y-4 font-inter text-sm text-slate-500">
          <li>
            <a href="#" className="hover:text-sky-600 transition-colors">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-sky-600 transition-colors">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-sky-600 transition-colors">
              Cookie Policy
            </a>
          </li>
          <li className="pt-4 flex gap-4">
            <span className="material-symbols-outlined text-sky-700 cursor-pointer hover:text-sky-500">
              public
            </span>
            <span className="material-symbols-outlined text-sky-700 cursor-pointer hover:text-sky-500">
              mail
            </span>
            <span className="material-symbols-outlined text-sky-700 cursor-pointer hover:text-sky-500">
              call
            </span>
          </li>
        </ul>
      </div>
      <div className="col-span-1 md:col-span-4 pt-12 border-t border-slate-200 mt-4 text-center">
        <p className="font-inter text-sm text-slate-500">
          © {new Date().getFullYear()} Infinity Miles Travel. Explore the World.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
