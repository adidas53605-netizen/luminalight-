import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const PromotionalBanner = () => {
  return (
    <section className="relative py-20 bg-charcoal overflow-hidden">
      {/* Background with Ambient Glow */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2000&auto=format&fit=crop"
          alt="Interior architectural lighting"
          className="w-full h-full object-cover opacity-20 filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-900/95 to-charcoal-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/25 text-gold-300 text-xs uppercase tracking-widest font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Curated Architectural Living</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-warm-50 font-normal tracking-tight mb-6">
          Light Up Your Home with Style
        </h2>

        <p className="text-warm-200/90 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          From sculptural brass chandeliers to tactile alabaster table lamps, discover how purposeful illumination harmonizes texture, space and emotion in the modern home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-luxury hover:shadow-gold-glow"
          >
            <span>Shop Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/categories"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-transparent hover:bg-warm-100/10 text-warm-100 border border-warm-200/30 font-medium text-xs uppercase tracking-widest transition-all duration-300"
          >
            <span>Explore Categories</span>
          </Link>
        </div>

      </div>
    </section>
  );
};
