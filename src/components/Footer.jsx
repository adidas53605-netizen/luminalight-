import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-charcoal text-warm-100 pt-16 pb-12 border-t border-charcoal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges / Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-charcoal-800">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center text-gold-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-warm-50">5-Year LuminaCare</h4>
              <p className="text-xs text-charcoal-300">Complete warranty on all fixtures</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center text-gold-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-warm-50">White-Glove Delivery</h4>
              <p className="text-xs text-charcoal-300">Pan-India protected transit</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center text-gold-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-warm-50">Lighting Consultations</h4>
              <p className="text-xs text-charcoal-300">Complimentary 1-on-1 advice</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center text-gold-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-warm-50">Artisan Craftsmanship</h4>
              <p className="text-xs text-charcoal-300">Solid brass & hand-blown glass</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-charcoal-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-gold text-charcoal-900 flex items-center justify-center shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-warm-50">
                Lumina<span className="text-gold-400 font-light italic">Light</span>
              </span>
            </Link>

            <p className="text-sm text-charcoal-300 leading-relaxed max-w-sm">
              LuminaLight crafts architectural luminaires for distinctive spaces. Rooted in mindful minimalism, each design harmonizes radiant warmth with sculptural sophistication.
            </p>

            <div className="pt-2">
              <p className="text-xs uppercase tracking-wider text-charcoal-400 font-semibold mb-3">Connect With Us</p>
              <div className="flex items-center space-x-3">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal transition-colors flex items-center justify-center text-warm-200" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal transition-colors flex items-center justify-center text-warm-200" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="mailto:concierge@luminalight.in" className="w-9 h-9 rounded-full bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal transition-colors flex items-center justify-center text-warm-200" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gold-400 font-sans">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal-300">
              <li>
                <Link to="/" className="hover:text-gold-300 transition-colors">Home Atelier</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gold-300 transition-colors">All Luminaires</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-gold-300 transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/categories?filter=chandeliers" className="hover:text-gold-300 transition-colors">Grand Chandeliers</Link>
              </li>
              <li>
                <Link to="/categories?filter=pendant-lights" className="hover:text-gold-300 transition-colors">Sculptural Pendants</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-300 transition-colors">Our Design Philosophy</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gold-400 font-sans">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-sm text-charcoal-300">
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors">Showroom Appointments</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors">Architect & Designer Program</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors">Installation Guidelines</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors">Warranty & LuminaCare</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-gold-300 transition-colors">Saved Wishlist</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-gold-300 transition-colors">Cart & Orders</Link>
              </li>
            </ul>
          </div>

          {/* Flagship Atelier Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gold-400 font-sans">
              Flagship Atelier
            </h4>
            <div className="space-y-3 text-sm text-charcoal-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>The Pavilion, Dr. Annie Besant Road, Worli, Mumbai 400018</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+91 22 4988 7700</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>concierge@luminalight.in</span>
              </div>
              <div className="pt-2 text-xs text-charcoal-400">
                Showroom Hours: Mon - Sat: 10:30 AM – 7:30 PM IST (Private tours by appointment)
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-charcoal-400 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} LuminaLight Atelier Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-warm-200 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-warm-200 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-warm-200 transition-colors cursor-pointer">Security & Compliance</span>
            <span className="hover:text-warm-200 transition-colors cursor-pointer">Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
