import React, { useState } from 'react';

import Manifesto from '../components/Manifesto';
import Marquee from '../components/Marquee';
import WorkShowcase from '../components/WorkShowcase';
import Services from '../components/Services';
import StudioSection from '../components/StudioSection';
import ProcessSection from '../components/ProcessSection';
import Metrics from '../components/Metrics';
import Footer from '../components/Footer';
import CursorTracker from '../components/CursorTracker';
import HeroVideoBackground from '../components/HeroVideoBackground';

export default function HomePage() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="min-h-screen home-page">
      <CursorTracker activeProject={activeProject} />
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden aura-glow" id="home">
        <HeroVideoBackground />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/35 via-black/25 to-black/55" />
        <div className="absolute z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="relative z-10 text-center max-w-6xl mx-auto flex flex-col items-center">
          <h1 className="hero-title font-syne font-extrabold select-none" aria-label="CraftPixel">
            <span>Craft</span>
            <span className="hero-title-accent">Pixel</span>
          </h1>
          <a href="#work" className="glass-pill mt-8 px-6 py-3 rounded-full text-white text-sm font-semibold tracking-wide hover:scale-105 transition-transform">
            Explore selected work ↓
          </a>
          <p className="mt-6 text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
            We design and engineer considered 3D websites, digital products, and brand architecture that make ambitious businesses impossible to ignore.
          </p>
        </div>
      </section>
      <Manifesto />
      <StudioSection />
      <Marquee />
      <WorkShowcase setActiveProject={setActiveProject} />
      <Services />
      <ProcessSection />
      <Metrics />
      <Footer />
    </div>
  );
}