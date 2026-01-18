
import React from 'react';
import { InsightStrategyProps } from './types';

const InsightStrategy: React.FC<InsightStrategyProps> = ({ insight, strategy }) => {
    return (
        <div className="space-y-12">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">Insight & Strategy</h2>

            {/* Key Insight */}
            <div className="bg-stone-900 text-white p-8 md:p-12 space-y-4">
                <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400">Key Insight</h3>
                <p className="text-xl md:text-2xl font-light leading-relaxed italic">
                    {insight}
                </p>
            </div>

            {/* Strategy */}
            <div className="space-y-4">
                <h3 className="text-base font-medium text-stone-900 uppercase tracking-wide">Strategic Approach</h3>
                <div className="h-px w-12 bg-stone-200"></div>
                <p className="text-stone-600 font-light leading-relaxed">
                    {strategy}
                </p>
            </div>
        </div>
    );
};

export default InsightStrategy;
