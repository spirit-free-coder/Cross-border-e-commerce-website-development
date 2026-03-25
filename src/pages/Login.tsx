import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sprout, LogIn } from 'lucide-react';
import { loginWithGoogle } from '../firebase';
import { useApp } from '../context/AppContext';

export function Login() {
  const { user, loading } = useApp();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-primary"
        >
          <Sprout size={48} />
        </motion.div>
      </div>
    );
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-6">
      <div className="max-w-md w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-low rounded-[3rem] p-12 shadow-2xl border border-outline-variant/10 text-center"
        >
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-primary/10 rounded-full text-primary">
              <Sprout size={48} />
            </div>
          </div>
          
          <h1 className="text-4xl font-headline italic text-on-surface mb-4">Welcome Back</h1>
          <p className="text-on-surface-variant font-body mb-12 opacity-80">
            Sign in to access your sanctuary collection and tributes.
          </p>

          <button 
            onClick={handleLogin}
            className="w-full bg-on-surface text-surface py-5 rounded-2xl font-bold tracking-widest uppercase hover:bg-primary transition-all flex items-center justify-center gap-4 shadow-xl"
          >
            <LogIn size={20} />
            Continue with Google
          </button>

          <p className="mt-12 text-xs text-on-surface-variant/40 font-label uppercase tracking-widest leading-relaxed">
            By continuing, you agree to our <br />
            <span className="underline cursor-pointer hover:text-primary">Terms of Service</span> & <span className="underline cursor-pointer hover:text-primary">Privacy Policy</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
