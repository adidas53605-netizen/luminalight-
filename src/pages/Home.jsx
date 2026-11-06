import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Hero } from '../components/Hero';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { PromotionalBanner } from '../components/PromotionalBanner';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { AboutSection } from '../components/AboutSection';
import { CustomerReviews } from '../components/CustomerReviews';
import { Newsletter } from '../components/Newsletter';
import { categories } from '../data/categories';
import { getFeaturedProducts } from '../data/products';

export const Home = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 8);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero />

      {/* Featured Categories Section */}
      <section className="py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2 block">
                Curated Typologies
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-tight">
                Featured Lighting Categories
              </h2>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/categories"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-gold-600 transition-colors group"
              >
                <span>View All Architectural Categories</span>
                <ArrowRight className="w-4 h-4 text-gold-600 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

        </div>
      </section>

      {/* Featured Products Section (8 Products) */}
      <section className="py-24 bg-white border-t border-warm-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Signature Luminaires</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-tight mb-4">
              Featured Lighting Masterpieces
            </h2>
            <p className="text-charcoal-500 text-sm sm:text-base font-light">
              Eight iconic luminaires sculpted to anchor living spaces with enduring grace and ambient warmth.
            </p>
          </div>

          {/* 8 Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-charcoal hover:bg-gold-500 hover:text-charcoal-950 text-warm-50 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-luxury"
            >
              <span>Explore Complete Catalog ({featuredProducts.length}+ Luminaires)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Promotional Banner */}
      <PromotionalBanner />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* About LuminaLight Brand Story */}
      <AboutSection />

      {/* Customer Reviews & Testimonials */}
      <CustomerReviews />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};
