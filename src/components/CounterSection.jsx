import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const counters = [
  { label: 'Coffee Branches', value: 100 },
  { label: 'Number of Awards', value: 85 },
  { label: 'Happy Customer', value: 10567 },
  { label: 'Staff', value: 900 },
];

const CounterItem = ({ label, value }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // ms
      const startTime = performance.now();
      
      const updateCounter = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          setCount(Math.floor((value * elapsedTime) / duration));
          requestAnimationFrame(updateCounter);
        } else {
          setCount(value);
        }
      };
      requestAnimationFrame(updateCounter);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl">
      <div className="text-4xl text-[var(--color-primary)] mb-2 border-2 border-[var(--color-primary)] w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-white hover:bg-[var(--color-primary)] hover:text-white transition-all cursor-pointer shadow-lg">
        ☕
      </div>
      <strong className="block text-3xl font-heading text-white font-bold mb-1">
        {count.toLocaleString()}
      </strong>
      <span className="text-white/80 text-sm tracking-widest uppercase font-medium">{label}</span>
    </div>
  );
};

const CounterSection = () => {
  return (
    <section className="relative py-12 bg-[url('/images/bg_2.jpg')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-slate-900/70" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {counters.map((item, index) => (
            <CounterItem key={index} label={item.label} value={item.value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
