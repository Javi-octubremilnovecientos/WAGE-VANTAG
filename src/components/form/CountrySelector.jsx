import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import { EU_COUNTRIES } from '@/lib/wageData';
import { motion, AnimatePresence } from 'framer-motion';

export default function CountrySelector({ value, onChange, onClose, isModal = false }) {
  const [search, setSearch] = useState(value || '');
  const [isOpen, setIsOpen] = useState(isModal);
  const inputRef = useRef(null);

  const filtered = EU_COUNTRIES.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (country) => {
    onChange(country);
    setSearch(country);
    setIsOpen(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (isModal) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-x-0 bottom-0 z-50 bg-card rounded-t-2xl border-t border-border shadow-2xl p-5 max-h-[70vh] flex flex-col"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-semibold text-lg">Country</h3>
          <button onClick={onClose} className="p-1">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <div className="relative mb-3">
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Search country..."
          />
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex-1 overflow-y-auto space-y-0.5">
          {filtered.map(country => (
            <button
              key={country}
              onClick={() => handleSelect(country)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
                country === value
                  ? 'bg-muted font-medium text-foreground'
                  : 'hover:bg-muted/50 text-muted-foreground'
              }`}
            >
              {country}
              {country === value && <Check className="w-4 h-4 text-primary" />}
            </button>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-left flex items-center justify-between hover:border-ring/50 transition-colors"
      >
        <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
          {value || '- -'}
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-40 max-h-56 overflow-y-auto"
          >
            <div className="p-2">
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring mb-1"
                placeholder="Search..."
              />
            </div>
            <div className="px-1 pb-1">
              {filtered.map(country => (
                <button
                  key={country}
                  onClick={() => handleSelect(country)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    country === value
                      ? 'bg-muted font-medium'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  {country}
                  {country === value && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}