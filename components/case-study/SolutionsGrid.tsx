
import React from 'react';
import { SolutionsGridProps } from './types';

const SolutionsGrid: React.FC<SolutionsGridProps> = ({ solutions, title = "The Solution", columns = 2 }) => {
    if (!solutions || solutions.length === 0) return null;

    const gridClass = columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1';

    return (
        <div className="space-y-12">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">{title}</h2>
            <div className={`grid ${gridClass} gap-12`}>
                {solutions.map((sol, i) => (
                    <div key={i} className="p-10 bg-white border border-stone-200 space-y-6">
                        <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                            0{i + 1}
                        </span>
                        <h3 className="text-xl font-light uppercase tracking-tight">{sol.title}</h3>
                        <p className="text-sm text-stone-500 font-light leading-relaxed">
                            {sol.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SolutionsGrid;
