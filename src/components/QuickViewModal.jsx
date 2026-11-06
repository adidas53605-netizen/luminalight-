import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Star, Check, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

export const QuickViewModal = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatINR 
  } = useShop();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTemp, setSelectedTemp] = useState('2700K Warm');

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);
  const images = quickViewProduct.gallery || [quickViewProduct.image];

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedTemp);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-4xl bg-white shadow-2xl border border-warm-200 overflow-hidden transform transition-all animate-fade-in-up">
          
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-charcoal-400 hover:text-charcoal bg-warm-100 hover:bg-warm-200 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Gallery Column */}
            <div className="p-6 bg-warm-50 flex flex-col justify-between">
              <div className="aspect-square w-full overflow-hidden bg-white border border-warm-200 relative mb-4">
                <img
                  src={images[selectedImage] || quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-center"
                />
                {quickViewProduct.discount && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-charcoal text-gold-300 text-[10px] font-bold uppercase tracking-wider">
                    {quickViewProduct.discount}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 shrink-0 border overflow-hidden transition-all ${
                        selectedImage === idx ? 'border-gold-500 ring-1 ring-gold-500' : 'border-warm-200 opacity-70'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Information Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="uppercase tracking-widest font-semibold text-gold-600">
                    {quickViewProduct.categoryName}
                  </span>
                  <div className="flex items-center space-x-1 text-charcoal-700">
                    <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                    <span className="font-semibold text-xs">{quickViewProduct.rating}</span>
                    <span className="text-charcoal-400 text-[11px]">({quickViewProduct.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Product Title */}
                <h3 className="font-serif text-2xl font-normal text-charcoal mb-2">
                  {quickViewProduct.name}
                </h3>

                {/* Price Display */}
                <div className="flex items-baseline space-x-3 mb-4">
                  <span className="font-serif text-2xl font-bold text-charcoal">
                    {formatINR(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.oldPrice && (
                    <span className="text-sm text-charcoal-400 line-through">
                      {formatINR(quickViewProduct.oldPrice)}
                    </span>
                  )}
                  <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 font-medium">
                    In Stock & Ready to Dispatch
                  </span>
                </div>

                <p className="text-xs text-charcoal-600 leading-relaxed font-light mb-6">
                  {quickViewProduct.description}
                </p>

                {/* Light Temperature Selector */}
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider text-charcoal-700 font-semibold mb-2">
                    Luminous Warmth: <span className="text-gold-700 normal-case">{selectedTemp}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['2700K Warm', '3000K Soft', '4000K Pure'].map((temp) => (
                      <button
                        key={temp}
                        type="button"
                        onClick={() => setSelectedTemp(temp)}
                        className={`py-2 px-3 text-xs border transition-all text-center ${
                          selectedTemp === temp
                            ? 'border-gold-500 bg-gold-50 text-charcoal font-semibold ring-1 ring-gold-500'
                            : 'border-warm-200 text-charcoal-600 hover:border-warm-300'
                        }`}
                      >
                        {temp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specifications highlights */}
                <div className="bg-warm-50 p-3 mb-6 text-xs text-charcoal-600 space-y-1">
                  <p><span className="font-medium text-charcoal">Materials:</span> {quickViewProduct.materials}</p>
                  <p><span className="font-medium text-charcoal">Dimensions:</span> {quickViewProduct.dimensions}</p>
                  <p><span className="font-medium text-charcoal">Warranty:</span> {quickViewProduct.warranty}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-4 border-t border-warm-200">
                <div className="flex items-center space-x-3">
                  
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-warm-300 bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-3 py-2 text-charcoal-600 hover:text-charcoal text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-semibold text-charcoal min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-3 py-2 text-charcoal-600 hover:text-charcoal text-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-6 bg-charcoal hover:bg-gold-500 hover:text-charcoal-950 text-warm-50 text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(quickViewProduct)}
                    className={`p-3 border transition-colors ${
                      isFavorited ? 'border-gold-500 bg-gold-50 text-gold-600' : 'border-warm-300 text-charcoal-600 hover:border-gold-400'
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>

                </div>

                <div className="text-center">
                  <Link
                    to={`/product/${quickViewProduct.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="inline-flex items-center space-x-1 text-xs text-charcoal-500 hover:text-gold-600 transition-colors uppercase tracking-wider font-semibold"
                  >
                    <span>View Full Architectural Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
