import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { motion } from 'framer-motion';
import useWishlistStore from '../store/wishlistStore';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  
  const { items, addItem, removeItem } = useWishlistStore();
  const isInWishlist = product && items.some(item => item.id === product.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = mockProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);

  if (!product) return <div className="min-h-screen bg-background pt-24 text-center">Loading...</div>;

  return (
    <div className="bg-background min-h-screen pt-24 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <div className="aspect-[4/5] overflow-hidden bg-primary relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.isBestSeller && (
                <div className="absolute top-6 left-6 bg-accent text-white text-xs px-4 py-2 uppercase tracking-wider font-medium shadow-sm">
                  Best Seller
                </div>
              )}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col justify-center"
          >
            <div className="mb-2">
              <span className="text-xs text-gray-500 uppercase tracking-widest">{product.category}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-text mb-6 leading-tight">
              {product.name}
            </h1>
            
            <p className="text-2xl text-accent font-medium mb-8">
              ${product.price.toLocaleString()}
            </p>
            
            <div className="prose prose-sm text-gray-600 font-light mb-8 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Features List */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text mb-4">Highlights</h3>
              <ul className="list-disc list-inside text-gray-600 font-light space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button 
                className="flex-1 bg-text text-white py-4 px-8 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium"
                onClick={() => {
                  alert('Added to cart!');
                }}
              >
                Add to Cart
              </button>
              <button 
                className="w-14 h-14 border border-gray-200 flex items-center justify-center hover:border-text transition-colors duration-300"
                onClick={() => {
                  if (isInWishlist) removeItem(product.id);
                  else addItem(product);
                }}
                title="Toggle Wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill={isInWishlist ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isInWishlist ? "text-accent" : "text-gray-500"}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </button>
            </div>
            
            {/* Delivery Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col gap-3 text-sm text-gray-500 font-light">
                <p>✓ Complimentary standard delivery on all orders.</p>
                <p>✓ Complimentary returns within 30 days.</p>
                <p>✓ Signature packaging included.</p>
              </div>
            </div>

          </motion.div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-32 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-serif text-text mb-12 text-center">Client Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-primary p-8 text-center">
              <div className="text-accent text-lg mb-4">★★★★★</div>
              <p className="text-gray-600 font-light italic mb-6">"Absolutely stunning piece. The craftsmanship exceeds expectations. It has become my everyday essential."</p>
              <p className="text-sm font-medium uppercase tracking-widest text-text">- Eleanor R.</p>
            </div>
            <div className="bg-primary p-8 text-center">
              <div className="text-accent text-lg mb-4">★★★★★</div>
              <p className="text-gray-600 font-light italic mb-6">"Aura never disappoints. The packaging was immaculate and the product itself is a true work of art."</p>
              <p className="text-sm font-medium uppercase tracking-widest text-text">- James T.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
