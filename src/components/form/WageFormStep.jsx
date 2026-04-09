import React from 'react';
import { ChevronRight, ChevronLeft, Save, ClipboardList } from 'lucide-react';
import CountrySelector from './CountrySelector';
import SelectField from './SelectField';
import {
  ECONOMIC_ACTIVITIES, OCCUPATIONS, POSITIONS,
  EDUCATION_LEVELS, COMPANY_SIZES, EXPERIENCE_RANGES
} from '@/lib/wageData';
import { motion, AnimatePresence } from 'framer-motion';

const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

// Step definitions: each step shows 3 fields
const STEP_FIELDS = [
  // Step 0
  [
    { key: 'country', label: 'Country', type: 'country' },
    { key: 'gender', label: 'Gender', type: 'select', options: GENDERS },
    { key: 'monthly_wage', label: 'Monthly Wage', type: 'number', suffix: '€' },
  ],
  // Step 1
  [
    { key: 'economic_activity', label: 'Economic Activity', type: 'select', options: ECONOMIC_ACTIVITIES, searchable: true },
    { key: 'occupation', label: 'Occupation', type: 'select', options: OCCUPATIONS, searchable: true },
    { key: 'position', label: 'Position', type: 'select', options: POSITIONS },
  ],
  // Step 2
  [
    { key: 'education_level', label: 'Education Level', type: 'select', options: EDUCATION_LEVELS },
    { key: 'company_size', label: 'Company Size', type: 'select', options: COMPANY_SIZES },
    { key: 'experience_years', label: 'Experience (years)', type: 'select', options: EXPERIENCE_RANGES },
  ],
];

export default function WageFormStep({
  formData,
  updateFormData,
  onCountrySet,
  step,
  totalSteps,
  onNext,
  onBack,
  onGoToSheet,
  onSaveTemplate,
  onFillTemplate,
  hasCountrySelected,
  isLastStep,
  isAuthenticated,
}) {
  const fields = STEP_FIELDS[step] || [];

  const renderField = (field) => {
    const value = formData[field.key];

    if (field.type === 'country') {
      return (
        <CountrySelector
          key={field.key}
          value={value}
          onChange={(v) => {
            updateFormData('country', v);
            onCountrySet(v);
          }}
        />
      );
    }

    if (field.type === 'number') {
      return (
        <div className="relative" key={field.key}>
          <input
            type="number"
            value={value || ''}
            onChange={e => updateFormData(field.key, e.target.value ? Number(e.target.value) : 0)}
            placeholder="0"
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-10"
          />
          {field.suffix && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {field.suffix}
            </span>
          )}
        </div>
      );
    }

    return (
      <SelectField
        key={field.key}
        value={value}
        onChange={(v) => updateFormData(field.key, v)}
        options={field.options || []}
        searchable={field.searchable}
      />
    );
  };

  return (
    <div>
      {/* Step indicator */}
      {hasCountrySelected && (
        <div className="flex items-center gap-1.5 mb-5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                i <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      )}

      {/* Fields — animated transition between steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {fields.map((field, idx) => (
            <div key={field.key}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-foreground">
                  {field.label}
                </label>
                {/* "Fill with a template" button — only on first field of step 0 */}
                {step === 0 && idx === 0 && (
                  <button
                    onClick={onFillTemplate}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ClipboardList className="w-3.5 h-3.5" />
                    Fill with a template
                  </button>
                )}
              </div>
              {renderField(field)}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Action buttons */}
      <div className="pt-5 space-y-3">
        {/* Navigation row */}
        <div className={`flex gap-3 ${step > 0 ? 'flex-row' : ''}`}>
          {step > 0 && (
            <button
              onClick={onBack}
              className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-muted text-foreground font-heading font-semibold text-sm hover:bg-muted/80 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          )}

          {!isLastStep ? (
            <button
              onClick={onNext}
              disabled={!formData.country}
              className="flex-1 py-3 rounded-2xl bg-foreground text-background font-heading font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onGoToSheet}
              className="flex-1 py-3 rounded-2xl bg-foreground text-background font-heading font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              View Comparison Sheet
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Save template — only on last step */}
        {isLastStep && (
          <button
            onClick={onSaveTemplate}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Save className="w-3 h-3" />
            {isAuthenticated ? 'Save as template' : 'Sign in to save template'}
          </button>
        )}
      </div>
    </div>
  );
}