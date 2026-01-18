
import React from 'react';
import { ReflectionProps } from './types';

const Reflection: React.FC<ReflectionProps> = ({ reflection }) => {
    if (!reflection) return null;

    return (
        <div className="bg-stone-50 p-8 md:p-12 space-y-6">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">Reflection & Learnings</h2>
            <p className="text-base text-stone-600 font-light leading-relaxed italic">
                {reflection}
            </p>
        </div>
    );
};

export default Reflection;
