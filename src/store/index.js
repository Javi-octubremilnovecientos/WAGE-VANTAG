import { configureStore } from "@reduxjs/toolkit";
import { wageApi } from "./api/wageApi";
import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";
import userPlanReducer from "./slices/userPlanSlice";

export const store = configureStore({
  reducer: {
    // Slices
    theme: themeReducer,
    auth: authReducer,
    userPlan: userPlanReducer,
    // RTK Query API
    [wageApi.reducerPath]: wageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wageApi.middleware),
});

// Tipos para TypeScript (opcional, para mejor DX)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
