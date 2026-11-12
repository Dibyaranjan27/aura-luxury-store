import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCartStore, { getCartItemId } from '../store/cartStore';

const Cart = () => {
  const { items: cartItems, removeItem, updateQuantity, getCartTotal } = useCartStore();

  const subtotal = getCartTotal();
  const shipping = 0; // Complimentary shipping
  const total = subtotal + shipping;

  return (
    <div className="bg-background min-h-screen pt-24 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-serif font-bold text-text mb-12 text-center"
        >
          Your Shopping Bag
        </motion.h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Cart Items */}
            <div className="lg:w-2/3 flex flex-col gap-8">
              {cartItems.map((item, index) => {
                const itemKey = getCartItemId(item);
                const productId = item.id || item._id;

                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={itemKey} 
                    className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-gray-200"
                  >
                    <Link to={`/product/${productId}`} className="w-full sm:w-40 h-48 sm:h-40 shrink-0 bg-primary block">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <Link to={`/product/${productId}`}>
                            <h3 className="font-serif text-lg text-text hover:text-accent transition-colors">{item.name}</h3>
                          </Link>
                          <p className="font-medium text-text">${item.price.toLocaleString()}</p>
                        </div>
                        <p className="text-sm text-gray-500 uppercase tracking-widest">{item.category}</p>

                        {(item.selectedSize || item.selectedColor) && (
                          <p className="text-xs text-gray-400 mt-1">
                            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                            {item.selectedSize && item.selectedColor && <span> • </span>}
                            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 sm:mt-0">
                        <div className="flex items-center border border-gray-300">
                          <button 
                            onClick={() => updateQuantity(itemKey, Math.max(1, item.quantity - 1))}
                            className="px-3 py-1 text-gray-500 hover:text-text transition-colors"
                          >-</button>
                          <span className="px-4 py-1 text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                            className="px-3 py-1 text-gray-500 hover:text-text transition-colors"
                          >+</button>
                        </div>
                        <button 
                          onClick={() => removeItem(itemKey)}
                          className="text-xs uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-primary p-8">
                <h3 className="font-serif text-2xl mb-6">Order Summary</h3>
                
                <div className="flex flex-col gap-4 text-sm mb-6 border-b border-gray-300 pb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Shipping</span>
                    <span className="font-medium">{shipping === 0 ? 'Complimentary' : `$${shipping.toLocaleString()}`}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end mb-8">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl text-accent">${total.toLocaleString()}</span>
                </div>
                
                <Link to="/checkout" className="block w-full text-center bg-text text-white py-4 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium text-xs">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
            
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-8 font-light">Your bag is currently empty.</p>
            <Link to="/shop" className="inline-block bg-text text-white py-3 px-8 uppercase tracking-widest hover:bg-accent transition-colors duration-300 text-xs font-medium">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
