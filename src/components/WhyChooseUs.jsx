import React from 'react';
import { Crown, Zap, Compass, Headphones } from 'lucide-react';

export const WhyChooseUs = () => {
  const features = [
    {
      icon: Crown,
      title: "Premium Quality",
      subtitle: "Heritage Materials",
      description: "Forged in solid brushed brass, hand-blown Murano borosilicate glass, and natural Spanish alabaster with artisanal hand-finishing."
    },
    {
      icon: Zap,
      title: "Energy Efficient",
      subtitle: "State-of-the-Art LEDs",
      description: "Equipped with high-CRI (98+) warm-spectrum LEDs that consume 85% less energy while delivering 50,000+ hours of flicker-free luminance."
    },
    {
      icon: Compass,
      title: "Modern Designs",
      subtitle: "Architectural Precision",
      description: "Conceived by award-winning European and Indian interior luminaries, striking the balance between minimalist form and ambient aura."
    },
    {
      icon: Headphones,
      title: "Reliable Support",
      subtitle: "LuminaCare White-Glove",
      description: "Backed by 5-year comprehensive warranty, complimentary doorstep consultations, and dedicated architectural concierge service."
    }
  ];

  return (
    <section className="py-20 bg-warm-50 border-t border-warm-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2 block">
            The LuminaLight Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-tight mb-4">
            Why Discerning Spaces Choose Us
          </h2>
          <p className="text-charcoal-500 text-sm sm:text-base font-light">
            We don't merely manufacture lighting fixtures; we sculpt the mood, proportion, and soul of your home.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-white p-8 border border-warm-200 hover:border-gold-300 transition-all duration-300 hover:shadow-luxury group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-warm-100 group-hover:bg-gold-500 text-charcoal group-hover:text-charcoal-950 flex items-center justify-center transition-colors duration-300 mb-6">
                    <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold block mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="font-serif text-xl font-medium text-charcoal mb-3 group-hover:text-gold-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-charcoal-500 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-warm-100 text-[11px] font-semibold tracking-wider uppercase text-charcoal-400 group-hover:text-gold-600 transition-colors">
                  Standard Guarantee
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
