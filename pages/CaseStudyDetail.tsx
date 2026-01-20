

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
      // Use new 5-section format
      isNewSectionFormat: true,
      heroTitle: "On Apex: Run Free",
      heroSubtitle: "Redefining community through collective movement",

      // Section 1: The Context
      context: {
        background: "While On is established as a leader in Swiss-engineered performance footwear, the brand identified a gap in community engagement beyond product sales. Running is often perceived as isolating or intimidating, where self-doubt and lack of motivation prevent individuals from reaching their potential.",
        ask: "How might we create a transformative platform that shifts the focus from gear to the emotional and social core of movement?",
        problem: "Running communities are fragmented, generic fitness apps offer no real connection, and the 'lone runner' narrative persists. 70% of runners feel more motivated when running with a group, yet only 15% regularly participate in organized runs."
      },

      // Section 2: The Investigation
      investigation: {
        researchMethods: [
          { title: "User Research", description: "Behavior analysis across demographics—understanding why people run alone and what they need to feel connected." },
          { title: "Community Mapping", description: "Analysis of existing running clubs, apps, and social platforms to identify gaps in meaningful engagement." },
          { title: "Pilot Testing", description: "Beta testing with pilot pods in Chicago and Berlin to validate pod matching algorithms and gamification systems." }
        ],
        dataPoints: [
          { label: "Motivation Boost", value: "70%", description: "Of runners feel more motivated when running with a group rather than solo." },
          { label: "Gamification Interest", value: "65%", description: "Are interested in gamified fitness challenges with tangible rewards." },
          { label: "Retention Rate", value: "3x", description: "Higher retention in smaller curated pods (10-20) vs. large groups (30-50)." }
        ]
      },

      // Section 3: The Pivot
      pivot: {
        insight: "Running is not just about the miles; it is about the sense of belonging and the collective triumph of shared goals. The primary barrier isn't fitness—it's isolation.",
        strategy: "Remove psychological barriers through three pillars: Local Pods (curated groups of 10-20 runners), Competitive Gamification (city-wide leaderboards), and Technical Integration (Mapbox-powered AR navigation)."
      },

      // Section 4: The Solution
      solution: {
        conceptName: "On Apex: The Movement Platform",
        concept: "A transformative community PWA that shifts running from an isolating activity to a collective movement of personal liberation through curated pods, gamification, and AR technology.",
        execution: [
          { title: "Local Pods", description: "Curated groups of 10-20 runners matched by goals, schedule, and location for stronger accountability and social bonds." },
          { title: "Pod Dashboard", description: "Member profiles, upcoming runs, and collective progress bars for visual motivation with 'Early Bird' and 'Weekend Warrior' tags." },
          { title: "AR Navigation", description: "Real-time Mapbox-powered navigation during active runs with route markers and pod member locations for safety." },
          { title: "Tiered Rewards", description: "Product-based rewards (On discount codes, free gear, partner benefits) driving 40% higher purchase intent vs. cash prizes." }
        ]
      },

      // Section 5: The Impact
      impact: {
        benefits: [
          { title: "Engagement Surge", description: "+45% increase in participation rates in local group runs within 6 months of launch." },
          { title: "Brand Loyalty", description: "82% NPS indicating strong brand affinity—runners now identify with On, not just their shoes." },
          { title: "Revenue Growth", description: "+25% higher demand for On gear driven specifically by Apex pod participants." }
        ],
        reflection: "If I could revisit this project, I would invest more time in city-specific onboarding experiences. The Berlin pod dynamics differed significantly from Chicago, suggesting localization could drive even higher engagement."
      }
    },
    'stella-mccartney': {
      // Use new 5-section format
      isNewSectionFormat: true,
      heroTitle: "Stella McCartney x Zellerfeld",
      heroSubtitle: "3D printing as sustainable luxury language",

      // Section 1: The Context
      context: {
        background: "Stella McCartney is a global leader in eco-conscious fashion, pioneering sustainability in luxury. However, the industry still struggles with overproduction, waste, and linear manufacturing models that conflict with circular economy principles.",
        ask: "How might we integrate 3D printing into Stella McCartney's sustainable fashion toolbox to augment luxury, innovation, and environmental impact?",
        problem: "Traditional fashion manufacturing creates significant waste—64% more energy consumption and 90% more resource usage than necessary. Consumers are increasingly willing to pay more for sustainable products, yet the industry lacks scalable solutions."
      },

      // Section 2: The Investigation
      investigation: {
        researchMethods: [
          { title: "Material Science Research", description: "Partnership with Zellerfeld to explore 100% recyclable TPU (thermoplastic polyurethane) for 3D-printed footwear." },
          { title: "Consumer Sentiment Analysis", description: "Understanding luxury consumer attitudes toward sustainable innovation and premium pricing." },
          { title: "Manufacturing Audit", description: "Comparing energy, waste, and resource usage between traditional methods and 3D printing." }
        ],
        dataPoints: [
          { label: "Energy Savings", value: "64%", description: "3D printing reduces energy consumption compared to traditional manufacturing." },
          { label: "Resource Efficiency", value: "90%", description: "Natural resources can be saved through 3D printing in fashion production." },
          { label: "Consumer Willingness", value: "64%", description: "Of luxury consumers willing to pay more for demonstrably sustainable products." }
        ]
      },

      // Section 3: The Pivot
      pivot: {
        insight: "Sustainability isn't a constraint—it's a creative canvas. 3D printing enables design possibilities impossible with traditional methods while solving overproduction through on-demand manufacturing.",
        strategy: "Innovation Through Circularity: Transition from traditional manufacturing to a circular, on-demand model by partnering with Zellerfeld, creating fully recyclable footwear that can be reclaimed and reprinted."
      },

      // Section 4: The Solution
      solution: {
        conceptName: "The Circular Luxury Loop",
        concept: "A closed-loop system where 3D-printed footwear is created on-demand from 100% recyclable materials, then reclaimed at end-of-life to become the raw material for the next product.",
        execution: [
          { title: "Material Innovation", description: "Crafted from 100% recyclable TPU, allowing the brand to reclaim and reuse the material for future products in a true closed loop." },
          { title: "On-Demand Production", description: "Footwear created only when ordered—eliminating overstock, enabling personalized fitting, and ensuring zero-waste material usage." },
          { title: "Minimalist Aesthetic", description: "Balancing signature functional, timeless design with unique textures and forms achievable only through 3D printing technology." },
          { title: "Experiential Retail", description: "Real-time 3D printing demos in stores and digital storytelling campaigns highlighting the journey from TPU filament to finished product." }
        ]
      },

      // Section 5: The Impact
      impact: {
        benefits: [
          { title: "Waste Elimination", description: "Significant, measurable reductions in waste and energy consumption through on-demand production and recyclable materials." },
          { title: "Market Leadership", description: "Reinforcement of Stella McCartney's position as the primary innovator in ethical luxury fashion." },
          { title: "Consumer Engagement", description: "In-store 3D printing demos create memorable experiences that connect consumers to the sustainability story." }
        ],
        reflection: "3D printing isn't just a new tool; it's a new language for sustainable luxury. This project showed me that constraints breed creativity—sustainability requirements pushed us toward more innovative solutions."
      }
    },
    'nike-snkrs': {
      // Nike-specific format flag
      isNikeFormat: true,

      // Section 1: The Context (The Set-Up)
      context: {
        background: "Nike has long dominated the sneaker category using a \"winning formula\" of manufactured scarcity, high-profile collaborations, and the digital-first SNKRS app. Between 2015 and 2021, sneakers were the ultimate cultural currency.",
        ask: "How should brands reimagine their sneaker reservation applications to better align with the attitudes, behaviors, and beliefs of today's coveted young consumer?",
        problem: "The \"Hype Era\" is over. Nike has relied on exclusivity for too long, losing ground with consumers who drive long-term value. The traditional playbook of limited drops and artificial scarcity is now actively turning off core customers, leading to \"consumer exhaustion\" and a massive decline in profit."
      },

      // Section 2: The Investigation (The Methodology)
      investigation: {
        researchMethods: [
          { title: "Desk Research", description: "Analyzing shifts in high fashion, streetwear, and mainstream fashion." },
          { title: "Surveys & Focus Groups", description: "Quantitative and qualitative data collection from 17-25 year old U.S. consumers." },
          { title: "Segment Analysis", description: "Mapping the \"Three-Segment Framework\" (Culture Curators, Aesthetic Individualists, and Function-First Pragmatists)." }
        ],
        segments: [
          { name: "Culture Curators", share: "20%", mindset: "Motivated by rarity, social status, and resale value.", opportunity: "Nike's traditional focus; currently saturated and facing exhaustion." },
          { name: "Aesthetic Individualists", share: "40%", mindset: "High-income group seeking integration into their unique personal style.", opportunity: "The primary growth segment currently ignored by the \"drop\" model." },
          { name: "Function-First Pragmatists", share: "40%", mindset: "Value durability, comfort, and versatile utility over hype.", opportunity: "Requires clear styling guidance and proof of real-world wearability." }
        ],
        dataPoints: [
          { label: "Ownership Gap", value: "16+", description: "Consumers own an average of 16+ pairs but rotate only 2-5 regularly." },
          { label: "Sentiment", value: "80%", description: "Of respondents described current sneaker culture as \"Inaccessible\" or \"Over-hyped\"." },
          { label: "App Usage", value: "77%", description: "Of target users say they \"Rarely\" use brand apps like SNKRS or GOAT." }
        ]
      },

      // Section 3: The Pivot (The Insight & Strategy)
      pivot: {
        insight: "Consumers don't need more sneakers; they need confidence in how to wear them. Sneakers are no longer about what you own—they are about how confidently you wear what you own. The primary barrier to purchase is no longer \"access,\" but styling paralysis.",
        strategy: "Pivot from \"Exclusivity\" to \"Confidence.\" Transform Nike's digital ecosystem from a transactional \"lottery machine\" into a supportive, educational styling platform."
      },

      // Section 4: The Solution (The Creative Reveal)
      solution: {
        conceptName: "The Nike Confidence Hub",
        concept: "A fundamental redesign of the SNKRS platform centered on utility and style education rather than just commerce.",
        execution: [
          { title: "The \"Style Gym\"", description: "Product pages that show 3-5 complete outfit examples featuring the sneaker, with filters for \"Work,\" \"Casual,\" and \"Night Out\"." },
          { title: "Nike Stylist AI", description: "An AI-powered tool that allows users to upload photos of their own closet to receive personalized sneaker recommendations that match their existing wardrobe." },
          { title: "Confidence Drops", description: "Replacing random raffles with 48-hour pre-order windows and \"Styling Challenges\" where access is rewarded based on loyalty and creativity, not luck." },
          { title: "The Confidence Index", description: "An annual data-driven report transforming millions of user interactions into the definitive guide to global street culture." }
        ]
      },

      // Section 5: The Impact (The Business Value)
      impact: {
        benefits: [
          { title: "Unlocking the Cycle", description: "By removing the \"Museum Mindset,\" consumers are empowered to wear their shoes, accelerating the replacement cycle and driving repeat purchases." },
          { title: "Reducing Returns", description: "Accurate sizing guidance and \"Complete the Look\" commerce reduces the uncertainty that leads to product returns." },
          { title: "Growth Opportunity", description: "Capturing the \"Aesthetic Individualist\" segment (40% of the market)—a high-income group currently ignored by the \"drop\" model." }
        ],
        reflection: "This project shifted my understanding of brand status. We moved from a model of exclusion (\"I have what you can't get\") to a model of inclusion (\"I can pull off what you're too scared to wear\")."
      }
    },
    'stylect': {
      // Use new 5-section format
      isNewSectionFormat: true,
      heroTitle: "Stylect: Humanizing Fashion Discovery",
      heroSubtitle: "The clarity of a human voice in a sea of algorithms",

      // Section 1: The Context
      context: {
        background: "Modern fashion shoppers are paralyzed by infinite digital choice and generic recommendation engines. This 'post-algorithm' consumer values authenticity over automated feeds but often lacks the time or expertise to curate a cohesive wardrobe.",
        ask: "How might we equip conscious individuals to build a lasting wardrobe with intention by connecting them with trusted human expertise?",
        problem: "Fashion e-commerce is dominated by algorithms that optimize for engagement, not style. Consumers feel overwhelmed by choice, uncertain about fit, and disconnected from the human expertise that traditionally guided wardrobe decisions."
      },

      // Section 2: The Investigation
      investigation: {
        researchMethods: [
          { title: "Consumer Interviews", description: "Deep-dive conversations with fashion-conscious consumers to understand their decision paralysis and trust barriers." },
          { title: "Stylist Workflow Analysis", description: "Mapping how professional stylists build relationships and make recommendations to replicate at scale." },
          { title: "E-commerce Journey Mapping", description: "Identifying friction points and drop-off moments in existing fashion discovery experiences." }
        ],
        dataPoints: [
          { label: "Purchase Confidence", value: "70%", description: "Users report feeling more confident in their purchase post-checkout with human guidance." },
          { label: "Speed-to-Solve", value: "≤24h", description: "Median time from brief submission to purchase outcome—one perfect item in under a day." },
          { label: "Repeat Engagement", value: "40%", description: "First-time purchasers open a second brief within 60 days, indicating trust and value." }
        ]
      },

      // Section 3: The Pivot
      pivot: {
        insight: "Fashion is paralyzed by choice. Success isn't about more options—it's about finding one perfect item for one specific occasion with confidence.",
        strategy: "The 'One Perfect Item' Framework: Liberate users from trend-driven noise by defining success as a single, high-confidence outcome in under 24 hours through trusted human expertise."
      },

      // Section 4: The Solution
      solution: {
        conceptName: "Stylect: Human-Powered Fashion Discovery",
        concept: "A platform connecting conscious individuals with real human stylists to find one perfect item for their specific occasion, budget, and existing wardrobe.",
        execution: [
          { title: "1:1 Stylist Match", description: "A 2-minute quiz matches users to real stylists based on inventory and vibe, with a 2-hour response SLA for personalized recommendations." },
          { title: "Occasion Brief Builder", description: "A 5-question wizard captures event type, dress code, and weather, with Pinterest board integration for style context." },
          { title: "The Phygital Bridge", description: "A 'Try & Decide' loop where users reserve items for in-store pickup via QR code or handle returns seamlessly." },
          { title: "Style Vault", description: "A 'Closet Lite' feature where users upload photos of owned items, allowing stylists to reference them for future suggestions." }
        ]
      },

      // Section 5: The Impact
      impact: {
        benefits: [
          { title: "Humanized Discovery", description: "Shifting the paradigm from generic algorithms to trusted human interaction that builds lasting relationships." },
          { title: "Three-Way Value", description: "A platform connecting customers, stylists, and brand managers with data-driven insights that benefit everyone." },
          { title: "Reduced Returns", description: "Personalized guidance reduces fit and style uncertainty, lowering return rates and increasing customer lifetime value." }
        ],
        reflection: "Fashion is paralyzed by choice. Stylect provides the clarity of a human voice. This project reinforced that technology should amplify human expertise, not replace it."
      }
    },
    'diesel': {
      // Use new 5-section format
      isNewSectionFormat: true,
      heroTitle: "Diesel Tokyo: The Brand Temple",
      heroSubtitle: "A five-story flagship where 10% surface meets 90% soul",

      // Section 1: The Context
      context: {
        background: "Since Glenn Martens' appointment as Creative Director in 2020, Diesel has regained its critical and commercial 'cool factor'. However, to capture the next generation and elevate global prestige, the brand requires a major physical statement that moves beyond retail.",
        ask: "How might we create a definitive global power move in Tokyo—a market that demands depth, tradition, and forward-thinking trends?",
        problem: "Competitors like Louis Vuitton and Gucci aren't just opening stores—they're creating architectural cultural destinations. Diesel needs a flagship that establishes the brand for the next generation through immersive experience, not just transactions."
      },

      // Section 2: The Investigation
      investigation: {
        researchMethods: [
          { title: "Market Analysis", description: "Studying luxury retail expansion in Tokyo and Japan's resilience to global market fluctuations." },
          { title: "Competitive Audit", description: "Analyzing flagship strategies of Louis Vuitton, Gucci, and Calvin Klein in the Tokyo luxury landscape." },
          { title: "Site Selection", description: "Identifying 'The Iceberg'—a landmark Harajuku structure that physically mirrors Diesel's brand philosophy." }
        ],
        dataPoints: [
          { label: "Market Resilience", value: "Stable", description: "Japan's luxury market shows remarkable stability despite global fluctuations." },
          { label: "Experience Priority", value: "High", description: "Japanese consumers prioritize physical retail experiences and demand depth." },
          { label: "Youth Culture", value: "Harajuku", description: "Cultural capital of youth trends—positioning here signals cultural curation, not luxury following." }
        ]
      },

      // Section 3: The Pivot
      pivot: {
        insight: "Japanese consumers don't just buy luxury—they demand depth. What you see on the surface is only 10%. Beneath lies 90%: heritage, craftsmanship, and culture.",
        strategy: "The Iceberg Concept: Transform Diesel's Tokyo flagship into a cultural temple. The building (The Iceberg in Harajuku) physically mirrors our philosophy—surface rebellion concealing deep Italian heritage."
      },

      // Section 4: The Solution
      solution: {
        conceptName: "The Iceberg: A Five-Floor Cultural Temple",
        concept: "A multi-floor destination where retail, customization, dining, and community create reasons to linger and deepen emotional brand connection.",
        execution: [
          { title: "Ground Floor: Gallery Retail", description: "High-velocity retail in a gallery setting with sculptural stone Cash Wrap and Fit Check Zones optimized for social sharing." },
          { title: "Floor 2: Denim Lab", description: "A glass-walled 'theater of craftsmanship' for co-creation—laser distressing, vintage repair, and premium packaging." },
          { title: "Floor 3-4: Cafe 1978", description: "Archive library and community space with Italian espresso bar, creating a third place for brand loyalists." },
          { title: "Floor 5: Ghiaccio Ice Bar", description: "Premier dining for top-tier clients, featuring a monolithic glass bar internally cooled to appear frozen—the 'Iceberg' brought to life." }
        ]
      },

      // Section 5: The Impact
      impact: {
        benefits: [
          { title: "Gateway to Asia", description: "Success in Tokyo serves as launchpad for broader expansion across Asia with 'Cool Japan' halo effect." },
          { title: "Deep Customer Loyalty", description: "Physical flagship creates immersive experiences that foster lasting emotional connections in a market valuing personalized service." },
          { title: "Cultural Authority", description: "Positioning Diesel as a cultural curator rather than luxury follower—capturing the next generation through experience." }
        ],
        reflection: "If revisiting this concept, I would develop more detailed financial modeling for each floor's revenue potential and explore partnerships with Japanese artisans earlier to deepen local cultural integration."
      }
    },
    'off-white-mentorship': {
      // Use new 5-section format
      isNewSectionFormat: true,
      heroTitle: "Off-White Mentorship Program",
      heroSubtitle: "Democratizing access to creative mentorship",

      // Section 1: The Context
      context: {
        background: "Traditional creative networks are exclusive, outdated, and disconnected from today's energy. Emerging creatives lack the critiques, access, and guidance they need to grow—not from lack of skill, but lack of opportunity.",
        ask: "How might we create a space where feedback feels accessible, personal, and future-facing, extending Off-White's DNA beyond fashion into shaping culture itself?",
        problem: "Without real-world mentorship, many young creatives stall—or burn out before they break through. The creative industry's gatekeeping perpetuates inequality and stifles innovation at the source."
      },

      // Section 2: The Investigation
      investigation: {
        researchMethods: [
          { title: "User Research", description: "Identifying key creative pain points: access to industry leaders, quality feedback, and isolation in the creative journey." },
          { title: "Platform Architecture", description: "Designing profiles, messaging, classes, badges, and collaboration spaces to foster meaningful connections." },
          { title: "Journey Mapping", description: "6-month user journey mapping from onboarding to mentorship reciprocity—ensuring sustainable community growth." }
        ],
        dataPoints: [
          { label: "Network Size", value: "1000+", description: "Global community of emerging talents shaping the next wave of culture, innovation, and style." },
          { label: "Mentor Base", value: "350", description: "Established designers, artists, and entrepreneurs offering real-world insights and collaborative energy." },
          { label: "Content Hours", value: "80+", description: "Exclusive masterclasses, workshops, and talks with certification tracks." }
        ]
      },

      // Section 3: The Pivot
      pivot: {
        insight: "Creatives aren't rare. Access is. The opportunity isn't just networking; it's building creative community that fuels collaboration, courage, and evolution.",
        strategy: "Create an exclusive mentorship ecosystem combining 100+ curated connections, 80+ hours of masterclass content, and direct mentor-mentee messaging. Success = clarity through a human voice, not algorithmic feeds."
      },

      // Section 4: The Solution
      solution: {
        conceptName: "Off-White Mentorship: Access as the New Luxury",
        concept: "A living network where young designers connect, learn, and launch future-shaping careers while reinforcing Off-White's cultural leadership.",
        execution: [
          { title: "Curated Network", description: "100+ handpicked creatives ensuring balance of diverse voices, shared values, and future-focused thinking—quality over quantity." },
          { title: "Self-Paced Learning", description: "Certification badges instead of rigid schedules, providing flexibility for students, freelancers, and working creatives." },
          { title: "Direct Messaging", description: "No gatekeeping—mentees can message mentors directly to build meaningful creative relationships without intermediaries." },
          { title: "Member-to-Mentor Pipeline", description: "Successful mentees return as future mentors, creating a sustainable community loop and generational legacy." }
        ]
      },

      // Section 5: The Impact
      impact: {
        benefits: [
          { title: "Democratized Access", description: "Breaking down traditional barriers between emerging creatives and industry leaders—talent rises on merit, not connections." },
          { title: "Cultural Continuity", description: "Member-to-mentor pipeline transforms the platform from transactional to generational, ensuring Off-White's cultural DNA evolves." },
          { title: "Portfolio Credibility", description: "Off-White-backed certification badges add industry recognition and portfolio weight for emerging talents." }
        ],
        reflection: "Future iterations would benefit from deeper analytics on mentorship outcomes (which matches lead to successful collaborations) and exploring revenue models beyond brand investment for long-term sustainability."
      }
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

  // Check format type
  const isNikeFormat = 'isNikeFormat' in data && data.isNikeFormat;
  const isNewSectionFormat = 'isNewSectionFormat' in data && data.isNewSectionFormat;
  const isNewFormat = 'quickPitch' in data;

  return (
    <main className="min-h-screen">
      {isNikeFormat ? (
        /* ===== NIKE SNKRS CUSTOM FORMAT ===== */
        <>
          {/* Hero Section */}
          <section className="px-6 md:px-12 py-16 max-w-[1440px] mx-auto">
            <div className="space-y-6">
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

          {/* 5 Nike Sections */}
          <section className="px-6 md:px-12 py-24 max-w-[1440px] mx-auto space-y-32">
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

          {/* 5 Sections */}
          <section className="px-6 md:px-12 py-24 max-w-[1440px] mx-auto space-y-32">
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
