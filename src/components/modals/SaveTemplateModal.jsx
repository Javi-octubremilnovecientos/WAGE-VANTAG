import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function SaveTemplateModal({ open, onClose, formData }) {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    await base44.entities.FormTemplate.create({
      name: name.trim(),
      country: formData.country,
      gender: formData.gender,
      monthly_wage: formData.monthly_wage,
      economic_activity: formData.economic_activity,
      occupation: formData.occupation,
      position: formData.position,
      education_level: formData.education_level,
      company_size: formData.company_size,
      experience_years: formData.experience_years,
    });
    setSaving(false);
    setName('');
    onClose();
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
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading font-bold text-lg">Save Template</h3>
              <button onClick={onClose} className="p-1">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Give this configuration a name to find it easily later.
            </p>

            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Senior Dev - Spain"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring mb-5"
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleSave()}
            />

            <button
              onClick={handleSave}
              disabled={!name.trim() || saving}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save'}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}