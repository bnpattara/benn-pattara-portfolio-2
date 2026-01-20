
import React from 'react';
import { Link } from 'react-router-dom';

interface Tool {
    id: string;
    title: string;
    description: string;
    category: string;
    status: 'live' | 'coming-soon';
    link?: string;
}

const TOOLS: Tool[] = [
    {
        id: 'talk-to-audience',
        title: 'Talk to Audience',
        description: 'AI-powered segment persona simulator. Have real conversations with your target audience segments to validate insights and test messaging.',
        category: 'Research',
        status: 'coming-soon'
    },
    {
        id: 'retail-math-calculator',
        title: 'Retail Math Calculator',
        description: 'Quick calculations for AUR, ST%, WOS, IMU, and Gross Margin. Essential retail metrics at your fingertips.',
        category: 'Analytics',
        status: 'coming-soon'
    },
    {
        id: 'journey-mapper',
        title: 'Journey Mapper',
        description: 'Interactive user journey mapping tool with emotional state tracking and pain point identification.',
        category: 'UX Design',
        status: 'coming-soon'
    },
    {
        id: 'brand-voice-generator',
        title: 'Brand Voice Generator',
        description: 'Generate on-brand copy and messaging by defining your brand personality, tone, and values.',
        category: 'Strategy',
        status: 'coming-soon'
    }
];

const Tools: React.FC = () => {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="px-6 md:px-12 py-16 max-w-[1440px] mx-auto">
                <div className="space-y-6">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">Interactive Tools</span>
                    <h1 className="text-4xl md:text-6xl font-light text-stone-900 leading-tight">
                        Tools I Built
                    </h1>
                    <p className="text-xl font-light text-stone-500 max-w-2xl">
                        Interactive apps I've created to do my job better. Each tool solves a specific problem I encountered in my work as a product manager and UX designer.
                    </p>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="px-6 md:px-12 py-12 max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TOOLS.map((tool) => (
                        <div
                            key={tool.id}
                            className="group p-8 border border-stone-200 hover:border-stone-900 transition-all duration-300"
                        >
                            <div className="space-y-4">
                                {/* Category & Status */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">
                                        {tool.category}
                                    </span>
                                    {tool.status === 'coming-soon' ? (
                                        <span className="text-[9px] font-bold tracking-widest text-stone-400 uppercase px-3 py-1 border border-stone-200">
                                            Coming Soon
                                        </span>
                                    ) : (
                                        <span className="text-[9px] font-bold tracking-widest text-green-600 uppercase px-3 py-1 border border-green-200 bg-green-50">
                                            Live
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-medium text-stone-900 group-hover:translate-x-1 transition-transform">
                                    {tool.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-stone-500 font-light leading-relaxed">
                                    {tool.description}
                                </p>

                                {/* CTA */}
                                <div className="pt-4">
                                    {tool.status === 'live' && tool.link ? (
                                        <a
                                            href={tool.link}
                                            className="inline-flex items-center text-[10px] font-bold tracking-widest text-stone-900 uppercase group-hover:translate-x-1 transition-transform"
                                        >
                                            Launch Tool
                                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    ) : (
                                        <span className="text-[10px] font-medium tracking-widest text-stone-300 uppercase">
                                            In Development
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Request Section */}
            <section className="px-6 md:px-12 py-24 max-w-[1440px] mx-auto">
                <div className="p-12 bg-stone-900 text-white text-center space-y-6">
                    <h2 className="text-2xl md:text-3xl font-light">Have a tool idea?</h2>
                    <p className="text-stone-400 font-light max-w-lg mx-auto">
                        I'm always building new tools to solve problems. If you have a tool idea or want to collaborate, let's talk.
                    </p>
                    <a
                        href="mailto:bennpattara@gmail.com?subject=Tool Idea"
                        className="inline-block px-8 py-3 border border-white text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-stone-900 transition-colors"
                    >
                        Share Your Idea
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Tools;
