import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { mockProducts } from '../../data/mockData';

const CartDrawer = ({ isOpen, onClose }) => {
  // Mock cart items using the first two products
  const cartItems = [
    { ...mockProducts[0], quantity: 1 },
    { ...mockProducts[1], quantity: 2 }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0; // Complimentary shipping
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="relative w-full sm:w-[450px] h-full bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="font-serif text-2xl tracking-widest text-text">
                SHOPPING BAG
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-text transition-colors">
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100">
                      <Link to={`/product/${item.id}`} onClick={onClose} className="w-24 h-24 shrink-0 bg-primary block">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <Link to={`/product/${item.id}`} onClick={onClose}>
                              <h3 className="font-serif text-sm text-text hover:text-accent transition-colors line-clamp-1">{item.name}</h3>
                            </Link>
                          </div>
                          <p className="text-xs text-gray-500 uppercase tracking-widest">{item.category}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-gray-300">
                            <button className="px-2 py-1 text-gray-500 hover:text-text transition-colors text-xs">-</button>
                            <span className="px-3 py-1 text-xs font-medium">{item.quantity}</span>
                            <button className="px-2 py-1 text-gray-500 hover:text-text transition-colors text-xs">+</button>
                          </div>
                          <p className="font-medium text-sm text-accent">${item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 font-light mb-6">Your bag is currently empty.</p>
                  <Link 
                    to="/shop" 
                    onClick={onClose}
                    className="inline-block border border-text text-text py-3 px-8 uppercase tracking-widest hover:bg-text hover:text-white transition-colors duration-300 text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-primary/30">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-serif text-lg">Total</span>
                  <span className="font-bold text-xl text-accent">${total.toLocaleString()}</span>
                </div>
                <Link 
                  to="/checkout" 
                  onClick={onClose}
                  className="block w-full text-center bg-text text-white py-4 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
