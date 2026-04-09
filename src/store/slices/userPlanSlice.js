import { createSlice } from "@reduxjs/toolkit";

/**
 * User Plan Slice - Manejo del plan del usuario y límites
 */
const initialState = {
  plan: "free", // 'free' | 'premium'
};

const userPlanSlice = createSlice({
  name: "userPlan",
  initialState,
  reducers: {
    setPlan: (state, action) => {
      state.plan = action.payload;
    },
    upgradeToPremium: (state) => {
      state.plan = "premium";
    },
    downgradeToFree: (state) => {
      state.plan = "free";
    },
  },
});

export const { setPlan, upgradeToPremium, downgradeToFree } =
  userPlanSlice.actions;

// Selectores básicos
export const selectPlan = (state) => state.userPlan.plan;
export const selectIsPremium = (state) => state.userPlan.plan === "premium";

// Selectores derivados para límites
export const selectMaxCountries = (state) =>
  state.userPlan.plan === "premium" ? 3 : 2;

export const selectMaxTemplates = (state) =>
  state.userPlan.plan === "premium" ? 4 : 1;

export const selectMaxSavedComparisons = (state) =>
  state.userPlan.plan === "premium" ? 4 : 1;

export const selectCanExport = (state) => state.userPlan.plan === "premium";

export const selectCanViewMultipleCharts = (state) =>
  state.userPlan.plan === "premium";

export default userPlanSlice.reducer;
