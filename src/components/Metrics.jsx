import React from 'react';

export default function Metrics() {
  const metrics = [
    { value: '99.8%', label: 'Lighthouse Performance', sub: 'Average client platform score' },
    { value: '3.8x', label: 'Direct booking lift', sub: 'The Grand Velora, post-launch' },
    { value: '+54%', label: 'Higher Cart Conversion', sub: 'Forma Living E-Commerce' },
    { value: '<1.1s', label: 'Time To Interactive', sub: 'Zero-bloat optimized delivery' },
    { value: '100%', label: 'Senior-led Attention', sub: 'No handoffs to junior reps' },
    { value: '4.9★', label: 'Client satisfaction', sub: 'Verified partner reviews' },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10" id="metrics">
      <div className="mb-14">
        <span className="text-xs uppercase font-sans tracking-widest text-neutral-400">
          Measurable Impact Across Studio Builds
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {metrics.map((m, i) => (
          <div key={i} className="studio-card border-b border-neutral-800 pb-8">
            <div className="font-syne text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">
              {m.value}
            </div>
            <div className="text-sm uppercase tracking-wider font-semibold text-neutral-200">
              {m.label}
            </div>
            <div className="text-xs text-neutral-400 mt-1 font-sans">{m.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
