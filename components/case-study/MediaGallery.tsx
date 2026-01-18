
import React from 'react';
import { MediaGalleryProps } from './types';

const MediaGallery: React.FC<MediaGalleryProps> = ({ title, media, columns = 2 }) => {
    if (!media || media.length === 0) return null;

    const gridClass = columns === 3
        ? 'grid-cols-1 md:grid-cols-3'
        : columns === 1
            ? 'grid-cols-1'
            : 'grid-cols-1 md:grid-cols-2';

    return (
        <div className="space-y-8">
            {title && (
                <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">{title}</h2>
            )}
            <div className={`grid ${gridClass} gap-8`}>
                {media.map((item, i) => (
                    <div key={i} className="space-y-4">
                        <div className="aspect-video bg-stone-200 border border-stone-200 overflow-hidden flex items-center justify-center">
                            {item.src ? (
                                item.type === 'image' ? (
                                    <img
                                        src={item.src}
                                        alt={item.alt || item.caption}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="relative w-full h-full bg-stone-200 flex items-center justify-center">
                                        <div className="text-stone-400 text-center">
                                            <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-xs uppercase tracking-widest">Video</p>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="text-stone-400 text-center px-8">
                                    <div className="text-6xl font-light mb-2">□</div>
                                    <p className="text-xs uppercase tracking-widest">Placeholder</p>
                                </div>
                            )}
                        </div>
                        <p className="text-[11px] text-stone-500 font-medium tracking-wide leading-relaxed">
                            {item.caption}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaGallery;
