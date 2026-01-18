// Existing types (keep)
export interface Insight {
    metric: string;
    label: string;
    detail: string;
}

export interface Solution {
    title: string;
    desc: string;
}

export interface Impact {
    title: string;
    desc: string;
}

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

// NEW: Professional case study types

export interface ProjectMetadata {
    role: string;
    timeline: string;
    tools: string[];
    industry: string;
}

export interface DesignDecision {
    title: string;
    decision: string;
    reasoning: string;
}

export interface Annotation {
    x: number; // Percentage from left
    y: number; // Percentage from top
    label: string;
    reasoning: string;
}

export interface AnnotatedMockupData {
    src?: string;
    caption: string;
    annotations?: Annotation[];
}

export interface QuantitativeMetric {
    metric: string;
    value: string;
    description: string;
}

export interface QualitativeFeedback {
    source: string;
    quote: string;
}

// Component Props

export interface ProjectHeaderProps {
    title: string;
    quickPitch: string;
    metadata: ProjectMetadata;
}

export interface ProblemStatementProps {
    challenge: string;
    hmw?: string; // How Might We
    goal: string;
}

export interface InsightStrategyProps {
    insight: string;
    strategy: string;
}

export interface ProcessWorkflowProps {
    workflow: string | string[]; // Can be single string or steps array
}

export interface IterationShowcaseProps {
    decisions: DesignDecision[];
}

export interface AnnotatedMockupProps {
    mockups: AnnotatedMockupData[];
    columns?: number;
}

export interface ImpactMetricsProps {
    quantitative?: QuantitativeMetric[];
    qualitative?: QualitativeFeedback[];
}

export interface ReflectionProps {
    reflection: string;
}

// Legacy component props (keep for backward compatibility)
export interface ChallengeSectionProps {
    challenge: string;
}

export interface StrategySectionProps {
    strategy: string;
}

export interface InsightsTableProps {
    insights: Insight[];
    title?: string;
}

export interface SolutionsGridProps {
    solutions: Solution[];
    title?: string;
    columns?: number;
}

export interface ImpactSectionProps {
    quote: string;
    impact: Impact[];
    title?: string;
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

export interface CaseStudyHeroProps {
    title: string;
    category: string;
    role: string;
    year: string;
    ask: string;
}
