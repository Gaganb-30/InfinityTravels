// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Destinations from "./pages/Destinations";
import Packages from "./pages/Packages";
import AboutUs from "./pages/AboutUs";
import DestinationDetail from "./pages/DestinationDetail";
import PackageDetail from "./pages/PackageDetail";
import Contact from "./pages/Contact";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDestinations from "./pages/admin/AdminDestinations";
import AdminPackages from "./pages/admin/AdminPackages";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminInquiries from "./pages/admin/AdminInquiries";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public site ── */}
        <Route
          path="/*"
          element={
            <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/destinations/:slug" element={<DestinationDetail />} />
                <Route path="/packages/:slug" element={<PackageDetail />} />
              </Routes>
              <Footer />
            </div>
          }
        />

        {/* ── Admin panel (no Navbar / Footer) ── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="destinations" element={<AdminDestinations />} />
          <Route path="packages" element={<AdminPackages />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="inquiries" element={<AdminInquiries />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
