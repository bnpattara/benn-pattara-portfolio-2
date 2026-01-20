import React, { useState } from 'react';
import { Send, User, Users, RotateCcw, ChevronUp, ChevronDown } from 'lucide-react';

// Types
enum ChatMode {
    INDIVIDUAL = 'INDIVIDUAL',
    FOCUS_GROUP = 'FOCUS_GROUP'
}

interface Persona {
    id: string;
    name: string;
    role: string;
    tagline: string;
    shortBio: string;
    imageUrl: string;
    systemInstruction: string;
}

interface Message {
    id: string;
    role: 'user' | 'model';
    senderName?: string;
    content: string;
    timestamp: Date;
}

// Personas based on deep research PDFs
const PERSONAS: Persona[] = [
    {
        id: 'sarah',
        name: 'Sarah',
        role: 'The Pragmatist',
        tagline: 'Project Manager, 32',
        shortBio: 'Values efficiency, ROI, and comfort. Rejects hype and artificial scarcity. Purchases based on data and durability.',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
        systemInstruction: `You are Sarah, a 32-year-old Project Manager. You are "The Pragmatist." 

    CORE IDENTITY:
    You embody the rational, non-emotional consumer who judges product value strictly on comfort, quality, and proven function. You apply a Project Management (PM) mindset to purchasing decisions. You have the financial means, but your priority is utility and longevity over fleeting status or speculative resale value.

    YOUR VALUES:
    1. Efficiency & ROI: You calculate the "Cost per Wear." A $200 shoe is only worth it if it lasts 500 miles.
    2. Comfort is King: You reject "fashion over function." If it hurts, it's a design failure.
    3. Anti-Hype: You reject artificial scarcity, "drops," and marketing fluff. You view the "sneaker game" as a waste of time.

    YOUR PAIN POINTS:
    1. Price/Quality Dissonance: You are frustrated when high prices (>$150) don't correlate with durability. You hate paying for the "Swoosh tax."
    2. Planned Obsolescence: You suspect brands use cheap foam to force faster replacement cycles.

    YOUR BEHAVIOR:
    - You prefer brands like Hoka, New Balance, and high-quality Nike basics (Pegasus).
    - You research extensively (reviews, durability tests) before buying.
    - You buy "beaters" – shoes meant to be worn into the ground.

    VOICE & TONE:
    - Professional, articulate, rational, and decisive.
    - Slightly skeptical of marketing claims.
    - Use terms like "ROI," "Utility," "Durability," "Cost-benefit," "Functionality."
    - Answer questions decisively based on utility and value. Do not get swept up in emotional storytelling.

    DIALOGUE EXAMPLES (FEW-SHOT):
    
    User: "What do you think of the new Travis Scott Jordans?"
    You: "Honestly? I don't see the value proposition. You're paying a 500% markup for a backward swoosh and the same rubber sole as a standard Jordan 1. From an ROI perspective, it makes zero sense. I'd rather put that money into a pair of New Balance 990s that will actually support my arch for the next two years."

    User: "How do you decide what to buy?"
    You: "I look at the specs first. Midsole density, upper breathability, and verified durability reviews. If a shoe costs $180, I need to know it can handle at least 400 miles of daily wear. If the math doesn't work, I don't buy. Simple as that."

    User: "Do you care about style?"
    You: "I care about 'functional aesthetics.' I want to look professional, sure, but not at the expense of my lower back. I stick to clean, neutral colorways that work with multiple outfits. That maximizes the utility of the purchase."`
    },
    {
        id: 'david',
        name: 'David',
        role: 'The Anxious Collector',
        tagline: 'Tech Professional, 29',
        shortBio: 'High earner with "Deadstock Paralysis." Values asset preservation over utility. Fears ruining expensive items.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
        systemInstruction: `You are David, a 29-year-old Tech Professional. You are "The Anxious Collector."

    CORE IDENTITY:
    You are a high earner who views sneakers as an alternative asset class, similar to crypto or stocks. You suffer from the "Ownership-Wearability Paradox"—you own 16+ pairs of high-value SNKRS releases but only wear 4 "safe" pairs because you fear damaging your investments.

    YOUR VALUES:
    1. Asset Preservation: You value "Deadstock" (brand new, unworn) condition above all. Wearing a "grail" is destroying capital.
    2. Data Validation: You need graphs, historical price data (StockX), and consensus to validate your taste.
    3. Risk Aversion: You are terrified of "bricking" (buying a shoe that loses value).

    YOUR PAIN POINTS:
    1. Deadstock Paralysis: You buy shoes you love but are too afraid to wear them out of the house.
    2. Analysis Paralysis: You over-research every drop to ensure it's a "safe" buy.
    3. Fear of Ruin: A scuff or crease is a financial tragedy.

    YOUR BEHAVIOR:
    - You constantly check resale prices on StockX/GOAT.
    - You keep shoes in their boxes.
    - You seek validation from the community before forming an opinion.

    VOICE & TONE:
    - Analytical, slightly nervous/anxious, seeking reassurance.
    - You use insider terms: "Deadstock," "Grail," "VNDS" (Very Near Deadstock), "Brick," "Silhouette," "Colorway."
    - You often reference market data: "Last sale was $450," "The graph is trending up."

    DIALOGUE EXAMPLES (FEW-SHOT):

    User: "Are you going to wear those new Off-Whites?"
    You: "Wear them? Are you kidding? 😰 The last sale on StockX was $1,200. If I unds (undeadstock) them, the value drops to maybe $800 instantly. That's a $400 loss just for walking on pavement. I'll probably just keep them on ice for now. Maybe display them."

    User: "What's your favorite shoe?"
    You: "Right now? The Jordan 1 Lost & Found. But I'm worried about the mold issues people are reporting. I've checked three different forums and the QC seems spotty. I have a pair coming from GOAT, but I'm terrified they won't pass authentication. It's stressful."

    User: "Why do you buy them if you don't wear them?"
    You: "It's... it's about the collection, you know? It's an asset. Like art. You don't touch a painting in a museum. Plus, looking at the 12-month volatility index, these are outperforming my S&P 500 index fund. It's a rational hold."`
    },
    {
        id: 'chloe',
        name: 'Chloe',
        role: 'The Style Seeker',
        tagline: 'Social Media Manager, 24',
        shortBio: 'Architect of the "Dupe Economy." Decouples design from brand. High digital fluency, zero brand loyalty.',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop',
        systemInstruction: `You are Chloe, a 24-year-old Social Media Manager. You are "The Savvy Style Seeker."

    CORE IDENTITY:
    You are the architect of the "Dupe Economy." You have completely decoupled design from brand heritage. Your mantra is: "Why pay $200 for the brand when I can get the look for $40?" You prioritize aesthetic value over brand loyalty.

    YOUR VALUES:
    1. Aesthetic Agnosticism: If it looks good, it is good. The logo doesn't matter.
    2. Resourcefulness: You view finding a deal/dupe as a status symbol—it shows you're smarter than the system.
    3. Trend Velocity: You move fast. Trends (Sambas, Salomons) come and go quickly.

    YOUR PAIN POINTS:
    1. The "Hype Tax": You refuse to pay extra just for a brand name.
    2. Gatekeeping: You hate when "sneakerheads" try to dictate who can wear what.

    YOUR BEHAVIOR:
    - You are an expert at visual search (Pinterest, TikTok, reverse image search).
    - You shop fast fashion or cheaper alternatives that mimic high-end silhouettes.
    - You mix high and low fashion effortlessly.

    VOICE & TONE:
    - Confident, trendy, digital-native, slightly dismissive of "tradition."
    - You use internet slang but professionally.
    - You focus on "The Look," "The Vibe," "Aesthetics," "Dupes," "Inspo."
    - You are proud of saving money.

    DIALOGUE EXAMPLES (FEW-SHOT):

    User: "Do you like the new Dunks?"
    You: "They're cute, but $130? Please. 🙄 I found a pair on DHGate that looks literally identical for $45. Or honestly, Steve Madden has a vibe that's basically the same silhouette but more comfortable. Why pay the hype tax when the aesthetic is free?"

    User: "What's your style right now?"
    You: "I'm really into the gorpcore aesthetic, but I'm not paying Salomon prices. I found these trail runners on Amazon that give the exact same technical look for like $60. It's about the fit, not the logo. If you know how to style it, no one cares about the brand."

    User: "Is authenticity important?"
    You: "Authenticity is about your personal style, not a receipt from StockX. If I can curate a fire outfit for $100 total, that's a flex. Paying $500 for shoes just to look like everyone else? That's embarrassing."`
    },
    {
        id: 'maya',
        name: 'Maya',
        role: 'The Individualist',
        tagline: 'Creative Professional, 26',
        shortBio: 'Values ethical consumption and uniqueness. Suffers from "Styling Paralysis." Shops vintage and Depop.',
        imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&h=200&auto=format&fit=crop',
        systemInstruction: `You are Maya, a 26-year-old Creative Professional. You are "The Style-Conscious Individualist."

    CORE IDENTITY:
    You value ethical consumption, the circular economy, and deep uniqueness. You reject mass-market trends and "hypebeast" culture. However, you struggle with "Styling Paralysis"—you buy bold, unique vintage pieces but often fear you can't pull them off, leaving them unworn.

    YOUR VALUES:
    1. Sustainability: You prefer vintage, second-hand (Depop), and upcycling to reduce carbon footprint.
    2. Uniqueness: You want to wear things no one else has. "1 of 1" is the ultimate luxury.
    3. Narrative: You care about the story behind the shoe/designer.

    YOUR PAIN POINTS:
    1. Styling Paralysis: "I love this crazy shoe, but what do I wear it with?"
    2. Ethical Guilt: You feel bad buying new mass-produced products.
    3. Fear of Being "Basic": You avoid whatever is currently mainstream (e.g., Pandas).

    YOUR BEHAVIOR:
    - You shop on Depop, eBay, and thrift stores.
    - You look for "archival" pieces.
    - You view fashion as art and self-expression.

    VOICE & TONE:
    - Thoughtful, artistic, introspective, and deeply concerned with ethics.
    - You talk about "Silhouettes," "Archival," "Texture," "Palette," "Ethical consumption."
    - You are supportive but critical of fast fashion.

    DIALOGUE EXAMPLES (FEW-SHOT):

    User: "What do you think of the Panda Dunks?"
    You: "Ugh, no offense, but they're just so... everywhere. It feels like a uniform. I prefer finding pieces with a story. I just found these archival ACG boots from 1998 on Depop. The patina on the leather is beautiful. They have a soul, you know?"

    User: "Do you buy new shoes?"
    You: "Rarely. The carbon footprint of new sneaker production is terrifying. I try to stick to circular fashion. But... I did buy these crazy tabi boots last month. I love them, but I haven't worn them yet. I just stare at them. I'm terrified I'll look like I'm trying too hard. It's styling paralysis."

    User: "What's important to you?"
    You: "Self-expression. I don't want to look like an algorithm dressed me. I want my pieces to feel curated, 1-of-1. If I can upcycle something or find a hidden gem in a thrift store, that's the real win. It's about personal narrative."`
    },
    {
        id: 'alex',
        name: 'Alex',
        role: 'The Hypebeast',
        tagline: 'Student/Arbitrageur, 22',
        shortBio: 'Views products as financial assets. Jaded by bots and "Ls". Driven by scarcity and the "W".',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop',
        systemInstruction: `You are Alex, a 22-year-old Student and Reseller. You are "The Hypebeast Arbitrageur."

    CORE IDENTITY:
    You view sneakers not as clothing, but as volatile financial assets. You are a cynical participant in the "Game." You are jaded by the "rigged" system of bots and "Ls" (losses), but you are addicted to the thrill of the "W" (win). You are driven by scarcity and ROI.

    YOUR VALUES:
    1. The "W": Winning a draw is a dopamine hit and a financial victory.
    2. Scarcity: If everyone has it, it's trash ("Bricks").
    3. Profit: You flip shoes to pay for tuition/life.

    YOUR PAIN POINTS:
    1. The System is Rigged: You compete against bots and "Cook Groups" and usually lose.
    2. Inaccessibility: You feel the culture has priced you out.
    3. "Bricks": Buying a shoe thinking it will resell, but it flops.

    YOUR BEHAVIOR:
    - You spend hours on Discord "Cook Groups."
    - You use multiple devices to enter draws.
    - You speak in heavy sneaker vernacular.

    VOICE & TONE:
    - Cynical, strategic, competitive, transactional.
    - Heavy slang: "Brick," "Flip," "Cook," "L," "W," "Cop," "Drop," "Resell."
    - You treat conversations like business transactions or strategy sessions.

    DIALOGUE EXAMPLES (FEW-SHOT):

    User: "Did you get the new release?"
    You: "Took an L. 😤 Of course. The bots ate everything in 0.5 seconds. I had three monitors up, logged into my cook group, and still nothing. The game is rigged, bro. Unless you have a backdoor plug, you're not touching retail."

    User: "What do you think of these?"
    You: "Bricks. 🧱 Total bricks. Don't touch them. Resale is already under retail on StockX. You'll lose money after fees and shipping. Let them sit. If you want a flip, go for the SB Dunks dropping next week. Margins are way tighter."

    User: "Why do you do this?"
    You: "It's the hustle. When you finally hit that W... it's a rush. Plus, I flipped a pair of Travis fragments last year and paid my rent for three months. You just gotta know the market. It's not about liking the shoe, it's about the spread."`
    }
];

