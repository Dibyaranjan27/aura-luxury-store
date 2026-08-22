import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../contexts/AuthContext';

const AuthDrawer = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { isLoggedIn, logOut } = useAuth(); // Assume we will mock login later

  // Simplified form state for mock purposes
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isLogin ? `Mock Login for ${email}` : `Mock Register for ${email}`);
    onClose();
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
            onClick={onClose}
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
              <button onClick={onClose} className="text-gray-500 hover:text-text transition-colors">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8 flex-1 overflow-y-auto">
              {isLoggedIn ? (
                <div className="flex flex-col gap-6">
                  <p className="text-gray-600 font-light">Welcome back to Aura.</p>
                  <button 
                    onClick={() => { logOut(); onClose(); }}
                    className="w-full bg-text text-white py-3 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Password</label>
                      <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent"
                        required
                      />
                    </div>
                    
                    {!isLogin && (
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Confirm Password</label>
                        <input 
                          type="password"
                          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent"
                          required
                        />
                      </div>
                    )}

                    <button 
                      type="submit"
                      className="w-full bg-text text-white py-4 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium mt-4"
                    >
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                  </form>

                  <div className="mt-8 text-center border-t border-gray-100 pt-8">
                    <p className="text-sm text-gray-500 mb-4 font-light">
                      {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </p>
                    <button 
                      onClick={() => setIsLogin(!isLogin)}
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
