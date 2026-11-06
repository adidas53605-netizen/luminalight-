import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider = ({ children }) => {
  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('lumina_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [ambientLighting, setAmbientLighting] = useState('warm'); // 'warm' | 'natural' | 'dusk'

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('lumina_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('lumina_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Toast notification helper
  const showToast = (title, message, type = 'gold') => {
    const id = Date.now() + Math.random();
    const newToast = { id, title, message, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1, colorTemp = '2700K Warm') => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id && item.selectedTemp === colorTemp);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { ...product, quantity, selectedTemp: colorTemp }];
      }
    });

    showToast(
      'Added to Cart',
      `${quantity} × ${product.name} has been added to your shopping bag.`,
      'gold'
    );
  };

  const updateQuantity = (productId, newQuantity, selectedTemp) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, selectedTemp);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && (!selectedTemp || item.selectedTemp === selectedTemp)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId, selectedTemp) => {
    setCart(prevCart =>
      prevCart.filter(item =>
        !(item.id === productId && (!selectedTemp || item.selectedTemp === selectedTemp))
      )
    );
    showToast('Removed from Bag', 'Item removed from your shopping bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast('Removed from Wishlist', `${product.name} was removed from your curated list.`, 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      showToast('Saved to Wishlist', `${product.name} was saved to your private collection.`, 'gold');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Coupon handling
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'LUMINA10' || cleanCode === 'WELCOME10') {
      setCouponCode(cleanCode);
      setDiscountPercent(10);
      showToast('Promo Code Applied', '10% celebratory luxury discount applied!', 'gold');
      return { success: true, message: '10% discount applied successfully!' };
    } else if (cleanCode === 'ARCHITECT15') {
      setCouponCode(cleanCode);
      setDiscountPercent(15);
      showToast('Design Trade Privilege', '15% Architect & Designer discount applied!', 'gold');
      return { success: true, message: '15% Architect privilege applied!' };
    } else {
      showToast('Invalid Code', 'The entered promotion code is not active or invalid.', 'error');
      return { success: false, message: 'Invalid promotion code' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
    showToast('Coupon Removed', 'Promotion code has been removed.', 'info');
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartOriginalTotal = cart.reduce((acc, item) => acc + (item.oldPrice || item.price) * item.quantity, 0);
  const totalSavings = (cartOriginalTotal - cartSubtotal) + (cartSubtotal * (discountPercent / 100));
  const couponDiscountAmount = cartSubtotal * (discountPercent / 100);
  const shippingThreshold = 25000;
  const isFreeShipping = cartSubtotal >= shippingThreshold || cartSubtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 1500;
  const cartFinalTotal = cartSubtotal - couponDiscountAmount + shippingFee;
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Formatter for Indian Rupee
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        cartOriginalTotal,
        totalSavings,
        couponCode,
        discountPercent,
        couponDiscountAmount,
        shippingFee,
        isFreeShipping,
        shippingThreshold,
        cartFinalTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        applyCoupon,
        removeCoupon,
        toasts,
        showToast,
        removeToast,
        ambientLighting,
        setAmbientLighting,
        formatINR,
        allProducts: products
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
