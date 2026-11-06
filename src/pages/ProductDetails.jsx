import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  Clock, 
  RotateCcw, 
  Check, 
  Share2, 
  Sparkles, 
  ChevronRight,
  Info,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { getProductById, products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatINR,
    showToast 
  } = useShop();

  const product = getProductById(id) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedTemp, setSelectedTemp] = useState('2700K Warm White');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'installation' | 'shipping'
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '', location: '' });

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
  }, [id]);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-serif text-2xl text-charcoal">Luminaire Not Found</h2>
        <Link to="/shop" className="text-gold-600 underline mt-4 inline-block">Return to Shop</Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const gallery = product.gallery || [product.image];
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedTemp);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) {
      showToast('Incomplete Review', 'Please provide your name and feedback.', 'error');
      return;
    }
    setShowReviewModal(false);
    showToast('Review Received', 'Thank you! Your verified review has been submitted for publication.', 'gold');
    setReviewForm({ name: '', rating: 5, comment: '', location: '' });
  };

  const colorTemperatures = [
    { label: '2700K Warm White', desc: 'Candle-like amber warmth for living rooms & master suites' },
    { label: '3000K Soft White', desc: 'Natural balanced illumination for dining & kitchen islands' },
    { label: '4000K Pure Daylight', desc: 'Crisp architectural clarity for home offices & galleries' }
  ];

  return (
    <div className="bg-warm-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-charcoal-400 mb-8 flex items-center space-x-2">
          <Link to="/" className="hover:text-gold-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gold-600 transition-colors">Luminaires</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-gold-600 transition-colors">
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-charcoal-700 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white border border-warm-200 p-6 sm:p-10 shadow-sm mb-16">
          
          {/* Left Column: Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnails (Vertical on desktop) */}
            {gallery.length > 1 && (
              <div className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-3 overflow-x-auto md:overflow-visible shrink-0 pb-2 md:pb-0">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 border overflow-hidden transition-all ${
                      activeImageIndex === idx 
                        ? 'border-gold-500 ring-2 ring-gold-400/40' 
                        : 'border-warm-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Featured Large Image with Ambient Warmth Glow */}
            <div className="relative flex-1 aspect-square bg-warm-100 overflow-hidden border border-warm-200 group">
              <img
                src={gallery[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {product.discount && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-charcoal text-gold-300 text-xs font-bold uppercase tracking-wider shadow-md">
                    {product.discount}
                  </span>
                </div>
              )}

              {/* Light warmth indicator pill */}
              <div className="absolute bottom-4 right-4 bg-charcoal/80 backdrop-blur-md px-3 py-1 text-[11px] text-gold-300 font-medium border border-gold-500/30">
                Light Temp: {selectedTemp.split(' ')[0]}
              </div>
            </div>

          </div>

          {/* Right Column: Buying Details (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="uppercase tracking-widest font-semibold text-gold-600">
                  {product.categoryName}
                </span>
                <div className="flex items-center space-x-1.5 text-charcoal-700">
                  <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                  <span className="font-bold text-xs">{product.rating}</span>
                  <span className="text-charcoal-400">({product.reviewCount} verified reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-charcoal tracking-tight mb-3">
                {product.name}
              </h1>

              {/* Tagline */}
              <p className="text-xs sm:text-sm text-gold-700 font-medium mb-4">
                {product.tagline}
              </p>

              {/* Price Row */}
              <div className="flex items-baseline space-x-3 mb-6 pb-6 border-b border-warm-200">
                <span className="font-serif text-3xl font-bold text-charcoal">
                  {formatINR(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-charcoal-400 line-through">
                    {formatINR(product.oldPrice)}
                  </span>
                )}
                {product.oldPrice && (
                  <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 border border-green-200">
                    Save {formatINR(product.oldPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed font-light mb-8">
                {product.description}
              </p>

              {/* Light Color Temperature Option */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider text-charcoal-700 font-semibold mb-2">
                  Integrated CCT Warmth:
                </label>
                <div className="space-y-2">
                  {colorTemperatures.map((temp) => (
                    <button
                      key={temp.label}
                      type="button"
                      onClick={() => setSelectedTemp(temp.label)}
                      className={`w-full p-3 text-left border text-xs transition-all flex items-center justify-between ${
                        selectedTemp === temp.label
                          ? 'border-gold-500 bg-gold-50/60 ring-1 ring-gold-500'
                          : 'border-warm-200 bg-white hover:border-warm-300'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-charcoal block">{temp.label}</span>
                        <span className="text-[11px] text-charcoal-500">{temp.desc}</span>
                      </div>
                      {selectedTemp === temp.label && (
                        <Check className="w-4 h-4 text-gold-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock status */}
              <div className="flex items-center space-x-2 text-xs text-green-700 font-medium mb-6">
                <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                <span>In Stock • Ready for dispatch from Mumbai Central Atelier</span>
              </div>
            </div>

            {/* Buying Action Area */}
            <div className="space-y-4 pt-4 border-t border-warm-200">
              <div className="flex items-center space-x-3">
                {/* Quantity */}
                <div className="flex items-center border border-warm-300 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-3 text-charcoal-600 hover:text-charcoal text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 text-xs font-semibold text-charcoal min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-3 text-charcoal-600 hover:text-charcoal text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-charcoal hover:bg-gold-500 hover:text-charcoal-950 text-warm-50 text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Shopping Bag</span>
                </button>

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 border transition-colors ${
                    isFavorited
                      ? 'border-gold-500 bg-gold-50 text-gold-600'
                      : 'border-warm-300 text-charcoal-600 hover:border-gold-400'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-3 pt-4 text-[11px] text-charcoal-500 border-t border-warm-100">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>Complimentary White-Glove Transit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>5-Year LuminaCare Coverage</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Tabbed Specifications & Technical Details */}
        <div className="bg-white border border-warm-200 mb-16 shadow-sm">
          
          <div className="flex border-b border-warm-200 text-xs uppercase tracking-wider font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`py-4 px-6 sm:px-8 border-b-2 transition-colors ${
                activeTab === 'specs' 
                  ? 'border-gold-500 text-charcoal font-bold bg-warm-50' 
                  : 'border-transparent text-charcoal-400 hover:text-charcoal'
              }`}
            >
              Architectural Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('installation')}
              className={`py-4 px-6 sm:px-8 border-b-2 transition-colors ${
                activeTab === 'installation' 
                  ? 'border-gold-500 text-charcoal font-bold bg-warm-50' 
                  : 'border-transparent text-charcoal-400 hover:text-charcoal'
              }`}
            >
              Installation & Care
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shipping')}
              className={`py-4 px-6 sm:px-8 border-b-2 transition-colors ${
                activeTab === 'shipping' 
                  ? 'border-gold-500 text-charcoal font-bold bg-warm-50' 
                  : 'border-transparent text-charcoal-400 hover:text-charcoal'
              }`}
            >
              Delivery & Warranty
            </button>
          </div>

          <div className="p-6 sm:p-10">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-warm-100">
                    <span className="text-charcoal-400 font-medium">Primary Materials</span>
                    <span className="font-semibold text-charcoal">{product.materials}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-warm-100">
                    <span className="text-charcoal-400 font-medium">Fixture Dimensions</span>
                    <span className="font-semibold text-charcoal">{product.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-warm-100">
                    <span className="text-charcoal-400 font-medium">Net Weight</span>
                    <span className="font-semibold text-charcoal">{product.weight}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-warm-100">
                    <span className="text-charcoal-400 font-medium">Power Wattage</span>
                    <span className="font-semibold text-charcoal">{product.wattage}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-warm-100">
                    <span className="text-charcoal-400 font-medium">Luminous Output</span>
                    <span className="font-semibold text-charcoal">{product.lumens}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-warm-100">
                    <span className="text-charcoal-400 font-medium">Color Temperature</span>
                    <span className="font-semibold text-charcoal">{product.colorTemp}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-warm-100">
                    <span className="text-charcoal-400 font-medium">Voltage Compatibility</span>
                    <span className="font-semibold text-charcoal">{product.voltage}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-warm-100">
                    <span className="text-charcoal-400 font-medium">Warranty Coverage</span>
                    <span className="font-semibold text-charcoal">{product.warranty}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'installation' && (
              <div className="space-y-4 text-xs sm:text-sm text-charcoal-600 max-w-3xl leading-relaxed">
                <h4 className="font-serif text-base font-semibold text-charcoal">
                  Professional Installation Recommended
                </h4>
                <p>
                  To preserve the fine finish and ensure optimal load distribution, LuminaLight recommends installation by a licensed electrician. LuminaLight offers complimentary installation coordination across Mumbai, Delhi NCR, Bengaluru, Hyderabad, and Chennai.
                </p>
                <div className="bg-warm-50 p-4 border border-warm-200 mt-4 space-y-2">
                  <p className="font-semibold text-charcoal">Care Instructions:</p>
                  <ul className="list-disc list-inside space-y-1 text-charcoal-500">
                    <li>Dust regularly with a dry, ultra-soft microfiber cloth.</li>
                    <li>Avoid abrasive cleaners, chemical polishes, or acid-based sprays on brass coatings.</li>
                    <li>For blown glass globes, gently wipe with warm water and mild neutral soap when cold.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 text-xs sm:text-sm text-charcoal-600 max-w-3xl leading-relaxed">
                <h4 className="font-serif text-base font-semibold text-charcoal">
                  White-Glove Delivery & 5-Year LuminaCare
                </h4>
                <p>
                  Each luminaire is packed in custom impact-absorbing foam and double-walled timber crates to eliminate transit vibration. Orders above ₹25,000 qualify for complimentary insured white-glove delivery to your doorstep.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-warm-50 border border-warm-200">
                    <span className="font-semibold text-charcoal block mb-1">Dispatch Timelines</span>
                    <span className="text-xs text-charcoal-500">2-4 business days for metropolitan centers; 5-7 business days for regional addresses.</span>
                  </div>
                  <div className="p-4 bg-warm-50 border border-warm-200">
                    <span className="font-semibold text-charcoal block mb-1">5-Year LuminaCare</span>
                    <span className="text-xs text-charcoal-500">Full replacement or repair of integrated LED drivers, wiring, and structural brass integrity.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Product Reviews Showcase & Interactive Submission */}
        <div className="bg-white border border-warm-200 p-6 sm:p-10 mb-16 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-warm-200 mb-8 gap-4">
            <div>
              <h3 className="font-serif text-2xl text-charcoal font-normal">
                Architectural Reviews & Testimonials
              </h3>
              <p className="text-xs text-charcoal-400 mt-1">
                Verified reviews from interior designers and homeowners
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowReviewModal(true)}
              className="px-6 py-2.5 bg-charcoal text-warm-50 hover:bg-gold-500 hover:text-charcoal-950 text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-warm-50 border border-warm-200 space-y-3">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                ))}
                <span className="text-xs font-semibold text-charcoal ml-2">Magnificent visual center</span>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed font-light">
                "The illumination from this luminaire creates the most inviting warmth in our living area. The brass quality is world-class, indistinguishable from high-end Italian design houses."
              </p>
              <div className="pt-2 text-xs text-charcoal-500 flex items-center justify-between">
                <span className="font-semibold text-charcoal">Vikramaditya S. — Bangalore</span>
                <span className="text-green-700 font-medium">Verified Purchase</span>
              </div>
            </div>

            <div className="p-6 bg-warm-50 border border-warm-200 space-y-3">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                ))}
                <span className="text-xs font-semibold text-charcoal ml-2">Exquisite finish & packaging</span>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed font-light">
                "Arrived in reinforced timber crates with each glass element individually protected. The tunable 2700K warmth gives our dining space an extraordinary evening charm."
              </p>
              <div className="pt-2 text-xs text-charcoal-500 flex items-center justify-between">
                <span className="font-semibold text-charcoal">Nalini K. — Mumbai</span>
                <span className="text-green-700 font-medium">Verified Purchase</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Luminaires */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold mb-1 block">
                Complementary Curations
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal">
                You May Also Admire
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Write Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div 
              className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm"
              onClick={() => setShowReviewModal(false)}
            />
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 shadow-2xl border border-warm-200">
                <h3 className="font-serif text-2xl text-charcoal mb-2">Share Your Experience</h3>
                <p className="text-xs text-charcoal-500 mb-6">Reviewing {product.name}</p>

                <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-charcoal-700 font-semibold mb-1">Your Rating</label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="p-1"
                        >
                          <Star className={`w-5 h-5 ${star <= reviewForm.rating ? 'fill-gold-400 text-gold-400' : 'text-warm-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-charcoal-700 font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      placeholder="e.g. Siddharth Kapoor"
                      required
                      className="w-full p-2.5 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-700 font-semibold mb-1">City / Region</label>
                    <input
                      type="text"
                      value={reviewForm.location}
                      onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                      placeholder="e.g. New Delhi"
                      className="w-full p-2.5 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-700 font-semibold mb-1">Your Review</label>
                    <textarea
                      rows={4}
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      placeholder="Share your thoughts on build quality, lighting ambiance, and installation..."
                      required
                      className="w-full p-2.5 bg-warm-50 border border-warm-300 text-charcoal focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="flex space-x-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowReviewModal(false)}
                      className="flex-1 py-3 border border-warm-300 text-charcoal hover:bg-warm-100 font-semibold uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-charcoal text-warm-50 hover:bg-gold-500 hover:text-charcoal-950 font-semibold uppercase tracking-wider transition-colors"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
