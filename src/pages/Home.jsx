import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2 } from 'lucide-react';
import BoxPlotChart from '@/components/charts/BoxPlotChart';
import WageFormStep from '@/components/form/WageFormStep';
import LoginWarnModal from '@/components/modals/LoginWarnModal';
import UpgradeModal from '@/components/modals/UpgradeModal';
import ComparatorModal from '@/components/modals/ComparatorModal';
import FillTemplateModal from '@/components/modals/FillTemplateModal';
import SaveTemplateModal from '@/components/modals/SaveTemplateModal';
import { COUNTRY_WAGE_DATA } from '@/lib/wageData';
import { useUserPlan } from '@/lib/UserPlanContext';
import { base44 } from '@/api/base44Client';

const INITIAL_FORM = {
  country: '',
  gender: '',
  monthly_wage: 0,
  economic_activity: '',
  occupation: '',
  position: '',
  education_level: '',
  company_size: '',
  experience_years: '',
};

// Steps: 0=country+gender+wage, 1=activity+occupation+position, 2=education+size+experience
const STEPS = [
  ['country', 'gender', 'monthly_wage'],
  ['economic_activity', 'occupation', 'position'],
  ['education_level', 'company_size', 'experience_years'],
];

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, isPremium, maxCountries } = useUserPlan();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [step, setStep] = useState(0);
  const [countries, setCountries] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showComparatorModal, setShowComparatorModal] = useState(false);
  const [showFillTemplateModal, setShowFillTemplateModal] = useState(false);
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState('');

  const hasCountrySelected = countries.length > 0;

  const updateFormData = (field, value) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      // Sync countries list when country field changes
      if (field === 'country') {
        if (value) {
          setCountries(prev_c => {
            const updated = [...prev_c];
            updated[0] = value;
            return updated.length === 0 ? [value] : updated;
          });
        }
      }
      return next;
    });
  };

  // When country set from step 0, ensure it's in countries
  const handleCountrySet = (country) => {
    if (country && !countries[0]) {
      setCountries([country]);
    } else if (country) {
      setCountries(prev => { const u = [...prev]; u[0] = country; return u; });
    }
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const handleCompare = () => {
    setShowComparatorModal(true);
  };

  const handleGoToSheet = () => {
    const params = new URLSearchParams({
      countries: countries.join(','),
      wage: formData.monthly_wage || 0,
    });
    navigate(`/wage-comparison?${params.toString()}`);
  };

  const handleSaveTemplate = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    // Check template limit for free users
    if (!isPremium) {
      const existing = await base44.entities.FormTemplate.list();
      if (existing.length >= 1) {
        setUpgradeFeature('Saving more than 1 template');
        setShowUpgradeModal(true);
        return;
      }
    }
    setShowSaveTemplateModal(true);
  };

  const handleFillTemplate = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setShowFillTemplateModal(true);
  };

  const handleApplyTemplate = (template) => {
    const fields = ['country', 'gender', 'monthly_wage', 'economic_activity', 'occupation', 'position', 'education_level', 'company_size', 'experience_years'];
    fields.forEach(f => {
      if (template[f] !== undefined && template[f] !== null) {
        updateFormData(f, template[f]);
      }
    });
    if (template.country) {
      setCountries(prev => { const u = [...prev]; u[0] = template.country; return u; });
    }
  };

  const handleCountriesUpdate = (newCountries) => {
    if (newCountries.length > maxCountries) {
      setUpgradeFeature(`Comparing more than ${maxCountries} countries`);
      setShowUpgradeModal(true);
      return;
    }
    setCountries(newCountries);
  };

  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-lg mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 pb-2"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
            Wage Comparator
          </h1>
        </motion.div>

        {/* Prompt shown before country is selected */}
        <AnimatePresence>
          {!hasCountrySelected && (
            <motion.p
              key="subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-muted-foreground text-sm mt-3 mb-1"
            >
              Choose a country to start comparing wages
            </motion.p>
          )}
        </AnimatePresence>

        {/* Chart — only shown after country selected */}
        <AnimatePresence>
          {hasCountrySelected && (
            <motion.div
              key="chart"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-5"
            >
              <BoxPlotChart
                countries={countries}
                wageDataMap={COUNTRY_WAGE_DATA}
                userWage={formData.monthly_wage}
                height={280}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compare Countries button — between chart and form */}
        <AnimatePresence>
          {hasCountrySelected && (
            <motion.div
              key="compare-btn"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 mb-2"
            >
              <button
                onClick={handleCompare}
                className="w-full py-2.5 rounded-2xl bg-muted text-foreground font-heading font-semibold text-sm hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
              >
                <BarChart2 className="w-4 h-4" />
                Compare countries
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={hasCountrySelected ? 'mt-4' : 'mt-6'}
        >
          <WageFormStep
            formData={formData}
            updateFormData={updateFormData}
            onCountrySet={handleCountrySet}
            step={step}
            totalSteps={STEPS.length}
            onNext={handleNext}
            onBack={handleBack}
            onGoToSheet={handleGoToSheet}
            onSaveTemplate={handleSaveTemplate}
            onFillTemplate={handleFillTemplate}
            hasCountrySelected={hasCountrySelected}
            isLastStep={isLastStep}
            isAuthenticated={isAuthenticated}
          />
        </motion.div>
      </div>

      {/* Modals */}
      <LoginWarnModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        message="Sign in to save your templates and comparisons"
      />
      <UpgradeModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={upgradeFeature}
      />
      <ComparatorModal
        open={showComparatorModal}
        onClose={() => setShowComparatorModal(false)}
        countries={countries}
        onUpdate={handleCountriesUpdate}
        maxCountries={maxCountries}
        firstCountry={formData.country}
      />
      <FillTemplateModal
        open={showFillTemplateModal}
        onClose={() => setShowFillTemplateModal(false)}
        onApply={handleApplyTemplate}
      />
      <SaveTemplateModal
        open={showSaveTemplateModal}
        onClose={() => setShowSaveTemplateModal(false)}
        formData={formData}
      />
    </div>
  );
}