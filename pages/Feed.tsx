
import React, { useEffect, useRef, useState } from 'react';

interface FeedPost {
    id: string;
    content: string;
    date: string;
    category: 'thought' | 'inspiration' | 'question' | 'observation';
    tags?: string[];
}

const FEED_POSTS: FeedPost[] = [
    {
        id: '1',
        content: "The best products don't just solve problems—they make people feel capable. Confidence is the ultimate feature.",
        date: 'Jan 19, 2026',
        category: 'thought',
        tags: ['product design', 'psychology']
    },
    {
        id: '2',
        content: "Algorithms optimize for engagement. Humans optimize for meaning. The best experiences find the overlap.",
        date: 'Jan 18, 2026',
        category: 'observation',
        tags: ['AI', 'UX']
    },
    {
        id: '3',
        content: "What if luxury wasn't about exclusivity but about access? Access to expertise, to craft, to confidence.",
        date: 'Jan 17, 2026',
        category: 'question',
        tags: ['luxury', 'strategy']
    },
    {
        id: '4',
        content: "The 'post-algorithm' consumer doesn't want more options. They want one perfect option, chosen by someone they trust.",
        date: 'Jan 16, 2026',
        category: 'thought',
        tags: ['consumer behavior', 'curation']
    },
    {
        id: '5',
        content: "Sustainability isn't a constraint—it's a creative canvas. The best solutions come from the hardest constraints.",
        date: 'Jan 15, 2026',
        category: 'inspiration',
        tags: ['sustainability', 'innovation']
    },
    {
        id: '6',
        content: "Every flagship store should answer: why would someone travel across the city to visit us when they could buy online?",
        date: 'Jan 14, 2026',
        category: 'question',
        tags: ['retail', 'experience']
    },
    {
        id: '7',
        content: "The iceberg principle: what you see is only 10%. The real value is the 90% beneath—heritage, craft, culture.",
        date: 'Jan 13, 2026',
        category: 'thought',
        tags: ['branding', 'depth']
    },
    {
        id: '8',
        content: "Creatives aren't rare. Access is. The opportunity isn't networking—it's building community that fuels courage.",
        date: 'Jan 12, 2026',
        category: 'observation',
        tags: ['community', 'mentorship']
    },
    {
        id: '9',
        content: "Fashion is paralyzed by choice. Clarity is the new luxury. One perfect item > infinite scroll.",
        date: 'Jan 11, 2026',
        category: 'thought',
        tags: ['fashion', 'decision fatigue']
    },
    {
        id: '10',
        content: "Running isn't about the miles. It's about belonging. Every product is really about the emotion underneath.",
        date: 'Jan 10, 2026',
        category: 'inspiration',
        tags: ['fitness', 'emotional design']
    },
    {
        id: '11',
        content: "The hype era is over. Exclusivity creates resentment. Confidence creates loyalty.",
        date: 'Jan 9, 2026',
        category: 'observation',
        tags: ['sneakers', 'culture shift']
    },
    {
        id: '12',
        content: "What if the product page taught you how to wear it, not just how to buy it?",
        date: 'Jan 8, 2026',
        category: 'question',
        tags: ['e-commerce', 'styling']
    }
];

const getCategoryColor = (category: string) => {
    switch (category) {
        case 'thought': return 'bg-stone-900 text-white';
        case 'inspiration': return 'bg-amber-100 text-amber-800';
        case 'question': return 'bg-blue-100 text-blue-800';
        case 'observation': return 'bg-green-100 text-green-800';
        default: return 'bg-stone-200 text-stone-600';
    }
};

const Feed: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseY = useRef(0);
    const targetMouseY = useRef(0);
    const scrollY = useRef(0);
    const animationFrame = useRef<number>();
    const [, forceUpdate] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -1 to 1 range, primarily track Y position
            targetMouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
        };

        const handleScroll = () => {
            scrollY.current = window.scrollY;
        };

        // Smooth animation loop with lerp (linear interpolation)
        const animate = () => {
            // Lerp factor - lower = smoother but slower (0.05 = very smooth)
            const lerp = 0.08;
            mouseY.current += (targetMouseY.current - mouseY.current) * lerp;

            // Only trigger re-render occasionally for performance
            forceUpdate(prev => prev + 1);
            animationFrame.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });
        animationFrame.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, []);

    // Smooth parallax style - primarily vertical movement
    const getCardStyle = (index: number) => {
        // Alternate parallax directions and speeds based on card position
        const speed = [15, 25, 20, 30, 18, 28, 22, 35, 16, 24, 32, 19][index % 12];
        const direction = index % 2 === 0 ? 1 : -1;

        // Scroll-based parallax (subtle)
        const scrollOffset = (scrollY.current * 0.02) * direction * (index % 3 + 1);

        // Mouse-based vertical movement (primary effect)
        const mouseOffset = mouseY.current * speed * direction;

        return {
            transform: `translate3d(0, ${mouseOffset + scrollOffset}px, 0)`,
            willChange: 'transform',
        };
    };

    return (
        <main className="min-h-screen" ref={containerRef}>
            {/* Hero Section */}
            <section className="px-6 md:px-12 py-16 max-w-[1440px] mx-auto">
                <div className="space-y-6">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-stone-400 uppercase">Personal Feed</span>
                    <h1 className="text-4xl md:text-6xl font-light text-stone-900 leading-tight">
                        Thoughts & Ideas
                    </h1>
                    <p className="text-xl font-light text-stone-500 max-w-2xl">
                        A stream of consciousness—ideas, observations, and questions about design, strategy, and the intersection of technology and human behavior.
                    </p>
                </div>
            </section>

            {/* Cascading Cards Grid */}
            <section className="px-6 md:px-12 py-12 max-w-[1440px] mx-auto">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {FEED_POSTS.map((post, index) => (
                        <div
                            key={post.id}
                            style={getCardStyle(index)}
                            className="break-inside-avoid p-6 bg-white border border-stone-200 hover:border-stone-900 hover:shadow-lg transition-all duration-300 group"
                        >
                            {/* Category Badge */}
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-1 ${getCategoryColor(post.category)}`}>
                                    {post.category}
                                </span>
                                <span className="text-[10px] text-stone-400">{post.date}</span>
                            </div>

                            {/* Content */}
                            <p className="text-lg md:text-xl font-light text-stone-900 leading-relaxed">
                                "{post.content}"
                            </p>

                            {/* Tags */}
                            {post.tags && (
                                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-stone-100">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[9px] font-medium tracking-wider text-stone-400 uppercase"
                                        >
                                            #{tag.replace(' ', '')}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer CTA */}
            <section className="px-6 md:px-12 py-24 max-w-[1440px] mx-auto text-center">
                <p className="text-stone-400 font-light">
                    Follow me on{' '}
                    <a href="https://twitter.com" className="text-stone-900 underline underline-offset-4 hover:text-stone-600 transition-colors">
                        Twitter/X
                    </a>
                    {' '}for more real-time thoughts.
                </p>
            </section>
        </main>
    );
};

export default Feed;
