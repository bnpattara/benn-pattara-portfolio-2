
import React from 'react';
import { IterationShowcaseProps } from './types';

const IterationShowcase: React.FC<IterationShowcaseProps> = ({ decisions }) => {
    if (!decisions || decisions.length === 0) return null;

    return (
        <div className="space-y-12">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">Design Decisions</h2>

            <div className="space-y-16">
                {decisions.map((decision, i) => (
                    <div key={i} className="space-y-8">
                        {/* Decision Title */}
                        <h3 className="text-lg font-light uppercase tracking-tight text-stone-900">
                            {decision.title}
                        </h3>

                        {/* A vs B Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Option A */}
                            <div className={`p-8 border-2 ${decision.chosen === 'A' ? 'border-stone-900 bg-stone-50' : 'border-stone-200'}`}>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Option A</span>
                                        {decision.chosen === 'A' && (
                                            <span className="px-3 py-1 bg-stone-900 text-white text-[10px] font-bold tracking-wider uppercase">
                                                Chosen
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-base font-medium text-stone-900">{decision.optionA.label}</h4>
                                    <p className="text-sm text-stone-600 font-light leading-relaxed">
                                        {decision.optionA.description}
                                    </p>
                                </div>
                            </div>

                            {/* Option B */}
                            <div className={`p-8 border-2 ${decision.chosen === 'B' ? 'border-stone-900 bg-stone-50' : 'border-stone-200'}`}>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Option B</span>
                                        {decision.chosen === 'B' && (
                                            <span className="px-3 py-1 bg-stone-900 text-white text-[10px] font-bold tracking-wider uppercase">
                                                Chosen
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-base font-medium text-stone-900">{decision.optionB.label}</h4>
                                    <p className="text-sm text-stone-600 font-light leading-relaxed">
                                        {decision.optionB.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Reasoning */}
                        <div className="border-l-2 border-stone-900 pl-6">
                            <p className="text-sm text-stone-600 font-light leading-relaxed italic">
                                <span className="font-medium text-stone-900 not-italic">Reasoning:</span> {decision.reasoning}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IterationShowcase;
