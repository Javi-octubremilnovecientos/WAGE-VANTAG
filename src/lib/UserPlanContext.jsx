import { useSelector, useDispatch } from "react-redux";
import {
  selectPlan,
  selectIsPremium,
  selectMaxCountries,
  selectMaxTemplates,
  selectMaxSavedComparisons,
  selectCanExport,
  selectCanViewMultipleCharts,
  setPlan as setPlanAction,
} from "@/store/slices/userPlanSlice";
import { selectUser, selectIsAuthenticated } from "@/store/slices/authSlice";

/**
 * Hook useUserPlan - Wrapper sobre selectores de Redux
 * Mantiene la misma API para compatibilidad con componentes existentes
 */
export function useUserPlan() {
  const dispatch = useDispatch();

  const plan = useSelector(selectPlan);
  const isPremium = useSelector(selectIsPremium);
  const maxCountries = useSelector(selectMaxCountries);
  const maxTemplates = useSelector(selectMaxTemplates);
  const maxSavedComparisons = useSelector(selectMaxSavedComparisons);
  const canExport = useSelector(selectCanExport);
  const canViewMultipleCharts = useSelector(selectCanViewMultipleCharts);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const setPlan = (newPlan) => dispatch(setPlanAction(newPlan));

  // Free users can save templates if logged in
  const canSaveTemplate = isAuthenticated;

  return {
    plan,
    setPlan,
    isPremium,
    isAuthenticated,
    user,
    maxCountries,
    maxTemplates,
    maxSavedComparisons,
    canExport,
    canViewMultipleCharts,
    canSaveTemplate,
  };
}
