import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animations
      gsap.from('.contact-hero-text', {
        y: 60, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2
      });

      // Form and Cards Stagger Reveal
      gsap.from('.contact-card', {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
        }
      });

      gsap.from('.form-element', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-form-container',
          start: 'top 85%',
        }
      });
      
      // Parallax Image
      gsap.to('.contact-img-parallax', {
        y: '10%', ease: 'none',
        scrollTrigger: {
          trigger: '.contact-img-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-soft-ivory)] min-h-screen text-[var(--color-gray-blue)] overflow-x-hidden font-body selection:bg-[var(--color-muted-teal)] selection:text-white">
      
      {/* GLOBAL AMBIENT BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[var(--color-powder-blue)]/50 rounded-full blur-[130px] mix-blend-multiply"
          animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* LUXURY EDITORIAL HERO */}
      <section className="relative pt-24 pb-12 px-6 lg:px-12 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <div className="overflow-hidden mb-4">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--color-muted-teal)] block contact-hero-text">Get In Touch</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-heading font-medium text-[var(--color-rich-graphite)] leading-[0.9] mb-4 tracking-tight overflow-hidden">
            <span className="block contact-hero-text">Say <span className="italic font-light text-[var(--color-deep-slate)]">Hello.</span></span>
          </h1>
          
          <div className="w-24 h-[1px] bg-[var(--color-silver-fog)] mx-auto mb-4 contact-hero-text"></div>
          
          <p className="text-lg text-[var(--color-gray-blue)] max-w-lg mx-auto leading-relaxed font-light contact-hero-text">
            Whether you have a question about our roasts, want to host an event, or just want to say hi, our team is always here for you.
          </p>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="contact-section py-12 px-6 lg:px-12 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Contact Info & Image */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              {[
                { icon: <FiMapPin size={24} />, title: 'Our Location', detail: '124 Soho Square, London, W1D 3NT' },
                { icon: <FiPhone size={24} />, title: 'Call Us', detail: '+44 20 7123 4567' },
                { icon: <FiMail size={24} />, title: 'Email', detail: 'hello@bayleafcafe.in' }
              ].map((item, idx) => (
                <div key={idx} className="contact-card flex items-start gap-8 p-6 bg-[var(--color-soft-ivory)]/60 backdrop-blur-xl rounded-[2.5rem] border border-[var(--color-silver-fog)]/50 hover:bg-white hover:shadow-[0_20px_40px_rgba(56,68,80,0.08)] transition-all duration-500 group">
                  <div className="text-[var(--color-silver-fog)] group-hover:text-[var(--color-muted-teal)] transition-colors duration-500 mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-medium text-[var(--color-rich-graphite)] mb-1">{item.title}</h3>
                    <p className="text-[var(--color-gray-blue)] font-light">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Aesthetic Image */}
            <div className="contact-img-container aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-[0_30px_60px_rgba(47,52,59,0.15)] mt-4 hidden lg:block border border-[var(--color-silver-fog)] bg-white p-3">
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                <div className="absolute inset-0 bg-[var(--color-deep-slate)]/10 z-10 mix-blend-overlay"></div>
                <img 
                  src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop" 
                  alt="Cafe Details" 
                  className="w-full h-[130%] object-cover contact-img-parallax -translate-y-[15%]"
                />
              </div>
            </div>
            
          </div>

          {/* Right Column: Luxury Form */}
          <div className="lg:col-span-7 contact-form-container relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-powder-blue)]/60 to-[var(--color-sage-mist)]/40 rounded-[3rem] transform translate-x-4 translate-y-4 -z-10 blur-xl opacity-60"></div>
            
            <div className="bg-[var(--color-soft-ivory)]/80 backdrop-blur-2xl p-6 lg:p-10 rounded-[3rem] shadow-[0_30px_60px_rgba(56,68,80,0.1)] border border-[var(--color-silver-fog)]/60 relative overflow-hidden">
              <h2 className="text-4xl lg:text-5xl font-heading font-medium text-[var(--color-rich-graphite)] mb-6 form-element">Drop us a line</h2>
              
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 form-element group">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">First Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane"
                      className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-2 text-[var(--color-rich-graphite)] placeholder-[var(--color-silver-fog)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2 form-element group">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe"
                      className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-2 text-[var(--color-rich-graphite)] placeholder-[var(--color-silver-fog)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 form-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="jane@example.com"
                    className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-2 text-[var(--color-rich-graphite)] placeholder-[var(--color-silver-fog)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none"
                  />
                </div>

                <div className="flex flex-col gap-2 form-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Subject</label>
                  <input 
                    type="text" 
                    placeholder="How can we help?"
                    className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-2 text-[var(--color-rich-graphite)] placeholder-[var(--color-silver-fog)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none"
                  />
                </div>

                <div className="flex flex-col gap-2 form-element group">
                  <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-deep-slate)]/60 group-focus-within:text-[var(--color-muted-teal)] transition-colors">Message</label>
                  <textarea 
                    rows="4"
                    placeholder="Tell us about it..."
                    className="w-full bg-transparent border-b border-[var(--color-silver-fog)] py-2 text-[var(--color-rich-graphite)] placeholder-[var(--color-silver-fog)] focus:outline-none focus:border-[var(--color-muted-teal)] transition-colors rounded-none resize-none"
                  ></textarea>
                </div>

                <button 
                  type="button"
                  className="form-element self-start mt-4 flex items-center justify-center gap-4 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white px-12 py-5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.4)] group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
                  <span className="relative z-10">SEND MESSAGE</span>
                </button>
              </form>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
