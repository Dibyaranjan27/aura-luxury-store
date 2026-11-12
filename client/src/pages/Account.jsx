import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { getMyOrders } from '../services/api';
import { Package, Clock, CheckCircle2, Check, Plus, Edit2, Trash2 } from 'lucide-react';

const DEFAULT_ADDRESS = {
  id: 'addr_1',
  name: 'Eleanor Vance',
  street: '123 Luxury Avenue, Suite 100',
  city: 'New York, NY 10001',
  country: 'United States',
  isDefault: true,
};

const Account = () => {
  const { isLoggedIn, user, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  // Profile Edit State
  const initialParts = (user?.displayName || 'Eleanor Vance').split(' ');
  const [firstName, setFirstName] = useState(initialParts[0] || '');
  const [lastName, setLastName] = useState(initialParts.slice(1).join(' ') || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Address Book State
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('aura_client_addresses');
    return saved ? JSON.parse(saved) : [DEFAULT_ADDRESS];
  });
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    if (user) {
      getMyOrders(user.uid, user.email).then((data) => {
        setOrders(data || []);
        setIsLoadingOrders(false);
      });
    }
  }, [user]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newStreet.trim() || !newCity.trim()) return;

    const newAddr = {
      id: `addr_${Date.now()}`,
      name: `${firstName} ${lastName}`,
      street: newStreet.trim(),
      city: newCity.trim(),
      country: 'United States',
      isDefault: false,
    };

    const updated = [...addresses, newAddr];
    setAddresses(updated);
    localStorage.setItem('aura_client_addresses', JSON.stringify(updated));
    setNewStreet('');
    setNewCity('');
    setIsAddingAddress(false);
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    localStorage.setItem('aura_client_addresses', JSON.stringify(updated));
  };

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

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
                className={`text-left w-full px-4 py-3 text-xs uppercase tracking-widest transition-colors ${activeTab === 'orders' ? 'bg-text text-white font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Order History {orders.length > 0 && `(${orders.length})`}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`text-left w-full px-4 py-3 text-xs uppercase tracking-widest transition-colors ${activeTab === 'settings' ? 'bg-text text-white font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Account Settings
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`text-left w-full px-4 py-3 text-xs uppercase tracking-widest transition-colors ${activeTab === 'addresses' ? 'bg-text text-white font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                Address Book
              </button>
            </li>
            <li className="pt-8">
              <button 
                onClick={logOut}
                className="text-left w-full px-4 py-3 text-xs uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors"
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
                                    <p className="text-gray-400 text-[10px]">
                                      Qty: {item.quantity}
                                      {item.variant && (item.variant.size || item.variant.color) && (
                                        <span> • {[item.variant.size, item.variant.color].filter(Boolean).join(' • ')}</span>
                                      )}
                                    </p>
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
              <form className="max-w-md flex flex-col gap-5" onSubmit={handleSaveProfile}>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text font-light text-sm bg-transparent" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text font-light text-sm bg-transparent" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue={user?.email || 'client@aura.luxury'} 
                    disabled 
                    className="w-full border-b border-gray-200 py-2 text-gray-400 font-light text-sm bg-transparent cursor-not-allowed" 
                  />
                </div>

                <button 
                  type="submit" 
                  className="bg-text text-white py-3.5 px-8 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium text-xs mt-4 flex items-center justify-center gap-2"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="h-4 w-4 text-green-400" />
                      <span>Changes Saved</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {activeTab === 'addresses' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-text">Address Book</h2>
                <button 
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="text-xs uppercase tracking-widest text-accent hover:text-text transition-colors flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Address
                </button>
              </div>

              {isAddingAddress && (
                <form onSubmit={handleAddAddress} className="mb-8 p-6 bg-primary/40 border border-gray-200 space-y-4">
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-text">New Destination</h3>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Street Address (e.g. 742 Evergreen Terrace)"
                      value={newStreet}
                      onChange={(e) => setNewStreet(e.target.value)}
                      className="w-full text-xs p-3 border border-gray-200 bg-white focus:outline-none focus:border-text"
                      required
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="City, State, Zip (e.g. Beverly Hills, CA 90210)"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="w-full text-xs p-3 border border-gray-200 bg-white focus:outline-none focus:border-text"
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="bg-text text-white text-xs px-5 py-2.5 uppercase tracking-wider hover:bg-accent transition-colors">
                      Save Destination
                    </button>
                    <button type="button" onClick={() => setIsAddingAddress(false)} className="text-xs text-gray-500 uppercase tracking-wider hover:text-text px-4 py-2.5">
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="p-6 border border-gray-200 flex justify-between items-start bg-white">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium text-text text-xs">{addr.name}</p>
                        {addr.isDefault && (
                          <span className="text-[10px] uppercase tracking-wider text-accent border border-accent/40 px-2 py-0.5">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 font-light text-xs leading-relaxed">
                        {addr.street}<br/>
                        {addr.city}<br/>
                        {addr.country}
                      </p>
                    </div>

                    {!addr.isDefault && (
                      <button 
                        onClick={() => handleDeleteAddress(addr.id)} 
                        className="text-gray-400 hover:text-red-500 p-1"
                        title="Delete Address"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Account;
