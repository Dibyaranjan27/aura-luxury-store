import { useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const Footer = ({ onOpenConcierge }) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes("@")) {
      setIsSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-text text-white pt-20 pb-10 mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h2 className="font-serif text-3xl tracking-[0.2em] mb-6">AURA</h2>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Curating the world's finest luxury pieces for the modern connoisseur. Elegance in every detail.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-6 text-gray-300">Client Care</h3>
            <ul className="space-y-4 text-xs uppercase tracking-wider text-gray-400 font-light">
              <li>
                <button onClick={onOpenConcierge} className="hover:text-accent transition-colors text-left">
                  Contact Concierge
                </button>
              </li>
              <li>
                <button onClick={onOpenConcierge} className="hover:text-accent transition-colors text-left">
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button onClick={onOpenConcierge} className="hover:text-accent transition-colors text-left">
                  Bespoke FAQ
                </button>
              </li>
              <li>
                <Link to="/account" className="hover:text-accent transition-colors block">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-6 text-gray-300">The Boutique</h3>
            <ul className="space-y-4 text-xs uppercase tracking-wider text-gray-400 font-light">
              <li><Link to="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
              <li><Link to="/shop" className="hover:text-accent transition-colors">Collections</Link></li>
              <li><Link to="/wishlist" className="hover:text-accent transition-colors">Private Wishlist</Link></li>
              <li><button onClick={onOpenConcierge} className="hover:text-accent transition-colors text-left">Private Appointments</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-6 text-gray-300">Newsletter</h3>
            <p className="text-xs text-gray-400 font-light mb-4">
              Subscribe for exclusive access to private archives and new arrivals.
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 text-accent text-xs py-2">
                <Check className="h-4 w-4" />
                <span>Welcome to the Inner Circle.</span>
              </div>
            ) : (
              <form className="flex border-b border-gray-600 pb-2" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Email Address" 
                  className="bg-transparent border-none outline-none text-xs w-full font-light text-white placeholder-gray-500" 
                  required
                />
                <button type="submit" className="text-[11px] uppercase tracking-widest hover:text-accent transition-colors font-medium">
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Aura Luxury Group. All Rights Reserved.</p>
          <div className="flex gap-6 text-xs text-gray-500 uppercase tracking-widest">
            <Link to="/about" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
