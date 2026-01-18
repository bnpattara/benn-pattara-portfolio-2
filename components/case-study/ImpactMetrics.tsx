
import React from 'react';
import { ImpactMetricsProps } from './types';

const ImpactMetrics: React.FC<ImpactMetricsProps> = ({ quantitative, qualitative }) => {
    if ((!quantitative || quantitative.length === 0) && (!qualitative || qualitative.length === 0)) {
        return null;
    }

    return (
        <div className="space-y-12">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">KPIs & Success</h2>

            {/* Quantitative Metrics */}
            {quantitative && quantitative.length > 0 && (
                <div className="space-y-8">
                    <h3 className="text-base font-medium text-stone-900 uppercase tracking-wide">Quantitative Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {quantitative.map((item, i) => (
                            <div key={i} className="space-y-3">
                                <div className="text-4xl font-light tracking-tighter text-stone-900">
                                    {item.value}
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-stone-900 uppercase tracking-wide">
                                        {item.metric}
                                    </h4>
                                    <p className="text-xs text-stone-600 font-light leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Qualitative Feedback */}
            {qualitative && qualitative.length > 0 && (
                <div className="space-y-8">
                    <h3 className="text-base font-medium text-stone-900 uppercase tracking-wide">Qualitative Feedback</h3>
                    <div className="space-y-6">
                        {qualitative.map((item, i) => (
                            <div key={i} className="border-l-2 border-stone-900 pl-6 space-y-2">
                                <blockquote className="text-lg font-light italic text-stone-800">
                                    "{item.quote}"
                                </blockquote>
                                <p className="text-[10px] font-bold tracking-widest uppercase text-stone-400">
                                    — {item.source}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImpactMetrics;
