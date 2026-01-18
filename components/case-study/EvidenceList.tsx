
import React from 'react';
import { EvidenceListProps } from './types';

const EvidenceList: React.FC<EvidenceListProps> = ({ title = "Evidence", evidence }) => {
    if (!evidence || evidence.length === 0) return null;

    return (
        <div className="space-y-8">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">{title}</h2>
            <div className="space-y-8">
                {evidence.map((item, i) => (
                    <div key={i} className="border-l-2 border-stone-900 pl-6 space-y-2">
                        <h4 className="text-base font-medium text-stone-900">{item.title}</h4>
                        <p className="text-sm text-stone-600 font-light leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EvidenceList;
