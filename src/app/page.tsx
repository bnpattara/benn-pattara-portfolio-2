"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import BackToTopButton from "@/components/BackToTopButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

const WRITING_PAGE_SIZE = 6;
const WRITING_PREVIEW = 3;

/** Draft rows stay in source; only `live: true` appears if this section is shown. */
const HOME_WRITING_ALL = [
  { category: 'Brand Strategy', title: 'Why Heritage Brands Keep Losing Gen Z', desc: 'The mistake isn’t a failure to reach younger consumers. It’s reaching them with the wrong premise: that history is automatically valuable.', date: 'Mar 2025', link: '/blog/heritage-brands-gen-z', num: '001', live: true },
  { category: 'AI & Technology', title: 'The Personalization Paradox', desc: 'There’s a threshold where hyper-relevance starts to feel like surveillance. On the tension between precision and intimacy in AI-driven brand relationships.', date: 'Feb 2025', link: '#', num: '002', live: false },
  { category: 'Systems', title: 'Loyalty Is Not a Program', desc: 'After scaling loyalty conversion 10x at Gap, the most important lesson wasn’t the number. It was what changes when you treat loyalty as a brand promise, not a retention mechanic.', date: 'Dec 2024', link: '#', num: '003', live: false },
  { category: 'Experience Design', title: 'The Phygital Gap', desc: 'Bridging the physical and digital retail experience through journey mapping and intentional architectural choices.', date: 'Nov 2024', link: '#', num: '004', live: false },
  { category: 'Brand Purpose', title: 'Meaning Metrics', desc: 'Why we need to measure the cultural impact, not just the commercial click. Shifting our KPIs towards community health.', date: 'Oct 2024', link: '#', num: '005', live: false },
  { category: 'Cultural Strategy', title: 'Subcultures as Scaffolding', desc: 'How to build brands inside of communities without commodifying them. Earning the right to participate in niche networks.', date: 'Sep 2024', link: '#', num: '006', live: false },
  { category: 'Creative Tech', title: 'Designing with Invisible Intelligence', desc: 'The role of implicit AI in consumer facing experiences. Making algorithms useful without being visible to the user.', date: 'Aug 2024', link: '#', num: '007', live: false },
];

const HOME_WRITING_PUBLIC = HOME_WRITING_ALL.filter((b) => b.live);

