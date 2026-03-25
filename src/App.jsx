// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Destinations from "./pages/Destinations";
import Packages from "./pages/Packages";
import AboutUs from "./pages/AboutUs";
import DestinationDetail from "./pages/DestinationDetail";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
