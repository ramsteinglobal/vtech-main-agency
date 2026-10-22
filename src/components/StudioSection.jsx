import React from 'react';

const principles = [
  { number: '01', title: 'Founder led', copy: 'Direct collaboration from first conversation through launch.' },
  { number: '02', title: 'Small by design', copy: 'A focused team keeps every decision close to the work.' },
  { number: '03', title: 'Built to last', copy: 'Thoughtful systems that stay clear, fast, and easy to grow.' },
];

export default function StudioSection() {
  return (
    <section className="studio-section max-w-7xl mx-auto px-6 py-24 md:py-32" id="studio">
      <div className="studio-section__intro">
        <span className="studio-eyebrow">A little about us <span>— 01 / 04</span></span>
        <h2 className="font-syne">An independent studio for ambitious ideas.</h2>
        <p>V-Tech brings strategy, design, and engineering together in one close-knit team. We make digital experiences with clarity, character, and care.</p>
      </div>
      <div className="studio-principles">
        {principles.map((principle) => (
          <article className="studio-principle studio-card" key={principle.number}>
            <span className="studio-principle__number">{principle.number}</span>
            <div>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </div>
            <span className="studio-principle__arrow" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}
