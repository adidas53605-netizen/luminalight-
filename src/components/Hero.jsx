import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, Award, Shield, Eye } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background Image with Dark Vignette & Golden Ambient Glow Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury architectural interior lighting"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multilayered luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 via-charcoal-900/80 to-charcoal-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-charcoal-950/70" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-10 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center sm:text-left">
        <div className="max-w-3xl">
          
          {/* Subtle Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest font-semibold mb-6 animate-fade-in backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>2026 Architectural Lighting Collection</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-warm-50 tracking-tight leading-[1.12] mb-6">
            Illuminate Your World, <br />
            <span className="font-serif italic text-gold-400 font-light">Transform Your Space.</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-warm-200/90 font-light leading-relaxed max-w-2xl mb-10">
            Discover beautiful lighting solutions designed to bring comfort, elegance and personality to every space.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 justify-center sm:justify-start">
            <Link
              to="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-none bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-gold-glow hover:-translate-y-0.5"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/categories"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-none bg-warm-50/10 hover:bg-warm-50/20 text-warm-100 border border-warm-100/30 font-medium text-sm tracking-wider uppercase transition-all duration-300 backdrop-blur-sm hover:border-gold-400"
            >
              <Compass className="w-4 h-4 text-gold-400" />
              <span>Discover More</span>
            </Link>
          </div>

          {/* Micro Stat Badges */}
          <div className="mt-14 pt-8 border-t border-warm-100/15 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl">
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-gold-300">100%</p>
              <p className="text-xs text-warm-200/80 uppercase tracking-wider mt-1">Artisan Crafted</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-gold-300">CRI 98+</p>
              <p className="text-xs text-warm-200/80 uppercase tracking-wider mt-1">Museum Color Fidelity</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-gold-300">5-Year</p>
              <p className="text-xs text-warm-200/80 uppercase tracking-wider mt-1">LuminaCare Warranty</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
