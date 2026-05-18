import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

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
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });

      // Products Stagger
      gsap.from('.product-card', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.shop-grid',
          start: 'top 85%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-forest)] font-body overflow-hidden">
      
      {/* SHOP HERO */}
      <section className="pt-40 pb-20 px-6 lg:px-12 text-center relative border-b border-[var(--color-olive)]/20 bg-gradient-to-b from-[var(--color-linen)] to-[var(--color-ivory)]">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="overflow-hidden mb-6">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-sage)] block shop-hero-text">Retail Collection</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-heading font-medium text-[var(--color-forest)] leading-[0.9] mb-8 tracking-tight shop-hero-text">
            The Shop
          </h1>
          <p className="text-lg text-[var(--color-forest)]/70 font-light shop-hero-text max-w-xl mx-auto">
            Take the Bayleaf experience home. Carefully sourced beans and minimalist brewing equipment.
          </p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="py-24 px-6 lg:px-12 shop-grid">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {shopItems.map((item) => (
            <div key={item.id} className="product-card group flex flex-col">
              <Link to={`/product/${item.id}`} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[var(--color-linen)] mb-6 shadow-sm group-hover:shadow-luxury transition-shadow duration-500">
                <div className="absolute inset-0 bg-[var(--color-forest)]/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out mix-blend-multiply opacity-90"
                />
                
                {/* Quick Add Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 flex justify-center">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(item);
                    }}
                    className="flex items-center gap-2 bg-[var(--color-ivory)] text-[var(--color-forest)] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.1em] shadow-lg hover:bg-[var(--color-sage)] hover:text-[var(--color-ivory)] transition-colors"
                  >
                    <FiShoppingCart /> Add to Cart
                  </button>
                </div>
              </Link>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-heading font-medium text-[var(--color-forest)] mb-1 group-hover:text-[var(--color-terracotta)] transition-colors">
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </h3>
                  <span className="text-[var(--color-forest)]/60 text-sm font-light uppercase tracking-wider">{item.type}</span>
                </div>
                <span className="text-lg font-heading font-medium text-[var(--color-sage)]">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUBSCRIPTION CTA */}
      <section className="py-24 px-6 lg:px-12 bg-[var(--color-forest)] text-[var(--color-ivory)] text-center my-12 mx-4 lg:mx-8 rounded-[3rem]">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-sage)] block mb-6">Never Run Out</span>
          <h2 className="text-4xl lg:text-5xl font-heading font-medium mb-8">Coffee Subscription</h2>
          <p className="text-lg text-[var(--color-ivory)]/70 font-light mb-10 leading-relaxed">
            Freshly roasted beans delivered to your door on your schedule. Cancel or pause anytime.
          </p>
          <button className="bg-[var(--color-ivory)] text-[var(--color-forest)] px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--color-terracotta)] hover:text-[var(--color-ivory)] transition-colors duration-500">
            Subscribe Now
          </button>
        </div>
      </section>

    </div>
  );
};

export default Shop;
