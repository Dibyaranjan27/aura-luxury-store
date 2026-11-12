import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Phone, Mail, HelpCircle, Sparkles } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: "How does complimentary luxury shipping work?",
    a: "Every Aura order is hand-packaged in our signature archival box and dispatched via insured, white-glove courier with real-time tracking."
  },
  {
    q: "What is your return & exchange guarantee?",
    a: "We provide a 30-day complimentary return window. Pieces must remain unworn with security tags intact."
  },
  {
    q: "Can I request custom sizing or bespoke engravings?",
    a: "Yes. Our Master Artisans accommodate custom ring sizing, chain lengths, and laser monograms upon request."
  }
];

const INITIAL_MESSAGES = [
  {
    sender: 'concierge',
    text: "Good day. Welcome to Aura Private Client Services. How may we assist you in curating your collection today?",
    time: "Just now"
  }
];

const QUICK_PROMPTS = [
  "Inquire about Bespoke Sizing",
  "Complimentary Shipping Details",
  "Schedule Boutique Appointment"
];

const ConciergeDrawer = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'faqs' | 'contact'
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Realistic concierge response
    setTimeout(() => {
      let reply = "Thank you for inquiring. Our Senior Client Advisor has logged this note. If you require immediate confirmation, please reach us via WhatsApp or hotline.";

      const lower = query.toLowerCase();
      if (lower.includes('shipping') || lower.includes('delivery')) {
        reply = "All pieces are dispatched with complimentary insured white-glove shipping. Orders typically arrive within 2-3 business days worldwide.";
      } else if (lower.includes('size') || lower.includes('sizing') || lower.includes('bespoke')) {
        reply = "Our atelier offers complimentary bespoke sizing on all fine jewelry and tailoring. You may specify your measurements during checkout or via private appointment.";
      } else if (lower.includes('appointment') || lower.includes('boutique')) {
        reply = "We would be delighted to welcome you to our Fifth Avenue or Paris salons. An advisor can reserve a private viewing suite for you at your convenience.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'concierge',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="relative w-full sm:w-[460px] h-full bg-white shadow-2xl z-50 flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] uppercase tracking-widest text-accent font-semibold">Private Advisory</span>
                </div>
                <h2 className="font-serif text-xl tracking-wider text-text mt-0.5">AURA CONCIERGE</h2>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-text transition-colors p-1">
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-100 text-xs uppercase tracking-wider font-medium text-gray-500 bg-primary/40">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'chat' ? 'border-text text-text bg-white' : 'border-transparent hover:text-text'
                }`}
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Live Advisor
              </button>
              <button
                onClick={() => setActiveTab('faqs')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'faqs' ? 'border-text text-text bg-white' : 'border-transparent hover:text-text'
                }`}
              >
                <HelpCircle className="h-3.5 w-3.5" />
                FAQ
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-3 text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'contact' ? 'border-text text-text bg-white' : 'border-transparent hover:text-text'
                }`}
              >
                <Phone className="h-3.5 w-3.5" />
                Direct Channels
              </button>
            </div>

            {/* Tab 1: Live Chat */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden bg-primary/20">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-4 text-xs font-light leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-text text-white'
                            : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 italic bg-white p-3 border border-gray-100 max-w-[60%]">
                      <Sparkles className="h-3.5 w-3.5 text-accent animate-spin" />
                      Advisor is typing...
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts */}
                <div className="px-4 py-2 border-t border-gray-100 bg-white">
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt)}
                        className="whitespace-nowrap px-3 py-1.5 bg-primary border border-gray-200 text-[11px] text-gray-600 hover:border-text hover:text-text transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Field */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="p-4 bg-white border-t border-gray-200 flex items-center gap-3"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask a client advisor..."
                    className="flex-1 text-xs border border-gray-200 px-4 py-3 focus:outline-none focus:border-text font-light"
                  />
                  <button
                    type="submit"
                    className="bg-text text-white p-3 hover:bg-accent transition-colors"
                    title="Send Message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 2: FAQs */}
            {activeTab === 'faqs' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">Frequently Addressed</h3>
                  <p className="text-xs text-gray-500 font-light mb-6">
                    Immediate guidance for our distinguished patrons.
                  </p>
                </div>
                <div className="space-y-4">
                  {FAQ_ITEMS.map((item, idx) => (
                    <div key={idx} className="p-4 border border-gray-100 bg-primary/30">
                      <h4 className="text-xs font-serif font-bold text-text mb-2">{item.q}</h4>
                      <p className="text-xs text-gray-600 font-light leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Direct Channels */}
            {activeTab === 'contact' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">Direct Salon Services</h3>
                  <p className="text-xs text-gray-500 font-light mb-6">
                    Connect directly with our luxury liaisons worldwide.
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href="https://wa.me/18008902872"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 border border-gray-200 hover:border-text transition-colors bg-white group"
                  >
                    <div className="w-10 h-10 bg-green-50 text-green-700 flex items-center justify-center rounded-full">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wider font-semibold text-text group-hover:text-accent transition-colors">WhatsApp Concierge</p>
                      <p className="text-[11px] text-gray-400 font-light">Available 24/7 for immediate assistance</p>
                    </div>
                  </a>

                  <a
                    href="mailto:concierge@aura.luxury"
                    className="flex items-center gap-4 p-4 border border-gray-200 hover:border-text transition-colors bg-white group"
                  >
                    <div className="w-10 h-10 bg-primary text-text flex items-center justify-center rounded-full">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wider font-semibold text-text group-hover:text-accent transition-colors">Email Private Client Services</p>
                      <p className="text-[11px] text-gray-400 font-light">concierge@aura.luxury</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 border border-gray-200 bg-white">
                    <div className="w-10 h-10 bg-primary text-text flex items-center justify-center rounded-full">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wider font-semibold text-text">Boutique Telephone</p>
                      <p className="text-[11px] text-gray-500 font-light">+1 (800) 890-AURA (Mon–Sat 9am–9pm EST)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Signature */}
            <div className="p-4 border-t border-gray-100 text-center bg-white">
              <p className="text-[10px] uppercase tracking-widest text-gray-400">
                Aura Ateliers • Geneva • Paris • New York • Tokyo
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConciergeDrawer;
