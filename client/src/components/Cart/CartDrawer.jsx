import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import useCartStore, { getCartItemId } from '../../store/cartStore';

const CartDrawer = ({ isOpen, onClose }) => {
  const { items: cartItems, removeItem, updateQuantity, getCartTotal } = useCartStore();

  const subtotal = getCartTotal();
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
            transition={{ type: 'tween', duration: 0.35 }}
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
                  {cartItems.map((item) => {
                    const itemKey = getCartItemId(item);
                    const productId = item.id || item._id;
                    return (
                      <div key={itemKey} className="flex gap-4 pb-6 border-b border-gray-100">
                        <Link to={`/product/${productId}`} onClick={onClose} className="w-24 h-24 shrink-0 bg-primary block">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </Link>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <Link to={`/product/${productId}`} onClick={onClose}>
                                <h3 className="font-serif text-sm text-text hover:text-accent transition-colors line-clamp-1">{item.name}</h3>
                              </Link>
                            </div>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">{item.category}</p>
                            
                            {/* Selected Variant Options */}
                            {(item.selectedSize || item.selectedColor) && (
                              <p className="text-[11px] text-gray-400 mt-1">
                                {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                                {item.selectedSize && item.selectedColor && <span> • </span>}
                                {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center border border-gray-300">
                              <button 
                                onClick={() => updateQuantity(itemKey, Math.max(1, item.quantity - 1))}
                                className="px-2.5 py-1 text-gray-500 hover:text-text transition-colors text-xs"
                              >-</button>
                              <span className="px-3 py-1 text-xs font-medium">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                                className="px-2.5 py-1 text-gray-500 hover:text-text transition-colors text-xs"
                              >+</button>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <p className="font-medium text-sm text-accent">${(item.price * item.quantity).toLocaleString()}</p>
                              <button 
                                onClick={() => removeItem(itemKey)}
                                className="text-[10px] uppercase tracking-wider text-gray-400 hover:text-red-600 transition-colors"
                              >Remove</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 font-light mb-6">Your bag is currently empty.</p>
                  <Link 
                    to="/shop" 
                    onClick={onClose}
                    className="inline-block border border-text text-text py-3 px-8 uppercase tracking-widest hover:bg-text hover:text-white transition-colors duration-300 text-xs font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-primary/30 space-y-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-serif text-base text-gray-600">Total</span>
                  <span className="font-bold text-xl text-accent">${total.toLocaleString()}</span>
                </div>
                <Link 
                  to="/checkout" 
                  onClick={onClose}
                  className="block w-full text-center bg-text text-white py-4 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium text-xs"
                >
                  Proceed to Checkout
                </Link>
                <Link 
                  to="/cart" 
                  onClick={onClose}
                  className="block w-full text-center border border-gray-300 text-text py-2.5 uppercase tracking-widest hover:border-text transition-colors duration-300 text-[11px]"
                >
                  View Full Bag
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
