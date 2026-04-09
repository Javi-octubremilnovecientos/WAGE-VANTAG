import React, { createContext, useContext, useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const UserPlanContext = createContext();

export function UserPlanProvider({ children }) {
  const [plan, setPlan] = useState('free'); // 'free' or 'premium'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authed = await base44.auth.isAuthenticated();
      setIsAuthenticated(authed);
      if (authed) {
        const me = await base44.auth.me();
        setUser(me);
        setPlan(me.plan || 'free');
      }
    };
    checkAuth();
  }, []);

  const isPremium = plan === 'premium';
  const maxCountries = isPremium ? 3 : 2;
  // Free: 1 template (requires login); Premium: 4
  const maxTemplates = isPremium ? 4 : 1;
  // Free: 1 saved comparison (requires login); Premium: 4
  const maxSavedComparisons = isPremium ? 4 : 1;
  // Export only for premium
  const canExport = isPremium;
  // Multiple chart views only for premium
  const canViewMultipleCharts = isPremium;
  // Free logged-in users can save 1 template; premium can save templates without login gate (still need login)
  const canSaveTemplate = isAuthenticated;

  return (
    <UserPlanContext.Provider value={{
      plan, setPlan, isPremium, isAuthenticated, user,
      maxCountries, maxTemplates, maxSavedComparisons, canExport, canViewMultipleCharts, canSaveTemplate,
    }}>
      {children}
    </UserPlanContext.Provider>
  );
}

export function useUserPlan() {
  const ctx = useContext(UserPlanContext);
  if (!ctx) throw new Error('useUserPlan must be used within UserPlanProvider');
  return ctx;
}