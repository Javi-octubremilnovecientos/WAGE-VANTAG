import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, ArrowLeft, CreditCard, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useUserPlan } from '@/lib/UserPlanContext';

const PAYMENT_HISTORY = [
  // Placeholder — would come from Stripe/backend in production
];

const PREMIUM_FEATURES = [
  'Compare up to 3 countries',
  'Save up to 4 templates',
  'Save up to 4 comparisons',
  'Unlimited exports (PDF, CSV, PNG)',
  'Multiple chart views',
  'Full historical wage data',
];

const FREE_FEATURES = [
  'Compare up to 2 countries',
  'Save 1 form template (logged in)',
  'Save 1 comparison sheet',
  'Box-plot chart view',
];

export default function ManagePlan() {
  const { plan, isPremium } = useUserPlan();

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-lg mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 mb-8"
        >
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="font-heading text-2xl font-bold">Manage Plan</h1>
        </motion.div>

        {/* Current Plan Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-2xl border p-5 mb-4 ${isPremium ? 'bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20' : 'bg-card border-border'}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPremium ? 'bg-primary/10' : 'bg-muted'}`}>
              <Crown className={`w-5 h-5 ${isPremium ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <p className="font-heading font-semibold text-base capitalize">{plan} Plan</p>
              <p className="text-xs text-muted-foreground">{isPremium ? '€9.99 / month' : 'Free forever'}</p>
            </div>
            <span className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${isPremium ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
              Active
            </span>
          </div>

          <div className="space-y-2">
            {(isPremium ? PREMIUM_FEATURES : FREE_FEATURES).map(f => (
              <div key={f} className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upgrade / Downgrade actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card border border-border rounded-2xl p-5 mb-4"
        >
          <h3 className="font-heading font-semibold text-sm mb-4">
            {isPremium ? 'Plan Actions' : 'Upgrade to Premium'}
          </h3>

          {!isPremium ? (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Unlock advanced charts, multiple comparisons, exports and more for €9.99/month.
              </p>
              <div className="space-y-2 mb-4">
                {PREMIUM_FEATURES.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                Upgrade to Premium — €9.99/mo
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Your Premium plan renews monthly. You can cancel at any time.
              </p>
              <button className="w-full py-2.5 rounded-xl bg-destructive/10 text-destructive font-medium text-sm hover:bg-destructive/20 transition-colors flex items-center justify-center gap-2">
                <XCircle className="w-4 h-4" />
                Cancel Subscription
              </button>
            </div>
          )}
        </motion.div>

        {/* Payment History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-heading font-semibold text-sm">Payment History</h3>
          </div>

          {PAYMENT_HISTORY.length > 0 ? (
            <div className="space-y-2">
              {PAYMENT_HISTORY.map((payment, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-sm">{payment.date}</span>
                  </div>
                  <span className="text-sm font-medium">{payment.amount}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Clock className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No payment history yet</p>
              {!isPremium && (
                <p className="text-xs text-muted-foreground/70 mt-1">Payments will appear here after upgrading</p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}