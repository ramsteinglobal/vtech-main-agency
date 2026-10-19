import React from 'react';
import { Link } from 'react-router-dom';

export default function PageHero({ eyebrow, title, description, index }) {
  return (
    <section className="page-hero max-w-7xl mx-auto px-6 md:px-12 pb-16">
      <Link to="/" className="inline-flex items-center gap-2 mb-10 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-neutral-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white">
        <span aria-hidden="true">←</span> Back to Home
      </Link>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-12">
        <div>
          <span className="studio-eyebrow block mb-4">{eyebrow} <span>— {index}</span></span>
          <h1 className="font-syne">{title}</h1>
        </div>
        <p>{description}</p>
      </div>
    </section>
  );
}
