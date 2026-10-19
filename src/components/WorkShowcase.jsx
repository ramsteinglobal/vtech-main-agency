import React from 'react';
import { Link } from 'react-router-dom';

export default function WorkShowcase({ setActiveProject }) {
  const projects = [
    {
      id: 'velora',
      title: 'The Grand Velora',
      tags: ['Hospitality', 'Web Design'],
      desc: 'Cinematic digital welcome for a boutique coastal stay in Portugal. Quiet typography and +3.8x direct reservation growth.',
      stat: '+3.8x Direct Bookings',
      color: 'text-amber-400',
    },
    {
      id: 'arogya',
      title: 'Arogya Healthcare',
      tags: ['Healthtech', 'Care Portal'],
      desc: 'Empathetic digital health experience making specialized consultations clear, humane, and immediate.',
      stat: '99.4% Patient Trust',
      color: 'text-emerald-400',
    },
    {
      id: 'forma',
      title: 'Forma Living',
      tags: ['Commerce', 'Editorial'],
      desc: 'Warm editorial storefront for considered everyday furniture, tactile material swatches, and frictionless checkout.',
      stat: '+54% Order Value',
      color: 'text-orange-400',
    },
    {
      id: 'rasayana',
      title: 'Rasayana',
      tags: ['Fine Dining', 'Culinary'],
      desc: 'A moody digital home and reservations experience for multi-sensory seasonal tasting menus.',
      stat: '100% Weekend Capacity',
      color: 'text-rose-400',
    },
  ];

  return (
    <section className="work-showcase py-28 px-6 max-w-7xl mx-auto" id="work">
      <div className="work-showcase__header flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-white/10 gap-4">
        <div>
          <span className="text-xs uppercase font-sans tracking-widest text-neutral-400">Selected Work</span>
          <span className="work-showcase__index text-xs font-sans text-neutral-500 ml-3">CraftPixel Studios <span aria-hidden="true">·</span> 02 / 04</span>
        </div>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white text-neutral-300 hover:text-black text-xs font-sans tracking-wider transition-all self-start sm:self-auto"
        >
          <span>Explore All Case Studies (10) ↗</span>
        </Link>
      </div>

      <div className="work-showcase__list">
        {projects.map((item) => (
          <article
            key={item.id}
            className="work-project-card studio-card group cursor-pointer relative"
            onMouseEnter={() => setActiveProject(item.id)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <div className="work-project-card__line" aria-hidden="true">
              <div className="work-project-card__line-fill" />
            </div>
            <div className="work-project-card__main flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h3 className="work-project-card__title font-syne text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
                {item.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="work-project-card__tag text-xs uppercase font-sans tracking-wider px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
                <Link
                  to="/work"
                  className="work-project-card__link inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider"
                >
                  <span>View</span>
                </Link>
              </div>
            </div>
            <div className="work-project-card__details rounded-xl bg-neutral-900/60 border border-neutral-800 p-6 flex items-center justify-between">
              <p className="text-sm text-neutral-300">{item.desc}</p>
              <div className={`font-sans text-xs ${item.color}`}>{item.stat}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
