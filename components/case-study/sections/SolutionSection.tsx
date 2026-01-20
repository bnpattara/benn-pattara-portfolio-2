
import React from 'react';

interface ExecutionItem {
    title: string;
    description: string;
}

interface SolutionSectionProps {
    conceptName: string;
    concept: string;
    prototypeUrl?: string;
    execution: ExecutionItem[];
    // Hover effect toggle
    showExecutionHover?: boolean;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({ conceptName, concept, prototypeUrl, execution, showExecutionHover = true }) => {
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
                        <div key={i} className={`p-8 border border-stone-200 ${showExecutionHover ? 'hover:border-stone-900 transition-colors' : ''} group`}>
                            <div className="flex items-start gap-4">
                                <span className={`text-4xl font-bold text-stone-200 ${showExecutionHover ? 'group-hover:text-stone-400 transition-colors' : ''}`}>
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
                            <div className="relative w-[300px] h-[600px] bg-stone-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-stone-800 flex-shrink-0">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-stone-800 rounded-b-2xl z-20"></div>
                                {/* Screen Container */}
                                <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden relative z-10">
                                    <iframe
                                        src={`${prototypeUrl}${prototypeUrl.includes('?') ? '&' : '?'}hide-ui=1&footer=false&device-frame=0&hotspot-hints=0`}
                                        className="w-full h-full border-0"
                                        allowFullScreen
                                        title="Interactive Prototype"
                                    />
                                </div>
                                {/* Side Buttons */}
                                <div className="absolute -left-2 top-24 w-1 h-12 bg-stone-800 rounded-l-md"></div>
                                <div className="absolute -left-2 top-40 w-1 h-12 bg-stone-800 rounded-l-md"></div>
                                <div className="absolute -right-2 top-32 w-1 h-16 bg-stone-800 rounded-r-md"></div>
                            </div>

                            {/* Context Text */}
                            <div className="flex-grow space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">Interactive Prototype</h3>
                                    <p className="text-2xl md:text-3xl font-light text-stone-900 leading-tight">
                                        Experience the <span className="italic">Apex</span> flow first-hand.
                                    </p>
                                </div>
                                <p className="text-base text-stone-500 font-light leading-relaxed">
                                    This interactive prototype demonstrates the core user journey—from pod discovery to active run navigation. We focused on reducing friction and maximizing the sense of collective movement.
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

export default SolutionSection;
