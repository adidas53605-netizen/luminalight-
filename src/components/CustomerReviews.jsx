import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { reviews } from '../data/reviews';

export const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-white border-t border-warm-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2 block">
              Verified Client Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-tight">
              Spaces Illuminated by LuminaLight
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={prevReview}
              className="w-10 h-10 rounded-full border border-warm-200 hover:border-gold-500 hover:text-gold-600 flex items-center justify-center transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="w-10 h-10 rounded-full border border-warm-200 hover:border-gold-500 hover:text-gold-600 flex items-center justify-center transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Spotlight */}
        <div className="bg-warm-50/70 border border-warm-200 p-8 sm:p-12 relative mb-12 shadow-sm">
          <Quote className="absolute top-8 right-8 w-16 h-16 text-warm-200/50 pointer-events-none" />
          
          <div className="max-w-3xl">
            {/* Stars */}
            <div className="flex items-center space-x-1 mb-4">
              {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
              ))}
              <span className="text-xs text-charcoal-400 ml-2 font-medium">5.0 Star Rating</span>
            </div>

            {/* Headline */}
            <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-normal mb-4">
              "{reviews[currentIndex].headline}"
            </h3>

            {/* Comment */}
            <p className="text-charcoal-600 text-sm sm:text-base font-light leading-relaxed mb-8">
              {reviews[currentIndex].comment}
            </p>

            {/* Author info */}
            <div className="flex items-center space-x-4">
              <img
                src={reviews[currentIndex].avatar}
                alt={reviews[currentIndex].name}
                className="w-12 h-12 rounded-full object-cover border border-warm-300"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-serif text-base font-semibold text-charcoal">
                    {reviews[currentIndex].name}
                  </h4>
                  <span className="inline-flex items-center space-x-1 text-[11px] text-green-700 font-medium">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span>Verified Collector</span>
                  </span>
                </div>
                <p className="text-xs text-charcoal-400">
                  {reviews[currentIndex].role} • {reviews[currentIndex].location}
                </p>
                <p className="text-[11px] text-gold-700 font-medium mt-0.5">
                  Purchased: {reviews[currentIndex].product}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Grid of All Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, i) => (
            <div 
              key={rev.id}
              onClick={() => setCurrentIndex(i)}
              className={`p-6 bg-white border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                currentIndex === i 
                  ? 'border-gold-500 shadow-luxury' 
                  : 'border-warm-200 hover:border-warm-300'
              }`}
            >
              <div>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3 h-3 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <h4 className="font-serif text-sm font-medium text-charcoal mb-2 line-clamp-1">
                  "{rev.headline}"
                </h4>
                <p className="text-xs text-charcoal-500 font-light line-clamp-3 leading-relaxed mb-4">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-warm-100 flex items-center space-x-2.5">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div className="truncate">
                  <p className="text-xs font-semibold text-charcoal truncate">{rev.name}</p>
                  <p className="text-[10px] text-charcoal-400 truncate">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
