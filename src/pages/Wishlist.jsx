import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useWishlistStore from '../store/wishlistStore';

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
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={product.id}
                className="relative group block bg-white h-full border border-gray-100 shadow-sm"
              >
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
                <Link to={`/product/${product.id}`}>
                  <div className="relative h-80 overflow-hidden bg-primary">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
                    <h3 className="font-serif text-lg text-text mb-3 line-clamp-1">{product.name}</h3>
                    <p className="font-medium text-accent">${product.price.toLocaleString()}</p>
                  </div>
                </Link>
              </motion.div>
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
