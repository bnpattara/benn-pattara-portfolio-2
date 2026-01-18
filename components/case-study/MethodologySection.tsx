
import React from 'react';
import { MethodologySectionProps } from './types';

const MethodologySection: React.FC<MethodologySectionProps> = ({ title = "Methodology", methods }) => {
    if (!methods || methods.length === 0) return null;

    return (
        <div className="space-y-8">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {methods.map((method, i) => (
                    <div key={i} className="space-y-4">
                        <h3 className="text-lg font-light uppercase tracking-tight text-stone-900">
                            {method.title}
                        </h3>
                        <p className="text-sm text-stone-600 font-light leading-relaxed">
                            {method.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MethodologySection;
