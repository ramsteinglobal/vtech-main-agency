import React from 'react';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import StudioSection from '../components/StudioSection';

export default function StudioPage() {
  return (
    <main className="content-page pt-32 md:pt-40">
      <PageHero eyebrow="Who we are" title="Studio" index="01 / 04" description="A small, founder-led creative studio partnering closely with ambitious teams." />
      <StudioSection />
      <Footer />
    </main>
  );
}
