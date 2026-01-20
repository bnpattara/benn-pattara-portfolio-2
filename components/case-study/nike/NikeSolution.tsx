
import React from 'react';

interface ExecutionItem {
    title: string;
    description: string;
}

interface NikeSolutionProps {
    concept: string;
    conceptName: string;
    prototypeUrl?: string;
    execution: ExecutionItem[];
}

const NikeSolution: React.FC<NikeSolutionProps> = ({ concept, conceptName, prototypeUrl, execution }) => {
    return (
        <section className="space-y-8">
            {/* Section Header */}
            <div className="border-b border-stone-900 pb-4">
                <span className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">Section 04</span>
                <h2 className="text-2xl md:text-3xl font-light text-stone-900 mt-2">The Solution <span className="text-stone-400">(The Creative Reveal)</span></h2>
            </div>

            {/* The Concept */}
            <div className="space-y-4">
                <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">The Concept</h3>
                <div className="p-8 border-l-4 border-stone-900 bg-stone-50">
                    <h4 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">{conceptName}</h4>
                    <p className="text-lg text-stone-600 font-light leading-relaxed">{concept}</p>
                </div>
            </div>

            {/* The Execution */}
            <div className="space-y-4">
                <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">The Execution</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {execution.map((item, i) => (
                        <div key={i} className="p-8 border border-stone-200 hover:border-stone-900 transition-colors group">
                            <div className="flex items-start gap-4">
                                <span className="text-4xl font-bold text-stone-200 group-hover:text-stone-400 transition-colors">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <div className="space-y-3">
                                    <h4 className="text-lg font-medium text-stone-900">{item.title}</h4>
                                    <p className="text-sm text-stone-500 font-light leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interactive Prototype (optional) */}
            {prototypeUrl && (
                <div className="space-y-8 pt-8 border-t border-stone-100">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            {/* Device Frame */}
                            <div className="relative w-[320px] mx-auto md:mx-0 rounded-[2.5rem] overflow-hidden">
                                {/* Mockup Image */}
                                <img
                                    src="/iphone16-mockup.png"
                                    alt="iPhone 16 Mockup"
                                    className="relative z-20 w-full h-auto pointer-events-none"
                                />
                                {/* Iframe - Full Bleed */}
                                <iframe
                                    src={`${prototypeUrl}${prototypeUrl.includes('?') ? '&' : '?'}hide-ui=1&footer=false&device-frame=0&hotspot-hints=0&scaling=scale-down-width&bg-color=FFFFFF`}
                                    className="absolute inset-0 w-full h-full z-10 border-0"
                                    allowFullScreen
                                    title="Interactive Prototype"
                                />
                            </div>

                            {/* Context Text */}
                            <div className="flex-grow space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">Interactive Prototype</h3>
                                    <p className="text-2xl md:text-3xl font-light text-stone-900 leading-tight">
                                        Experience the <span className="italic">Nike SNKRS</span> flow first-hand.
                                    </p>
                                </div>
                                <p className="text-base text-stone-500 font-light leading-relaxed">
                                    This interactive prototype demonstrates the reimagined SNKRS experience—shifting from a transactional lottery to a styling-first platform.
                                </p>
                                <div className="flex items-center gap-3 text-stone-400">
                                    <div className="w-10 h-[1px] bg-stone-200"></div>
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Click to interact</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default NikeSolution;
