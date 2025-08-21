import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from storage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("grievancehub_user") || sessionStorage.getItem("grievancehub_user");
    const storedToken = localStorage.getItem("grievancehub_token") || sessionStorage.getItem("grievancehub_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  // Login method
  const login = (userData, rememberMe = true) => {
    const { token, ...userWithoutToken } = userData;
    setUser(userWithoutToken);
    setToken(token);

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("grievancehub_user", JSON.stringify(userWithoutToken));
    storage.setItem("grievancehub_token", token);
  };

  // Logout method
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("grievancehub_user");
    localStorage.removeItem("grievancehub_token");
    sessionStorage.removeItem("grievancehub_user");
    sessionStorage.removeItem("grievancehub_token");
  };

  // Role checks
  const isAdmin = user?.role?.toUpperCase() === "ADMIN";
  const isStudent = user?.role?.toUpperCase() === "STUDENT";
  const isFaculty = user?.role?.toUpperCase() === "FACULTY";

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, isAdmin, isStudent, isFaculty }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
