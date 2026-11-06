import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartFinalTotal,
    formatINR, 
    shippingThreshold,
    isFreeShipping,
    shippingFee,
    applyCoupon,
    couponCode,
    discountPercent,
    removeCoupon
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const progressToFreeShipping = Math.min(100, Math.round((cartSubtotal / shippingThreshold) * 100));
  const remainingForFreeShipping = shippingThreshold - cartSubtotal;

  const handleApply = (e) => {
    e.preventDefault();
    if (inputCoupon) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleProceedToCart = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-warm-50 shadow-2xl flex flex-col justify-between border-l border-warm-200">
          
          {/* Drawer Header */}
          <div className="p-6 bg-white border-b border-warm-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-gold-600" />
                <h2 className="font-serif text-xl font-normal text-charcoal">
                  Your Curated Bag ({cart.length})
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-charcoal-400 hover:text-charcoal rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="mt-4 pt-3 border-t border-warm-100">
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                {isFreeShipping ? (
                  <span className="text-green-700 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                    <span>Unlocked Complimentary White-Glove Delivery!</span>
                  </span>
                ) : (
                  <span className="text-charcoal-600">
                    Add <span className="font-bold text-gold-700">{formatINR(remainingForFreeShipping)}</span> for Free Delivery
                  </span>
                )}
                <span className="text-charcoal-400">{progressToFreeShipping}%</span>
              </div>
              <div className="w-full bg-warm-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gold-500 h-full transition-all duration-500" 
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-warm-200/60 flex items-center justify-center mx-auto text-charcoal-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg text-charcoal font-medium">Your bag is currently empty</h3>
                <p className="text-xs text-charcoal-500 max-w-xs mx-auto">
                  Explore our luxury collection of chandeliers, pendants, and sconces to bring warmth to your home.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="inline-block mt-2 px-6 py-3 bg-charcoal text-warm-50 text-xs uppercase tracking-widest font-semibold hover:bg-gold-500 hover:text-charcoal-950 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div 
                  key={`${item.id}-${item.selectedTemp || idx}`}
                  className="flex space-x-4 p-4 bg-white border border-warm-200 relative group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover bg-warm-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm font-normal text-charcoal truncate pr-2">
                          <Link 
                            to={`/product/${item.id}`}
                            onClick={() => setIsCartOpen(false)}
                            className="hover:text-gold-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.selectedTemp)}
                          className="text-charcoal-300 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.selectedTemp && (
                        <p className="text-[11px] text-charcoal-400 mt-0.5">
                          {item.selectedTemp}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-warm-100">
                      <span className="font-serif text-sm font-semibold text-charcoal">
                        {formatINR(item.price)}
                      </span>

                      {/* Quantity stepper */}
                      <div className="flex items-center border border-warm-200">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedTemp)}
                          className="px-2 py-0.5 text-xs text-charcoal-500 hover:text-charcoal"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedTemp)}
                          className="px-2 py-0.5 text-xs text-charcoal-500 hover:text-charcoal"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Checkout summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-warm-200 space-y-4">
              
              {/* Promo Code input */}
              {couponCode ? (
                <div className="flex items-center justify-between bg-gold-50 p-2.5 border border-gold-300 text-xs">
                  <div className="flex items-center space-x-2 text-gold-800">
                    <Tag className="w-3.5 h-3.5" />
                    <span className="font-semibold">{couponCode} applied ({discountPercent}% off)</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-charcoal-400 hover:text-red-600 underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex space-x-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Coupon (e.g. LUMINA10)"
                    className="flex-1 px-3 py-2 bg-warm-50 border border-warm-300 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-gold-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-charcoal text-warm-50 hover:bg-gold-500 hover:text-charcoal-950 text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Subtotals */}
              <div className="space-y-1.5 text-xs text-charcoal-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatINR(cartSubtotal)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-gold-700 font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-{formatINR(cartSubtotal * (discountPercent / 100))}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>White-Glove Shipping</span>
                  <span>{shippingFee === 0 ? <span className="text-green-700 font-medium">Complimentary</span> : formatINR(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-charcoal pt-2 border-t border-warm-100">
                  <span>Estimated Total</span>
                  <span className="font-serif text-base text-gold-700">{formatINR(cartFinalTotal)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleProceedToCart}
                  className="w-full py-3.5 bg-charcoal hover:bg-gold-500 hover:text-charcoal-950 text-warm-50 text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md"
                >
                  <span>View Full Bag & Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-charcoal-400">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                <span>Protected White-Glove Courier & 5-Year Warranty</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
