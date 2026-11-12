import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="bg-background min-h-[80vh] flex items-center justify-center px-4 font-sans text-center pt-24 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold block mb-3">404 Exception</span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-text mb-6">
          The Piece You Seek Cannot Be Found
        </h1>
        <p className="text-gray-500 font-light text-sm leading-relaxed mb-10">
          The boutique suite you are attempting to visit may have moved or is exclusively reserved for private viewing.
        </p>
        <Link 
          to="/shop" 
          className="inline-block bg-text text-white py-4 px-10 uppercase tracking-widest hover:bg-accent transition-colors duration-300 text-xs font-medium"
        >
          Return to The Boutique
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
