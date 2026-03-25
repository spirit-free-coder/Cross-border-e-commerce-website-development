import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { Filter, ChevronDown, ChevronLeft, ChevronRight, ShoppingCart, Heart, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../constants';

export function Shop() {
  const { favorites, toggleFavorite, addToCart } = useApp();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="pt-32 pb-32 px-6 max-w-screen-xl mx-auto">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-primary text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-label text-sm font-bold"
          >
            <Check size={18} />
            Added to Sanctuary Collection
          </motion.div>
        )}
      </AnimatePresence>
      <section className="mb-20 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline italic mb-8 tracking-tight">Handcrafted Urns</h2>
        <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed opacity-80">
          Each vessel is a testament to the love you shared, crafted by artisans to hold their spirit with grace.
        </p>
      </section>

      <section className="mb-16">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-outline-variant/10 pb-8">
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <button className="bg-primary text-white px-6 py-2 rounded-full font-label text-sm tracking-wide shadow-sm">All Vessels</button>
            <button className="bg-surface-container-highest text-on-surface-variant px-6 py-2 rounded-full font-label text-sm tracking-wide hover:bg-primary-container transition-colors">Ceramic</button>
            <button className="bg-surface-container-highest text-on-surface-variant px-6 py-2 rounded-full font-label text-sm tracking-wide hover:bg-primary-container transition-colors">Natural Stone</button>
            <button className="bg-surface-container-highest text-on-surface-variant px-6 py-2 rounded-full font-label text-sm tracking-wide hover:bg-primary-container transition-colors">Artisan Wood</button>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-on-surface-variant font-label text-sm">
              <Filter size={16} />
              Refine
            </button>
            <div className="h-4 w-[1px] bg-outline-variant/20"></div>
            <button className="flex items-center gap-2 text-on-surface-variant font-label text-sm">
              Sort by Featured
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
        {PRODUCTS.map((product, index) => (
          <motion.article 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative ${index % 3 === 1 ? 'lg:translate-y-12' : ''}`}
          >
            <div className="aspect-[4/5] bg-surface-container-high rounded-lg overflow-hidden mb-8 shadow-sm transition-transform duration-700 group-hover:scale-[1.02] relative">
              <NavLink to={`/product/${product.id}`} className="block w-full h-full">
                <img 
                  alt={product.name} 
                  className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity" 
                  src={product.image}
                  referrerPolicy="no-referrer"
                />
              </NavLink>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high/40 to-transparent pointer-events-none"></div>
              
              {/* Floating Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-10">
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-all ${
                    favorites.includes(product.id) ? 'bg-tertiary text-white' : 'bg-white/90 text-on-surface hover:bg-tertiary hover:text-white'
                  }`}
                >
                  <Heart size={18} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
                </button>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="p-3 bg-white/90 backdrop-blur-md rounded-full text-on-surface shadow-lg hover:bg-primary hover:text-white transition-all"
                >
                  <ShoppingCart size={18} />
                </button>
              </div>
            </div>
            <div className="space-y-3 px-2">
              <div className="flex justify-between items-start">
                <NavLink to={`/product/${product.id}`}>
                  <h3 className="font-headline text-2xl text-on-surface italic tracking-tight hover:text-primary transition-colors">{product.name}</h3>
                </NavLink>
                <span className="font-label text-sm text-on-surface-variant font-light">${product.price}</span>
              </div>
              <p className="font-label text-xs uppercase tracking-[0.2em] text-primary font-semibold">{product.material}</p>
              <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <NavLink 
                  to={`/product/${product.id}`}
                  className="block w-full py-4 rounded-xl border border-outline-variant/20 font-label text-xs uppercase tracking-widest text-on-surface hover:bg-primary hover:text-white transition-all text-center"
                >
                  View Details
                </NavLink>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <div className="mt-24 flex justify-center items-center gap-8">
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-6 font-label text-sm font-medium">
          <span className="text-primary border-b border-primary">01</span>
          <span className="text-on-surface-variant/40 hover:text-on-surface-variant transition-colors cursor-pointer">02</span>
          <span className="text-on-surface-variant/40 hover:text-on-surface-variant transition-colors cursor-pointer">03</span>
        </div>
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
