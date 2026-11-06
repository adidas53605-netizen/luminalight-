import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Filter, 
  SlidersHorizontal, 
  Grid3X3, 
  Grid2X2, 
  Search, 
  X, 
  ChevronDown,
  Sparkles 
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { categories } from '../data/categories';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState('all'); // 'all', 'under20k', '20k-50k', 'above50k'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState(4); // 3 or 4

  // Keep state synced with URL param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('search');
    if (q) setSearchTerm(q);
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        // Search Filter
        if (searchTerm.trim() !== '') {
          const term = searchTerm.toLowerCase();
          const matches = 
            p.name.toLowerCase().includes(term) ||
            p.categoryName.toLowerCase().includes(term) ||
            p.materials.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term);
          if (!matches) return false;
        }
        // Price Filter
        if (priceRange === 'under20k' && p.price >= 20000) return false;
        if (priceRange === '20k-50k' && (p.price < 20000 || p.price > 50000)) return false;
        if (priceRange === 'above50k' && p.price <= 50000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [selectedCategory, searchTerm, priceRange, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setPriceRange('all');
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchTerm !== '' || priceRange !== 'all';

  return (
    <div className="bg-warm-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-10 text-center sm:text-left">
          <nav className="text-xs text-charcoal-400 mb-3 flex items-center space-x-2 justify-center sm:justify-start">
            <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-charcoal-700 font-medium">All Luminaires</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-gold-700 font-semibold capitalize">{selectedCategory.replace('-', ' ')}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal tracking-tight">
                Architectural Luminaires
              </h1>
              <p className="text-charcoal-500 text-sm mt-2 font-light max-w-xl">
                Explore our full spectrum of artisan chandeliers, fluted pendants, wall sconces, and ambient lighting sculptures.
              </p>
            </div>
            <div className="text-xs text-charcoal-500 font-medium self-center sm:self-end">
              Showing <span className="font-bold text-charcoal">{filteredProducts.length}</span> of {products.length} luminaires
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-warm-200 p-4 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none text-xs">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 whitespace-nowrap transition-all font-medium ${
                  selectedCategory === 'all'
                    ? 'bg-charcoal text-warm-50 font-semibold shadow-sm'
                    : 'bg-warm-100 text-charcoal-600 hover:bg-warm-200'
                }`}
              >
                All Typologies
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`px-3.5 py-2 whitespace-nowrap transition-all font-medium ${
                    selectedCategory === c.slug
                      ? 'bg-charcoal text-warm-50 font-semibold shadow-sm'
                      : 'bg-warm-100 text-charcoal-600 hover:bg-warm-200'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Controls (Search, Price, Sort) */}
            <div className="flex items-center space-x-3 text-xs shrink-0 flex-wrap sm:flex-nowrap">
              
              {/* Search input inside shop */}
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by keyword..."
                  className="w-full pl-8 pr-3 py-2 bg-warm-50 border border-warm-200 text-xs text-charcoal focus:outline-none focus:border-gold-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Price Filter */}
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-3 py-2 bg-warm-50 border border-warm-200 text-charcoal text-xs focus:outline-none focus:border-gold-500 cursor-pointer"
              >
                <option value="all">All Prices</option>
                <option value="under20k">Under ₹20,000</option>
                <option value="20k-50k">₹20,000 - ₹50,000</option>
                <option value="above50k">Above ₹50,000</option>
              </select>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-warm-50 border border-warm-200 text-charcoal text-xs focus:outline-none focus:border-gold-500 cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Layout switcher */}
              <div className="hidden md:flex items-center space-x-1 border border-warm-200 p-0.5 bg-warm-50">
                <button
                  type="button"
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 transition-colors ${gridCols === 3 ? 'bg-white shadow-xs text-charcoal' : 'text-charcoal-400'}`}
                  title="3 Columns"
                >
                  <Grid2X2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 transition-colors ${gridCols === 4 ? 'bg-white shadow-xs text-charcoal' : 'text-charcoal-400'}`}
                  title="4 Columns"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="mt-3 pt-3 border-t border-warm-100 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className="text-charcoal-400 font-medium">Applied:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-gold-100 text-gold-900 border border-gold-300">
                    <span className="capitalize">{selectedCategory.replace('-', ' ')}</span>
                    <button onClick={() => setSelectedCategory('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {searchTerm && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-warm-200 text-charcoal border border-warm-300">
                    <span>"{searchTerm}"</span>
                    <button onClick={() => setSearchTerm('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {priceRange !== 'all' && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 bg-warm-200 text-charcoal border border-warm-300">
                    <span>
                      {priceRange === 'under20k' ? 'Under ₹20K' : priceRange === '20k-50k' ? '₹20K-₹50K' : 'Above ₹50K'}
                    </span>
                    <button onClick={() => setPriceRange('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-gold-700 hover:text-charcoal underline ml-auto"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-warm-200 p-16 text-center max-w-xl mx-auto shadow-sm my-12">
            <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center mx-auto mb-4 text-charcoal-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-charcoal mb-2 font-normal">
              No Luminaires Found
            </h3>
            <p className="text-xs text-charcoal-500 mb-6 font-light leading-relaxed">
              We couldn't find any fixtures matching your current criteria. Try resetting your search or exploring our other collections.
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="px-6 py-3 bg-charcoal text-warm-50 hover:bg-gold-500 hover:text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6 sm:gap-8`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
