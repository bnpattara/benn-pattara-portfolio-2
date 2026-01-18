
import React, { useState } from 'react';
import { AnnotatedMockupProps } from './types';

const AnnotatedMockup: React.FC<AnnotatedMockupProps> = ({ mockups, columns = 1 }) => {
    const [activeAnnotation, setActiveAnnotation] = useState<{ mockupIndex: number; annotationIndex: number } | null>(null);

    if (!mockups || mockups.length === 0) return null;

    const gridClass = columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1';

    return (
        <div className="space-y-12">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">Mockups & Reasoning</h2>

            <div className={`grid ${gridClass} gap-12`}>
                {mockups.map((mockup, mockupIdx) => (
                    <div key={mockupIdx} className="space-y-6">
                        {/* Image Container with Annotations */}
                        <div className="relative bg-stone-200 border border-stone-200">
                            {mockup.src ? (
                                <img
                                    src={mockup.src}
                                    alt={mockup.caption}
                                    className="w-full h-auto"
                                />
                            ) : (
                                <div className="aspect-video flex items-center justify-center text-stone-400">
                                    <div className="text-center px-8">
                                        <div className="text-6xl font-light mb-2">□</div>
                                        <p className="text-xs uppercase tracking-widest">Mockup Placeholder</p>
                                    </div>
                                </div>
                            )}

                            {/* Interactive Callout Pins */}
                            {mockup.annotations && mockup.annotations.map((annotation, annIdx) => (
                                <div
                                    key={annIdx}
                                    className="absolute cursor-pointer"
                                    style={{
                                        left: `${annotation.x}%`,
                                        top: `${annotation.y}%`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                    onMouseEnter={() => setActiveAnnotation({ mockupIndex: mockupIdx, annotationIndex: annIdx })}
                                    onMouseLeave={() => setActiveAnnotation(null)}
                                >
                                    {/* Pin */}
                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${activeAnnotation?.mockupIndex === mockupIdx && activeAnnotation?.annotationIndex === annIdx
                                            ? 'bg-stone-900 border-stone-900 scale-110'
                                            : 'bg-white border-stone-900'
                                        }`}>
                                        <span className={`text-xs font-bold ${activeAnnotation?.mockupIndex === mockupIdx && activeAnnotation?.annotationIndex === annIdx
                                                ? 'text-white'
                                                : 'text-stone-900'
                                            }`}>
                                            {annIdx + 1}
                                        </span>
                                    </div>

                                    {/* Callout Tooltip */}
                                    {activeAnnotation?.mockupIndex === mockupIdx && activeAnnotation?.annotationIndex === annIdx && (
                                        <div className="absolute z-10 mt-2 w-64 bg-stone-900 text-white p-4 space-y-2 shadow-lg"
                                            style={{
                                                left: annotation.x > 70 ? 'auto' : '0',
                                                right: annotation.x > 70 ? '0' : 'auto'
                                            }}>
                                            <h4 className="text-[10px] font-bold tracking-widest uppercase text-stone-400">
                                                {annotation.label}
                                            </h4>
                                            <p className="text-xs font-light leading-relaxed">
                                                {annotation.reasoning}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Caption */}
                        <p className="text-[11px] text-stone-500 font-medium tracking-wide leading-relaxed">
                            {mockup.caption}
                        </p>

                        {/* Annotation Legend */}
                        {mockup.annotations && mockup.annotations.length > 0 && (
                            <div className="border-t border-stone-200 pt-6 space-y-3">
                                {mockup.annotations.map((annotation, annIdx) => (
                                    <div
                                        key={annIdx}
                                        className={`flex gap-4 p-3 transition-all cursor-pointer ${activeAnnotation?.mockupIndex === mockupIdx && activeAnnotation?.annotationIndex === annIdx
                                                ? 'bg-stone-50'
                                                : ''
                                            }`}
                                        onMouseEnter={() => setActiveAnnotation({ mockupIndex: mockupIdx, annotationIndex: annIdx })}
                                        onMouseLeave={() => setActiveAnnotation(null)}
                                    >
                                        <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase mt-1">
                                            {String(annIdx + 1).padStart(2, '0')}
                                        </span>
                                        <div className="flex-1">
                                            <h5 className="text-xs font-medium text-stone-900 mb-1">{annotation.label}</h5>
                                            <p className="text-xs text-stone-600 font-light leading-relaxed">
                                                {annotation.reasoning}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnnotatedMockup;
