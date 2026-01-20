
import React from 'react';

interface PivotSectionProps {
    insight: string;
    strategy: string;
}

const PivotSection: React.FC<PivotSectionProps> = ({ insight, strategy }) => {
    return (
        <section className="space-y-8">
            {/* Section Header */}
            <div className="border-b border-stone-900 pb-4">
                <span className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">Section 03</span>
                <h2 className="text-2xl md:text-3xl font-light text-stone-900 mt-2">The Pivot <span className="text-stone-400">(The Insight & Strategy)</span></h2>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* The Insight */}
                <div className="space-y-4">
                    <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">The Insight</h3>
                    <p className="text-xl md:text-2xl font-light text-stone-900 leading-relaxed italic">
                        "{insight}"
                    </p>
                </div>

                {/* The Strategy */}
                <div className="space-y-4">
                    <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">The Strategy</h3>
                    <div className="p-8 bg-stone-900 text-white">
                        <p className="text-lg font-light leading-relaxed">{strategy}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PivotSection;
