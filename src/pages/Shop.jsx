import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockProducts, categories } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = mockProducts;
    
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery)
      );
    }
    
    return result;
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-background min-h-screen pt-24 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-text mb-4"
          >
            {searchQuery ? `Search Results for "${searchQuery}"` : 'The Collection'}
          </motion.h1>
          {!searchQuery && (
            <p className="text-gray-500 font-light max-w-2xl mx-auto">
              Explore our curated selection of luxury items, designed for those with an uncompromising taste for excellence.
            </p>
          )}
        </header>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2 text-sm uppercase tracking-widest transition-colors duration-300 ${
                activeCategory === cat 
                  ? 'bg-text text-white' 
                  : 'bg-white text-text border border-gray-200 hover:border-text hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={product.id}
            >
              <Link to={`/product/${product.id}`} className="group block bg-white h-full border border-gray-100 hover:border-gray-300 transition-colors">
                <div className="relative h-80 overflow-hidden bg-primary">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setQuickViewProduct(product);
                      }}
                      className="bg-white text-text px-6 py-3 uppercase tracking-widest text-xs font-medium hover:bg-text hover:text-white transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0"
                    >
                      Quick View
                    </button>
                  </div>
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
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p>No products found in this category.</p>
          </div>
        )}

      </div>

      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="absolute inset-0 bg-black cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative bg-white w-full max-w-4xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
            >
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-10 text-gray-500 hover:text-text bg-white/80 p-1 rounded-full"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
              <div className="md:w-1/2 h-64 md:h-auto bg-primary relative">
                <img 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">{quickViewProduct.category}</p>
                <h2 className="text-3xl font-serif text-text mb-4">{quickViewProduct.name}</h2>
                <p className="text-xl text-accent mb-6">${quickViewProduct.price.toLocaleString()}</p>
                <p className="text-gray-600 font-light leading-relaxed mb-8">
                  {quickViewProduct.description}
                </p>
                <Link 
                  to={`/product/${quickViewProduct.id}`}
                  className="block text-center w-full bg-text text-white py-4 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium mb-4"
                >
                  View Full Details
                </Link>
                <button 
                  onClick={() => alert('Added to cart from Quick View!')}
                  className="block text-center w-full border border-text text-text py-4 uppercase tracking-widest hover:bg-text hover:text-white transition-colors duration-300 font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Shop;
