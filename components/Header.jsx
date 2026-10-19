'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-xl py-3.5 border-b border-white/10 shadow-2xl'
          : 'py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-syne font-bold text-2xl tracking-tighter text-white hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <span className="w-7 h-7 rounded-lg bg-white text-black text-xs font-syne font-extrabold flex items-center justify-center tracking-normal">
              CP
            </span>
            <span>CraftPixel</span>
          </Link>
          <div className="hidden lg:flex items-center text-[11px] uppercase tracking-wider text-neutral-400 font-sans pl-4 border-l border-neutral-800">
            <span>Design &amp; Engineering — India · Worldwide</span>
          </div>
        </div>

        {/* Center Glass Pill Menu */}
        <nav className="hidden md:flex items-center gap-1 glass-pill px-3 py-1.5 rounded-full shadow-2xl">
          <Link
            href="/work"
            className={`px-4 py-1.5 text-xs md:text-sm font-medium rounded-full transition-colors ${
              pathname === '/work'
                ? 'bg-white/20 text-white font-semibold'
                : 'text-neutral-300 hover:text-white hover:bg-white/10'
            }`}
          >
            work
          </Link>
          <Link
            href="/#services"
            className="px-4 py-1.5 text-xs md:text-sm font-medium text-neutral-300 hover:text-white rounded-full transition-colors hover:bg-white/10"
          >
            services
          </Link>
          <Link
            href="/#studio"
            className="px-4 py-1.5 text-xs md:text-sm font-medium text-neutral-300 hover:text-white rounded-full transition-colors hover:bg-white/10"
          >
            studio
          </Link>
          <Link
            href="/#process"
            className="px-4 py-1.5 text-xs md:text-sm font-medium text-neutral-300 hover:text-white rounded-full transition-colors hover:bg-white/10"
          >
            process
          </Link>
          <Link
            href="#contact"
            className="px-4 py-1.5 text-xs md:text-sm font-semibold bg-white text-black hover:bg-neutral-200 rounded-full transition-all duration-200 ml-1"
          >
            let’s talk ↗
          </Link>
        </nav>

        {/* Right Status Pill */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-sans">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Available for Q2/Q3</span>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden glass-pill p-2 rounded-xl text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all">
          <div className="flex flex-col gap-4 text-sm font-medium">
            <Link onClick={() => setMobileOpen(false)} href="/work" className="py-2 text-white border-b border-neutral-900">
              Work
            </Link>
            <Link onClick={() => setMobileOpen(false)} href="/#services" className="py-2 text-neutral-300 hover:text-white border-b border-neutral-900">
              Services
            </Link>
            <Link onClick={() => setMobileOpen(false)} href="/#studio" className="py-2 text-neutral-300 hover:text-white border-b border-neutral-900">
              Studio
            </Link>
            <Link onClick={() => setMobileOpen(false)} href="/#process" className="py-2 text-neutral-300 hover:text-white border-b border-neutral-900">
              Process
            </Link>
            <Link onClick={() => setMobileOpen(false)} href="#contact" className="py-2 text-neutral-300 hover:text-white">
              Contact
            </Link>
            <Link onClick={() => setMobileOpen(false)} href="#contact" className="mt-2 text-center py-2.5 rounded-full bg-white text-black font-semibold">
              Let’s talk ↗
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
