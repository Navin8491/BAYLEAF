import React from 'react';
import { motion } from 'framer-motion';

const AboutStory = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[300px] lg:h-[450px]"
            >
              <img 
                src="/images/about.jpg" 
                alt="Our Story" 
                className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-slate-200/50"
              />
            </motion.div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-4">
                <span className="font-script text-[var(--color-primary)] text-3xl block mb-2">Discover</span>
                <h2 className="text-4xl lg:text-5xl font-heading text-slate-900 font-bold tracking-wide">Our Story</h2>
              </div>
              
              <div className="space-y-3 text-slate-600 leading-loose">
                <p>
                  On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.
                </p>
                <p>
                  But nothing the copy said could convince her and so it didn't take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutStory;
