import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Star, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Wishlist = () => {
  const { 
    wishlist, 
    toggleWishlist, 
    addToCart, 
    formatINR, 
    wishlistCount 
  } = useShop();

  const handleMoveAllToCart = () => {
    wishlist.forEach(item => {
      addToCart(item, 1);
    });
  };

  return (
    <div className="bg-warm-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-charcoal-400 mb-6 flex items-center space-x-2">
          <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-charcoal-700 font-medium">Curated Wishlist</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-10 border-b border-warm-200 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-600 font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Personal Selection</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-tight">
              My Saved Luminaires
            </h1>
          </div>

          {wishlistCount > 0 && (
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleMoveAllToCart}
                className="px-6 py-3 bg-charcoal hover:bg-gold-500 hover:text-charcoal-950 text-warm-50 text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center space-x-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Bag ({wishlistCount})</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div className="bg-white border border-warm-200 p-16 text-center max-w-xl mx-auto shadow-sm my-8">
            <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center mx-auto mb-4 text-charcoal-300">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-charcoal mb-2 font-normal">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-charcoal-500 mb-8 font-light leading-relaxed max-w-sm mx-auto">
              Save your favorite grand chandeliers, pendants, and sconces to review later or share with your interior designer.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-charcoal text-warm-50 hover:bg-gold-500 hover:text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {wishlist.map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-warm-200 hover:border-gold-300 transition-all duration-300 shadow-sm flex flex-col justify-between group"
              >
                {/* Image Area */}
                <div className="relative aspect-[4/5] bg-warm-100 overflow-hidden">
                  <Link to={`/product/${item.id}`} className="block w-full h-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-red-500 rounded-full shadow-sm transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-gold-600 block mb-1">
                      {item.categoryName}
                    </span>
                    <h3 className="font-serif text-base font-normal text-charcoal group-hover:text-gold-700 transition-colors line-clamp-1 mb-2">
                      <Link to={`/product/${item.id}`}>
                        {item.name}
                      </Link>
                    </h3>
                    <div className="flex items-center space-x-1 text-xs text-charcoal-500 mb-3">
                      <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                      <span>{item.rating}</span>
                      <span className="text-charcoal-300">({item.reviewCount})</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-warm-100 flex flex-col space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-base font-bold text-charcoal">
                        {formatINR(item.price)}
                      </span>
                      {item.oldPrice && (
                        <span className="text-xs text-charcoal-400 line-through">
                          {formatINR(item.oldPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(item, 1)}
                      className="w-full py-2.5 bg-charcoal hover:bg-gold-500 hover:text-charcoal-950 text-warm-50 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
