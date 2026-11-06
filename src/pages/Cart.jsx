import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Sparkles, 
  CheckCircle2, 
  Lock,
  RotateCcw,
  CreditCard,
  Building2,
  X
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Cart = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    cartSubtotal, 
    cartOriginalTotal, 
    totalSavings, 
    couponCode, 
    discountPercent, 
    applyCoupon, 
    removeCoupon, 
    shippingFee, 
    isFreeShipping, 
    shippingThreshold, 
    cartFinalTotal, 
    formatINR,
    showToast 
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  // Shipping form state
  const [shippingForm, setShippingForm] = useState({
    fullName: 'Aditya Birla',
    email: 'aditya.b@example.com',
    phone: '+91 98201 12345',
    address: 'Penthouse 42, Imperial Towers, Tardeo',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400034',
    installationNeeded: true
  });

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'netbanking'

  const progress = Math.min(100, Math.round((cartSubtotal / shippingThreshold) * 100));
  const remaining = shippingThreshold - cartSubtotal;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCoupon) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleStartCheckout = () => {
    setIsCheckingOut(true);
    setCheckoutStep(1);
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    setCheckoutStep(2);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setCheckoutStep(3);
    clearCart();
    showToast(
      'Order Confirmed',
      `Your bespoke lighting order #${generatedId} has been successfully scheduled!`,
      'gold'
    );
  };

  return (
    <div className="bg-warm-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-xs text-charcoal-400 mb-6 flex items-center space-x-2">
          <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-charcoal-700 font-medium">Shopping Bag</span>
        </nav>

        {/* Title */}
        <div className="mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-tight">
            Curated Shopping Bag ({cart.length})
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white border border-warm-200 p-16 text-center max-w-xl mx-auto shadow-sm my-8">
            <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center mx-auto mb-4 text-charcoal-300">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl text-charcoal mb-2 font-normal">
              Your Shopping Bag is Empty
            </h2>
            <p className="text-xs text-charcoal-500 mb-8 font-light leading-relaxed max-w-sm mx-auto">
              You haven't selected any luminaires yet. Explore our signature collection of chandeliers, pendants, and sconces to enrich your residence.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-charcoal text-warm-50 hover:bg-gold-500 hover:text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-colors shadow-sm"
            >
              <span>Explore Luminaires</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Cart Items (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Free Shipping Alert Box */}
              <div className="bg-white border border-warm-200 p-5 shadow-xs">
                <div className="flex justify-between text-xs mb-2">
                  {isFreeShipping ? (
                    <span className="text-green-700 font-medium flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-gold-500" />
                      <span>Complimentary White-Glove Delivery Unlocked</span>
                    </span>
                  ) : (
                    <span className="text-charcoal-700">
                      Add <span className="font-bold text-gold-700">{formatINR(remaining)}</span> more to qualify for Free White-Glove Delivery
                    </span>
                  )}
                  <span className="text-charcoal-400 font-semibold">{progress}%</span>
                </div>
                <div className="w-full bg-warm-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gold-500 h-full transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Items Table/Cards */}
              <div className="bg-white border border-warm-200 divide-y divide-warm-100 shadow-sm">
                {cart.map((item, idx) => (
                  <div 
                    key={`${item.id}-${item.selectedTemp || idx}`}
                    className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                  >
                    {/* Product visual & details */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover bg-warm-100 shrink-0 border border-warm-200"
                      />
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-gold-600 block">
                          {item.categoryName}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg font-normal text-charcoal">
                          <Link to={`/product/${item.id}`} className="hover:text-gold-600 transition-colors">
                            {item.name}
                          </Link>
                        </h3>
                        {item.selectedTemp && (
                          <p className="text-xs text-charcoal-400 mt-0.5">
                            Warmth: <span className="text-charcoal-600 font-medium">{item.selectedTemp}</span>
                          </p>
                        )}
                        <p className="text-xs font-serif font-semibold text-charcoal sm:hidden mt-2">
                          {formatINR(item.price)}
                        </p>
                      </div>
                    </div>

                    {/* Stepper, Price & Remove */}
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-warm-300 bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedTemp)}
                          className="px-3 py-1.5 text-xs text-charcoal-600 hover:text-charcoal"
                        >
                          -
                        </button>
                        <span className="px-3 py-1.5 text-xs font-semibold text-charcoal min-w-[32px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedTemp)}
                          className="px-3 py-1.5 text-xs text-charcoal-600 hover:text-charcoal"
                        >
                          +
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <div className="text-right hidden sm:block min-w-[90px]">
                        <span className="font-serif text-base font-bold text-charcoal block">
                          {formatINR(item.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[11px] text-charcoal-400 block">
                            {formatINR(item.price)} each
                          </span>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.selectedTemp)}
                        className="text-charcoal-300 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Guarantees row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-charcoal-600 pt-2">
                <div className="p-4 bg-white border border-warm-200 flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0" />
                  <span>5-Year Comprehensive LuminaCare Guarantee</span>
                </div>
                <div className="p-4 bg-white border border-warm-200 flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-gold-600 shrink-0" />
                  <span>Crated Protection & Insured Transit</span>
                </div>
                <div className="p-4 bg-white border border-warm-200 flex items-center space-x-3">
                  <RotateCcw className="w-5 h-5 text-gold-600 shrink-0" />
                  <span>14-Day Complimentary Design Exchange</span>
                </div>
              </div>

            </div>

            {/* Order Summary (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-warm-200 p-6 sm:p-8 shadow-sm space-y-6 sticky top-28">
                
                <h2 className="font-serif text-xl font-normal text-charcoal pb-4 border-b border-warm-200">
                  Order Summary
                </h2>

                {/* Promo code input */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-600 font-semibold mb-2">
                    Privilege Code
                  </label>
                  {couponCode ? (
                    <div className="flex items-center justify-between bg-gold-50 p-3 border border-gold-400 text-xs">
                      <div className="flex items-center space-x-2 text-gold-900">
                        <Tag className="w-4 h-4 text-gold-600" />
                        <span className="font-bold">{couponCode}</span>
                        <span>({discountPercent}% OFF)</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs text-charcoal-500 hover:text-red-600 underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                      <input
                        type="text"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        placeholder="e.g. LUMINA10"
                        className="flex-1 px-3 py-2.5 bg-warm-50 border border-warm-300 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-gold-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-charcoal text-warm-50 hover:bg-gold-500 hover:text-charcoal-950 text-xs uppercase tracking-wider font-semibold transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  <p className="text-[11px] text-charcoal-400 mt-1.5">
                    Try <span className="font-semibold text-charcoal">LUMINA10</span> for 10% off or <span className="font-semibold text-charcoal">ARCHITECT15</span> for trade orders.
                  </p>
                </div>

                {/* Subtotals & Taxes */}
                <div className="space-y-3 text-xs text-charcoal-600 pt-4 border-t border-warm-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-charcoal">{formatINR(cartSubtotal)}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-gold-700 font-semibold">
                      <span>Privilege Discount ({discountPercent}%)</span>
                      <span>-{formatINR(cartSubtotal * (discountPercent / 100))}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>White-Glove Shipping & Crating</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-green-700 font-medium">Complimentary</span>
                      ) : (
                        formatINR(shippingFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-[11px] text-charcoal-400">
                    <span>GST (Integrated 18%)</span>
                    <span>Included in Listed Prices</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-charcoal pt-4 border-t border-warm-200">
                    <span>Total Investment</span>
                    <span className="font-serif text-xl text-gold-700">{formatINR(cartFinalTotal)}</span>
                  </div>
                </div>

                {/* Proceed to Checkout button */}
                <button
                  type="button"
                  onClick={handleStartCheckout}
                  className="w-full py-4 bg-charcoal hover:bg-gold-500 hover:text-charcoal-950 text-warm-50 text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Lock className="w-4 h-4" />
                  <span>Proceed to Private Checkout</span>
                </button>

                <div className="text-center">
                  <Link
                    to="/shop"
                    className="text-xs text-charcoal-400 hover:text-gold-600 transition-colors uppercase tracking-wider font-semibold"
                  >
                    ← Continue Exploring Catalog
                  </Link>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>

      {/* Simulated Checkout Modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-md"
            onClick={() => checkoutStep !== 3 && setIsCheckingOut(false)}
          />

          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <div className="relative w-full max-w-2xl bg-white shadow-2xl border border-warm-200 overflow-hidden animate-fade-in-up">
              
              {/* Modal Header */}
              <div className="p-6 bg-warm-50 border-b border-warm-200 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-gold-600 font-bold block mb-1">
                    White-Glove Concierge Checkout
                  </span>
                  <h3 className="font-serif text-2xl text-charcoal font-normal">
                    {checkoutStep === 1 && "Step 1 of 2: Delivery & Installation Address"}
                    {checkoutStep === 2 && "Step 2 of 2: Payment Authentication"}
                    {checkoutStep === 3 && "Order Confirmed & Scheduled"}
                  </h3>
                </div>

                {checkoutStep !== 3 && (
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="p-2 text-charcoal-400 hover:text-charcoal rounded-full"
                    aria-label="Close checkout"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Step 1: Shipping Address Form */}
              {checkoutStep === 1 && (
                <form onSubmit={handleProceedToPayment} className="p-6 sm:p-8 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-charcoal-700 font-semibold mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.fullName}
                        onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                        className="w-full p-2.5 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal-700 font-semibold mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full p-2.5 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-charcoal-700 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={shippingForm.email}
                      onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                      className="w-full p-2.5 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-700 font-semibold mb-1">Residence / Site Address</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      className="w-full p-2.5 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-charcoal-700 font-semibold mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        className="w-full p-2.5 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal-700 font-semibold mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.state}
                        onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                        className="w-full p-2.5 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal-700 font-semibold mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.pincode}
                        onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                        className="w-full p-2.5 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center space-x-2 text-charcoal-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={shippingForm.installationNeeded}
                        onChange={(e) => setShippingForm({ ...shippingForm, installationNeeded: e.target.checked })}
                        className="text-gold-600 focus:ring-gold-500"
                      />
                      <span>Request complimentary installation consultation by certified technician</span>
                    </label>
                  </div>

                  <div className="pt-6 border-t border-warm-200 flex justify-between items-center">
                    <span className="text-xs text-charcoal-500">
                      Total Due: <span className="font-serif font-bold text-base text-charcoal">{formatINR(cartFinalTotal)}</span>
                    </span>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-charcoal hover:bg-gold-500 hover:text-charcoal-950 text-warm-50 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center space-x-2"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Payment Method */}
              {checkoutStep === 2 && (
                <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6 text-xs">
                  <div className="space-y-3">
                    <label className="block text-charcoal-700 font-semibold mb-2">
                      Select Payment Mode (Simulated Sandbox)
                    </label>

                    <div 
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border cursor-pointer flex items-center justify-between transition-all ${
                        paymentMethod === 'card' ? 'border-gold-500 bg-gold-50/50 ring-1 ring-gold-500' : 'border-warm-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-gold-600" />
                        <div>
                          <span className="font-semibold text-charcoal block">Luxury Corporate & Personal Cards</span>
                          <span className="text-charcoal-400 text-[11px]">Visa Infinite, Mastercard World Elite, Amex Centurion</span>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-gold-600' : 'border-warm-300'}`}>
                        {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-gold-600" />}
                      </div>
                    </div>

                    <div 
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 border cursor-pointer flex items-center justify-between transition-all ${
                        paymentMethod === 'upi' ? 'border-gold-500 bg-gold-50/50 ring-1 ring-gold-500' : 'border-warm-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Sparkles className="w-5 h-5 text-gold-600" />
                        <div>
                          <span className="font-semibold text-charcoal block">Instant Instant UPI / QR</span>
                          <span className="text-charcoal-400 text-[11px]">Google Pay, PhonePe, Paytm, BHIM</span>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'upi' ? 'border-gold-600' : 'border-warm-300'}`}>
                        {paymentMethod === 'upi' && <div className="w-2 h-2 rounded-full bg-gold-600" />}
                      </div>
                    </div>

                    <div 
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-4 border cursor-pointer flex items-center justify-between transition-all ${
                        paymentMethod === 'netbanking' ? 'border-gold-500 bg-gold-50/50 ring-1 ring-gold-500' : 'border-warm-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Building2 className="w-5 h-5 text-gold-600" />
                        <div>
                          <span className="font-semibold text-charcoal block">Private Banking NetBanking</span>
                          <span className="text-charcoal-400 text-[11px]">HDFC Imperia, ICICI Wealth, Kotak Privy, Axis Burgundy</span>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'netbanking' ? 'border-gold-600' : 'border-warm-300'}`}>
                        {paymentMethod === 'netbanking' && <div className="w-2 h-2 rounded-full bg-gold-600" />}
                      </div>
                    </div>
                  </div>

                  <div className="bg-warm-50 p-4 border border-warm-200 space-y-1 text-xs">
                    <div className="flex justify-between text-charcoal-600">
                      <span>Recipient:</span>
                      <span className="font-medium text-charcoal">{shippingForm.fullName}</span>
                    </div>
                    <div className="flex justify-between text-charcoal-600">
                      <span>Destination:</span>
                      <span className="font-medium text-charcoal">{shippingForm.city}, {shippingForm.pincode}</span>
                    </div>
                    <div className="flex justify-between text-charcoal-600 font-bold pt-2 border-t border-warm-200">
                      <span>Total to Authorize:</span>
                      <span className="font-serif text-base text-gold-700">{formatINR(cartFinalTotal)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-warm-200">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="text-xs text-charcoal-500 hover:text-charcoal underline"
                    >
                      ← Back to Address
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-widest transition-colors shadow-lg flex items-center space-x-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authorize {formatINR(cartFinalTotal)}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Order Confirmation */}
              {checkoutStep === 3 && (
                <div className="p-8 sm:p-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center mx-auto text-gold-600 animate-pulse-subtle">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-widest text-gold-600 font-bold block mb-1">
                      White-Glove Order Scheduled
                    </span>
                    <h3 className="font-serif text-3xl text-charcoal font-normal mb-2">
                      Thank You, {shippingForm.fullName}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-500 font-light max-w-md mx-auto">
                      Your order reference is <span className="font-mono font-bold text-charcoal">{orderId}</span>. A luxury transit docket and tracking dossier have been dispatched to <span className="font-semibold text-charcoal">{shippingForm.email}</span>.
                    </p>
                  </div>

                  <div className="bg-warm-50 border border-warm-200 p-6 max-w-md mx-auto text-left text-xs space-y-2">
                    <div className="flex justify-between text-charcoal-600">
                      <span>Delivery Address:</span>
                      <span className="font-medium text-charcoal text-right">{shippingForm.address}, {shippingForm.city}</span>
                    </div>
                    <div className="flex justify-between text-charcoal-600">
                      <span>Dispatch Facility:</span>
                      <span className="font-medium text-charcoal">Mumbai Central Atelier</span>
                    </div>
                    <div className="flex justify-between text-charcoal-600">
                      <span>Estimated Arrival:</span>
                      <span className="font-medium text-green-700">3-4 Business Days</span>
                    </div>
                    <div className="flex justify-between text-charcoal-600">
                      <span>LuminaCare Protection:</span>
                      <span className="font-medium text-gold-700">Active (5 Years)</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCheckingOut(false);
                        navigate('/shop');
                      }}
                      className="w-full sm:w-auto px-8 py-3.5 bg-charcoal hover:bg-gold-500 hover:text-charcoal-950 text-warm-50 text-xs uppercase tracking-widest font-semibold transition-colors"
                    >
                      Return to Collections
                    </button>
                    <Link
                      to="/"
                      onClick={() => setIsCheckingOut(false)}
                      className="w-full sm:w-auto px-8 py-3.5 border border-warm-300 text-charcoal hover:bg-warm-100 text-xs uppercase tracking-widest font-semibold transition-colors"
                    >
                      Return to Home
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
