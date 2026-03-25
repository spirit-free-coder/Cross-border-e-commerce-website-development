import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavLink, useNavigate } from 'react-router-dom';

export function Cart() {
  const { cartItems, removeFromCart, updateQuantity, checkout } = useApp();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await checkout();
      setOrderPlaced(true);
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="pt-40 pb-32 px-6 max-w-screen-xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface-container-low rounded-3xl p-12 md:p-24 border border-outline-variant/10 max-w-2xl mx-auto"
        >
          <CheckCircle2 className="mx-auto text-primary mb-8" size={80} />
          <h2 className="text-4xl font-headline italic mb-6">Order Placed Successfully</h2>
          <p className="text-on-surface-variant mb-12 max-w-md mx-auto leading-relaxed">
            Your tribute has been received. We are preparing your vessels with the utmost care. You will be redirected to your profile shortly.
          </p>
          <NavLink 
            to="/profile" 
            className="inline-block bg-primary text-white px-12 py-5 rounded-2xl font-bold tracking-widest uppercase hover:scale-105 transition-all shadow-xl shadow-primary/20"
          >
            View Order History
          </NavLink>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-40 pb-32 px-6 max-w-screen-xl mx-auto text-center">
        <div className="bg-surface-container-low rounded-3xl p-12 md:p-24 border border-outline-variant/10 max-w-2xl mx-auto">
          <ShoppingBag className="mx-auto text-primary/20 mb-8" size={80} />
          <h2 className="text-4xl font-headline italic mb-6">Your Sanctuary is Empty</h2>
          <p className="text-on-surface-variant mb-12 max-w-md mx-auto leading-relaxed">
            It seems you haven't added any vessels to your collection yet. Explore our handcrafted urns to find the perfect tribute.
          </p>
          <NavLink 
            to="/shop" 
            className="inline-block bg-primary text-white px-12 py-5 rounded-2xl font-bold tracking-widest uppercase hover:scale-105 transition-all shadow-xl shadow-primary/20"
          >
            Browse Collection
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 max-w-screen-xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-headline italic mb-16 text-center tracking-tight">Your Sanctuary Collection</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {cartItems.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm border border-outline-variant/5 hover:shadow-md transition-shadow"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 bg-surface-container-high rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover mix-blend-multiply opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-headline italic mb-2">{item.name}</h3>
                  <p className="text-primary font-label text-xs uppercase tracking-widest mb-4">{item.material}</p>
                  <div className="flex items-center justify-center md:justify-start gap-6">
                    <div className="flex items-center bg-surface-container-highest rounded-full px-4 py-2 gap-4">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-label font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-on-surface-variant/40 hover:text-error transition-colors p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-headline italic">${item.price * item.quantity}</p>
                  <p className="text-xs text-on-surface-variant/60 font-label mt-1">${item.price} each</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-low rounded-3xl p-10 border border-outline-variant/10 sticky top-32">
            <h2 className="text-3xl font-headline italic mb-8">Summary</h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between text-on-surface-variant font-body">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant font-body">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <div className="h-[1px] bg-outline-variant/10"></div>
              <div className="flex justify-between text-2xl font-headline italic">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold tracking-widest uppercase hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              {!isCheckingOut && <ArrowRight className="transition-transform group-hover:translate-x-2" size={18} />}
            </button>
            
            <p className="text-center text-xs text-on-surface-variant/60 mt-8 font-body leading-relaxed">
              Taxes and duties are calculated at checkout based on your shipping address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
