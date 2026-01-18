

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


const CaseStudyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const study = CASE_STUDIES.find(s => s.id === id);

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

  // Define content for specific case studies
  const projectsData: Record<string, any> = {
    'on-apex': {
      heroTitle: "On Apex: Run Free",
      challenge: "While legacy running brands focus heavily on performance and gear, the experience often remains isolating or intimidating for many. On—a brand born in the Swiss Alps to unlock human potential through movement—had an opportunity to move beyond footwear and into the social fabric of the running community.",
      ask: "How might we create a transformative running experience that combines community and innovation to help runners unlock their full potential?",
      strategy: "Breaking Barriers through Movement. The project is built on the universal truth that movement is the purest form of human expression, yet internal and external barriers often restrict our growth. On Apex transforms running from a solo physical activity into a collective movement of personal liberation.",
      insights: [
        { metric: '70%', label: 'Motivation', detail: 'Of runners feel more motivated when running with others.' },
        { metric: '65%', label: 'Gamification', detail: 'Of runners are interested in gamified fitness challenges.' },
        { metric: '80%', label: 'Innovation', detail: 'Of runners value innovation in their gear and training tools.' }
      ],
      solutions: [
        { title: "Personalized Pod Matching", desc: "Users are sorted into pods of 10–20 runners based on lifestyle indicators and goals to ensure cultural fit—from Early Bird City to Weekend Warriors." },
        { title: "Gamification & Competition", desc: "City-wide and international leaderboards turn personal wins into collective triumphs for pods in Chicago, London, and Seoul." },
        { title: "High-Tech Integration", desc: "Mapbox-powered route planning, AR navigation tools, and deep-dive post-run analytics." },
        { title: "Rewards & Ecosystem", desc: "Tiered brand incentives like discount codes and free item redemptions, plus partner benefits from Spotify and Masterclass." }
      ],
      impact: [
        { title: "Deepened Brand Loyalty", desc: "Moving the relationship beyond a one-time footwear purchase." },
        { title: "Market Expansion", desc: "Reaching beginner runners and enthusiasts who previously felt intimidated by performance-only branding." }
      ],
      quote: "Barriers don't define you. Your steps do. Move. Run Free."
    },
    'stella-mccartney': {
      heroTitle: "Stella McCartney x Zellerfeld",
      challenge: "Despite being a global leader in eco-conscious fashion, the industry struggles with overproduction and waste. Stella McCartney faced the challenge of further reducing her footprint while maintaining high-performance luxury.",
      ask: "How might we integrate 3D printing into Stella McCartney’s sustainable fashion toolbox to augment luxury, innovation, and environmental impact?",
      strategy: "Innovation Through Circularity. Transitioning from traditional manufacturing to a circular, on-demand model by partnering with Zellerfeld, a leader in 3D-printed footwear.",
      insights: [
        { metric: '64%', label: 'Energy', detail: '3D printing reduces energy consumption compared to traditional manufacturing.' },
        { metric: '90%', label: 'Resources', detail: 'Natural resources can be saved through 3D printing in fashion production.' },
        { metric: '64%', label: 'Consumer', detail: 'Willingness to pay more for products that are demonstrably sustainable.' }
      ],
      solutions: [
        { title: "Material Innovation", desc: "Crafted from 100% recyclable TPU, allowing the brand to reclaim and reuse the material for future products." },
        { title: "On-Demand Production", desc: "Garments created only when ordered to eliminate overstock. Personalized fitting and precise zero-waste material usage." },
        { title: "Minimalist Aesthetic", desc: "Balancing signature functional, timeless design with unique textures achievable only through 3D printing." },
        { title: "Implementation", desc: "Real-time 3D printing demos in stores and digital storytelling campaigns highlighting the journey of TPU filament." }
      ],
      impact: [
        { title: "Sustainability", desc: "Significant, measurable reductions in waste and energy consumption." },
        { title: "Market Leadership", desc: "Reinforcement of the position as the primary innovator in ethical luxury." }
      ],
      quote: "3D printing isn't just a new tool; it's a new language for sustainable luxury."
    },
    'nike-snkrs': {
      heroTitle: "Nike SNKRS: Bridging the Confidence Gap",
      challenge: "Nike's shock drop strategy drove SNKRS demand up ~70%, but created a toxic culture of exclusion and bot-fighting that alienated core consumers. How should Nike reimagine its ecosystem for a value-conscious generation?",
      ask: "How can Nike transition from 'Hype Machine' to 'Confidence Leader' and capture the 80% seeking integration over exclusivity?",
      strategy: "Cross-category analysis revealed consumers don't need more sneakers—they need confidence in how to wear them. 40% own 7-10+ pairs but only rotate 2-3 due to fear of 'style mistakes.' Strategic shift: remove styling paralysis through platform evolution.",
      methodology: [
        { title: "Mainstream Fashion", description: "Shift from single trends to 'Polyculture'—Balletcore, Gorpcore, Retro-Running coexisting." },
        { title: "Streetwear Strategy", description: "Musicians (Travis Scott) replacing influencers as credibility drivers." },
        { title: "High Fashion/Luxury", description: "Luxury collabs (Dior x Jordan) taught consumers footwear styling stakes." }
      ],
      evidence: [
        { title: "The Rotation Problem", description: "40% own 7-10+ pairs but rotate only 2-3 due to fear of style mistakes." },
        { title: "Aesthetic Tribes", description: "78% prefer vintage markets over shock drops to curate unique looks vs. collect hype." },
        { title: "The Price of Uncertainty", description: "70% halt purchases at 5% price increases unless item feels emotionally meaningful." }
      ],
      segments: [
        { name: "Aesthetic Individualists", share: "40%", mindset: "Want integration into existing style.", opportunity: "Needs styling support for growth." },
        { name: "Function-First Pragmatists", share: "40%", mindset: "Value durability over hype.", opportunity: "Pay premium for expertise." },
        { name: "Culture Curators", share: "20%", mindset: "Motivated by rarity and resale.", opportunity: "Nike's current focus—saturated." }
      ],
      media: [
        { type: 'image' as const, caption: "Cross-category trend analysis showing the fragmentation of fashion aesthetics (2024-2026)" },
        { type: 'image' as const, caption: "Consumer survey results revealing the confidence gap in sneaker purchasing behavior" },
        { type: 'image' as const, caption: "Target segment personas: Aesthetic Individualists, Function-First Pragmatists, and Culture Curators" },
        { type: 'image' as const, caption: "The Style Gym: Transforming static product pages into interactive styling hubs" },
        { type: 'image' as const, caption: "The Confidence Drop: 48-hour guaranteed access windows replacing stressful raffles" },
        { type: 'image' as const, caption: "Nike Stylist AI: Closet analysis and outfit visualization tool interface" }
      ],
      insights: [
        { metric: '40%', label: 'Aesthetic Individualists', detail: 'Want sneakers to integrate into their existing style. High growth segment needs styling support.' },
        { metric: '40%', label: 'Function-First Pragmatists', detail: 'Dislike hype; value durability and expertise. Willing to pay premium for approachable guidance.' },
        { metric: '20%', label: 'Culture Curators', detail: 'Motivated by rarity and resale. Nike\'s current focus but represents saturated market.' },
        { metric: '78%', label: 'Vintage Over Hype', detail: 'Would choose vintage market over shock drops to curate unique looks vs. just collecting.' },
        { metric: '70%', label: 'Price Sensitivity', detail: 'Would halt purchase at 5% price increase unless item is emotionally meaningful.' }
      ],
      solutions: [
        { title: "Phase 1: The Style Gym", desc: "Transform product pages into styling hubs with 'Complete the Look' commerce and contextual outfit examples to remove purchasing paralysis." },
        { title: "Phase 1: The Confidence Drop", desc: "Replace stressful raffles with 48-hour pre-order windows for Core Releases, guaranteeing access for committed fans." },
        { title: "Phase 2: Nike Stylist AI", desc: "AI-powered closet analysis and 'Shazam for Outfits' to help users visualize new purchases with existing wardrobe." },
        { title: "Phase 2: Certified Pre-Worn", desc: "Authenticated resale and buy-back loops to capture the value-conscious vintage market." },
        { title: "Phase 3: The Confidence Index", desc: "Annual data-driven report transforming user interactions into the definitive guide for global street culture." }
      ],
      impact: [
        { title: "Increased AOV", desc: "Reducing the 'unworn product' barrier leads to more frequent, high-value purchases as consumers gain confidence." },
        { title: "Defensive Strategy", desc: "Combat 'Dupe Culture' by providing brand storytelling and styling support that knockoffs cannot replicate." },
        { title: "Market Expansion", desc: "Capture the overlooked 80% (Individualists + Pragmatists) while maintaining Culture Curator relationships." }
      ],
      quote: "The market hasn't collapsed because people lost interest. It's stalled because people lost certainty."
    },
    'stylect': {
      heroTitle: "Stylect: Humanizing Fashion Discovery",
      challenge: "Modern fashion shoppers are paralyzed by infinite digital choice and generic recommendation engines. This 'post-algorithm' consumer values authenticity over automated feeds but often lacks the time or expertise to curate a cohesive wardrobe.",
      ask: "How might we equip conscious individuals to build a lasting wardrobe with intention by connecting them with trusted human expertise?",
      strategy: "The 'One Perfect Item' Framework. The core mission is to liberate users from trend-driven noise. Success is defined by a single, high-confidence outcome: finding one perfect item for one specific occasion in under 24 hours.",
      insights: [
        { metric: '70%', label: 'Conversion', detail: 'Users report feeling more confident in their purchase post-checkout.' },
        { metric: '≤24h', label: 'Speed-to-Solve', detail: 'Median time from brief submission to purchase outcome.' },
        { metric: '40%', label: 'Retention', detail: 'First-time purchasers open a second brief within 60 days.' }
      ],
      solutions: [
        { title: "1:1 Stylist Match", desc: "A 2-minute quiz matches users to real stylists based on inventory and vibe, with a 2-hour response SLA." },
        { title: "Occasion Brief Builder", desc: "A 5-question wizard captures event type, dress code, and weather, allowing Pinterest board integration for context." },
        { title: "The Phygital Bridge", desc: "A 'Try & Decide' loop where users reserve items for in-store pickup via QR code or handle returns seamlessly." },
        { title: "Style Vault", desc: "A 'Closet Lite' feature where users upload photos of owned items, allowing stylists to reference them for future suggestions." }
      ],
      impact: [
        { title: "Humanized Discovery", desc: "Shifting the paradigm from generic algorithms to trusted human interaction." },
        { title: "Brand Ecosystem", desc: "A three-way value proposition connecting customers, stylists, and brand managers with data-driven insights." }
      ],
      quote: "Fashion is paralyzed by choice. Stylect provides the clarity of a human voice."
    },
    'diesel': {
      heroTitle: "Diesel Tokyo: The Brand Temple",
      challenge: "Since Glenn Martens’ appointment as Creative Director in 2020, Diesel has regained its critical and commercial 'cool factor'. However, to capture the next generation, the brand requires a major physical statement that elevates its prestige and moves beyond retail to become a lived universe.",
      ask: "How might we create a definitive global power move in a market that demands depth, tradition, and forward-thinking trends?",
      strategy: "The Iceberg. Conceptual alignment with Harajuku's landmark structure: What you see on the surface is only 10% (rebellious product); the submerged 90% is the soul (Italian heritage and craftsmanship). Success in Tokyo serves as a powerful global benchmark for Asian expansion.",
      insights: [
        { metric: 'Market', label: 'Tokyo Tuning', detail: 'Deep appreciation for premium denim and durable craftsmanship.' },
        { metric: 'Resilient', label: 'Physical First', detail: 'Market continues to prioritize in-person retail experiences over e-commerce.' },
        { metric: 'Gateway', label: 'Asia Expansion', detail: 'Success in Tokyo serves as a powerful global benchmark and launchpad.' }
      ],
      solutions: [
        { title: "Retail & Gallery", desc: "A sculptural 'Cash Wrap' anchor carved from raw stone grounds the glass structure, with mirrors optimized for social sharing." },
        { title: "The Denim Lab", desc: "A glass-walled space for co-creation through laser distressing and vintage repair, delivered in vacuum-sealed packaging." },
        { title: "Cafe 1978 & Archive", desc: "A curated library of history and a coworking cafe balancing Tokyo brutalism with Italian walnut and leather." },
        { title: "Ghiaccio Ice Bar", desc: "A monolithic molded-glass bar with gold 'Kintsugi' joinery serving as the building's social heart." }
      ],
      impact: [
        { title: "Mobile Billboards", desc: "Sustainable, durable packaging turns every customer into a brand ambassador on Tokyo's streets." },
        { title: "Elevated Prestige", desc: "Solidifies Diesel's return to the top tier of global fashion through a definitive physical statement." }
      ],
      quote: "We cannot just open a store. We must open a temple."
    }
  };

  const data = projectsData[id] || {
    heroTitle: study.title,
    challenge: "Project documentation currently in development.",
    ask: "Pending strategy overview.",
    strategy: "Detailed framework coming soon.",
    insights: [],
    solutions: [],
    impact: [],
    quote: "Building the future of design."
  };

  return (
    <main className="min-h-screen">
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

      {/* Navigation Footer */}
      <ProjectNavigation currentId={id} />
    </main>
  );
};

export default CaseStudyDetail;
