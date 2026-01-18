
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

export interface CaseStudyHeroProps {
    title: string;
    category: string;
    role: string;
    year: string;
    ask: string;
}

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
