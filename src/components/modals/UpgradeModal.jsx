import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PREMIUM_FEATURES = [
  'Compare up to 3 countries',
  'Save up to 4 templates',
  'Save up to 4 comparisons',
  'Export comparisons (PDF, CSV, PNG)',
  'Multiple chart views (bar, density, sector)',
  'Full historical wage data & premium analytics',
];

export default function UpgradeModal({ open, onClose, feature = '' }) {
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
            className="fixed inset-x-4 top-4 bottom-4 z-50 max-w-sm mx-auto bg-card rounded-2xl border border-border shadow-2xl p-6 overflow-y-auto flex flex-col justify-center"
          >
            <button onClick={onClose} className="absolute top-4 right-4">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Crown className="w-5 h-5 text-secondary-foreground" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-1">Upgrade to Premium</h3>
              {feature && (
                <p className="text-sm text-muted-foreground mb-4">
                  {feature} requires a Premium plan
                </p>
              )}

              <div className="text-left space-y-2 mb-6 bg-muted/50 rounded-xl p-4">
                {PREMIUM_FEATURES.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/plans"
                onClick={onClose}
                className="block w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity mb-3 text-center"
              >
                Upgrade Now
              </Link>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-muted text-muted-foreground font-medium text-sm hover:bg-muted/80 transition-colors"
              >
                Not now
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}