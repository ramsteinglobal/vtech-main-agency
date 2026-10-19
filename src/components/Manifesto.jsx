import React from 'react';

export default function Manifesto() {
  return (
    <section className="py-24 md:py-36 px-6 max-w-5xl mx-auto">
      <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-bold leading-[1.28] tracking-tight text-white">
        We are an independent creative studio crafting{' '}
        <span className="inline-capsule align-middle mx-1">
          <span className="w-7 h-4 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center overflow-hidden">
            <svg className="w-3.5 h-3.5 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </span>
          <span className="text-xs uppercase font-sans tracking-wider text-neutral-200">websites</span>
        </span>
        websites, digital{' '}
        <span className="inline-capsule align-middle mx-1">
          <span className="w-7 h-4 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center overflow-hidden">
            <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </span>
          <span className="text-xs uppercase font-sans tracking-wider text-neutral-200">products</span>
        </span>
        products, and{' '}
        <span className="inline-capsule align-middle mx-1">
          <span className="w-7 h-4 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center overflow-hidden">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400" />
          </span>
          <span className="text-xs uppercase font-sans tracking-wider text-neutral-200">brands</span>
        </span>
        brands for forward-thinking businesses and modern founders.
      </h2>
    </section>
  );
}
