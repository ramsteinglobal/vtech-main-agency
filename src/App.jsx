import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import ServicesPage from './pages/ServicesPage';
import StudioPage from './pages/StudioPage';
import ProcessPage from './pages/ProcessPage';
import ScrollMotion from './components/ScrollMotion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
    });

    const progressBar = document.getElementById('scroll-progress');
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      if (progressBar) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? (e.scroll / maxScroll) * 100 : 0;
        progressBar.style.width = `${progress}%`;
      }
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Top Scroll Progress Bar */}
      <div
        id="scroll-progress"
        className="fixed top-0 left-0 h-[2.5px] bg-gradient-to-r from-purple-500 via-indigo-400 to-white z-[70] w-0 transition-all duration-75"
      />
      <Header />
      <ScrollMotion />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/process" element={<ProcessPage />} />
      </Routes>
    </div>
  );
}
