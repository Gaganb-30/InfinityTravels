import Navbar from "./Navbar";
import Footer from "./Footer";
// import WhatsAppButton from './WhatsAppButton'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
