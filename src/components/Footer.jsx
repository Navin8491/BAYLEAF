import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[var(--color-linen)] pt-24 pb-12 text-[var(--color-forest)] border-t border-[var(--color-olive)]/20 font-body">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-3xl font-bold font-heading tracking-widest uppercase flex items-center gap-1 mb-6">
              BAYLEAF<span className="w-2 h-2 rounded-full bg-[var(--color-terracotta)]"></span>
            </Link>
            <p className="max-w-md text-[var(--color-forest)]/80 leading-relaxed mb-8 font-light">
              Elevating the daily ritual. A modern approach to specialty coffee and artisanal baking, inspired by the minimalist elegance of Scandinavian design and the vibrant culture of London.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--color-olive)] flex items-center justify-center hover:bg-[var(--color-forest)] hover:text-[var(--color-ivory)] hover:border-transparent transition-all duration-300">
                <FiInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--color-olive)] flex items-center justify-center hover:bg-[var(--color-forest)] hover:text-[var(--color-ivory)] hover:border-transparent transition-all duration-300">
                <FiTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h3 className="text-sm font-bold font-heading uppercase tracking-[0.2em] mb-6 text-[var(--color-forest)]">Explore</h3>
            <ul className="space-y-4 font-light text-[var(--color-forest)]/80">
              <li><Link to="/menu" className="hover:text-[var(--color-terracotta)] transition-colors">The Menu</Link></li>
              <li><Link to="/about" className="hover:text-[var(--color-terracotta)] transition-colors">Our Story</Link></li>
              <li><Link to="/shop" className="hover:text-[var(--color-terracotta)] transition-colors">Shop Beans</Link></li>
              <li><Link to="/blog" className="hover:text-[var(--color-terracotta)] transition-colors">Journal</Link></li>
            </ul>
          </div>

          {/* Visit Col */}
          <div>
            <h3 className="text-sm font-bold font-heading uppercase tracking-[0.2em] mb-6 text-[var(--color-forest)]">Visit Us</h3>
            <ul className="space-y-4 font-light text-[var(--color-forest)]/80">
              <li className="leading-relaxed">
                124 Soho Square<br />
                London, W1D 3NT
              </li>
              <li className="pt-2">
                <a href="mailto:hello@bayleafcafe.in" className="hover:text-[var(--color-terracotta)] transition-colors border-b border-[var(--color-olive)]/30 pb-1">
                  hello@bayleafcafe.in
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-olive)]/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-[var(--color-forest)]/60">
          <p>&copy; {new Date().getFullYear()} Bayleaf Cafe. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--color-forest)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-forest)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
