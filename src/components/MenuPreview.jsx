import React from 'react';
import { motion } from 'framer-motion';

const MenuPreview = () => {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          
          {/* Text Section */}
          <div className="lg:w-1/2 text-center lg:text-right pr-0 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-script text-[var(--color-primary)] text-3xl block mb-2">Discover</span>
              <h2 className="text-4xl lg:text-5xl font-heading text-slate-900 font-bold tracking-wide mb-3">Our Menu</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
              </p>
              <button className="bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-4 font-medium uppercase tracking-[2px] text-sm hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 rounded-lg shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-none">
                View Full Menu
              </button>
            </motion.div>
          </div>

          {/* Image Grid */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-64 lg:h-[300px]"
              >
                <img src="/images/menu-1.jpg" alt="Menu 1" className="w-full h-full object-cover rounded-2xl shadow-md" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="h-64 lg:h-[300px] mt-0 lg:mt-4"
              >
                <img src="/images/menu-2.jpg" alt="Menu 2" className="w-full h-full object-cover rounded-2xl shadow-md" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="h-64 lg:h-[300px]"
              >
                <img src="/images/menu-3.jpg" alt="Menu 3" className="w-full h-full object-cover rounded-2xl shadow-md" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="h-64 lg:h-[300px] mt-0 lg:mt-4"
              >
                <img src="/images/menu-4.jpg" alt="Menu 4" className="w-full h-full object-cover rounded-2xl shadow-md" />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MenuPreview;
