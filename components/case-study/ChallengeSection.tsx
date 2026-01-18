
import React from 'react';
import { ChallengeSectionProps } from './types';

const ChallengeSection: React.FC<ChallengeSectionProps> = ({ challenge }) => {
    if (!challenge) return null;

    return (
        <div className="space-y-8">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">The Challenge</h2>
            <p className="text-stone-600 font-light leading-relaxed">
                {challenge}
            </p>
        </div>
    );
};

export default ChallengeSection;
