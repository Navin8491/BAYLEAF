import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getCartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
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
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-[var(--color-ivory)]/80 py-4 shadow-sm backdrop-blur-xl border-b border-[var(--color-olive)]/20' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold font-heading text-[var(--color-forest)] tracking-widest uppercase flex items-center gap-1 group">
            BAYLEAF<span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta)] group-hover:scale-150 transition-transform duration-300"></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-10">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative text-xs font-medium uppercase tracking-[0.15em] py-2 transition-colors duration-300 ${
                        isActive ? 'text-[var(--color-sage)]' : 'text-[var(--color-forest)]/80 hover:text-[var(--color-forest)]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.name}
                        {isActive && (
                          <motion.div 
                            layoutId="nav-underline"
                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--color-sage)]"
                            initial={false}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            
            {/* Cart Icon */}
            <Link to="/cart" className="relative text-[var(--color-forest)] hover:text-[var(--color-sage)] transition-colors">
              <FiShoppingCart size={22} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-terracotta)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-6">
            <Link to="/cart" className="relative text-[var(--color-forest)]">
              <FiShoppingCart size={22} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-terracotta)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--color-forest)] focus:outline-none"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[var(--color-ivory)] border-t border-[var(--color-olive)]/20 overflow-hidden shadow-2xl"
          >
            <ul className="px-6 py-6 space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block text-sm uppercase font-bold tracking-[0.1em] py-3 border-b border-[var(--color-olive)]/10 ${
                        isActive ? 'text-[var(--color-sage)]' : 'text-[var(--color-forest)]'
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
