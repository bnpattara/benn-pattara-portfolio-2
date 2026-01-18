
import React from 'react';
import { CaseStudyHeroProps } from './types';

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ title, category, role, year, ask }) => {
    // Split title on ':' for italic effect on second part
    const titleParts = title.split(':');
    const mainTitle = titleParts[0];
    const subTitle = titleParts[1] || '';

    return (
        <section className="px-6 md:px-12 py-24 md:py-32 max-w-[1440px] mx-auto border-b border-stone-200">
            <div className="space-y-12">
                <div className="flex flex-col md:flex-row md:justify-between items-baseline gap-4">
                    <h1 className="text-5xl md:text-9xl font-light tracking-tighter text-stone-900 leading-[0.9] uppercase">
                        {mainTitle} <br />
                        {subTitle && <span className="italic">{subTitle}</span>}
                    </h1>
                    <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-stone-500 max-w-[200px] text-right">
                        {category}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-12 border-t border-stone-200">
                    <div className="md:col-span-4 space-y-6">
                        <div>
                            <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 mb-2">Role</h4>
                            <p className="text-stone-900 font-medium">{role}</p>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 mb-2">Year</h4>
                            <p className="text-stone-900 font-medium">{year}</p>
                        </div>
                    </div>
                    <div className="md:col-span-8">
                        <p className="text-xl md:text-3xl font-light leading-relaxed text-stone-800">
                            {ask}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaseStudyHero;