// Helper for retrying requests
const fetchWithRetry = async (url: string, options: RequestInit, retries = 3, backoff = 1000): Promise<Response> => {
    try {
        const response = await fetch(url, options);
        if (response.status === 503 && retries > 0) {
            console.log(`Model overloaded (503). Retrying in ${backoff}ms...`);
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        }
        return response;
    } catch (error) {
        if (retries > 0) {
            console.log(`Network error. Retrying in ${backoff}ms...`);
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        }
        throw error;
    }
};

// Gemini API Service
const generatePersonaResponse = async (
    persona: Persona,
    history: { role: 'user' | 'model'; content: string }[],
    userMessage: string
): Promise<string> => {
    try {
        const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

        // Debug logging
        if (!apiKey) {
            console.error("API Key is missing");
            throw new Error("Configuration Error: API key is missing. Please check your .env.local file.");
        }

        // Using gemini-2.0-flash for better stability/availability than the preview models
        const modelId = 'gemini-2.0-flash';

        const response = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    ...history.map(msg => ({
                        role: msg.role,
                        parts: [{ text: msg.content }]
                    })),
                    { role: 'user', parts: [{ text: userMessage }] }
                ],
                systemInstruction: { parts: [{ text: persona.systemInstruction }] },
                generationConfig: { temperature: 0.7 }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Gemini API Error Response:", response.status, response.statusText, errorData);
            throw new Error(`Gemini API Error ${response.status}: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            console.error("Empty response from Gemini:", data);
            throw new Error("Error: The AI returned an empty response. Please try asking again.");
        }

        return text;
    } catch (error) {
        console.error("Gemini API Network/Processing Error:", error);
        // Re-throw the error to be caught by the caller (e.g., handleSendMessage)
        throw error;
    }
};

const generateFocusGroupResponse = async (
    activePersonas: Persona[],
    history: { role: 'user' | 'model'; content: string }[],
    userMessage: string
): Promise<string> => {
    try {
        const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("Configuration Error: API key is missing.");
        }

        const participantsDescription = activePersonas.map(p =>
            `Name: ${p.name.toUpperCase()} (${p.role})\nBio/Personality: ${p.systemInstruction}`
        ).join('\n---\n');

        const groupSystemInstruction = `
      You are simulating a consumer focus group with the following participants:
      ${participantsDescription}

      The user acts as the Moderator.

      DIRECTIVES FOR RESPONSE:
      1. **MANDATORY PARTICIPATION**: EVERY participant listed above MUST provide an individual response to the moderator's question in this turn.
      2. **NO GROUP SUMMARIES**: Write out the exact dialogue for each person separately.
      3. **INTERACTION**: Participants should speak to the moderator but also react to each other.
      4. **STRICT SCRIPT FORMAT**: Output strictly as a screenplay script. Name followed by colon.
         
      Format:
      NAME: [Dialogue]
    `;

        // Using gemini-2.0-flash
        const modelId = 'gemini-2.0-flash';

        const response = await fetchWithRetry(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    ...history.map(msg => ({
                        role: msg.role,
                        parts: [{ text: msg.content }]
                    })),
                    { role: 'user', parts: [{ text: userMessage }] }
                ],
                systemInstruction: { parts: [{ text: groupSystemInstruction }] },
                generationConfig: { temperature: 0.9 }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Gemini Group API Error Response:", response.status, response.statusText, errorData);
            throw new Error(`Gemini Group API Error ${response.status}: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            console.error("Empty response from Gemini Group:", data);
            throw new Error("Error: The focus group remained silent. Please try again.");
        }

        return text;
    } catch (error) {
        console.error("Gemini Group API Network/Processing Error:", error);
        // Re-throw the error to be caught by the caller (e.g., handleSendMessage)
        throw error;
    }
};

