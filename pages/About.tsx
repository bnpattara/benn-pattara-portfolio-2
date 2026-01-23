
import React from 'react';
import { SKILLS, PROFESSIONAL_EXPERIENCE } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#f5f5f4]">
      {/* Intro Header */}
      <section className="px-6 md:px-12 py-24 md:py-32 max-w-[1440px] mx-auto border-b border-stone-200">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start">
          <div className="w-full md:w-1/3">
            <div className="aspect-[4/5] bg-stone-200 border border-stone-300 overflow-hidden relative grayscale">
              <img
                src="./benn-portrait.jpg"
                alt="Benn Pattara"
                className="w-full h-full object-cover object-top opacity-80"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/50 to-transparent">
                <p className="text-white text-[10px] tracking-widest uppercase font-medium">Benn Pattara — 2025</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 space-y-12">
            <div className="space-y-4">
              <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-400 uppercase">Profile</h2>
              <h3 className="text-4xl md:text-6xl font-light tracking-tighter text-stone-900 leading-tight">
                Product Leader, Retail Strategist, <span className="italic">Systems Designer.</span>
              </h3>
            </div>

            <p className="text-xl text-stone-600 leading-relaxed font-light max-w-2xl">
              Currently pursuing an M.S. in Business/Branding at VCU Brandcenter with a focus on AI-driven design and circular economy.
              My work exists at the intersection of aesthetic precision and data-driven execution.
            </p>

            <div className="flex gap-8">
              <a
                href="https://www.linkedin.com/in/bennpattara"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase border-b border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-all"
              >
                LinkedIn <ArrowUpRight size={14} />
              </a>
              <a
                href="mailto:bennpattara@gmail.com"
                className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase border-b border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-all"
              >
                Email <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Skills Content */}
      <section className="px-6 md:px-12 py-24 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">

        {/* Left Column: Skills & Education */}
        <div className="md:col-span-4 space-y-24">
          <div className="space-y-12">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase pb-4 border-b border-stone-200">Competencies</h2>
            <div className="space-y-12">
              {SKILLS.map((skill, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-[11px] font-bold tracking-widest text-stone-900 uppercase italic">{skill.title}</h4>
                  <ul className="space-y-2">
                    {skill.items.map((item, sidx) => (
                      <li key={sidx} className="text-[13px] text-stone-500 font-medium tracking-wide">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase pb-4 border-b border-stone-200">Education</h2>
            <div className="space-y-8">
              <div>
                <p className="text-[11px] font-bold uppercase text-stone-900">VCU Brandcenter</p>
                <p className="text-[13px] text-stone-500 font-medium">M.S. Business/Branding: Experiential Design</p>
                <p className="text-[11px] text-stone-400 mt-1 uppercase">Expected May 2026</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase text-stone-900">Liberty University</p>
                <p className="text-[13px] text-stone-500 font-medium">B.S. Studio & Digital Arts: Graphic Design</p>
                <p className="text-[11px] text-stone-400 mt-1 uppercase">May 2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Professional Experience */}
        <div className="md:col-span-8 space-y-16">
          <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase pb-4 border-b border-stone-200">Professional Experience</h2>
          <div className="space-y-24">
            {PROFESSIONAL_EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="space-y-8 group">
                <div className="flex flex-col md:flex-row md:justify-between items-baseline gap-2">
                  <h3 className="text-2xl font-light tracking-tight text-stone-900 uppercase">{exp.company}</h3>
                  <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">{exp.period}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-stone-900 italic">{exp.role}</span>
                </div>
                <ul className="space-y-4 max-w-2xl">
                  {exp.highlights.map((point, pidx) => (
                    <li key={pidx} className="text-sm leading-relaxed text-stone-600 font-light pl-6 relative">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-24 border-t border-stone-200">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase pb-8">Featured Publications</h2>
            <div className="flex flex-wrap gap-4 text-[10px] font-bold tracking-widest uppercase">
              {['AdAge', 'AdForum', 'Communication Arts', 'Print Mag', 'Stash'].map((pub) => (
                <span key={pub} className="px-3 py-1 bg-white border border-stone-200 text-stone-500">{pub}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
