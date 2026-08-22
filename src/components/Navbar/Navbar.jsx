import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, ShoppingCartIcon, XMarkIcon, UserIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import AuthDrawer from '../Auth/AuthDrawer';
import SearchBar from './SearchBar';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-serif text-3xl font-bold tracking-[0.2em] text-text">
              AURA
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                  location.pathname === link.path ? 'text-accent font-medium' : 'text-gray-500 hover:text-text'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6 relative">
            <button onClick={() => setIsSearchVisible(true)} className="text-gray-500 hover:text-text transition-colors">
              <MagnifyingGlassIcon className="h-6 w-6" title="Search" />
            </button>
            <button onClick={() => setIsAuthOpen(true)} className="text-gray-500 hover:text-text transition-colors">
              <UserIcon className="h-6 w-6" title="Sign In / Register" />
            </button>
            <Link to="/wishlist" className="text-gray-500 hover:text-text transition-colors">
              <HeartIcon className="h-6 w-6" title="Wishlist" />
            </Link>
            <Link to="/cart" className="text-gray-500 hover:text-text transition-colors relative">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsAuthOpen(true)} className="text-gray-500 hover:text-text transition-colors">
              <UserIcon className="h-6 w-6" />
            </button>
            <Link to="/cart" className="text-gray-500 hover:text-text transition-colors">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-text focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-7 w-7" />
              ) : (
                <Bars3Icon className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 text-base uppercase tracking-widest text-center ${
                    location.pathname === link.path ? 'text-accent font-medium' : 'text-gray-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthDrawer isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      {isSearchVisible && <SearchBar isVisible={isSearchVisible} onClose={() => setIsSearchVisible(false)} />}
    </nav>
  );
}

export default Navbar;