import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ChevronDown, Check } from 'lucide-react';
import { EU_COUNTRIES } from '@/lib/wageData';
import UpgradeModal from './UpgradeModal';

// Inline country picker that disables firstCountry
function ComparatorCountryPicker({ value, onChange, disabledCountry, alreadySelected = [] }) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filtered = EU_COUNTRIES.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (country) => {
    if (country === disabledCountry) return;
    onChange(country);
    setSearch('');
    setIsOpen(false);
  };

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
            className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-40 max-h-48 overflow-y-auto"
          >
            <div className="p-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring mb-1"
                placeholder="Search..."
                autoFocus
              />
            </div>
            <div className="px-1 pb-1">
              {filtered.map(country => {
                const isDisabled = country === disabledCountry;
                const isSelected = country === value;
                return (
                  <button
                    key={country}
                    onClick={() => handleSelect(country)}
                    disabled={isDisabled}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      isDisabled
                        ? 'opacity-30 cursor-not-allowed text-muted-foreground'
                        : isSelected
                        ? 'bg-muted font-medium'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    {country}
                    {isDisabled && <span className="text-xs text-muted-foreground">Selected</span>}
                    {isSelected && !isDisabled && <Check className="w-4 h-4 text-primary" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// firstCountry: the country already selected by the user in the main form
export default function ComparatorModal({ open, onClose, countries, onUpdate, maxCountries = 2, firstCountry = '' }) {
  // The modal only manages the ADDITIONAL countries (index 1+).
  const additionalSlots = countries.slice(1);
  const [localAdditional, setLocalAdditional] = useState(
    additionalSlots.length > 0 ? additionalSlots : ['']
  );
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Max additional = maxCountries - 1 (since slot 0 is taken by firstCountry)
  const maxAdditional = maxCountries - 1;

  const addCountry = () => {
    if (localAdditional.filter(c => c).length >= maxAdditional) {
      setShowUpgrade(true);
      return;
    }
    setLocalAdditional([...localAdditional, '']);
  };

  const removeCountry = (idx) => {
    const updated = localAdditional.filter((_, i) => i !== idx);
    setLocalAdditional(updated.length > 0 ? updated : ['']);
  };

  const updateCountry = (idx, value) => {
    const updated = [...localAdditional];
    updated[idx] = value;
    setLocalAdditional(updated);
  };

  const handleApply = () => {
    const additional = localAdditional.filter(c => c);
    onUpdate([firstCountry, ...additional].filter(c => c));
    onClose();
  };

  return (
    <>
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
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-card rounded-t-2xl border-t border-border shadow-2xl p-6 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-lg">Compare Countries</h3>
                <button onClick={onClose}>
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* First country: read-only */}
              {firstCountry && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-1.5">Your country</p>
                  <div className="px-4 py-2.5 rounded-xl bg-muted text-sm font-medium text-muted-foreground border border-border">
                    {firstCountry}
                  </div>
                </div>
              )}

              {/* Additional countries */}
              <div className="space-y-3 mb-4">
                <p className="text-xs text-muted-foreground">Compare with</p>
                {localAdditional.map((country, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="flex-1">
                      <ComparatorCountryPicker
                        value={country}
                        onChange={(v) => updateCountry(idx, v)}
                        disabledCountry={firstCountry}
                        alreadySelected={localAdditional.filter((_, i) => i !== idx)}
                      />
                    </div>
                    {localAdditional.length > 1 && (
                      <button onClick={() => removeCountry(idx)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {localAdditional.filter(c => c).length >= maxAdditional ? (
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-opacity mb-6 opacity-60"
                >
                  + Add another country (Premium)
                </button>
              ) : null}

              <button
                onClick={handleApply}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Apply Comparison
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <UpgradeModal
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        feature="Comparing more than 2 countries"
      />
    </>
  );
}