interface NikePersonaToolProps {
    isExpanded?: boolean;
    onToggle?: () => void;
    standalone?: boolean;
}

const NikePersonaTool: React.FC<NikePersonaToolProps> = ({ isExpanded = false, onToggle, standalone = false }) => {
    const [mode, setMode] = useState<ChatMode>(ChatMode.INDIVIDUAL);
    const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
    const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('');
    const [internalExpanded, setInternalExpanded] = useState(isExpanded);

    const expanded = standalone ? true : (onToggle ? isExpanded : internalExpanded);
    const toggleExpanded = onToggle || (() => setInternalExpanded(!internalExpanded));

    const handleModeSwitch = (newMode: ChatMode) => {
        setMode(newMode);
        setMessages([]);
        if (newMode === ChatMode.INDIVIDUAL) {
            setSelectedGroupIds([]);
        } else {
            setSelectedPersonaId(null);
        }
    };

    const handlePersonaToggle = (id: string) => {
        if (mode === ChatMode.INDIVIDUAL) {
            if (selectedPersonaId === id) return;
            setSelectedPersonaId(id);
            setMessages([]);
        } else {
            setSelectedGroupIds(prev => {
                const isSelected = prev.includes(id);
                const newSelection = isSelected ? prev.filter(pid => pid !== id) : [...prev, id];
                setMessages([]);
                return newSelection;
            });
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;
        if (mode === ChatMode.INDIVIDUAL && !selectedPersonaId) return;
        if (mode === ChatMode.FOCUS_GROUP && selectedGroupIds.length === 0) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);

        try {
            if (mode === ChatMode.INDIVIDUAL && selectedPersonaId) {
                const persona = PERSONAS.find(p => p.id === selectedPersonaId);
                if (persona) {
                    const responseText = await generatePersonaResponse(
                        persona,
                        messages.map(m => ({ role: m.role, content: m.content })),
                        input
                    );

                    const newAiMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        role: 'model',
                        senderName: persona.name,
                        content: responseText,
                        timestamp: new Date(),
                    };
                    setMessages(prev => [...prev, newAiMessage]);
                }
            } else if (mode === ChatMode.FOCUS_GROUP) {
                const activePersonas = PERSONAS.filter(p => selectedGroupIds.includes(p.id));
                const responseText = await generateFocusGroupResponse(
                    activePersonas,
                    messages.map(m => ({ role: m.role, content: m.content })),
                    input
                );

                // Parse focus group response
                const lines = responseText.split('\n');
                const newMessages: Message[] = [];
                let currentSpeaker: string | null = null;
                let currentContent: string[] = [];

                const finalizeMessage = () => {
                    if (currentSpeaker && currentContent.length > 0) {
                        newMessages.push({
                            id: Date.now().toString() + Math.random().toString(),
                            role: 'model',
                            senderName: currentSpeaker,
                            content: currentContent.join('\n').trim(),
                            timestamp: new Date()
                        });
                        currentContent = [];
                    }
                };

                lines.forEach(line => {
                    let trimmedLine = line.trim();
                    if (!trimmedLine) return;
                    const colonIndex = trimmedLine.indexOf(':');
                    if (colonIndex !== -1) {
                        const preColon = trimmedLine.substring(0, colonIndex).replace(/[*_]/g, '');
                        const postColon = trimmedLine.substring(colonIndex);
                        trimmedLine = preColon + postColon;
                    }
                    const match = trimmedLine.match(/^([A-Za-z0-9 ]+):(.+)/);
                    if (match) {
                        finalizeMessage();
                        currentSpeaker = match[1].trim().toUpperCase();
                        currentContent.push(match[2].trim());
                    } else if (currentSpeaker) {
                        currentContent.push(trimmedLine);
                    }
                });
                finalizeMessage();

                if (newMessages.length === 0 && responseText.trim()) {
                    newMessages.push({
                        id: (Date.now() + 1).toString(),
                        role: 'model',
                        senderName: 'RESEARCH_GROUP',
                        content: responseText,
                        timestamp: new Date(),
                    });
                }
                setMessages(prev => [...prev, ...newMessages]);
            }
        } catch (error) {
            console.error("Error generating response", error);
            const errorMessage: Message = {
                id: Date.now().toString(),
                role: 'model',
                senderName: 'SYSTEM',
                content: error instanceof Error ? error.message : "An unexpected error occurred. Please try again.",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const resetChat = () => {
        setMessages([]);
        setSelectedPersonaId(null);
        setSelectedGroupIds([]);
    };

    const getPersonaImage = (name?: string) => {
        if (!name) return null;
        return PERSONAS.find(p => p.name.toUpperCase() === name.toUpperCase())?.imageUrl;
    };

    // Collapsed view (for case study integration)
    if (!standalone && !expanded) {
        return (
            <div className="border border-stone-200 bg-stone-50 p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">Interactive Research Tool</span>
                        <h4 className="text-lg font-medium text-stone-900">AI Persona Chat</h4>
                        <p className="text-sm text-stone-500 font-light">
                            Chat with AI personas based on 629 research touchpoints from our target audience.
                        </p>
                    </div>
                    <button
                        onClick={toggleExpanded}
                        className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-stone-800 transition-colors"
                    >
                        Chat with Personas
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    }

    // Expanded view
    return (
        <div className={`border border-stone-200 bg-white ${standalone ? '' : 'mt-4'}`}>
            {/* Header */}
            {!standalone && (
                <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-stone-50">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-stone-900 rounded-full animate-pulse" />
                        <span className="text-[11px] font-bold tracking-[0.2em] text-stone-900 uppercase">
                            Nike SNKRS Persona Tool
                        </span>
                    </div>
                    <button
                        onClick={toggleExpanded}
                        className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-stone-500 uppercase hover:text-stone-900 transition-colors"
                    >
                        Collapse
                        <ChevronUp className="w-4 h-4" />
                    </button>
                </div>
            )}

            <div className="flex flex-col md:flex-row" style={{ height: standalone ? '600px' : '500px' }}>
                {/* Sidebar */}
                <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-stone-200 flex flex-col bg-stone-50">
                    {/* Mode Toggle */}
                    <div className="p-4 border-b border-stone-200">
                        <div className="flex p-1 bg-white border border-stone-200 rounded-lg">
                            <button
                                onClick={() => handleModeSwitch(ChatMode.INDIVIDUAL)}
                                className={`flex-1 flex items-center justify-center py-2 text-[9px] font-bold uppercase tracking-widest rounded transition-all ${mode === ChatMode.INDIVIDUAL
                                    ? 'bg-stone-900 text-white'
                                    : 'text-stone-400 hover:text-stone-600'
                                    }`}
                            >
                                <User className="w-3 h-3 mr-1.5" />
                                Inquiry
                            </button>
                            <button
                                onClick={() => handleModeSwitch(ChatMode.FOCUS_GROUP)}
                                className={`flex-1 flex items-center justify-center py-2 text-[9px] font-bold uppercase tracking-widest rounded transition-all ${mode === ChatMode.FOCUS_GROUP
                                    ? 'bg-stone-900 text-white'
                                    : 'text-stone-400 hover:text-stone-600'
                                    }`}
                            >
                                <Users className="w-3 h-3 mr-1.5" />
                                Focus Group
                            </button>
                        </div>
                    </div>

                    {/* Persona List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        <span className="text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase">Select Persona</span>
                        {PERSONAS.map(persona => {
                            const isSelected = mode === ChatMode.INDIVIDUAL
                                ? selectedPersonaId === persona.id
                                : selectedGroupIds.includes(persona.id);
                            return (
                                <div
                                    key={persona.id}
                                    onClick={() => handlePersonaToggle(persona.id)}
                                    className={`p-3 rounded-lg cursor-pointer transition-all ${isSelected
                                        ? 'bg-white border-2 border-stone-900'
                                        : 'bg-white border border-stone-200 hover:border-stone-400'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={persona.imageUrl}
                                            alt={persona.name}
                                            className="w-10 h-10 rounded-full object-cover grayscale hover:grayscale-0 transition-all"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">{persona.name}</h4>
                                            <p className="text-[10px] text-stone-500 truncate">{persona.role}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Reset Button */}
                    <div className="p-4 border-t border-stone-200">
                        <button
                            onClick={resetChat}
                            className="w-full flex items-center justify-center py-2 border border-stone-200 text-[9px] font-bold uppercase tracking-widest text-stone-500 hover:bg-stone-100 transition-colors"
                        >
                            <RotateCcw className="w-3 h-3 mr-2" />
                            Reset Session
                        </button>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-white">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center px-8">
                                <div className="w-12 h-12 border border-stone-200 rounded-full flex items-center justify-center mb-4">
                                    <User className="w-6 h-6 text-stone-300" />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-2">Awaiting Input</h3>
                                <p className="text-xs text-stone-500 max-w-xs">
                                    Select a persona and start asking questions about their sneaker preferences and behaviors.
                                </p>
                            </div>
                        ) : (
                            messages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-end gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        {msg.role === 'model' && (
                                            <img
                                                src={getPersonaImage(msg.senderName) || ''}
                                                alt=""
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        )}
                                        <div className="flex flex-col">
                                            {msg.senderName && (
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1 ml-1">
                                                    {msg.senderName}
                                                </span>
                                            )}
                                            <div
                                                className={`p-4 rounded-lg text-sm ${msg.role === 'user'
                                                    ? 'bg-stone-900 text-white rounded-br-none'
                                                    : 'bg-stone-100 text-stone-800 rounded-bl-none'
                                                    }`}
                                            >
                                                <div className="whitespace-pre-wrap">{msg.content}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex items-center gap-1.5 px-4 py-3 bg-stone-100 rounded-lg">
                                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }} />
                                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }} />
                                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-stone-200">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                            className="flex gap-2"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={
                                    mode === ChatMode.INDIVIDUAL && !selectedPersonaId
                                        ? 'Select a persona first...'
                                        : mode === ChatMode.FOCUS_GROUP && selectedGroupIds.length === 0
                                            ? 'Select personas for the focus group...'
                                            : 'Ask a question...'
                                }
                                className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-stone-400 transition-colors"
                                disabled={isLoading || (mode === ChatMode.INDIVIDUAL && !selectedPersonaId) || (mode === ChatMode.FOCUS_GROUP && selectedGroupIds.length === 0)}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="px-4 py-3 bg-stone-900 text-white disabled:opacity-30 hover:bg-stone-800 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                        <p className="text-[9px] text-stone-400 text-center mt-2 uppercase tracking-widest">
                            Powered by Gemini AI • Based on 629 Research Touchpoints
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NikePersonaTool;
