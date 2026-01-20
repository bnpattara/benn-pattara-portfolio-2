
import React from 'react';

interface BusinessBenefit {
    title: string;
    description: string;
}

interface NikeImpactProps {
    benefits: BusinessBenefit[];
    reflection: string;
}

const NikeImpact: React.FC<NikeImpactProps> = ({ benefits, reflection }) => {
    return (
        <section className="space-y-12">
            {/* Section Header */}
            <div className="border-b border-stone-900 pb-4">
                <span className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">Section 05</span>
                <h2 className="text-2xl md:text-3xl font-light text-stone-900 mt-2">The Impact <span className="text-stone-400">(The Business Value)</span></h2>
            </div>

            {/* Business Benefits */}
            <div className="space-y-8">
                <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">Business Benefits</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-stone-900 text-white flex items-center justify-center text-sm font-bold">
                                    {i + 1}
                                </div>
                                <h4 className="text-lg font-medium text-stone-900">{benefit.title}</h4>
                            </div>
                            <p className="text-sm text-stone-500 font-light leading-relaxed pl-11">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Personal Reflection */}
            <div className="space-y-6 pt-8 border-t border-stone-200">
                <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">Personal Reflection</h3>
                <blockquote className="text-xl md:text-2xl font-light text-stone-700 italic leading-relaxed">
                    "{reflection}"
                </blockquote>
            </div>
        </section>
    );
};

export default NikeImpact;
