

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CASE_STUDIES } from '../constants';
import ProjectNavigation from '../components/ProjectNavigation';
import CaseStudyHero from '../components/case-study/CaseStudyHero';
import ChallengeSection from '../components/case-study/ChallengeSection';
import StrategySection from '../components/case-study/StrategySection';
import InsightsTable from '../components/case-study/InsightsTable';
import SolutionsGrid from '../components/case-study/SolutionsGrid';
import ImpactSection from '../components/case-study/ImpactSection';
import MethodologySection from '../components/case-study/MethodologySection';
import EvidenceList from '../components/case-study/EvidenceList';
import SegmentationTable from '../components/case-study/SegmentationTable';
import MediaGallery from '../components/case-study/MediaGallery';
// NEW: Professional components
import ProjectHeader from '../components/case-study/ProjectHeader';
import ProblemStatement from '../components/case-study/ProblemStatement';
import InsightStrategy from '../components/case-study/InsightStrategy';
import ProcessWorkflow from '../components/case-study/ProcessWorkflow';
import IterationShowcase from '../components/case-study/IterationShowcase';
import AnnotatedMockup from '../components/case-study/AnnotatedMockup';
import ImpactMetrics from '../components/case-study/ImpactMetrics';
import Reflection from '../components/case-study/Reflection';
import SegmentFramework from '../components/case-study/SegmentFramework';
// Nike Case Study Components
import NikeContext from '../components/case-study/nike/NikeContext';
import NikeInvestigation from '../components/case-study/nike/NikeInvestigation';
import NikePivot from '../components/case-study/nike/NikePivot';
import NikeSolution from '../components/case-study/nike/NikeSolution';
import NikeImpact from '../components/case-study/nike/NikeImpact';
// Generic Section Components (for all other case studies)
import CaseStudyHeroNew from '../components/case-study/sections/CaseStudyHeroNew';
import ContextSection from '../components/case-study/sections/ContextSection';
import InvestigationSection from '../components/case-study/sections/InvestigationSection';
import PivotSection from '../components/case-study/sections/PivotSection';
import SolutionSection from '../components/case-study/sections/SolutionSection';
import ImpactSectionNew from '../components/case-study/sections/ImpactSectionNew';


