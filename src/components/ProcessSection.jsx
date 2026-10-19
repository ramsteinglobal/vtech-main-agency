import React from 'react';

const steps = [
  { number: '01', title: 'Discover', copy: 'We learn your goals, audience, and what makes the opportunity matter.' },
  { number: '02', title: 'Shape', copy: 'We turn the brief into a clear direction, structure, and visual language.' },
  { number: '03', title: 'Build', copy: 'Design and engineering move together through careful, visible iterations.' },
  { number: '04', title: 'Launch', copy: 'We refine the details, ship with confidence, and help you grow from there.' },
];

export default function ProcessSection() {
  return (
    <section className="process-section max-w-7xl mx-auto px-6 py-24 md:py-32" id="process">
      <div className="process-section__heading">
        <span className="studio-eyebrow">From first thought to launch <span>— 04 / 04</span></span>
        <h2 className="font-syne">A clear path from idea to impact.</h2>
        <p>Small, thoughtful steps keep the work focused and the momentum moving.</p>
      </div>
      <div className="process-steps">
        {steps.map((step) => (
          <article className="process-step studio-card" key={step.number}>
            <span className="process-step__number">{step.number}</span>
            <div className="process-step__marker" aria-hidden="true" />
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
