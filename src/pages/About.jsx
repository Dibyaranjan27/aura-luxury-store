import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-background min-h-screen pt-24 pb-20 font-sans">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            alt="About Us Hero" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            The Legacy of Excellence
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif text-text mb-8">Our Philosophy</h2>
          <div className="prose prose-lg mx-auto text-gray-600 font-light leading-relaxed space-y-6">
            <p>
              Founded on the principles of uncompromising quality and timeless elegance, Aura has curated the world's most exquisite luxury goods. We believe that true luxury is found in the details—the meticulous craftsmanship, the rare materials, and the heritage behind each piece.
            </p>
            <p>
              Our collections are thoughtfully selected for individuals who appreciate the artistry of fashion and the enduring value of exceptional design. From horological masterpieces to handcrafted leather goods, every item in our boutique tells a story of dedication and perfection.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="bg-primary py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { title: "Authenticity", desc: "Every piece is guaranteed authentic, sourced directly from the world's finest ateliers and heritage brands." },
            { title: "Craftsmanship", desc: "We celebrate the artisans who dedicate their lives to mastering traditional techniques and pushing boundaries." },
            { title: "Service", desc: "Our commitment to our clients extends beyond the purchase, offering a truly personalized bespoke experience." }
          ].map((value, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <span className="text-accent text-2xl font-serif font-bold">{idx + 1}</span>
              </div>
              <h3 className="text-xl font-serif text-text mb-4">{value.title}</h3>
              <p className="text-gray-600 font-light">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center">
        <h2 className="text-3xl font-serif mb-8 text-text">Experience the Collection</h2>
        <Link to="/shop" className="inline-block bg-text text-white py-4 px-10 uppercase tracking-widest hover:bg-accent transition-colors duration-300 font-medium">
          Enter Boutique
        </Link>
      </section>

    </div>
  );
};

export default About;
