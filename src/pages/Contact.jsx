import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMapPin, FiPhone, FiMail, FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animations
      gsap.from('.contact-hero-text', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      // Form and Cards Stagger Reveal
      gsap.from('.contact-card', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
        }
      });

      gsap.from('.form-element', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-form-container',
          start: 'top 85%',
        }
      });
      
      // Parallax Image
      gsap.to('.contact-img-parallax', {
        y: '15%',
        ease: 'none',
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
    <div ref={containerRef} className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-forest)] overflow-hidden font-body">
      
      {/* LUXURY EDITORIAL HERO */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12 flex flex-col items-center border-b border-[var(--color-olive)]/20 bg-gradient-to-b from-[var(--color-linen)] to-[var(--color-ivory)]">
        <div className="max-w-4xl mx-auto text-center z-10">
          <div className="overflow-hidden mb-6">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-sage)] block contact-hero-text">Get In Touch</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-[7rem] font-heading font-medium text-[var(--color-forest)] leading-[0.9] mb-8 tracking-tight overflow-hidden">
            <span className="block contact-hero-text">Say Hello</span>
          </h1>
          
          <div className="w-16 h-[1px] bg-[var(--color-olive)] mx-auto mb-8 contact-hero-text"></div>
          
          <p className="text-lg text-[var(--color-forest)]/70 max-w-lg mx-auto leading-relaxed font-light contact-hero-text">
            Whether you have a question about our roasts, want to host an event, or just want to say hi, our team is always here for you.
          </p>
        </div>
        
        {/* Soft decorative blur */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--color-sage)]/10 rounded-full blur-[100px] -z-10 -translate-x-1/2"></div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="contact-section py-24 px-6 lg:px-12 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Contact Info & Image */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            
            {/* Info Cards */}
            <div className="flex flex-col gap-6">
              {[
                { icon: <FiMapPin size={24} />, title: 'Our Location', detail: '124 Soho Square, London, W1D 3NT' },
                { icon: <FiPhone size={24} />, title: 'Call Us', detail: '+44 20 7123 4567' },
                { icon: <FiMail size={24} />, title: 'Email', detail: 'hello@bayleafcafe.in' }
              ].map((item, idx) => (
                <div key={idx} className="contact-card flex items-start gap-6 p-8 bg-[var(--color-linen)]/50 rounded-[2rem] border border-[var(--color-olive)]/10 hover:border-[var(--color-terracotta)]/30 transition-colors duration-500">
                  <div className="text-[var(--color-sage)] mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-medium text-[var(--color-forest)] mb-2">{item.title}</h3>
                    <p className="text-[var(--color-forest)]/70 font-light">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Aesthetic Image */}
            <div className="contact-img-container aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-luxury mt-8 hidden lg:block">
              <div className="absolute inset-0 bg-[var(--color-forest)]/10 z-10 mix-blend-overlay"></div>
              <img 
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop" 
                alt="Cafe Details" 
                className="w-full h-[130%] object-cover contact-img-parallax -translate-y-[15%]"
              />
            </div>
            
          </div>

          {/* Right Column: Luxury Form */}
          <div className="lg:col-span-7 contact-form-container">
            <div className="bg-[var(--color-ivory)] p-8 lg:p-16 rounded-[3rem] shadow-luxury border border-[var(--color-linen)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-linen)] rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
              
              <h2 className="text-3xl lg:text-5xl font-heading font-medium text-[var(--color-forest)] mb-12 form-element">Drop us a line</h2>
              
              <form className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2 form-element group">
                    <label className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)] transition-colors">First Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane"
                      className="w-full bg-transparent border-b-2 border-[var(--color-olive)]/30 py-4 text-[var(--color-forest)] placeholder-[var(--color-olive)]/50 focus:outline-none focus:border-[var(--color-sage)] transition-colors rounded-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2 form-element group">
                    <label className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)] transition-colors">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe"
                      className="w-full bg-transparent border-b-2 border-[var(--color-olive)]/30 py-4 text-[var(--color-forest)] placeholder-[var(--color-olive)]/50 focus:outline-none focus:border-[var(--color-sage)] transition-colors rounded-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 form-element group">
                  <label className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)] transition-colors">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="jane@example.com"
                    className="w-full bg-transparent border-b-2 border-[var(--color-olive)]/30 py-4 text-[var(--color-forest)] placeholder-[var(--color-olive)]/50 focus:outline-none focus:border-[var(--color-sage)] transition-colors rounded-none"
                  />
                </div>

                <div className="flex flex-col gap-2 form-element group">
                  <label className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)] transition-colors">Subject</label>
                  <input 
                    type="text" 
                    placeholder="How can we help?"
                    className="w-full bg-transparent border-b-2 border-[var(--color-olive)]/30 py-4 text-[var(--color-forest)] placeholder-[var(--color-olive)]/50 focus:outline-none focus:border-[var(--color-sage)] transition-colors rounded-none"
                  />
                </div>

                <div className="flex flex-col gap-2 form-element group">
                  <label className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-forest)]/60 group-focus-within:text-[var(--color-sage)] transition-colors">Message</label>
                  <textarea 
                    rows="4"
                    placeholder="Tell us about it..."
                    className="w-full bg-transparent border-b-2 border-[var(--color-olive)]/30 py-4 text-[var(--color-forest)] placeholder-[var(--color-olive)]/50 focus:outline-none focus:border-[var(--color-sage)] transition-colors rounded-none resize-none"
                  ></textarea>
                </div>

                <button 
                  type="button"
                  className="form-element self-start mt-6 flex items-center gap-4 bg-[var(--color-forest)] text-[var(--color-ivory)] px-10 py-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[var(--color-terracotta)] transition-colors duration-500 group overflow-hidden relative"
                >
                  <span className="relative z-10">Send Message</span>
                  <FiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
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
