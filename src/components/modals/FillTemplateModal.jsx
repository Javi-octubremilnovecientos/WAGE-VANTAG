import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useUserPlan } from '@/lib/UserPlanContext';
import UpgradeModal from './UpgradeModal';

export default function FillTemplateModal({ open, onClose, onApply }) {
  const { isPremium } = useUserPlan();
  const [selected, setSelected] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: () => base44.entities.FormTemplate.list('-created_date'),
    enabled: open,
  });

  const handleSelect = (template) => {
    if (!isPremium && selected && selected.id !== template.id) {
      setShowUpgrade(true);
      return;
    }
    setSelected(prev => prev?.id === template.id ? null : template);
  };

  const handleApply = () => {
    if (!selected) return;
    onApply(selected);
    setSelected(null);
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
              className="fixed inset-x-0 bottom-0 z-50 bg-card rounded-t-2xl border-t border-border shadow-2xl p-6 max-h-[75vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading font-bold text-lg">My Templates</h3>
                <button onClick={onClose} className="p-1">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2].map(i => (
                    <div key={i} className="bg-muted rounded-xl p-4 animate-pulse h-16" />
                  ))}
                </div>
              ) : templates.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No templates saved yet</p>
                </div>
              ) : (
                <div className="space-y-2 mb-5">
                  {templates.map(template => {
                    const isSelected = selected?.id === template.id;
                    const isDisabled = !isPremium && selected && !isSelected;
                    return (
                      <button
                        key={template.id}
                        onClick={() => handleSelect(template)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : isDisabled
                            ? 'border-border bg-muted/30 opacity-50 cursor-not-allowed'
                            : 'border-border bg-card hover:border-primary/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{template.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {template.country} · {template.gender || 'Any'}
                            </p>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}

              <button
                onClick={handleApply}
                disabled={!selected}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Apply Template
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <UpgradeModal
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        feature="Selecting multiple templates"
      />
    </>
  );
}