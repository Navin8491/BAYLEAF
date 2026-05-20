import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animations
      gsap.from('.hero-title-word', {
        y: 80, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2
      });

      gsap.from('.hero-subtitle', {
        y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.8
      });

      gsap.from('.hero-image', {
        scale: 1.05, opacity: 0, duration: 1.5, ease: 'power2.out', delay: 0.5
      });

      // Section reveal animations
      const sections = gsap.utils.toArray('.reveal-section');
      sections.forEach((section) => {
        gsap.from(section, {
          y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        });
      });

      // Gallery stagger
      gsap.from('.gallery-item', {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gallery-container',
          start: 'top 80%',
        }
      });
      
      // Removed value-card animation to ensure content is always visible and doesn't leave blank space

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-soft-ivory)] text-[var(--color-gray-blue)] font-body overflow-x-hidden selection:bg-[var(--color-muted-teal)] selection:text-white">
      
      {/* GLOBAL AMBIENT BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-[10%] right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[var(--color-sage-mist)]/40 rounded-full blur-[140px] mix-blend-multiply"
          animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[10%] left-[5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[var(--color-powder-blue)]/50 rounded-full blur-[120px] mix-blend-multiply"
          animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 lg:px-12 pt-32 pb-12">
        <div className="absolute inset-0 bg-[var(--color-silver-fog)]/20 z-0 rounded-b-[4rem] mx-4 lg:mx-8 backdrop-blur-3xl shadow-[0_20px_40px_rgba(56,68,80,0.05)] border-b border-x border-[var(--color-silver-fog)]/40"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-6 overflow-hidden hero-subtitle">
            <span className="font-heading text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--color-muted-teal)] block">Welcome to Bayleaf</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[8.5rem] font-heading font-medium text-[var(--color-rich-graphite)] leading-[0.95] mb-8 tracking-tight flex flex-wrap justify-center gap-x-4 lg:gap-x-6">
            <div className="overflow-hidden"><span className="hero-title-word inline-block">The</span></div>
            <div className="overflow-hidden"><span className="hero-title-word inline-block">Art</span></div>
            <div className="overflow-hidden"><span className="hero-title-word inline-block">Of</span></div>
            <div className="overflow-hidden"><span className="hero-title-word inline-block text-[var(--color-muted-teal)] italic font-light">Coffee.</span></div>
          </h1>
          <p className="max-w-2xl text-lg font-light text-[var(--color-gray-blue)] hero-subtitle mb-16 leading-relaxed">
            A modern London-inspired café aesthetic blended with the minimal, warm essence of premium cinematic design. We craft moments, not just coffee.
          </p>
          <div className="w-full max-w-5xl h-[500px] md:h-[650px] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(47,52,59,0.15)] hero-image relative border border-[var(--color-silver-fog)] bg-white p-3">
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-inner">
               <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-deep-slate)]/20 to-transparent z-10 mix-blend-overlay"></div>
               <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1920&auto=format&fit=crop" alt="Cafe Interior" className="w-full h-full object-cover grayscale-[10%]" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. STORY / PHILOSOPHY SECTION */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 reveal-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-powder-blue)]/80 to-[var(--color-sage-mist)]/60 rounded-[3rem] transform -translate-x-6 translate-y-6 -z-10 blur-xl opacity-80"></div>
              
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(47,52,59,0.15)] relative border border-[var(--color-silver-fog)] bg-white p-3">
                 <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                   <div className="absolute inset-0 bg-[var(--color-deep-slate)]/10 z-10 mix-blend-overlay"></div>
                   <img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop" alt="Pouring coffee" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-in-out" />
                 </div>
              </div>
              <div className="absolute -bottom-16 -right-12 w-2/3 aspect-square rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(47,52,59,0.2)] border border-[var(--color-silver-fog)] bg-white p-2 hidden md:block z-20">
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=800&auto=format&fit=crop" alt="Coffee beans" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:pl-12">
              <span className="inline-flex items-center gap-2 text-[var(--color-muted-teal)] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                 <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span> Our Philosophy
              </span>
              <h2 className="text-5xl lg:text-7xl font-heading font-medium text-[var(--color-rich-graphite)] mb-10 leading-[1.05]">
                Simplicity <br /> meets <span className="italic font-light text-[var(--color-deep-slate)]">perfection.</span>
              </h2>
              <div className="space-y-8 text-[var(--color-gray-blue)] text-lg font-light leading-relaxed">
                <p>
                  Rooted in modern cinematic design and the vibrant coffee culture of London, we believe in stripping away the unnecessary to focus on what truly matters: exceptional quality, warmth, and connection.
                </p>
                <p>
                  Every cup we serve is a testament to our dedication to the craft. We source sustainably, roast meticulously, and brew with an unwavering attention to detail. 
                </p>
              </div>
              <div className="mt-14 flex items-center gap-6">
                <div className="w-24 h-[1px] bg-[var(--color-silver-fog)]"></div>
                <p className="font-heading font-medium tracking-[0.2em] uppercase text-xs text-[var(--color-deep-slate)]">Est. 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CULTURE / VALUES */}
      <section className="py-20 lg:py-24 relative z-20 mx-4 lg:mx-8 mb-16 px-6 lg:px-12 reveal-section">
        {/* Glassmorphism Background Panel */}
        <div className="absolute inset-0 bg-[var(--color-silver-fog)]/30 backdrop-blur-2xl rounded-[3rem] border border-[var(--color-silver-fog)]/50 shadow-[0_20px_40px_rgba(56,68,80,0.05)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto values-container relative z-10">
          <div className="text-center mb-12">
             <span className="inline-flex items-center gap-2 text-[var(--color-muted-teal)] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                 <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span> Core Principles <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span>
              </span>
            <h2 className="text-5xl lg:text-6xl font-heading font-medium text-[var(--color-rich-graphite)] mb-6">What Defines Us</h2>
            <p className="text-[var(--color-gray-blue)] max-w-2xl mx-auto text-lg font-light">The core values that shape every experience in our space.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { title: 'Ethical Sourcing', desc: 'We build direct relationships with farmers, ensuring fair wages and sustainable practices.' },
              { title: 'Minimalist Craft', desc: 'No clutter, no distractions. Just the pure, unadulterated taste of perfectly extracted coffee.' },
              { title: 'Community First', desc: 'Our space is designed to foster connection, creativity, and moments of quiet reflection.' }
            ].map((value, idx) => (
              <div key={idx} className="value-card bg-[var(--color-soft-ivory)]/80 backdrop-blur-xl border border-[var(--color-silver-fog)]/60 p-12 rounded-[2.5rem] shadow-[0_15px_30px_rgba(56,68,80,0.08)] hover:shadow-[0_25px_50px_rgba(56,68,80,0.15)] transition-all duration-500 hover:-translate-y-2 group">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] flex items-center justify-center mb-10 text-white font-heading font-medium text-xl shadow-[0_10px_20px_rgba(95,124,123,0.3)] group-hover:scale-110 transition-transform duration-500">
                  0{idx + 1}
                </div>
                <h3 className="text-2xl font-heading font-medium text-[var(--color-rich-graphite)] mb-5 group-hover:text-[var(--color-muted-teal)] transition-colors duration-300">{value.title}</h3>
                <p className="text-[var(--color-gray-blue)] font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY SECTION (Cinematic Upgrade) */}
      <section className="py-20 lg:py-24 px-6 lg:px-12 reveal-section relative z-20">
        <div className="max-w-7xl mx-auto gallery-container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div>
              <span className="inline-flex items-center gap-2 text-[var(--color-muted-teal)] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                 <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span> The Vibe
              </span>
              <h2 className="text-5xl lg:text-6xl font-heading font-medium text-[var(--color-rich-graphite)]">Aesthetic & <span className="italic font-light text-[var(--color-deep-slate)]">Space.</span></h2>
            </div>
            <p className="text-[var(--color-gray-blue)] max-w-md text-lg font-light">
              A glimpse into our serene environment designed for focus, luxury, and relaxation.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600&auto=format&fit=crop', 
              'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=800&auto=format&fit=crop', 
              'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=800&auto=format&fit=crop', 
              'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1600&auto=format&fit=crop'
            ].map((img, idx) => (
              <div key={idx} className={`rounded-[2.5rem] overflow-hidden gallery-item relative group shadow-sm border border-[var(--color-silver-fog)]/50 ${idx === 0 || idx === 5 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square md:aspect-[4/5]'}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-slate)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay"></div>
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CINEMATIC CTA SECTION */}
      <section className="py-48 px-6 lg:px-12 text-center reveal-section relative overflow-hidden bg-[var(--color-silver-fog)]/30 backdrop-blur-xl border-t border-[var(--color-silver-fog)]/50 mt-12">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[var(--color-muted-teal)] mb-6 block">Join Us</span>
          <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-heading font-medium text-[var(--color-rich-graphite)] mb-8 leading-[1.05] tracking-tight">Experience the <br/><span className="italic font-light text-[var(--color-deep-slate)]">difference.</span></h2>
          <p className="text-lg text-[var(--color-gray-blue)] mb-14 font-light max-w-xl mx-auto leading-relaxed">
            Join us for a moment of calm in your busy day. Discover your new favorite brew in an atmosphere designed to inspire.
          </p>
          <Link to="/menu" className="inline-flex items-center justify-center px-12 py-5 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.4)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
            <span className="relative z-10">VIEW OUR MENU</span>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
