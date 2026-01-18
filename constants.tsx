
import { CaseStudy, Experience, Skill } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'on-apex',
    title: 'On Apex: Run Free',
    category: 'Community Building | Innovation | Sports',
    description: 'A transformative community-driven PWA bridging innovation and personal liberation through collective movement.',
    imageUrl: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    role: 'Strategy, Design & Development'
  },
  {
    id: 'stella-mccartney',
    title: 'Stella McCartney x Zellerfeld',
    category: 'Sustainability | Innovation | Luxury',
    description: 'Pioneering sustainable luxury through 3D-printed, fully recyclable circular fashion systems.',
    imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    role: 'Brand Strategist & Creative Director'
  },
  {
    id: 'nike-snkrs',
    title: 'Nike SNKRS: Bridging the Confidence Gap',
    category: 'Brand Strategy | User Research | Innovation',
    description: 'Reimagining digital product innovation through a business model shift from exclusivity to confidence.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200',
    year: '2026',
    role: 'Strategy & Consumer Research'
  },
  {
    id: 'diesel',
    title: 'Diesel Tokyo: The Brand Temple',
    category: 'Retail Expansion | Experiential | Luxury',
    description: 'A physical statement in Harajuku elevating Diesel’s prestige through a "theater of craftsmanship" and community hub.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1200',
    year: '2025',
    role: 'Strategy & Creative Direction'
  },
  {
    id: 'stylect',
    title: 'Stylect: Humanizing fashion discovery',
    category: 'E-commerce | Experience Design | Brand Strategy',
    description: 'Connecting conscious individuals with trusted human expertise to build a lasting wardrobe with intention.',
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1200',
    year: '2026',
    role: 'Product Strategy & UX Direction'
  },
  {
    id: '13-taylor-swift',
    title: '13: Taylor Swift',
    category: 'Analytical Storytelling',
    description: 'A deep-dive data visualization study on the cultural and quantitative impact of the discography.',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1200',
    year: '2026',
    role: 'Data Visualizer'
  }
];

export const SKILLS: Skill[] = [
  {
    title: 'AI & Digital Fluency',
    items: ['Generative AI Workflows', 'Google AI Studio', 'Operational Prototyping', 'NotebookLM', 'Figma', 'Adobe Creative Suite', 'Microsoft Office Suite (Excel)', 'Google Workspace']
  },
  {
    title: 'Retail Strategy & Analytics',
    items: ['Retail Math (AUR, ST%, WOS, IMU)', 'Gross Margin %', 'A/B Testing', 'Algorithmic Retailing', 'Trend Forecasting', 'Inventory Control']
  },
  {
    title: 'Systems & Service Design',
    items: ['Circular Economy Models', 'User Journey Mapping', 'Product-to-Market (P2M) Lifecycle', 'Service Blueprints', 'Omnichannel Integration']
  },
  {
    title: 'Leadership & Influence',
    items: ['Cross-functional Team Management', 'Behavioral Coaching']
  }
];

export const PROFESSIONAL_EXPERIENCE: Experience[] = [
  {
    company: 'GAP INC. | Gap #1224',
    role: 'Loyalty Lead',
    period: 'April 2025 – Present',
    highlights: [
      'Drove the district\'s highest sales volume by integrating loyalty strategies into daily operations, achieving a +11% comp YTD',
      'Engineered an 889% month-to-month growth in loyalty acquisition',
      'Maintained the #1 Acquisition Rate in the District YTD; developed a proprietary "efficiency model" and data-backed coaching framework',
      'Scaled performance by coaching frontline team members to hit individual KPIs, resulting in a 40% increase in team acquisition goals'
    ]
  },
  {
    company: 'The Branch Museum of Design',
    role: 'UI/UX & Systems Designer',
    period: 'March 2025 – Present',
    highlights: [
      'Developed comprehensive user journey maps to bridge the "phygital" gap between digital discovery and physical museum attendance',
      'Led the design and iteration of high-fidelity web prototypes focused on accessibility, intuitive design, and storytelling-driven information architecture',
      'Featured in AdAge, AdForum, Communication Arts, Print Mag, and Stash'
    ]
  },
  {
    company: 'The Rev. Factory',
    role: 'Creative Director & AI Systems Strategist',
    period: 'Jan 2025 – Present',
    highlights: [
      'Served as the Creative Director for the upcoming publication Designing the Future, overseeing the visual and conceptual narrative',
      'Designed charts for "Digital Fluency" models for C-suite executives, translating complex machine-learning concepts into actionable strategies'
    ]
  }
];
