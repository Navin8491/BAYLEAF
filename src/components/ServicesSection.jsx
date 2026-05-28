import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: "📋", // Placeholder for icon
    title: "Easy to Order",
    desc: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic."
  },
  {
    icon: "🚚", // Placeholder for icon
    title: "Fastest Delivery",
    desc: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic."
  },
  {
    icon: "☕", // Placeholder for icon
    title: "Quality Coffee",
    desc: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic."
  }
];

const ServicesSection = () => {
  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-white rounded-2xl shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-24 h-24 mx-auto mb-3 flex justify-center items-center text-4xl border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-300 cursor-pointer">
                {service.icon}
              </div>
              <h3 className="text-xl font-heading text-slate-900 mb-2 tracking-wide font-bold">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
