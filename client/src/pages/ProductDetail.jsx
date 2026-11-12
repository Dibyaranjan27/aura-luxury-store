import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Loader2, Check } from 'lucide-react';
import useWishlistStore from '../store/wishlistStore';
import useCartStore from '../store/cartStore';
import ProductCard from '../components/Product/ProductCard';
import { getProductById, getProducts } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  const { items: wishlistItems, addItem: addWishlistItem, removeItem: removeWishlistItem } = useWishlistStore();
  const { addItem: addCartItem } = useCartStore();

  const productId = product ? (product.id || product._id) : null;
  const isInWishlist = productId && wishlistItems.some(item => (item.id || item._id) === productId);

  useEffect(() => {
    window.scrollTo(0, 0);
    let isMounted = true;

    const loadProduct = async () => {
      setIsLoading(true);
      const foundProduct = await getProductById(id);
      if (isMounted) {
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedSize(foundProduct.attributes?.sizes ? foundProduct.attributes.sizes[0] : null);
          setSelectedColor(foundProduct.attributes?.colors ? foundProduct.attributes.colors[0] : null);
          setIsLoading(false);

          // Load related products by category
          const categoryProducts = await getProducts({ category: foundProduct.category });
          if (isMounted) {
            const currentId = foundProduct.id || foundProduct._id;
            setRelatedProducts(
              categoryProducts
                .filter(p => (p.id || p._id) !== currentId)
                .slice(0, 4)
            );
          }
        } else {
          navigate('/shop');
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    addCartItem(product, 1, {
      size: selectedSize,
      color: selectedColor,
    });
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2000);
  };

  if (isLoading || !product) {
    return (
      <div className="min-h-screen bg-background pt-32 flex flex-col items-center justify-center text-gray-400">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-accent" />
        <p className="font-light tracking-widest text-xs uppercase">Unveiling Masterpiece...</p>
      </div>
    );
  }

  const sizes = product.attributes?.sizes;
  const colors = product.attributes?.colors;

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
            <div className="aspect-[4/5] overflow-hidden bg-primary relative shadow-sm">
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
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">{product.category}</p>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-text mb-4 leading-tight">{product.name}</h1>
            <p className="text-2xl text-accent mb-6 font-serif">${product.price.toLocaleString()}</p>
            
            <p className="text-gray-600 font-light leading-relaxed mb-6 text-sm md:text-base">
              {product.description}
            </p>

            {/* Color / Finish Selection */}
            {colors && colors.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-widest text-text font-semibold">Finish / Color</span>
                  <span className="text-xs text-gray-500 font-light">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors duration-200 border ${
                        selectedColor === color
                          ? 'border-text bg-text text-white font-medium'
                          : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size / Dimension Selection */}
            {sizes && sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-widest text-text font-semibold">Size</span>
                  <span className="text-xs text-gray-500 font-light">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-12 px-4 py-2 text-xs uppercase tracking-wider transition-colors duration-200 border ${
                        selectedSize === size
                          ? 'border-text bg-text text-white font-medium'
                          : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8 border-t border-b border-gray-100 py-5">
                <h3 className="text-xs uppercase tracking-widest text-text font-semibold mb-3">Highlights</h3>
                <ul className="space-y-1.5">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-gray-500 font-light flex items-center">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-text text-white py-4 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium text-xs flex items-center justify-center gap-3"
              >
                {isAddedFeedback ? (
                  <>
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
              
              <button 
                onClick={() => {
                  if (isInWishlist) {
                    removeWishlistItem(productId);
                  } else {
                    addWishlistItem(product);
                  }
                }}
                className={`p-4 border transition-colors duration-300 ${
                  isInWishlist 
                    ? 'border-accent bg-accent/5 text-accent' 
                    : 'border-gray-200 text-gray-400 hover:border-text hover:text-text'
                }`}
                title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-accent' : ''}`} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6 text-center">
              <div className="flex flex-col items-center">
                <Truck className="h-5 w-5 text-gray-400 mb-2" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-wider text-gray-500">Complimentary Shipping</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="h-5 w-5 text-gray-400 mb-2" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-wider text-gray-500">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="h-5 w-5 text-gray-400 mb-2" strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-wider text-gray-500">Authenticity Guaranteed</span>
              </div>
            </div>

          </motion.div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-28 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-serif text-text mb-12 text-center">Client Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-primary p-8 text-center">
              <div className="text-accent text-base mb-3">★★★★★</div>
              <p className="text-gray-600 font-light italic mb-4 text-sm">"Absolutely stunning piece. The craftsmanship exceeds expectations. It has become my everyday essential."</p>
              <p className="text-xs font-medium uppercase tracking-widest text-text">- Eleanor R.</p>
            </div>
            <div className="bg-primary p-8 text-center">
              <div className="text-accent text-base mb-3">★★★★★</div>
              <p className="text-gray-600 font-light italic mb-4 text-sm">"Aura never disappoints. The packaging was immaculate and the product itself is a true work of art."</p>
              <p className="text-xs font-medium uppercase tracking-widest text-text">- James T.</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-gray-200 pt-16">
            <h2 className="text-2xl font-serif text-text mb-10 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(related => (
                <ProductCard key={related.id || related._id} product={related} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;
