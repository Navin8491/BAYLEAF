import React from 'react';
import { motion } from 'framer-motion';

const MapAppointmentSection = () => {
  return (
    <section className="relative bg-[var(--color-soft-ivory)] border-t border-[var(--color-silver-fog)]/30 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        
        {/* Map Area */}
        <div className="w-full lg:w-1/2 min-h-[500px] relative">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent to-[var(--color-soft-ivory)]/20 pointer-events-none"></div>
          {/* Grayscale filter for luxury aesthetic map */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019112484218!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050f14!2sSan+Francisco%2C+CA!5e0!3m2!1sen!2sus!4v1612345678901!5m2!1sen!2sus" 
            className="w-full h-full absolute inset-0 border-0 grayscale-[80%] opacity-80" 
            allowFullScreen="" 
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>

        {/* Appointment Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-20 relative flex items-center justify-center">
          
          {/* Decorative ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[var(--color-powder-blue)]/30 to-[var(--color-sage-mist)]/20 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-multiply"></div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg mx-auto bg-[var(--color-soft-ivory)]/90 backdrop-blur-2xl p-10 lg:p-12 rounded-[3rem] shadow-[0_30px_60px_rgba(56,68,80,0.08)] border border-[var(--color-silver-fog)]/50"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--color-muted-teal)] mb-4 block">Reservations</span>
            <h3 className="text-4xl lg:text-5xl font-heading text-[var(--color-rich-graphite)] mb-10 leading-tight">Book a <span className="italic font-light text-[var(--color-deep-slate)]">Table.</span></h3>
            
            <form className="space-y-6 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <input type="text" placeholder="First Name" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] placeholder-[var(--color-silver-fog)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none" />
                </div>
                <div className="group">
                  <input type="text" placeholder="Last Name" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] placeholder-[var(--color-silver-fog)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input type="date" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-gray-blue)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none" />
                <input type="time" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-gray-blue)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none" />
                <input type="tel" placeholder="Phone" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] placeholder-[var(--color-silver-fog)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none" />
              </div>
              <div>
                <textarea placeholder="Special Requests" rows="3" className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-3 text-[var(--color-rich-graphite)] placeholder-[var(--color-silver-fog)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none resize-none"></textarea>
              </div>
              <div className="pt-4">
                <button type="button" className="w-full flex items-center justify-center gap-4 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white px-10 py-5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.4)] group overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                   <span className="relative z-10">CONFIRM BOOKING</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default MapAppointmentSection;
