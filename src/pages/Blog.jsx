import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleModal from '../components/ArticleModal';

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
  const [selectedArticle, setSelectedArticle] = useState(null);

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
        y: 40, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.2
      });

      gsap.from('.journal-post', {
        y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.journal-grid',
          start: 'top 85%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [visiblePosts]);

  return (
    <div ref={containerRef} className="bg-[var(--color-soft-ivory)] min-h-screen text-[var(--color-gray-blue)] font-body overflow-x-hidden selection:bg-[var(--color-muted-teal)] selection:text-white">

      {/* GLOBAL AMBIENT BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div
          className="absolute top-[30%] left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[var(--color-powder-blue)]/50 rounded-full blur-[140px] mix-blend-multiply"
          animate={{ x: [0, 40, -30, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* HERO */}
      <section className="pt-48 pb-24 px-6 lg:px-12 relative border-b border-[var(--color-silver-fog)]/40 bg-[var(--color-silver-fog)]/10 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10 relative z-10">
          <div>
            <div className="overflow-hidden mb-6">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--color-muted-teal)] block journal-hero-text">Stories & Insights</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-medium text-[var(--color-rich-graphite)] tracking-tight journal-hero-text leading-[1]">
              The <span className="italic font-light text-[var(--color-deep-slate)]">Journal.</span>
            </h1>
          </div>
          <p className="text-lg text-[var(--color-gray-blue)] font-light max-w-md leading-relaxed journal-hero-text mb-3">
            Thoughts on brewing, origin trips, cinematic design, and the culture surrounding premium specialty coffee.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="py-32 px-6 lg:px-12 journal-grid relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-28">
          {allBlogPosts.slice(0, visiblePosts).map((post, idx) => (
            <article key={post.id} className={`journal-post group ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}>
              <div onClick={() => setSelectedArticle(post)} className="block relative cursor-pointer">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden bg-white mb-10 relative shadow-[0_20px_40px_rgba(56,68,80,0.08)] group-hover:shadow-[0_40px_80px_rgba(56,68,80,0.15)] transition-all duration-700 border border-[var(--color-silver-fog)]/60 p-3">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-powder-blue)]/60 to-[var(--color-sage-mist)]/40 rounded-[3rem] transform translate-x-3 translate-y-3 -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-slate)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-overlay"></div>
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  </div>
                </div>
              </div>

              <div className="px-4 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-muted-teal)] bg-[var(--color-silver-fog)]/30 px-3 py-1 rounded-full border border-[var(--color-muted-teal)]/20">{post.category}</span>
                  <span className="text-xs font-light text-[var(--color-gray-blue)] uppercase tracking-wider">{post.date}</span>
                </div>

                <h2 className="text-4xl font-heading font-medium text-[var(--color-rich-graphite)] mb-6 group-hover:text-[var(--color-muted-teal)] transition-colors duration-500 leading-tight cursor-pointer" onClick={() => setSelectedArticle(post)}>
                  {post.title}
                </h2>

                <p className="text-[var(--color-gray-blue)] text-lg font-light leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>

                <button
                  onClick={() => setSelectedArticle(post)}
                  className="inline-flex items-center justify-between gap-6 px-7 py-3 mt-auto rounded-full bg-white/60 backdrop-blur-md border border-[var(--color-silver-fog)] text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-deep-slate)] shadow-[0_10px_20px_rgba(57,70,82,0.05)] hover:shadow-[0_20px_40px_rgba(95,124,123,0.2)] hover:-translate-y-1 hover:border-[var(--color-muted-teal)]/30 transition-all duration-500 relative overflow-hidden group/btn w-max"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-muted-teal)]/10 via-[var(--color-deep-sage-teal)]/10 to-transparent opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full transition-all duration-1000 ease-out"></div>
                  <span className="relative z-10 group-hover/btn:text-[var(--color-muted-teal)] transition-colors duration-300">DISCOVER STORY</span>
                  <span className="relative z-10 w-8 h-8 rounded-full bg-[var(--color-silver-fog)]/60 flex items-center justify-center group-hover/btn:bg-[var(--color-muted-teal)] group-hover/btn:text-white transition-all duration-500 transform group-hover/btn:translate-x-1 shadow-sm">
                    <FiArrowRight />
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PAGINATION / LOAD MORE */}
      {visiblePosts < allBlogPosts.length && (
        <section className="pb-40 px-6 lg:px-12 text-center relative z-20">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className={`flex items-center justify-center mx-auto gap-4 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white px-12 py-5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(95,124,123,0.4),0_0_20px_rgba(194,163,131,0.4)] relative overflow-hidden group ${isLoading ? 'opacity-70 cursor-not-allowed transform-none hover:shadow-[0_15px_30px_rgba(95,124,123,0.3)]' : ''}`}
          >
            {!isLoading && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>}
            <span className="relative z-10">{isLoading ? 'LOADING...' : 'LOAD MORE ARTICLES'}</span>
          </button>
        </section>
      )}

      {/* Article Modal */}
      <ArticleModal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        article={selectedArticle}
      />

    </div>
  );
};

export default Blog;
