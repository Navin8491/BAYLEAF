import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiArrowRight, FiMinus, FiPlus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const containerRef = useRef(null);
  
  const subtotal = getCartTotal();
  const delivery = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + delivery;

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.cart-header', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.1
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-forest)] font-body">
      
      <div className="pt-40 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="cart-header border-b border-[var(--color-olive)]/20 pb-8 mb-12 flex justify-between items-end">
          <h1 className="text-5xl md:text-6xl font-heading font-medium tracking-tight">Your Order</h1>
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-[var(--color-sage)] hidden md:block">{cartItems.length} Items</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-[var(--color-linen)] rounded-[3rem] border border-[var(--color-olive)]/10">
            <p className="text-xl font-light text-[var(--color-forest)]/70 mb-8">Your cart is currently empty.</p>
            <Link to="/menu" className="inline-flex items-center gap-3 bg-[var(--color-forest)] text-[var(--color-ivory)] px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--color-sage)] transition-colors duration-500">
              Return to Menu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* CART ITEMS */}
            <div className="lg:w-2/3">
              <div className="hidden md:grid grid-cols-12 gap-4 border-b border-[var(--color-olive)]/20 pb-4 mb-6 text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              <AnimatePresence>
                {cartItems.map(item => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, borderBottomWidth: 0, marginBottom: 0 }}
                    className="flex flex-col md:flex-row md:items-center py-6 border-b border-[var(--color-olive)]/20 group gap-6 md:gap-4 overflow-hidden"
                  >
                    {/* Image & Title */}
                    <div className="md:w-1/2 flex items-center gap-6">
                      <Link to={`/product/${item.id}`} className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-[var(--color-linen)]">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-110 transition-transform duration-700" />
                      </Link>
                      <div>
                        <h3 className="text-xl font-heading font-medium text-[var(--color-forest)] mb-1">
                          <Link to={`/product/${item.id}`} className="hover:text-[var(--color-terracotta)] transition-colors">{item.name}</Link>
                        </h3>
                        <p className="text-[var(--color-sage)] font-medium text-sm">{item.price}</p>
                      </div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:w-1/4 flex justify-start md:justify-center items-center gap-6">
                      <div className="flex items-center justify-between border border-[var(--color-olive)]/30 rounded-full h-10 w-32 px-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-[var(--color-forest)]/60 hover:text-[var(--color-terracotta)] p-2">
                          <FiMinus size={14} />
                        </button>
                        <span className="font-heading font-medium text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-[var(--color-forest)]/60 hover:text-[var(--color-sage)] p-2">
                          <FiPlus size={14} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[var(--color-forest)]/40 hover:text-[var(--color-terracotta)] transition-colors md:hidden"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                    
                    {/* Total & Remove */}
                    <div className="md:w-1/4 flex justify-between md:justify-end items-center gap-6">
                      <span className="md:hidden text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60">Total</span>
                      <p className="text-xl font-heading font-medium text-[var(--color-forest)]">
                        ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                      </p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[var(--color-forest)]/40 hover:text-[var(--color-terracotta)] transition-colors hidden md:block"
                        title="Remove item"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:w-1/3">
              <div className="bg-[var(--color-linen)] p-10 rounded-[3rem] sticky top-32">
                <h3 className="text-2xl font-heading font-medium text-[var(--color-forest)] mb-8">Summary</h3>
                
                <div className="space-y-4 mb-8 text-sm font-light">
                  <div className="flex justify-between text-[var(--color-forest)]/80">
                    <span>Subtotal</span>
                    <span className="font-medium text-[var(--color-forest)]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-forest)]/80">
                    <span>Delivery</span>
                    <span className="font-medium text-[var(--color-forest)]">${delivery.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-[var(--color-forest)] font-medium text-2xl mb-10 border-t border-[var(--color-olive)]/20 pt-6">
                  <span className="font-heading">Total</span>
                  <span className="text-[var(--color-sage)] font-heading">${total.toFixed(2)}</span>
                </div>
                
                <Link 
                  to="/checkout"
                  className="flex items-center justify-center gap-3 w-full bg-[var(--color-forest)] text-[var(--color-ivory)] py-5 rounded-full uppercase tracking-[0.2em] font-bold text-xs hover:bg-[var(--color-terracotta)] transition-colors duration-500 group"
                >
                  Checkout <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Cart;
