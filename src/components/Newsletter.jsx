import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useShop();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }

    setSubscribed(true);
    showToast(
      'Welcome to LuminaLight Atelier',
      'Your exclusive 10% welcome privilege code is LUMINA10. Enjoy your exploration!',
      'gold'
    );
  };

  return (
    <section className="py-20 bg-warm-100/70 border-t border-warm-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-600 font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span>Curated Illumination Journal</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-tight mb-4">
          Stay Inspired with LuminaLight
        </h2>

        <p className="text-charcoal-500 text-sm sm:text-base font-light max-w-xl mx-auto mb-8">
          Join our private circle of architects, interior designers, and discerning homeowners for seasonal luminaire previews, design essays, and architectural spotlights.
        </p>

        {subscribed ? (
          <div className="bg-white p-6 max-w-lg mx-auto border border-gold-400 shadow-luxury flex items-center justify-center space-x-3 text-left">
            <CheckCircle2 className="w-6 h-6 text-gold-600 shrink-0" />
            <div>
              <h4 className="font-serif text-base font-semibold text-charcoal">
                Subscription Confirmed
              </h4>
              <p className="text-xs text-charcoal-500">
                Use code <span className="font-mono font-bold text-gold-600">LUMINA10</span> for 10% off your first lighting investment.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-warm-300 text-charcoal text-sm placeholder:text-charcoal-400 focus:outline-none focus:border-gold-500 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-charcoal hover:bg-gold-500 hover:text-charcoal-950 text-warm-50 text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shrink-0 shadow-sm"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-charcoal-400 mt-3 font-light">
              We respect your privacy. Unsubscribe at any time with a single click.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
