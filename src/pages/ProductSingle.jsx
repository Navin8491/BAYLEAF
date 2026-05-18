import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const ProductSingle = () => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const containerRef = useRef(null);

  // Hardcoded product for demonstration (matching the Shop page items)
  const product = {
    id: 'b-1',
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
        scale: 1.05,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
      });
      
      gsap.from('.product-info', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div ref={containerRef} className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-forest)] font-body">
      
      <div className="pt-32 pb-12 px-6 lg:px-12 max-w-7xl mx-auto">
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 hover:text-[var(--color-terracotta)] transition-colors mb-12">
          <FiArrowLeft /> Back to Shop
        </Link>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* IMAGE HALF */}
          <div className="lg:w-1/2">
            <div className="product-img aspect-[4/5] rounded-[3rem] overflow-hidden shadow-luxury relative bg-[var(--color-linen)]">
              <div className="absolute inset-0 bg-[var(--color-forest)]/5 mix-blend-overlay z-10"></div>
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* DETAILS HALF */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="mb-10 border-b border-[var(--color-olive)]/20 pb-10">
              <span className="product-info block text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-sage)] mb-4">{product.type}</span>
              <h1 className="product-info text-5xl lg:text-6xl font-heading font-medium text-[var(--color-forest)] mb-6 leading-tight">{product.name}</h1>
              <p className="product-info text-2xl font-heading font-medium text-[var(--color-sage)]">{product.price}</p>
            </div>
            
            <p className="product-info text-lg font-light text-[var(--color-forest)]/70 leading-relaxed mb-10">
              {product.desc}
            </p>
            
            <div className="product-info grid grid-cols-2 gap-y-6 gap-x-12 mb-12">
              {product.details.map((detail, idx) => (
                <div key={idx}>
                  <span className="block text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/50 mb-1">{detail.label}</span>
                  <span className="block font-medium text-[var(--color-forest)]">{detail.value}</span>
                </div>
              ))}
            </div>

            <div className="product-info flex flex-col sm:flex-row items-center gap-6 mt-auto">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between bg-transparent border border-[var(--color-olive)]/30 rounded-full h-14 w-full sm:w-40 px-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="text-[var(--color-forest)]/60 hover:text-[var(--color-terracotta)] transition-colors p-2"
                >
                  <FiMinus />
                </button>
                <span className="font-heading font-medium text-lg w-12 text-center select-none">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  className="text-[var(--color-forest)]/60 hover:text-[var(--color-sage)] transition-colors p-2"
                >
                  <FiPlus />
                </button>
              </div>
              
              {/* Add to Cart */}
              <button 
                onClick={handleAddToCart}
                className="w-full sm:flex-1 bg-[var(--color-forest)] text-[var(--color-ivory)] h-14 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--color-sage)] transition-colors duration-500"
              >
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default ProductSingle;
