
import React from 'react';
import { ProcessWorkflowProps } from './types';

const ProcessWorkflow: React.FC<ProcessWorkflowProps> = ({ workflow }) => {
    const isArray = Array.isArray(workflow);

    return (
        <div className="space-y-8">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">Implementation & Process</h2>

            {isArray ? (
                <ol className="space-y-4">
                    {workflow.map((step, i) => (
                        <li key={i} className="flex gap-4">
                            <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase mt-1">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <p className="text-sm text-stone-600 font-light leading-relaxed flex-1">
                                {step}
                            </p>
                        </li>
                    ))}
                </ol>
            ) : (
                <p className="text-stone-600 font-light leading-relaxed">
                    {workflow}
                </p>
            )}
        </div>
    );
};

export default ProcessWorkflow;
