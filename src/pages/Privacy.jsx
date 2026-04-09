import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, HelpCircle } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-12"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-8">
            Privacy & Support
          </h1>
        </motion.div>

        {/* Privacy Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-heading font-semibold text-xl">Privacy Policy</h2>
          </div>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              EU Wage Comparator is committed to protecting your privacy. We collect only the minimum
              data necessary to provide our service.
            </p>
            <p>
              <strong className="text-foreground">Data We Collect:</strong> Account information (email, name),
              saved comparisons and templates, and anonymous usage analytics.
            </p>
            <p>
              <strong className="text-foreground">How We Use It:</strong> Your wage data is used solely for
              generating comparisons and is never shared with third parties. Saved templates and comparisons
              are encrypted at rest.
            </p>
            <p>
              <strong className="text-foreground">Your Rights:</strong> Under GDPR, you have the right to
              access, correct, or delete your personal data at any time through your account settings.
            </p>
            <p>
              <strong className="text-foreground">Cookies:</strong> We use essential cookies for authentication
              and preferences. No tracking cookies are used without your consent.
            </p>
          </div>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-secondary/20 flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-secondary-foreground" />
            </div>
            <h2 className="font-heading font-semibold text-xl">Support</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Email Support</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Reach us at <span className="text-primary font-medium">support@euwagecomparator.eu</span> for any
                questions, bug reports, or feature requests.
              </p>
            </div>
            <div className="bg-muted/50 rounded-2xl p-5">
              <h4 className="text-sm font-medium mb-2">FAQ</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">How accurate is the wage data?</p>
                  <p>Our data is sourced from Eurostat and updated quarterly.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Can I cancel my Premium plan?</p>
                  <p>Yes, you can cancel anytime from your account settings.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Is my salary data stored?</p>
                  <p>Only if you explicitly save a comparison. Otherwise, it's discarded after your session.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}