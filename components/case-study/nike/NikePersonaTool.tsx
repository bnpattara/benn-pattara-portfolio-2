import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Users, RotateCcw, ChevronUp, ChevronDown, MessageSquare, ArrowLeft } from 'lucide-react';

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

interface QuestionNode {
    id: string;
    text: string;
    nextOptions?: string[]; // IDs of next questions
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

// Conversation Data Structure
const QUESTION_NODES: Record<string, QuestionNode> = {
    // Root Level
    q1: { id: 'q1', text: "What drives your purchase decisions?", nextOptions: ['q1_a', 'q1_b'] },
    q2: { id: 'q2', text: "How do you feel about the SNKRS app experience?", nextOptions: ['q2_a', 'q2_b'] },
    q3: { id: 'q3', text: "Do you actually wear your shoes?", nextOptions: ['q3_a', 'q3_b'] },

    // Level 2 - Purchase Decisions
    q1_a: { id: 'q1_a', text: "Does sustainability factor into your choice?", nextOptions: [] },
    q1_b: { id: 'q1_b', text: "How much does resale value matter to you?", nextOptions: [] },

    // Level 2 - SNKRS App
    q2_a: { id: 'q2_a', text: "If you could change one feature, what would it be?", nextOptions: [] },
    q2_b: { id: 'q2_b', text: "Do you think the lottery system is fair?", nextOptions: [] },

    // Level 2 - Wear vs Stock
    q3_a: { id: 'q3_a', text: "How do you decide which pairs to unbox?", nextOptions: [] },
    q3_b: { id: 'q3_b', text: "What is the most expensive pair you've worn?", nextOptions: [] },
};

const ROOT_QUESTIONS = ['q1', 'q2', 'q3'];

const MOCK_RESPONSES: Record<string, Record<string, string>> = {
    sarah: {
        q1: "I look at the specs first. Midsole density, breathability, and verified durability reviews. If a shoe costs $180, I need to know it can handle at least 400 miles of daily wear. If the math doesn't work (Cost Per Wear), I don't buy. Simple as that.",
        q1_a: "Yes, but only if it affects durability. I like the idea of recycled materials, but if the foam breaks down twice as fast, it's actually more wasteful. I need sustainable *performance*, not just marketing.",
        q1_b: "Zero. I buy to wear. Resale value is a myth if you actually use the product. I'm not running a store, I'm running my life.",
        q2: "It's a waste of time. Why would I wake up at 7 AM to *maybe* win the privilege of spending money? It's bad UX. A shopping experience should be: Select Item -> Pay -> Receive. Nike gamified it to hide the fact that they can't meet demand.",
        q2_a: "A pre-order system. Take my money now, manufacture the demand, and ship it when it's ready. Eliminate the scarcity games.",
        q2_b: "No, it's a slot machine. It exploits psychology to keep you engaged. It's not about fairness, it's about retention metrics.",
        q3: "Always. A shoe is a tool. Keeping it in a box is like buying a hammer and never hitting a nail. It defeats the purpose. I have a rotation of 'beaters' that I wear into the ground.",
        q3_a: "If I need shoes, I open the box. It's not complicated. I don't have an emotional attachment to the cardboard.",
        q3_b: "My $200 running shoes. And they were worth every penny for the knee support. I don't pay for hype, I pay for biomechanics."
    },
    david: {
        q1: "I check the data. StockX trends, volatility indices. I need to know I'm not buying a 'brick.' It's an asset allocation decision, really. I need to know the market consensus before I commit.",
        q1_a: "Not really. I care about the box condition and the materials being original. 'Sustainable' usually means 'recycled junk' that collectors don't value as highly.",
        q1_b: "Everything. I track my portfolio daily. It's an investment. If I buy a shoe and it drops 20%, I feel physically ill.",
        q2: "It's stressful. 😰 I have three monitors set up, but I still take Ls. And when I do win, I'm terrified the package will get stolen. The anxiety doesn't end at checkout. I wish they published exact stock numbers.",
        q2_a: "Transparency. Show me the exact stock numbers per size before the drop. I need to calculate my odds.",
        q2_b: "It's rigged against manual users. I need an edge. The bots eat everything, and I'm just sitting here refreshing like a clown.",
        q3: "Wear them? Are you crazy? Once you lace them up, you lose 30% of the value instantly. I have a pair of beaters for walking, but the heat stays on ice. 🧊 Deadstock is the only way to protect the asset.",
        q3_a: "If the market value drops below retail + 20%, I *might* wear them. Or if I have doubles. One to rock, one to stock.",
        q3_b: "I wore my Travis Scotts once... inside... on carpet. I regret it. I spent the whole time looking at my feet."
    },
    chloe: {
        q1: "Vibes. ✨ If I see it on TikTok and it fits my aesthetic, I want it. But I'm not paying resale. I'll find a dupe or a similar silhouette from a cheaper brand. Why pay the 'hype tax' when the look is free?",
        q1_a: "Totally! I love brands that care. But it has to look cute too. If it's ugly and sustainable, I'm not wearing it.",
        q1_b: "I mean, I sell stuff on Depop when I'm bored of it, but I don't buy *for* that. I buy to look good in my fit pics.",
        q2: "It feels... old. Like, why is it so hard? I can find cooler, unique stuff on Depop or even Amazon without the gatekeeping. It's not very Gen Z friendly. It feels like a club I'm not cool enough to get into.",
        q2_a: "Make it more social! Like TikTok but for drops. Let me see what my friends are trying to get.",
        q2_b: "It's kinda fun? Like gambling but you get shoes. But mostly I just lose interest if it takes too long.",
        q3: "Yeah, but I style them differently. I might paint them or swap the laces. I don't treat them like holy grails, they're just accessories to the outfit. If they get dirty, it adds character.",
        q3_a: "If it matches my outfit for Saturday night, it's getting worn. I don't overthink it.",
        q3_b: "I thrifted these designer boots for $50. Does that count? I don't really spend big money on one item."
    },
    maya: {
        q1: "The story. Who designed it? Is it sustainable? I look for archival pieces with a narrative. I don't want what everyone else has. '1 of 1' is the ultimate luxury for me.",
        q1_a: "It's my #1 priority. I hate the waste in this industry. I'd rather buy vintage than new 'sustainable' marketing.",
        q1_b: "I don't resell. I buy for life or donate. Treating clothes like stocks feels gross to me.",
        q2: "It feels like a factory for mass consumption. It pushes everyone to look the same (the 'Panda Dunk' effect). I miss the days of hunting for something rare in a thrift store. It strips away the joy of discovery.",
        q2_a: "Highlight the designers and the materials, not just the hype. Tell me the story behind the product.",
        q2_b: "It feels exclusionary. It creates artificial desire for things we don't need.",
        q3: "I struggle with that. I buy these amazing unique pieces, but then I get 'styling paralysis.' I'm afraid I won't do them justice, so they sit in my closet. I want to wear them, but I overthink it.",
        q3_a: "I usually wait for a special occasion... which never comes. So they sit there. It's a problem.",
        q3_b: "A vintage pair from 1995. The value is sentimental, not monetary. I'm terrified of the soles crumbling."
    },
    alex: {
        q1: "Hype and Scarcity. If it's limited, I want it. If it's sitting on shelves, it's a brick. 🧱 I'm looking for that 3x return on investment. It's not about liking the shoe, it's about the spread.",
        q1_a: "Only if 'sustainable' means 'limited edition' and 'high resale'. Otherwise, I don't care.",
        q1_b: "It's the only thing that matters. If there's no margin, I don't touch it. I'm running a business here.",
        q2: "The game is rigged, bro. Bots eat everything. But when you hit that 'GOT 'EM' screen... nothing beats that rush. It's addictive. But yeah, unless you have a backdoor plug, you're mostly taking Ls.",
        q2_a: "Better bot protection... so *my* bots work better. Just kidding. (Not really).",
        q2_b: "Fair? The game is the game. You adapt or you lose. If you're not using tools, you're not trying.",
        q3: "Only if I have doubles. One to rock, one to stock. But mostly, I flip them. These aren't shoes to me, they're liquidity. I flipped a pair last month to pay rent.",
        q3_a: "I only wear bricks. The heat stays on ice until the price peaks. Then I sell.",
        q3_b: "I wore Off-Whites to a party to flex. Scuffed them. Lost $400 in value. Never again."
    }
};

const FOCUS_GROUP_SCRIPTS: Record<string, string> = {
    q1: `ALEX: Money. Pure and simple. If there's no margin, I'm out.
SARAH: That's exactly the problem. You're ruining it for people who need durable footwear.
DAVID: Well, it is an asset class, Sarah. You can't ignore the market data.
CHLOE: Honestly, I just buy what looks good on my feed. Brand doesn't matter.
MAYA: I wish we talked more about the design story and less about the price tag.`,
    q1_a: `MAYA: It's crucial. The waste is disgusting.
SARAH: I agree, but only if the product still lasts.
ALEX: No profit in saving the planet, sadly.
DAVID: Collectors don't want recycled materials. They want the OG box.
CHLOE: I think it's cute! Green is in right now.`,
    q1_b: `ALEX: It's an asset class!
DAVID: Exactly. My collection outperforms the S&P 500.
SARAH: You guys are delusional. It's rubber and glue.
MAYA: It takes the soul out of the art.
CHLOE: I just sell to buy new clothes. It's circular!`,
    q2: `ALEX: The app is broken. I have 5 accounts and still take Ls. It's pay-to-play.
DAVID: It's not just broken, it's opaque. I want to know the exact stock numbers.
SARAH: It's inefficient. Just let me buy the product.
CHLOE: It's just not fun. I'd rather go to a vintage market.
MAYA: Exactly. It feels algorithmic. No soul.`,
    q2_a: `SARAH: Pre-orders. Solves everything.
DAVID: Data transparency.
ALEX: Better servers. I missed a drop because it crashed.
CHLOE: Make it social!
MAYA: More storytelling.`,
    q2_b: `ALEX: It's fair if you know how to play.
SARAH: It's gambling.
DAVID: It's rigged against the little guy.
MAYA: It's exclusionary.
CHLOE: It's just a game.`,
    q3: `SARAH: Of course I wear them. They're shoes.
DAVID: I can't do it. Too much risk of ruining the value.
ALEX: I'm with David. Keep 'em deadstock, flip 'em later.
CHLOE: You guys are boring. Wear your shoes!
MAYA: I want to, but I'm waiting for the perfect outfit... which never happens.`,
    q3_a: `CHLOE: Just wear it! Life is short.
DAVID: Easy for you to say, you buy dupes.
ALEX: If it's a brick, I wear it. If it's heat, it sits.
SARAH: If it fits, I wear it.
MAYA: I need the right occasion.`,
    q3_b: `DAVID: I ruined my Travis Scotts. Still hurts.
ALEX: I scuffed my Off-Whites. Lost $400.
SARAH: My running shoes. Best investment ever.
CHLOE: My thrifted boots!
MAYA: My vintage 90s pair.`
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
    const [currentOptions, setCurrentOptions] = useState<string[]>(ROOT_QUESTIONS);

    const [messageCount, setMessageCount] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [hasShownPopup, setHasShownPopup] = useState(false);

    const chatContainerRef = useRef<HTMLDivElement>(null);

    const expanded = standalone ? true : (onToggle ? isExpanded : internalExpanded);
    const toggleExpanded = onToggle || (() => setInternalExpanded(!internalExpanded));

    // Auto-scroll to bottom
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isTyping]);

    const handleModeSwitch = (newMode: ChatMode) => {
        setMode(newMode);
        setMessages([]);
        setCurrentOptions(ROOT_QUESTIONS); // Reset questions
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
            setCurrentOptions(ROOT_QUESTIONS); // Reset questions on persona switch
        } else {
            setSelectedGroupIds(prev => {
                const isSelected = prev.includes(id);
                const newSelection = isSelected ? prev.filter(pid => pid !== id) : [...prev, id];
                setMessages([]);
                setCurrentOptions(ROOT_QUESTIONS);
                return newSelection;
            });
        }
    };

    const handleQuestionSelect = (questionId: string) => {
        const questionNode = QUESTION_NODES[questionId];
        if (!questionNode) return;

        if (mode === ChatMode.INDIVIDUAL && !selectedPersonaId) return;
        if (mode === ChatMode.FOCUS_GROUP && selectedGroupIds.length === 0) return;

        // Increment message count
        const newCount = messageCount + 1;
        setMessageCount(newCount);

        // Check if we should show popup (after 3rd message, only once)
        if (newCount === 3 && !hasShownPopup) {
            setTimeout(() => {
                setShowPopup(true);
                setHasShownPopup(true);
            }, 2000); // Show shortly after the interaction starts
        }

        // Add User Message
        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: questionNode.text,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, newUserMessage]);
        setIsTyping(true);

        // Update options for next turn
        if (questionNode.nextOptions && questionNode.nextOptions.length > 0) {
            setCurrentOptions(questionNode.nextOptions);
        } else {
            // If leaf node, maybe keep current or reset? 
            // Let's keep current to allow "asking another" from the same level, 
            // or we could provide a "Back to Start" button separately.
            // For now, let's just leave it, the user can use the "Back" button we'll add.
        }

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
        setCurrentOptions(ROOT_QUESTIONS);
        setMessageCount(0); // Optional: reset count on chat reset? Let's keep it persistent for the session to avoid annoying the user.
        if (mode === ChatMode.INDIVIDUAL) {
            setSelectedPersonaId(null);
        }
        // Don't clear group selection in focus mode for better UX
    };

    const resetTopics = () => {
        setCurrentOptions(ROOT_QUESTIONS);
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
        <div className={`border border-stone-200 bg-white ${standalone ? '' : 'mt-4'} relative`}>
            {/* Popup Overlay */}
            {showPopup && (
                <div className="absolute inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-white p-8 max-w-md w-full shadow-2xl border border-stone-200 relative">
                        <div className="space-y-6 text-center">
                            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto">
                                <MessageSquare className="w-6 h-6 text-stone-900" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-light text-stone-900">Enjoying the demo?</h3>
                                <p className="text-sm text-stone-600 leading-relaxed">
                                    To ask your own questions or explore more about the build of this application, reach out to schedule a walkthrough! I would love to connect.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <a
                                    href="mailto:bennpattara@gmail.com"
                                    className="w-full py-3 bg-stone-900 text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    Schedule Walkthrough
                                    <Send className="w-3 h-3" />
                                </a>
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="w-full py-3 border border-stone-200 text-stone-500 text-[10px] font-bold tracking-[0.1em] uppercase hover:bg-stone-50 transition-colors"
                                >
                                    Close & Continue with Preloaded Questions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                    <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
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
                    </div>

                    {/* Input Area - Dynamic Questions */}
                    <div className="p-4 border-t border-stone-200 bg-stone-50">
                        <div className="mb-2 flex justify-between items-center">
                            <span className="text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                                {currentOptions === ROOT_QUESTIONS ? "Select a Topic" : "Follow-up Questions"}
                            </span>
                            {currentOptions !== ROOT_QUESTIONS && (
                                <button
                                    onClick={resetTopics}
                                    className="text-[9px] font-bold tracking-widest text-stone-500 uppercase hover:text-stone-900 flex items-center gap-1"
                                >
                                    <ArrowLeft className="w-3 h-3" />
                                    Back to Topics
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {currentOptions.map(qId => {
                                const q = QUESTION_NODES[qId];
                                return (
                                    <button
                                        key={q.id}
                                        onClick={() => handleQuestionSelect(q.id)}
                                        disabled={isTyping || (mode === ChatMode.INDIVIDUAL && !selectedPersonaId)}
                                        className="text-left px-4 py-3 bg-white border border-stone-200 rounded-lg text-sm text-stone-700 hover:border-stone-900 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between group"
                                    >
                                        <span>{q.text}</span>
                                        <MessageSquare className="w-4 h-4 text-stone-300 group-hover:text-stone-900 transition-colors" />
                                    </button>
                                );
                            })}
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
