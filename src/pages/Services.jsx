import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero text
      gsap.from('.services-hero-text', {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2
      });

      // Parallax sections
      const sections = gsap.utils.toArray('.service-block');
      sections.forEach((section, i) => {
        gsap.from(section.querySelector('.service-content'), {
          y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const servicesList = [
    {
      title: 'Wholesale Partnerships',
      subtitle: 'For Cafes & Restaurants',
      desc: 'We partner with a select group of establishments that share our dedication to cinematic quality. Beyond providing freshly roasted, meticulously sourced beans, we offer comprehensive barista training and equipment consultation.',
      img: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=1200&auto=format&fit=crop',
      reverse: false
    },
    {
      title: 'Private Events',
      subtitle: 'Host in our space',
      desc: 'Our serene, cinematic interior provides the perfect backdrop for intimate gatherings, creative workshops, and corporate offsites. Available for exclusive evening hire.',
      img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
      reverse: true
    },
    {
      title: 'Catering & Mobile Bar',
      subtitle: 'Bayleaf at your venue',
      desc: 'Bring the premium Bayleaf experience to your next event. Our mobile espresso bar features the same high-end equipment and skilled baristas you find in our shop, ensuring a flawless cup every time.',
      img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop',
      reverse: false
    }
  ];

  return (
    <div ref={containerRef} className="bg-[var(--color-soft-ivory)] min-h-screen text-[var(--color-gray-blue)] font-body overflow-x-hidden selection:bg-[var(--color-muted-teal)] selection:text-white">
      
      {/* GLOBAL AMBIENT BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <motion.div 
          className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[var(--color-sage-mist)]/40 rounded-full blur-[140px] mix-blend-multiply"
          animate={{ x: [0, -40, 20, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[20%] left-[5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[var(--color-powder-blue)]/50 rounded-full blur-[120px] mix-blend-multiply"
          animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 lg:px-12 text-center border-b border-[var(--color-silver-fog)]/40 bg-[var(--color-silver-fog)]/10 backdrop-blur-3xl relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden mb-4">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--color-muted-teal)] block services-hero-text">Beyond the Cup</span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-[8rem] font-heading font-medium leading-[0.9] mb-4 tracking-tight services-hero-text text-[var(--color-rich-graphite)]">
            Our <span className="italic font-light text-[var(--color-deep-slate)]">Services.</span>
          </h1>
          <p className="text-lg text-[var(--color-gray-blue)] font-light max-w-xl mx-auto leading-relaxed services-hero-text">
            Extending our philosophy of premium cinematic craft and exceptional quality to wholesale, events, and catering.
          </p>
        </div>
      </section>

      {/* PARALLAX SERVICE BLOCKS */}
      <section className="py-16 lg:py-20 flex flex-col gap-20 relative z-20">
        {servicesList.map((service, idx) => (
          <div key={idx} className="service-block group max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            <div className={`aspect-[4/5] rounded-[3.5rem] overflow-hidden relative shadow-[0_30px_60px_rgba(56,68,80,0.1)] border border-[var(--color-silver-fog)]/60 bg-white p-3 ${service.reverse ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-slate)]/20 to-transparent z-10 mix-blend-overlay"></div>
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                />
              </div>
            </div>
            
            <div className={`service-content ${service.reverse ? 'lg:order-1 lg:pr-12' : 'lg:order-2 lg:pl-12'}`}>
              <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-muted-teal)] mb-3">
                <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span> {service.subtitle}
              </span>
              <h2 className="text-4xl lg:text-6xl font-heading font-medium text-[var(--color-rich-graphite)] mb-4 leading-[1.1]">{service.title}</h2>
              <p className="text-[var(--color-gray-blue)] text-lg font-light leading-relaxed mb-5">
                {service.desc}
              </p>
              <Link to="/contact" className="inline-flex flex-col gap-2 group">
                <span className="text-[var(--color-deep-slate)] text-[11px] font-bold uppercase tracking-[0.2em] group-hover:text-[var(--color-muted-teal)] transition-colors duration-300">INQUIRE NOW</span>
                <span className="block w-8 h-[1px] bg-[var(--color-deep-slate)] group-hover:bg-[var(--color-muted-teal)] group-hover:w-16 transition-all duration-300"></span>
              </Link>
            </div>
            
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-12 text-center mx-4 lg:mx-8 mb-12 relative z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-powder-blue)]/30 to-[var(--color-sage-mist)]/20 backdrop-blur-3xl rounded-[4rem] border border-[var(--color-silver-fog)]/50 shadow-[0_20px_40px_rgba(56,68,80,0.05)] -z-10"></div>
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--color-muted-teal)] block mb-4">Work With Us</span>
          <h2 className="text-5xl lg:text-7xl font-heading font-medium text-[var(--color-rich-graphite)] mb-6 leading-tight">Ready to <span className="italic font-light text-[var(--color-deep-slate)]">collaborate?</span></h2>
          <p className="text-lg text-[var(--color-gray-blue)] font-light mb-8 max-w-xl mx-auto leading-relaxed">Reach out to our team to discuss your specific needs and create something exceptional.</p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-4 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white px-12 py-5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.4)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <span className="relative z-10">CONTACT US</span>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Services;
