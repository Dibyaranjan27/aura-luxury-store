import React, { createContext, useContext, useState } from 'react';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider component
export function AuthProvider({ children }) {
  // Simple state for this example
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to true to test the "logged in" view

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => setIsLoggedIn(false);

  // The value that will be available to all children components
  const value = {
    isLoggedIn,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Create a custom hook for easy access to the context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}