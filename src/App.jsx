import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Categories } from './pages/Categories';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { Wishlist } from './pages/Wishlist';
import { Cart } from './pages/Cart';

// Helper component that scrolls to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

// Layout wrapper that reflects ambient warmth settings
function AppContent() {
  const { ambientLighting } = useShop();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${
      ambientLighting === 'warm' 
        ? 'bg-[#FAF8F5]' 
        : 'bg-[#FDFCFA]'
    }`}>
      <ScrollToTop />
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Page Outlet */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Modals & Drawers */}
      <QuickViewModal />
      <SearchModal />
      <CartDrawer />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </Router>
  );
}
