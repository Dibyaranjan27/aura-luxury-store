import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import useWishlistStore from '../store/wishlistStore';
import useCartStore from '../store/cartStore';
import ProductCard from '../components/Product/ProductCard';

const Wishlist = () => {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  return (
    <div className="bg-background min-h-screen pt-24 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-text mb-4"
          >
            Your Wishlist
          </motion.h1>
          <p className="text-gray-500 font-light max-w-2xl mx-auto text-sm">
            A curated selection of your most desired pieces.
          </p>
        </header>

        {items.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {items.map((product) => {
              const productId = product.id || product._id;
              return (
                <div key={productId} className="relative group flex flex-col justify-between">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeItem(productId);
                    }}
                    className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-sm text-gray-400 hover:text-red-500 hover:bg-white transition-all duration-300"
                    title="Remove from wishlist"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  <ProductCard product={product} />

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="mt-3 w-full border border-text text-text py-2.5 uppercase tracking-widest text-[11px] font-medium hover:bg-text hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Move to Bag
                  </button>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-8 font-light">Your wishlist is currently empty.</p>
            <Link 
              to="/shop" 
              className="inline-block bg-text text-white py-3.5 px-8 uppercase tracking-widest hover:bg-accent transition-colors duration-300 text-xs font-medium"
            >
              Discover the Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
