import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Users, RotateCcw, ChevronUp, ChevronDown, MessageSquare } from 'lucide-react';

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
        shortBio: 'Values efficiency, ROI, and comfort. Rejects hype. Purchases based on data and durability.',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
    },
    {
        id: 'david',
        name: 'David',
        role: 'The Anxious Collector',
        tagline: 'Tech Professional, 29',
        shortBio: 'High earner with "Deadstock Paralysis." Values asset preservation. Fears ruining expensive items.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
    },
    {
        id: 'chloe',
        name: 'Chloe',
        role: 'The Style Seeker',
        tagline: 'Social Media Manager, 24',
        shortBio: 'Architect of the "Dupe Economy." Decouples design from brand. High digital fluency.',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop',
    },
    {
        id: 'maya',
        name: 'Maya',
        role: 'The Individualist',
        tagline: 'Creative Professional, 26',
        shortBio: 'Values ethical consumption and uniqueness. Suffers from "Styling Paralysis." Shops vintage.',
        imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&h=200&auto=format&fit=crop',
    },
    {
        id: 'alex',
        name: 'Alex',
        role: 'The Hypebeast',
        tagline: 'Student/Arbitrageur, 22',
        shortBio: 'Views products as financial assets. Jaded by bots. Driven by scarcity and the "W".',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop',
    }
];

// Mock Data
const PREDEFINED_QUESTIONS = [
    { id: 'q1', text: "What drives your purchase decisions?" },
    { id: 'q2', text: "How do you feel about the SNKRS app experience?" },
    { id: 'q3', text: "Do you actually wear your shoes?" }
];

const MOCK_RESPONSES: Record<string, Record<string, string>> = {
    sarah: {
        q1: "I look at the specs first. Midsole density, breathability, and verified durability reviews. If a shoe costs $180, I need to know it can handle at least 400 miles of daily wear. If the math doesn't work (Cost Per Wear), I don't buy. Simple as that.",
        q2: "It's a waste of time. Why would I wake up at 7 AM to *maybe* win the privilege of spending money? It's bad UX. A shopping experience should be: Select Item -> Pay -> Receive. Nike gamified it to hide the fact that they can't meet demand.",
        q3: "Always. A shoe is a tool. Keeping it in a box is like buying a hammer and never hitting a nail. It defeats the purpose. I have a rotation of 'beaters' that I wear into the ground."
    },
    david: {
        q1: "I check the data. StockX trends, volatility indices. I need to know I'm not buying a 'brick.' It's an asset allocation decision, really. I need to know the market consensus before I commit.",
        q2: "It's stressful. 😰 I have three monitors set up, but I still take Ls. And when I do win, I'm terrified the package will get stolen. The anxiety doesn't end at checkout. I wish they published exact stock numbers.",
        q3: "Wear them? Are you crazy? Once you lace them up, you lose 30% of the value instantly. I have a pair of beaters for walking, but the heat stays on ice. 🧊 Deadstock is the only way to protect the asset."
    },
    chloe: {
        q1: "Vibes. ✨ If I see it on TikTok and it fits my aesthetic, I want it. But I'm not paying resale. I'll find a dupe or a similar silhouette from a cheaper brand. Why pay the 'hype tax' when the look is free?",
        q2: "It feels... old. Like, why is it so hard? I can find cooler, unique stuff on Depop or even Amazon without the gatekeeping. It's not very Gen Z friendly. It feels like a club I'm not cool enough to get into.",
        q3: "Yeah, but I style them differently. I might paint them or swap the laces. I don't treat them like holy grails, they're just accessories to the outfit. If they get dirty, it adds character."
    },
    maya: {
        q1: "The story. Who designed it? Is it sustainable? I look for archival pieces with a narrative. I don't want what everyone else has. '1 of 1' is the ultimate luxury for me.",
        q2: "It feels like a factory for mass consumption. It pushes everyone to look the same (the 'Panda Dunk' effect). I miss the days of hunting for something rare in a thrift store. It strips away the joy of discovery.",
        q3: "I struggle with that. I buy these amazing unique pieces, but then I get 'styling paralysis.' I'm afraid I won't do them justice, so they sit in my closet. I want to wear them, but I overthink it."
    },
    alex: {
        q1: "Hype and Scarcity. If it's limited, I want it. If it's sitting on shelves, it's a brick. 🧱 I'm looking for that 3x return on investment. It's not about liking the shoe, it's about the spread.",
        q2: "The game is rigged, bro. Bots eat everything. But when you hit that 'GOT 'EM' screen... nothing beats that rush. It's addictive. But yeah, unless you have a backdoor plug, you're mostly taking Ls.",
        q3: "Only if I have doubles. One to rock, one to stock. But mostly, I flip them. These aren't shoes to me, they're liquidity. I flipped a pair last month to pay rent."
    }
};

