import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animations
      gsap.from('.hero-badge', {
        y: -20, opacity: 0, duration: 1.5, ease: 'power2.out', delay: 0.2
      });

      gsap.from('.hero-heading-line', {
        y: 60, opacity: 0, duration: 1.5, stagger: 0.15, ease: 'power4.out', delay: 0.4
      });

      gsap.from('.hero-sub', {
        y: 20, opacity: 0, duration: 1.5, ease: 'power3.out', delay: 1
      });

      gsap.to('.hero-bg-zoom', {
        scale: 1.05, duration: 30, ease: 'none', repeat: -1, yoyo: true
      });

      // Section Reveals
      const revealSections = gsap.utils.toArray('.reveal-section');
      revealSections.forEach((section) => {
        gsap.from(section, {
          y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
      
      // Image Parallax Effect in Story section
      gsap.to('.story-img-parallax', {
        y: -60, ease: 'none',
        scrollTrigger: {
          trigger: '.story-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-soft-ivory)] min-h-screen text-[var(--color-gray-blue)] font-body overflow-x-hidden selection:bg-[var(--color-muted-teal)] selection:text-white">
      
      {/* GLOBAL AMBIENT BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-[0%] left-[0%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[var(--color-powder-blue)]/50 rounded-full blur-[150px] mix-blend-multiply"
          animate={{ x: [0, 50, -30, 0], y: [0, 30, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-[50%] right-[0%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] bg-[var(--color-sage-mist)]/40 rounded-full blur-[130px] mix-blend-multiply"
          animate={{ x: [0, -50, 30, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="hero-section relative h-screen min-h-[800px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* High-end warm cinematic cafe image */}
          <div className="hero-bg-zoom absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity grayscale-[10%]"></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[var(--color-soft-ivory)]/30 via-[var(--color-powder-blue)]/10 to-[var(--color-soft-ivory)]"></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--color-soft-ivory)] via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-30 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center items-center text-center h-full pt-20">
          <div className="hero-badge mb-10 px-8 py-2.5 rounded-full border border-[var(--color-muted-teal)]/30 bg-[var(--color-silver-fog)]/30 backdrop-blur-xl shadow-[0_15px_30px_rgba(95,124,123,0.08)] inline-block">
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[var(--color-muted-teal)]">London &bull; Specialty Coffee</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-heading font-medium text-[var(--color-rich-graphite)] leading-[1.05] tracking-tight mb-8">
            <div className="overflow-hidden"><div className="hero-heading-line">The Art of</div></div>
            <div className="overflow-hidden"><div className="hero-heading-line italic font-light text-[var(--color-deep-slate)]">Extraction.</div></div>
          </h1>
          
          <div className="flex flex-col items-center hero-sub gap-8 mt-4">
            <p className="text-[var(--color-gray-blue)] max-w-xl font-light leading-relaxed text-lg">
              Experience meticulously sourced beans and artisanal bakes in a space designed for cinematic elegance and calm.
            </p>
            <Link to="/menu" className="px-12 py-5 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.4)] relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
               <span className="relative z-10">EXPLORE MENU</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STORY / PHILOSOPHY (Editorial Layout) */}
      <section className="story-section py-40 px-6 lg:px-12 reveal-section relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-powder-blue)]/80 to-[var(--color-sage-mist)]/60 rounded-[3rem] transform -translate-x-6 translate-y-6 -z-10 blur-xl opacity-80"></div>
            
            <div className="aspect-[3/4] w-[85%] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(47,52,59,0.15)] relative border border-[var(--color-silver-fog)] bg-white p-3">
               <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                  <div className="absolute inset-0 bg-[var(--color-deep-slate)]/5 z-10 mix-blend-overlay"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop" 
                    alt="Barista brewing" 
                    className="w-full h-full object-cover"
                  />
               </div>
            </div>
            
            <div className="absolute -bottom-16 right-0 w-[55%] aspect-square rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(47,52,59,0.2)] story-img-parallax border border-[var(--color-silver-fog)] bg-white p-2 z-20">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop" 
                  alt="Latte Art" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="lg:pl-16 pt-24 lg:pt-0">
            <span className="inline-flex items-center gap-2 text-[var(--color-muted-teal)] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
               <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span> Our Philosophy
            </span>
            <h2 className="text-5xl lg:text-7xl font-heading text-[var(--color-rich-graphite)] mb-10 leading-[1.1]">
              Crafted with <br/><span className="italic font-light text-[var(--color-deep-slate)]">Intention.</span>
            </h2>
            <div className="space-y-8 text-[var(--color-gray-blue)] text-lg font-light leading-relaxed mb-12">
              <p>
                Inspired by modern cinematic elegance and the vibrant coffee culture of London, we believe in stripping away the unnecessary to focus purely on the exceptional.
              </p>
              <p>
                Every cup we serve is a testament to our dedication to the craft. We source sustainably, roast meticulously, and brew with an unwavering attention to detail.
              </p>
            </div>
            <Link to="/about" className="inline-flex flex-col gap-2 group">
              <span className="text-[var(--color-deep-slate)] text-[11px] font-bold uppercase tracking-[0.2em] group-hover:text-[var(--color-muted-teal)] transition-colors duration-300">DISCOVER OUR STORY</span>
              <span className="block w-8 h-[1px] bg-[var(--color-deep-slate)] group-hover:bg-[var(--color-muted-teal)] group-hover:w-16 transition-all duration-300"></span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. MENU PEEK (FLOATING CARDS) */}
      <section className="py-40 px-6 lg:px-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 reveal-section">
            <div>
              <span className="inline-flex items-center gap-2 text-[var(--color-muted-teal)] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                 <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span> Curated Selection
              </span>
              <h2 className="text-5xl lg:text-6xl font-heading text-[var(--color-rich-graphite)] leading-tight">Taste the <br/><span className="italic font-light text-[var(--color-deep-slate)]">Quality.</span></h2>
            </div>
            <Link to="/menu" className="px-10 py-4 rounded-full bg-[var(--color-silver-fog)]/30 border border-[var(--color-deep-slate)]/10 text-[var(--color-deep-slate)] hover:bg-[var(--color-deep-slate)] hover:text-white transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em]">
              VIEW FULL MENU
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Espresso Bar', category: 'signatureCoffee', img: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=800&auto=format&fit=crop' },
              { title: 'Artisanal Bakes', category: 'bakery', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop' },
              { title: 'Signature Drinks', category: 'specialDrinks', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop' }
            ].map((item, idx) => (
              <Link to={`/menu?category=${item.category}`} key={idx} className="group reveal-section block relative flex flex-col bg-[var(--color-soft-ivory)]/80 backdrop-blur-2xl border border-[var(--color-silver-fog)]/60 rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_rgba(57,70,82,0.08)] hover:shadow-[0_30px_60px_rgba(57,70,82,0.15)] transition-all duration-500 hover:-translate-y-2 hover:bg-white">
                
                <div className="w-full aspect-[4/5] relative m-3 mb-0 rounded-[2rem] overflow-hidden p-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-powder-blue)]/90 via-[var(--color-soft-ivory)] to-[var(--color-sage-mist)]/80 opacity-90 group-hover:opacity-100 transition-opacity duration-700 z-0 rounded-[2rem]"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-70 z-0 mix-blend-multiply">
                    <div className="w-3/4 h-3/4 bg-white/90 rounded-full blur-[40px]"></div>
                  </div>

                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-[0_10px_20px_rgba(57,70,82,0.12)] z-10 bg-white">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-warm-sand)]/30 to-transparent mix-blend-multiply group-hover:opacity-0 transition-opacity duration-700 z-10"></div>
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                    />
                  </div>
                </div>

                <div className="p-8 relative z-20 flex justify-between items-center">
                  <h3 className="text-2xl font-heading font-medium text-[var(--color-rich-graphite)] group-hover:text-[var(--color-muted-teal)] transition-colors duration-500">{item.title}</h3>
                  <div className="w-10 h-10 rounded-full bg-[var(--color-silver-fog)]/50 flex items-center justify-center text-[var(--color-deep-slate)] group-hover:bg-[var(--color-muted-teal)] group-hover:text-white transition-colors duration-500">
                    <span className="font-bold text-lg leading-none">+</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISUAL GALLERY / ATMOSPHERE (Cinematic Grid) */}
      <section className="py-40 px-6 lg:px-12 reveal-section relative z-20">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <span className="inline-flex items-center justify-center gap-2 text-[var(--color-muted-teal)] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
             <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span> The Vibe <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span>
          </span>
          <h2 className="text-5xl lg:text-6xl font-heading text-[var(--color-rich-graphite)] mb-6">The <span className="italic font-light text-[var(--color-deep-slate)]">Atmosphere.</span></h2>
          <p className="text-[var(--color-gray-blue)] max-w-2xl mx-auto font-light text-lg">A space designed for connection, creativity, and quiet moments of reflection.</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <div className="col-span-2 aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-[var(--color-silver-fog)]/50 shadow-sm relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-slate)]/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" alt="Atmosphere" />
          </div>
          <div className="col-span-1 aspect-[3/4] md:aspect-auto rounded-[2.5rem] overflow-hidden border border-[var(--color-silver-fog)]/50 shadow-sm relative group">
            <div className="absolute inset-0 bg-[var(--color-deep-slate)]/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
            <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" alt="Atmosphere" />
          </div>
          <div className="col-span-1 aspect-[3/4] md:aspect-auto rounded-[2.5rem] overflow-hidden border border-[var(--color-silver-fog)]/50 shadow-sm relative group">
             <div className="absolute inset-0 bg-[var(--color-warm-sand)]/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
            <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1920&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" alt="Atmosphere" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
