import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ArticleModal from '../components/ArticleModal';
import { getBlogPosts, formatDate } from '../../backend/services';

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

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: idx < 4 ? idx * 0.12 + 0.2 : 0.05
    }
  })
};

const Blog = () => {
  const containerRef = useRef(null);
  const [posts, setPosts] = useState(allBlogPosts);
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const loadMore = () => {
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setVisiblePosts(prev => Math.min(prev + 2, posts.length));
      setIsLoading(false);
    }, 600);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getBlogPosts();
        if (response.success && response.data && response.data.length > 0) {
          const mapped = response.data.map(post => ({
            id: post.id,
            category: post.category,
            title: post.title,
            date: formatDate(post.created_at),
            excerpt: post.excerpt,
            content: post.content,
            img: post.image_url
          }));
          setPosts(mapped);
        }
      } catch (err) {
        console.error('Error fetching blog posts from Supabase, using mock fallback:', err);
      } finally {
        setIsFetching(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.journal-hero-text', {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []); // Run only once on mount to prevent flashing on state changes

  return (
    <div ref={containerRef} className="bg-gradient-to-b from-[var(--color-soft-ivory)] via-white to-[var(--color-soft-ivory)] min-h-screen text-[var(--color-deep-slate)] font-body overflow-x-hidden selection:bg-[var(--color-muted-teal)] selection:text-white">

      {/* GLOBAL AMBIENT BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div
          className="absolute top-[20%] left-[5%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[var(--color-powder-blue)]/40 rounded-full blur-[140px] mix-blend-multiply"
          animate={{ x: [0, 50, -20, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[var(--color-warm-sand)]/35 rounded-full blur-[120px] mix-blend-multiply"
          animate={{ x: [0, -40, 30, 0], y: [0, 30, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 lg:px-12 relative border-b border-[var(--color-silver-fog)]/40 bg-[var(--color-silver-fog)]/10 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
          <div>
            <div className="overflow-hidden mb-3">
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
      <section className="py-16 px-6 lg:px-12 journal-grid relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {posts.slice(0, visiblePosts).map((post, idx) => (
            <motion.article 
              key={post.id} 
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="journal-post group flex flex-col h-full bg-white/70 backdrop-blur-md border border-[var(--color-silver-fog)]/40 rounded-[3rem] p-5 shadow-[0_15px_30px_rgba(57,70,82,0.04),0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(57,70,82,0.12),0_10px_20px_rgba(181,156,122,0.15)] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white hover:border-[var(--color-sand-accent)]/30"
            >
              <div className="w-full aspect-[4/3] rounded-[2.2rem] overflow-hidden mb-5 flex-shrink-0 relative shadow-[0_10px_25px_rgba(57,70,82,0.05)]">
                {/* Subtle vignette/overlay that darkens slightly to keep details rich and prevent washing out */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-50 group-hover:opacity-30 transition-opacity duration-700 z-10 pointer-events-none"></div>
                {/* Hover gradient overlay: correct mist-sage name, reduce opacity to 25%, mix-blend-multiply */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-powder-blue)]/20 to-[var(--color-mist-sage)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-multiply z-10 pointer-events-none"></div>
                <img
                  src={post.img}
                  alt={post.title}
                  style={{ filter: 'contrast(1.08) brightness(0.92) saturate(1.05)' }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out relative z-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop';
                  }}
                />
              </div>

              <div className="px-4 pb-4 flex flex-col flex-grow relative z-20">
                <div className="flex items-center gap-4 mb-4 flex-shrink-0">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-muted-teal)] bg-[var(--color-silver-fog)]/40 px-3 py-1.5 rounded-full border border-[var(--color-muted-teal)]/15">{post.category}</span>
                  <span className="text-xs font-medium text-[var(--color-gray-blue)] uppercase tracking-wider">{post.date}</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-heading font-medium text-[var(--color-rich-graphite)] mb-3 group-hover:text-[var(--color-muted-teal)] transition-colors duration-500 leading-tight flex-shrink-0">
                  {post.title}
                </h2>

                <p className="text-[var(--color-deep-slate)]/80 text-base md:text-lg font-light leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 flex-shrink-0 w-full">
                  <button
                    onClick={() => setSelectedArticle(post)}
                    className="flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-[var(--color-muted-teal)] text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(95,124,123,0.18)] hover:shadow-[0_15px_30px_rgba(95,124,123,0.35),0_0_15px_rgba(181,156,122,0.25)] hover:-translate-y-0.5 hover:bg-[var(--color-deep-sage-teal)] transition-all duration-300 relative overflow-hidden group/btn cursor-pointer w-max"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-[800ms] ease-out"></div>
                    <span className="relative z-10 text-white transition-colors duration-300">READ ARTICLE</span>
                    <FiArrowRight className="relative z-10 transform group-hover/btn:translate-x-1 transition-transform duration-300 text-white" size={13} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* PAGINATION / LOAD MORE */}
      {visiblePosts < posts.length && (
        <section className="pb-16 px-6 lg:px-12 text-center relative z-20">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className={`flex items-center justify-center mx-auto gap-3 bg-[var(--color-muted-teal)] text-white px-10 py-4.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[var(--color-deep-sage-teal)] transition-all duration-300 shadow-[0_10px_25px_rgba(95,124,123,0.18)] hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(95,124,123,0.3),0_0_15px_rgba(181,156,122,0.2)] relative overflow-hidden group cursor-pointer ${isLoading ? 'opacity-70 cursor-not-allowed transform-none' : ''}`}
          >
            {!isLoading && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-warm-sand)]/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-[1000ms] ease-out"></div>}
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
