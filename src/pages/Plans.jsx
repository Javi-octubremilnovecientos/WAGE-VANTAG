import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PlanInfoCard from '../components/cards/PlainInfoCard';
import { useUserPlan } from '@/lib/UserPlanContext';

const FREE_FEATURES = [
  { text: 'Compare up to 2 countries', included: true },
  { text: 'Save 1 template (requires account)', included: true },
  { text: 'Save 1 comparison (requires account)', included: true },
  { text: 'Export comparisons (PDF, CSV, PNG)', included: false },
  { text: 'Box-plot chart view', included: true },
  { text: 'Limited comparison sheet data', included: true },
];

const PREMIUM_FEATURES = [
  { text: 'Compare up to 3 countries', included: true },
  { text: 'Save up to 4 templates', included: true },
  { text: 'Save up to 4 comparisons', included: true },
  { text: 'Unlimited exports (PDF, CSV, PNG)', included: true },
  { text: 'Multiple chart views', included: true },
  { text: 'Full accurate historical data', included: true },
];

export default function Plans() {
  const { plan } = useUserPlan();

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-12 mb-10"
        >
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Plans & Upgrade
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Choose the plan that fits your needs. Upgrade anytime for deeper insights and more features.
          </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PlanInfoCard
              name="Free"
              price="Free"
              features={FREE_FEATURES}
              current={plan === 'free'}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PlanInfoCard
              name="Premium"
              price="€9.99"
              features={PREMIUM_FEATURES}
              highlighted
              current={plan === 'premium'}
            />
          </motion.div>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="font-heading font-semibold text-xl mb-6 text-center">Feature Comparison</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-muted/50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Feature</span>
              <span className="text-center">Free</span>
              <span className="text-center">Premium</span>
            </div>
            {[
              ['Countries to compare', '2', '3'],
              ['Saved templates', '1 (with account)', '4'],
              ['Saved comparisons', '1 (with account)', '4'],
              ['Export formats', '—', 'PDF, CSV, PNG'],
              ['Chart views', '1 (Box-plot)', 'Multiple'],
              ['Historical data', 'Limited', 'Full'],
            ].map(([feature, free, premium], idx) => (
              <div key={idx} className={`grid grid-cols-3 px-4 py-3 text-sm ${idx % 2 === 0 ? '' : 'bg-muted/20'}`}>
                <span className="text-foreground font-medium">{feature}</span>
                <span className="text-center text-muted-foreground">{free}</span>
                <span className="text-center text-foreground font-medium">{premium}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}