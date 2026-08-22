import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx"; // Import the AuthProvider
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen"> 
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          
          {/* Expanded Footer */}
          <footer className="bg-text text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div>
                  <h2 className="font-serif text-3xl tracking-[0.2em] mb-6">AURA</h2>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    Curating the world's finest luxury pieces for the modern connoisseur. Elegance in every detail.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest mb-6">Client Care</h3>
                  <ul className="space-y-4 text-sm text-gray-400 font-light">
                    <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Shipping & Returns</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Track Your Order</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest mb-6">The Boutique</h3>
                  <ul className="space-y-4 text-sm text-gray-400 font-light">
                    <li><Link to="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
                    <li><Link to="/shop" className="hover:text-accent transition-colors">Collections</Link></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Bespoke Services</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest mb-6">Newsletter</h3>
                  <p className="text-sm text-gray-400 font-light mb-4">Subscribe for exclusive access to new arrivals.</p>
                  <form className="flex border-b border-gray-600 pb-2">
                    <input type="email" placeholder="Email Address" className="bg-transparent border-none outline-none text-sm w-full font-light" />
                    <button type="submit" className="text-xs uppercase tracking-widest hover:text-accent transition-colors">Subscribe</button>
                  </form>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Aura. All Rights Reserved.</p>
                <div className="flex gap-6 text-xs text-gray-500 uppercase tracking-widest">
                  <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;