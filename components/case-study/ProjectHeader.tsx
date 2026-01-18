
import React from 'react';
import { ProjectHeaderProps } from './types';

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ title, quickPitch, metadata }) => {
    return (
        <section className="px-6 md:px-12 py-24 md:py-32 max-w-[1440px] mx-auto border-b border-stone-200">
            <div className="space-y-12">
                {/* Title */}
                <h1 className="text-5xl md:text-8xl font-light tracking-tighter text-stone-900 leading-[0.95]">
                    {title}
                </h1>

                {/* Quick Pitch */}
                <p className="text-xl md:text-2xl font-light leading-relaxed text-stone-600 max-w-4xl">
                    {quickPitch}
                </p>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-stone-200">
                    <div>
                        <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 mb-2">Role</h4>
                        <p className="text-sm text-stone-900 font-medium">{metadata.role}</p>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 mb-2">Timeline</h4>
                        <p className="text-sm text-stone-900 font-medium">{metadata.timeline}</p>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 mb-2">Tools</h4>
                        <p className="text-sm text-stone-900 font-medium">{metadata.tools.join(', ')}</p>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400 mb-2">Industry</h4>
                        <p className="text-sm text-stone-900 font-medium">{metadata.industry}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectHeader;
