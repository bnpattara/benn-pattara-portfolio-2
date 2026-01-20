
import React from 'react';

interface CaseStudyHeroNewProps {
    title: string;
    subtitle?: string;
    category: string;
    year: string;
    imageUrl: string;
}

const CaseStudyHeroNew: React.FC<CaseStudyHeroNewProps> = ({ title, subtitle, category, year, imageUrl }) => {
    return (
        <>
            {/* Hero Section - reduced py-16 to py-8 */}
            <section className="px-6 md:px-12 pt-4 pb-8 max-w-[1440px] mx-auto">
                <div className="space-y-4">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">Case Study</span>
                    <h1 className="text-4xl md:text-6xl font-light text-stone-900 leading-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-xl md:text-2xl font-light text-stone-500">{subtitle}</p>
                    )}
                    <div className="flex flex-wrap gap-6 text-[11px] font-medium tracking-widest text-stone-500 uppercase">
                        <span>{category}</span>
                        <span>•</span>
                        <span>{year}</span>
                    </div>
                </div>
            </section>

            {/* Hero Visual - reduced py-12 to py-4 */}
            <section className="px-6 md:px-12 py-4 max-w-[1440px] mx-auto">
                <div className="aspect-[21/9] bg-stone-200 grayscale overflow-hidden border border-stone-200">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover opacity-90 transition-all duration-1000 hover:grayscale-0"
                    />
                </div>
            </section>
        </>
    );
};

export default CaseStudyHeroNew;
