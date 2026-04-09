import React, { createContext, useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout as logoutAction } from "@/store/slices/authSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      setIsLoadingAuth(true);
      setAuthError(null);

      // TODO: Implementar autenticación con Supabase
      // Por ahora, verificamos si hay sesión guardada en localStorage
      const savedUser = localStorage.getItem("auth_user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        dispatch(setUser(parsedUser)); // setUser ya establece isAuthenticated automáticamente
      }

      setIsLoadingAuth(false);
      setIsLoadingPublicSettings(false);
    } catch (error) {
      console.error("Auth check failed:", error);
      setAuthError({
        type: "unknown",
        message: error.message || "An unexpected error occurred",
      });
      setIsLoadingAuth(false);
      setIsLoadingPublicSettings(false);
    }
  };

  const logout = (shouldRedirect = true) => {
    dispatch(logoutAction());
    localStorage.removeItem("auth_user");

    if (shouldRedirect) {
      window.location.href = "/";
    }
  };

  const navigateToLogin = () => {
    // TODO: Implementar redirección a login de Supabase
    console.log("Redirect to login - TODO: Implement Supabase auth");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
        logout,
        navigateToLogin,
        checkAppState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
