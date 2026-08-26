import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { dropdownItems, dropdownWomenItems, dropdownMenItems, dropdownUnisexItems } from '../../data/menuData.jsx';
import SoundWaveIcon from '../../icons/SoundWaveIcon.jsx';
import useWishlistStore from '../../store/wishlistStore.js';
import DropdownMenu from '../DropdownMenu/DropdownMenu.jsx';
import SearchBar from './SearchBar.jsx';
import UserMenu from './UserMenu.jsx';

function DesktopNav({ hook, auth }) {
  const wishlistItems = useWishlistStore((state) => state.items);
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const getDropdownContent = (key) => {
    if (key === 'women') return <DropdownMenu items={dropdownWomenItems} />;
    if (key === 'men') return <DropdownMenu items={dropdownMenItems} />;
    if (key === 'unisex') return <DropdownMenu items={dropdownUnisexItems} />;
    return null;
  };
  
  const navLinkClass = "relative uppercase font-medium after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <div className="hidden md:flex justify-between items-center w-full h-full" onMouseLeave={hook.handleMouseLeave}>
      <div className="flex space-x-8">
        {dropdownItems.map(({ title }) => (
          <div key={title} className="relative h-full flex items-center" onMouseEnter={() => hook.handleMouseEnter(title.toLowerCase())}>
            <Link to={`/${title.toLowerCase()}`} className={navLinkClass}>{title}</Link>
          </div>
        ))}
        <Link to="/about" className={navLinkClass}>ABOUT</Link>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2">
        <Link to="/" className="text-2xl font-bold">SANE STUDIO</Link>
      </div>
      <div className="flex items-center space-x-4">
        <SearchBar isVisible={hook.isSearchVisible} onClose={hook.toggleSearch} />
        <Link to="/wishlist" className="relative"><HeartIcon className="h-6 w-6" />{wishlistItems.length > 0 && <span className="absolute -top-1 -right-1 bg-current text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{wishlistItems.length}</span>}</Link>
        <Link to="/cart"><ShoppingCartIcon className="h-6 w-6" /></Link>
        <div ref={hook.userMenuRef}>
          <button onClick={hook.toggleUserMenu}><UserIcon className="h-6 w-6" /></button>
          <AnimatePresence>
            {hook.isUserMenuVisible && <UserMenu isLoggedIn={auth.isLoggedIn} userName="John Doe" onSignOut={auth.logOut} onClose={hook.toggleUserMenu} />}
          </AnimatePresence>
        </div>
        <SoundWaveIcon isNavbarHovered={hook.isNavActive} />
      </div>
      <AnimatePresence>
        {hook.activeDropdown && (
          <motion.div
            initial="hidden" animate="visible" exit="hidden"
            variants={dropdownVariants} transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white text-black shadow-lg"
            onMouseEnter={() => hook.handleMouseEnter(hook.activeDropdown)}
          >
            {getDropdownContent(hook.activeDropdown)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default DesktopNav;