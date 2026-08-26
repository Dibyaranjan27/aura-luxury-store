import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-background min-h-[80vh] pt-32 pb-20 px-4 flex items-center justify-center font-sans text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg bg-white p-12 shadow-sm border border-gray-100"
        >
          <div className="w-16 h-16 bg-text text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✓</span>
          </div>
          <h2 className="text-3xl font-serif text-text mb-4">Order Confirmed</h2>
          <p className="text-gray-500 font-light mb-8">
            Thank you for your purchase. Your order #AURA-{Math.floor(Math.random() * 100000)} has been received and is being processed. 
            A confirmation email will be sent shortly.
          </p>
          <Link to="/shop" className="inline-block bg-text text-white py-3 px-8 uppercase tracking-widest hover:bg-accent transition-colors duration-300">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-24 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-serif text-text mb-10 text-center">Secure Checkout</h1>
        
        {/* Progress Bar */}
        <div className="flex justify-between mb-12 border-b border-gray-200 pb-4 relative">
          <div className={`text-sm uppercase tracking-widest ${step === 1 ? 'text-text font-medium' : 'text-gray-400'}`}>1. Shipping</div>
          <div className={`text-sm uppercase tracking-widest ${step === 2 ? 'text-text font-medium' : 'text-gray-400'}`}>2. Payment</div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-lg font-serif mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name *</label>
                  <input type="text" id="firstName" name="firstName" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent" required minLength={2} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name *</label>
                  <input type="text" id="lastName" name="lastName" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent" required minLength={2} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Address *</label>
                  <input type="text" id="address" name="address" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent" required minLength={5} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">City *</label>
                  <input type="text" id="city" name="city" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent" required />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Postal Code *</label>
                  <input type="text" id="postal" name="postal" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent" required pattern="[0-9]{5}" title="Five digit zip code" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-lg font-serif mb-6">Payment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Card Number *</label>
                  <input type="text" id="card" name="card" placeholder="XXXX XXXX XXXX XXXX" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent" required pattern="[0-9]{16}" title="16 digit card number" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Expiry Date *</label>
                  <input type="text" id="expiry" name="expiry" placeholder="MM/YY" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent" required pattern="(0[1-9]|1[0-2])\/[0-9]{2}" title="MM/YY format" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">CVC *</label>
                  <input type="text" id="cvc" name="cvc" placeholder="123" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-text transition-colors font-light bg-transparent" required pattern="[0-9]{3,4}" title="3 or 4 digit CVC" />
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-8 flex justify-between items-center pt-8 border-t border-gray-100">
            {step === 2 ? (
              <button type="button" onClick={() => setStep(1)} className="text-gray-500 text-sm uppercase tracking-widest hover:text-text transition-colors">
                Back
              </button>
            ) : (
              <div></div>
            )}
            <button type="submit" className="bg-text text-white py-4 px-10 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium">
              {step === 1 ? 'Continue to Payment' : 'Complete Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
