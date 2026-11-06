import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, Home, Layers, Lightbulb } from 'lucide-react';
import { categories } from '../data/categories';

export const Categories = () => {
  const roomPlacements = [
    {
      room: "The Grand Living Suite",
      bestFit: "Chandeliers & Concentric Flush Mounts",
      desc: "Command vertical volume with cascading brass rings and faceted crystals, establishing a focal center that draws eyes upward.",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop"
    },
    {
      room: "The Dining Atelier",
      bestFit: "Linear Pendants & Fluted Glass Clusters",
      desc: "Suspended 32 inches above timber dining surfaces, fluted amber glass casts appetizing, warm golden pools for prolonged evening banquets.",
      image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1000&auto=format&fit=crop"
    },
    {
      room: "The Private Bedroom & Alcove",
      bestFit: "Dual-Cast Sconces & Spanish Alabaster Lamps",
      desc: "Touch-dimmable alabaster and indirect wall halo wash eliminate direct glare, fostering melatonin release and serene unwinding.",
      image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-warm-50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-600 font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-gold-500" />
            <span>Architectural Typologies</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal tracking-tight mb-4">
            Lighting Disciplines & Collections
          </h1>
          <p className="text-charcoal-500 text-sm sm:text-base font-light leading-relaxed">
            Every room demands a distinct luminous rhythm. Explore our dedicated lighting collections, engineered with structural balance and emotive light distribution.
          </p>
        </div>

        {/* 6 Category Spotlight Cards */}
        <div className="space-y-12 mb-24">
          {categories.map((category, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div 
                key={category.id}
                className="bg-white border border-warm-200 overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-500"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Image side */}
                  <div className={`lg:col-span-6 relative aspect-[16/10] lg:aspect-auto overflow-hidden ${isReversed ? 'lg:order-2' : ''}`}>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover object-center zoom-effect"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent lg:hidden" />
                    <span className="absolute top-4 left-4 lg:hidden px-3 py-1 bg-charcoal text-gold-300 text-xs font-bold uppercase tracking-wider">
                      {category.itemCount} Designs
                    </span>
                  </div>

                  {/* Content side */}
                  <div className={`lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between ${isReversed ? 'lg:order-1' : ''}`}>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold">
                          Typology 0{index + 1}
                        </span>
                        <span className="hidden lg:inline-block text-xs font-semibold text-charcoal-400 bg-warm-100 px-2.5 py-1">
                          {category.itemCount} Available Models
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal mb-3">
                        {category.name}
                      </h2>

                      <p className="text-xs sm:text-sm font-medium text-gold-700 mb-4">
                        {category.tagline}
                      </p>

                      <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light mb-8">
                        {category.description}
                      </p>

                      {/* Attribute Pills */}
                      <div className="grid grid-cols-2 gap-3 mb-8 text-xs text-charcoal-600">
                        <div className="p-3 bg-warm-50 border border-warm-200">
                          <span className="font-semibold text-charcoal block mb-0.5">Recommended Space</span>
                          <span className="text-charcoal-500 font-light">Living Rooms, Foyers, Dining</span>
                        </div>
                        <div className="p-3 bg-warm-50 border border-warm-200">
                          <span className="font-semibold text-charcoal block mb-0.5">Core Materials</span>
                          <span className="text-charcoal-500 font-light">Spun Brass, Borosilicate Glass</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-warm-100">
                      <Link
                        to={`/shop?category=${category.slug}`}
                        className="inline-flex items-center space-x-2 px-6 py-3.5 bg-charcoal hover:bg-gold-500 hover:text-charcoal-950 text-warm-50 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-sm"
                      >
                        <span>Shop {category.name} Collection</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Room Inspiration Architecture Section */}
        <div className="bg-white border border-warm-200 p-8 sm:p-14 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2 block">
              Spatial Harmony
            </span>
            <h2 className="font-serif text-3xl text-charcoal font-normal">
              Selecting Luminaires by Space
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-500 font-light mt-2">
              How our design team pairs fixtures for cohesive interior flow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomPlacements.map((rp, idx) => (
              <div key={idx} className="group flex flex-col justify-between bg-warm-50 border border-warm-200 p-5">
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden mb-4 bg-warm-200">
                    <img 
                      src={rp.image} 
                      alt={rp.room}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-gold-700 font-bold block mb-1">
                    {rp.bestFit}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-charcoal mb-2">
                    {rp.room}
                  </h3>
                  <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                    {rp.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-warm-200">
                  <Link 
                    to="/shop" 
                    className="text-xs font-semibold uppercase tracking-wider text-charcoal hover:text-gold-600 flex items-center space-x-1"
                  >
                    <span>Explore Suitable Luminaires</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
