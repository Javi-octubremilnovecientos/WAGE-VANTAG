import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, Download, Lock, ArrowLeft } from "lucide-react";
import BoxPlotChart from "@/components/charts/BoxPlotChart";
import HistoricalBarChart from "@/components/charts/HistoricalBarChart";
import SectorPieChart from "@/components/charts/SectorPieChart";
import DensityCurveChart from "@/components/charts/DensityCurveChart";
import LoginWarnModal from "@/components/modals/LoginWarnModal";
import UpgradeModal from "@/components/modals/UpgradeModal";
import {
  COUNTRY_WAGE_DATA,
  HISTORICAL_WAGE_DATA,
  SECTOR_DISTRIBUTION,
} from "@/lib/wageData";
import { useUserPlan } from "@/lib/UserPlanContext";

export default function WageComparison() {
  const urlParams = new URLSearchParams(window.location.search);
  const countries = (urlParams.get("countries") || "Spain,Portugal")
    .split(",")
    .filter(Boolean);
  const userWage = Number(urlParams.get("wage") || 0);

  const { isAuthenticated, isPremium, canExport, canViewMultipleCharts } =
    useUserPlan();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleSave = async () => {
    // Free users can save 1 comparison if logged in, premium up to 4
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    // TODO: Implementar guardado en Supabase cuando se creen tablas de usuario
    console.log("Saving comparison:", {
      title: countries.join(" vs "),
      countries,
      form_data: { wage: userWage },
      results: {
        wageData: countries.map((c) => ({
          country: c,
          ...COUNTRY_WAGE_DATA[c],
        })),
      },
    });
    alert("Comparison saved! (Feature pending Supabase tables)");
  };

  const handleExport = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (!canExport) {
      setShowUpgradeModal(true);
      return;
    }
    // Export logic placeholder
    alert("Export feature coming soon!");
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-8 mb-6"
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight mb-1">
            Comparison Sheet
          </h1>
          <p className="text-sm text-muted-foreground">
            {countries.join(" vs ")}
          </p>
        </motion.div>

        {/* Box Plot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-4 mb-4"
        >
          <h3 className="font-heading font-semibold text-sm mb-3">
            Wage Distribution
          </h3>
          <BoxPlotChart
            countries={countries}
            wageDataMap={COUNTRY_WAGE_DATA}
            userWage={userWage}
            height={280}
          />
        </motion.div>

        {/* Charts grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Historical bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-4 relative"
          >
            <h3 className="font-heading font-semibold text-sm mb-3">
              Historical Wages
            </h3>
            <HistoricalBarChart
              data={HISTORICAL_WAGE_DATA}
              countries={countries}
            />
            {!canViewMultipleCharts && (
              <div className="absolute inset-0 bg-card/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-medium">
                    Premium feature
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Sector pie chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-card border border-border rounded-2xl p-4 relative"
          >
            <h3 className="font-heading font-semibold text-sm mb-3">
              Sector Distribution
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {countries.slice(0, 2).map((country) => (
                <SectorPieChart
                  key={country}
                  data={SECTOR_DISTRIBUTION[country] || []}
                  title={country}
                />
              ))}
            </div>
            {!canViewMultipleCharts && (
              <div className="absolute inset-0 bg-card/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-medium">
                    Premium feature
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Density curve */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-4 md:col-span-2 relative"
          >
            <h3 className="font-heading font-semibold text-sm mb-3">
              Wage Density Curve
            </h3>
            <DensityCurveChart
              wageDataMap={COUNTRY_WAGE_DATA}
              countries={countries}
            />
            {!canViewMultipleCharts && (
              <div className="absolute inset-0 bg-card/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-medium">
                    Premium feature
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex items-center justify-center gap-3"
        >
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
          >
            save comparison
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
          >
            Export
            <Download className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      <LoginWarnModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <UpgradeModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature="Exporting comparisons"
      />
    </div>
  );
}
