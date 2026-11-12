import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Loader2, ArrowLeft } from 'lucide-react';
import useCartStore, { getCartItemId } from '../store/cartStore';
import { useAuth } from '../contexts/AuthContext';
import { createOrder } from '../services/api';

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCartStore();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const [formData, setFormData] = useState({
    firstName: user?.displayName ? user.displayName.split(' ')[0] : 'Eleanor',
    lastName: user?.displayName ? user.displayName.split(' ').slice(1).join(' ') : 'Vance',
    email: user?.email || 'eleanor.vance@aura.luxury',
    address: '123 Luxury Avenue, Penthouse B',
    city: 'New York',
    postal: '10001',
    card: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvc: '888',
  });

  const cartTotal = getCartTotal();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
      return;
    }

    // Payment & Order Placement
    setIsSubmitting(true);
    try {
      const orderPayload = {
        userId: user?.uid || 'guest',
        userEmail: formData.email,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          postal: formData.postal,
        },
        items: items.map((item) => ({
          product: item.id || item._id,
          name: item.name,
          priceAtPurchase: item.price,
          quantity: item.quantity,
          image: item.image,
          variant: {
            size: item.selectedSize || null,
            color: item.selectedColor || null,
          },
        })),
        totalAmount: cartTotal,
      };

      const result = await createOrder(orderPayload);
      setConfirmedOrder(result);
      clearCart();
    } catch (err) {
      console.error('Order creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmedOrder) {
    const orderNumber = confirmedOrder._id || confirmedOrder.id || `AURA-${Date.now().toString().slice(-6)}`;
    return (
      <div className="bg-background min-h-[85vh] pt-32 pb-20 px-4 flex items-center justify-center font-sans text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-white p-10 md:p-14 shadow-lg border border-gray-100"
        >
          <div className="w-16 h-16 bg-text text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✓</span>
          </div>
          <p className="text-xs uppercase tracking-widest text-accent mb-2">Payment Authorized</p>
          <h2 className="text-3xl font-serif text-text mb-4">Order Confirmed</h2>
          <p className="text-gray-500 font-light mb-2 text-sm">
            Thank you for shopping with AURA. Your bespoke packaging is now being prepared.
          </p>
          <div className="my-6 p-4 bg-primary text-xs uppercase tracking-widest font-mono text-gray-600">
            Order Reference: <span className="text-text font-bold font-sans">{orderNumber}</span>
          </div>
          <p className="text-xs text-gray-400 mb-8">
            A confirmation receipt will be sent to <span className="text-text font-medium">{formData.email}</span>.
          </p>
          <Link 
            to="/shop" 
            className="inline-block bg-text text-white py-4 px-10 uppercase tracking-widest hover:bg-accent transition-colors duration-300 text-xs font-medium"
          >
            Continue Exploring
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-28 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-text mb-2">Secure Checkout</h1>
          <p className="text-xs uppercase tracking-widest text-gray-400 flex items-center justify-center gap-1">
            <Lock className="h-3 w-3 text-accent" /> 256-Bit Encrypted Payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Section */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 shadow-sm border border-gray-100">
            {/* Progress Bar */}
            <div className="flex justify-between mb-8 border-b border-gray-100 pb-4">
              <div className={`text-xs uppercase tracking-widest ${step === 1 ? 'text-text font-bold border-b-2 border-text pb-4 -mb-4' : 'text-gray-400'}`}>
                1. Shipping Details
              </div>
              <div className={`text-xs uppercase tracking-widest ${step === 2 ? 'text-text font-bold border-b-2 border-text pb-4 -mb-4' : 'text-gray-400'}`}>
                2. Payment Method
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <h2 className="text-base font-serif uppercase tracking-wider text-text">Delivery Destination</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">First Name *</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text font-light text-sm bg-transparent" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">Last Name *</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text font-light text-sm bg-transparent" 
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text font-light text-sm bg-transparent" 
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">Street Address *</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text font-light text-sm bg-transparent" 
                      required 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">City *</label>
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text font-light text-sm bg-transparent" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">Postal Code *</label>
                      <input 
                        type="text" 
                        name="postal"
                        value={formData.postal}
                        onChange={handleInputChange}
                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text font-light text-sm bg-transparent" 
                        required 
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-base font-serif uppercase tracking-wider text-text">Payment Card</h2>
                    <span className="text-[11px] uppercase tracking-widest text-accent font-medium">Stripe Protected</span>
                  </div>

                  <div className="p-4 bg-primary/60 border border-gray-200 text-xs text-gray-600 font-light flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>Test payments are enabled. Standard luxury concierge processing active.</span>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">Card Number *</label>
                    <input 
                      type="text" 
                      name="card"
                      value={formData.card}
                      onChange={handleInputChange}
                      placeholder="4242 4242 4242 4242"
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text font-light text-sm bg-transparent" 
                      required 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">Expiry (MM/YY) *</label>
                      <input 
                        type="text" 
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="12/28"
                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text font-light text-sm bg-transparent" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest text-gray-500 mb-2">CVC *</label>
                      <input 
                        type="text" 
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        placeholder="888"
                        className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text font-light text-sm bg-transparent" 
                        required 
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="mt-6 flex justify-between items-center pt-6 border-t border-gray-100">
                {step === 2 ? (
                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="text-gray-500 text-xs uppercase tracking-widest hover:text-text transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                <button 
                  type="submit" 
                  disabled={isSubmitting || items.length === 0}
                  className="bg-text text-white py-4 px-10 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium text-xs flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Authorizing...</span>
                    </>
                  ) : (
                    <span>{step === 1 ? 'Proceed to Payment' : `Authorize $${cartTotal.toLocaleString()}`}</span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 bg-white p-8 md:p-10 shadow-sm border border-gray-100 self-start">
            <h2 className="text-base font-serif uppercase tracking-wider text-text mb-6">Order Summary</h2>

            {items.length === 0 ? (
              <div className="text-center py-10 text-gray-400 font-light text-sm">
                Your shopping bag is empty.
              </div>
            ) : (
              <div className="space-y-4 max-h-72 overflow-y-auto pr-2 mb-6">
                {items.map((item) => {
                  const key = getCartItemId(item);
                  return (
                    <div key={key} className="flex gap-4 items-center">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover bg-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-serif text-text truncate">{item.name}</p>
                        <p className="text-[11px] text-gray-400">Qty: {item.quantity}</p>
                        {(item.selectedSize || item.selectedColor) && (
                          <p className="text-[10px] text-accent">
                            {[item.selectedSize, item.selectedColor].filter(Boolean).join(' • ')}
                          </p>
                        )}
                      </div>
                      <p className="text-xs font-medium text-text">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="border-t border-gray-100 pt-4 space-y-2 text-xs font-light text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Complimentary Shipping</span>
                <span className="text-accent uppercase text-[10px] tracking-wider">Free</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3 text-sm font-medium text-text">
                <span className="uppercase tracking-widest">Total</span>
                <span className="text-accent">${cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