const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const study = CASE_STUDIES.find(s => s.id === id);
  const [caseStudiesData, setCaseStudiesData] = React.useState<Record<string, any>>({});

  // Load case study data from public folder
  React.useEffect(() => {
    fetch('./caseStudies.json')
      .then(res => res.json())
      .then(data => setCaseStudiesData(data))
      .catch(err => console.error('Failed to load case studies:', err));
  }, []);


  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center p-12 text-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-light tracking-tighter uppercase">Project Not Found</h1>
          <Link to="/" className="inline-block border-b border-stone-900 pb-1 text-[10px] font-bold tracking-[0.3em] uppercase">Back to Works</Link>
        </div>
      </div>
    );
  }

  // Use imported JSON data
  const projectsData: Record<string, any> = caseStudiesData;

  const data = projectsData[id!] || {
    heroTitle: study.title,
    challenge: "Project documentation currently in development.",
    ask: "Pending strategy overview.",
    strategy: "Detailed framework coming soon.",
    insights: [],
    solutions: [],
    impact: [],
    quote: "Building the future of design."
  };

  // Check format type
  const isNikeFormat = 'isNikeFormat' in data && data.isNikeFormat;
  const isNewSectionFormat = 'isNewSectionFormat' in data && data.isNewSectionFormat;
  const isNewFormat = 'quickPitch' in data;

  return (
    <main className="min-h-screen">
      {isNikeFormat ? (
        /* ===== NIKE SNKRS CUSTOM FORMAT ===== */
        <>
          {/* Hero Section - reduced py-16 to py-8 */}
          <section className="px-6 md:px-12 py-8 max-w-[1440px] mx-auto">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">Case Study</span>
              <h1 className="text-4xl md:text-6xl font-light text-stone-900 leading-tight">
                From Exclusivity to Confidence
              </h1>
              <div className="flex flex-wrap gap-6 text-[11px] font-medium tracking-widest text-stone-500 uppercase">
                <span>Nike SNKRS</span>
                <span>•</span>
                <span>Product Strategy</span>
                <span>•</span>
                <span>2024</span>
              </div>
            </div>
          </section>

          {/* Hero Visual - reduced py-12 to py-4 */}
          <section className="px-6 md:px-12 py-4 max-w-[1440px] mx-auto">
            <div className="aspect-[21/9] bg-stone-200 grayscale overflow-hidden border border-stone-200">
              <img
                src={study.imageUrl}
                alt={study.title}
                className="w-full h-full object-cover opacity-90 transition-all duration-1000 hover:grayscale-0"
              />
            </div>
          </section>

          {/* 5 Nike Sections - reduced py-24 to py-12 */}
          <section className="px-6 md:px-12 py-12 max-w-[1440px] mx-auto space-y-16">
            {/* Section 1: The Context */}
            <NikeContext
              background={data.context.background}
              ask={data.context.ask}
              problem={data.context.problem}
            />

            {/* Section 2: The Investigation */}
            <NikeInvestigation
              researchMethods={data.investigation.researchMethods}
              segments={data.investigation.segments}
              dataPoints={data.investigation.dataPoints}
            />

            {/* Section 3: The Pivot */}
            <NikePivot
              insight={data.pivot.insight}
              strategy={data.pivot.strategy}
            />

            {/* Section 4: The Solution */}
            <NikeSolution
              conceptName={data.solution.conceptName}
              concept={data.solution.concept}
              execution={data.solution.execution}
            />

            {/* Section 5: The Impact */}
            <NikeImpact
              benefits={data.impact.benefits}
              reflection={data.impact.reflection}
            />
          </section>
        </>
      ) : isNewSectionFormat ? (
        /* ===== NEW 5-SECTION FORMAT (All Case Studies) ===== */
        <>
          <CaseStudyHeroNew
            title={data.heroTitle}
            subtitle={data.heroSubtitle}
            category={study.category}
            year={study.year}
            imageUrl={study.imageUrl}
          />

          {/* 5 Sections - reduced py-24 to py-12 for tighter spacing after hero */}
          <section className="px-6 md:px-12 py-12 max-w-[1440px] mx-auto space-y-32">
            {/* Section 1: The Context */}
            <ContextSection
              background={data.context.background}
              ask={data.context.ask}
              problem={data.context.problem}
            />

            {/* Section 2: The Investigation */}
            <InvestigationSection
              researchMethods={data.investigation.researchMethods}
              segments={data.investigation.segments}
              dataPoints={data.investigation.dataPoints}
              showTalkToAudience={id === 'nike-snkrs'}
            />

            {/* Section 3: The Pivot */}
            <PivotSection
              insight={data.pivot.insight}
              strategy={data.pivot.strategy}
            />

            {/* Section 4: The Solution */}
            <SolutionSection
              conceptName={data.solution.conceptName}
              concept={data.solution.concept}
              execution={data.solution.execution}
            />

            {/* Section 5: The Impact */}
            <ImpactSectionNew
              benefits={data.impact.benefits}
              reflection={data.impact.reflection}
            />
          </section>
        </>
      ) : isNewFormat ? (
        /* ===== NEW PROFESSIONAL FORMAT ===== */
        <>
          {/* 1. Project Overview & Context */}
          <ProjectHeader
            title={data.title}
            quickPitch={data.quickPitch}
            metadata={data.metadata}
          />

          {/* Hero Visual */}
          <section className="px-6 md:px-12 py-12 max-w-[1440px] mx-auto">
            <div className="aspect-[21/9] bg-stone-200 grayscale overflow-hidden border border-stone-200">
              <img
                src={study.imageUrl}
                alt={study.title}
                className="w-full h-full object-cover opacity-90 transition-all duration-1000 hover:grayscale-0"
              />
            </div>
          </section>

          {/* 2-6. Professional Sections */}
          <section className="px-6 md:px-12 py-24 max-w-[1440px] mx-auto space-y-32">
            {/* 2. Background & Problem Statement */}
            <ProblemStatement
              challenge={data.challenge}
              hmw={data.hmw}
              goal={data.goal}
            />

            {/* 3. Insight & Strategy */}
            <InsightStrategy
              insight={data.insight}
              strategy={data.strategy}
            />

            {/* 4. Implementation & Process */}
            <div className="space-y-16">
              <ProcessWorkflow workflow={data.workflow} />
              {data.segments && <SegmentFramework segments={data.segments} />}
              {data.designDecisions && <IterationShowcase decisions={data.designDecisions} />}
            </div>

            {/* 5. Mockups & Reasoning */}
            {data.mockups && <AnnotatedMockup mockups={data.mockups} />}

            {/* 6. KPIs, Success & Reflection */}
            <div className="space-y-16">
              <ImpactMetrics
                quantitative={data.quantitative}
                qualitative={data.qualitative}
              />
              {data.reflection && <Reflection reflection={data.reflection} />}
            </div>
          </section>
        </>
      ) : (
        /* ===== LEGACY FORMAT (Nike SNKRS, etc.) ===== */
        <>
          {/* Hero Section with components */}
          <CaseStudyHero
            title={data.heroTitle}
            category={study.category}
            role={study.role}
            year={study.year}
            ask={data.ask}
          />

          {/* Hero Visual */}
          <section className="px-6 md:px-12 py-12 max-w-[1440px] mx-auto">
            <div className="aspect-[21/9] bg-stone-200 grayscale overflow-hidden border border-stone-200">
              <img
                src={study.imageUrl}
                alt={study.title}
                className="w-full h-full object-cover opacity-90 transition-all duration-1000 hover:grayscale-0"
              />
            </div>
          </section>

          {/* Content Grid */}
          <section className="px-6 md:px-12 py-24 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">

            {/* Left Column: Context */}
            <div className="md:col-span-4 space-y-24">
              <ChallengeSection challenge={data.challenge} />
              {data.methodology && <MethodologySection methods={data.methodology} title="The Polyculture Audit" />}
              <StrategySection strategy={data.strategy} />
            </div>

            {/* Right Column: Insights & Solution */}
            <div className="md:col-span-8 space-y-32">
              {data.evidence && <EvidenceList evidence={data.evidence} title="Evidence of the Confidence Gap" />}
              {data.segments && <SegmentationTable segments={data.segments} title="The 40/40/20 Opportunity" />}
              {data.media && <MediaGallery media={data.media.slice(0, 3)} title="Research & Insights" />}
              <InsightsTable insights={data.insights} />
              <SolutionsGrid solutions={data.solutions} />
              {data.media && data.media.length > 3 && <MediaGallery media={data.media.slice(3)} title="Solution Mockups" />}
              <ImpactSection quote={data.quote} impact={data.impact} />
            </div>
          </section>
        </>
      )}

      {/* Navigation Footer */}
      <ProjectNavigation currentId={id} />
    </main>
  );
};

export default CaseStudyDetail;
