import React, { useState } from 'react';
import { BiMessageRounded } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ArticleModal from './ArticleModal';

const blogs = [
  { img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop", date: "Sept 10, 2026", author: "Admin", category: "Process", title: "The Art of the Pour Over", desc: "Exploring the delicate balance of time, temperature, and technique required to extract the perfect V60." },
  { img: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=800&auto=format&fit=crop", date: "Sept 28, 2026", author: "Admin", category: "Origin", title: "Sourcing in Yirgacheffe", desc: "Our recent trip to Ethiopia, meeting the farmers behind our favorite floral and bright washed coffees." },
  { img: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=800&auto=format&fit=crop", date: "Oct 12, 2026", author: "Admin", category: "Design", title: "Minimalism in Spaces", desc: "How cinematic interior principles influence our approach to cafe design and customer experience." }
];

const RecentBlogPreview = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section className="py-10 lg:py-12 relative z-20 mx-4 lg:mx-8 mb-6 px-6 lg:px-12">
      {/* Glassmorphism Background Panel */}
      <div className="absolute inset-0 bg-[var(--color-silver-fog)]/20 backdrop-blur-3xl rounded-[4rem] border border-[var(--color-silver-fog)]/40 shadow-[0_20px_40px_rgba(56,68,80,0.05)] -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-3">
          <div>
            <span className="inline-flex items-center gap-2 text-[var(--color-muted-teal)] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
              <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span> Insights & Stories
            </span>
            <h2 className="text-5xl lg:text-6xl font-heading font-medium text-[var(--color-rich-graphite)] leading-tight">From the <span className="italic font-light text-[var(--color-deep-slate)]">Journal.</span></h2>
          </div>
          <Link to="/blog" className="px-10 py-4 rounded-full bg-[var(--color-silver-fog)]/30 border border-[var(--color-deep-slate)]/10 text-[var(--color-deep-slate)] hover:bg-[var(--color-deep-slate)] hover:text-white transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em]">
            VIEW ALL ARTICLES
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              className="group block relative flex flex-col bg-white/70 backdrop-blur-md border border-[var(--color-silver-fog)]/40 rounded-[2.5rem] overflow-hidden shadow-[0_15px_30px_rgba(57,70,82,0.04),0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(57,70,82,0.12),0_10px_20px_rgba(181,156,122,0.15)] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white hover:border-[var(--color-sand-accent)]/30 hover:-translate-y-2"
            >
              <div className="block relative w-full aspect-[4/3] m-2 mb-0 rounded-[1.8rem] overflow-hidden p-1 flex-shrink-0 z-10">
                {/* Ambient frame glow border */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-powder-blue)]/40 to-[var(--color-mist-sage)]/30 group-hover:from-[var(--color-sand-accent)]/30 group-hover:to-[var(--color-warm-sand)]/20 transition-all duration-[800ms] z-0 rounded-[1.8rem]"></div>

                <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden shadow-[0_8px_20px_rgba(57,70,82,0.06)] z-10">
                  {/* Subtle vignette/overlay that darkens slightly on hover to keep details rich but not washed out */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-slate)]/20 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700 z-10 pointer-events-none"></div>
                  {/* Hover gradient overlay: correct mist-sage name, reduce opacity to 30%, mix-blend-multiply */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-powder-blue)]/20 to-[var(--color-mist-sage)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-multiply z-10 pointer-events-none"></div>
                  <img
                    src={blog.img}
                    alt={blog.title}
                    style={{ filter: 'contrast(1.05) brightness(0.95) saturate(1.05)' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                </div>
              </div>

              <div className="p-4 relative z-20 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-3 flex-shrink-0">
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--color-muted-teal)] bg-[var(--color-silver-fog)]/40 px-3 py-1.5 rounded-full border border-[var(--color-muted-teal)]/15">{blog.category}</span>
                  <span className="text-[10px] font-medium text-[var(--color-gray-blue)] uppercase tracking-wider">{blog.date}</span>
                </div>

                <h3 className="text-2xl font-heading font-medium text-[var(--color-rich-graphite)] mb-2 group-hover:text-[var(--color-muted-teal)] transition-colors duration-500 flex-shrink-0">
                  {blog.title}
                </h3>

                <p className="text-[var(--color-deep-slate)]/80 leading-relaxed text-sm font-light mb-4 flex-grow">
                  {blog.desc}
                </p>

                <div className="mt-auto pt-2 flex-shrink-0 w-full">
                  <button
                    onClick={() => setSelectedArticle(blog)}
                    className="flex items-center justify-center gap-4 px-8 py-4 rounded-full bg-gradient-to-br from-[#5F7C7B]/90 to-[#4F6867]/90 backdrop-blur-xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_15px_30px_rgba(95,124,123,0.3)] hover:shadow-[0_20px_40px_rgba(95,124,123,0.5),0_0_20px_rgba(194,163,131,0.5)] hover:-translate-y-1 hover:from-[#4F6867]/90 hover:to-[#5F7C7B]/90 transition-all duration-500 relative overflow-hidden group/btn w-max"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C2A383]/40 to-transparent opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full transition-all duration-1000 ease-out"></div>
                    <span className="relative z-10 text-white group-hover/btn:text-[#C2A383] transition-colors duration-300">READ ARTICLE</span>
                    <span className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-[#C2A383] group-hover/btn:text-[#394652] transition-all duration-500 transform group-hover/btn:translate-x-1 shadow-sm">
                      <FiArrowRight />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Article Modal */}
      <ArticleModal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        article={selectedArticle}
      />
    </section>
  );
};

export default RecentBlogPreview;
