import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[var(--color-soft-ivory)] relative pt-32 pb-12 text-[var(--color-gray-blue)] border-t border-[var(--color-silver-fog)]/40 font-body overflow-hidden">
      
      {/* Ambient Footer Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[var(--color-powder-blue)]/50 rounded-full blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-[var(--color-sage-mist)]/40 rounded-full blur-[100px] mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-3xl font-bold font-heading tracking-widest uppercase flex items-center gap-1.5 mb-8 text-[var(--color-rich-graphite)]">
              BAYLEAF<span className="w-2 h-2 rounded-full bg-[var(--color-muted-teal)] shadow-[0_0_10px_rgba(95,124,123,0.5)]"></span>
            </Link>
            <p className="max-w-md text-[var(--color-gray-blue)] leading-relaxed mb-10 font-light text-lg">
              Elevating the daily ritual. A modern approach to specialty coffee and artisanal baking, inspired by cinematic elegance and curated refinement.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 rounded-full bg-[var(--color-silver-fog)]/30 backdrop-blur-sm border border-[var(--color-silver-fog)]/60 flex items-center justify-center text-[var(--color-deep-slate)] hover:bg-[var(--color-deep-slate)] hover:text-[var(--color-soft-ivory)] hover:border-transparent transition-all duration-500 hover:-translate-y-1 shadow-sm">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-[var(--color-silver-fog)]/30 backdrop-blur-sm border border-[var(--color-silver-fog)]/60 flex items-center justify-center text-[var(--color-deep-slate)] hover:bg-[var(--color-deep-slate)] hover:text-[var(--color-soft-ivory)] hover:border-transparent transition-all duration-500 hover:-translate-y-1 shadow-sm">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h3 className="text-[10px] font-bold font-heading uppercase tracking-[0.2em] mb-8 text-[var(--color-deep-slate)]">Explore</h3>
            <ul className="space-y-5 font-light text-[var(--color-gray-blue)]">
              <li><Link to="/menu" className="hover:text-[var(--color-muted-teal)] transition-colors duration-300">The Menu</Link></li>
              <li><Link to="/about" className="hover:text-[var(--color-muted-teal)] transition-colors duration-300">Our Story</Link></li>
              <li><Link to="/shop" className="hover:text-[var(--color-muted-teal)] transition-colors duration-300">Shop Beans</Link></li>
              <li><Link to="/blog" className="hover:text-[var(--color-muted-teal)] transition-colors duration-300">Journal</Link></li>
            </ul>
          </div>

          {/* Visit Col */}
          <div>
            <h3 className="text-[10px] font-bold font-heading uppercase tracking-[0.2em] mb-8 text-[var(--color-deep-slate)]">Visit Us</h3>
            <ul className="space-y-5 font-light text-[var(--color-gray-blue)]">
              <li className="leading-relaxed">
                124 Soho Square<br />
                London, W1D 3NT
              </li>
              <li className="pt-3">
                <a href="mailto:hello@bayleafcafe.in" className="inline-block hover:text-[var(--color-muted-teal)] transition-colors duration-300 border-b border-[var(--color-silver-fog)] pb-1">
                  hello@bayleafcafe.in
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-[var(--color-silver-fog)]/50 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-light text-[var(--color-gray-blue)]/80">
          <p>&copy; {new Date().getFullYear()} Bayleaf Cafe. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[var(--color-deep-slate)] transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-deep-slate)] transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
