
import React from 'react';

export interface Methodology {
    title: string;
    description: string;
}

export interface Evidence {
    title: string;
    description: string;
}

export interface Segment {
    name: string;
    share: string;
    mindset: string;
    opportunity: string;
}

export interface Media {
    type: 'image' | 'video';
    src?: string;
    caption: string;
    alt?: string;
}

export interface MethodologySectionProps {
    title?: string;
    methods: Methodology[];
}

export interface EvidenceListProps {
    title?: string;
    evidence: Evidence[];
}

export interface SegmentationTableProps {
    title?: string;
    segments: Segment[];
}

export interface MediaGalleryProps {
    title?: string;
    media: Media[];
    columns?: number;
}
