import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import { getProducts, formatPrice } from '../../backend/services';

gsap.registerPlugin(ScrollTrigger);

const menuData = {
  signatureCoffee: [
    { id: 'sc-1', name: 'Velvet Flat White', desc: 'Silky microfoam poured over a double ristretto shot of our single-origin house blend.', price: '$4.80', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop', badge: 'Award Winning' },
    { id: 'sc-2', name: 'Lavender Honey Latte', desc: 'Espresso infused with house-made lavender honey syrup and steamed milk.', price: '$5.80', img: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=800&auto=format&fit=crop' },
    { id: 'sc-3', name: 'Ethiopia Yirgacheffe Pour Over', desc: 'V60 Pour Over. Tasting notes of jasmine, bergamot, and peach.', price: '$6.00', img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop', badge: 'Single Origin' },
  ],
  coldBrew: [
    { id: 'cb-1', name: 'Cardamom Cold Brew', desc: 'Slow-steeped for 24 hours and infused with crushed cardamom pods and orange peel.', price: '$5.50', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop', badge: 'Signature' },
    { id: 'cb-2', name: 'Iced Rose Pistachio Mocha', desc: 'White chocolate, pistachio cream, espresso, and cold milk over ice with rose petals.', price: '$6.20', img: 'https://images.unsplash.com/photo-1461023058943-0708e52150cd?q=80&w=800&auto=format&fit=crop' },
  ],
  desserts: [
    { id: 'ds-1', name: 'Vanilla Bean Panna Cotta', desc: 'Silky smooth vanilla bean panna cotta with fresh mixed berry compote.', price: '$7.50', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop' },
    { id: 'ds-2', name: 'Lemon Meringue Tart', desc: 'Zesty lemon curd topped with perfectly toasted marshmallow meringue.', price: '$6.50', img: 'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=800&auto=format&fit=crop', badge: 'Bestseller' },
  ],
  bakery: [
    { id: 'bk-1', name: 'Almond Croissant', desc: 'Twice-baked butter croissant filled and topped with sweet almond frangipane.', price: '$5.50', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop', badge: 'Fresh Daily' },
    { id: 'bk-2', name: 'Cardamom Knot', desc: 'A soft, buttery dough twisted with aromatic, freshly ground cardamom.', price: '$4.80', img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop' },
  ],
  specialDrinks: [
    { id: 'sd-1', name: 'Matcha Blossom', desc: 'Ceremonial grade matcha layered over strawberry milk and topped with rose petals.', price: '$7.50', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop', badge: 'Limited' },
    { id: 'sd-2', name: 'Smoked Vanilla Latte', desc: 'Espresso, smoked vanilla bean syrup, and perfectly steamed milk.', price: '$7.00', img: 'https://images.unsplash.com/photo-1585409677983-0f6c41506170?q=80&w=800&auto=format&fit=crop' }
  ]
};

const categories = [
  { id: 'signatureCoffee', label: 'Signature Coffee' },
  { id: 'coldBrew', label: 'Cold Brew' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'bakery', label: 'Bakery' },
  { id: 'specialDrinks', label: 'Special Drinks' }
];

const categoryLabels = {
  signatureCoffee: 'Signature Coffee',
  coldBrew: 'Cold Brew',
  desserts: 'Desserts',
  bakery: 'Bakery',
  specialDrinks: 'Special Drinks'
};

const formatCategoryLabel = (catId) => {
  if (categoryLabels[catId]) return categoryLabels[catId];
  return catId
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

const Menu = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState(
    initialCategory && categories.map(c => c.id).includes(initialCategory) ? initialCategory : 'signatureCoffee'
  );
  
  const { addToCart } = useCart();
  const containerRef = useRef(null);
  
  const [displayMenuData, setDisplayMenuData] = useState(menuData);
  const [categoriesList, setCategoriesList] = useState(categories);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const response = await getProducts();
        if (response.success && response.data && response.data.length > 0) {
          const grouped = {
            signatureCoffee: [],
            coldBrew: [],
            desserts: [],
            bakery: [],
            specialDrinks: []
          };
          
          response.data.forEach(item => {
            const mapped = {
              id: item.id,
              name: item.name,
              desc: item.description,
              price: formatPrice(item.price),
              img: item.image_url,
              badge: item.badge || undefined,
              category: item.category,
              available: item.available
            };
            
            if (grouped[item.category]) {
              grouped[item.category].push(mapped);
            } else {
              grouped[item.category] = [mapped];
            }
          });
          
          setDisplayMenuData(grouped);
          
          const activeCategories = Object.keys(grouped).filter(key => grouped[key].length > 0);
          if (activeCategories.length > 0) {
            const dynamicCategories = activeCategories.map(key => ({
              id: key,
              label: formatCategoryLabel(key)
            }));
            setCategoriesList(dynamicCategories);
            
            // Check if current active category exists in the new list, if not, set to the first one
            const currentCatIsValid = dynamicCategories.some(c => c.id === activeCategory);
            if (!currentCatIsValid) {
              setActiveCategory(dynamicCategories[0].id);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching menu items from Supabase, using mock fallback:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMenu();
  }, []);

  useEffect(() => {
    const cat = new URLSearchParams(location.search).get('category');
    if (cat && categoriesList.map(c => c.id).includes(cat)) {
      setActiveCategory(cat);
    }
  }, [location.search, categoriesList]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // HERO ANIMATIONS
      gsap.from('.hero-badge', {
        y: -20, opacity: 0, duration: 1.5, ease: 'power2.out', delay: 0.2
      });

      gsap.from('.hero-title-word', {
        y: 40, opacity: 0, duration: 1.5, stagger: 0.1, ease: 'power3.out', delay: 0.5
      });

      gsap.from('.hero-subtitle', {
        y: 20, opacity: 0, duration: 1.5, ease: 'power2.out', delay: 1
      });

      gsap.to('.hero-bg-zoom', {
        scale: 1.05, duration: 30, ease: 'none', repeat: -1, yoyo: true
      });
      
      gsap.to('.scroll-indicator', {
        y: 10, duration: 2, repeat: -1, yoyo: true, ease: 'power1.inOut'
      });

      // SIGNATURE BREW PARALLAX & REVEAL
      gsap.from('.sig-brew-img', {
        scrollTrigger: {
          trigger: '.sig-brew-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        },
        y: -60,
        scale: 1.05
      });

      gsap.utils.toArray('.reveal-up').forEach(el => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          y: 40, opacity: 0, duration: 1.2, ease: 'power2.out'
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-soft-ivory)] min-h-screen text-[var(--color-gray-blue)] font-body overflow-x-hidden selection:bg-[var(--color-muted-teal)] selection:text-white">
      
      {/* GLOBAL AMBIENT BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-[5%] left-[10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-[var(--color-powder-blue)]/60 rounded-full blur-[140px] mix-blend-multiply"
          animate={{ x: [0, 40, -20, 0], y: [0, 20, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-[40%] right-[0%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[var(--color-sage-mist)]/50 rounded-full blur-[120px] mix-blend-multiply"
          animate={{ x: [0, -40, 20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[550px] md:min-h-[650px] h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Cinematic Gradient Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="hero-bg-zoom absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity grayscale-[10%]"></div>
          
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[var(--color-soft-ivory)]/30 via-[var(--color-powder-blue)]/10 to-[var(--color-soft-ivory)]"></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--color-soft-ivory)] via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-30 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-12">
          <div className="hero-badge mb-6 px-6 py-2 rounded-full border border-[var(--color-muted-teal)]/30 bg-[var(--color-silver-fog)]/30 backdrop-blur-xl shadow-[0_15px_30px_rgba(95,124,123,0.08)] inline-block">
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[var(--color-muted-teal)]">Exclusive Collection</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-heading font-medium tracking-tight leading-[1.05] mb-4 overflow-hidden flex flex-wrap justify-center gap-x-4 lg:gap-x-6 text-[var(--color-rich-graphite)]">
            <span className="hero-title-word inline-block">Modern</span>
            <span className="hero-title-word inline-block text-[var(--color-muted-teal)] italic font-light">Elegance.</span>
          </h1>
          
          <p className="hero-subtitle text-lg md:text-xl text-[var(--color-gray-blue)] max-w-2xl font-light tracking-wide leading-relaxed">
            Experience our meticulously crafted menu. A symphony of delicate flavors presented with cinematic elegance and unparalleled refinement.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 scroll-indicator">
          <span className="text-[var(--color-deep-slate)]/60 text-[9px] tracking-[0.3em] uppercase font-bold">Explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-[var(--color-deep-slate)]/40 to-transparent"></div>
        </div>
      </section>


      {/* ================= SIGNATURE EXPERIENCE ================= */}
      <section className="sig-brew-section py-16 lg:py-20 px-6 lg:px-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Cinematic Floating Image */}
            <div className="lg:col-span-7 relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-powder-blue)]/80 to-[var(--color-sage-mist)]/60 rounded-[3rem] transform -translate-x-6 translate-y-6 -z-10 blur-xl opacity-90"></div>
              
              <div className="aspect-[4/5] md:aspect-[16/11] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(47,52,59,0.15)] relative border border-[var(--color-silver-fog)] bg-[var(--color-soft-ivory)]/40 backdrop-blur-md p-3">
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-[var(--color-deep-slate)]/10 z-10 mix-blend-overlay"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1600&auto=format&fit=crop" 
                    alt="Signature Cold Brew" 
                    className="sig-brew-img w-full h-[130%] object-cover object-center"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  
                  {/* Floating Glass Detail Box */}
                  <div className="absolute bottom-10 right-10 p-7 bg-[var(--color-rich-graphite)]/80 backdrop-blur-2xl border border-[var(--color-soft-slate)]/40 rounded-[2rem] shadow-[0_20px_40px_rgba(47,52,59,0.2)] max-w-[280px] z-20">
                    <span className="text-[var(--color-warm-sand)] text-[10px] font-bold uppercase tracking-widest mb-1.5 block">Process</span>
                    <p className="text-white font-heading text-xl leading-snug">24-Hour Kyoto Drip</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Content */}
            <div className="lg:col-span-5 order-1 lg:order-2 reveal-up">
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 text-[var(--color-muted-teal)] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                  <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span> Signature Experience
                </span>
                <h2 className="text-5xl md:text-6xl font-heading mb-3 leading-[1.1] text-[var(--color-rich-graphite)]">The Kyoto <br/><span className="italic font-light text-[var(--color-muted-teal)]">Reserve.</span></h2>
              </div>
              
              <p className="text-[var(--color-gray-blue)] text-lg leading-relaxed font-light mb-5">
                A transcendent cold brew experience. Slow-dripped over 24 hours using our custom Kyoto-style towers, this method extracts an incredibly smooth, liqueur-like body with profound notes of dark chocolate and black cherry.
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <button 
                  onClick={() => addToCart({ id: 'sig-exp-1', name: 'Kyoto Reserve', price: '$9.50', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1600&auto=format&fit=crop' })}
                  className="w-full sm:w-auto px-10 py-5 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white font-bold uppercase tracking-[0.15em] text-[11px] rounded-full hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.3)] group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">ORDER NOW</span>
                </button>
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-[var(--color-deep-slate)] text-3xl font-heading font-medium">$9.50</span>
                  <span className="text-[var(--color-sand-accent)] text-[9px] uppercase tracking-widest font-bold">Limited Supply</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= CATEGORY FILTER ================= */}
      <section className="pt-12 pb-6 px-6 lg:px-12 relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 reveal-up">
            <h2 className="text-4xl md:text-5xl font-heading mb-2 text-[var(--color-rich-graphite)]">Our Selection</h2>
            <div className="w-12 h-[1px] bg-[var(--color-silver-fog)] mx-auto"></div>
          </div>

          {/* Floating Category Tabs (Redesigned) */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 reveal-up">
            {categoriesList.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-5 md:px-8 py-2.5 md:py-3.5 text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase rounded-full transition-all duration-500 overflow-hidden backdrop-blur-xl border ${
                  activeCategory === category.id 
                  ? 'text-white border-transparent shadow-[0_10px_20px_rgba(95,124,123,0.3)]'
                  : 'text-[var(--color-deep-slate)] bg-[var(--color-silver-fog)]/30 hover:bg-[var(--color-silver-fog)]/60 border-[var(--color-silver-fog)]/50'
                }`}
              >
                {activeCategory === category.id && (
                  <motion.div 
                    layoutId="activeCategoryBgTeal"
                    className="absolute inset-0 bg-gradient-to-r from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] -z-10 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ULTRA PREMIUM MENU CARDS ================= */}
      <section className="pb-16 px-6 lg:px-12 relative z-30">
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, staggerChildren: 0.1, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8"
            >
              {(displayMenuData[activeCategory] || []).map((item) => (
                <motion.div 
                  key={item.id} 
                  className="group relative flex flex-col bg-[var(--color-soft-ivory)]/80 backdrop-blur-2xl border border-[var(--color-silver-fog)]/60 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_rgba(57,70,82,0.08)] hover:shadow-[0_30px_60px_rgba(57,70,82,0.15)] transition-all duration-500 hover:-translate-y-2 hover:bg-white"
                >
                  {/* RICH BACKGROUND AROUND PRODUCT IMAGE (Enhanced UI) */}
                  <div className="w-full aspect-[4/3] relative m-2 mb-0 rounded-[1.75rem] md:rounded-[2rem] overflow-hidden p-2">
                    {/* Soft Blended Background Panels */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-powder-blue)]/90 via-[var(--color-soft-ivory)] to-[var(--color-sage-mist)]/80 opacity-90 group-hover:opacity-100 transition-opacity duration-700 z-0 rounded-[1.75rem] md:rounded-[2rem]"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-70 z-0 mix-blend-multiply">
                      <div className="w-3/4 h-3/4 bg-white/90 rounded-full blur-[40px]"></div>
                    </div>

                    <div className="relative w-full h-full rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden shadow-[0_10px_20px_rgba(57,70,82,0.12)] z-10 bg-white">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-warm-sand)]/20 to-transparent mix-blend-multiply group-hover:opacity-0 transition-opacity duration-700 z-10"></div>
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop';
                        }}
                      />
                      {item.badge && (
                        <div className="absolute top-4 right-4 z-20 px-4 py-2 bg-[var(--color-rich-graphite)]/90 backdrop-blur-md rounded-full shadow-[0_5px_15px_rgba(47,52,59,0.2)] border border-[var(--color-soft-slate)]/30">
                          <span className="text-[var(--color-warm-sand)] text-[9px] font-bold uppercase tracking-widest">{item.badge}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Glassmorphism Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between relative z-20">
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="text-2xl font-heading font-medium leading-tight text-[var(--color-rich-graphite)] group-hover:text-[var(--color-muted-teal)] transition-colors duration-500">{item.name}</h3>
                        <span className="text-xl font-heading text-[var(--color-deep-slate)]/80">{item.price}</span>
                      </div>
                      <p className="text-[var(--color-gray-blue)] text-sm leading-relaxed font-light mb-4">{item.desc}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-[var(--color-silver-fog)] flex justify-center">
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-full py-4 rounded-full bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] border-none flex items-center justify-center text-white hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_10px_20px_rgba(95,124,123,0.2)] hover:shadow-[0_15px_30px_rgba(95,124,123,0.3),0_0_15px_rgba(194,163,131,0.3)] hover:-translate-y-1 group/btn relative overflow-hidden text-[10px] font-bold uppercase tracking-[0.2em]"
                        aria-label="Add to cart"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full transition-all duration-1000 ease-out"></div>
                        <span className="relative z-10">ADD TO CART</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ================= CINEMATIC FOOTER CTA ================= */}
      <section className="py-20 lg:py-24 px-6 lg:px-12 text-center relative overflow-hidden bg-[var(--color-silver-fog)]/30 backdrop-blur-xl border-t border-[var(--color-silver-fog)]/50">
        <div className="max-w-4xl mx-auto relative z-10 reveal-up">
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[var(--color-muted-teal)] mb-3 block">Your Ritual Awaits</span>
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-heading mb-4 leading-[1.05] tracking-tight text-[var(--color-rich-graphite)]">Indulge in <br/><span className="italic font-light text-[var(--color-muted-teal)]">Excellence.</span></h2>
          <p className="text-lg text-[var(--color-gray-blue)] mb-8 font-light max-w-xl mx-auto">
            Place your order online for a seamless pickup experience, or reserve a table to fully immerse yourself in our serene atmosphere.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* REDESIGNED CTAS */}
            <Link to="/cart" className="w-full sm:w-auto px-12 py-5 bg-[var(--color-soft-ivory)]/80 backdrop-blur-md border border-[#394652]/20 text-[#394652] rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:border-[var(--color-muted-teal)]/60 hover:text-[var(--color-muted-teal)] transition-all duration-500 hover:-translate-y-1 shadow-[0_10px_20px_rgba(57,70,82,0.05)] hover:shadow-[0_15px_30px_rgba(57,70,82,0.1)]">
              VIEW CART
            </Link>
            <Link to="/contact" className="w-full sm:w-auto px-12 py-5 bg-gradient-to-br from-[#5F7C7B]/90 to-[#4F6867]/90 backdrop-blur-xl text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] border border-white/10 hover:from-[#4F6867]/90 hover:to-[#5F7C7B]/90 transition-all duration-500 shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,124,123,0.5),0_0_20px_rgba(194,163,131,0.5)] relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C2A383]/40 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
               <span className="relative z-10 text-white group-hover:text-[#C2A383] transition-colors duration-300">INQUIRY NOW</span>
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Menu;
