import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';
import { Link, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const menuData = {
  signatures: [
    { id: 's-1', name: 'Velvet Flat White', desc: 'Silky microfoam poured over a double ristretto shot of our single-origin house blend.', price: '$4.80', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop' },
    { id: 's-2', name: 'Cardamom Cold Brew', desc: 'Slow-steeped for 24 hours and infused with crushed cardamom pods and orange peel.', price: '$5.50', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop' },
    { id: 's-3', name: 'Matcha Cortado', desc: 'Ceremonial grade Uji matcha layered with lightly textured oat milk.', price: '$5.20', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop' },
    { id: 's-4', name: 'Lavender Honey Latte', desc: 'Espresso infused with house-made lavender honey syrup and steamed milk.', price: '$5.80', img: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=800&auto=format&fit=crop' },
    { id: 's-5', name: 'Rose & Pistachio Mocha', desc: 'Dark chocolate, rose water, espresso, topped with crushed pistachios.', price: '$6.20', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop' }
  ],
  filter: [
    { id: 'f-1', name: 'Ethiopia Yirgacheffe', desc: 'V60 Pour Over. Tasting notes of jasmine, bergamot, and peach.', price: '$6.00', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop' },
    { id: 'f-2', name: 'Colombia Geisha', desc: 'Chemex. Rare lot featuring intense floral aromas and a sparkling acidity.', price: '$8.50', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop' },
    { id: 'f-3', name: 'Guatemala Antigua', desc: 'Aeropress. Full body, notes of dark cocoa and sweet orange.', price: '$5.50', img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800&auto=format&fit=crop' },
    { id: 'f-4', name: 'Kenya AA', desc: 'Kalita Wave. Bright acidity with notes of blackcurrant and grapefruit.', price: '$7.00', img: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=800&auto=format&fit=crop' }
  ],
  pastries: [
    { id: 'p-1', name: 'Pistachio Croissant', desc: 'Twice-baked butter croissant filled with a rich pistachio frangipane.', price: '$5.50', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop' },
    { id: 'p-2', name: 'Rhubarb Tart', desc: 'Shortcrust pastry with seasonal rhubarb compote and vanilla mascarpone.', price: '$6.50', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop' },
    { id: 'p-3', name: 'Cardamom Bun', desc: 'A Scandinavian classic. Buttery dough twisted with freshly ground cardamom.', price: '$4.80', img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop' },
    { id: 'p-4', name: 'Lemon Thyme Loaf', desc: 'A moist lemon pound cake glazed with subtle thyme syrup.', price: '$4.50', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop' },
    { id: 'p-5', name: 'Almond Financier', desc: 'Traditional French almond cake, crispy on the outside and soft inside.', price: '$3.50', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop' }
  ]
};

const Menu = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState(
    initialCategory && ['signatures', 'filter', 'pastries'].includes(initialCategory) ? initialCategory : 'signatures'
  );
  const { addToCart } = useCart();
  const containerRef = useRef(null);

  useEffect(() => {
    const cat = new URLSearchParams(location.search).get('category');
    if (cat && ['signatures', 'filter', 'pastries'].includes(cat)) {
      setActiveCategory(cat);
    }
  }, [location.search]);

  const categories = [
    { id: 'signatures', label: 'Signatures' },
    { id: 'filter', label: 'Filter Bar' },
    { id: 'pastries', label: 'Pastries' },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animations - Smooth, Unhurried, Luxury timing
      gsap.from('.luxury-fade-up', {
        y: 60,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from('.luxury-line', {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.8
      });
      
      gsap.from('.hero-img-wrap', {
        scale: 1.05,
        opacity: 0,
        duration: 1.8,
        ease: 'power2.out',
        delay: 0.4
      });

      // Categories fade in
      gsap.from('.category-btn', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 1
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-forest)] overflow-hidden font-body">
      
      {/* LUXURY EDITORIAL HERO */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 z-10 flex flex-col justify-center">
            <div className="overflow-hidden mb-6">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-sage)] block luxury-fade-up">Curated Offerings</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-[7rem] font-heading font-medium text-[var(--color-forest)] leading-[0.9] mb-8 tracking-tight overflow-hidden">
              <span className="block luxury-fade-up">The Menu</span>
            </h1>
            
            <div className="w-24 h-[1px] bg-[var(--color-olive)] luxury-line mb-8"></div>
            
            <p className="text-lg text-[var(--color-forest)]/70 max-w-md luxury-fade-up leading-relaxed font-light">
              An exploration of taste. We source the world's most interesting coffees and pair them with meticulously crafted pastries, presented with minimal interference.
            </p>
          </div>

          <div className="lg:col-span-6 w-full hero-img-wrap relative">
            <div className="aspect-[4/5] md:aspect-[3/4] rounded-[2rem] overflow-hidden relative shadow-luxury">
              <div className="absolute inset-0 bg-[var(--color-forest)]/10 z-10 mix-blend-overlay"></div>
              <img 
                src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1200&auto=format&fit=crop" 
                alt="Editorial Coffee Pour" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative accent element */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[var(--color-linen)] rounded-full blur-3xl -z-10 opacity-70"></div>
          </div>
          
        </div>
      </section>

      {/* CATEGORY FILTER - EDITORIAL STYLE */}
      <section className="py-8 px-6 lg:px-12 sticky top-[80px] z-40 bg-[var(--color-ivory)]/90 backdrop-blur-xl border-b border-[var(--color-olive)]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-start md:justify-center gap-6 md:gap-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`category-btn relative py-2 text-sm font-medium tracking-widest uppercase transition-colors duration-500 ${
                activeCategory === category.id 
                ? 'text-[var(--color-forest)]'
                : 'text-[var(--color-sage)] hover:text-[var(--color-forest)]'
              }`}
            >
              {category.label}
              {activeCategory === category.id && (
                <motion.div 
                  layoutId="activeCategoryIndicator"
                  className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[var(--color-terracotta)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* LUXURY MENU GRID */}
      <section className="py-24 px-6 lg:px-12 min-h-[60vh] bg-[var(--color-ivory)]">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.7, staggerChildren: 0.15, ease: 'power3.out' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20"
            >
              {menuData[activeCategory].map((item) => (
                <motion.div 
                  key={item.id} 
                  className="group flex flex-col md:flex-row gap-8 items-start"
                >
                  <div className="w-full md:w-[200px] aspect-[4/5] shrink-0 overflow-hidden rounded-tr-[3rem] rounded-bl-[3rem] relative shadow-luxury">
                    <div className="absolute inset-0 bg-[var(--color-forest)]/5 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out" 
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col h-full justify-center pt-2 md:pt-4">
                    <div className="mb-6">
                      <div className="flex justify-between items-baseline gap-4 mb-3 border-b border-[var(--color-olive)]/30 pb-3">
                        <h3 className="text-2xl lg:text-3xl font-heading font-medium text-[var(--color-forest)] group-hover:text-[var(--color-terracotta)] transition-colors duration-500">{item.name}</h3>
                        <span className="text-xl font-heading font-medium text-[var(--color-sage)]">{item.price}</span>
                      </div>
                      <p className="text-[var(--color-forest)]/70 text-sm leading-relaxed font-light">{item.desc}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-[var(--color-forest)] text-[var(--color-ivory)] px-6 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[var(--color-sage)] transition-colors duration-300 w-full sm:w-auto text-center"
                      >
                        Add to Order
                      </button>
                      <Link 
                        to={`/product/${item.id}`}
                        className="border border-[var(--color-forest)] text-[var(--color-forest)] px-6 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[var(--color-forest)] hover:text-[var(--color-ivory)] transition-colors duration-300 w-full sm:w-auto text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* LUXURY CTA */}
      <section className="py-32 px-6 lg:px-12 text-center bg-[var(--color-linen)] relative overflow-hidden">
        {/* Soft decorative blur */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-terracotta)]/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl lg:text-7xl font-heading font-medium text-[var(--color-forest)] mb-8 leading-tight">Elevate your daily ritual.</h2>
          <p className="text-lg text-[var(--color-forest)]/70 mb-12 font-light max-w-xl mx-auto">
            Experience our curated menu in person at our Soho location, or prepare your order ahead for a seamless pickup.
          </p>
          <Link to="/cart" className="inline-flex items-center justify-center bg-[var(--color-forest)] text-[var(--color-ivory)] px-12 py-5 rounded-none text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--color-sage)] transition-colors duration-500">
            View Your Cart
          </Link>
        </div>
      </section>
      
    </div>
  );
};

export default Menu;
