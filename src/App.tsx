import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TopAppBar, BottomNavBar } from './components/Navigation';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Story } from './pages/Story';
import { Support } from './pages/Support';
import { Profile } from './pages/Profile';
import { Cart } from './pages/Cart';
import { ProductDetail } from './pages/ProductDetail';
import { Login } from './pages/Login';
import { AppProvider, useApp } from './context/AppContext';
import { NavLink, Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useApp();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-spin text-primary">
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <TopAppBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/story" element={<Story />} />
              <Route path="/support" element={<Support />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <footer className="bg-surface-container py-24 px-6 text-center border-t border-outline-variant/5">
            <h4 className="text-3xl font-headline italic text-primary mb-8">The Eternal Garden</h4>
            <div className="flex justify-center gap-12 mb-12">
              <NavLink className="text-sm font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" to="/story">Our Mission</NavLink>
              <NavLink className="text-sm font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" to="/support">Resources</NavLink>
              <NavLink className="text-sm font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" to="/support">Support</NavLink>
            </div>
            <p className="text-xs font-label text-on-surface-variant/50 uppercase tracking-[0.2em]">© 2024 The Eternal Garden Sanctuary. All rights reserved.</p>
          </footer>
          <BottomNavBar />
        </div>
      </Router>
    </AppProvider>
  );
}
