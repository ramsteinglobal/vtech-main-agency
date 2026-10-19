import React from 'react';

export default function Marquee() {
  const items = [
    'The Grand Velora',
    'Arogya Healthcare',
    'Forma Living',
    'Rasayana Dining',
    'Three.js & R3F',
    'MongoDB & Express',
    'React 18 & Vite',
  ];

  return (
    <section className="py-12 border-y border-white/10 overflow-hidden bg-black/60 relative">
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      <div className="marquee-track flex items-center gap-6">
        <div className="flex items-center gap-6 shrink-0">
          {items.map((item, index) => (
            <div
              key={`m1-${index}`}
              className="px-8 py-3 rounded-2xl bg-[#141416] border border-white/10 text-white font-syne font-bold text-lg md:text-xl tracking-tight transition hover:border-white/30 hover:scale-105 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 shrink-0">
          {items.map((item, index) => (
            <div
              key={`m2-${index}`}
              className="px-8 py-3 rounded-2xl bg-[#141416] border border-white/10 text-white font-syne font-bold text-lg md:text-xl tracking-tight transition hover:border-white/30 hover:scale-105 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
