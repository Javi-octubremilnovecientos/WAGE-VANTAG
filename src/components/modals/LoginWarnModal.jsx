import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function LoginWarnModal({ open, onClose, message = "Sign in to save your data" }) {
  const handleLogin = () => {
    base44.auth.redirectToLogin(window.location.pathname);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-sm mx-auto bg-card rounded-2xl border border-border shadow-2xl p-6"
          >
            <button onClick={onClose} className="absolute top-4 right-4">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Sign In Required</h3>
              <p className="text-sm text-muted-foreground mb-6">{message}</p>

              <button
                onClick={handleLogin}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity mb-3"
              >
                Sign In
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-muted text-muted-foreground font-medium text-sm hover:bg-muted/80 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}