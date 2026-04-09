import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SelectField({ label, value, onChange, options, placeholder = '- -', searchable = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = searchable && search
    ? options.filter(o => o.toLowerCase().includes(search.toLowerCase()))
    : options;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-left flex items-center justify-between hover:border-ring/50 transition-colors"
      >
        <span className={`truncate ${value ? 'text-foreground' : 'text-muted-foreground'}`}>
          {value || placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-40 max-h-48 overflow-y-auto"
          >
            {searchable && (
              <div className="p-2 border-b border-border">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Search..."
                  autoFocus
                />
              </div>
            )}
            <div className="p-1">
              {filtered.map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => { onChange(option); setIsOpen(false); setSearch(''); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    option === value ? 'bg-muted font-medium' : 'hover:bg-muted/50'
                  }`}
                >
                  <span className="truncate">{option}</span>
                  {option === value && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}