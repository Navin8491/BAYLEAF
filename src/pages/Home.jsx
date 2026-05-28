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

      // Section Reveals - optimize with once: true to destroy trigger after execution
      const revealSections = gsap.utils.toArray('.reveal-section');
      revealSections.forEach((section) => {
        gsap.from(section, {
          y: 45, opacity: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',
            once: true
          }
        });
      });

      // Image Parallax Effect in Story section - Only execute on desktop viewports
      if (window.innerWidth > 768) {
        gsap.to('.story-img-parallax', {
          y: -40, ease: 'none',
          scrollTrigger: {
            trigger: '.story-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-soft-ivory)] min-h-screen text-[var(--color-gray-blue)] font-body overflow-x-hidden selection:bg-[var(--color-muted-teal)] selection:text-white">

      {/* GLOBAL AMBIENT BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-[0%] left-[0%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[var(--color-powder-blue)]/30 rounded-full blur-[70px] fixed-blur-blob"
          animate={{ x: [0, 30, -15, 0], y: [0, 15, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-[50%] right-[0%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-[var(--color-sage-mist)]/25 rounded-full blur-[60px] fixed-blur-blob"
          animate={{ x: [0, -30, 15, 0], y: [0, -15, 25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="hero-section relative min-h-[480px] md:min-h-[580px] h-[75vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* High-end warm cinematic cafe image */}
          <div className="hero-bg-zoom absolute inset-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600&auto=format&fit=crop&fm=webp')] bg-cover bg-center opacity-40 mix-blend-luminosity grayscale-[10%]"></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[var(--color-soft-ivory)]/30 via-[var(--color-powder-blue)]/10 to-[var(--color-soft-ivory)]"></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--color-soft-ivory)] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-30 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center items-center text-center h-full pt-12">
          <div className="hero-badge mb-3 px-6 py-2 rounded-full border border-[var(--color-muted-teal)]/30 bg-[var(--color-silver-fog)]/30 backdrop-blur-xl shadow-[0_15px_30px_rgba(95,124,123,0.08)] inline-block">
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[var(--color-muted-teal)]">London &bull; Specialty Coffee</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-heading font-medium text-[var(--color-rich-graphite)] leading-[1.05] tracking-tight mb-2">
            <div className="overflow-hidden"><div className="hero-heading-line">The Art of</div></div>
            <div className="overflow-hidden"><div className="hero-heading-line italic font-light text-[var(--color-deep-slate)]">Extraction.</div></div>
          </h1>

          <div className="flex flex-col items-center hero-sub gap-2 mt-1">
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
      <section className="story-section py-10 lg:py-12 px-6 lg:px-12 reveal-section relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-powder-blue)]/80 to-[var(--color-sage-mist)]/60 rounded-[3rem] transform -translate-x-6 translate-y-6 -z-10 blur-md opacity-80"></div>

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

            <div className="absolute -bottom-8 right-0 w-[55%] aspect-square rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(47,52,59,0.2)] story-img-parallax border border-[var(--color-silver-fog)] bg-white p-2 z-20">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
                  alt="Latte Art"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:pl-10 pt-10 lg:pt-0">
            <span className="inline-flex items-center gap-2 text-[var(--color-muted-teal)] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
              <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span> Our Philosophy
            </span>
            <h2 className="text-5xl lg:text-7xl font-heading text-[var(--color-rich-graphite)] mb-3 leading-[1.1]">
              Crafted with <br /><span className="italic font-light text-[var(--color-deep-slate)]">Intention.</span>
            </h2>
            <div className="space-y-2 text-[var(--color-gray-blue)] text-lg font-light leading-relaxed mb-4">
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
      <section className="relative py-10 px-6 lg:px-12 overflow-hidden z-20">
        {/* Layered luxury background gradients & ambient glows */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[20%] left-[10%] w-[30%] h-[50%] bg-[#D8E4EE]/30 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[25%] h-[40%] bg-[#C6D0C4]/25 rounded-full blur-[80px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#F4F1EC]/30 via-transparent to-[#F4F1EC]/50"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Editorial Header Block */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#394652]/10 pb-4 mb-6 gap-4 reveal-section">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[var(--color-muted-teal)] text-[9px] font-bold uppercase tracking-[0.25em] mb-1">
                <span className="w-6 h-px bg-[var(--color-muted-teal)]/60"></span> Curated Selection
              </span>
              <h2 className="text-4xl md:text-5xl font-heading text-[#2E333A] leading-tight">
                Taste the <span className="italic font-light text-[#394652]">Quality.</span>
              </h2>
            </div>
            <Link 
              to="/menu" 
              className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full overflow-hidden bg-white/40 border border-[#394652]/10 backdrop-blur-md text-[#394652] text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-white shadow-sm hover:shadow-[0_4px_12px_rgba(95,124,123,0.25)] hover:-translate-y-0.5 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#5F7C7B] to-[#4F6867] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <span>VIEW FULL MENU</span>
            </Link>
          </div>

          {/* Grid Cards Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Espresso Bar', category: 'signatureCoffee', img: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=600&auto=format&fit=crop&fm=webp', subtitle: 'Crafted with premium Single Origin beans.' },
              { title: 'Artisanal Bakes', category: 'bakery', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop&fm=webp', subtitle: 'Handcrafted daily using organic flour.' },
              { title: 'Signature Drinks', category: 'specialDrinks', img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=600&auto=format&fit=crop&fm=webp', subtitle: 'Seasonal cold brews and tonic infusions.' }
            ].map((item, idx) => (
              <Link 
                to={`/menu?category=${item.category}`} 
                key={idx} 
                className="group reveal-section bg-white/40 backdrop-blur-xl border border-white/50 rounded-[2.25rem] p-3 shadow-[0_15px_35px_rgba(57,70,82,0.05)] hover:shadow-[0_25px_50px_rgba(95,124,123,0.15)] hover:border-[#5F7C7B]/30 hover:bg-white/60 transition-all duration-500 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Image Showcase area */}
                <div className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.08)] mb-3 bg-[#E2D4C5]/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2E333A]/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 z-10"></div>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 z-20 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] tracking-[0.2em] font-medium uppercase">
                    {item.category === 'signatureCoffee' ? 'Brew' : item.category === 'bakery' ? 'Baking' : 'Signature'}
                  </div>
                </div>

                {/* Content description */}
                <div className="px-2 pb-2 pt-1 flex justify-between items-center z-10 mt-auto">
                  <div>
                    <h3 className="text-xl font-heading font-medium text-[#2E333A] group-hover:text-[#5F7C7B] transition-colors duration-300">{item.title}</h3>
                    <p className="text-[10px] text-[#394652]/70 font-light mt-0.5 tracking-wide">{item.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-[#394652]/10 flex items-center justify-center text-[#394652] group-hover:bg-[#5F7C7B] group-hover:text-white group-hover:border-[#5F7C7B]/20 transition-all duration-300 shadow-sm">
                    <span className="font-bold text-base leading-none">+</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISUAL GALLERY / ATMOSPHERE (Cinematic Grid) */}
      <section className="py-10 lg:py-12 px-6 lg:px-12 reveal-section relative z-20">
        <div className="max-w-7xl mx-auto text-center mb-6">
          <span className="inline-flex items-center justify-center gap-2 text-[var(--color-muted-teal)] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
            <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span> The Vibe <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span>
          </span>
          <h2 className="text-5xl lg:text-6xl font-heading text-[var(--color-rich-graphite)] mb-3">The <span className="italic font-light text-[var(--color-deep-slate)]">Atmosphere.</span></h2>
          <p className="text-[var(--color-gray-blue)] max-w-2xl mx-auto font-light text-lg">A space designed for connection, creativity, and quiet moments of reflection.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
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
