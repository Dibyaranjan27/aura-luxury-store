import { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockProducts, categories } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import useCartStore from '../store/cartStore';

const Shop = () => {
  const { addItem } = useCartStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result = [...result].reverse();
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

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

        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-wrap justify-center gap-4">
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

          <div className="flex items-center gap-4 relative" ref={sortRef}>
            <span className="text-sm uppercase tracking-widest text-gray-500">Sort By</span>
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-transparent border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-text text-text font-light w-48 justify-between"
            >
              {sortBy === 'featured' && 'Featured'}
              {sortBy === 'newest' && 'Newest Arrivals'}
              {sortBy === 'price-high' && 'Price: High to Low'}
              {sortBy === 'price-low' && 'Price: Low to High'}
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 shadow-xl z-30"
                >
                  <ul className="py-2 text-sm font-light text-text">
                    {[
                      { id: 'featured', label: 'Featured' },
                      { id: 'newest', label: 'Newest Arrivals' },
                      { id: 'price-high', label: 'Price: High to Low' },
                      { id: 'price-low', label: 'Price: Low to High' },
                    ].map(option => (
                      <li key={option.id}>
                        <button 
                          className={`w-full text-left px-4 py-2 hover:bg-primary transition-colors ${sortBy === option.id ? 'font-medium bg-gray-50' : ''}`}
                          onClick={() => {
                            setSortBy(option.id);
                            setIsSortOpen(false);
                          }}
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={setQuickViewProduct} 
            />
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
                  onClick={() => {
                    addItem(quickViewProduct, 1);
                    setQuickViewProduct(null);
                  }}
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
