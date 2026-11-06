import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className="group relative block overflow-hidden bg-charcoal rounded-none shadow-luxury hover:shadow-luxury-hover transition-all duration-500"
    >
      {/* Category Image with smooth zoom and subtle dark overlay */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />
        
        {/* Subtle decorative gold border frame on hover */}
        <div className="absolute inset-3 border border-gold-400/0 group-hover:border-gold-400/40 transition-all duration-500 pointer-events-none" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-warm-50 z-10">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold mb-1 block">
            {category.itemCount} Designs
          </span>
          <h3 className="font-serif text-2xl font-normal text-warm-50 tracking-wide mb-2 group-hover:text-gold-300 transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-warm-200/80 line-clamp-2 font-light mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {category.tagline}
          </p>

          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-warm-100 group-hover:text-gold-400 transition-colors">
            <span>Shop Now</span>
            <div className="w-6 h-6 rounded-full bg-warm-50/10 group-hover:bg-gold-500 group-hover:text-charcoal-950 flex items-center justify-center transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
