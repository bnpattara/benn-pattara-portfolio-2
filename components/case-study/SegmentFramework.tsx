
import React from 'react';
import { SegmentFrameworkProps } from './types';

const SegmentFramework: React.FC<SegmentFrameworkProps> = ({ segments, title = "Three-Segment Framework" }) => {
    if (!segments || segments.length === 0) return null;

    return (
        <div className="space-y-12">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">{title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {segments.map((segment, i) => (
                    <div key={i} className="flex flex-col h-full p-8 border border-stone-200 bg-white hover:border-stone-900 transition-colors group">
                        <div className="flex-grow space-y-6">
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">{segment.share} Share</span>
                                <h3 className="text-xl font-light text-stone-900 uppercase tracking-tight">{segment.name}</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest">Mindset</h4>
                                    <p className="text-sm text-stone-600 font-light leading-relaxed">{segment.mindset}</p>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest">Opportunity</h4>
                                    <p className="text-sm text-stone-600 font-light leading-relaxed">{segment.opportunity}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-stone-100">
                            <a
                                href="https://internal-app-placeholder.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-[10px] font-bold tracking-widest text-stone-900 uppercase group-hover:translate-x-1 transition-transform"
                            >
                                Talk to Audience
                                <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SegmentFramework;
