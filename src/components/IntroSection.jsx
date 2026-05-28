import React from 'react';
import { FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const IntroSection = () => {
  return (
    <section className="relative -mt-20 z-20 pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row shadow-2xl shadow-slate-200/50 rounded-2xl overflow-hidden">
          
          {/* Info Blocks */}
          <div className="lg:w-2/3 bg-[var(--color-primary)] flex flex-col md:flex-row">
            {/* Phone */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-1 p-6 flex gap-4 text-white hover:bg-black/10 transition-colors"
            >
              <FiPhone className="text-4xl flex-shrink-0" />
              <div>
                <h3 className="text-lg font-heading mb-1">000 (123) 456 7890</h3>
                <p className="text-sm opacity-90 leading-relaxed">A small river named Duden flows by their place and supplies.</p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 p-6 flex gap-4 text-white bg-black/5 hover:bg-black/10 transition-colors"
            >
              <FiMapPin className="text-4xl flex-shrink-0" />
              <div>
                <h3 className="text-lg font-heading mb-1">198 West 21th Street</h3>
                <p className="text-sm opacity-90 leading-relaxed">203 Fake St. Mountain View, San Francisco, California, USA</p>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 p-6 flex gap-4 text-white hover:bg-black/10 transition-colors"
            >
              <FiClock className="text-4xl flex-shrink-0" />
              <div>
                <h3 className="text-lg font-heading mb-1">Open Monday-Friday</h3>
                <p className="text-sm opacity-90 leading-relaxed">8:00am - 9:00pm</p>
              </div>
            </motion.div>
          </div>

          {/* Book a Table Form */}
          <div className="lg:w-1/3 bg-white p-6 md:p-8">
            <h3 className="text-2xl font-heading text-[var(--color-primary)] mb-6 font-bold">Book a Table</h3>
            <form className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-900 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none transition-all" />
                <input type="text" placeholder="Last Name" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-900 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none transition-all" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="date" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-600 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none transition-all" />
                <input type="time" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-600 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none transition-all" />
                <input type="tel" placeholder="Phone" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-900 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none transition-all" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-stretch">
                <textarea placeholder="Message" rows="2" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-900 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none transition-all resize-none"></textarea>
                <button type="button" className="bg-[var(--color-primary)] text-white px-6 rounded-lg font-medium uppercase tracking-[1px] shadow-lg shadow-[var(--color-primary)]/30 hover:shadow-none hover:bg-slate-900 transition-all duration-300">
                  Appointment
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IntroSection;
