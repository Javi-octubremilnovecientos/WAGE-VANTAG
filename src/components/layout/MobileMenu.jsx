import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Settings, FileText, CreditCard, Info, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserPlan } from '@/lib/UserPlanContext';

const menuItems = [
  { label: 'About', path: '/about', icon: Info },
  { label: 'Plans', path: '/plans', icon: CreditCard },
];

const authItems = [
  { label: 'Dashboard', path: '/dashboard', icon: BarChart3 },
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'My Templates', path: '/templates', icon: FileText },
  { label: 'Saved Comparisons', path: '/comparisons', icon: BarChart3 },
];

export default function MobileMenu({ open, onClose }) {
  const { isAuthenticated } = useUserPlan();

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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-72 bg-card border-l border-border z-50 p-6"
          >
            <button onClick={onClose} className="absolute top-4 right-4">
              <X className="w-5 h-5" />
            </button>

            <div className="mt-10 space-y-1">
              {menuItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            {isAuthenticated && (
              <>
                <div className="my-4 border-t border-border" />
                <div className="space-y-1">
                  {authItems.map(item => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}