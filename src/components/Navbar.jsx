// import React from "react";

// const Navbar = () => {
//   return (
//     <header className="mb-5 bg-amber-100 min-h-10">
//       <div className="flex justify-between items-center py-2 px-5">
//         <div className="logo">Logo</div>
//         <div className="Options flex justify-between gap-5">
//           <div>Home</div>
//           <div>Packages</div>
//           <div>Destinations</div>
//           <div>About Us</div>
//           <div>Contact </div>
//         </div>
//         <div className="search">
//           <button className="rounded-3xl bg-blue-800 px-3 py-1">
//             Book Now
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// src/components/Navbar.js
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Packages", path: "/packages" },
    { name: "About Us", path: "/about-us" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav shadow-sm">
      <div className="flex justify-between items-center px-8 py-4 max-w-full mx-auto">
        <Link
          to="/"
          className="text-2xl font-bold font-headline text-sky-900 tracking-tight"
        >
          Infinity Miles Travel
        </Link>
        <div className="hidden md:flex items-center space-x-8 font-label text-lg tracking-tight">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors duration-300 pb-1 ${
                isActive(link.path)
                  ? "text-sky-700 font-semibold border-b-2 border-sky-700"
                  : "text-slate-600 hover:text-sky-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-6">
          <button className="material-symbols-outlined text-slate-600 hover:text-sky-500 transition-colors">
            search
          </button>
          <button className="cta-gradient text-white px-6 py-2.5 rounded-full font-medium transition-transform active:scale-95 shadow-md hover:shadow-lg">
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
