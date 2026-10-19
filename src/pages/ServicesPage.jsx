import React from 'react';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Services from '../components/Services';

export default function ServicesPage() {
  return (
    <main className="content-page pt-32 md:pt-40">
      <PageHero eyebrow="What we do" title="Services" index="03 / 04" description="A considered mix of strategy, design, and engineering to move your business forward." />
      <Services />
      <Footer />
    </main>
  );
}
