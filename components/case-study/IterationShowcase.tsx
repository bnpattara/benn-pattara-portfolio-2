
import React from 'react';
import { IterationShowcaseProps } from './types';

const IterationShowcase: React.FC<IterationShowcaseProps> = ({ decisions }) => {
    if (!decisions || decisions.length === 0) return null;

    return (
        <div className="space-y-12">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">Design Decisions</h2>

            <div className="space-y-12">
                {decisions.map((decision, i) => (
                    <div key={i} className="space-y-4">
                        {/* Decision Title */}
                        <h3 className="text-base font-medium text-stone-900 uppercase tracking-wide">
                            {decision.title}
                        </h3>

                        {/* What Was Decided */}
                        <p className="text-stone-900 font-light leading-relaxed">
                            {decision.decision}
                        </p>

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
