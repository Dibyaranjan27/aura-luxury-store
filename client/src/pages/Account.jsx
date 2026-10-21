import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { getMyOrders } from '../services/api';
import { Package, Clock, CheckCircle2 } from 'lucide-react';

const Account = () => {
  const { isLoggedIn, user, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    if (user) {
      getMyOrders(user.uid, user.email).then((data) => {
        setOrders(data || []);
        setIsLoadingOrders(false);
      });
    }
  }, [user]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const nameParts = (user?.displayName || 'Valued Client').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return (
    <div className="bg-background min-h-screen pt-32 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Aura Member</p>
            <h1 className="text-2xl font-serif text-text font-bold">
              {user?.displayName || 'My Account'}
            </h1>
            <p className="text-xs text-gray-500 font-light truncate">{user?.email}</p>
          </div>

          <ul className="flex flex-col space-y-2">
            <li>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`text-left w-full px-4 py-3 text-sm uppercase tracking-widest transition-colors ${activeTab === 'orders' ? 'bg-text text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Order History {orders.length > 0 && `(${orders.length})`}
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-text">Order History</h2>
                <span className="text-xs uppercase tracking-widest text-gray-400">
                  {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                </span>
              </div>

              {isLoadingOrders ? (
                <div className="text-center py-16 text-gray-400 text-xs tracking-widest uppercase">
                  Retrieving Order History...
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-20 text-gray-500 font-light border-2 border-dashed border-gray-100">
                  <Package className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="mb-4">You have not placed any orders yet.</p>
                  <Link to="/shop" className="text-xs uppercase tracking-widest text-accent hover:underline">
                    Explore The Collection &rarr;
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => {
                    const orderId = order._id || order.id || 'N/A';
                    const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recent';
                    return (
                      <div key={orderId} className="border border-gray-100 p-6 bg-white shadow-sm">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-gray-100 gap-2 mb-4">
                          <div>
                            <p className="text-xs uppercase tracking-widest font-mono text-gray-500">
                              Order <span className="font-bold text-text">{orderId}</span>
                            </p>
                            <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" /> Placed on {date}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1">
                              <CheckCircle2 className="h-3 w-3" /> {order.status || 'Processing'}
                            </span>
                            <span className="text-sm font-serif font-bold text-accent">
                              ${order.totalAmount?.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {order.items && order.items.length > 0 && (
                          <div className="space-y-3">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-3">
                                  {item.image && (
                                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover bg-primary" />
                                  )}
                                  <div>
                                    <p className="font-serif text-text">{item.name}</p>
                                    <p className="text-gray-400 text-[10px]">Qty: {item.quantity}</p>
                                  </div>
                                </div>
                                <p className="font-medium text-text">${(item.priceAtPurchase * item.quantity).toLocaleString()}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-serif text-text mb-6">Account Settings</h2>
              <form className="max-w-md flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                  <input type="text" defaultValue={firstName} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                  <input type="text" defaultValue={lastName} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input type="email" defaultValue={user?.email || ''} disabled className="w-full border-b border-gray-200 py-2 text-gray-400 font-light bg-transparent cursor-not-allowed" />
                </div>
                <button type="submit" className="bg-text text-white py-4 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium mt-4">
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
                  {user?.displayName || 'Client Aura'}<br/>
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
