
import React from 'react';
import { ProblemStatementProps } from './types';

const ProblemStatement: React.FC<ProblemStatementProps> = ({ challenge, hmw, goal }) => {
    return (
        <div className="space-y-12">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">Background & Problem</h2>

            {/* Challenge */}
            <div className="space-y-4">
                <h3 className="text-base font-medium text-stone-900 uppercase tracking-wide">The Challenge</h3>
                <p className="text-stone-600 font-light leading-relaxed">
                    {challenge}
                </p>
            </div>

            {/* How Might We */}
            {hmw && (
                <div className="border-l-2 border-stone-900 pl-6 space-y-2">
                    <h3 className="text-base font-medium text-stone-900 uppercase tracking-wide">How Might We</h3>
                    <p className="text-lg font-light italic text-stone-800">
                        {hmw}
                    </p>
                </div>
            )}

            {/* Goal */}
            <div className="space-y-4">
                <h3 className="text-base font-medium text-stone-900 uppercase tracking-wide">The Goal</h3>
                <p className="text-stone-600 font-light leading-relaxed">
                    {goal}
                </p>
            </div>
        </div>
    );
};

export default ProblemStatement;
