import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockProducts } from '../data/mockData';

const Home = () => {
  const bestSellers = mockProducts.filter(product => product.isBestSeller).slice(0, 4);

  return (
    <div className="bg-background text-text font-sans pt-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Lifestyle" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-wide"
          >
            Redefining <span className="text-accent italic">Luxury</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 mb-10 font-light"
          >
            Discover our curated collection of premium watches, designer bags, and exquisite jewelry.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to="/shop" 
              className="inline-block bg-white text-text font-medium py-3 px-8 rounded-none uppercase tracking-widest hover:bg-accent hover:text-white transition-colors duration-300"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">The Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Watches", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800" },
            { name: "Bags", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800" },
            { name: "Jewelry", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800" }
          ].map((category, idx) => (
            <Link to={`/shop?category=${category.name}`} key={idx} className="group relative h-96 overflow-hidden block">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-serif font-semibold tracking-wider uppercase border border-white px-6 py-2 backdrop-blur-sm">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-primary py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Best Sellers</h2>
            <Link to="/shop" className="text-accent font-medium hover:underline tracking-wide">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-md p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-center font-medium text-text uppercase text-sm tracking-wider">Quick View</p>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
                  <h3 className="font-serif text-lg text-text mb-2 line-clamp-1">{product.name}</h3>
                  <p className="font-medium text-accent">${product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Join the Inner Circle</h2>
        <p className="text-gray-600 mb-8 font-light">Subscribe to receive exclusive access to new collections and private events.</p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full sm:w-96 px-4 py-3 bg-primary border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            required
          />
          <button 
            type="submit" 
            className="bg-text text-white px-8 py-3 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-3xl text-text mb-12">Client Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-accent text-lg mb-4">★★★★★</div>
              <p className="text-gray-600 font-light italic mb-4">"The attention to detail and quality of the materials is unparalleled. Truly a luxury experience."</p>
              <p className="text-sm font-medium uppercase tracking-widest text-text">- Sophia L.</p>
            </div>
            <div className="p-6">
              <div className="text-accent text-lg mb-4">★★★★★</div>
              <p className="text-gray-600 font-light italic mb-4">"Impeccable service. My order arrived beautifully packaged and the product exceeded my expectations."</p>
              <p className="text-sm font-medium uppercase tracking-widest text-text">- Marcus W.</p>
            </div>
            <div className="p-6">
              <div className="text-accent text-lg mb-4">★★★★★</div>
              <p className="text-gray-600 font-light italic mb-4">"Aura has become my definitive destination for luxury accessories. Their curation is flawless."</p>
              <p className="text-sm font-medium uppercase tracking-widest text-text">- Elena R.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
