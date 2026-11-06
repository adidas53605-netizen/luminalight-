import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles,
  Sun,
  Moon,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { 
    cartCount, 
    wishlistCount, 
    setIsCartOpen, 
    setIsSearchOpen,
    ambientLighting,
    setAmbientLighting 
  } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-charcoal text-warm-50 text-xs py-2 px-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center space-x-2 text-gold-300">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="tracking-wide uppercase font-medium text-[11px]">Architectural Lighting Excellence</span>
          </div>

          <p className="text-center w-full sm:w-auto text-warm-200 text-xs font-light tracking-wide">
            Complimentary White-Glove Delivery across India on orders over ₹25,000 • Code: <span className="font-semibold text-gold-400">LUMINA10</span>
          </p>

          <div className="hidden md:flex items-center space-x-4 text-warm-300 text-[11px]">
            <span>Worli Showroom: +91 22 4988 7700</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'glass-panel shadow-sm border-b border-warm-200/60 py-3.5' 
            : 'bg-warm-50/95 backdrop-blur-md py-5 border-b border-warm-200/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Mobile Menu Trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-charcoal hover:text-gold transition-colors focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="group flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-charcoal text-gold-400 flex items-center justify-center shadow-md group-hover:bg-charcoal-800 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold tracking-tight text-charcoal group-hover:text-gold-600 transition-colors">
                    Lumina<span className="text-gold-500 font-light italic">Light</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-charcoal-400 -mt-1 font-medium">
                    Atelier & Living
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm tracking-wide font-medium transition-colors relative py-1 ${
                    isActive(link.path)
                      ? 'text-charcoal font-semibold'
                      : 'text-charcoal-600 hover:text-gold-600'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold rounded-full transition-all" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              
              {/* Ambience Lighting Mode Toggle */}
              <button
                type="button"
                onClick={() => setAmbientLighting(prev => prev === 'warm' ? 'natural' : 'warm')}
                className="p-2 text-charcoal-600 hover:text-gold transition-colors hidden sm:flex items-center rounded-full hover:bg-warm-100"
                title={`Ambient Warmth: ${ambientLighting === 'warm' ? 'Warm Golden (2700K)' : 'Natural Studio (3500K)'}`}
                aria-label="Toggle ambient lighting"
              >
                {ambientLighting === 'warm' ? (
                  <Sun className="w-5 h-5 text-gold-500 fill-gold-200" />
                ) : (
                  <Moon className="w-5 h-5 text-charcoal-500" />
                )}
              </button>

              {/* Search Button */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-charcoal-700 hover:text-gold transition-colors rounded-full hover:bg-warm-100"
                aria-label="Search luminaires"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="p-2 text-charcoal-700 hover:text-gold transition-colors relative rounded-full hover:bg-warm-100"
                aria-label="Curated Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-gold-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm animate-pulse-subtle">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-charcoal-700 hover:text-gold transition-colors relative rounded-full hover:bg-warm-100 flex items-center"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-charcoal text-gold-300 text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-warm-50 shadow-2xl z-50 p-6 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-warm-200">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2">
                  <span className="font-serif text-2xl font-bold tracking-tight text-charcoal">
                    Lumina<span className="text-gold-500 font-light italic">Light</span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-charcoal-500 hover:text-charcoal rounded-md"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="mt-8 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-warm-100 text-charcoal font-semibold'
                        : 'text-charcoal-600 hover:bg-warm-100 hover:text-gold-600'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-charcoal-400" />
                  </Link>
                ))}
              </nav>

              {/* Direct Quick Shortcuts */}
              <div className="mt-8 pt-6 border-t border-warm-200 space-y-3">
                <Link
                  to="/wishlist"
                  className="flex items-center justify-between px-3 py-2 text-sm text-charcoal-600 hover:text-gold"
                >
                  <div className="flex items-center space-x-3">
                    <Heart className="w-4 h-4 text-gold-500" />
                    <span>My Wishlist</span>
                  </div>
                  <span className="text-xs bg-warm-200 px-2 py-0.5 rounded-full font-semibold">{wishlistCount}</span>
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center justify-between px-3 py-2 text-sm text-charcoal-600 hover:text-gold"
                >
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="w-4 h-4 text-gold-500" />
                    <span>Shopping Bag</span>
                  </div>
                  <span className="text-xs bg-warm-200 px-2 py-0.5 rounded-full font-semibold">{cartCount}</span>
                </Link>
              </div>
            </div>

            {/* Footer Support Info */}
            <div className="pt-6 border-t border-warm-200 text-xs text-charcoal-500 space-y-2">
              <p className="font-medium text-charcoal">Architectural Concierge</p>
              <p>Mon - Sat: 10:00 AM - 8:00 PM IST</p>
              <p className="text-gold-600 font-medium">concierge@luminalight.in</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
