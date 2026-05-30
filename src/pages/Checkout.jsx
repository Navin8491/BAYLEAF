import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { gsap } from 'gsap';
import { FiLock, FiArrowRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Import separated backend modules from unified backend services index
import { createOrder, createOrderItems } from '../../backend/services';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, isLoggedIn, showToast, fetchOrders, authLoading } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const subtotal = getCartTotal();
  const delivery = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + delivery;

  // Form states
  const [firstName, setFirstName] = useState(() => (user?.name || '').split(' ')[0] || '');
  const [lastName, setLastName] = useState(() => (user?.name || '').split(' ').slice(1).join(' ') || '');
  const [email, setEmail] = useState(() => user?.email || '');
  const [phone, setPhone] = useState(() => user?.phone || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keep track of the user we prefilled from
  const [prevUser, setPrevUser] = useState(user);

  // Route protection
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      showToast('Please sign in to place an order.');
      navigate('/login');
    }
  }, [isLoggedIn, authLoading, navigate]);

  // Prefill details when user object changes (direct in render)
  if (user !== prevUser) {
    setPrevUser(user);
    if (user) {
      const names = (user.name || '').split(' ');
      if (!firstName) setFirstName(names[0] || '');
      if (!lastName) setLastName(names.slice(1).join(' ') || '');
      if (!email) setEmail(user.email || '');
      if (!phone) setPhone(user.phone || '');
    }
  }

  useEffect(() => {
    if (authLoading || cartItems.length === 0 || !containerRef.current) return;

    let ctx = gsap.context(() => {
      const elements = containerRef.current.querySelectorAll('.checkout-element');
      if (elements.length > 0) {
        gsap.from(elements, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.1
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, [authLoading, cartItems.length]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!isLoggedIn || !user?.id) {
      showToast('Please sign in to place an order.');
      navigate('/login');
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      showToast('Your shopping cart is empty.');
      return;
    }

    if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode) {
      showToast('Please fill in all billing details.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Insert order using the separated backend file
      const orderResult = await createOrder({
        userId: user.id,
        totalAmount: total,
        shippingAddress: `${address}, ${city}, ${postalCode}`
      });

      if (!orderResult.success) {
        showToast('Checkout failed: ' + orderResult.message);
        setIsSubmitting(false);
        return;
      }

      // 2. Prepare items and insert using the separated backend file
      const orderItemsToInsert = cartItems.map(item => {
        const itemPrice = typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price;
        return {
          order_id: orderResult.data.id,
          product_name: item.name,
          quantity: item.quantity,
          price: itemPrice
        };
      });

      const itemsResult = await createOrderItems(orderItemsToInsert);

      if (!itemsResult.success) {
        showToast('Order items saving failed: ' + itemsResult.message);
        setIsSubmitting(false);
        return;
      }

      // 3. Clear shopping cart
      clearCart();

      // 4. Refresh auth context list
      await fetchOrders(user.id);

      showToast('Secure order placed successfully!');
      setIsSubmitting(false);
      navigate('/profile/orders');
    } catch (err) {
      setIsSubmitting(false);
      console.error('Order submission error:', err);
      showToast('An unexpected order error occurred.');
    }
  };

  if (authLoading) {
    return (
      <div className="bg-[var(--color-soft-ivory)] min-h-screen text-[var(--color-gray-blue)] font-body flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-4 border-[var(--color-muted-teal)]/30 border-t-[var(--color-muted-teal)] animate-spin mx-auto mb-4" />
          <p className="text-xs font-bold uppercase tracking-wider">Loading Checkout...</p>
        </div>
      </div>
    );
  }

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

      <div className="pt-24 pb-16 px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
        <div className="checkout-element border-b border-[var(--color-silver-fog)]/50 pb-4 mb-10 text-center">
          <h1 className="text-6xl md:text-8xl font-heading font-medium tracking-tight text-[var(--color-rich-graphite)]">
            Secure <span className="italic font-light text-[var(--color-deep-slate)]">Checkout.</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* FORM SECTION */}
          <div className="lg:w-3/5">
            <h2 className="text-3xl font-heading font-medium text-[var(--color-rich-graphite)] mb-6 checkout-element">Billing Details</h2>
            
            <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 checkout-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none text-sm font-light"
                  />
                </div>
                <div className="flex flex-col gap-2 checkout-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none text-sm font-light"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 checkout-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none text-sm font-light"
                  />
                </div>
                <div className="flex flex-col gap-2 checkout-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none text-sm font-light"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 checkout-element group">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none text-sm font-light"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 checkout-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none text-sm font-light"
                  />
                </div>
                <div className="flex flex-col gap-2 checkout-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Postal Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none text-sm font-light"
                  />
                </div>
              </div>

              <h2 className="text-3xl font-heading font-medium text-[var(--color-rich-graphite)] mt-6 mb-3 checkout-element">Payment Method</h2>
              
              <div className="checkout-element p-5 md:p-6 mb-6 border border-[var(--color-silver-fog)]/60 rounded-[2rem] md:rounded-[3rem] bg-[var(--color-soft-ivory)]/80 backdrop-blur-2xl shadow-[0_20px_40px_rgba(56,68,80,0.05)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-warm-sand)]/20 to-[var(--color-powder-blue)]/10 z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-5">
                    <input type="radio" id="card" name="payment" defaultChecked className="accent-[var(--color-muted-teal)] w-5 h-5" />
                    <label htmlFor="card" className="font-medium text-[var(--color-rich-graphite)] flex-1 cursor-pointer text-base md:text-lg">Credit / Debit Card</label>
                    <FiLock className="text-[var(--color-deep-slate)]/60 text-xl" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-[var(--color-silver-fog)]/50 grid grid-cols-2 gap-4">
                    <div className="col-span-2 flex flex-col gap-2 group">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Card Number</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] text-sm font-light" />
                    </div>
                    <div className="flex flex-col gap-2 group">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] text-sm font-light" />
                    </div>
                    <div className="flex flex-col gap-2 group">
                      <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">CVC</label>
                      <input type="text" placeholder="123" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] focus:outline-none focus:border-[var(--color-muted-teal)] text-sm font-light" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:w-2/5">
            <div className="bg-[var(--color-soft-ivory)]/80 backdrop-blur-3xl p-6 rounded-[2rem] md:rounded-[3.5rem] sticky top-24 checkout-element shadow-[0_30px_60px_rgba(56,68,80,0.08)] border border-[var(--color-silver-fog)]/60 text-[var(--color-gray-blue)]">
              <h3 className="text-3xl font-heading font-medium text-[var(--color-rich-graphite)] mb-4">Your Order</h3>
              
              <div className="space-y-4 mb-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white shrink-0 border border-[var(--color-silver-fog)]/50 p-1">
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-[var(--color-soft-ivory)]">
                           <img 
                             src={item.img || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=75&w=200&auto=format&fit=crop'} 
                             alt={item.name} 
                             className="w-full h-full object-cover mix-blend-multiply" 
                             onError={(e) => {
                               e.target.onerror = null;
                               e.target.src = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=75&w=200&auto=format&fit=crop';
                             }}
                           />
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

              <div className="space-y-3 mb-4 text-base font-light border-t border-[var(--color-silver-fog)]/50 pt-4">
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
              
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="flex justify-between items-center w-full bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white py-6 px-10 rounded-full uppercase tracking-[0.2em] font-bold text-[11px] hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 group shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.4)] relative overflow-hidden disabled:opacity-50 disabled:pointer-events-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                {isSubmitting ? (
                  <span className="relative z-10 mx-auto w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span className="relative z-10">PLACE SECURE ORDER</span>
                    <FiArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform text-lg" />
                  </>
                )}
              </button>
              
              <p className="text-center text-[9px] text-[var(--color-deep-slate)]/50 mt-4 uppercase tracking-[0.3em] font-bold">
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
