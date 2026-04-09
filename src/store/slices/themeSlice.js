import { createSlice } from "@reduxjs/toolkit";

// Obtener tema inicial de localStorage o usar 'light' por defecto
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") || "light";
  }
  return "light";
};

const initialState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      // Persistir en localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.theme);
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.theme);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

// Selectores
export const selectTheme = (state) => state.theme.theme;
export const selectIsDarkMode = (state) => state.theme.theme === "dark";

export default themeSlice.reducer;
