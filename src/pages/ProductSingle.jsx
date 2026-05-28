import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductSingle = () => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const containerRef = useRef(null);
  const { id } = useParams();

  // Hardcoded product for demonstration (matching the Shop page items)
  const product = {
    id: id || 'b-1',
    name: 'Ethiopia Yirgacheffe',
    type: 'Single Origin',
    price: '$22.00',
    desc: 'A vibrant and floral profile, featuring delicate notes of jasmine, bergamot, and a sweet peach finish. Sustainably sourced from high-altitude farms in the Gedeo Zone, this light roast is perfect for pour-over methods.',
    img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1200&auto=format&fit=crop',
    details: [
      { label: 'Origin', value: 'Yirgacheffe, Ethiopia' },
      { label: 'Process', value: 'Washed' },
      { label: 'Variety', value: 'Heirloom' },
      { label: 'Roast', value: 'Light' }
    ]
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.product-img', {
        scale: 1.05, opacity: 0, duration: 1.5, ease: 'power3.out',
      });
      
      gsap.from('.product-info', {
        y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.3
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div ref={containerRef} className="bg-[var(--color-soft-ivory)] min-h-screen text-[var(--color-gray-blue)] font-body relative overflow-x-hidden selection:bg-[var(--color-muted-teal)] selection:text-white">
      
      {/* GLOBAL AMBIENT BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <motion.div 
          className="absolute top-[10%] right-[10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[var(--color-powder-blue)]/50 rounded-full blur-[140px] mix-blend-multiply"
          animate={{ x: [0, -40, 20, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[20%] left-[5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[var(--color-sage-mist)]/40 rounded-full blur-[120px] mix-blend-multiply"
          animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
        <Link to="/shop" className="inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/70 hover:text-[var(--color-muted-teal)] transition-colors mb-6 group">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Shop
        </Link>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* IMAGE HALF */}
          <div className="lg:w-1/2">
            <div className="product-img aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-[0_30px_60px_rgba(56,68,80,0.1)] relative border border-[var(--color-silver-fog)]/60 bg-white p-3">
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden bg-[var(--color-soft-ivory)]">
                 <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-powder-blue)]/30 to-[var(--color-sage-mist)]/30 mix-blend-overlay z-10"></div>
                 <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* DETAILS HALF */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="mb-6 border-b border-[var(--color-silver-fog)]/60 pb-6">
              <span className="product-info inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-muted-teal)] mb-3 bg-[var(--color-silver-fog)]/30 px-4 py-2 rounded-full border border-[var(--color-muted-teal)]/20">
                {product.type}
              </span>
              <h1 className="product-info text-5xl lg:text-7xl font-heading font-medium text-[var(--color-rich-graphite)] mb-4 leading-[1.1]">{product.name}</h1>
              <p className="product-info text-3xl font-heading font-medium text-[var(--color-muted-teal)]">{product.price}</p>
            </div>
            
            <p className="product-info text-xl font-light text-[var(--color-gray-blue)] leading-relaxed mb-6">
              {product.desc}
            </p>
            
            <div className="product-info grid grid-cols-2 gap-y-8 gap-x-12 mb-8">
              {product.details.map((detail, idx) => (
                <div key={idx}>
                  <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/50 mb-2">{detail.label}</span>
                  <span className="block font-medium text-lg text-[var(--color-rich-graphite)]">{detail.value}</span>
                </div>
              ))}
            </div>

            <div className="product-info flex flex-col sm:flex-row items-center gap-8 mt-auto">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between bg-white/50 backdrop-blur-md border border-[var(--color-silver-fog)]/80 rounded-full h-16 w-full sm:w-48 px-6 shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="text-[var(--color-deep-slate)] hover:text-[var(--color-muted-teal)] transition-colors p-2"
                >
                  <FiMinus size={18} />
                </button>
                <span className="font-heading font-medium text-2xl w-12 text-center text-[var(--color-rich-graphite)] select-none">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  className="text-[var(--color-deep-slate)] hover:text-[var(--color-muted-teal)] transition-colors p-2"
                >
                  <FiPlus size={18} />
                </button>
              </div>
              
              {/* Add to Cart */}
              <button 
                onClick={handleAddToCart}
                className="w-full sm:flex-1 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white h-16 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.4)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                <span className="relative z-10">ADD TO CART</span>
              </button>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default ProductSingle;
