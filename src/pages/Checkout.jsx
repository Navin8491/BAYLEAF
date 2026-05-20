import React, { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { gsap } from 'gsap';
import { FiLock, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const containerRef = useRef(null);

  const subtotal = getCartTotal();
  const delivery = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + delivery;

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.checkout-element', {
        y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.1
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="bg-[var(--color-soft-ivory)] min-h-screen text-[var(--color-gray-blue)] font-body flex items-center justify-center relative overflow-hidden">
        
        {/* GLOBAL AMBIENT BACKGROUND LAYER */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <motion.div 
            className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[var(--color-powder-blue)]/50 rounded-full blur-[140px] mix-blend-multiply"
            animate={{ x: [0, 40, -30, 0], y: [0, -30, 40, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="text-center bg-[var(--color-soft-ivory)]/80 backdrop-blur-3xl p-24 rounded-[4rem] border border-[var(--color-silver-fog)]/50 shadow-[0_20px_40px_rgba(56,68,80,0.05)] relative z-10">
          <p className="text-3xl font-light text-[var(--color-gray-blue)] mb-12">Your cart is empty.</p>
          <Link to="/shop" className="inline-flex items-center justify-center gap-4 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white px-12 py-5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.4)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <span className="relative z-10">RETURN TO SHOP</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-[var(--color-soft-ivory)] min-h-screen text-[var(--color-gray-blue)] font-body relative overflow-x-hidden selection:bg-[var(--color-muted-teal)] selection:text-white">
      
      {/* GLOBAL AMBIENT BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <motion.div 
          className="absolute top-[10%] right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[var(--color-sage-mist)]/40 rounded-full blur-[140px] mix-blend-multiply"
          animate={{ x: [0, -40, 20, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[20%] left-[5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[var(--color-powder-blue)]/50 rounded-full blur-[130px] mix-blend-multiply"
          animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="pt-48 pb-32 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
        <div className="checkout-element border-b border-[var(--color-silver-fog)]/50 pb-10 mb-20 text-center">
          <h1 className="text-6xl md:text-8xl font-heading font-medium tracking-tight text-[var(--color-rich-graphite)]">
            Secure <span className="italic font-light text-[var(--color-deep-slate)]">Checkout.</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* FORM SECTION */}
          <div className="lg:w-3/5">
            <h2 className="text-3xl font-heading font-medium text-[var(--color-rich-graphite)] mb-12 checkout-element">Billing Details</h2>
            
            <form className="flex flex-col gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3 checkout-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">First Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none" />
                </div>
                <div className="flex flex-col gap-3 checkout-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Last Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3 checkout-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none" />
                </div>
                <div className="flex flex-col gap-3 checkout-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Phone</label>
                  <input type="tel" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none" />
                </div>
              </div>

              <div className="flex flex-col gap-3 checkout-element group">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Address</label>
                <input type="text" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3 checkout-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">City</label>
                  <input type="text" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none" />
                </div>
                <div className="flex flex-col gap-3 checkout-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Postal Code</label>
                  <input type="text" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none" />
                </div>
              </div>

              <h2 className="text-3xl font-heading font-medium text-[var(--color-rich-graphite)] mt-12 mb-6 checkout-element">Payment Method</h2>
              
              <div className="checkout-element p-10 border border-[var(--color-silver-fog)]/60 rounded-[3rem] bg-[var(--color-soft-ivory)]/80 backdrop-blur-2xl shadow-[0_20px_40px_rgba(56,68,80,0.05)] mb-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-warm-sand)]/20 to-[var(--color-powder-blue)]/10 z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-5">
                    <input type="radio" id="card" name="payment" defaultChecked className="accent-[var(--color-muted-teal)] w-5 h-5" />
                    <label htmlFor="card" className="font-medium text-[var(--color-rich-graphite)] flex-1 cursor-pointer text-lg">Credit / Debit Card</label>
                    <FiLock className="text-[var(--color-deep-slate)]/60 text-xl" />
                  </div>
                  <div className="mt-8 pt-8 border-t border-[var(--color-silver-fog)]/50 grid grid-cols-2 gap-8">
                    <div className="col-span-2 flex flex-col gap-3 group">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-2 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)]" />
                    </div>
                    <div className="flex flex-col gap-3 group">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-2 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)]" />
                    </div>
                    <div className="flex flex-col gap-3 group">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">CVC</label>
                      <input type="text" placeholder="123" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-2 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)]" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:w-2/5">
            <div className="bg-[var(--color-soft-ivory)]/80 backdrop-blur-3xl p-12 rounded-[3.5rem] sticky top-40 checkout-element shadow-[0_30px_60px_rgba(56,68,80,0.08)] border border-[var(--color-silver-fog)]/60">
              <h3 className="text-3xl font-heading font-medium text-[var(--color-rich-graphite)] mb-10">Your Order</h3>
              
              <div className="space-y-8 mb-10 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white shrink-0 border border-[var(--color-silver-fog)]/50 p-1">
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-[var(--color-soft-ivory)]">
                           <img src={item.img} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                        </div>
                      </div>
                      <div>
                        <p className="font-heading font-medium text-lg text-[var(--color-rich-graphite)] mb-1">{item.name}</p>
                        <p className="text-[10px] text-[var(--color-deep-slate)]/60 uppercase tracking-widest font-bold">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium text-lg text-[var(--color-rich-graphite)]">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-6 mb-10 text-base font-light border-t border-[var(--color-silver-fog)]/50 pt-10">
                <div className="flex justify-between text-[var(--color-gray-blue)]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[var(--color-rich-graphite)]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--color-gray-blue)]">
                  <span>Delivery</span>
                  <span className="font-medium text-[var(--color-rich-graphite)]">${delivery.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end text-[var(--color-rich-graphite)] font-medium mb-12 border-t border-[var(--color-silver-fog)]/50 pt-8">
                <span className="font-heading text-xl">Total</span>
                <span className="text-[var(--color-muted-teal)] font-heading text-4xl">${total.toFixed(2)}</span>
              </div>
              
              <button className="flex justify-between items-center w-full bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white py-6 px-10 rounded-full uppercase tracking-[0.2em] font-bold text-[11px] hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 group shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.4)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                <span className="relative z-10">PLACE SECURE ORDER</span>
                <FiArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform text-lg" />
              </button>
              
              <p className="text-center text-[9px] text-[var(--color-deep-slate)]/50 mt-8 uppercase tracking-[0.3em] font-bold">
                Secure Encrypted Checkout
              </p>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Checkout;
