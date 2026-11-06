import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductCard = ({ product }) => {
  const { 
    formatINR, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct 
  } = useShop();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group relative bg-white border border-warm-200/80 hover:border-gold-300 transition-all duration-300 shadow-sm hover:shadow-luxury-hover flex flex-col justify-between">
      
      {/* Image Area */}
      <div className="relative aspect-[4/5] bg-warm-100/50 overflow-hidden">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
          {product.discount && (
            <span className="px-2.5 py-1 bg-charcoal text-gold-300 text-[10px] font-bold uppercase tracking-wider">
              {product.discount}
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 bg-gold text-charcoal-950 text-[10px] font-bold uppercase tracking-wider">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            isFavorited
              ? 'bg-gold-500 text-white shadow-md'
              : 'bg-white/90 text-charcoal-600 hover:text-gold-600 hover:bg-white shadow-sm'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image Link */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Quick View Floating Action Bar on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-charcoal-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="px-3.5 py-2 bg-white/95 hover:bg-white text-charcoal text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5 shadow-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-gold-600" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-charcoal-400 mb-1.5">
            <span className="uppercase tracking-wider text-[11px] font-medium text-gold-600">
              {product.categoryName}
            </span>
            <div className="flex items-center space-x-1 text-charcoal-700">
              <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
              <span className="text-[11px] font-medium">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg font-normal text-charcoal group-hover:text-gold-700 transition-colors line-clamp-1 mb-2">
            <Link to={`/product/${product.id}`}>
              {product.name}
            </Link>
          </h3>

          {/* Short tagline/material */}
          <p className="text-xs text-charcoal-400 font-light line-clamp-1 mb-4">
            {product.materials}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-3 border-t border-warm-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-2">
              <span className="font-serif text-lg font-bold text-charcoal">
                {formatINR(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-charcoal-400 line-through">
                  {formatINR(product.oldPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className="px-3 py-2 bg-warm-100 hover:bg-gold-500 hover:text-charcoal-950 text-charcoal-800 text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center space-x-1.5 rounded-none"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>

      </div>
    </div>
  );
};
