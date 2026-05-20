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
    <section className="py-32 lg:py-40 relative z-20 mx-4 lg:mx-8 mb-20 px-6 lg:px-12">
      {/* Glassmorphism Background Panel */}
      <div className="absolute inset-0 bg-[var(--color-silver-fog)]/20 backdrop-blur-3xl rounded-[4rem] border border-[var(--color-silver-fog)]/40 shadow-[0_20px_40px_rgba(56,68,80,0.05)] -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="inline-flex items-center gap-2 text-[var(--color-muted-teal)] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              <span className="w-8 h-px bg-[var(--color-muted-teal)]/60"></span> Insights & Stories
            </span>
            <h2 className="text-5xl lg:text-6xl font-heading font-medium text-[var(--color-rich-graphite)] leading-tight">From the <span className="italic font-light text-[var(--color-deep-slate)]">Journal.</span></h2>
          </div>
          <Link to="/blog" className="px-10 py-4 rounded-full bg-[var(--color-silver-fog)]/30 border border-[var(--color-deep-slate)]/10 text-[var(--color-deep-slate)] hover:bg-[var(--color-deep-slate)] hover:text-white transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em]">
            VIEW ALL ARTICLES
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              className="group block relative flex flex-col bg-[var(--color-soft-ivory)]/80 backdrop-blur-2xl border border-[var(--color-silver-fog)]/60 rounded-[2.5rem] overflow-hidden shadow-[0_20px_40px_rgba(57,70,82,0.08)] hover:shadow-[0_30px_60px_rgba(57,70,82,0.15)] transition-all duration-500 hover:-translate-y-2 hover:bg-white"
            >
              <div onClick={() => setSelectedArticle(blog)} className="block relative w-full aspect-[4/3] m-3 mb-0 rounded-[2rem] overflow-hidden p-2 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-powder-blue)]/90 via-[var(--color-soft-ivory)] to-[var(--color-sage-mist)]/80 opacity-90 group-hover:opacity-100 transition-opacity duration-700 z-0 rounded-[2rem]"></div>

                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-[0_10px_20px_rgba(57,70,82,0.12)] z-10 bg-white">
                  <div className="absolute inset-0 bg-[var(--color-deep-slate)]/10 group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-overlay"></div>
                  <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                </div>
              </div>

              <div className="p-8 relative z-20 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--color-muted-teal)] bg-[var(--color-silver-fog)]/30 px-3 py-1 rounded-full border border-[var(--color-muted-teal)]/20">{blog.category}</span>
                  <span className="text-[10px] font-light text-[var(--color-gray-blue)] uppercase tracking-wider">{blog.date}</span>
                </div>

                <h3 className="text-2xl font-heading font-medium text-[var(--color-rich-graphite)] mb-4 group-hover:text-[var(--color-muted-teal)] transition-colors duration-500 cursor-pointer" onClick={() => setSelectedArticle(blog)}>
                  {blog.title}
                </h3>

                <p className="text-[var(--color-gray-blue)] leading-relaxed text-sm font-light mb-6 flex-grow">
                  {blog.desc}
                </p>

                <button
                  onClick={() => setSelectedArticle(blog)}
                  className="inline-flex items-center justify-between gap-6 px-7 py-3 mt-auto rounded-full bg-white/60 backdrop-blur-md border border-[var(--color-silver-fog)] text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-deep-slate)] shadow-[0_10px_20px_rgba(57,70,82,0.05)] hover:shadow-[0_20px_40px_rgba(95,124,123,0.2)] hover:-translate-y-1 hover:border-[var(--color-muted-teal)]/30 transition-all duration-500 relative overflow-hidden group/btn w-max"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-muted-teal)]/10 via-[var(--color-deep-sage-teal)]/10 to-transparent opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full transition-all duration-1000 ease-out"></div>
                  <span className="relative z-10 group-hover/btn:text-[var(--color-muted-teal)] transition-colors duration-300">DISCOVER STORY</span>
                  <span className="relative z-10 w-8 h-8 rounded-full bg-[var(--color-silver-fog)]/60 flex items-center justify-center group-hover/btn:bg-[var(--color-muted-teal)] group-hover/btn:text-white transition-all duration-500 transform group-hover/btn:translate-x-1 shadow-sm">
                    <FiArrowRight />
                  </span>
                </button>
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
