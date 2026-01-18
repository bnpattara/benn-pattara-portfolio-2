
import React from 'react';
import { InsightsTableProps } from './types';

const InsightsTable: React.FC<InsightsTableProps> = ({ insights, title = "Market Intel & Insights" }) => {
    if (!insights || insights.length === 0) return null;

    return (
        <div className="space-y-12">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">{title}</h2>
            <div className="border-t border-stone-200">
                {insights.map((row, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-4 py-8 border-b border-stone-200 items-center gap-4">
                        <span className="text-4xl font-light tracking-tighter text-stone-900">{row.metric}</span>
                        <span className="md:col-span-3 text-sm text-stone-500 font-light leading-relaxed uppercase tracking-wider">
                            <strong className="text-stone-900 block mb-1">{row.label}</strong>
                            {row.detail}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InsightsTable;