export default function Home() {
  const navRef = useRef<HTMLElement>(null);

  const [blogPage, setBlogPage] = useState(0);
  const [isBlogExpanded, setIsBlogExpanded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const router = useRouter();
  const accordionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fadingOut, setFadingOut] = useState<number | null>(null);

  const handleCardClick = useCallback((link: string, image: string, index: number, e: React.MouseEvent) => {
    e.preventDefault();

    const nav = document.getElementById('site-nav');
    if (nav) nav.classList.add('scrolled');

    const overlay = overlayRef.current;
    const panel = panelRefs.current[index];

    if (!overlay || !panel) {
      router.push(link);
      return;
    }

    const rect = panel.getBoundingClientRect();

    // Fade out non-clicked panels
    setFadingOut(index);

    // Snap overlay to the panel's exact position (no transition)
    overlay.style.display = 'block';
    overlay.style.backgroundImage = `url(${image})`;
    overlay.style.top = `${rect.top}px`;
    overlay.style.left = `${rect.left}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
    overlay.style.transition = 'none';

    // Force reflow so the starting position paints before transition kicks in
    overlay.getBoundingClientRect();

    // Next frame: expand to full viewport
    requestAnimationFrame(() => {
      overlay.style.transition = [
        'top 400ms cubic-bezier(0.4, 0, 0.2, 1)',
        'left 400ms cubic-bezier(0.4, 0, 0.2, 1)',
        'width 400ms cubic-bezier(0.4, 0, 0.2, 1)',
        'height 400ms cubic-bezier(0.4, 0, 0.2, 1)',
      ].join(', ');
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
    });

    // Navigate after expansion completes
    setTimeout(() => {
      router.push(link);
    }, 450);
  }, [router]);

  /* NAV scroll observer · watches accordion section top */
  useEffect(() => {
    const section = accordionRef.current;
    const nav = navRef.current;
    if (!nav) return;
    if (!section) {
      // Fallback: just listen to scroll position
      const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 80);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
    // Scrolled past ~80px of accordion top = nav gets white bg
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* SCROLL REVEAL */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-fade');
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* DATA-ANIMATE scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-animate]');
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.animateDelay ?? '0';
            el.style.setProperty('--delay', delay + 'ms');
            el.classList.add('is-visible');
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -80px 0px' });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── case study data ── */
  const caseStudies = [
    {
      bg: "linear-gradient(160deg,#1a0e00 0%,#2e1a00 35%,#1a0e00 70%,#0d0700 100%)",
      image: "/case-studies/nike2/nike_hero_brand_identity.webp",
      ghost: "Nike",
      badge: "Diagnosis → Decision Stack",
      num: "01 / 06",
      title: "NIKE SNKRS",
      clientWorkLabel: "Live client",
      insight: "\u201CA drop system designed for desire that produces abandonment. We diagnosed the failure point and rebuilt trust through documented tradeoffs.\u201D",
      link: "/work/nike",
    },
    {
      bg: "linear-gradient(160deg,#03081e 0%,#060f2e 35%,#03081e 65%,#010408 100%)",
      image: "/case-studies/saks/saks_hero_rack.webp",
      ghost: "Saks",
      badge: "Unit Economics → Platform Design",
      num: "02 / 06",
      title: "Vault by Saks",
      insight: "\u201C$6.1B in 10-year value. Rebuilding luxury retail from the balance sheet up. A business model as a design deliverable.\u201D",
      link: "/work/saks",
    },
    {
      bg: "linear-gradient(160deg,#120e08 0%,#251a10 35%,#120e08 70%,#080504 100%)",
      image: "/case-studies/carolyn/carolyn_hero_silhouette.webp",
      ghost: "Calvin Klein",
      badge: "Equity Architecture → Product Launch",
      num: "03 / 06",
      title: "The Carolyn",
      insight: "\u201CAn accessories gap is actually an equity architecture gap. Thirty years of cultural capital packed into a single, named object.\u201D",
      link: "/work/carolyn",
    },
    {
      bg: "linear-gradient(160deg,#001a08 0%,#002e12 35%,#001a08 70%,#000d04 100%)",
      image: "/case-studies/on/on_hero.webp",
      ghost: "On",
      badge: "Community Layer → Retention System",
      num: "04 / 06",
      title: "On APEX",
      insight: "\u201CThe hardware is flawless. The software layer doesn\u2019t exist. Designing the witness for the lifetime of the runner.\u201D",
      link: "/work/on-test",
    },
    {
      bg: "linear-gradient(160deg,#1c0e00 0%,#2e1800 35%,#1c0e00 70%,#0e0700 100%)",
      image: "/case-studies/diesel/diesel_hero.webp",
      imagePosition: "center center",
      ghost: "Diesel",
      badge: "Cultural Destination → Spatial Design",
      num: "05 / 06",
      title: "Diesel Iceberg",
      insight: "\u201CA five-floor building where ninety percent of the brand becomes inhabitable. Harajuku. No phones on two floors. Commerce is the outcome, not the offer.\u201D",
      link: "/work/diesel",
      peek: true,
    },
    {
      bg: "linear-gradient(160deg,#08060e 0%,#120e1e 35%,#08060e 70%,#040308 100%)",
      image: "/case-studies/stylect/stylect_hero.webp",
      ghost: "Stylect",
      badge: "Marketplace Design → Stakeholder Alignment",
      num: "06 / 06",
      title: "Stylect",
      insight: "\u201COrchestrating a three-sided marketplace where incentives align. Managing the tension between shopper, stylist, and retailer at the point of decision.\u201D",
      link: "/work/stylect",
      peek: true,
      extraOpacity: 0.5,
    },
  ];

  const writingPageMax = Math.max(0, Math.ceil(HOME_WRITING_PUBLIC.length / WRITING_PAGE_SIZE) - 1);
  const writingBlogs = isBlogExpanded
    ? HOME_WRITING_PUBLIC.slice(blogPage * WRITING_PAGE_SIZE, (blogPage + 1) * WRITING_PAGE_SIZE)
    : HOME_WRITING_PUBLIC.slice(0, WRITING_PREVIEW);

  return (<>
      {/* ── NAV ── */}
      <nav id="site-nav" ref={navRef}>
        <div className="nav-main">
          <div className="nav-left">
            <a href="#work">Work</a>
            <a href="#about">About</a>
          </div>
          <a href="/" className="nav-wordmark">Benn Pattara</a>
          <div className="nav-right">
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* ── ACCORDION WORK SECTION ── */}
      <section id="work" ref={accordionRef as React.RefObject<HTMLElement>}>
        {/* Accordion Panels · full viewport */}
        <div className="accordion-panels">
          {caseStudies.map((cs, i) => {
            const isHovered = hoveredCard === i;
            const anyHovered = hoveredCard !== null;
            return (<div
                key={i}
                ref={(el) => { panelRefs.current[i] = el; }}
                className={`accordion-panel${isHovered ? ' accordion-panel--expanded' : ''}${anyHovered && !isHovered ? ' accordion-panel--compressed' : ''}${fadingOut !== null && fadingOut !== i ? ' accordion-panel--fade-out' : ''}`}
                style={cs.image ? {
                  background: `linear-gradient(to bottom, rgba(3,8,30,.12) 0%, rgba(3,8,30,.45) 100%), url(${cs.image}) no-repeat`,
                  backgroundSize: "cover",
                  backgroundPosition: cs.imagePosition || "center center",
                } : { background: cs.bg }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={(e) => cs.link && handleCardClick(cs.link, cs.image, i, e)}
              >
                {/* Collapsed state: project title */}
                <div className={`accordion-collapsed${isHovered ? ' accordion-collapsed--hidden' : ''}`}>
                  <div className="accordion-collapsed-title">{cs.title}</div>
                  {"clientWorkLabel" in cs && cs.clientWorkLabel ? (<div className="accordion-collapsed-client">{cs.clientWorkLabel}</div>) : null}
                </div>

                {/* Card number */}
                <div className="accordion-num">{cs.num}</div>

                {/* Full content · fades in on expand */}
                <div className={`accordion-content${isHovered ? ' accordion-content--visible' : ''}`}>
                  <div className="accordion-meta-row">
                    {"clientWorkLabel" in cs && cs.clientWorkLabel ? (<div className="accordion-badge accordion-badge--client">
                        <span>{cs.clientWorkLabel}</span>
                      </div>) : null}
                    <div className="accordion-badge">
                      <span>{cs.badge}</span>
                    </div>
                  </div>
                  <div className="accordion-body">
                    <div className="accordion-title">{cs.title}</div>
                    <div className="accordion-insight">{cs.insight}</div>
                    <button
                      className="accordion-cta"
                      onClick={(e) => { e.stopPropagation(); cs.link && handleCardClick(cs.link, cs.image, i, e); }}
                    >
                      View Case Study &rarr;
                    </button>
                  </div>
                </div>
              </div>);
          })}
        </div>
      </section>

      {/* ── METRICS STRIP (hidden) ── */}
      <div className="metrics-strip" style={{ display: 'none' }} aria-hidden="true">
        <div className="metrics-marquee">
          {/* First Set */}
          <div className="metric-block"><span className="metric-num">10&times;</span><span className="metric-label">Loyalty Conversion &middot; Gap Inc.</span></div>
          <div className="metric-sep" />
          <div className="metric-block"><span className="metric-num">70hrs+</span><span className="metric-label">Brand Engagement &middot; Burberry &times; Fortnite</span></div>
          <div className="metric-sep" />
          <div className="metric-block"><span className="metric-num">12&times;</span><span className="metric-label">Inventory Turnover &middot; Saks Orbit</span></div>
          <div className="metric-sep" />
          <div className="metric-block"><span className="metric-num">82 NPS</span><span className="metric-label">Brand Identity &middot; On Apex</span></div>
          <div className="metric-sep" />
          <div className="metric-block"><span className="metric-num">+11%</span><span className="metric-label">Comp YTD &middot; Gap District</span></div>
          <div className="metric-sep" />
          <div className="metric-block"><span className="metric-num">7</span><span className="metric-label">Complete Case Studies</span></div>
          <div className="metric-sep" />
          {/* Second Set (Duplicate for Marquee) */}
          <div className="metric-block"><span className="metric-num">10&times;</span><span className="metric-label">Loyalty Conversion &middot; Gap Inc.</span></div>
          <div className="metric-sep" />
          <div className="metric-block"><span className="metric-num">70hrs+</span><span className="metric-label">Brand Engagement &middot; Burberry &times; Fortnite</span></div>
          <div className="metric-sep" />
          <div className="metric-block"><span className="metric-num">12&times;</span><span className="metric-label">Inventory Turnover &middot; Saks Orbit</span></div>
          <div className="metric-sep" />
          <div className="metric-block"><span className="metric-num">82 NPS</span><span className="metric-label">Brand Identity &middot; On Apex</span></div>
          <div className="metric-sep" />
          <div className="metric-block"><span className="metric-num">+11%</span><span className="metric-label">Comp YTD &middot; Gap District</span></div>
          <div className="metric-sep" />
          <div className="metric-block"><span className="metric-num">7</span><span className="metric-label">Complete Case Studies</span></div>
          <div className="metric-sep" />
        </div>
      </div>




      {/* ── RECENT WRITING (moved under About, hidden for now) ── */}
      <section id="writing" className="reveal" style={{ display: 'none' }} aria-hidden="true">
        <div className="writing-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="writing-label">Recent Writing</span>

          {HOME_WRITING_PUBLIC.length > WRITING_PREVIEW && (!isBlogExpanded ? (<button
              onClick={() => setIsBlogExpanded(true)}
              style={{
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                fontSize: '11px',
                letterSpacing: '.1em',
                color: 'var(--g500)',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--g500)',
                paddingBottom: '2px',
                transition: 'color var(--ease-fast)'
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = 'var(--black)'; e.currentTarget.style.borderColor = 'var(--black)'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'var(--g500)'; e.currentTarget.style.borderColor = 'var(--g500)'; }}
            >
              All Articles &rarr;
            </button>) : (<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button
                onClick={() => setBlogPage(p => Math.max(0, p - 1))}
                disabled={blogPage === 0}
                style={{
                  cursor: blogPage === 0 ? 'not-allowed' : 'pointer',
                  opacity: blogPage === 0 ? 0.3 : 1,
                  background: 'transparent',
                  border: 'none',
                  fontSize: '20px',
                  color: 'var(--black)',
                  padding: '4px 8px'
                }}
              >
                &larr;
              </button>
              <span style={{ fontSize: '11px', letterSpacing: '.1em', color: 'var(--g500)', textTransform: 'uppercase' }}>
                {blogPage + 1} / {writingPageMax + 1}
              </span>
              <button
                onClick={() => setBlogPage(p => Math.min(writingPageMax, p + 1))}
                disabled={blogPage >= writingPageMax}
                style={{
                  cursor: blogPage >= writingPageMax ? 'not-allowed' : 'pointer',
                  opacity: blogPage >= writingPageMax ? 0.3 : 1,
                  background: 'transparent',
                  border: 'none',
                  fontSize: '20px',
                  color: 'var(--black)',
                  padding: '4px 8px'
                }}
              >
                &rarr;
              </button>
            </div>))}
        </div>

        <div className="articles-grid">
          {writingBlogs.map((blog, index) => (<div
              className="article-card"
              key={blog.num}
              data-animate="fade-up"
              data-animate-delay={String(index * 80)}
            >
              <div className="article-ghost-num">{blog.num}</div>
              <div className="article-category">{blog.category}</div>
              <div className="article-title">{blog.title}</div>
              <div className="article-desc">{blog.desc}</div>
              <div className="article-footer">
                <span className="article-date">{blog.date}</span>
                <a href={blog.link} className="article-read">{blog.link === '#' ? 'Coming Soon' : 'Read \u2192'}</a>
              </div>
            </div>))}
        </div>
      </section>


      {/* ══════════════════════════════════════════
          FULL ABOUT SECTION (migrated from about.html)
      ══════════════════════════════════════════ */}

      {/* ── ABOUT HERO ── */}
      <section id="about" className="about-hero">
        <div>
          <h2 className="about-hero-title" data-animate="fade-up" data-animate-delay="0">
            FASHION BRANDS OVER-INDEX ON ACQUISITION. THE DEFENSIBLE POSITION IS EARNED LOYALTY, NOT PURCHASED ATTENTION.
          </h2>
          <p className="about-hero-body" data-animate="fade-up" data-animate-delay="80">
            Confidence is not a brand value. It is a measurable outcome. I build the systems that produce it: the product experience that earns trust, the loyalty architecture that converts a transaction into identity, and the data infrastructure that proves the difference.
          </p>
          <p className="about-hero-body" data-animate="fade-up" data-animate-delay="160">
            I work across brand strategy, product management, and experience design. I use data to find the failure point and design to fix it.
          </p>
        </div>

        <aside className="about-hero-sidebar">
          <div className="about-meta">
            <p className="about-meta-text">VCU Brandcenter M.S. Business/Branding, expected May 2026</p>
            <p className="about-meta-text">Product Design &amp; Brand Strategy</p>
            <p className="about-meta-text">Currently based in Richmond, VA</p>
          </div>

          <div className="about-featured-block">
            <span className="featured-label">Featured In</span>
            <div className="featured-names">
              <span className="featured-name">AdAge</span>
              <span className="featured-name">AdForum</span>
              <span className="featured-name">Communication Arts</span>
              <span className="featured-name">Print Mag</span>
              <span className="featured-name">Stash</span>
            </div>
            <p className="featured-qualifier">
              Via Branch Museum of Design &times; MullenLowe Design Studio
            </p>
          </div>

          <div className="about-hero-ctas">
            <Link href="/about" className="about-cta-btn about-cta-btn--secondary">About me</Link>
            <a href="/resume.pdf" className="about-cta-btn about-cta-btn--secondary" download="Benn_Pattara.pdf">Download R&eacute;sum&eacute;</a>
            <a href="#contact" className="about-cta-btn about-cta-btn--primary">Get in Touch</a>
          </div>
        </aside>
      </section>


      {/* ── CAPABILITIES ── */}
      <section className="section-block">
        <div className="section-row" style={{ marginBottom: 40 }}>
          <div>
            <div className="section-num">01</div>
            <div className="section-title-label" data-animate="fade-up" data-animate-delay="0">Capabilities</div>
          </div>
          <div />
        </div>
        <div className="cap-grid">
          <div className="cap-card" data-animate="fade-up" data-animate-delay="0">
            <div className="cap-num">01 · </div>
            <div className="cap-title">Product<br />Management</div>
            <div className="cap-desc">End-to-end product strategy and execution, from PRD authorship and user grounding to launch sequencing and sensitivity risk management. Decision-making frameworks, tradeoff documentation, and cross-functional alignment.</div>
            <div className="cap-skills">
              <span className="cap-skill">PRD &amp; Specs</span>
              <span className="cap-skill">GTM Planning</span>
              <span className="cap-skill">Launch Sequencing</span>
              <span className="cap-skill">Risk Management</span>
            </div>
          </div>
          <div className="cap-card" data-animate="fade-up" data-animate-delay="80">
            <div className="cap-num">02 · </div>
            <div className="cap-title">Brand<br />Strategy</div>
            <div className="cap-desc">Building brand-consumer relationships across the full journey, from cultural discovery to deep identity-level advocacy. Trend forecasting, positioning, and narrative architecture.</div>
            <div className="cap-skills">
              <span className="cap-skill">Positioning</span>
              <span className="cap-skill">Trend Forecasting</span>
              <span className="cap-skill">Narrative Design</span>
              <span className="cap-skill">Cultural Strategy</span>
            </div>
          </div>
          <div className="cap-card" data-animate="fade-up" data-animate-delay="160">
            <div className="cap-num">03 · </div>
            <div className="cap-title">Experience<br />Design</div>
            <div className="cap-desc">Designing across physical and digital retail, from service blueprints to high-fidelity prototypes. Information architecture built for clarity, not just usability.</div>
            <div className="cap-skills">
              <span className="cap-skill">Journey Mapping</span>
              <span className="cap-skill">Service Blueprints</span>
              <span className="cap-skill">Figma</span>
              <span className="cap-skill">Phygital Integration</span>
            </div>
          </div>
          <div className="cap-card" data-animate="fade-up" data-animate-delay="240">
            <div className="cap-num">04 · </div>
            <div className="cap-title">Systems<br />Design</div>
            <div className="cap-desc">Designing the invisible scaffolding: gamification, loyalty architecture, behavioral loops, and circular models. The best system design is the one the consumer never notices working.</div>
            <div className="cap-skills">
              <span className="cap-skill">Gamification</span>
              <span className="cap-skill">Behavioral Design</span>
              <span className="cap-skill">Circular Economy</span>
              <span className="cap-skill">Omnichannel</span>
            </div>
          </div>
          <div className="cap-card" data-animate="fade-up" data-animate-delay="320">
            <div className="cap-num">05 · </div>
            <div className="cap-title">AI &amp;<br />Emerging Tech</div>
            <div className="cap-desc">Translating machine learning concepts into actionable brand strategy. Generative AI workflows, AI-driven personalization systems, and &ldquo;Digital Fluency&rdquo; models for executives.</div>
            <div className="cap-skills">
              <span className="cap-skill">Gen AI Workflows</span>
              <span className="cap-skill">Google AI Studio</span>
              <span className="cap-skill">NotebookLM</span>
              <span className="cap-skill">A/B Testing</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE COMPETENCIES ── */}
      <section className="section-block section-block-alt">
        <div className="section-row">
          <div>
            <div className="section-num">Skills</div>
            <div className="section-title-label">Core Competencies</div>
          </div>
          <div className="skills-cloud">
            <span className="skill-pill">Product Management</span>
            <span className="skill-pill">Brand Strategy</span>
            <span className="skill-pill">Experience Design</span>
            <span className="skill-pill">Retail Math (AUR, ST%, WOS)</span>
            <span className="skill-pill">Trend Forecasting</span>
            <span className="skill-pill">Phygital Integration</span>
            <span className="skill-pill">User Journey Mapping</span>
            <span className="skill-pill">Generative AI Workflows</span>
            <span className="skill-pill">Circular Economy Models</span>
            <span className="skill-pill">Gamification Design</span>
            <span className="skill-pill">Behavioral Analysis</span>
            <span className="skill-pill">Omnichannel Strategy</span>
            <span className="skill-pill">Service Blueprints</span>
            <span className="skill-pill">Figma</span>
            <span className="skill-pill">Adobe Creative Suite</span>
            <span className="skill-pill">Google AI Studio</span>
            <span className="skill-pill">Cross-functional Leadership</span>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="section-block">
        <div className="section-row" style={{ marginBottom: 0 }}>
          <div>
            <div className="section-num">02</div>
            <div className="section-title-label">Experience</div>
          </div>
          <div>
            <div className="exp-intro" data-animate="fade-up" data-animate-delay="0">AN UNUSUAL PATH.<br />AN INTENTIONAL PRACTICE.</div>
            <p className="exp-intro-body">Graphic design trained on visual systems. Frontline retail where loyalty is a feeling you either engineer or lose.</p>

            {/* Role 01 */}
            <div className="role-row" data-animate="fade-left" data-animate-delay="0">
              <div>
                <div className="role-date">2024 &ndash; PRESENT</div>
                <div className="role-company">GAP STORE #1224</div>
              </div>
              <div>
                <div className="role-title">LOYALTY LEAD</div>
                <div className="role-desc">
                  <ul>
                    <li>Architected Encore Madness, a test-and-learn district competition across 11 stores, delivering 86% card application lift and 141% card transaction lift at Store #1224.</li>
                    <li>Designed Encore Cup, a FIFA World Cup 2026-themed in-store loyalty program with a live HTML dashboard tracking results, standings, and leaderboards.</li>
                    <li>Built cross-functional coaching infrastructure (LOD handbooks, S.T.Y.L.E. styling guides, conversion scripting) to operationalize HQ loyalty strategy at the store level.</li>
                    <li>Scaled personal loyalty conversion from 1.22% to 12.07%; #1 in Gap East for card volume and acquisition rate, Q1 2026. Team acquisition goal attainment +40%; comp YTD +11%.</li>
                  </ul>
                </div>
                <div className="role-highlight">10&times; CONVERSION GROWTH &middot; #1 GAP EAST CARD VOLUME &amp; ACQ. RATE, Q1 2026</div>
              </div>
            </div>

            {/* Role 02 */}
            <div className="role-row" data-animate="fade-left" data-animate-delay="100">
              <div>
                <div className="role-date">MAR 2025 &ndash; PRESENT</div>
                <div className="role-company">BRANCH MUSEUM OF DESIGN</div>
              </div>
              <div>
                <div className="role-title">UI/UX STRATEGIST &amp; CONTENT DESIGNER &middot; W/ MULLENLOWE U.S.</div>
                <div className="role-desc">
                  <ul>
                    <li>Led strategic translation of new institutional identity into a digital-first experience system: user journeys, content hierarchy, and interaction logic in collaboration with MullenLowe U.S.</li>
                    <li>Mapped end-to-end visitor journeys across digital discovery and physical attendance; designed content touchpoints to close the gap between digital engagement and in-space conversion.</li>
                    <li>Operated as connective layer between institutional stakeholders, creative partners, and technical execution, aligning vision, brand standards, and delivery timelines.</li>
                  </ul>
                </div>
                <div className="role-highlight">ADAGE REBRAND OF THE YEAR 2026 &middot; ADAGE &middot; ADFORUM &middot; COMMUNICATION ARTS</div>
              </div>
            </div>

            {/* Role 03 */}
            <div className="role-row" data-animate="fade-left" data-animate-delay="150">
              <div>
                <div className="role-date">APR &ndash; OCT 2025</div>
                <div className="role-company">INSTITUTE FOR CONTEMPORARY ART AT VCU</div>
              </div>
              <div>
                <div className="role-title">BRAND STRATEGIST &amp; EXPERIENTIAL CREATIVE</div>
                <div className="role-desc">
                  <ul>
                    <li>Developed strategic and experiential framework for high-profile institutional programming, defining how ICA&rsquo;s identity translates across physical space, digital presence, and community activation.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Role 04 */}
            <div className="role-row" data-animate="fade-left" data-animate-delay="200" style={{ borderBottom: "1px solid var(--g200)", paddingBottom: 32 }}>
              <div>
                <div className="role-date">JAN 2025 &ndash; FEB 2026</div>
                <div className="role-company">REVOLUTION FACTORY</div>
              </div>
              <div>
                <div className="role-title">BRAND STRATEGIST &amp; CREATIVE CONSULTANT</div>
                <div className="role-desc">
                  <ul>
                    <li>Lead strategist for <em>Designing the Future</em>, a forthcoming publication on AI and organizational leadership, responsible for narrative architecture and translating research into accessible brand voice.</li>
                    <li>Developed frameworks for embedding generative AI tools into core business workflows, treating AI integration as a test-and-learn capability problem.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section className="section-block section-block-alt">
        <div className="section-row">
          <div>
            <div className="section-num">03</div>
            <div className="section-title-label">Education</div>
          </div>
          <div className="edu-grid">
            <div className="edu-cell">
              <div className="edu-level">GRADUATE</div>
              <div className="edu-degree">M.S. Business/<br />Branding</div>
              <div className="edu-focus">EXPERIENTIAL DESIGN</div>
              <div className="edu-school">VCU Brandcenter &middot; Expected May 2026</div>
              <div className="edu-note">Research: consumer behavior, AI-driven product design &amp; data-driven brand strategy.</div>
            </div>
            <div className="edu-cell">
              <div className="edu-level">UNDERGRADUATE</div>
              <div className="edu-degree">B.S. Studio &amp;<br />Digital Arts</div>
              <div className="edu-focus">GRAPHIC DESIGN</div>
              <div className="edu-school">Liberty University &middot; May 2024</div>
              <div className="edu-note">Core: visual systems, narrative craft. Minors: Business Marketing, Journalism.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section-block" id="contact" style={{ borderBottom: 'none', paddingBottom: '32px' }}>
        <div className="section-row">
          <div>
            <div className="section-num">04</div>
            <div className="section-title-label">Contact</div>
          </div>
          <div>
            <h2 className="contact-heading" data-animate="fade-up" data-animate-delay="0">LET&rsquo;S MAKE SOMETHING WORTH DOING.</h2>
            <p className="contact-body" data-animate="fade-up" data-animate-delay="80">Open to full-time product design and brand strategy, experience design, and creative direction roles. Also available for consulting and collaborative projects. Response within 48 hours.</p>

            <div className="contact-links" style={{ background: 'transparent' }}>
              <div className="contact-link-cell" data-animate="fade-up" data-animate-delay="160">
                <div className="contact-link-label">Email</div>
                <div style={{ fontSize: '15px', color: 'var(--black)', marginTop: '8px', cursor: 'pointer', userSelect: 'all' }}>bennpattara@gmail.com</div>
              </div>
              <div className="contact-link-cell" data-animate="fade-up" data-animate-delay="220">
                <div className="contact-link-label">LinkedIn</div>
                <a href="https://linkedin.com/in/bennpattara" target="_blank" rel="noopener noreferrer">Connect</a>
              </div>
              <div className="contact-link-cell" data-animate="fade-up" data-animate-delay="280">
                <div className="contact-link-label">R&eacute;sum&eacute; PDF</div>
                <a href="/resume.pdf" download="Benn_Pattara.pdf">Download</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deleted Framework & POV Blocks */}


      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-left">
          <span className="footer-name">BENN PATTARA</span>
          <span className="footer-role">PRODUCT DESIGN &amp; BRAND STRATEGY</span>
          <span className="footer-qualifier">from cultural insight to shipped product specs</span>
        </div>
        <div className="footer-links">
          <a href="#about" className="footer-link">About</a>
          <a href="/blog" className="footer-link">Blog</a>
          <a href="/13" className="footer-link">13</a>
          <a href="#contact" className="footer-link">Contact</a>
        </div>
        <span className="footer-copy">&copy; 2026 BENN PATTARA &middot; BENNPATTARA.COM</span>
      </footer>

      <div id="cs-transition-overlay" ref={overlayRef} />
    </>);
}
