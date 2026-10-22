import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function WorkPage() {
  const [filter, setFilter] = useState('all');
  const [expandedPreview, setExpandedPreview] = useState(null);

  const workItems = [
    {
      id: 'velora',
      num: '01',
      category: 'Hospitality',
      badge: 'Portugal Coast',
      title: 'The Grand Velora',
      desc: 'A cinematic digital welcome for a boutique coastal stay. Quiet typography, ambient coastal transitions, and +3.8x direct reservation growth.',
      tags: ['Web Design', 'Brand System', 'Booking Engine'],
      stat: '+3.8x Direct Bookings',
      url: 'https://vtech-grandvelora-hotel.vercel.app/',
      livePreview: false,
      gradient: 'from-[#271b14] via-[#1a130f] to-[#0c0a09]',
      borderColor: 'group-hover:border-amber-500/40',
      categories: ['all', 'web', 'brand', 'hospitality'],
    },
    {
      id: 'arogya',
      num: '02',
      category: 'Healthcare',
      badge: 'Telehealth Portal',
      title: 'Arogya Healthcare',
      desc: 'Clear, humane access to care and specialized consultations. Human-centered design reducing patient booking anxiety and friction.',
      tags: ['Care Portal', 'Mobile UX', '99.4% CSAT'],
      stat: '99.4% Patient Trust',
      url: 'https://vtech-arogya-hospital-4sgp.vercel.app/',
      livePreview: true,
      gradient: 'from-[#062420] via-[#09322c] to-[#09090b]',
      borderColor: 'group-hover:border-emerald-500/40',
      categories: ['all', 'web', 'app', 'brand', 'healthcare'],
    },
    {
      id: 'forma',
      num: '03',
      category: 'Commerce',
      badge: 'Editorial Living',
      title: 'Forma Living',
      desc: 'A warm, tactile storefront for considered everyday furniture. Custom material swatch interactions, headless Shopify speed, and +54% AOV.',
      tags: ['Headless Shopify', 'Editorial CMS', 'Tactile Swatches'],
      stat: '+54% Order Value',
      url: 'https://vtech-formaliving-furniture-q832.vercel.app/',
      livePreview: true,
      gradient: 'from-[#2a1d17] via-[#1a1412] to-[#0d0b0a]',
      borderColor: 'group-hover:border-orange-500/40',
      categories: ['all', 'web', 'brand', 'b2b'],
    },
    {
      id: 'rasayana',
      num: '04',
      category: 'Experiential',
      badge: 'Fine Dining',
      title: 'Rasayana',
      desc: 'A moody editorial home and tasting reservations experience for multi-sensory seasonal dining. Garden provenance and ember storytelling.',
      tags: ['Editorial Home', 'Tasting Flow', '100% Booked'],
      stat: '100% Weekend Capacity',
      url: 'rasayana.table',
      gradient: 'from-[#3b120c] via-[#240b07] to-[#09090b]',
      borderColor: 'group-hover:border-rose-500/40',
      categories: ['all', 'web', 'culinary'],
    },
  ];

  const filteredItems = workItems.filter(
    (item) => filter === 'all' || item.categories.includes(filter)
  );

  useEffect(() => {
    const cards = gsap.utils.toArray('.work-page .work-list-item');
    if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const context = gsap.context(() => {
      cards.forEach((card) => {
        gsap.fromTo(card,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            overwrite: 'auto',
            scrollTrigger: { trigger: card, start: 'top 86%', once: true },
          }
        );
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => context.revert();
  }, [filter]);

  useEffect(() => {
    if (!expandedPreview) return undefined;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setExpandedPreview(null);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expandedPreview]);

  return (
    <main className="pt-32 md:pt-40 work-page">
      {/* Work Page Hero Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 mb-8 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-neutral-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white">
          <span aria-hidden="true">←</span> Back to Home
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="text-xs font-sans uppercase tracking-widest text-neutral-400 block mb-3">Portfolio Archive — 2022 to 2026</span>
            <h1 className="font-syne text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white leading-none">
              Our Work
            </h1>
          </div>
          <p className="text-neutral-400 text-sm md:text-base max-w-md font-normal leading-relaxed">
            Case studies in digital products, high-converting websites, and brand architecture for ambitious founders and teams.
          </p>
        </div>

      </section>

      {/* Sticky Category Filter Bar */}
      <section className="work-filter-bar max-w-7xl mx-auto px-6 md:px-12 sticky top-20 z-40 bg-black/90 backdrop-blur-md py-4 border-b border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wider transition-all flex items-center gap-1.5 shrink-0 ${
              filter === 'all'
                ? 'bg-white text-black font-semibold'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <span>All</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20">{workItems.length}</span>
          </button>

          <span className="h-4 w-[1px] bg-white/20 mx-2 shrink-0" />
          <span className="text-[10px] font-sans uppercase tracking-widest text-neutral-500 shrink-0">Expertise:</span>

          {['web', 'app', 'brand'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider transition-all uppercase shrink-0 ${
                filter === cat
                  ? 'bg-white text-black font-semibold'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}

          <span className="h-4 w-[1px] bg-white/20 mx-2 shrink-0" />
          <span className="text-[10px] font-sans uppercase tracking-widest text-neutral-500 shrink-0">Industry:</span>

          {['hospitality', 'healthcare', 'b2b', 'culinary'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wider transition-all capitalize shrink-0 ${
                filter === cat
                  ? 'bg-white text-black font-semibold'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Case Studies List */}
      <section className="work-case-studies max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="work-case-studies__heading">
          <span>Selected projects</span>
          <span>{String(filteredItems.length).padStart(2, '0')} case studies</span>
        </div>
        <div className="space-y-0">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="studio-card work-list-item group relative"
            >
              <div className="border-top-line">
                <div className="border-fill" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="work-list-copy lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-sans text-neutral-500 uppercase tracking-wider">
                      {item.num} / {item.category}
                    </span>
                    <span className="text-xs font-sans text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20">
                      {item.badge}
                    </span>
                  </div>
                  <h2 className="font-syne text-4xl sm:text-5xl md:text-6xl font-bold text-white group-hover:text-purple-200 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-neutral-400 text-sm md:text-base max-w-xl leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-sans px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="work-outcome" aria-label={`Project outcome: ${item.stat}`}>
                    <span className="work-outcome__mark" aria-hidden="true">↗</span>
                    <span className="work-outcome__label">Outcome</span>
                    <span className="work-outcome__value">{item.stat}</span>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-end">
                  {item.livePreview ? (
                    <div className={`work-list-preview relative w-full max-w-lg h-64 rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 ${item.borderColor} transition-all duration-500 shadow-2xl`}>
                      <iframe
                        src={item.url}
                        title={`${item.title} live website preview`}
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="absolute left-0 top-0 border-0 bg-white"
                        style={{
                          width: '250%',
                          height: '250%',
                          transform: 'scale(0.4)',
                          transformOrigin: 'top left',
                        }}
                      />
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-2 right-2 rounded-full bg-black/80 px-3 py-1.5 text-[10px] font-sans text-white underline underline-offset-2 backdrop-blur hover:bg-black"
                      >
                        Open site ↗
                      </a>
                      <button
                        type="button"
                        onClick={() => setExpandedPreview(item)}
                        aria-label={`Expand ${item.title} preview`}
                        className="absolute left-2 bottom-2 rounded-full bg-black/80 px-3 py-1.5 text-[10px] font-sans text-white backdrop-blur hover:bg-black"
                      >
                        Expand ⤢
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`work-list-preview w-full max-w-lg h-64 rounded-2xl overflow-hidden bg-gradient-to-br ${item.gradient} border border-white/10 p-6 flex flex-col justify-between ${item.borderColor} transition-all duration-500 shadow-2xl`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-sans text-neutral-300 uppercase tracking-widest">
                          {item.title}
                        </span>
                        <span className="text-xs text-white">↗</span>
                      </div>
                      <div className="space-y-1 my-auto">
                        <div className="text-xs font-syne font-bold text-white">{item.desc.slice(0, 48)}...</div>
                        <div className="text-[10px] font-sans text-cyan-400">{item.stat}</div>
                      </div>
                      <a
                        href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-sans text-neutral-400 hover:text-white underline underline-offset-2 transition-colors"
                      >
                        {item.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {expandedPreview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${expandedPreview.title} live preview`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setExpandedPreview(null);
          }}
        >
          <div className="flex h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
              <h2 className="truncate font-syne text-sm font-semibold text-white sm:text-base">
                {expandedPreview.title}
              </h2>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={expandedPreview.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20"
                >
                  Open site ↗
                </a>
                <button
                  type="button"
                  onClick={() => setExpandedPreview(null)}
                  className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-black hover:bg-neutral-200"
                  aria-label="Close live preview"
                >
                  Close ✕
                </button>
              </div>
            </div>
            <iframe
              src={expandedPreview.url}
              title={`${expandedPreview.title} expanded live preview`}
              referrerPolicy="strict-origin-when-cross-origin"
              className="min-h-0 w-full flex-1 border-0 bg-white"
            />
          </div>
        </div>
      )}
    </main>
  );
}
