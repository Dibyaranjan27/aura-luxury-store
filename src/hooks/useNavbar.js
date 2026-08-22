import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  
  const location = useLocation();
  const userMenuRef = useRef(null);

  const isNavActive = isMenuOpen || isSearchVisible || isUserMenuVisible || !!activeDropdown;

  const handleMouseEnter = (category) => setActiveDropdown(category);
  const handleMouseLeave = () => setActiveDropdown(null);
  
  const toggleMobileMenu = () => setIsMenuOpen(prev => !prev);
  const toggleSearch = () => setIsSearchVisible(prev => !prev);
  const toggleUserMenu = () => setIsUserMenuVisible(prev => !prev);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchVisible(false);
    setIsUserMenuVisible(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    if (isNavActive) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isNavActive]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
    isMenuOpen, activeDropdown, isSearchVisible, isUserMenuVisible, isNavActive,
    userMenuRef, handleMouseEnter, handleMouseLeave,
    toggleMobileMenu, toggleSearch, toggleUserMenu,
  };
};