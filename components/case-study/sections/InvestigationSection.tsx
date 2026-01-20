
import React from 'react';

interface ResearchMethod {
    title: string;
    description: string;
}

interface Segment {
    name: string;
    share: string;
    mindset: string;
    opportunity: string;
}

interface DataPoint {
    label: string;
    value: string;
    description: string;
}

interface InvestigationSectionProps {
    intro?: string;
    researchMethods: ResearchMethod[];
    segments?: Segment[];
    dataPoints?: DataPoint[];
    showTalkToAudience?: boolean;
}

const InvestigationSection: React.FC<InvestigationSectionProps> = ({
    intro = "To understand this challenge, our team conducted a comprehensive multi-phase research project:",
    researchMethods,
    segments,
    dataPoints,
    showTalkToAudience = false
}) => {
    return (
        <section className="space-y-16">
            {/* Section Header */}
            <div className="border-b border-stone-900 pb-4">
                <span className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">Section 02</span>
                <h2 className="text-2xl md:text-3xl font-light text-stone-900 mt-2">The Investigation <span className="text-stone-400">(The Methodology)</span></h2>
            </div>

            {/* Research Methods */}
            <div className="space-y-8">
                <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">Research Methods</h3>
                <p className="text-base text-stone-600 font-light leading-relaxed">{intro}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {researchMethods.map((method, i) => (
                        <div key={i} className="p-6 border border-stone-200 hover:border-stone-900 transition-colors">
                            <h4 className="text-sm font-medium text-stone-900 mb-2">{method.title}</h4>
                            <p className="text-sm text-stone-500 font-light">{method.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Segment Framework (optional) */}
            {segments && segments.length > 0 && (
                <div className="space-y-8">
                    <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">Segment Analysis</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {segments.map((segment, i) => (
                            <div key={i} className="flex flex-col h-full p-8 bg-stone-100 hover:bg-stone-200 transition-colors group">
                                <div className="flex-grow space-y-6">
                                    <div className="space-y-2">
                                        <span className="text-3xl font-bold text-stone-900">{segment.share}</span>
                                        <h4 className="text-lg font-medium text-stone-900">{segment.name}</h4>
                                    </div>

                                    <div className="space-y-4 text-sm text-stone-600 font-light">
                                        <div>
                                            <span className="font-medium text-stone-700">Mindset: </span>
                                            {segment.mindset}
                                        </div>
                                        <div>
                                            <span className="font-medium text-stone-700">Opportunity: </span>
                                            {segment.opportunity}
                                        </div>
                                    </div>
                                </div>

                                {showTalkToAudience && (
                                    <div className="mt-8 pt-6 border-t border-stone-300">
                                        <a
                                            href="#"
                                            className="inline-flex items-center text-[10px] font-bold tracking-widest text-stone-900 uppercase group-hover:translate-x-1 transition-transform"
                                        >
                                            Talk to Audience
                                            <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Key Data Points (optional) */}
            {dataPoints && dataPoints.length > 0 && (
                <div className="space-y-8">
                    <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">Key Data Points</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {dataPoints.map((point, i) => (
                            <div key={i} className="space-y-2">
                                <div className="text-4xl font-bold text-stone-900">{point.value}</div>
                                <div className="text-sm font-medium text-stone-900 uppercase tracking-wider">{point.label}</div>
                                <p className="text-sm text-stone-500 font-light">{point.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default InvestigationSection;
