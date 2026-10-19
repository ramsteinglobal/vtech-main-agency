import React from 'react';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import ProcessSection from '../components/ProcessSection';

export default function ProcessPage() {
  return (
    <main className="content-page pt-32 md:pt-40">
      <PageHero eyebrow="How we work" title="Process" index="04 / 04" description="A clear, collaborative path from the first conversation to a confident launch." />
      <ProcessSection />
      <Footer />
    </main>
  );
}
