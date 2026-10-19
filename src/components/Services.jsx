import React from 'react';

export default function Services() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10" id="services">
      <div className="max-w-3xl mb-20">
        <span className="text-xs uppercase font-sans tracking-widest text-neutral-400 block mb-4">What We Bring — 03 / 04</span>
        <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          We’re equally fluent in strategy, design systems, modern 3D engineering, and craft.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-8">
        <div className="studio-card border-t border-white/20 pt-8 flex flex-col justify-between h-full">
          <div>
            <span className="font-sans text-sm text-neutral-500 block mb-2">01</span>
            <h3 className="font-syne text-3xl font-bold text-white mb-6">Brand & Identity</h3>
            <ul className="space-y-3 text-neutral-300 text-sm md:text-base font-normal">
              <li className="hover:text-white transition-colors">Brand positioning & story</li>
              <li className="hover:text-white transition-colors">Visual identity & logos</li>
              <li className="hover:text-white transition-colors">Design tokens & typography</li>
              <li className="hover:text-white transition-colors">Design systems at scale</li>
            </ul>
          </div>
        </div>

        <div className="studio-card border-t border-white/20 pt-8 flex flex-col justify-between h-full">
          <div>
            <span className="font-sans text-sm text-neutral-500 block mb-2">02</span>
            <h3 className="font-syne text-3xl font-bold text-white mb-6">Digital Experience</h3>
            <ul className="space-y-3 text-neutral-300 text-sm md:text-base font-normal">
              <li className="hover:text-white transition-colors">UI/UX experience design</li>
              <li className="hover:text-white transition-colors">Interactive 3D WebGL scenes</li>
              <li className="hover:text-white transition-colors">High-impact landing pages</li>
              <li className="hover:text-white transition-colors">Kinetic micro-animations</li>
            </ul>
          </div>
        </div>

        <div className="studio-card border-t border-white/20 pt-8 flex flex-col justify-between h-full">
          <div>
            <span className="font-sans text-sm text-neutral-500 block mb-2">03</span>
            <h3 className="font-syne text-3xl font-bold text-white mb-6">Creative Engineering</h3>
            <ul className="space-y-3 text-neutral-300 text-sm md:text-base font-normal">
              <li className="hover:text-white transition-colors">MERN Stack & React Three Fiber</li>
              <li className="hover:text-white transition-colors">Custom GLSL shaders & lighting</li>
              <li className="hover:text-white transition-colors">Express REST APIs & MongoDB</li>
              <li className="hover:text-white transition-colors">Zero-bloat performance optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
