import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../firebase/config';

// Simulated storage key for offline/dev fallback
const LOCAL_AUTH_KEY = 'aura_dev_user';

/**
 * Register with Email and Password
 */
export const registerWithEmail = async (email, password, displayName = '') => {
  if (isFirebaseConfigured && auth) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    return cred.user;
  }

  // Simulated fallback
  const mockUser = {
    uid: `user_${Date.now()}`,
    email,
    displayName: displayName || email.split('@')[0],
  };
  localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(mockUser));
  return mockUser;
};

/**
 * Login with Email and Password
 */
export const loginWithEmail = async (email, password) => {
  if (isFirebaseConfigured && auth) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }

  // Simulated fallback
  const mockUser = {
    uid: `user_${Date.now()}`,
    email,
    displayName: email.split('@')[0],
  };
  localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(mockUser));
  return mockUser;
};

/**
 * Sign In with Google
 */
export const loginWithGoogle = async () => {
  if (isFirebaseConfigured && auth && googleProvider) {
    const cred = await signInWithPopup(auth, googleProvider);
    return cred.user;
  }

  // Simulated fallback
  const mockUser = {
    uid: `user_google_${Date.now()}`,
    email: 'client@aura.luxury',
    displayName: 'Aura VIP Client',
  };
  localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(mockUser));
  return mockUser;
};

/**
 * Logout
 */
export const logoutUser = async () => {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  }
  localStorage.removeItem(LOCAL_AUTH_KEY);
};

/**
 * Subscribe to Auth State Changes
 */
export const subscribeToAuth = (callback) => {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  }

  // Fallback: check localStorage
  const saved = localStorage.getItem(LOCAL_AUTH_KEY);
  callback(saved ? JSON.parse(saved) : null);
  return () => {};
};

/**
 * Helper: Format Firebase error codes into human-readable messages
 */
export const formatAuthError = (error) => {
  if (!error) return '';
  const code = error.code || '';

  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account already exists with this email address.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please try again.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was closed before completion.';
    default:
      return error.message || 'Authentication error. Please try again.';
  }
};
