
import React, { useState } from 'react';
import NikePersonaTool from './NikePersonaTool';

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

interface NikeInvestigationProps {
    researchMethods: ResearchMethod[];
    segments: Segment[];
    dataPoints: DataPoint[];
}

const NikeInvestigation: React.FC<NikeInvestigationProps> = ({ researchMethods, segments, dataPoints }) => {
    const [isPersonaToolExpanded, setIsPersonaToolExpanded] = useState(false);

    return (
        <section className="space-y-16">
            {/* Section Header */}
            <div className="border-b border-stone-900 pb-4">
                <span className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">Section 02</span>
                <h2 className="text-2xl md:text-3xl font-light text-stone-900 mt-2">The Investigation <span className="text-stone-400">(The Methodology)</span></h2>
            </div>

            {/* Research Methodology Intro */}
            <div className="space-y-4">
                <p className="text-lg text-stone-600 font-light leading-relaxed">
                    Our team executed a multi-dimensional research phase to deep-dive into demographics, psychographics, and background behaviors.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="p-6 border-l-4 border-stone-900 bg-stone-50">
                        <div className="text-3xl font-bold text-stone-900 mb-2">629</div>
                        <div className="text-sm font-medium text-stone-900 uppercase tracking-wider mb-1">Total Research Touchpoints</div>
                        <p className="text-sm text-stone-500 font-light">Four surveys (258 respondents), five in-depth interviews, and two focus groups.</p>
                    </div>
                    <div className="p-6 border-l-4 border-stone-900 bg-stone-50">
                        <div className="text-3xl font-bold text-stone-900 mb-2">5</div>
                        <div className="text-sm font-medium text-stone-900 uppercase tracking-wider mb-1">AI Persona Prototypes</div>
                        <p className="text-sm text-stone-500 font-light">Fully functional AI personas to stress-test solutions against consumer pain points.</p>
                    </div>
                </div>
            </div>

            {/* Research Methods */}
            <div className="space-y-8">
                <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">Research Methods</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {researchMethods.map((method, i) => (
                        <div key={i} className="p-6 border border-stone-200 hover:border-stone-900 transition-colors">
                            <h4 className="text-sm font-medium text-stone-900 mb-2">{method.title}</h4>
                            <p className="text-sm text-stone-500 font-light">{method.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Three-Segment Framework */}
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">Target Audience Segmentation</h3>
                </div>

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
                        </div>
                    ))}
                </div>

                {/* Persona Tool CTA */}
                <NikePersonaTool
                    isExpanded={isPersonaToolExpanded}
                    onToggle={() => setIsPersonaToolExpanded(!isPersonaToolExpanded)}
                />
            </div>

            {/* Key Data Points */}
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
        </section>
    );
};

export default NikeInvestigation;
