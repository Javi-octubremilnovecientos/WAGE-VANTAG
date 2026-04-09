import React from 'react';
import { ChevronRight, FileText, Save } from 'lucide-react';
import CountrySelector from './CountrySelector';
import SelectField from './SelectField';
import {
  ECONOMIC_ACTIVITIES, OCCUPATIONS, POSITIONS,
  EDUCATION_LEVELS, COMPANY_SIZES, EXPERIENCE_RANGES
} from '@/lib/wageData';

const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

export default function WageForm({
  formData,
  setFormData,
  step,
  onNext,
  onCompare,
  onGoToSheet,
  onSaveTemplate,
  hasCountrySelected,
}) {
  const update = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-5">
      {/* Step 1: Country, Gender, Monthly Wage */}
      {step >= 0 && (
        <>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-foreground">Country</label>
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <FileText className="w-3 h-3" />
                Fill with a template
              </button>
            </div>
            <CountrySelector
              value={formData.country}
              onChange={(v) => update('country', v)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Gender</label>
            <SelectField
              value={formData.gender}
              onChange={(v) => update('gender', v)}
              options={GENDERS}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Monthly Wage</label>
            <div className="relative">
              <input
                type="number"
                value={formData.monthly_wage || ''}
                onChange={(e) => update('monthly_wage', e.target.value ? Number(e.target.value) : 0)}
                placeholder="0"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">€</span>
            </div>
          </div>
        </>
      )}

      {/* Step 2: Economic Activity, Occupation, Position */}
      {step >= 2 && (
        <>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-foreground">Economic Activity</label>
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <FileText className="w-3 h-3" />
                Fill with a template
              </button>
            </div>
            <SelectField
              value={formData.economic_activity}
              onChange={(v) => update('economic_activity', v)}
              options={ECONOMIC_ACTIVITIES}
              searchable
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Occupation</label>
            <SelectField
              value={formData.occupation}
              onChange={(v) => update('occupation', v)}
              options={OCCUPATIONS}
              searchable
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Position</label>
            <SelectField
              value={formData.position}
              onChange={(v) => update('position', v)}
              options={POSITIONS}
            />
          </div>
        </>
      )}

      {/* Step 3: Education, Company Size, Experience */}
      {step >= 3 && (
        <>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-foreground">Education level</label>
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <FileText className="w-3 h-3" />
                Fill with a template
              </button>
            </div>
            <SelectField
              value={formData.education_level}
              onChange={(v) => update('education_level', v)}
              options={EDUCATION_LEVELS}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Company Size</label>
            <SelectField
              value={formData.company_size}
              onChange={(v) => update('company_size', v)}
              options={COMPANY_SIZES}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Experience (years)</label>
            <SelectField
              value={formData.experience_years}
              onChange={(v) => update('experience_years', v)}
              options={EXPERIENCE_RANGES}
            />
          </div>

          {/* Save as template */}
          <button
            onClick={onSaveTemplate}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
          >
            <Save className="w-3 h-3" />
            Save as a template
          </button>
        </>
      )}

      {/* Action buttons */}
      <div className="pt-2 space-y-3">
        {hasCountrySelected && step < 3 && (
          <button
            onClick={onCompare}
            className="w-full py-3 rounded-2xl bg-muted text-foreground font-heading font-semibold text-sm hover:bg-muted/80 transition-colors"
          >
            Compare
          </button>
        )}

        {step < 3 ? (
          <button
            onClick={onNext}
            disabled={!formData.country}
            className="w-full py-3 rounded-2xl bg-foreground text-background font-heading font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onGoToSheet}
            className="w-full py-3 rounded-2xl bg-foreground text-background font-heading font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            Go to comparison sheet
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}