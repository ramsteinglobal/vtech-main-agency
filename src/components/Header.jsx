import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = (active = false) =>
    `rounded-full px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ${
      active
        ? 'bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.12)]'
        : 'text-neutral-300 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-3 md:px-6 transition-all duration-300 ${scrolled ? 'pt-3' : 'pt-4'}`}>
      <div className={`mx-auto flex max-w-[1440px] items-center justify-between gap-4 rounded-2xl border px-4 md:px-6 transition-all duration-300 ${scrolled ? 'border-white/10 bg-black/70 py-2.5 shadow-2xl backdrop-blur-2xl' : 'border-white/[0.06] bg-black/25 py-3 backdrop-blur-xl'}`}>
        <Link
          to="/"
          aria-label="V-Tech home"
          className="group flex shrink-0 items-center gap-3 text-white transition-opacity hover:opacity-90"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-white/40 bg-gradient-to-br from-white via-violet-100 to-violet-300 font-syne text-sm font-extrabold tracking-tight text-[#17121f] shadow-[inset_0_1px_1px_rgba(255,255,255,.8),0_5px_18px_rgba(139,92,246,.22)] transition-transform duration-300 group-hover:rotate-[-5deg]">
            CP
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-syne text-[19px] font-bold tracking-[-0.055em]">V-Tech</span>
            <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400">Digital Studio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.055] p-1 backdrop-blur-2xl lg:flex">
          <Link to="/work" className={navClass(location.pathname === '/work')}>Work</Link>
          <Link to="/services" className={navClass(location.pathname === '/services')}>Services</Link>
          <Link to="/studio" className={navClass(location.pathname === '/studio')}>Studio</Link>
          <Link to="/process" className={navClass(location.pathname === '/process')}>Process</Link>
          <a href="#contact" className="ml-1 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-neutral-950 shadow-lg transition-all hover:bg-violet-100">
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <button
          onClick={() => setMobileOpen((open) => !open)}
          className="glass-pill flex h-10 w-10 items-center justify-center rounded-xl text-white lg:hidden"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="mx-3 mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-neutral-950/90 p-3 shadow-2xl backdrop-blur-2xl lg:hidden">
          <Link onClick={() => setMobileOpen(false)} to="/work" className="rounded-xl px-4 py-3 text-white transition-colors hover:bg-white/10">Work</Link>
          <Link onClick={() => setMobileOpen(false)} to="/services" className="rounded-xl px-4 py-3 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white">Services</Link>
          <Link onClick={() => setMobileOpen(false)} to="/studio" className="rounded-xl px-4 py-3 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white">Studio</Link>
          <Link onClick={() => setMobileOpen(false)} to="/process" className="rounded-xl px-4 py-3 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white">Process</Link>
          <a onClick={() => setMobileOpen(false)} href="#contact" className="mt-1 rounded-xl bg-white px-4 py-3 text-center font-semibold text-black">Let’s talk ↗</a>
        </nav>
      )}
    </header>
  );
}