import React, { useState, useEffect, useContext, createContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Menu,
  X,
  ArrowLeft,
  Star,
  Search,
  Plus,
  Minus,
  Trash2,
} from 'lucide-react';
import { PRODUCTS, CONCERNS, type Product, type Concern } from './types';
import { DESCRIPTIONS } from './descriptions';
import heroBg from './hero-bg.png';

// --- Cart ---
interface CartItem { id: string; name: string; price: number; image: string; quantity: number; }
interface CartContextType {
  items: CartItem[];
  add: (product: Product, price: number) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
}
const CartContext = createContext<CartContextType>({} as CartContextType);
const useCart = () => useContext(CartContext);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('elara-cart') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('elara-cart', JSON.stringify(items));
  }, [items]);
  const add = (product: Product, price: number) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price, image: product.image, quantity: 1 }];
    });
  };
  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const update = (id: string, qty: number) => {
    if (qty < 1) { remove(id); return; }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };
  const clear = () => setItems([]);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  return <CartContext.Provider value={{ items, add, remove, update, clear, total, count }}>{children}</CartContext.Provider>;
};

// --- Sale Data ---
const SALE_DISCOUNTS: Record<string, number> = {
  '1': 20, '6': 25, '8': 20, '11': 15,
  '2': 20, '14': 25, '16': 30, '18': 15,
  '3': 20, '19': 20, '22': 15, '25': 20,
  '4': 25, '27': 20, '29': 25, '32': 15,
  '33': 20, '35': 25, '37': 30, '39': 20,
};

const SALE_PRICE_OVERRIDES: Record<string, number> = {
  '1': 12.79,
};

const getSalePrice = (product: { id: string; price: number }) => {
  if (SALE_PRICE_OVERRIDES[product.id] !== undefined) return SALE_PRICE_OVERRIDES[product.id];
  const discount = SALE_DISCOUNTS[product.id];
  if (!discount) return null;
  return +(product.price * (1 - discount / 100)).toFixed(2);
};

const getDisplayDiscount = (product: { id: string; price: number }) => {
  if (SALE_PRICE_OVERRIDES[product.id] !== undefined) {
    return Math.round((1 - SALE_PRICE_OVERRIDES[product.id] / product.price) * 100);
  }
  return SALE_DISCOUNTS[product.id] ?? null;
};

// --- Components ---

