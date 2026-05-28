import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterestP } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.08,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Footer = () => {
  const links = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Journal', path: '/blog' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="relative bg-[#1A1F26] text-[#D8E4EE] pt-10 pb-5 border-t border-white/5 overflow-hidden font-body">
      
      {/* 1. LAYERED BACKGROUNDS, AMBIENT GLOWS & RADIAL VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Animated Glow Circles */}
        <motion.div 
          className="absolute -top-[10%] -left-[10%] w-[320px] h-[320px] bg-[#5F7C7B]/15 rounded-full blur-[90px]"
          animate={{ x: [0, 30, -15, 0], y: [0, -25, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[10%] -right-[5%] w-[280px] h-[280px] bg-[#4F6867]/15 rounded-full blur-[80px]"
          animate={{ x: [0, -30, 15, 0], y: [0, 25, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Matte dark gradient structure */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E333A] via-[#24282F] to-[#16191E] opacity-98"></div>
        {/* Radial Vignette Overlay for rich depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#111419_95%)] opacity-90"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* 2. COMPACT LUXURY NEWSLETTER BLOCK */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/5 border border-white/5 backdrop-blur-2xl rounded-3xl p-5 md:p-6 mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Subtle line glow on the glass card */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E2D4C5]/20 to-transparent"></div>
          
          <div className="max-w-md text-center md:text-left z-10">
            <h3 className="text-lg md:text-xl font-heading font-medium text-white mb-1 tracking-wide">Join the Bayleaf Society</h3>
            <p className="text-xs font-light text-[#D8E4EE]/70">Subscribe for early access to curated roasts, recipes, and private tasting events.</p>
          </div>
          <form className="w-full md:w-auto flex flex-col sm:flex-row gap-3 justify-center z-10">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full sm:w-64 bg-[#2E333A]/50 border border-white/10 text-white placeholder-[#D8E4EE]/35 focus:outline-none focus:border-[#5F7C7B]/80 text-xs px-5 py-2.5 rounded-full transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] font-light"
              required
            />
            <button 
              type="submit" 
              className="relative bg-gradient-to-br from-[#5F7C7B] to-[#4F6867] text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:from-[#4F6867] hover:to-[#5F7C7B] transition-all duration-300 shadow-[0_4px_15px_rgba(95,124,123,0.4)] hover:shadow-[0_8px_25px_rgba(95,124,123,0.6)] hover:-translate-y-0.5 cursor-pointer overflow-hidden group select-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E2D4C5]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
              <span className="relative z-10">JOIN SOCIETY</span>
            </button>
          </form>
        </motion.div>

        {/* 3. MULTI-COLUMN CONTENT AREA */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-6"
        >
          {/* Column 1: Branding */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3 relative">
            {/* Soft glow behind logo */}
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#5F7C7B]/20 rounded-full blur-[25px] pointer-events-none -z-10"></div>
            
            <Link to="/" className="text-2xl font-bold font-heading tracking-[0.25em] uppercase flex items-center gap-1.5 text-white">
              BAYLEAF<span className="w-2 h-2 rounded-full bg-[#E2D4C5] shadow-[0_0_10px_rgba(226,212,197,0.8)]"></span>
            </Link>
            <p className="text-[#D8E4EE]/70 leading-relaxed font-light text-xs max-w-sm">
              Elevating the daily ritual. A modern approach to specialty coffee and artisanal baking, inspired by cinematic elegance and curated refinement.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-2 mt-2">
              {[
                { icon: <FaInstagram size={13} />, href: '#', name: 'Instagram' },
                { icon: <FaFacebookF size={13} />, href: '#', name: 'Facebook' },
                { icon: <FaTwitter size={13} />, href: '#', name: 'Twitter' },
                { icon: <FaPinterestP size={13} />, href: '#', name: 'Pinterest' }
              ].map((social, sIdx) => (
                <a 
                  key={sIdx} 
                  href={social.href}
                  aria-label={social.name}
                  className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#D8E4EE]/80 hover:text-white hover:border-[#5F7C7B]/60 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-[0_4px_12px_rgba(95,124,123,0.3)] group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[#5F7C7B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{social.icon}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-[10px] font-bold font-heading uppercase tracking-[0.25em] mb-4 text-[#E2D4C5]">Explore</h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 max-w-xs">
              {links.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link 
                    to={link.path} 
                    className="relative py-0.5 text-[#D8E4EE]/75 hover:text-white transition-colors duration-300 group inline-block font-light text-xs"
                  >
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#5F7C7B] group-hover:w-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(95,124,123,0.8)]"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-[10px] font-bold font-heading uppercase tracking-[0.25em] mb-4 text-[#E2D4C5]">Contact</h3>
            <ul className="space-y-2.5 text-xs font-light text-[#D8E4EE]/70">
              <li className="flex items-start gap-2.5 group">
                <FiMapPin className="text-[#5F7C7B] mt-0.5 group-hover:text-white transition-colors duration-300" size={15} />
                <span>124 Soho Square, London, W1D 3NT</span>
              </li>
              <li className="flex items-center gap-2.5 group">
                <FiPhone className="text-[#5F7C7B] group-hover:text-white transition-colors duration-300" size={15} />
                <span>+44 20 7123 4567</span>
              </li>
              <li className="flex items-center gap-2.5 group">
                <FiMail className="text-[#5F7C7B] group-hover:text-white transition-colors duration-300" size={15} />
                <a href="mailto:hello@bayleafcafe.in" className="hover:text-white transition-colors duration-200">hello@bayleafcafe.in</a>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Opening Hours */}
          <motion.div variants={itemVariants}>
            <h3 className="text-[10px] font-bold font-heading uppercase tracking-[0.25em] mb-4 text-[#E2D4C5]">Hours</h3>
            <ul className="space-y-2.5 text-xs font-light text-[#D8E4EE]/70">
              <li className="flex items-start gap-2.5 group">
                <FiClock className="text-[#5F7C7B] mt-0.5 group-hover:text-white transition-colors duration-300" size={15} />
                <div>
                  <h4 className="font-heading font-medium text-white/90 text-xs mb-0.5">Espresso Bar</h4>
                  <p>Mon - Fri: 8:00am - 9:00pm</p>
                  <p>Sat - Sun: 9:00am - 10:00pm</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* 4. FOOTER BOTTOM BAR */}
        <div className="pt-5 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-light text-[#D8E4EE]/55">
          <p>&copy; {new Date().getFullYear()} BAYLEAF Café. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
          </div>
          <p className="tracking-widest text-[#E2D4C5]/60 uppercase text-[9px]">Designed by BAYLEAF</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
