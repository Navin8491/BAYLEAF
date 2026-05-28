import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
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
        y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-soft-ivory)] min-h-screen text-[var(--color-gray-blue)] font-body relative overflow-x-hidden selection:bg-[var(--color-muted-teal)] selection:text-white">
      
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

      <div className="pt-24 pb-16 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
        <div className="cart-header border-b border-[var(--color-silver-fog)]/50 pb-4 mb-8 flex justify-between items-end">
          <h1 className="text-6xl md:text-8xl font-heading font-medium tracking-tight text-[var(--color-rich-graphite)]">
            Your <span className="italic font-light text-[var(--color-deep-slate)]">Order.</span>
          </h1>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-muted-teal)] hidden md:block bg-[var(--color-silver-fog)]/30 px-4 py-2 rounded-full border border-[var(--color-muted-teal)]/20">
            {cartItems.length} Items
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-[var(--color-soft-ivory)]/60 backdrop-blur-2xl rounded-[4rem] border border-[var(--color-silver-fog)]/50 shadow-[0_20px_40px_rgba(56,68,80,0.05)]">
            <p className="text-2xl font-light text-[var(--color-gray-blue)] mb-5">Your cart is currently empty.</p>
            <Link to="/menu" className="inline-flex items-center justify-center gap-4 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white px-10 py-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.4)] relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
               <span className="relative z-10">RETURN TO MENU</span>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* CART ITEMS */}
            <div className="lg:w-2/3">
              <div className="hidden md:grid grid-cols-12 gap-4 border-b border-[var(--color-silver-fog)]/50 pb-3 mb-4 text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/70">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              <AnimatePresence>
                {cartItems.map(item => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, borderBottomWidth: 0, marginBottom: 0 }}
                    className="flex flex-col md:flex-row md:items-center py-4 border-b border-[var(--color-silver-fog)]/40 group gap-4 md:gap-2 overflow-hidden"
                  >
                    {/* Image & Title */}
                    <div className="md:w-1/2 flex items-center gap-4">
                      <Link to={`/product/${item.id}`} className="w-28 h-28 shrink-0 rounded-3xl overflow-hidden bg-white shadow-sm border border-[var(--color-silver-fog)]/50 relative p-1.5">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[var(--color-soft-ivory)]">
                           <div className="absolute inset-0 bg-[var(--color-deep-slate)]/5 z-10 mix-blend-overlay"></div>
                           <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                        </div>
                      </Link>
                      <div>
                        <h3 className="text-2xl font-heading font-medium text-[var(--color-rich-graphite)] mb-1">
                          <Link to={`/product/${item.id}`} className="hover:text-[var(--color-muted-teal)] transition-colors duration-300">{item.name}</Link>
                        </h3>
                        <p className="text-[var(--color-muted-teal)] font-medium text-sm">{item.price}</p>
                      </div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:w-1/4 flex justify-start md:justify-center items-center gap-6">
                      <div className="flex items-center justify-between border border-[var(--color-silver-fog)]/80 rounded-full h-12 w-36 px-2 bg-white/50 backdrop-blur-sm">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-[var(--color-deep-slate)] hover:text-[var(--color-muted-teal)] transition-colors p-2">
                          <FiMinus size={16} />
                        </button>
                        <span className="font-heading font-medium text-lg text-[var(--color-rich-graphite)]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-[var(--color-deep-slate)] hover:text-[var(--color-muted-teal)] transition-colors p-2">
                          <FiPlus size={16} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[var(--color-deep-slate)]/40 hover:text-[var(--color-muted-teal)] transition-colors md:hidden"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                    
                    {/* Total & Remove */}
                    <div className="md:w-1/4 flex justify-between md:justify-end items-center gap-8">
                      <span className="md:hidden text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60">Total</span>
                      <p className="text-2xl font-heading font-medium text-[var(--color-rich-graphite)]">
                        ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                      </p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[var(--color-deep-slate)]/30 hover:text-[var(--color-muted-teal)] transition-colors hidden md:block"
                        title="Remove item"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ORDER SUMMARY */}
            <div className="lg:w-1/3">
              <div className="bg-[var(--color-soft-ivory)]/80 backdrop-blur-3xl p-6 rounded-[3.5rem] sticky top-24 shadow-[0_30px_60px_rgba(56,68,80,0.08)] border border-[var(--color-silver-fog)]/60">
                <h3 className="text-3xl font-heading font-medium text-[var(--color-rich-graphite)] mb-4">Summary</h3>
                
                <div className="space-y-3 mb-4 text-base font-light">
                  <div className="flex justify-between text-[var(--color-gray-blue)]">
                    <span>Subtotal</span>
                    <span className="font-medium text-[var(--color-rich-graphite)]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-gray-blue)]">
                    <span>Delivery</span>
                    <span className="font-medium text-[var(--color-rich-graphite)]">${delivery.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end text-[var(--color-rich-graphite)] font-medium mb-6 border-t border-[var(--color-silver-fog)]/50 pt-4">
                  <span className="font-heading text-xl">Total</span>
                  <span className="text-[var(--color-muted-teal)] font-heading text-4xl">${total.toFixed(2)}</span>
                </div>
                
                <Link 
                  to="/checkout"
                  className="flex items-center justify-center gap-4 w-full bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white py-6 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.4)] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                  <span className="relative z-10">PROCEED TO CHECKOUT</span>
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
