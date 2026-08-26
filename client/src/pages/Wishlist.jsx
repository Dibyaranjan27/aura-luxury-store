import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useWishlistStore from '../store/wishlistStore';
import ProductCard from '../components/Product/ProductCard';

const Wishlist = () => {
  const { items, removeItem } = useWishlistStore();

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
          <p className="text-gray-500 font-light max-w-2xl mx-auto">
            A curated selection of your most desired pieces.
          </p>
        </header>

        {items.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {items.map((product) => (
              <div key={product.id} className="relative">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    removeItem(product.id);
                  }}
                  className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-400 hover:text-red-500 hover:shadow-md transition-all duration-300"
                  title="Remove from wishlist"
                >
                  ✕
                </button>
                <ProductCard product={product} />
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-8 font-light">Your wishlist is currently empty.</p>
            <Link to="/shop" className="inline-block bg-text text-white py-3 px-8 uppercase tracking-widest hover:bg-accent transition-colors duration-300">
              Discover the Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
