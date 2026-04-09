import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import { store } from "@/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { ThemeProvider } from "@/lib/ThemeContext";
import AppLayout from "@/components/layout/AppLayout";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Plans from "@/pages/Plans";
// Privacy is now a section within /about
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";
import Templates from "@/pages/Templates";
import SavedComparisons from "@/pages/SavedComparisons";
import WageComparison from "@/pages/WageComparison";
import ManagePlan from "@/pages/ManagePlan";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/plans" element={<Plans />} />
        {/* /privacy redirects to about#privacy-support */}

        {/* Auth required (stub - sin autenticación real por ahora) */}
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
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <AppRoutes />
        </Router>
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