const CartDrawer = ({ onClose }: { onClose: () => void }) => {
  const { items, remove, update, total, count } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const text = await res.text();
      let data: any;
      try { data = JSON.parse(text); } catch {
        setError(`Error ${res.status}: ${text.slice(0, 120)}`);
        setLoading(false); return;
      }
      if (data.url) { window.location.href = data.url; }
      else { setError(data.error || `Error ${res.status}`); setLoading(false); }
    } catch (e: any) {
      setError(e.message || 'Network error'); setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative bg-white w-full max-w-md h-full flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-neutral-100">
          <h2 className="text-xl font-serif">Your Bag {count > 0 && <span className="text-sm font-normal text-neutral-400">({count})</span>}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-4">
            <ShoppingBag className="w-10 h-10 text-neutral-200" />
            <p className="text-neutral-400 text-sm">Your bag is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-neutral-50 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug">{item.name}</p>
                    <p className="text-sm text-neutral-500 mt-0.5">£{item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => update(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => update(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => remove(item.id)} className="ml-auto text-neutral-300 hover:text-neutral-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-6 border-t border-neutral-100 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span className="font-medium">£{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Delivery</span>
                <span className="font-medium text-[#b8976a]">Free</span>
              </div>
              <div className="flex justify-between font-medium border-t border-neutral-100 pt-4">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-neutral-900 text-white py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Redirecting…' : 'Checkout with Stripe'}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const SearchOverlay = ({ onClose, onSelectConcern }: { onClose: () => void; onSelectConcern: (id: string) => void }) => {
  const [query, setQuery] = useState('');
  const results = query.trim().length > 0
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-[70] flex flex-col"
    >
      <div className="max-w-3xl mx-auto w-full px-6 pt-8">
        <div className="flex items-center gap-4 border-b border-neutral-200 pb-4">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 text-lg outline-none placeholder:text-neutral-300"
          />
          <button onClick={onClose} className="hover:opacity-50 transition-opacity">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 overflow-y-auto max-h-[70vh]">
          {query.trim().length === 0 && (
            <p className="text-sm text-neutral-400 text-center mt-12">Start typing to search products</p>
          )}
          {query.trim().length > 0 && results.length === 0 && (
            <p className="text-sm text-neutral-400 text-center mt-12">No products found for "{query}"</p>
          )}
          {results.map(product => (
            <button
              key={product.id}
              onClick={() => { onSelectConcern(product.concern[0]); onClose(); }}
              className="w-full flex items-center gap-4 py-4 border-b border-neutral-100 hover:bg-beige-50 transition-colors text-left px-2 rounded-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 object-cover rounded-xl bg-beige-100"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-xs text-neutral-400 uppercase tracking-widest mt-0.5">{product.category} — £{product.price.toFixed(2)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SaleBanner = ({ onViewSale, onHide }: { onViewSale: () => void; onHide: () => void }) => {
  return (
    <div className="bg-neutral-900 text-white text-center py-3 px-6 flex items-center justify-center gap-4 relative z-40">
      <p className="text-xs uppercase tracking-widest font-medium">
        <span className="text-[#b8976a] mr-2">SALE</span>
        Up to 30% off selected products —{' '}
        <button onClick={onViewSale} className="underline underline-offset-2 hover:opacity-70 transition-opacity">Shop now</button>
      </p>
      <button onClick={onHide} className="absolute right-4 hover:opacity-50 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const Navbar = ({ onHome, onSelectConcern, onShowSale }: { onHome: () => void; onSelectConcern: (id: string) => void; onShowSale: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <nav className="relative z-50 bg-white py-5 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium">
            <a href="#" className="hover:opacity-50 transition-opacity">Shop</a>
            <a href="#concerns" className="hover:opacity-50 transition-opacity">Skin Concerns</a>
            <button onClick={onShowSale} className="text-[#b8976a] hover:opacity-70 transition-opacity font-bold">Sale</button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
          </div>

          <button onClick={onHome} className="text-2xl font-serif tracking-tighter absolute left-1/2 -translate-x-1/2">
            ELARA BEAUTY
          </button>

          <div className="flex items-center space-x-6">
            <button onClick={() => setIsSearchOpen(true)} className="hover:opacity-50 transition-opacity">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative hover:opacity-50 transition-opacity">
              <ShoppingBag className="w-5 h-5" />
              {count > 0 && <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{count}</span>}
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
                <button onClick={() => { onShowSale(); setIsMobileMenuOpen(false); }} className="text-left text-[#b8976a] font-bold">Sale</button>
                <a href="#" onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isSearchOpen && (
          <SearchOverlay
            onClose={() => setIsSearchOpen(false)}
            onSelectConcern={(id) => { onSelectConcern(id); setIsSearchOpen(false); }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

const AllProductsPage = ({ onBack, onSelectProduct }: { onBack: () => void; onSelectProduct: (id: string) => void }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const filtered = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-12 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium mb-12 hover:opacity-50 transition-opacity">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-neutral-400 mb-3">Collection</p>
          <h1 className="text-5xl md:text-6xl font-serif mb-8">All Products</h1>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-colors ${activeCategory === cat ? 'bg-neutral-900 text-white' : 'border border-neutral-200 text-neutral-500 hover:border-neutral-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((product, idx) => {
            const salePrice = getSalePrice(product);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="group cursor-pointer"
                onClick={() => onSelectProduct(product.id)}
              >
                <div className="aspect-square overflow-hidden rounded-3xl bg-beige-100 mb-4 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  {salePrice && (
                    <div className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1.5 rounded-full">
                      -{getDisplayDiscount(product)}%
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm py-3 rounded-2xl text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-center">
                    View Product
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400">{product.category}</p>
                  <h3 className="text-base font-medium">{product.name}</h3>
                  {salePrice ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium">£{salePrice.toFixed(2)}</span>
                      <span className="text-sm text-neutral-400 line-through">£{product.price.toFixed(2)}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-neutral-600">£{product.price.toFixed(2)}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const Hero = ({ onShopNow }: { onShopNow: () => void }) => (
  <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 z-0">
      <img 
        src={heroBg}
        alt="Elara Beauty Luxury Skincare"
        className="w-full h-full object-cover"
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
        className="text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
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
        <button onClick={onShopNow} className="bg-white text-neutral-900 px-10 py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-beige-100 transition-colors shadow-lg">
          Shop Now
        </button>
      </motion.div>
    </div>
  </section>
);

const SkinConcerns = ({ onSelectConcern }: { onSelectConcern: (id: string) => void }) => (
  <section id="concerns" className="py-24 bg-beige-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl mb-4">Shop by Concern</h2>
        <p className="text-neutral-500 max-w-md mx-auto">Targeted solutions for your unique skin needs.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {CONCERNS.map((concern, idx) => (
          <motion.div
            key={concern.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group cursor-pointer"
            onClick={() => onSelectConcern(concern.id)}
          >
            <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-white shadow-sm">
              <img
                src={concern.image}
                alt={concern.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                style={{ objectPosition: concern.imagePosition ?? 'center', transform: concern.imageScale ? `scale(${concern.imageScale})` : undefined }}
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

const getProductRating = (id: string) => {
  const ratings = [4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
  const reviews = [14, 28, 37, 52, 61, 43, 19, 76, 32, 48, 67, 21, 55, 39, 82, 44, 17, 63, 29, 71, 36, 58, 23, 46, 88, 31, 74, 42, 65, 18, 57, 83, 26, 49, 72, 34, 61, 45, 38, 79];
  const idx = (parseInt(id) - 1) % ratings.length;
  const reviewIdx = (parseInt(id) - 1) % reviews.length;
  return { rating: ratings[idx], count: reviews[reviewIdx] };
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg key={star} className="w-4 h-4" viewBox="0 0 20 20">
            {half ? (
              <>
                <defs>
                  <linearGradient id={`half-${star}`}>
                    <stop offset="50%" stopColor="#b8976a" />
                    <stop offset="50%" stopColor="#e5e7eb" />
                  </linearGradient>
                </defs>
                <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78z" fill={`url(#half-${star})`} />
              </>
            ) : (
              <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78z" fill={filled ? '#b8976a' : '#e5e7eb'} />
            )}
          </svg>
        );
      })}
    </div>
  );
};

const ProductPage = ({ product, onBack }: { product: Product; onBack: () => void }) => {
  const desc = DESCRIPTIONS[product.id];
  const { rating, count } = getProductRating(product.id);
  const salePrice = getSalePrice(product);
  const discount = getDisplayDiscount(product);
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    add(product, salePrice ?? product.price);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-12 pb-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium mb-12 hover:opacity-50 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="aspect-[3/4] rounded-[40px] overflow-hidden bg-beige-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="py-4">
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-neutral-400 mb-3">{product.category}</p>
            <h1 className="text-4xl md:text-5xl font-serif mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={rating} />
              <span className="text-sm text-neutral-500">{rating.toFixed(1)} ({count} reviews)</span>
            </div>
            {salePrice ? (
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-2xl font-light text-neutral-900">£{salePrice.toFixed(2)}</span>
                <span className="text-lg text-neutral-400 line-through">£{product.price.toFixed(2)}</span>
                <span className="text-xs font-bold bg-neutral-900 text-white px-2.5 py-1 rounded-full">-{discount}%</span>
              </div>
            ) : (
              <p className="text-2xl font-light text-neutral-700 mb-8">£{product.price.toFixed(2)}</p>
            )}

            {desc && (
              <>
                <p className="text-xl font-serif leading-relaxed text-neutral-800 mb-6 italic">
                  {desc.hook}
                </p>
                <p className="text-neutral-600 leading-relaxed mb-10">
                  {desc.body}
                </p>
                <div className="mb-10">
                  <p className="text-xs uppercase tracking-widest font-bold mb-4">Key Benefits</p>
                  <ul className="space-y-3">
                    {desc.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                        <span className="w-1 h-1 rounded-full bg-neutral-400 mt-2 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            <button
              onClick={handleAdd}
              className={`w-full py-5 rounded-full text-xs uppercase tracking-widest font-medium transition-colors ${added ? 'bg-[#b8976a] text-white' : 'bg-neutral-900 text-white hover:bg-neutral-800'}`}
            >
              {added ? 'Added to Bag ✓' : `Add to Bag — £${(salePrice ?? product.price).toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ConcernProductsPage = ({ concern, onBack, onSelectProduct }: { concern: Concern; onBack: () => void; onSelectProduct: (id: string) => void }) => {
  const products = PRODUCTS.filter(p => p.concern.includes(concern.id));
  return (
    <div className="min-h-screen pt-12 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium mb-12 hover:opacity-50 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-neutral-400 mb-3">Skin Concern</p>
          <h1 className="text-5xl md:text-6xl font-serif mb-4">{concern.title}</h1>
          <p className="text-neutral-500">{concern.description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group cursor-pointer"
              onClick={() => onSelectProduct(product.id)}
            >
              <div className="aspect-square overflow-hidden rounded-3xl bg-beige-100 mb-6 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm py-3 rounded-2xl text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-center">
                  View Product
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400">{product.category}</p>
                <h3 className="text-lg font-medium">{product.name}</h3>
                {getSalePrice(product) ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium">£{getSalePrice(product)!.toFixed(2)}</span>
                    <span className="text-sm text-neutral-400 line-through">£{product.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <p className="text-sm text-neutral-600">£{product.price.toFixed(2)}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


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
        {[
          { quote: "The Glazing Milk is a game changer. My skin feels hydrated all day without feeling heavy or greasy.", author: "Emma W." },
          { quote: "I've tried so many eye creams and nothing compares to the Caffeine Eye Serum. The puffiness was gone within a week.", author: "Isabelle R." },
          { quote: "The Barrier Restore Cream completely transformed my skin. My redness has calmed down and my complexion looks so even now.", author: "Sophie M." },
        ].map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="max-w-sm text-center"
          >
            <p className="text-xl font-serif leading-relaxed mb-6">"{review.quote}"</p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold">{review.author} — Verified Buyer</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto bg-beige-100 rounded-[40px] py-20 px-8 text-center">
        <h2 className="text-3xl md:text-4xl mb-6">Join the Community</h2>
        <p className="text-neutral-600 mb-10 max-w-md mx-auto">
          Sign up for exclusive product launches, skincare tips, and 10% off your first order.
        </p>
        {status === 'success' ? (
          <div className="space-y-2">
            <p className="text-lg font-serif text-neutral-800">You're in — welcome to Elara Beauty.</p>
            <p className="text-sm text-neutral-500">Check your inbox for your 10% off code: <strong>WELCOME10</strong></p>
          </div>
        ) : (
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-white px-8 py-4 rounded-full text-sm outline-none focus:ring-1 focus:ring-beige-300 transition-all"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-neutral-900 text-white px-10 py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
            </button>
            {status === 'error' && <p className="text-xs text-red-500 w-full text-left pl-2">Something went wrong. Please try again.</p>}
          </form>
        )}
      </div>
    </section>
  );
};

const MODAL_CONTENT: Record<string, { title: string; body: React.ReactNode }> = {
  shipping: {
    title: 'Shipping & Returns',
    body: (
      <div className="space-y-6 text-sm text-neutral-600 leading-relaxed">
        <div>
          <p className="font-semibold text-neutral-900 mb-2">Free Standard Delivery</p>
          <p>We offer free standard delivery on all orders, no minimum spend required. UK orders are delivered within 3–5 working days.</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">International Shipping</p>
          <p>We ship to over 30 countries, completely free of charge. International delivery takes 5–10 working days.</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">Returns</p>
          <p>We accept returns within 30 days of purchase if a product did not work as expected for you. We want every customer to love their Elara Beauty experience, and your satisfaction is our priority. To start a return, simply use the contact form and we'll take care of the rest.</p>
        </div>
      </div>
    ),
  },
  faq: {
    title: 'Frequently Asked Questions',
    body: (
      <div className="space-y-6 text-sm text-neutral-600 leading-relaxed">
        {[
          { q: 'Are your products suitable for sensitive skin?', a: 'Yes. All Elara Beauty products are dermatologically tested, fragrance-free, and formulated to be gentle on sensitive skin.' },
          { q: 'Are your products cruelty-free?', a: 'Absolutely. We are 100% cruelty-free and dermatologically tested. We never test on animals.' },
          { q: 'How long will my order take to arrive?', a: 'Standard UK delivery takes 3–5 working days. Express next-day delivery is available for orders placed before 2pm.' },
          { q: 'Can I use multiple products together?', a: 'Yes. Our products are designed to layer seamlessly. We recommend applying from lightest to heaviest texture — essence, serum, moisturiser.' },
          { q: 'What is your returns policy?', a: 'We accept returns within 30 days if a product did not work as expected for you. Simply reach out via our contact form and we\'ll take care of the rest.' },
          { q: 'Do you offer samples?', a: 'We include complimentary samples with every order so you can discover new products before committing.' },
        ].map(({ q, a }) => (
          <div key={q}>
            <p className="font-semibold text-neutral-900 mb-1">{q}</p>
            <p>{a}</p>
          </div>
        ))}
      </div>
    ),
  },
  privacy: {
    title: 'Privacy Policy',
    body: (
      <div className="space-y-6 text-sm text-neutral-600 leading-relaxed">
        <p>Last updated: January 2026</p>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">What We Collect</p>
          <p>We collect information you provide directly (name, email, address) when placing an order or signing up to our newsletter. We also collect usage data to improve your experience.</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">How We Use Your Data</p>
          <p>Your data is used to process orders, send order confirmations, and (with your consent) share product updates and exclusive offers. We never sell your data to third parties.</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">Your Rights</p>
          <p>You have the right to access, correct, or delete your personal data at any time. <button data-modal="contact" className="underline underline-offset-2 hover:opacity-60 transition-opacity">Contact us</button> to make a request.</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">Cookies</p>
          <p>We use essential cookies to keep the site functioning and optional analytics cookies to understand how visitors use our site. You can manage your cookie preferences at any time.</p>
        </div>
      </div>
    ),
  },
  terms: {
    title: 'Terms of Service',
    body: (
      <div className="space-y-6 text-sm text-neutral-600 leading-relaxed">
        <p>By using the Elara Beauty website, you agree to the following terms.</p>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">Orders & Payment</p>
          <p>All orders are subject to availability. We reserve the right to cancel orders in the event of pricing errors or stock issues. Payment is taken at the time of order. Should your order be cancelled for any reason, a full refund will be issued to your original payment method within 3–5 working days.</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">Product Use</p>
          <p>Elara Beauty products are intended for external cosmetic use only. Discontinue use if irritation occurs. Consult a dermatologist if you have a skin condition.</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">Intellectual Property</p>
          <p>All content on this site — including images, copy, and branding — is the property of Elara Beauty and may not be reproduced without written permission.</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">Governing Law</p>
          <p>These terms are governed by the laws of England and Wales.</p>
        </div>
      </div>
    ),
  },
  cookies: {
    title: 'Cookie Policy',
    body: (
      <div className="space-y-6 text-sm text-neutral-600 leading-relaxed">
        <div>
          <p className="font-semibold text-neutral-900 mb-2">Essential Cookies</p>
          <p>These cookies are required for the website to function. They enable core features like the shopping bag and secure checkout. They cannot be disabled.</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">Analytics Cookies</p>
          <p>We use anonymised analytics to understand how visitors navigate our site and improve the experience. No personally identifiable data is collected.</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">Marketing Cookies</p>
          <p>With your consent, we may use cookies to show you relevant Elara Beauty content on other platforms. You can opt out at any time.</p>
        </div>
        <div>
          <p className="font-semibold text-neutral-900 mb-2">Managing Cookies</p>
          <p>You can manage or withdraw your cookie consent at any time through your browser settings or by contacting us at privacy@elarabeauty.com.</p>
        </div>
      </div>
    ),
  },
};

const BUNDLES = [
  {
    id: 'glow',
    name: 'The Glow Ritual',
    tagline: 'Brighten, clarify & illuminate',
    productIds: ['4', '6', '15'],
    saving: 12,
  },
  {
    id: 'hydration',
    name: 'The Hydration Edit',
    tagline: 'Deep moisture from cleanse to finish',
    productIds: ['28', '1', '2'],
    saving: 10,
  },
  {
    id: 'age-defence',
    name: 'The Age Defence Set',
    tagline: 'Turn back the clock with every step',
    productIds: ['8', '16', '40'],
    saving: 18,
  },
  {
    id: 'sensitive',
    name: 'The Sensitive Skin Collection',
    tagline: 'Calm, strengthen & protect',
    productIds: ['26', '9', '12'],
    saving: 14,
  },
];

const SalePage = ({ onBack, onSelectProduct }: { onBack: () => void; onSelectProduct: (id: string) => void }) => {
  const saleProducts = PRODUCTS.filter(p => SALE_DISCOUNTS[p.id]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-12 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium mb-12 hover:opacity-50 transition-opacity">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-[#b8976a] mb-3">Limited Time</p>
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Sale</h1>
          <p className="text-neutral-500">Up to 30% off selected products. While stocks last.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {saleProducts.map((product, idx) => {
            const salePrice = getSalePrice(product)!;
            const discount = getDisplayDiscount(product);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="group cursor-pointer"
                onClick={() => onSelectProduct(product.id)}
              >
                <div className="aspect-square overflow-hidden rounded-3xl bg-beige-100 mb-6 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1.5 rounded-full">
                    -{discount}%
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm py-3 rounded-2xl text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-center">
                    View Product
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400">{product.category}</p>
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium text-neutral-900">£{salePrice.toFixed(2)}</span>
                    <span className="text-sm text-neutral-400 line-through">£{product.price.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const BundlesPage = ({ onBack, onSelectProduct }: { onBack: () => void; onSelectProduct: (id: string) => void }) => {
  const { add } = useCart();
  const [addedBundle, setAddedBundle] = useState<string | null>(null);

  const handleAddBundle = (bundle: typeof BUNDLES[0]) => {
    const products = bundle.productIds.map(id => PRODUCTS.find(p => p.id === id)!).filter(Boolean);
    const originalTotal = products.reduce((sum, p) => sum + p.price, 0);
    const bundlePrice = originalTotal - bundle.saving;
    const pricePerItem = bundlePrice / products.length;
    products.forEach(p => add(p, +pricePerItem.toFixed(2)));
    setAddedBundle(bundle.id);
    setTimeout(() => setAddedBundle(null), 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-12 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium mb-12 hover:opacity-50 transition-opacity">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-neutral-400 mb-3">Curated Sets</p>
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Bundles</h1>
          <p className="text-neutral-500">Complete routines at a special price — everything you need, nothing you don't.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {BUNDLES.map(bundle => {
            const products = bundle.productIds.map(id => PRODUCTS.find(p => p.id === id)!).filter(Boolean);
            const originalTotal = products.reduce((sum, p) => sum + p.price, 0);
            const bundlePrice = originalTotal - bundle.saving;
            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-neutral-100 rounded-[32px] p-8 hover:border-neutral-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-serif mb-1">{bundle.name}</h2>
                    <p className="text-sm text-neutral-500">{bundle.tagline}</p>
                  </div>
                  <span className="text-xs font-medium bg-[#f5ede0] text-[#b8976a] px-3 py-1.5 rounded-full whitespace-nowrap">Save £{bundle.saving}</span>
                </div>
                <div className="space-y-3 mb-8">
                  {products.map(product => (
                    <button
                      key={product.id}
                      onClick={() => onSelectProduct(product.id)}
                      className="w-full flex items-center gap-4 group"
                    >
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-neutral-50 shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium group-hover:opacity-60 transition-opacity">{product.name}</p>
                        <p className="text-xs text-neutral-400">{product.category}</p>
                      </div>
                      <p className="text-sm text-neutral-400 line-through">£{product.price.toFixed(2)}</p>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">Bundle Price</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-light">£{bundlePrice.toFixed(2)}</span>
                      <span className="text-sm text-neutral-400 line-through">£{originalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddBundle(bundle)}
                    className={`px-6 py-3 rounded-full text-xs uppercase tracking-widest font-medium transition-colors ${addedBundle === bundle.id ? 'bg-[#b8976a] text-white' : 'bg-neutral-900 text-white hover:bg-neutral-800'}`}
                  >
                    {addedBundle === bundle.id ? 'Added ✓' : 'Add Bundle'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const CookieBanner = ({ onAccept, onManage }: { onAccept: () => void; onManage: () => void }) => (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 100, opacity: 0 }}
    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[55] w-full max-w-2xl px-4"
  >
    <div className="bg-white border border-neutral-200 rounded-[24px] shadow-xl px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-4">
      <p className="text-sm text-neutral-600 flex-1 leading-relaxed">
        We use cookies to improve your experience and for analytics. By continuing, you agree to our{' '}
        <button onClick={onManage} className="underline underline-offset-2 hover:opacity-60 transition-opacity">Cookie Policy</button>.
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={onManage}
          className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium border border-neutral-200 hover:border-neutral-400 transition-colors"
        >
          Manage
        </button>
        <button
          onClick={onAccept}
          className="px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
        >
          Accept All
        </button>
      </div>
    </div>
  </motion.div>
);

const ContactModal = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState({ name: '', email: '', issue: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, issue: form.issue }),
      });
      if (res.ok) { setStatus('success'); }
      else { setStatus('error'); }
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="bg-white rounded-[32px] w-full max-w-lg p-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif">Contact Us</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto">
              <Star className="w-6 h-6 text-[#b8976a]" />
            </div>
            <p className="text-lg font-serif">Message received</p>
            <p className="text-sm text-neutral-500">We'll get back to you within 24–48 hours.</p>
            <button onClick={onClose} className="mt-4 text-xs uppercase tracking-widest font-medium hover:opacity-50 transition-opacity">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 block mb-2">Your Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Jane Smith"
                className="w-full border border-neutral-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 block mb-2">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="jane@example.com"
                className="w-full border border-neutral-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 block mb-2">How can we help?</label>
              <textarea
                required
                rows={4}
                value={form.issue}
                onChange={e => setForm(f => ({ ...f, issue: e.target.value }))}
                placeholder="Tell us about your order, product question, or anything else..."
                className="w-full border border-neutral-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-400 transition-colors resize-none"
              />
            </div>
            {status === 'error' && (
              <p className="text-xs text-red-500">Something went wrong. Please try again or email us directly.</p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-neutral-900 text-white py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

const InfoModal = ({ modalKey, onClose, onOpenModal }: { modalKey: string; onClose: () => void; onOpenModal: (key: string) => void }) => {
  const content = MODAL_CONTENT[modalKey];
  if (!content) return null;
  const handleBodyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const btn = (e.target as HTMLElement).closest('button[data-modal]');
    if (btn) { onClose(); setTimeout(() => onOpenModal(btn.getAttribute('data-modal')!), 50); }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="bg-white rounded-[32px] w-full max-w-lg max-h-[80vh] overflow-y-auto p-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif">{content.title}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div onClick={handleBodyClick}>{content.body}</div>
      </motion.div>
    </motion.div>
  );
};

const Footer = ({ onSelectConcern, onOpenModal, onNavigateBundles }: { onSelectConcern: (id: string) => void; onOpenModal: (key: string) => void; onNavigateBundles: () => void }) => (
  <footer className="bg-white pt-24 pb-12 border-t border-beige-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <h2 className="text-2xl font-serif tracking-tighter">ELARA BEAUTY</h2>
          <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
            Science-backed skincare for the modern minimalist. Cruelty-free and dermatologically tested.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Shop</h4>
          <ul className="space-y-4 text-sm text-neutral-500">
            <li><button onClick={() => onSelectConcern('sensitive')} className="hover:text-neutral-900 transition-colors">All Products</button></li>
            <li><button onClick={() => onSelectConcern('dullness')} className="hover:text-neutral-900 transition-colors">Best Sellers</button></li>
            <li><button onClick={() => onSelectConcern('aging')} className="hover:text-neutral-900 transition-colors">New Arrivals</button></li>
            <li><button onClick={() => onNavigateBundles()} className="hover:text-neutral-900 transition-colors">Bundles</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-neutral-500">
            <li><button onClick={() => onOpenModal('shipping')} className="hover:text-neutral-900 transition-colors">Shipping & Returns</button></li>
            <li><button onClick={() => onOpenModal('faq')} className="hover:text-neutral-900 transition-colors">FAQ</button></li>
            <li><button onClick={() => onOpenModal('contact')} className="hover:text-neutral-900 transition-colors">Contact Us</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-neutral-500">
            <li><button onClick={() => onOpenModal('privacy')} className="hover:text-neutral-900 transition-colors">Privacy Policy</button></li>
            <li><button onClick={() => onOpenModal('terms')} className="hover:text-neutral-900 transition-colors">Terms of Service</button></li>
            <li><button onClick={() => onOpenModal('cookies')} className="hover:text-neutral-900 transition-colors">Cookie Policy</button></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-beige-100 gap-6">
        <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
          © 2026 Elara Beauty. All Rights Reserved.
        </p>
        <div className="flex space-x-8 text-[10px] text-neutral-400 uppercase tracking-widest">
          <span>Cruelty Free</span>
          <span>Dermatologically Tested</span>
          <span>Sustainably Sourced</span>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main App ---

function AppInner() {
  const [activeConcernId, setActiveConcernId] = useState<string | null>(null);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showBundles, setShowBundles] = useState(false);
  const [showSale, setShowSale] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'cancelled' | null>(null);
  const [cookieConsent, setCookieConsent] = useState<boolean>(() => localStorage.getItem('cookie-consent') === 'true');

  const acceptCookies = () => { localStorage.setItem('cookie-consent', 'true'); setCookieConsent(true); };
  const { clear } = useCart();
  const activeConcern = CONCERNS.find(c => c.id === activeConcernId) ?? null;
  const activeProduct = PRODUCTS.find(p => p.id === activeProductId) ?? null;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('checkout');
    if (status === 'success') { clear(); setCheckoutStatus('success'); window.history.replaceState({}, '', '/'); }
    if (status === 'cancelled') { setCheckoutStatus('cancelled'); window.history.replaceState({}, '', '/'); }
  }, []);

  const clearPages = () => { setActiveConcernId(null); setActiveProductId(null); setShowBundles(false); setShowSale(false); setShowAllProducts(false); };
  const goHome = () => { clearPages(); window.scrollTo({ top: 0 }); };
  const handleSelectConcern = (id: string) => { clearPages(); setActiveConcernId(id); window.scrollTo({ top: 0 }); };
  const handleShowBundles = () => { clearPages(); setShowBundles(true); window.scrollTo({ top: 0 }); };
  const handleShowSale = () => { clearPages(); setShowSale(true); window.scrollTo({ top: 0 }); };
  const handleShowAllProducts = () => { clearPages(); setShowAllProducts(true); window.scrollTo({ top: 0 }); };

  return (
    <div className="min-h-screen selection:bg-beige-200">
      <AnimatePresence>
        {checkoutStatus === 'success' && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-neutral-900 text-white px-6 py-4 rounded-full text-sm flex items-center gap-3 shadow-xl">
            <span className="text-[#b8976a]">✓</span> Order confirmed — thank you for shopping with Elara Beauty
            <button onClick={() => setCheckoutStatus(null)}><X className="w-4 h-4 opacity-50 hover:opacity-100" /></button>
          </motion.div>
        )}
        {checkoutStatus === 'cancelled' && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-white border border-neutral-200 text-neutral-700 px-6 py-4 rounded-full text-sm flex items-center gap-3 shadow-xl">
            Checkout cancelled — your bag is still saved
            <button onClick={() => setCheckoutStatus(null)}><X className="w-4 h-4 opacity-50 hover:opacity-100" /></button>
          </motion.div>
        )}
      </AnimatePresence>
      {bannerVisible && <SaleBanner onViewSale={handleShowSale} onHide={() => setBannerVisible(false)} />}
      <Navbar onHome={goHome} onSelectConcern={handleSelectConcern} onShowSale={handleShowSale} />
      {activeProduct ? (
        <ProductPage product={activeProduct} onBack={() => setActiveProductId(null)} />
      ) : showAllProducts ? (
        <AllProductsPage onBack={goHome} onSelectProduct={(id) => { setShowAllProducts(false); setActiveProductId(id); }} />
      ) : showSale ? (
        <SalePage onBack={goHome} onSelectProduct={(id) => { setShowSale(false); setActiveProductId(id); }} />
      ) : showBundles ? (
        <BundlesPage onBack={goHome} onSelectProduct={(id) => { setShowBundles(false); setActiveProductId(id); }} />
      ) : activeConcern ? (
        <ConcernProductsPage concern={activeConcern} onBack={() => setActiveConcernId(null)} onSelectProduct={setActiveProductId} />
      ) : (
        <main>
          <Hero onShopNow={handleShowAllProducts} />
          <SkinConcerns onSelectConcern={setActiveConcernId} />
          <Routine />
          <Reviews />
          <Newsletter />
        </main>
      )}
      <Footer onSelectConcern={handleSelectConcern} onOpenModal={setActiveModal} onNavigateBundles={handleShowBundles} />
      {activeModal === 'contact' && <ContactModal onClose={() => setActiveModal(null)} />}
      {activeModal && activeModal !== 'contact' && <InfoModal modalKey={activeModal} onClose={() => setActiveModal(null)} onOpenModal={setActiveModal} />}
      <AnimatePresence>
        {!cookieConsent && (
          <CookieBanner
            onAccept={acceptCookies}
            onManage={() => { acceptCookies(); setActiveModal('cookies'); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return <CartProvider><AppInner /></CartProvider>;
}
