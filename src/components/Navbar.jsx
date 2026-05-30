import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut, FiShoppingBag, FiSettings } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { getCartCount } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      className={`fixed w-full z-50 transition-all duration-700 ease-in-out ${scrolled
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
                      `relative text-[11px] font-bold uppercase tracking-[0.2em] py-2 transition-colors duration-500 ${isActive ? 'text-[var(--color-muted-teal)]' : 'text-[var(--color-deep-slate)]/80 hover:text-[var(--color-rich-graphite)]'
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

            {/* User Account / Profile Menu */}
            <div className="relative" ref={dropdownRef}>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full border border-[var(--color-silver-fog)]/50 hover:bg-[var(--color-silver-fog)]/30 transition-all duration-300 focus:outline-none"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border border-white"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-deep-slate)]">
                      Profile
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute right-0 mt-3 w-56 bg-white/90 backdrop-blur-2xl border border-[var(--color-silver-fog)]/40 rounded-2xl shadow-luxury p-3 z-50 flex flex-col gap-1"
                      >
                        <div className="px-3 py-2 border-b border-[var(--color-silver-fog)]/20 mb-1">
                          <p className="text-[11px] font-bold text-[var(--color-rich-graphite)] truncate">{user.name}</p>
                          <p className="text-[9px] text-[var(--color-gray-blue)]/80 truncate font-light">{user.email}</p>
                        </div>
                        
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-deep-slate)]/80 hover:text-[var(--color-muted-teal)] hover:bg-[var(--color-silver-fog)]/20 transition-all"
                        >
                          <FiUser size={14} />
                          <span>My Dashboard</span>
                        </Link>
                        <Link
                          to="/profile/orders"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-deep-slate)]/80 hover:text-[var(--color-muted-teal)] hover:bg-[var(--color-silver-fog)]/20 transition-all"
                        >
                          <FiShoppingBag size={14} />
                          <span>Order History</span>
                        </Link>
                        <Link
                          to="/profile/settings"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-[var(--color-deep-slate)]/80 hover:text-[var(--color-muted-teal)] hover:bg-[var(--color-silver-fog)]/20 transition-all"
                        >
                          <FiSettings size={14} />
                          <span>Settings</span>
                        </Link>
                        
                        <hr className="border-[var(--color-silver-fog)]/20 my-1" />
                        
                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            logout();
                            navigate('/');
                          }}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-red-600/80 hover:text-red-700 hover:bg-red-50/55 transition-all text-left w-full"
                        >
                          <FiLogOut size={14} />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_6px_15px_rgba(95,124,123,0.2)] hover:shadow-[0_8px_20px_rgba(95,124,123,0.35)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  Sign In
                </Link>
              )}
            </div>
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
            {isLoggedIn && (
              <Link to="/profile" className="flex items-center justify-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover border border-white"
                />
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--color-rich-graphite)] focus:outline-none"
            >
              {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-0 z-[9999] w-full h-screen bg-[#F8F5F2] overflow-hidden flex flex-col justify-start items-start p-6 text-[#2D2D2D]"
          >
            {/* Header */}
            <div className="flex justify-between items-center w-full pb-4 border-b border-[#2D2D2D]/10 mt-0 pt-0">
              <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#2D2D2D]/55">Navigation</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#2D2D2D] focus:outline-none p-1 hover:scale-110 transition-transform"
                aria-label="Close menu"
              >
                <FiX size={26} />
              </button>
            </div>

            {/* Navigation Links */}
            <ul className="flex flex-col space-y-4 w-full pl-6 pt-6 pb-4 mt-0 justify-start items-start">
              {navLinks.map((link, idx) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.03, duration: 0.3 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block text-sm uppercase font-heading font-semibold tracking-wide py-2 transition-all duration-300 ${isActive
                        ? 'text-[var(--color-muted-teal)] border-l-2 border-[var(--color-muted-teal)] pl-4'
                        : 'text-[#2D2D2D] hover:text-[var(--color-muted-teal)] pl-0'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.li>
              ))}
              
              {/* Account related links inside Mobile Drawer */}
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.03, duration: 0.3 }}
                className="w-full pt-2 border-t border-[#2D2D2D]/10"
              >
                {isLoggedIn ? (
                  <div className="flex flex-col space-y-3 w-full pl-0">
                    <span className="text-[9px] tracking-wider uppercase font-bold text-[var(--color-muted-teal)]">My Account</span>
                    <NavLink
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm uppercase font-heading font-semibold tracking-wide text-[#2D2D2D] hover:text-[var(--color-muted-teal)]"
                    >
                      Profile Dashboard
                    </NavLink>
                    <NavLink
                      to="/profile/orders"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm uppercase font-heading font-semibold tracking-wide text-[#2D2D2D] hover:text-[var(--color-muted-teal)]"
                    >
                      My Orders
                    </NavLink>
                    <NavLink
                      to="/profile/settings"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm uppercase font-heading font-semibold tracking-wide text-[#2D2D2D] hover:text-[var(--color-muted-teal)]"
                    >
                      Account Settings
                    </NavLink>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="text-left text-sm uppercase font-heading font-semibold tracking-wide text-red-600 hover:text-red-700 mt-2"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3 w-full pl-0">
                    <span className="text-[9px] tracking-wider uppercase font-bold text-[var(--color-muted-teal)]">Authentication</span>
                    <NavLink
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm uppercase font-heading font-semibold tracking-wide text-[#2D2D2D] hover:text-[var(--color-muted-teal)]"
                    >
                      Sign In
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block text-sm uppercase font-heading font-semibold tracking-wide text-[#2D2D2D] hover:text-[var(--color-muted-teal)]"
                    >
                      Create Account
                    </NavLink>
                  </div>
                )}
              </motion.li>
            </ul>

            {/* Drawer Footer details */}
            <div className="w-full mt-auto pt-6 border-t border-[#2D2D2D]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-light text-[#2D2D2D]/60">
              <div>
                <h4 className="font-heading font-medium text-[#2D2D2D] text-sm mb-1">TasteHub Cafe</h4>
                <p>124 Soho Square, London</p>
              </div>
              <div className="flex gap-4">
                <span className="text-[9px] tracking-widest uppercase font-bold text-[var(--color-muted-teal)]">Est. 2026</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
