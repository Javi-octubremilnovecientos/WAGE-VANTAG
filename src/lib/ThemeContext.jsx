import React, { createContext, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTheme,
  toggleTheme as toggleThemeAction,
} from "@/store/slices/themeSlice";

const ThemeContext = createContext();

/**
 * ThemeProvider - Wrapper que sincroniza el tema de Redux con el DOM
 * Mantiene la misma API (useTheme) para compatibilidad con componentes existentes
 */
export function ThemeProvider({ children }) {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => dispatch(toggleThemeAction());

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
