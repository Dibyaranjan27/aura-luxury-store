import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { dropdownItems, dropdownWomenItems, dropdownMenItems, dropdownUnisexItems } from '../../data/menuData.jsx';
import MobileDropdownMenu from '../DropdownMenu/MobileDropdownMenu.jsx';

function MobileNav({ hook, auth }) {
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const toggleAccordion = (title) => {
    setActiveMobileDropdown(prev => (prev === title ? null : title));
  };
  
  const handleLinkClick = () => {
    hook.toggleMobileMenu(); // This will close the main slide-out menu
    setActiveMobileDropdown(null); // This resets the accordion
  };

  return (
    <div className="md:hidden flex justify-between items-center w-full">
      {/* Hamburger Icon */}
      <button onClick={hook.toggleMobileMenu}>
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">SANE STUDIO</Link>

      {/* This empty div is a trick to make justify-between work for centering the logo */}
      <div className="w-6"></div>

      {/* Overlay */}
      {hook.isMenuOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={hook.toggleMobileMenu}
        ></div>
      )}

      {/* Mobile Slide-Out Menu */}
      <div
        ref={hook.menuRef}
        className={`fixed top-0 left-0 h-full w-3/4 max-w-sm bg-white text-black shadow-lg p-4 z-50 transition-transform transform ${
          hook.isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } duration-500 ease-in-out`}
      >
        <div className="flex justify-between items-center mb-4 py-3">
          <Link to="/" className="text-xl font-bold" onClick={handleLinkClick}>SANE STUDIO</Link>
          <button onClick={hook.toggleMobileMenu} className="p-1">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="flex flex-col space-y-4">
          {dropdownItems.map(({ title }) => (
            <div key={title}>
              <div className="flex justify-between items-center w-full">
                <Link to={`/${title.toLowerCase()}`} className="nav-link uppercase flex-1" onClick={handleLinkClick}>
                  {title}
                </Link>
                <button onClick={() => toggleAccordion(title.toLowerCase())} className="p-2">
                  {activeMobileDropdown === title.toLowerCase() ? <ArrowRightIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
                </button>
              </div>
              {/* Render the correct dropdown content if active */}
              {activeMobileDropdown === title.toLowerCase() && (
                <>
                  {title.toLowerCase() === 'women' && <MobileDropdownMenu isVisible={true} items={dropdownWomenItems} closeDropdown={handleLinkClick} />}
                  {title.toLowerCase() === 'men' && <MobileDropdownMenu isVisible={true} items={dropdownMenItems} closeDropdown={handleLinkClick} />}
                  {title.toLowerCase() === 'unisex' && <MobileDropdownMenu isVisible={true} items={dropdownUnisexItems} closeDropdown={handleLinkClick} />}
                </>
              )}
            </div>
          ))}
          <hr className="border-gray-300 my-4" />
          <Link to="/cart" className="nav-link uppercase" onClick={handleLinkClick}>Cart</Link>
          <Link to="/wishlist" className="nav-link uppercase" onClick={handleLinkClick}>Wishlist</Link>
          <hr className="border-gray-300 my-4" />
          {auth.isLoggedIn ? (
            <>
              <Link to="/mobileProfile" className="nav-link uppercase" onClick={handleLinkClick}>Account</Link>
              <button className="nav-link uppercase text-left" onClick={() => { auth.logOut(); handleLinkClick(); }}>
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link uppercase" onClick={handleLinkClick}>Sign In</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileNav;