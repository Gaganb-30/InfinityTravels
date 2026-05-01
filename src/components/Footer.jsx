// src/components/Footer.js
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-50 w-full border-t-0 py-16 px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex flex-col items-start gap-0 mb-6 -mt-8" >
          <Link to="/">
            <img
              src="/logo2.png"
              alt="Infinity Miles Logo"
              className="h-34 w-auto object-contain cursor-pointer"
            />
          </Link>
          {/* <div className="flex gap-1 leading-tight">
            <span className="text-sm font-bold font-headline tracking-tight" style={{ color: '#1B5E96' }}>
              Infinity
            </span>
            <span className="text-sm font-bold font-headline tracking-tight" style={{ color: '#D4782F' }}>
              Miles
            </span>
          </div> */}
        </div>
        <p className="font-inter text-sm text-slate-500 leading-relaxed">
          Redefining modern travel through curated experiences, sustainable
          luxury, and unparalleled local expertise.
        </p>
      </div>
      <div className="col-span-1">
        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest" style={{ color: '#1B5E96' }}>
          Explore
        </h4>
        <ul className="space-y-4 font-inter text-sm text-slate-500">
          <li>
            <Link
              to="/destinations"
              className="hover:text-[#D4782F] transition-colors"
            >
              Destinations
            </Link>
          </li>
          <li>
            <Link
              to="/packages"
              className="hover:text-[#D4782F] transition-colors"
            >
              Tour Packages
            </Link>
          </li>
          <li>
            <a href="#" className="hover:text-[#D4782F] transition-colors">
              Travel Guides
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#D4782F] transition-colors">
              Special Offers
            </a>
          </li>
        </ul>
      </div>
      <div className="col-span-1">
        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest" style={{ color: '#1B5E96' }}>
          Company
        </h4>
        <ul className="space-y-4 font-inter text-sm text-slate-500">
          <li>
            <Link
              to="/about-us"
              className="hover:text-[#D4782F] transition-colors"
            >
              About Us
            </Link>
          </li>
          <li>
            <a href="#" className="hover:text-[#D4782F] transition-colors">
              Sustainability
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#D4782F] transition-colors">
              Partner With Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#D4782F] transition-colors">
              Careers
            </a>
          </li>
        </ul>
      </div>
      <div className="col-span-1">
        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest" style={{ color: '#1B5E96' }}>
          Legal &amp; Contact
        </h4>
        <ul className="space-y-4 font-inter text-sm text-slate-500">
          <li>
            <a href="#" className="hover:text-[#D4782F] transition-colors">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#D4782F] transition-colors">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#D4782F] transition-colors">
              Cookie Policy
            </a>
          </li>
          <li className="pt-4 flex gap-4">
            <span className="material-symbols-outlined cursor-pointer transition-colors" style={{ color: '#1B5E96' }}
              onMouseEnter={(e) => e.target.style.color = '#D4782F'}
              onMouseLeave={(e) => e.target.style.color = '#1B5E96'}
            >
              public
            </span>
            <span className="material-symbols-outlined cursor-pointer transition-colors" style={{ color: '#1B5E96' }}
              onMouseEnter={(e) => e.target.style.color = '#D4782F'}
              onMouseLeave={(e) => e.target.style.color = '#1B5E96'}
            >
              mail
            </span>
            <span className="material-symbols-outlined cursor-pointer transition-colors" style={{ color: '#1B5E96' }}
              onMouseEnter={(e) => e.target.style.color = '#D4782F'}
              onMouseLeave={(e) => e.target.style.color = '#1B5E96'}
            >
              call
            </span>
          </li>
        </ul>
      </div>
      <div className="col-span-1 md:col-span-4 pt-12 border-t border-slate-200 mt-4 text-center">
        <p className="font-inter text-sm text-slate-500">
          © {new Date().getFullYear()} Infinity Travels. Explore the World.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
