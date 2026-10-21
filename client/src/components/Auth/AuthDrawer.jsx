import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleIcon } from '../../icons/GoogleIcon';
import { formatAuthError } from '../../services/authService';

const AuthDrawer = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { isLoggedIn, user, logOut, login, register, signInGoogle } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
    setErrorMsg('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isLogin && password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, displayName);
      }
      handleClose();
      navigate('/account');
    } catch (err) {
      setErrorMsg(formatAuthError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      await signInGoogle();
      handleClose();
      navigate('/account');
    } catch (err) {
      setErrorMsg(formatAuthError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="font-serif text-2xl tracking-widest text-text">
                {isLoggedIn ? 'MY ACCOUNT' : (isLogin ? 'SIGN IN' : 'REGISTER')}
              </h2>
              <button onClick={handleClose} className="text-gray-500 hover:text-text transition-colors">
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-8 flex-1 overflow-y-auto">
              {isLoggedIn ? (
                <div className="flex flex-col gap-8 h-full">
                  <div>
                    <p className="text-gray-600 font-light mb-1">Welcome back,</p>
                    <p className="text-text font-serif text-xl mb-6">
                      {user?.displayName || user?.email || 'Valued Client'}
                    </p>

                    <ul className="space-y-4">
                      <li>
                        <Link to="/account" onClick={handleClose} className="text-left w-full border-b border-gray-100 pb-3 text-sm uppercase tracking-widest text-text hover:text-accent transition-colors flex justify-between items-center">
                          Account Dashboard
                          <span className="text-gray-400">&rarr;</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/account" onClick={handleClose} className="text-left w-full border-b border-gray-100 pb-3 text-sm uppercase tracking-widest text-text hover:text-accent transition-colors flex justify-between items-center">
                          Order History
                          <span className="text-gray-400">&rarr;</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/wishlist" onClick={handleClose} className="text-left w-full border-b border-gray-100 pb-3 text-sm uppercase tracking-widest text-text hover:text-accent transition-colors flex justify-between items-center">
                          My Wishlist
                          <span className="text-gray-400">&rarr;</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-auto pt-8 border-t border-gray-100">
                    <button 
                      onClick={() => { logOut(); handleClose(); navigate('/'); }}
                      className="w-full bg-transparent border border-text text-text py-3 uppercase tracking-widest hover:bg-text hover:text-white transition-colors duration-300 font-medium text-sm"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {errorMsg && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-light leading-relaxed">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {!isLogin && (
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                        <input 
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="e.g. Eleanor Vance"
                          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent text-sm"
                          required
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@aura.luxury"
                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Password</label>
                      <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent text-sm"
                        required
                      />
                    </div>
                    
                    {!isLogin && (
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Confirm Password</label>
                        <input 
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent text-sm"
                          required
                        />
                      </div>
                    )}

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-text text-white py-4 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium text-sm mt-3 flex items-center justify-center gap-2 disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                      )}
                    </button>
                  </form>

                  {/* Google OAuth Option */}
                  <div className="mt-6">
                    <div className="relative flex py-2 items-center">
                      <div className="flex-grow border-t border-gray-200"></div>
                      <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase tracking-widest">or</span>
                      <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isSubmitting}
                      className="mt-3 w-full border border-gray-300 py-3 text-text hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 text-xs uppercase tracking-wider font-medium"
                    >
                      <GoogleIcon className="h-4 w-4" />
                      Continue with Google
                    </button>
                  </div>

                  <div className="mt-8 text-center border-t border-gray-100 pt-6">
                    <p className="text-sm text-gray-500 mb-3 font-light">
                      {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </p>
                    <button 
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setErrorMsg('');
                      }}
                      className="text-sm uppercase tracking-widest text-text border-b border-text pb-1 hover:text-accent hover:border-accent transition-colors"
                    >
                      {isLogin ? 'Register Now' : 'Sign In'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthDrawer;
