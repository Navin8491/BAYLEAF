import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero text
      gsap.from('.services-hero-text', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      // Parallax sections
      const sections = gsap.utils.toArray('.service-block');
      sections.forEach((section, i) => {
        gsap.from(section.querySelector('.service-content'), {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          }
        });
        
        gsap.to(section.querySelector('.service-img-parallax'), {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
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
      desc: 'We partner with a select group of establishments that share our dedication to quality. Beyond providing freshly roasted, meticulously sourced beans, we offer comprehensive barista training and equipment consultation.',
      img: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=1200&auto=format&fit=crop',
      reverse: false
    },
    {
      title: 'Private Events',
      subtitle: 'Host in our space',
      desc: 'Our serene, Scandinavian-inspired interior provides the perfect backdrop for intimate gatherings, creative workshops, and corporate offsites. Available for exclusive evening hire.',
      img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
      reverse: true
    },
    {
      title: 'Catering & Mobile Bar',
      subtitle: 'Bayleaf at your venue',
      desc: 'Bring the Bayleaf experience to your next event. Our mobile espresso bar features the same high-end equipment and skilled baristas you find in our shop, ensuring a flawless cup every time.',
      img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop',
      reverse: false
    }
  ];

  return (
    <div ref={containerRef} className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-forest)] font-body overflow-hidden">
      
      {/* HERO */}
      <section className="pt-40 pb-24 px-6 lg:px-12 text-center border-b border-[var(--color-olive)]/20 bg-[var(--color-linen)]">
        <div className="max-w-3xl mx-auto">
          <div className="overflow-hidden mb-6">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-sage)] block services-hero-text">Beyond the Cup</span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-[7rem] font-heading font-medium leading-[0.9] mb-8 tracking-tight services-hero-text">
            Our Services
          </h1>
          <p className="text-lg text-[var(--color-forest)]/70 font-light max-w-xl mx-auto leading-relaxed services-hero-text">
            Extending our philosophy of minimalist craft and exceptional quality to wholesale, events, and catering.
          </p>
        </div>
      </section>

      {/* PARALLAX SERVICE BLOCKS */}
      <section className="py-24 flex flex-col gap-32">
        {servicesList.map((service, idx) => (
          <div key={idx} className="service-block max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className={`aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-luxury ${service.reverse ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="absolute inset-0 bg-[var(--color-forest)]/10 z-10 mix-blend-overlay"></div>
              <img 
                src={service.img} 
                alt={service.title} 
                className="w-full h-[120%] object-cover service-img-parallax -translate-y-[10%]"
              />
            </div>
            
            <div className={`service-content ${service.reverse ? 'lg:order-1 lg:pr-12' : 'lg:order-2 lg:pl-12'}`}>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-sage)] mb-6 block">{service.subtitle}</span>
              <h2 className="text-4xl lg:text-5xl font-heading font-medium text-[var(--color-forest)] mb-8 leading-tight">{service.title}</h2>
              <p className="text-[var(--color-forest)]/70 text-lg font-light leading-relaxed mb-10">
                {service.desc}
              </p>
              <Link to="/contact" className="inline-block border-b border-[var(--color-forest)] text-[var(--color-forest)] font-bold uppercase tracking-[0.1em] text-xs pb-1 hover:text-[var(--color-terracotta)] hover:border-[var(--color-terracotta)] transition-colors">
                Inquire Now
              </Link>
            </div>
            
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-32 px-6 lg:px-12 text-center bg-[var(--color-forest)] text-[var(--color-ivory)] mx-4 lg:mx-8 mb-24 rounded-[3rem]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-heading font-medium mb-8">Ready to collaborate?</h2>
          <p className="text-lg text-[var(--color-ivory)]/70 font-light mb-10">Reach out to our team to discuss your specific needs.</p>
          <Link to="/contact" className="bg-[var(--color-ivory)] text-[var(--color-forest)] px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--color-sage)] hover:text-[var(--color-ivory)] transition-colors duration-500">
            Contact Us
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Services;
