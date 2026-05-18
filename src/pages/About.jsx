import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animations
      gsap.from('.hero-title-word', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.2
      });

      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
      });

      gsap.from('.hero-image', {
        scale: 1.05,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.5
      });

      // Section reveal animations
      const sections = gsap.utils.toArray('.reveal-section');
      sections.forEach((section) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        });
      });

      // Gallery stagger
      gsap.from('.gallery-item', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gallery-container',
          start: 'top 80%',
        }
      });
      
      // Values stagger
      gsap.from('.value-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.values-container',
          start: 'top 80%',
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-ivory)] text-[var(--color-forest)] font-body overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 lg:px-12 pt-32 pb-12">
        <div className="absolute inset-0 bg-[var(--color-linen)] z-0 rounded-b-[4rem] mx-4 lg:mx-8 shadow-sm"></div>
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="mb-6 overflow-hidden">
            <span className="font-heading text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-sage)] block hero-subtitle">Welcome to Bayleaf</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-heading font-medium text-[var(--color-forest)] leading-[0.9] mb-8 tracking-tight flex flex-wrap justify-center gap-x-4">
            <div className="overflow-hidden"><span className="hero-title-word inline-block">The</span></div>
            <div className="overflow-hidden"><span className="hero-title-word inline-block">Art</span></div>
            <div className="overflow-hidden"><span className="hero-title-word inline-block">Of</span></div>
            <div className="overflow-hidden"><span className="hero-title-word inline-block text-[var(--color-sage)]">Coffee</span></div>
          </h1>
          <p className="max-w-2xl text-lg font-light text-[var(--color-forest)]/70 hero-subtitle mb-16 leading-relaxed">
            A modern London-inspired cafe aesthetic blended with the minimal, warm essence of Scandinavian design. We craft moments, not just coffee.
          </p>
          <div className="w-full max-w-5xl h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-luxury hero-image relative">
            <div className="absolute inset-0 bg-[var(--color-forest)]/10 z-10 mix-blend-overlay"></div>
            <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1920&auto=format&fit=crop" alt="Cafe Interior" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 2. STORY / PHILOSOPHY SECTION */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 reveal-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-luxury">
                <img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop" alt="Pouring coffee" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-in-out" />
              </div>
              <div className="absolute -bottom-12 -right-12 w-2/3 aspect-square rounded-[3rem] overflow-hidden shadow-luxury border-[12px] border-[var(--color-ivory)] hidden md:block">
                <img src="https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=800&auto=format&fit=crop" alt="Coffee beans" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:pl-8">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-sage)] mb-6 block">Our Philosophy</span>
              <h2 className="text-4xl lg:text-6xl font-heading font-medium text-[var(--color-forest)] mb-10 leading-tight">
                Simplicity meets <br /> perfection.
              </h2>
              <div className="space-y-6 text-[var(--color-forest)]/70 text-lg font-light leading-relaxed">
                <p>
                  Rooted in the minimalist principles of Scandinavian design and the vibrant coffee culture of modern London, we believe in stripping away the unnecessary to focus on what truly matters: exceptional quality, warmth, and connection.
                </p>
                <p>
                  Every cup we serve is a testament to our dedication to the craft. We source sustainably, roast meticulously, and brew with an unwavering attention to detail. 
                </p>
              </div>
              <div className="mt-12 flex items-center gap-6">
                <div className="w-16 h-[1px] bg-[var(--color-olive)]"></div>
                <p className="font-heading font-medium tracking-[0.2em] uppercase text-sm text-[var(--color-forest)]">Est. 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CULTURE / VALUES */}
      <section className="py-24 lg:py-32 bg-[var(--color-linen)] rounded-[3rem] mx-4 lg:mx-8 mb-24 px-6 lg:px-12 reveal-section">
        <div className="max-w-7xl mx-auto values-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-heading font-medium text-[var(--color-forest)] mb-6">What Defines Us</h2>
            <p className="text-[var(--color-forest)]/70 max-w-2xl mx-auto text-lg font-light">The core values that shape every experience in our space.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { title: 'Ethical Sourcing', desc: 'We build direct relationships with farmers, ensuring fair wages and sustainable practices.' },
              { title: 'Minimalist Craft', desc: 'No clutter, no distractions. Just the pure, unadulterated taste of perfectly extracted coffee.' },
              { title: 'Community First', desc: 'Our space is designed to foster connection, creativity, and moments of quiet reflection.' }
            ].map((value, idx) => (
              <div key={idx} className="value-card bg-[var(--color-ivory)] p-10 rounded-[2rem] shadow-sm hover:shadow-luxury transition-shadow duration-500">
                <div className="w-12 h-12 rounded-full bg-[var(--color-sage)]/20 flex items-center justify-center mb-8 text-[var(--color-sage)] font-heading font-medium text-xl">
                  0{idx + 1}
                </div>
                <h3 className="text-2xl font-heading font-medium text-[var(--color-forest)] mb-4">{value.title}</h3>
                <p className="text-[var(--color-forest)]/70 font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY SECTION */}
      <section className="py-24 px-6 lg:px-12 reveal-section">
        <div className="max-w-7xl mx-auto gallery-container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-sage)] mb-4 block">The Vibe</span>
              <h2 className="text-4xl lg:text-5xl font-heading font-medium text-[var(--color-forest)]">Aesthetic & Space</h2>
            </div>
            <p className="text-[var(--color-forest)]/70 max-w-md text-lg font-light">
              A glimpse into our serene environment designed for focus and relaxation.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop', 
              'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=800&auto=format&fit=crop', 
              'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=800&auto=format&fit=crop', 
              'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop'
            ].map((img, idx) => (
              <div key={idx} className={`rounded-[2rem] overflow-hidden gallery-item relative group shadow-sm ${idx === 0 || idx === 5 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square md:aspect-[4/5]'}`}>
                <div className="absolute inset-0 bg-[var(--color-forest)]/10 group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-overlay"></div>
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-40 px-6 lg:px-12 text-center reveal-section relative overflow-hidden bg-[var(--color-linen)] mt-24">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-terracotta)]/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl lg:text-7xl font-heading font-medium text-[var(--color-forest)] mb-8 leading-tight">Experience the difference.</h2>
          <p className="text-lg text-[var(--color-forest)]/70 mb-12 font-light max-w-xl mx-auto leading-relaxed">
            Join us for a moment of calm in your busy day. Discover your new favorite brew in an atmosphere designed to inspire.
          </p>
          <Link to="/menu" className="inline-flex items-center gap-4 px-12 py-5 bg-[var(--color-forest)] text-[var(--color-ivory)] rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-[var(--color-sage)] transition-colors duration-500 group">
            View Our Menu
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
