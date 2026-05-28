import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, bgImage }) => {
  return (
    <section className="relative h-[350px] lg:h-[450px] w-full flex items-center justify-center overflow-hidden bg-[var(--color-soft-ivory)]">
      
      {/* Soft Image Blend Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity grayscale-[20%]" 
          style={{ backgroundImage: `url(${bgImage})` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-soft-ivory)]/40 via-[var(--color-powder-blue)]/20 to-[var(--color-soft-ivory)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-soft-ivory)] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-6 mt-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="mb-4 px-6 py-2 rounded-full border border-[var(--color-muted-teal)]/30 bg-[var(--color-silver-fog)]/30 backdrop-blur-md shadow-sm inline-block">
            <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-[var(--color-muted-teal)]">Bayleaf Experience</span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-heading text-[var(--color-rich-graphite)] font-medium tracking-tight mb-3">
            {title}<span className="text-[var(--color-muted-teal)] italic font-light">.</span>
          </h1>
          
          <div className="flex justify-center items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-gray-blue)]">
            <Link to="/" className="hover:text-[var(--color-muted-teal)] transition-colors duration-300">Home</Link>
            <span className="text-[var(--color-silver-fog)]">/</span>
            <span className="text-[var(--color-deep-slate)]">{title}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
