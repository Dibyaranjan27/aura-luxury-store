import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Account = () => {
  const { isLoggedIn, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-background min-h-screen pt-32 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <h1 className="text-3xl font-serif text-text mb-8">My Account</h1>
          <ul className="flex flex-col space-y-2">
            <li>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`text-left w-full px-4 py-3 text-sm uppercase tracking-widest transition-colors ${activeTab === 'orders' ? 'bg-text text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Order History
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`text-left w-full px-4 py-3 text-sm uppercase tracking-widest transition-colors ${activeTab === 'settings' ? 'bg-text text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Account Settings
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`text-left w-full px-4 py-3 text-sm uppercase tracking-widest transition-colors ${activeTab === 'addresses' ? 'bg-text text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Address Book
              </button>
            </li>
            <li className="pt-8">
              <button 
                onClick={logOut}
                className="text-left w-full px-4 py-3 text-sm uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-8 md:p-12 shadow-sm border border-gray-100 min-h-[500px]">
          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-serif text-text mb-6">Order History</h2>
              <div className="text-center py-20 text-gray-500 font-light border-2 border-dashed border-gray-100">
                You have not placed any orders yet.
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-serif text-text mb-6">Account Settings</h2>
              <form className="max-w-md flex flex-col gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                  <input type="text" defaultValue="Client" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                  <input type="text" defaultValue="Aura" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input type="email" defaultValue="client@aura.com" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent" />
                </div>
                <button type="button" className="bg-text text-white py-4 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium mt-4">
                  Save Changes
                </button>
              </form>
            </motion.div>
          )}

          {activeTab === 'addresses' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-serif text-text mb-6">Address Book</h2>
              <div className="p-6 border border-gray-200">
                <p className="font-medium text-text mb-2">Default Shipping Address</p>
                <p className="text-gray-500 font-light text-sm leading-relaxed mb-4">
                  Client Aura<br/>
                  123 Luxury Avenue, Suite 100<br/>
                  New York, NY 10001<br/>
                  United States
                </p>
                <div className="flex gap-4">
                  <button className="text-xs uppercase tracking-widest text-accent hover:text-text transition-colors">Edit</button>
                  <button className="text-xs uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">Delete</button>
                </div>
              </div>
              <button className="mt-8 border border-text text-text py-3 px-6 uppercase tracking-widest hover:bg-text hover:text-white transition-colors duration-300 font-medium text-xs">
                Add New Address
              </button>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Account;
