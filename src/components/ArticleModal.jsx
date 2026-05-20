import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const ArticleModal = ({ isOpen, onClose, article }) => {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!article) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end font-body overflow-hidden">
          
          {/* Backdrop Blur & Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-[#2F343B]/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Left Side: Cinematic Image (Desktop Only for Split Layout) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute left-6 top-6 bottom-6 w-[calc(50%-3rem)] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(47,52,59,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#394652]/40 to-transparent z-10 mix-blend-overlay"></div>
            <img 
              src={article.img} 
              alt={article.title} 
              className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s] ease-out"
            />
          </motion.div>

          {/* Right Side: Sliding Panel (Half-page on Desktop, Full on Mobile) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full lg:w-1/2 h-full bg-[var(--color-soft-ivory)] shadow-2xl flex flex-col"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 lg:top-10 lg:right-10 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-xl border border-[#B89D7C]/30 text-[#394652] hover:bg-[#394652] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg group"
            >
              <FiX className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Mobile Image (Hidden on Desktop) */}
            <div className="block lg:hidden w-full h-[40vh] relative shrink-0">
               <div className="absolute inset-0 bg-gradient-to-t from-[#2F343B]/60 to-transparent z-10 mix-blend-overlay"></div>
               <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-8 py-12 lg:px-20 lg:py-24 custom-scrollbar relative">
              {/* Ambient blur inside panel */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#B89D7C]/10 rounded-full blur-[80px] pointer-events-none"></div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B89D7C] bg-[#B89D7C]/10 px-4 py-2 rounded-full border border-[#B89D7C]/20">{article.category}</span>
                  <span className="text-xs font-light text-[#667786] uppercase tracking-wider">{article.date}</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-heading font-medium text-[#2F343B] mb-10 leading-[1.1] tracking-tight">
                  {article.title}
                </h1>

                <div className="w-16 h-px bg-[#B89D7C]/50 mb-10"></div>

                <div className="prose prose-lg prose-p:text-[#667786] prose-p:font-light prose-p:leading-relaxed prose-p:mb-8 prose-headings:font-heading prose-headings:text-[#394652] prose-headings:font-medium prose-strong:text-[#2F343B] prose-strong:font-medium max-w-none">
                  {article.content ? (
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                  ) : (
                    <>
                      <p className="text-xl text-[#394652] font-medium leading-relaxed mb-10">
                        {article.desc || article.excerpt}
                      </p>
                      <p>
                        Rooted in modern cinematic design and the vibrant coffee culture, we believe in stripping away the unnecessary to focus on what truly matters: exceptional quality, warmth, and connection.
                      </p>
                      <p>
                        Every cup we serve is a testament to our dedication to the craft. We source sustainably, roast meticulously, and brew with an unwavering attention to detail. Our process is a delicate dance between science and art, where precise measurements meet intuitive adjustments based on the beans' unique characteristics.
                      </p>
                      <h3 className="text-2xl mt-12 mb-6">The Importance of Origin</h3>
                      <p>
                        When we travel to origin, we're not just looking for the best tasting coffee; we're looking for partners who share our values. Farmers who prioritize the health of their soil, the well-being of their workers, and the sustainability of their practices.
                      </p>
                      <p>
                        By building direct, long-term relationships, we ensure that our coffee is not only delicious but also ethical and sustainable. This commitment shines through in every sip, creating a truly premium experience.
                      </p>
                      <blockquote className="border-l-4 border-[#B89D7C] pl-6 py-2 my-10 italic text-[#394652] text-2xl font-light">
                        "Coffee is a language in itself, a connection between the hands that grew it and the hands that brew it."
                      </blockquote>
                      <p>
                        Join us as we continue to explore the endless possibilities of coffee, constantly refining our techniques and pushing the boundaries of flavor.
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ArticleModal;
