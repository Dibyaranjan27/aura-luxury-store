import { createContext, useContext, useState, useEffect } from 'react';
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  logoutUser,
  subscribeToAuth,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const u = await loginWithEmail(email, password);
    setUser(u);
    return u;
  };

  const register = async (email, password, displayName) => {
    const u = await registerWithEmail(email, password, displayName);
    setUser(u);
    return u;
  };

  const signInGoogle = async () => {
    const u = await loginWithGoogle();
    setUser(u);
    return u;
  };

  const logOut = async () => {
    await logoutUser();
    setUser(null);
  };

  // Backwards compatibility alias
  const logIn = () => {
    setUser({ uid: 'mock_uid', email: 'client@aura.luxury', displayName: 'VIP Client' });
  };

  const value = {
    user,
    isLoggedIn: Boolean(user),
    loading,
    login,
    register,
    signInGoogle,
    logOut,
    logIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
