import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animations
      gsap.from('.hero-heading-line', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2
      });

      gsap.from('.hero-sub', {
        y: 20,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.8
      });

      gsap.to('.hero-parallax-img', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Section Reveals
      const revealSections = gsap.utils.toArray('.reveal-section');
      revealSections.forEach((section) => {
        gsap.from(section, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
      
      // Image Parallax Effect in Story section
      gsap.to('.story-img-parallax', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.story-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-ivory)] overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="hero-section relative h-screen w-full flex items-center justify-center overflow-hidden bg-[var(--color-forest)]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1920&auto=format&fit=crop" 
            alt="Cafe Interior" 
            className="w-full h-[120%] object-cover hero-parallax-img opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)] via-transparent to-transparent opacity-80"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center h-full pt-20">
          <div className="overflow-hidden mb-4">
            <p className="text-[var(--color-ivory)]/80 tracking-[0.3em] uppercase text-xs font-bold hero-sub">London &bull; Specialty Coffee</p>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-heading font-medium text-[var(--color-ivory)] leading-[0.9] tracking-tight mb-8">
            <div className="overflow-hidden"><div className="hero-heading-line">The Art of</div></div>
            <div className="overflow-hidden"><div className="hero-heading-line flex items-center gap-6">
              Extraction
              <span className="hidden md:inline-block w-24 lg:w-48 h-[2px] bg-[var(--color-terracotta)] mt-4"></span>
            </div></div>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center hero-sub">
            <Link to="/menu" className="group flex items-center gap-4 bg-[var(--color-ivory)] text-[var(--color-forest)] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[var(--color-sage)] hover:text-[var(--color-ivory)] transition-all duration-300">
              View Menu
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-[var(--color-ivory)]/70 max-w-sm font-light leading-relaxed">
              Experience meticulously sourced beans and artisanal bakes in a space designed for calm.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STORY / PHILOSOPHY */}
      <section className="story-section py-32 px-6 lg:px-12 reveal-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[3/4] w-4/5 rounded-t-[10rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop" 
                alt="Barista brewing" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-16 right-0 w-2/3 aspect-square rounded-[2rem] overflow-hidden border-8 border-[var(--color-ivory)] shadow-luxury story-img-parallax">
              <img 
                src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop" 
                alt="Latte Art" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="lg:pl-12 pt-16 lg:pt-0">
            <h2 className="text-5xl lg:text-7xl font-heading text-[var(--color-forest)] mb-8 leading-tight">
              Crafted with <br/><span className="text-[var(--color-sage)]">Intention.</span>
            </h2>
            <div className="space-y-6 text-[var(--color-forest)]/80 text-lg font-light leading-relaxed mb-10">
              <p>
                Inspired by the minimalist elegance of Scandinavian design and the rich, vibrant coffee culture of London, we believe in stripping away the unnecessary.
              </p>
              <p>
                Every cup we serve is a testament to our dedication to the craft. We source sustainably, roast meticulously, and brew with an unwavering attention to detail.
              </p>
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 text-[var(--color-forest)] font-bold uppercase tracking-widest text-sm hover:text-[var(--color-terracotta)] transition-colors group">
              <span className="border-b border-[var(--color-forest)] group-hover:border-[var(--color-terracotta)] pb-1">Our Story</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. MENU PEEK (GRID) */}
      <section className="py-32 px-6 lg:px-12 bg-[var(--color-linen)] reveal-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <p className="text-[var(--color-sage)] font-bold tracking-[0.2em] uppercase text-xs mb-4">Curated Selection</p>
              <h2 className="text-4xl lg:text-6xl font-heading text-[var(--color-forest)]">Taste the Quality</h2>
            </div>
            <Link to="/menu" className="flex items-center gap-3 bg-[var(--color-forest)] text-[var(--color-ivory)] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[var(--color-terracotta)] transition-colors">
              Full Menu
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Espresso Bar', category: 'signatures', img: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=800&auto=format&fit=crop' },
              { title: 'Artisanal Bakes', category: 'pastries', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop' },
              { title: 'Seasonal Brunch', category: 'filter', img: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=800&auto=format&fit=crop' }
            ].map((item, idx) => (
              <Link to={`/menu?category=${item.category}`} key={idx} className="group block relative overflow-hidden rounded-[2rem] aspect-[4/5] bg-[var(--color-forest)]">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)]/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <h3 className="text-2xl font-heading text-[var(--color-ivory)]">{item.title}</h3>
                  <div className="w-10 h-10 rounded-full bg-[var(--color-ivory)] flex items-center justify-center text-[var(--color-forest)] group-hover:bg-[var(--color-terracotta)] group-hover:text-[var(--color-ivory)] transition-colors">
                    <FiArrowRight />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISUAL GALLERY / ATMOSPHERE */}
      <section className="py-32 px-6 lg:px-12 reveal-section">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-heading text-[var(--color-forest)] mb-6">The Atmosphere</h2>
          <p className="text-[var(--color-forest)]/70 max-w-2xl mx-auto font-light">A space designed for connection, creativity, and quiet moments of reflection.</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <div className="col-span-2 aspect-[4/3] rounded-[2rem] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Atmosphere" />
          </div>
          <div className="col-span-1 aspect-[3/4] md:aspect-auto rounded-[2rem] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Atmosphere" />
          </div>
          <div className="col-span-1 aspect-[3/4] md:aspect-auto rounded-[2rem] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1920&auto=format&fit=crop" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Atmosphere" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
