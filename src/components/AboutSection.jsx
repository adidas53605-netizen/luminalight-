import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Award } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section className="py-24 bg-sand/40 border-t border-warm-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Image composition */}
          <div className="relative">
            <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden shadow-luxury">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"
                alt="LuminaLight architectural interior living room"
                className="w-full h-full object-cover object-center zoom-effect"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating luxury badge */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-8 sm:-right-8 bg-charcoal text-warm-50 p-6 shadow-2xl max-w-xs border border-charcoal-700 hidden sm:block">
              <div className="flex items-center space-x-2 text-gold-400 mb-2">
                <Award className="w-5 h-5" />
                <span className="text-[11px] uppercase tracking-widest font-bold">Atelier Heritage</span>
              </div>
              <p className="font-serif text-lg leading-snug">
                "Light is not an accessory. It is the invisible architect of emotion."
              </p>
              <p className="text-[11px] text-warm-300 mt-2 font-light">
                — Elena Rossi, Head of Design
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-600 font-semibold">
              <span className="w-6 h-[1px] bg-gold-500" />
              <span>About LuminaLight</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal tracking-tight leading-[1.18]">
              Where Precision Engineering Meets Luminous Poetry
            </h2>

            <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed">
              Founded with an uncompromising devotion to pure form and sensory comfort, LuminaLight elevates residential and hospitality architecture. We reject mass-market synthetic fixtures in favor of tactile permanence: heavyweight spun brass, virgin crystals, and mouth-blown glass.
            </p>

            <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed">
              Every luminaire undergoes 48 hours of photometric testing to ensure natural color rendering, flicker-free dimming, and acoustic silence. We create the warm illumination that makes you linger in conversation just a little longer.
            </p>

            {/* Checklist */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-charcoal-700">
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Zero-flicker dimmable optics</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Hand-finished brushed brass</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Custom drop lengths on request</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Complimentary design concierge</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-gold-600 transition-colors group"
              >
                <span>Discover Our Brand Story</span>
                <ArrowRight className="w-4 h-4 text-gold-600 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
