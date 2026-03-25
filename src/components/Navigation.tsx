import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sprout, ShoppingCart, Home as HomeIcon, Store, BookOpen, HeartPulse, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { useApp } from '../context/AppContext';

export function TopAppBar() {
  const { cartCount } = useApp();
  
  return (
    <header className="fixed top-0 w-full z-50 glass-nav border-b border-on-surface/5">
      <div className="flex justify-between items-center px-6 h-20 w-full max-w-screen-2xl mx-auto">
        <NavLink to="/" className="flex items-center gap-2 text-primary hover:scale-105 transition-transform duration-300">
          <Sprout size={28} />
          <h1 className="text-2xl font-headline text-on-surface tracking-wide italic">Eternal Garden</h1>
        </NavLink>

        <nav className="hidden md:flex gap-10 items-center">
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              "font-label text-xs uppercase tracking-[0.2em] font-bold transition-colors",
              isActive ? "text-primary" : "text-on-surface/60 hover:text-primary"
            )}
          >
            Home
          </NavLink>
          <NavLink 
            to="/shop" 
            className={({ isActive }) => cn(
              "font-label text-xs uppercase tracking-[0.2em] font-bold transition-colors",
              isActive ? "text-primary" : "text-on-surface/60 hover:text-primary"
            )}
          >
            Shop
          </NavLink>
          <NavLink 
            to="/story" 
            className={({ isActive }) => cn(
              "font-label text-xs uppercase tracking-[0.2em] font-bold transition-colors",
              isActive ? "text-primary" : "text-on-surface/60 hover:text-primary"
            )}
          >
            Story
          </NavLink>
          <NavLink 
            to="/support" 
            className={({ isActive }) => cn(
              "font-label text-xs uppercase tracking-[0.2em] font-bold transition-colors",
              isActive ? "text-primary" : "text-on-surface/60 hover:text-primary"
            )}
          >
            Support
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <NavLink to="/profile" className="text-on-surface hover:scale-110 transition-transform duration-300">
            <User size={24} />
          </NavLink>
          <NavLink to="/cart" className="text-on-surface hover:scale-110 transition-transform duration-300 relative">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-tertiary text-[10px] text-white font-bold">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export function BottomNavBar() {
  const navItems = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/shop", label: "Shop", icon: Store },
    { to: "/story", label: "Story", icon: BookOpen },
    { to: "/profile", label: "Account", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-2xl rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(54,57,43,0.04)] border-t border-on-surface/10 px-4 pb-8 pt-4">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center gap-1 px-4 py-2 transition-all duration-300",
              isActive ? "text-primary bg-primary-container/30 rounded-full" : "text-on-surface/40"
            )}
          >
            <item.icon size={24} />
            <span className="font-label text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
