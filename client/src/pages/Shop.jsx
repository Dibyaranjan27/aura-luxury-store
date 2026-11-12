import { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Loader2 } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { getProducts, getCategories } from '../services/api';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [categories, setCategories] = useState(['All']);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  // Close sorting dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch available categories once on mount
  useEffect(() => {
    const fetchCats = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCats();
  }, []);

  // Sync activeCategory if URL param changes
  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    setActiveCategory(cat);
  }, [searchParams]);

  // Fetch filtered & sorted products from API
  useEffect(() => {
    let isMounted = true;
    const fetchProductsData = async () => {
      setIsLoading(true);
      const data = await getProducts({
        category: activeCategory,
        search: searchQuery,
        sort: sortBy,
      });
      if (isMounted) {
        setProducts(data);
        setIsLoading(false);
      }
    };

    fetchProductsData();

    return () => {
      isMounted = false;
    };
  }, [activeCategory, searchQuery, sortBy]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    const newParams = new URLSearchParams(searchParams);
    
    // Clear search query when explicitly changing category to prevent 0-result lock
    newParams.delete('search');

    if (category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  const clearSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  return (
    <div className="bg-background min-h-screen pt-24 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-text mb-4"
          >
            {searchQuery ? `Search Results` : 'The Collection'}
          </motion.h1>
          {!searchQuery ? (
            <p className="text-gray-500 font-light max-w-2xl mx-auto">
              Explore our curated selection of luxury items, designed for those with an uncompromising taste for excellence.
            </p>
          ) : (
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="text-sm text-gray-500 font-light">Showing results for:</span>
              <span className="inline-flex items-center gap-2 bg-primary border border-gray-200 text-text px-4 py-1.5 text-xs uppercase tracking-widest font-medium">
                "{searchQuery}"
                <button 
                  onClick={clearSearch} 
                  className="text-gray-400 hover:text-text transition-colors"
                  title="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            </div>
          )}
        </header>

        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2 text-xs uppercase tracking-widest transition-colors duration-300 ${
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
            <span className="text-xs uppercase tracking-widest text-gray-500">Sort By</span>
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-transparent border-b border-gray-300 py-2 text-xs uppercase tracking-widest focus:outline-none focus:border-text text-text font-light w-48 justify-between"
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
                  <ul className="py-2 text-xs uppercase tracking-widest text-text">
                    {[
                      { id: 'featured', label: 'Featured' },
                      { id: 'newest', label: 'Newest Arrivals' },
                      { id: 'price-high', label: 'Price: High to Low' },
                      { id: 'price-low', label: 'Price: Low to High' },
                    ].map(option => (
                      <li key={option.id}>
                        <button 
                          className={`w-full text-left px-4 py-2 hover:bg-primary transition-colors ${sortBy === option.id ? 'font-medium bg-gray-50 text-accent' : ''}`}
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

        {/* Loading State or Product Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-28 text-gray-400">
            <Loader2 className="h-8 w-8 animate-spin mb-4 text-accent" />
            <p className="font-light tracking-widest text-xs uppercase">Curating Collection...</p>
          </div>
        ) : (
          <>
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {products.map((product) => (
                <ProductCard 
                  key={product.id || product._id} 
                  product={product} 
                  onQuickView={setQuickViewProduct} 
                />
              ))}
            </motion.div>

            {products.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <p className="mb-4">No luxury pieces match your current criteria.</p>
                {searchQuery && (
                  <button 
                    onClick={clearSearch}
                    className="border border-text text-text py-2 px-6 uppercase tracking-widest text-xs hover:bg-text hover:text-white transition-colors"
                  >
                    View All Pieces
                  </button>
                )}
              </div>
            )}
          </>
        )}

      </div>

      {/* Quick View Modal */}
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
              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">{quickViewProduct.category}</p>
                  <h2 className="text-3xl font-serif text-text mb-4">{quickViewProduct.name}</h2>
                  <p className="text-xl text-accent mb-6">${quickViewProduct.price.toLocaleString()}</p>
                  <p className="text-gray-600 font-light leading-relaxed mb-6 text-sm">
                    {quickViewProduct.description}
                  </p>
                </div>
                
                <div className="space-y-3 mt-4">
                  <Link 
                    to={`/product/${quickViewProduct.id || quickViewProduct._id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="block text-center w-full bg-text text-white py-4 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium text-xs"
                  >
                    Select Options & View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Shop;
