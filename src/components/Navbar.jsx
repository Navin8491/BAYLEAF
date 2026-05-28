import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    let active = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== active) {
        active = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-700 ease-in-out ${
        scrolled 
          ? 'bg-[var(--color-soft-ivory)]/70 py-3 shadow-[0_10px_30px_rgba(56,68,80,0.05)] backdrop-blur-2xl border-b border-[var(--color-silver-fog)]/40' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 custom-mobile-container">
        <div className="flex justify-between items-center custom-mobile-inner">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold font-heading text-[var(--color-rich-graphite)] tracking-widest uppercase flex items-center gap-1.5 group custom-mobile-logo">
            BAYLEAF<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-muted-teal)] group-hover:scale-150 transition-transform duration-500 shadow-[0_0_10px_rgba(95,124,123,0.5)]"></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-12">
            <ul className="flex space-x-10">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative text-[11px] font-bold uppercase tracking-[0.2em] py-2 transition-colors duration-500 ${
                        isActive ? 'text-[var(--color-muted-teal)]' : 'text-[var(--color-deep-slate)]/80 hover:text-[var(--color-rich-graphite)]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.name}
                        {isActive && (
                          <motion.div 
                            layoutId="nav-underline"
                            className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[var(--color-muted-teal)]"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            
            {/* Cart Icon / Cart Button */}
            <Link to="/cart" className="relative group flex items-center gap-3 px-5 py-2.5 rounded-full border border-[var(--color-silver-fog)]/50 hover:bg-[var(--color-silver-fog)]/30 transition-all duration-300">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-deep-slate)] group-hover:text-[var(--color-muted-teal)] transition-colors">Cart</span>
              <div className="relative">
                <FiShoppingCart size={18} className="text-[var(--color-deep-slate)] group-hover:text-[var(--color-muted-teal)] transition-colors" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-[0_2px_5px_rgba(95,124,123,0.4)]">
                    {getCartCount()}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-6 custom-mobile-icons">
            <Link to="/cart" className="relative text-[var(--color-deep-slate)]">
              <FiShoppingCart size={22} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--color-rich-graphite)] focus:outline-none"
            >
              {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 w-full bg-[var(--color-soft-ivory)]/95 backdrop-blur-3xl border-b border-[var(--color-silver-fog)] shadow-[0_20px_40px_rgba(56,68,80,0.1)] overflow-hidden"
          >
            <ul className="px-8 py-8 space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block text-xs uppercase font-bold tracking-[0.2em] py-3 border-b border-[var(--color-silver-fog)]/30 transition-colors duration-300 ${
                        isActive ? 'text-[var(--color-muted-teal)]' : 'text-[var(--color-deep-slate)]'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
