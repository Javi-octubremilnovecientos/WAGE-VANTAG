import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { ThemeProvider } from '@/lib/ThemeContext';
import { UserPlanProvider } from '@/lib/UserPlanContext';
import AppLayout from '@/components/layout/AppLayout';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Plans from '@/pages/Plans';
// Privacy is now a section within /about
import Dashboard from '@/pages/Dashboard';
import Settings from '@/pages/Settings';
import Templates from '@/pages/Templates';
import SavedComparisons from '@/pages/SavedComparisons';
import WageComparison from '@/pages/WageComparison';
import ManagePlan from '@/pages/ManagePlan';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-muted border-t-primary rounded-full animate-spin"></div>
          <p className="text-xs text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
    // auth_required: allow guest access, don't force login
  }

  return (
    <UserPlanProvider>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/plans" element={<Plans />} />
          {/* /privacy redirects to about#privacy-support */}

          {/* Auth required */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/comparisons" element={<SavedComparisons />} />
          <Route path="/wage-comparison" element={<WageComparison />} />
          <Route path="/manage-plan" element={<ManagePlan />} />

          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </UserPlanProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App