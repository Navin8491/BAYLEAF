import React, { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { gsap } from 'gsap';
import { FiLock, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const containerRef = useRef(null);

  const subtotal = getCartTotal();
  const delivery = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + delivery;

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.checkout-element', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.1
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-forest)] font-body flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-light text-[var(--color-forest)]/70 mb-8">Your cart is empty.</p>
          <Link to="/shop" className="bg-[var(--color-forest)] text-[var(--color-ivory)] px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--color-sage)] transition-colors">Return to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-forest)] font-body">
      
      <div className="pt-40 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="checkout-element border-b border-[var(--color-olive)]/20 pb-8 mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-medium tracking-tight">Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* FORM SECTION */}
          <div className="lg:w-3/5">
            <h2 className="text-2xl font-heading font-medium text-[var(--color-forest)] mb-10 checkout-element">Billing Details</h2>
            
            <form className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2 checkout-element group">
                  <label className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)] transition-colors">First Name</label>
                  <input type="text" className="w-full bg-transparent border-b-2 border-[var(--color-olive)]/30 py-4 text-[var(--color-forest)] focus:outline-none focus:border-[var(--color-sage)] transition-colors rounded-none" />
                </div>
                <div className="flex flex-col gap-2 checkout-element group">
                  <label className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)] transition-colors">Last Name</label>
                  <input type="text" className="w-full bg-transparent border-b-2 border-[var(--color-olive)]/30 py-4 text-[var(--color-forest)] focus:outline-none focus:border-[var(--color-sage)] transition-colors rounded-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2 checkout-element group">
                  <label className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)] transition-colors">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b-2 border-[var(--color-olive)]/30 py-4 text-[var(--color-forest)] focus:outline-none focus:border-[var(--color-sage)] transition-colors rounded-none" />
                </div>
                <div className="flex flex-col gap-2 checkout-element group">
                  <label className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)] transition-colors">Phone</label>
                  <input type="tel" className="w-full bg-transparent border-b-2 border-[var(--color-olive)]/30 py-4 text-[var(--color-forest)] focus:outline-none focus:border-[var(--color-sage)] transition-colors rounded-none" />
                </div>
              </div>

              <div className="flex flex-col gap-2 checkout-element group">
                <label className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)] transition-colors">Address</label>
                <input type="text" className="w-full bg-transparent border-b-2 border-[var(--color-olive)]/30 py-4 text-[var(--color-forest)] focus:outline-none focus:border-[var(--color-sage)] transition-colors rounded-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2 checkout-element group">
                  <label className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)] transition-colors">City</label>
                  <input type="text" className="w-full bg-transparent border-b-2 border-[var(--color-olive)]/30 py-4 text-[var(--color-forest)] focus:outline-none focus:border-[var(--color-sage)] transition-colors rounded-none" />
                </div>
                <div className="flex flex-col gap-2 checkout-element group">
                  <label className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)] transition-colors">Postal Code</label>
                  <input type="text" className="w-full bg-transparent border-b-2 border-[var(--color-olive)]/30 py-4 text-[var(--color-forest)] focus:outline-none focus:border-[var(--color-sage)] transition-colors rounded-none" />
                </div>
              </div>

              <h2 className="text-2xl font-heading font-medium text-[var(--color-forest)] mt-8 mb-4 checkout-element">Payment Method</h2>
              
              <div className="checkout-element p-6 border border-[var(--color-olive)]/30 rounded-[2rem] bg-[var(--color-linen)]/30 mb-8">
                <div className="flex items-center gap-4">
                  <input type="radio" id="card" name="payment" defaultChecked className="accent-[var(--color-sage)]" />
                  <label htmlFor="card" className="font-medium text-[var(--color-forest)] flex-1 cursor-pointer">Credit / Debit Card</label>
                  <FiLock className="text-[var(--color-forest)]/40" />
                </div>
                <div className="mt-6 pt-6 border-t border-[var(--color-olive)]/20 grid grid-cols-2 gap-6">
                  <div className="col-span-2 flex flex-col gap-2 group">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)]">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent border-b border-[var(--color-olive)]/30 py-2 text-[var(--color-forest)] focus:outline-none focus:border-[var(--color-sage)]" />
                  </div>
                  <div className="flex flex-col gap-2 group">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)]">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="w-full bg-transparent border-b border-[var(--color-olive)]/30 py-2 text-[var(--color-forest)] focus:outline-none focus:border-[var(--color-sage)]" />
                  </div>
                  <div className="flex flex-col gap-2 group">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)]">CVC</label>
                    <input type="text" placeholder="123" className="w-full bg-transparent border-b border-[var(--color-olive)]/30 py-2 text-[var(--color-forest)] focus:outline-none focus:border-[var(--color-sage)]" />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:w-2/5">
            <div className="bg-[var(--color-linen)] p-10 rounded-[3rem] sticky top-32 checkout-element">
              <h3 className="text-2xl font-heading font-medium text-[var(--color-forest)] mb-8">Your Order</h3>
              
              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-[var(--color-ivory)] shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div>
                        <p className="font-heading font-medium text-sm text-[var(--color-forest)]">{item.name}</p>
                        <p className="text-xs text-[var(--color-forest)]/60 uppercase tracking-widest">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium text-sm">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8 text-sm font-light border-t border-[var(--color-olive)]/20 pt-8">
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
                <span className="text-[var(--color-terracotta)] font-heading">${total.toFixed(2)}</span>
              </div>
              
              <button className="flex justify-between items-center w-full bg-[var(--color-forest)] text-[var(--color-ivory)] py-5 px-8 rounded-full uppercase tracking-[0.2em] font-bold text-xs hover:bg-[var(--color-sage)] transition-colors duration-500 group">
                Place Order <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-center text-[10px] text-[var(--color-forest)]/50 mt-6 uppercase tracking-widest">
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
