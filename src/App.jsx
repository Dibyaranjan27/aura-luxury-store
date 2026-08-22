import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx"; // Import the AuthProvider
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';

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
            </Routes>
          </main>
          
          {/* Simple Footer */}
          <footer className="bg-text text-white py-12 text-center">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="font-serif text-2xl tracking-[0.2em] mb-4">AURA</h2>
              <p className="text-gray-400 text-sm font-light uppercase tracking-widest mb-8">Elegance in every detail.</p>
              <div className="flex justify-center gap-6 text-sm text-gray-300 font-light mb-8">
                <a href="/shop" className="hover:text-accent transition-colors">Shop</a>
                <a href="/about" className="hover:text-accent transition-colors">About</a>
                <a href="/cart" className="hover:text-accent transition-colors">Cart</a>
              </div>
              <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Aura. All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;