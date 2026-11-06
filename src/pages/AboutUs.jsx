import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, Shield, CheckCircle2, ArrowRight, HeartHandshake, Lightbulb, Compass } from 'lucide-react';

export const AboutUs = () => {
  const stats = [
    { value: "4,800+", label: "Residences Illuminated", sub: "Across India & Southeast Asia" },
    { value: "98.8", label: "Color Rendering Index", sub: "True-to-life pigment fidelity" },
    { value: "18", label: "Architectural Awards", sub: "European & Asian Design Accolades" },
    { value: "5 Years", label: "Unconditional LuminaCare", sub: "Complete warranty protection" }
  ];

  const pillars = [
    {
      title: "Sculptural Integrity",
      desc: "A luminaire must command beauty even when switched off. By day, our fixtures function as suspended sculptures of spun brass and hand-blown glass; by night, they bathe the room in soothing warmth.",
      icon: Compass
    },
    {
      title: "Photometric Precision",
      desc: "Harsh shadows and cold blue diodes diminish a home's comfort. We engineer proprietary warm spectrum optical diffusers (2700K - 3000K) that flatter human skin tones and accentuate natural wood grains.",
      icon: Lightbulb
    },
    {
      title: "Generational Permanence",
      desc: "We reject synthetic, disposable consumer plastics. Every LuminaLight fixture is built with marine-grade aluminum, virgin brass, and lead-free borosilicate crystals meant to endure for decades.",
      icon: Award
    }
  ];

  return (
    <div className="bg-warm-50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-600 font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>The LuminaLight Atelier</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-charcoal font-normal tracking-tight mb-6">
            Crafting Atmospheres of <br />
            <span className="italic text-gold-600 font-light">Timeless Distinction</span>
          </h1>
          <p className="text-charcoal-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Born from an obsession with the emotional resonance of light, LuminaLight blends architectural rigor with artisan metalwork to create lighting that transforms how you feel within your sanctuary.
          </p>
        </div>

        {/* Feature Hero Image */}
        <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden shadow-luxury mb-20">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="LuminaLight lighting atelier workshop"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-warm-50 max-w-md">
            <p className="text-xs uppercase tracking-widest text-gold-400 font-bold mb-1">
              Atelier Philosophy
            </p>
            <p className="font-serif text-lg sm:text-xl font-normal leading-snug">
              Every curve, reflection, and shadow is calculated to deliver absolute sensory serenity.
            </p>
          </div>
        </div>

        {/* Stat Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 border border-warm-200 text-center shadow-xs">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-gold-600 block mb-1">
                {stat.value}
              </span>
              <span className="font-medium text-xs sm:text-sm text-charcoal block mb-1">
                {stat.label}
              </span>
              <span className="text-[11px] text-charcoal-400 block font-light">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Brand Story Two-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold block">
              Our Genesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-tight leading-tight">
              From a Passion for Shadow to an Architectural Benchmark
            </h2>
            <p className="text-charcoal-600 text-xs sm:text-sm leading-relaxed font-light">
              LuminaLight was founded by architectural illumination engineers who observed a critical void in modern interior spaces: fixtures were either mass-produced synthetic copies with clinical, cold glare, or prohibitively fragile antiques devoid of modern smart dimming.
            </p>
            <p className="text-charcoal-600 text-xs sm:text-sm leading-relaxed font-light">
              We set out to create something enduring. Our luminaires are engineered like high-performance chronographs: spun from virgin brass billets, hand-ground by master glassblowers, and fitted with custom-engineered phosphor-coated LED modules that replicate the spectrum of setting sunlight.
            </p>
            
            <div className="pt-2 border-t border-warm-200">
              <div className="grid grid-cols-2 gap-4 text-xs text-charcoal-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Zero volatile organic compounds</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>100% recyclable metal frames</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Flicker-free low ripple drivers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Handcrafted in small artisan batches</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] bg-warm-200 overflow-hidden shadow-luxury">
              <img
                src="https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?q=80&w=1200&auto=format&fit=crop"
                alt="Artisan assembling brass chandelier"
                className="w-full h-full object-cover zoom-effect"
              />
            </div>
          </div>
        </div>

        {/* The Three Pillars */}
        <div className="bg-white border border-warm-200 p-8 sm:p-14 mb-20 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2 block">
              Core Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
              The Three Pillars of LuminaLight
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="p-6 bg-warm-50 border border-warm-200 hover:border-gold-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-full bg-charcoal text-gold-400 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-medium text-charcoal mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-charcoal-500 font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-warm-200 text-[11px] uppercase tracking-wider font-semibold text-gold-700">
                    Pillar 0{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-charcoal text-warm-50 p-10 sm:p-14 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal mb-4">
              Experience the Radiance in Person
            </h2>
            <p className="text-xs sm:text-sm text-warm-200 font-light mb-8 leading-relaxed">
              Schedule a personalized lighting walkthrough at our flagship galleries in Worli (Mumbai), Golf Links (New Delhi), or Lavelle Road (Bengaluru).
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-widest transition-colors"
              >
                Schedule Private Consultation
              </Link>
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-3.5 border border-warm-100/30 text-warm-100 hover:bg-warm-100/10 font-semibold text-xs uppercase tracking-widest transition-colors"
              >
                Explore The Collection
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
