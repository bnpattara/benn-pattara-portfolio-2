
import React from 'react';
import { StrategySectionProps } from './types';

const StrategySection: React.FC<StrategySectionProps> = ({ strategy }) => {
    if (!strategy) return null;

    return (
        <div className="space-y-8">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">The Strategy</h2>
            <div className="h-px w-12 bg-stone-200 mb-8"></div>
            <p className="text-stone-600 font-light leading-relaxed italic">
                {strategy}
            </p>
        </div>
    );
};

export default StrategySection;
