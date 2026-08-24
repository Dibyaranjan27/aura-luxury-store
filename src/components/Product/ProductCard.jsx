import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onQuickView }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <Link to={`/product/${product.id}`} className="group block bg-white h-full border border-gray-100 hover:border-gray-300 transition-colors">
        <div className="relative h-80 overflow-hidden bg-primary">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {onQuickView && (
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView(product);
                }}
                className="bg-white text-text px-6 py-3 uppercase tracking-widest text-xs font-medium hover:bg-text hover:text-white transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0"
              >
                Quick View
              </button>
            </div>
          )}
          {product.isBestSeller && (
            <div className="absolute top-4 left-4 bg-accent text-white text-xs px-3 py-1 uppercase tracking-wider font-medium">
              Best Seller
            </div>
          )}
        </div>
        <div className="p-6 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
          <h3 className="font-serif text-lg text-text mb-3 line-clamp-1">{product.name}</h3>
          <p className="font-medium text-accent">${product.price.toLocaleString()}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
