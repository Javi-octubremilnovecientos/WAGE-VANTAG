import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { BarChart3, FileText, Settings, CreditCard, ChevronRight, Crown, Home } from 'lucide-react';
import { useUserPlan } from '@/lib/UserPlanContext';

const quickActions = [
  { label: 'Saved Comparisons', path: '/comparisons', icon: BarChart3, color: 'bg-primary/10 text-primary' },
  { label: 'My Templates', path: '/templates', icon: FileText, color: 'bg-secondary/20 text-secondary-foreground' },
  { label: 'Settings', path: '/settings', icon: Settings, color: 'bg-muted text-muted-foreground' },
  { label: 'Manage Plan', path: '/manage-plan', icon: CreditCard, color: 'bg-primary/10 text-primary' },
];

export default function Dashboard() {
  const { user, isPremium, plan } = useUserPlan();

  const { data: comparisons = [] } = useQuery({
    queryKey: ['comparisons'],
    queryFn: () => base44.entities.WageComparison.list('-created_date', 5),
  });

  const { data: templates = [] } = useQuery({
    queryKey: ['templates'],
    queryFn: () => base44.entities.FormTemplate.list('-created_date', 5),
  });

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 mb-8"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Welcome back,</p>
              <h1 className="font-heading text-2xl font-bold">
                {user?.full_name || 'User'}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  isPremium ? 'bg-secondary/20 text-secondary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {isPremium ? '✦ Premium' : 'Free Plan'}
                </span>
              </div>
            </div>
            {/* Back to Home */}
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-1"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-8"
        >
          {quickActions.map(action => (
            <Link
              key={action.path}
              to={action.path}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/20 transition-colors"
            >
              <div className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                <action.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </Link>
          ))}
        </motion.div>

        {/* Recent Comparisons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-semibold text-lg">Recent Comparisons</h2>
            <Link to="/comparisons" className="text-xs text-primary font-medium">
              View all
            </Link>
          </div>
          {comparisons.length > 0 ? (
            <div className="space-y-2">
              {comparisons.map(comp => (
                <Link
                  key={comp.id}
                  to={`/wage-comparison?countries=${comp.countries?.join(',')}`}
                  className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/20 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{comp.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {comp.countries?.join(' vs ')}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-muted/30 rounded-xl p-6 text-center">
              <p className="text-sm text-muted-foreground">No comparisons saved yet</p>
              <Link to="/" className="text-xs text-primary font-medium mt-2 inline-block">
                Start comparing →
              </Link>
            </div>
          )}
        </motion.div>

        {/* Upgrade Banner (for free users) */}
        {!isPremium && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/manage-plan"
              className="block bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Upgrade to Premium</p>
                  <p className="text-xs text-muted-foreground">Unlock exports, multiple charts & more</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}