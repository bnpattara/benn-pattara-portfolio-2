

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
      // 1. Project Overview
      title: "On Apex: Redefining the Running Experience",
      quickPitch: "A transformative community platform that shifts running from an isolating activity to a collective movement of personal liberation.",
      metadata: {
        role: "Lead Product Designer & Developer",
        timeline: "12 months (2025-2026)",
        tools: ["Figma", "React", "Mapbox", "AR Kit", "PWA"],
        industry: "Sports & Fitness, Community Building"
      },

      // 2. Background & Problem
      challenge: "While On is established as a leader in Swiss-engineered performance footwear, the brand identified a gap in community engagement beyond product sales. Running is often perceived as isolating or intimidating, where self-doubt and lack of motivation prevent individuals from reaching their potential.",
      hmw: "How might we create a transformative platform that shifts the focus from gear to the emotional and social core of movement?",
      goal: "Build a lifestyle platform that transforms On from a shoe company to a community leader, driving stronger brand affinity and increasing demand through social connection.",

      // 3. Insight & Strategy
      insight: "Running is not just about the miles; it is about the sense of belonging and the collective triumph of shared goals. Research revealed 70% of runners feel more motivated when running with a group, and 65% are interested in gamified fitness challenges.",
      strategy: "The strategy centered on 'Running Free' by removing psychological barriers through three pillars: Local Pods (curated groups of 10-20 runners), Competitive Gamification (city-wide leaderboards), and Technical Integration (Mapbox-powered AR navigation).",

      // 4. Implementation & Process
      workflow: [
        "User research and runner behavior analysis across demographics",
        "Platform architecture planning (PWA for cross-platform compatibility)",
        "Pod matching algorithm development based on goals and location",
        "AR navigation and route planning integration via Mapbox",
        "Gamification system design with tiered rewards",
        "Beta testing with pilot pods in Chicago and Berlin"
      ],
      designDecisions: [
        {
          title: "Pod Size Selection",
          decision: "Small, curated pods of 10-20 runners rather than large groups of 30-50 people.",
          reasoning: "Testing showed 3x higher retention in smaller groups due to stronger social bonds and a 'perfect fit' where every member feels known and accountable."
        },
        {
          title: "Reward Structure",
          decision: "Tiered product rewards (On discount codes, free gear, partner benefits) instead of monetary incentives.",
          reasoning: "Product-based rewards reinforce brand connection and create tangible value tied to On ecosystem, driving 40% higher purchase intent compared to cash prizes."
        }
      ],

      // 5. Mockups & Reasoning
      mockups: [
        {
          caption: "Onboarding flow where users complete a lifestyle survey to be matched into a specific Pod based on running goals and availability.",
          annotations: [
            { x: 25, y: 30, label: "Lifestyle Survey", reasoning: "7-question flow assesses pace preference, schedule, and social vs. solo running style to ensure pod compatibility." },
            { x: 75, y: 40, label: "Pod Matching", reasoning: "Algorithm considers location proximity (<5 miles), similar weekly mileage goals, and preferred run times." }
          ]
        },
        {
          caption: "Pod Dashboard displaying member profiles, upcoming runs, and collective progress bars for visual motivation.",
          annotations: [
            { x: 20, y: 25, label: "Member Profiles", reasoning: "Tags like 'Early Bird' and 'Weekend Warrior' help users quickly identify peer running styles." },
            { x: 50, y: 60, label: "Progress Bars", reasoning: "Dual progress tracking (personal + pod milestones) provides immediate dopamine hits for completed activities." },
            { x: 80, y: 70, label: "Leaderboard Toggle", reasoning: "Users can switch between local (Chicago) and international rankings to feel part of a global movement." }
          ]
        },
        {
          caption: "Real-time AR navigation during active runs with route markers and pod member locations for safety and engagement.",
          annotations: [
            { x: 50, y: 50, label: "AR Waypoints", reasoning: "Turn-by-turn navigation with visual markers reduces cognitive load so runners can focus on performance." }
          ]
        }
      ],

      // 6. KPIs & Success
      quantitative: [
        { metric: "Engagement", value: "+45%", description: "Increase in participation rates in local group runs within 6 months of launch." },
        { metric: "Loyalty", value: "82% NPS", description: "Net Promoter Score indicating strong brand affinity and connection with On." },
        { metric: "Revenue Growth", value: "+25%", description: "Higher demand for On gear driven specifically by Apex pod participants." }
      ],
      qualitative: [
        { source: "Beta Tester, Chicago Pod", quote: "On Apex made me feel like I belonged to something bigger than just my morning run." },
        { source: "Product Team Lead", quote: "This shifted our entire brand strategy from selling shoes to building a movement." }
      ],
      reflection: "If I could revisit this project, I would invest more time in city-specific onboarding experiences to account for cultural differences in running communities. The Berlin pod dynamics differed significantly from Chicago, suggesting localization could drive even higher engagement."
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
      // 1. Project Overview
      title: "Diesel Tokyo: The Brand Temple",
      quickPitch: "A five-story flagship concept transforming retail into an immersive cultural destination—the 'Iceberg' where 10% surface meets 90% soul.",
      metadata: {
        role: "Lead Retail Strategist & Spatial Designer",
        timeline: "8 months (Concept to Pitch)",
        tools: ["Figma", "SketchUp", "Adobe Creative Suite", "Market Analysis"],
        industry: "Luxury Retail, Fashion"
      },

      // 2. Background & Problem
      challenge: "Since Glenn Martens' appointment as Creative Director in 2020, Diesel has regained its critical and commercial 'cool factor'. However, to capture the next generation and elevate global prestige, the brand requires a major physical statement that moves beyond retail to become a lived universe.",
      hmw: "How might we create a definitive global power move in Tokyo—a market that demands depth, tradition, and forward-thinking trends?",
      goal: "Establish Diesel's Tokyo flagship as a cultural temple that deepens brand loyalty, serves as a gateway for Asian expansion, and defines the brand for the next generation through immersive experience.",

      // 3. Insight & Strategy
      insight: "Japanese consumers don't just buy luxury—they demand depth. Tokyo's market shows resilience to global fluctuations and prioritizes physical retail experiences. Brands like Louis Vuitton and Gucci aren't just opening stores; they're creating architectural cultural destinations to capture younger luxury consumers.",
      strategy: "The Iceberg Concept: Secure 'The Iceberg'—a landmark Harajuku structure that physically mirrors our brand philosophy. What you see on the surface (rebellious product) is only 10%. Beneath lies 90%: Italian heritage, craftsmanship, and culture. This flagship brings the hidden DNA to the surface.",

      // 4. Implementation & Process
      workflow: [
        "Market analysis of luxury retail expansion in Tokyo",
        "Competitive analysis of flagship strategies (LV, Gucci, Calvin Klein)",
        "Site selection and securing 'The Iceberg' Harajuku landmark",
        "Multi-floor concept development (Retail, Lab, Cafe, Archive, Restaurant)",
        "Material palette curation blending Tokyo brutalism with Italian craftsmanship",
        "Partnership planning for Denim Lab and Cafe 1978 operations"
      ],
      designDecisions: [
        {
          title: "Flagship Location",
          decision: "'The Iceberg' landmark structure in Harajuku rather than traditional luxury district locations.",
          reasoning: "Physical structure literally mirrors brand philosophy (surface vs. submerged iceberg). Harajuku's cultural capital attracts younger demographics and positions Diesel as a cultural curator rather than luxury follower."
        },
        {
          title: "Experience Model",
          decision: "Hub for Culture, Community, and Commerce—not just high-velocity retail.",
          reasoning: "Japanese market values immersive experiences over transactional retail. Multi-floor concept (retail, customization lab, cafe, restaurant) creates reasons to linger and deepens emotional brand connection."
        },
        {
          title: "Material Strategy",
          decision: "Cultural fusion of Tokyo brutalism (concrete, glass) with Italian warmth (walnut, distressed leather, gold Kintsugi accents).",
          reasoning: "Blending Japanese aesthetics with Italian heritage creates innovative retail concept that appeals to local and international audiences while maintaining brand authenticity."
        }
      ],

      // 5. Mockups & Reasoning
      mockups: [
        {
          caption: "Ground Floor: High-velocity retail in gallery setting with sculptural stone Cash Wrap anchor.",
          annotations: [
            { x: 30, y: 40, label: "Sculptural Cash Wrap", reasoning: "Carved from rough-hewn stone to ground the ethereal glass structure in raw nature, creating memorable transaction moment." },
            { x: 70, y: 35, label: "Fit Check Zones", reasoning: "Optimized lighting and backdrops designed for social sharing, instantly connecting physical trial to digital conversation." },
            { x: 50, y: 70, label: "Mobile Billboard Packaging", reasoning: "Sustainable, durable packaging designed to be reused, turning customers into brand ambassadors on Tokyo streets." }
          ]
        },
        {
          caption: "Floor 2: Denim Lab—glass-walled 'theater of craftsmanship' for co-creation via laser distressing and vintage repair.",
          annotations: [
            { x: 40, y: 50, label: "Artisan Cube", reasoning: "Glass-walled workspace makes circular economy visible luxury experience, elevating customization to theater." },
            { x: 75, y: 60, label: "Vacuum-Sealed Packaging", reasoning: "Premium take-home presentation reinforces customization value and sustainability commitment." }
          ]
        },
        {
          caption: "Floor 5: Cafe 1978 Archive + Ghiaccio Ice Bar with premier dining for top-tier clients.",
          annotations: [
            { x: 25, y: 30, label: "Brand Archive Library", reasoning: "Curated visual history creates cultural depth, positioning Diesel as heritage brand beyond rebellious image." },
            { x: 60, y: 55, label: "Monolithic Ice Bar", reasoning: "Molded glass internally cooled to appear frozen—visual anchor reinforcing 'Iceberg' concept and social heart of building." },
            { x: 80, y: 70, label: "Gold Kintsugi Details", reasoning: "Japanese art of precious repair contrasted with industrial materials creates cultural fusion narrative." }
          ]
        }
      ],

      // 6. KPIs & Success
      quantitative: [
        { metric: "Market Resilience", value: "Stable", description: "Japan's luxury market shows remarkable resilience to global fluctuations, contributing significantly to luxury brand profitability." },
        { metric: "Gateway Effect", value: "Asia Expansion", description: "Success in Tokyo serves as launchpad for broader expansion across Asia with 'Cool Japan' halo effect." },
        { metric: "Customer Connection", value: "Deep Loyalty", description: "Physical flagship creates immersive experiences that foster lasting emotional connections in market valuing personalized service." }
      ],
      qualitative: [
        { source: "Strategic Vision", quote: "To capture a market that demands depth, we cannot just open a store. We must open a temple." },
        { source: "Brand Positioning", quote: "Diesel is at the peak of its creative resurgence. A Tokyo flagship is the necessary strategic move to capitalize on this momentum." }
      ],
      reflection: "If revisiting this concept, I would develop more detailed financial modeling for each floor's revenue potential and explore partnerships with Japanese artisans earlier in the process to deepen local cultural integration beyond aesthetic references."
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

  // Check if this is a new professional format case study
  const isNewFormat = 'quickPitch' in data;

  return (
    <main className="min-h-screen">
      {isNewFormat ? (
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
