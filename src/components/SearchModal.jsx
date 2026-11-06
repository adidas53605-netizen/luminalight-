import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SearchModal = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    allProducts, 
    formatINR 
  } = useShop();

  const [term, setTerm] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = term.trim() === '' 
    ? [] 
    : allProducts.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(term.toLowerCase()) ||
        p.materials.toLowerCase().includes(term.toLowerCase()) ||
        p.description.toLowerCase().includes(term.toLowerCase())
      );

  const quickTags = ['Chandelier', 'Pendant', 'Brass', 'Alabaster', 'Flush Mount', 'Wall Sconce'];

  const handleSelect = (productId) => {
    setIsSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  const handleTagClick = (tag) => {
    setTerm(tag);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="flex min-h-full items-start justify-center p-4 pt-16 sm:pt-24">
        <div className="relative w-full max-w-2xl bg-white shadow-2xl border border-warm-200 overflow-hidden animate-fade-in-up">
          
          {/* Search Header Input */}
          <div className="p-4 sm:p-6 border-b border-warm-200 flex items-center space-x-3 bg-warm-50">
            <Search className="w-5 h-5 text-gold-600 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search by luminaire name, brass, glass, category..."
              className="w-full bg-transparent text-charcoal placeholder:text-charcoal-400 text-base sm:text-lg focus:outline-none"
            />
            {term && (
              <button
                type="button"
                onClick={() => setTerm('')}
                className="text-xs text-charcoal-400 hover:text-charcoal px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-charcoal-400 hover:text-charcoal rounded-full hover:bg-warm-200 transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Tags Suggestions */}
          <div className="px-6 py-3 bg-white border-b border-warm-100 flex items-center space-x-2 overflow-x-auto text-xs">
            <span className="text-charcoal-400 shrink-0 uppercase tracking-wider font-semibold text-[10px]">
              Suggestions:
            </span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="px-2.5 py-1 bg-warm-100 hover:bg-gold-50 hover:text-gold-700 text-charcoal-600 rounded-none shrink-0 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
            {term.trim() === '' ? (
              <div className="text-center py-10 text-charcoal-400 text-sm">
                Type above to discover architectural fixtures, materials, and collections.
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-10">
                <p className="font-serif text-lg text-charcoal mb-1">No matching luminaires found</p>
                <p className="text-xs text-charcoal-400">
                  Try searching for "brass", "chandelier", "pendant", or "table lamp".
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wider font-semibold text-charcoal-400 mb-2">
                  Found {results.length} result{results.length > 1 ? 's' : ''}
                </p>
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelect(product.id)}
                    className="flex items-center space-x-4 p-3 hover:bg-warm-50 cursor-pointer border border-transparent hover:border-warm-200 transition-all group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover bg-warm-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-600 block">
                        {product.categoryName}
                      </span>
                      <h4 className="font-serif text-sm font-medium text-charcoal group-hover:text-gold-700 transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-charcoal-400 truncate font-light">
                        {product.materials}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-serif text-sm font-semibold text-charcoal block">
                        {formatINR(product.price)}
                      </span>
                      <div className="flex items-center space-x-1 justify-end text-[11px] text-charcoal-500">
                        <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer View All Link */}
          {results.length > 0 && (
            <div className="p-4 bg-warm-50 border-t border-warm-200 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  navigate(`/shop?search=${encodeURIComponent(term)}`);
                }}
                className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-charcoal hover:text-gold-600 transition-colors"
              >
                <span>View all results in Shop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
