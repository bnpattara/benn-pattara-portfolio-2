
import React from 'react';

interface ExecutionItem {
    title: string;
    description: string;
}

interface SolutionSectionProps {
    conceptName: string;
    concept: string;
    execution: ExecutionItem[];
    // Hover effect toggle
    showExecutionHover?: boolean;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({ conceptName, concept, execution, showExecutionHover = true }) => {
    return (
        <section className="space-y-12">
            {/* Section Header */}
            <div className="border-b border-stone-900 pb-4">
                <span className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">Section 04</span>
                <h2 className="text-2xl md:text-3xl font-light text-stone-900 mt-2">The Solution <span className="text-stone-400">(The Creative Reveal)</span></h2>
            </div>

            {/* The Concept */}
            <div className="space-y-6">
                <h3 className="text-[11px] font-bold tracking-[0.3em] text-stone-900 uppercase">The Concept</h3>
                <div className="p-8 border-l-4 border-stone-900 bg-stone-50">
                    <h4 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">{conceptName}</h4>
                    <p className="text-lg text-stone-600 font-light leading-relaxed">{concept}</p>
                </div>
            </div>

            {/* The Execution */}
            <div className="space-y-8">
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
        </section>
    );
};

export default SolutionSection;
