
import React from 'react';

interface NikeContextProps {
    background: string;
    ask: string;
    problem: string;
}

const NikeContext: React.FC<NikeContextProps> = ({ background, ask, problem }) => {
    return (
        <section className="space-y-12">
            {/* Section Header */}
            <div className="border-b border-stone-900 pb-4">
                <span className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">Section 01</span>
                <h2 className="text-2xl md:text-3xl font-light text-stone-900 mt-2">The Context <span className="text-stone-400">(The Set-Up)</span></h2>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Background */}
                <div className="md:col-span-12 space-y-4">
                    <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">Background</h3>
                    <p className="text-lg md:text-xl font-light text-stone-700 leading-relaxed">{background}</p>
                </div>

                {/* The Ask */}
                <div className="md:col-span-6 space-y-4">
                    <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">The Ask</h3>
                    <p className="text-base text-stone-600 font-light leading-relaxed italic border-l-2 border-stone-900 pl-6">{ask}</p>
                </div>

                {/* The Problem */}
                <div className="md:col-span-6 space-y-4">
                    <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">The Problem</h3>
                    <p className="text-base text-stone-600 font-light leading-relaxed">{problem}</p>
                </div>
            </div>
        </section>
    );
};

export default NikeContext;
