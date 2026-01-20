
import React from 'react';
import { CASE_STUDIES } from '../constants';
import CaseStudyCard from '../components/CaseStudyCard';
import ImageTrail from '../components/ImageTrail';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Dynamic Image Trail */}
      <ImageTrail>
        <section className="px-6 md:px-12 py-32 md:py-48 max-w-[1440px] mx-auto border-b border-stone-200 bg-transparent">
          <div className="max-w-4xl space-y-10">
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter text-stone-900 leading-[0.95] select-none">
              Bridging the gap between <span className="italic font-normal">creative customer experience</span> and quantitative growth metrics.
            </h2>
            <div className="h-px w-32 bg-stone-900"></div>
            <p className="text-xl md:text-2xl text-stone-600 max-w-2xl leading-relaxed font-light">
              Multifaceted strategist and designer specialized in high-performance retail ecosystems,
              product design, and brand architecture.
            </p>
          </div>
        </section>
      </ImageTrail>

      {/* Case Studies Grid */}
      <section className="px-6 md:px-12 py-24 max-w-[1440px] mx-auto">
        <div className="mb-16 flex items-baseline justify-between">
          <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">
            Selected Works
          </h2>
          <span className="text-[11px] font-medium tracking-[0.2em] text-stone-400 uppercase">
            {CASE_STUDIES.filter(study => study.published !== false).length} Projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.filter(study => study.published !== false).map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </section>

      {/* Capabilities CTA */}
      <section className="bg-stone-900 text-white px-6 md:px-12 py-32 text-center">
        <div className="max-w-3xl mx-auto space-y-12">
          <h3 className="text-3xl md:text-5xl font-light tracking-tight uppercase leading-snug">
            Ready to scale your next project?
          </h3>
          <p className="text-stone-400 text-lg md:text-xl font-light italic">
            "Expertise in retail strategy, digital fluency, and high-fidelity systems design."
          </p>
          <a
            href="mailto:bennpattara@gmail.com"
            className="inline-block px-12 py-5 bg-white text-stone-900 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-stone-100 transition-colors"
          >
            Start Conversation
          </a>
        </div>
      </section>
    </main>
  );
};

export default Home;
