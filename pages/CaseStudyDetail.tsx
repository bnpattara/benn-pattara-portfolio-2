

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
      // 1. Project Overview
      title: "Nike SNKRS: Bridging the Confidence Gap",
      quickPitch: "A strategic shift from 'Hype Machine' to 'Confidence Leader,' transforming the SNKRS app into a styling-first ecosystem for a value-conscious generation.",
      metadata: {
        role: "Lead Product Strategist & UX Researcher",
        timeline: "12 months (Research to Strategy)",
        tools: ["User Interviews", "Secondary Market Analysis", "Competitive Benchmarking", "Figma"],
        industry: "Sports, Fashion, Digital Commerce"
      },

      // 2. Background & Problem
      challenge: "Nike's shock drop strategy drove SNKRS demand up ~70%, but created a toxic culture of exclusion and bot-fighting that alienated core consumers. The current model relies on scarcity that 80% of the market no longer responds to.",
      hmw: "How might we transition Nike from a 'Hype Machine' to a 'Confidence Leader' and capture the 80% seeking integration over exclusivity?",
      goal: "Rebuild brand trust and increase AOV by solving 'styling paralysis' and the 'museum mindset,' shifting the focus from rarity to wearability.",

      // 3. Insight & Strategy
      insight: "The Ownership–Wearability Paradox: 40% of consumers own 7-10+ pairs but rotate only 2-3 due to fear of 'style mistakes.' 'Cool' has shifted from isolation (rarity) to integration (how the shoe fits into a full outfit).",
      strategy: "Build Confidence, Not Exclusivity. Transform SNKRS from a high-stress raffle app into a styling hub that provides decision support, real-world proof of wearability, and guaranteed access.",

      // 4. Implementation & Process
      workflow: [
        "Polyculture Audit: Analyzing trends across Mainstream, Streetwear, and High Fashion",
        "Consumer Sentiment Research: Identifying the 'Confidence Gap' through 100+ interviews",
        "Three-Segment Framework: Defining Individualists (40%), Pragmatists (40%), and Curators (20%)",
        "Phase 1: Quick Wins—Styling Hub, Style Gym, and Real-Review Standard",
        "Phase 2: Platform Evolution—AI Stylist and Certified Pre-Worn buyback loop",
        "Phase 3: Culture Shift—Establishing the Nike Confidence Index as a global trend report"
      ],
      designDecisions: [
        {
          title: "Styling-First Interface",
          decision: "Prioritizing outfit-integrated photography over isolated product shots in the main feed.",
          reasoning: "Consumers rank 'how the shoe fits into a full outfit' as the top factor for purchase. Isolated shots reinforce the 'museum mindset' where shoes are collected but never worn."
        },
        {
          title: "The Confidence Drop",
          decision: "Replacing shock drops with 48-hour pre-order or voting windows for core silhouettes.",
          reasoning: "Reduces 'hype friction' and culture intimidation. 78% of users prefer the vintage market's ease over the stress of a shock drop."
        },
        {
          title: "Real-Review Standard",
          decision: "Requiring on-foot photos and fit/occasion tags for all user-generated reviews.",
          reasoning: "Information gaps are a primary driver of the Confidence Gap. Real-world proof of fit and styling reduces the perceived emotional risk of an identity purchase."
        }
      ],

      // 5. Mockups & Reasoning
      mockups: [
        {
          caption: "The Styling Hub: Product pages featuring the 'Style Gym' for contextual outfit toggling and real-world styling filters.",
          annotations: [
            { x: 30, y: 45, label: "Style Gym Toggle", reasoning: "Allows users to visualize the shoe with different pant cuts and aesthetics, solving styling paralysis at the point of sale." },
            { x: 70, y: 60, label: "Real-Review Feed", reasoning: "Verified on-foot photos provide the 'proof of life' consumers need to feel confident in the purchase." }
          ]
        },
        {
          caption: "The Confidence Drop: A 48-hour pre-order interface that rewards engagement and loyalty over bot-speed.",
          annotations: [
            { x: 50, y: 40, label: "Guaranteed Access Window", reasoning: "Shifts the emotional state from anxiety/exclusion to anticipation/inclusion, rebuilding brand trust." },
            { x: 25, y: 70, label: "Loyalty Tiering", reasoning: "Prioritizes long-term brand advocates (Individualists and Pragmatists) over short-term resellers." }
          ]
        },
        {
          caption: "Nike Stylist AI: A visual search and closet analysis tool that suggests pairings based on items the user already owns.",
          annotations: [
            { x: 40, y: 30, label: "Visual Search", reasoning: "'Shazam for Outfits' helps users identify and integrate Nike products into their existing wardrobe seamlessly." },
            { x: 60, y: 75, label: "Closet Integration", reasoning: "Reduces the fear that a new purchase won't work with current clothes, increasing purchase intent by 40%." }
          ]
        }
      ],

      // 6. KPIs & Success
      quantitative: [
        { metric: "Vintage Preference", value: "78%", description: "Users who chose the vintage market over a shock drop when forced to prioritize personal style over hype." },
        { metric: "Price Sensitivity", value: "70%", description: "Consumers who pause a purchase at a 5% price increase unless they have high styling confidence." },
        { metric: "Market Share", value: "80%", description: "The combined 'Individualist' and 'Pragmatist' segments currently underserved by exclusivity-led strategies." }
      ],
      qualitative: [
        { source: "Research Insight", quote: "People default to what feels safe because they don't want to risk a style mistake. Scarcity is no longer a reliable driver." },
        { source: "Strategic Conclusion", quote: "This isn't a marketing tweak—it's a business model shift. Nike must build confidence, not exclusivity." }
      ],
      reflection: "This project revealed that the 'Hype Economy' has a shelf life. The future of digital commerce lies in utility and decision support. If revisiting, I would explore the 'Certified Pre-Worn' loop earlier to capture the growing circular economy market."
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
    },
    'off-white-mentorship': {
      // 1. Project Overview
      title: "Off-White Mentorship Program",
      quickPitch: "A digital platform democratizing creative mentorship by connecting 1000+ emerging talents with 350+ established mentors across fashion, design, and art.",
      metadata: {
        role: "Lead UX Strategist & Community Designer",
        timeline: "6 months (Platform Design)",
        tools: ["Figma", "User Research", "Community Design", "UX Strategy"],
        industry: "Fashion Tech, Education, Community"
      },

      // 2. Background & Problem
      challenge: "Traditional creative networks are exclusive, outdated, and disconnected from today's energy. Emerging creatives like 'Alex' lack the critiques, access, and guidance they need to grow—not from lack of skill, but lack of opportunity.",
      hmw: "How might we create a space where feedback feels accessible, personal, and future-facing, extending Off-White's DNA beyond fashion into shaping culture itself?",
      goal: "Build a living network where young designers connect, learn, and launch future-shaping careers while reinforcing Off-White's cultural leadership and sparking new collaborations.",

      // 3. Insight & Strategy
      insight: "Creatives aren't rare. Access is. Without real-world mentorship, many young creatives stall—or burn out before they break through. The opportunity isn't just networking; it's building creative community that fuels collaboration, courage, and evolution.",
      strategy: "Create an exclusive mentorship ecosystem combining 100+ curated connections, 80+ hours of masterclass content, and direct mentor-mentee messaging. Success = clarity through a human voice, not algorithmic feeds.",

      // 4. Implementation & Process
      workflow: [
        "User research identifying key pain points (access, feedback, isolation)",
        "Platform architecture: profiles, messaging, classes, badges, collaboration spaces",
        "Mentor/mentee matching algorithm design based on goals and creative alignment",
        "Curriculum design: skill tracks, guest speakers, certification badges",
        "Launch strategy: OOH campaigns, art school partnerships, pop-up lectures",
        "6-month user journey mapping from onboarding to mentorship reciprocity"
      ],
      designDecisions: [
        {
          title: "Membership Model",
          decision: "Curated exclusive network (100+ handpicked creatives) rather than open platform.",
          reasoning: "Ensures balance of diverse voices, shared values, and future-focused thinking. Quality over quantity builds trust and meaningful connections rather than overwhelming noise."
        },
        {
          title: "Learning Structure",
          decision: "Self-paced learning with certification badges instead of rigid course schedules.",
          reasoning: "Flexibility for students, freelancers, and working creatives to learn at own speed while maintaining credential value through Off-White-backed certifications."
        },
        {
          title: "Growth Model",
          decision: "Member-to-mentor pipeline where successful mentees return as future mentors.",
          reasoning: "Creates sustainable community loop, ensures cultural continuity, and transforms platform from transactional to generational legacy."
        }
      ],

      // 5. Mockups & Reasoning
      mockups: [
        {
          caption: "Onboarding: Alex creates profile, uploads work, sets mentorship goals—unlocking access to classes, critiques, and collaborations.",
          annotations: [
            { x: 30, y: 40, label: "Profile Creation", reasoning: "Portfolio upload and goal-setting ensures personalized mentor matching and relevant class recommendations from day one." },
            { x: 70, y: 50, label: "Mentorship Goals", reasoning: "Specific goal articulation (brand building, technical skills, industry navigation) powers intelligent matching algorithm." }
          ]
        },
        {
          caption: "Community Dashboard: 350 mentors + 1000 mentees displayed with creative specialties, enabling direct messaging and collaboration discovery.",
          annotations: [
            { x: 25, y: 30, label: "Mentor Directory", reasoning: "Searchable by specialty, location, and availability—transparency builds connection confidence." },
            { x: 50, y: 60, label: "Direct Messaging", reasoning: "No gatekeeping—Alex can message mentors directly to build meaningful creative relationships." },
            { x: 75, y: 70, label: "Collaboration Board", reasoning: "Visible project opportunities create spontaneous partnerships beyond formal mentorship." }
          ]
        },
        {
          caption: "Learning Hub: 80+ hours of exclusive content with skill tracks, guest speakers, and certification badges for portfolio credibility.",
          annotations: [
            { x: 30, y: 35, label: "Skill Tracks", reasoning: "Curated paths (branding, digital design, creative direction) guide progression vs. overwhelming course catalog." },
            { x: 65, y: 55, label: "Certification Badges", reasoning: "Off-White-backed credentials add portfolio weight and industry recognition for mentees." }
          ]
        }
      ],

      // 6. KPIs & Success
      quantitative: [
        { metric: "Network", value: "1000+ Creatives", description: "Global community of emerging talents shaping next wave of culture, innovation, and style across 4 continents." },
        { metric: "Mentorship", value: "350 Leaders", description: "Established designers, artists, and entrepreneurs offering real-world insights, feedback, and collaborative energy." },
        { metric: "Content", value: "80+ Hours", description: "Exclusive masterclasses, workshops, and talks designed by Off-White creative ecosystem with certification tracks." }
      ],
      qualitative: [
        { source: "Platform Vision", quote: "Fashion is paralyzed by choice. Off-White Mentorship provides the clarity of a human voice." },
        { source: "User Outcome", quote: "Alex's portfolio featured in community spotlight, leading to collaboration project and eventual transition to mentoring new members." }
      ],
      reflection: "Future iterations would benefit from deeper analytics on mentorship outcome correlation (e.g., which mentor-mentee matches lead to successful collaborations) and exploring revenue models beyond brand investment to ensure long-term platform sustainability."
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
