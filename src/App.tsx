import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ArrowRight, 
  Star, 
  ChevronRight,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';
import { PRODUCTS, CONCERNS, type Product, type Concern } from './types';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium">
          <a href="#" className="hover:opacity-50 transition-opacity">Shop</a>
          <a href="#concerns" className="hover:opacity-50 transition-opacity">Skin Concerns</a>
          <a href="#" className="hover:opacity-50 transition-opacity">About</a>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <a href="/" className="text-2xl font-serif tracking-tighter absolute left-1/2 -translate-x-1/2">
          ELARA BEAUTY
        </a>

        <div className="flex items-center space-x-6">
          <button className="relative hover:opacity-50 transition-opacity">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-beige-300 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-8 mt-12 text-2xl font-serif">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Shop All</a>
              <a href="#concerns" onClick={() => setIsMobileMenuOpen(false)}>Skin Concerns</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
              <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Journal</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=2000" 
        alt="Elara Beauty Luxury Skincare" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/10" />
    </div>
    
    <div className="relative z-10 text-center px-6 max-w-4xl">
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-xs uppercase tracking-[0.3em] font-medium mb-6 block"
      >
        Science-Backed Beauty
      </motion.span>
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] mb-8"
      >
        Simple Skincare.<br />Beautiful Results.
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg md:text-xl font-light max-w-xl mx-auto mb-12 opacity-80"
      >
        High-performance formulas designed for radiant, healthy skin. Minimalist routines for maximal impact.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <button className="bg-white text-neutral-900 px-10 py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-beige-100 transition-colors shadow-lg">
          Shop Now
        </button>
      </motion.div>
    </div>
  </section>
);

const SkinConcerns = () => (
  <section id="concerns" className="py-24 bg-beige-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl mb-4">Shop by Concern</h2>
        <p className="text-neutral-500 max-w-md mx-auto">Targeted solutions for your unique skin needs.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {CONCERNS.map((concern, idx) => (
          <motion.div 
            key={concern.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-white shadow-sm">
              <img 
                src={concern.image} 
                alt={concern.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-1">{concern.title}</h3>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{concern.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedProducts = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl mb-4">The Essentials</h2>
          <p className="text-neutral-500">Our most-loved formulas for a healthy glow.</p>
        </div>
        <button className="text-xs uppercase tracking-widest font-medium flex items-center group">
          View All Products <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRODUCTS.map((product, idx) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="aspect-square overflow-hidden rounded-3xl bg-beige-100 mb-6 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <button className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm py-3 rounded-2xl text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Quick Add — ${product.price}
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-neutral-400">{product.category}</p>
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-sm text-neutral-600">${product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Routine = () => {
  const steps = [
    { number: '01', title: 'Cleanse', desc: 'Remove impurities without stripping.' },
    { number: '02', title: 'Treat', desc: 'Target concerns with active serums.' },
    { number: '03', title: 'Hydrate', desc: 'Lock in moisture for a dewy finish.' },
    { number: '04', title: 'Protect', desc: 'Shield skin from daily stressors.' }
  ];

  return (
    <section className="py-24 bg-beige-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-medium mb-6 block">The Elara Method</span>
            <h2 className="text-4xl md:text-5xl mb-8 leading-tight">Your Daily Ritual,<br />Simplified.</h2>
            <p className="text-neutral-600 mb-12 max-w-md leading-relaxed">
              We believe in the power of consistency. Our four-step routine is designed to provide everything your skin needs and nothing it doesn't.
            </p>
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start gap-6 group">
                  <span className="text-2xl font-serif text-beige-300 group-hover:text-neutral-900 transition-colors">{step.number}</span>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{step.title}</h3>
                    <p className="text-sm text-neutral-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=1000" 
                alt="Skincare Routine" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl hidden md:block max-w-[240px]">
              <p className="text-sm italic font-serif leading-relaxed">
                "My skin has never looked more balanced. The simplicity is what makes it work."
              </p>
              <p className="text-[10px] uppercase tracking-widest mt-4 font-bold">— Sarah J.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Reviews = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-beige-300 text-beige-300" />)}
        </div>
        <h2 className="text-4xl md:text-5xl">Real Results</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-12">
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-sm text-center"
          >
            <p className="text-xl font-serif leading-relaxed mb-6">
              "The Glazing Milk is a game changer. My skin feels hydrated all day without feeling heavy or greasy."
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold">Emma W. — Verified Buyer</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Newsletter = () => (
  <section className="py-24 px-6">
    <div className="max-w-5xl mx-auto bg-beige-100 rounded-[40px] py-20 px-8 text-center">
      <h2 className="text-3xl md:text-4xl mb-6">Join the Community</h2>
      <p className="text-neutral-600 mb-10 max-w-md mx-auto">
        Sign up for exclusive product launches, skincare tips, and 10% off your first order.
      </p>
      <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="email" 
          placeholder="Email Address" 
          className="flex-1 bg-white px-8 py-4 rounded-full text-sm outline-none focus:ring-1 focus:ring-beige-300 transition-all"
        />
        <button className="bg-neutral-900 text-white px-10 py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors">
          Subscribe
        </button>
      </form>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white pt-24 pb-12 border-t border-beige-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <h2 className="text-2xl font-serif tracking-tighter">ELARA BEAUTY</h2>
          <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
            Science-backed skincare for the modern minimalist. Cruelty-free, vegan, and dermatologically tested.
          </p>
          <div className="flex space-x-4">
            <Instagram className="w-5 h-5 text-neutral-400 hover:text-neutral-900 cursor-pointer transition-colors" />
            <Facebook className="w-5 h-5 text-neutral-400 hover:text-neutral-900 cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 text-neutral-400 hover:text-neutral-900 cursor-pointer transition-colors" />
          </div>
        </div>
        
        <div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Shop</h4>
          <ul className="space-y-4 text-sm text-neutral-500">
            <li><a href="#" className="hover:text-neutral-900 transition-colors">All Products</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Best Sellers</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Bundles</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-neutral-500">
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Store Locator</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-neutral-500">
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-neutral-900 transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-beige-100 gap-6">
        <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
          © 2026 Elara Beauty. All Rights Reserved.
        </p>
        <div className="flex space-x-8 text-[10px] text-neutral-400 uppercase tracking-widest">
          <span>Cruelty Free</span>
          <span>Vegan</span>
          <span>Sustainably Sourced</span>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-beige-200">
      <Navbar />
      <main>
        <Hero />
        <SkinConcerns />
        <FeaturedProducts />
        <Routine />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