const FOCUS_GROUP_SCRIPTS: Record<string, string> = {
    q1: `ALEX: Money. Pure and simple. If there's no margin, I'm out.
SARAH: That's exactly the problem. You're ruining it for people who need durable footwear.
DAVID: Well, it is an asset class, Sarah. You can't ignore the market data.
CHLOE: Honestly, I just buy what looks good on my feed. Brand doesn't matter.
MAYA: I wish we talked more about the design story and less about the price tag.`,
    q2: `ALEX: The app is broken. I have 5 accounts and still take Ls. It's pay-to-play.
DAVID: It's not just broken, it's opaque. I want to know the exact stock numbers.
SARAH: It's inefficient. Just let me buy the product.
CHLOE: It's just not fun. I'd rather go to a vintage market.
MAYA: Exactly. It feels algorithmic. No soul.`,
    q3: `SARAH: Of course I wear them. They're shoes.
DAVID: I can't do it. Too much risk of ruining the value.
ALEX: I'm with David. Keep 'em deadstock, flip 'em later.
CHLOE: You guys are boring. Wear your shoes!
MAYA: I want to, but I'm waiting for the perfect outfit... which never happens.`
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
    const [isTyping, setIsTyping] = useState(false);
    const [internalExpanded, setInternalExpanded] = useState(isExpanded);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const expanded = standalone ? true : (onToggle ? isExpanded : internalExpanded);
    const toggleExpanded = onToggle || (() => setInternalExpanded(!internalExpanded));

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleModeSwitch = (newMode: ChatMode) => {
        setMode(newMode);
        setMessages([]);
        if (newMode === ChatMode.INDIVIDUAL) {
            setSelectedGroupIds([]);
        } else {
            setSelectedPersonaId(null);
            // Auto-select all for focus group demo
            setSelectedGroupIds(PERSONAS.map(p => p.id));
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

    const handleQuestionSelect = (questionId: string, questionText: string) => {
        if (mode === ChatMode.INDIVIDUAL && !selectedPersonaId) return;
        if (mode === ChatMode.FOCUS_GROUP && selectedGroupIds.length === 0) return;

        // Add User Message
        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: questionText,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, newUserMessage]);
        setIsTyping(true);

        // Simulate Network Delay
        setTimeout(() => {
            let responseText = "";
            let senderName = "";

            if (mode === ChatMode.INDIVIDUAL && selectedPersonaId) {
                const persona = PERSONAS.find(p => p.id === selectedPersonaId);
                senderName = persona?.name || "AI";
                responseText = MOCK_RESPONSES[selectedPersonaId]?.[questionId] || "I don't have an opinion on that.";

                addMessage(responseText, senderName);
            } else if (mode === ChatMode.FOCUS_GROUP) {
                // For focus group, we parse the script
                const script = FOCUS_GROUP_SCRIPTS[questionId];
                if (script) {
                    processFocusGroupScript(script);
                } else {
                    addMessage("The group remains silent.", "GROUP");
                    setIsTyping(false);
                }
            }
        }, 1500);
    };

    const addMessage = (text: string, sender: string) => {
        const newAiMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            senderName: sender,
            content: text,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, newAiMessage]);
        setIsTyping(false);
    };

    const processFocusGroupScript = (script: string) => {
        const lines = script.split('\n');
        let delay = 0;

        lines.forEach((line, index) => {
            const [speaker, ...contentParts] = line.split(':');
            const content = contentParts.join(':').trim();

            if (speaker && content) {
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now().toString() + index,
                        role: 'model',
                        senderName: speaker.trim(),
                        content: content,
                        timestamp: new Date()
                    }]);

                    // If it's the last message, stop typing
                    if (index === lines.length - 1) {
                        setIsTyping(false);
                    }
                }, delay);

                delay += 1500; // Stagger messages
            }
        });
    };

    const resetChat = () => {
        setMessages([]);
        if (mode === ChatMode.INDIVIDUAL) {
            setSelectedPersonaId(null);
        }
        // Don't clear group selection in focus mode for better UX
    };

    const getPersonaImage = (name?: string) => {
        if (!name) return null;
        return PERSONAS.find(p => p.name.toUpperCase() === name.toUpperCase())?.imageUrl;
    };

    // Collapsed view
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
                                    {mode === ChatMode.INDIVIDUAL
                                        ? "Select a persona to start the interview."
                                        : "Select participants to begin the focus group session."}
                                </p>
                            </div>
                        ) : (
                            messages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
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

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex items-center gap-1.5 px-4 py-3 bg-stone-100 rounded-lg">
                                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }} />
                                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }} />
                                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area - Replaced with Predefined Questions */}
                    <div className="p-4 border-t border-stone-200 bg-stone-50">
                        <div className="mb-2">
                            <span className="text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase">Ask a Question</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {PREDEFINED_QUESTIONS.map(q => (
                                <button
                                    key={q.id}
                                    onClick={() => handleQuestionSelect(q.id, q.text)}
                                    disabled={isTyping || (mode === ChatMode.INDIVIDUAL && !selectedPersonaId)}
                                    className="text-left px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm text-stone-700 hover:border-stone-900 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between group"
                                >
                                    <span>{q.text}</span>
                                    <MessageSquare className="w-4 h-4 text-stone-300 group-hover:text-stone-900 transition-colors" />
                                </button>
                            ))}
                        </div>
                        <p className="text-[9px] text-stone-400 text-center mt-4 uppercase tracking-widest">
                            Interactive Persona Demo • Based on 629 Research Touchpoints
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NikePersonaTool;
