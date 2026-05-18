import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const allBlogPosts = [
  {
    id: 1,
    category: 'Process',
    title: 'The Art of the Pour Over',
    date: 'Oct 12, 2026',
    excerpt: 'Exploring the delicate balance of time, temperature, and technique required to extract the perfect V60.',
    img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    category: 'Origin',
    title: 'Sourcing in Yirgacheffe',
    date: 'Sep 28, 2026',
    excerpt: 'Our recent trip to Ethiopia, meeting the farmers behind our favorite floral and bright washed coffees.',
    img: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    category: 'Design',
    title: 'Minimalism in Coffee Spaces',
    date: 'Sep 15, 2026',
    excerpt: 'How Scandinavian interior principles influence our approach to cafe design and customer experience.',
    img: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    category: 'Culinary',
    title: 'Pairing Pastries and Roasts',
    date: 'Aug 30, 2026',
    excerpt: 'A guide to matching the acidity and body of our single origins with our house-baked goods.',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    category: 'Culture',
    title: 'The Rise of Specialty Coffee in London',
    date: 'Aug 10, 2026',
    excerpt: 'A deep dive into how London transformed from a tea-drinking capital into a bustling hub of third-wave coffee.',
    img: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 6,
    category: 'Process',
    title: 'Understanding Roast Profiles',
    date: 'Jul 22, 2026',
    excerpt: 'From light and floral to dark and bold, learn what happens to the coffee bean during the roasting process.',
    img: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop'
  }
];

const Blog = () => {
  const containerRef = useRef(null);
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setVisiblePosts(prev => Math.min(prev + 2, allBlogPosts.length));
      setIsLoading(false);
    }, 600);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.journal-hero-text', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from('.journal-post', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.journal-grid',
          start: 'top 85%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[var(--color-ivory)] min-h-screen text-[var(--color-forest)] font-body overflow-hidden">
      
      {/* HERO */}
      <section className="pt-40 pb-20 px-6 lg:px-12 relative border-b border-[var(--color-olive)]/20 bg-[var(--color-linen)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
          <div>
            <div className="overflow-hidden mb-4">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-sage)] block journal-hero-text">Stories & Insights</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-heading font-medium text-[var(--color-forest)] tracking-tight journal-hero-text">
              The Journal
            </h1>
          </div>
          <p className="text-lg text-[var(--color-forest)]/70 font-light max-w-md leading-relaxed journal-hero-text mb-2">
            Thoughts on brewing, origin trips, design, and the culture surrounding specialty coffee.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="py-24 px-6 lg:px-12 journal-grid">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {allBlogPosts.slice(0, visiblePosts).map((post, idx) => (
            <article key={post.id} className={`journal-post group cursor-pointer ${idx % 2 !== 0 ? 'md:mt-24' : ''} fade-in-post`}>
              <Link to={`/blog/${post.id}`}>
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-[var(--color-linen)] mb-8 relative shadow-sm group-hover:shadow-luxury transition-shadow duration-500">
                  <div className="absolute inset-0 bg-[var(--color-forest)]/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={post.img} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out mix-blend-multiply opacity-90"
                  />
                </div>
              </Link>
              
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-sage)]">{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--color-olive)]"></span>
                  <span className="text-xs font-light text-[var(--color-forest)]/60 uppercase tracking-wider">{post.date}</span>
                </div>
                
                <h2 className="text-3xl font-heading font-medium text-[var(--color-forest)] mb-4 group-hover:text-[var(--color-terracotta)] transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                
                <p className="text-[var(--color-forest)]/70 font-light leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                
                <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] border-b-2 border-[var(--color-forest)] text-[var(--color-forest)] pb-1 group-hover:border-[var(--color-terracotta)] group-hover:text-[var(--color-terracotta)] transition-colors">
                  Read Article <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PAGINATION / LOAD MORE */}
      {visiblePosts < allBlogPosts.length && (
        <section className="pb-32 px-6 lg:px-12 text-center">
          <button 
            onClick={loadMore}
            disabled={isLoading}
            className={`bg-[var(--color-forest)] text-[var(--color-ivory)] px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-[var(--color-sage)] transition-colors duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Loading...' : 'Load More Articles'}
          </button>
        </section>
      )}

    </div>
  );
};

export default Blog;
