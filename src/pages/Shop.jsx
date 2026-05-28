import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const shopItems = [
  { id: 'b-1', name: 'Ethiopia Yirgacheffe', type: 'Single Origin', price: '$22.00', img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800&auto=format&fit=crop' },
  { id: 'b-2', name: 'Colombia Supremo', type: 'Single Origin', price: '$19.00', img: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=800&auto=format&fit=crop' },
  { id: 'b-3', name: 'Bayleaf House Blend', type: 'Signature Blend', price: '$18.00', img: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=800&auto=format&fit=crop' },
  { id: 'b-4', name: 'Guatemala Antigua', type: 'Single Origin', price: '$21.00', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop' },
  { id: 'm-1', name: 'Ceramic Tasting Cup', type: 'Merchandise', price: '$28.00', img: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=800&auto=format&fit=crop' },
  { id: 'm-2', name: 'Linen Tote Bag', type: 'Merchandise', price: '$24.00', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop' },
];

const Shop = () => {
  const containerRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero
      gsap.from('.shop-hero-text', {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.2
      });

      // Products Stagger
      gsap.from('.product-card', {
        y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.shop-grid',
          start: 'top 85%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-soft-ivory)] min-h-screen text-[var(--color-gray-blue)] font-body overflow-x-hidden selection:bg-[var(--color-muted-teal)] selection:text-white">
      
      {/* GLOBAL AMBIENT BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-[20%] left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[var(--color-powder-blue)]/50 rounded-full blur-[140px] mix-blend-multiply"
          animate={{ x: [0, 40, -30, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[var(--color-sage-mist)]/40 rounded-full blur-[120px] mix-blend-multiply"
          animate={{ x: [0, -40, 20, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* SHOP HERO */}
      <section className="pt-32 pb-14 px-6 lg:px-12 text-center relative border-b border-[var(--color-silver-fog)]/40 bg-[var(--color-silver-fog)]/10 backdrop-blur-3xl">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="overflow-hidden mb-4">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--color-muted-teal)] block shop-hero-text">Retail Collection</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-medium text-[var(--color-rich-graphite)] leading-[0.9] mb-4 tracking-tight shop-hero-text">
            The <span className="italic font-light text-[var(--color-deep-slate)]">Shop.</span>
          </h1>
          <p className="text-lg text-[var(--color-gray-blue)] font-light shop-hero-text max-w-xl mx-auto leading-relaxed">
            Take the Bayleaf experience home. Carefully sourced premium beans and minimalist brewing equipment.
          </p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-16 px-6 lg:px-12 shop-grid relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
          {shopItems.map((item) => (
            <div key={item.id} className="product-card group flex flex-col">
              <Link to={`/product/${item.id}`} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[var(--color-soft-ivory)]/80 backdrop-blur-xl mb-4 shadow-[0_20px_40px_rgba(56,68,80,0.08)] group-hover:shadow-[0_40px_80px_rgba(56,68,80,0.15)] transition-all duration-700 border border-[var(--color-silver-fog)]/60 p-2 md:p-3">
                
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-powder-blue)]/60 to-[var(--color-sage-mist)]/40 rounded-[2rem] md:rounded-[3rem] transform translate-x-3 translate-y-3 -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
 
                <div className="relative w-full h-full rounded-[1.75rem] md:rounded-[2.5rem] overflow-hidden shadow-inner bg-white">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-slate)]/25 to-transparent opacity-40 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay"></div>
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                  />
                  
                  {/* Touch-Friendly Quick Add Overlay (Always visible on mobile, animated on desktop) */}
                  <div className="absolute bottom-4 left-0 right-0 lg:bottom-0 lg:p-6 translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 z-20 flex justify-center">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(item);
                      }}
                      className="flex items-center justify-center gap-3 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white px-8 py-3.5 md:py-4 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.4)] transition-all duration-300 w-[85%] lg:w-[90%]"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </Link>
              
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="text-2xl font-heading font-medium text-[var(--color-rich-graphite)] mb-2 group-hover:text-[var(--color-muted-teal)] transition-colors duration-300">
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </h3>
                  <span className="text-[var(--color-deep-slate)]/60 text-[10px] font-bold uppercase tracking-[0.2em]">{item.type}</span>
                </div>
                <span className="text-xl font-heading font-medium text-[var(--color-muted-teal)]">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUBSCRIPTION CTA */}
      <section className="py-16 px-6 lg:px-12 relative z-20 my-12 mx-4 lg:mx-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-powder-blue)]/30 to-[var(--color-sage-mist)]/20 backdrop-blur-3xl rounded-[4rem] border border-[var(--color-silver-fog)]/50 shadow-[0_20px_40px_rgba(56,68,80,0.05)] -z-10"></div>
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--color-muted-teal)] block mb-4">Never Run Out</span>
          <h2 className="text-5xl lg:text-7xl font-heading font-medium text-[var(--color-rich-graphite)] mb-6 leading-tight">Coffee <span className="italic font-light text-[var(--color-deep-slate)]">Subscription.</span></h2>
          <p className="text-lg text-[var(--color-gray-blue)] font-light mb-8 leading-relaxed max-w-xl mx-auto">
            Freshly roasted beans delivered to your door on your schedule. Cancel or pause anytime.
          </p>
          <button className="flex items-center justify-center mx-auto gap-4 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white px-12 py-5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.4)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <span className="relative z-10">SUBSCRIBE NOW</span>
          </button>
        </div>
      </section>

    </div>
  );
};

export default Shop;
