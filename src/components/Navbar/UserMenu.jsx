import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

function UserMenu({ isLoggedIn, userName, onSignOut, onClose }) {
  const menuVariants = {
    hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={menuVariants} initial="hidden" animate="visible" exit="hidden"
      className="fixed top-20 right-8 w-80 p-6 bg-white border border-gray-200 shadow-2xl z-30"
    >
      <button className="absolute top-4 right-4 text-gray-600 hover:text-black" onClick={onClose}>
        <XMarkIcon className="h-6 w-6" />
      </button>
      {isLoggedIn ? (
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-800">Hello, {userName}!</h3>
          <ul className="mt-6 space-y-4">
            <li><Link to="/profile" className="block w-full text-left px-4 py-2 border border-gray-300 hover:bg-black hover:text-white transition" onClick={onClose}>Profile</Link></li>
            <li><Link to="/orders" className="block w-full text-left px-4 py-2 border border-gray-300 hover:bg-black hover:text-white transition" onClick={onClose}>Orders</Link></li>
          </ul>
          <button onClick={onSignOut} className="w-full mt-8 px-4 py-2 bg-black text-white hover:bg-white hover:text-black border border-black transition">Sign Out</button>
        </div>
      ) : (
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-800">Welcome</h3>
          <p className="text-gray-600 mt-2">Sign in to shop and track orders.</p>
          <div className="mt-6 space-y-4">
            <Link to="/login" className="block w-full px-4 py-2 bg-black text-white text-center hover:bg-white hover:text-black border border-black transition" onClick={onClose}>Sign In</Link>
            <Link to="/register" className="block w-full px-4 py-2 bg-white text-black text-center hover:bg-black hover:text-white border border-black transition" onClick={onClose}>Register</Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}
export default UserMenu;