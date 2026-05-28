import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonies = [
  { text: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small.", name: "Louise Kelly", title: "Illustrator Designer", img: "/images/person_1.jpg" },
  { text: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.", name: "Louise Kelly", title: "Illustrator Designer", img: "/images/person_2.jpg" },
  { text: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small  line of blind text by the name.", name: "Louise Kelly", title: "Illustrator Designer", img: "/images/person_3.jpg" },
  { text: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however.", name: "Louise Kelly", title: "Illustrator Designer", img: "/images/person_2.jpg" },
  { text: "Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small  line of blind text by the name.", name: "Louise Kelly", title: "Illustrator Designer", img: "/images/person_3.jpg" }
];

const TestimonySection = () => {
  return (
    <section className="relative py-12 lg:py-16 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-script text-[var(--color-primary)] text-3xl block mb-2">Testimony</span>
            <h2 className="text-4xl lg:text-5xl font-heading text-slate-900 font-bold tracking-wide mb-2">Customers Says</h2>
            <p className="text-slate-600">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </motion.div>
        </div>

        <div>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="pb-12"
          >
            {testimonies.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={`p-6 h-full rounded-2xl shadow-xl shadow-slate-200/50 transition-colors ${index % 2 !== 0 ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-slate-600 border border-slate-100'}`}>
                  <blockquote className="mb-3 relative">
                    <span className={`absolute -top-4 -left-2 text-4xl opacity-20 font-serif ${index % 2 !== 0 ? 'text-white' : 'text-[var(--color-primary)]'}`}>"</span>
                    <p className={`italic ${index % 2 !== 0 ? 'text-white' : 'text-slate-600'} leading-relaxed relative z-10`}>
                      "{item.text}"
                    </p>
                  </blockquote>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-200/20">
                    <img src={item.img} alt={item.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                    <div>
                      <h4 className={`font-medium font-heading ${index % 2 !== 0 ? 'text-white' : 'text-slate-900'}`}>{item.name}</h4>
                      <span className={`text-sm ${index % 2 !== 0 ? 'text-white/80' : 'text-slate-500'}`}>{item.title}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Pagination Style */}
          <style dangerouslySetInnerHTML={{__html: `
            .swiper-pagination-bullet {
              background: #c49b63;
              opacity: 0.5;
            }
            .swiper-pagination-bullet-active {
              opacity: 1;
              background: #c49b63;
            }
          `}} />
        </div>

      </div>
    </section>
  );
};

export default TestimonySection;
