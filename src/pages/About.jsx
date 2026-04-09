import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart3, Globe, Shield, Zap, Mail, HelpCircle, Lock, Database, ArrowLeft } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Statistical Precision',
    description: 'Box-plot visualizations based on Eurostat-sourced wage distribution data across the EU.',
  },
  {
    icon: Globe,
    title: 'Pan-European Coverage',
    description: 'Compare wages across 29+ European countries with data segmented by industry, occupation, and education.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your personal wage data is never shared. All comparisons are processed securely.',
  },
  {
    icon: Zap,
    title: 'Real-Time Insights',
    description: 'Dynamic charts update instantly as you input your details, giving immediate visual feedback.',
  },
];

const faqs = [
  {
    q: 'How accurate is the wage data?',
    a: 'Our data is sourced from Eurostat\'s Structure of Earnings Survey (SES), updated quarterly. It reflects statistical distributions, not exact salary guarantees.',
  },
  {
    q: 'How do I manage or cancel my subscription?',
    a: 'You can manage or cancel your subscription at any time from the Manage Plan page in your Dashboard.',
  },
  {
    q: 'Is my data stored after a session?',
    a: 'For guest users, no data is stored. For logged-in users, only explicitly saved templates and comparisons are retained.',
  },
  {
    q: 'What data do you collect?',
    a: 'We collect only your account email and any form data you explicitly choose to save as a template or comparison. We do not sell or share your data.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-12"
        >
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
            About Wage<br />Comparator
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Understanding how your salary compares to wage distributions across Europe shouldn't require
            a degree in statistics. We make it visual, intuitive, and accessible — whether you're
            negotiating a raise, planning a move abroad, or just curious.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid gap-4 mb-12">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-base mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data Sources */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-muted/50 rounded-2xl p-6 mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Database className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-heading font-semibold text-base">Data Sources</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Our wage data is sourced from Eurostat's Structure of Earnings Survey (SES) and
            complementary national statistical office publications. Data is updated quarterly
            and covers full-time and part-time employment across all NACE economic sectors.
          </p>
        </motion.div>

        {/* Privacy & Support section */}
        <motion.div
          id="privacy-support"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-2xl font-bold">Privacy & Support</h2>
          </div>

          {/* Privacy summary */}
          <div className="bg-card border border-border rounded-2xl p-5 mb-4">
            <h3 className="font-heading font-semibold text-sm mb-3">Your Privacy</h3>
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <p>We collect only the minimum data necessary to provide the service: your account email and data you explicitly save.</p>
              <p>Your wage inputs are never stored unless you choose to save them as a template or comparison sheet.</p>
              <p>We do not sell, rent or share your personal data with third parties.</p>
              <p>You have the right to request deletion of your account and all associated data at any time by contacting us.</p>
            </div>
          </div>

          {/* GDPR rights */}
          <div className="bg-card border border-border rounded-2xl p-5 mb-4">
            <h3 className="font-heading font-semibold text-sm mb-3">GDPR Rights</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• Right to access your data</li>
              <li>• Right to rectify inaccurate data</li>
              <li>• Right to erasure ("right to be forgotten")</li>
              <li>• Right to data portability</li>
              <li>• Right to object to processing</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-heading font-semibold text-base">Frequently Asked Questions</h3>
            </div>
            <div className="space-y-3">
              {faqs.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                  className="bg-card border border-border rounded-xl p-4"
                >
                  <p className="font-medium text-sm mb-1">{item.q}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-primary" />
              <h3 className="font-heading font-semibold text-sm">Contact Support</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Have a question or need help? We're here for you.
            </p>
            <a
              href="mailto:support@wagecomparator.eu"
              className="text-sm text-primary font-medium hover:underline"
            >
              support@wagecomparator.eu
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}