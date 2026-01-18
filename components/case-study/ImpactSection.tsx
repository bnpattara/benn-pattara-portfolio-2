
import React from 'react';
import { ImpactSectionProps } from './types';

const ImpactSection: React.FC<ImpactSectionProps> = ({ quote, impact, title = "The Impact" }) => {
    return (
        <div className="bg-stone-900 text-white p-12 md:p-24 space-y-12 relative overflow-hidden">
            <div className="relative z-10 space-y-12">
                <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase text-stone-400">{title}</h2>
                <blockquote className="text-3xl md:text-5xl font-light tracking-tight italic leading-snug">
                    "{quote}"
                </blockquote>
                {impact && impact.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-stone-800">
                        {impact.map((imp, i) => (
                            <div key={i} className="space-y-4">
                                <h4 className="text-[10px] font-bold tracking-widest uppercase">{imp.title}</h4>
                                <p className="text-stone-400 font-light text-sm">{imp.desc}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImpactSection;
