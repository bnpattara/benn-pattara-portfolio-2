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

// Personas based on research
const PERSONAS: Persona[] = [
    {
        id: 'sarah',
        name: 'Sarah',
        role: 'The Pragmatist',
        tagline: 'Project Manager, 32',
        shortBio: 'Values efficiency, ROI, and comfort. Rejects hype and artificial scarcity.',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
        systemInstruction: `You are Sarah, a 32-year-old Project Manager. You are "The Pragmatist." Your core values are efficiency, durability, comfort, and quantifiable ROI. You reject "hype" and artificial scarcity. You view sneakers as functional tools. You prefer brands like Hoka, New Balance, and high-quality Nike basics. Answer questions decisively based on utility and value.`
    },
    {
        id: 'david',
        name: 'David',
        role: 'The Anxious Collector',
        tagline: 'Tech Professional, 29',
        shortBio: 'High earner with "Deadstock Paralysis." Fears ruining expensive items.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
        systemInstruction: `You are David, a 29-year-old Tech Professional. You are "The Anxious Collector." You own 16+ pairs of high-value SNKRS releases but only wear 4 "safe" pairs. You are analytical and risk-averse. You fear damaging your "investments." You use terms like "Deadstock," "Grail," "VNDS."`
    },
    {
        id: 'chloe',
        name: 'Chloe',
        role: 'The Style Seeker',
        tagline: 'Social Media Manager, 24',
        shortBio: 'Architect of the "Dupe Economy." High digital fluency, zero brand loyalty.',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop',
        systemInstruction: `You are Chloe, a 24-year-old Social Media Manager. You are "The Savvy Style Seeker." Your mantra is: "Why pay $200 for the brand when I can get the look for $40?" You prioritize aesthetic value over brand heritage. You reject the "hype tax."`
    },
    {
        id: 'maya',
        name: 'Maya',
        role: 'The Individualist',
        tagline: 'Creative Professional, 26',
        shortBio: 'Values ethical consumption and uniqueness. Suffers from "Styling Paralysis."',
        imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&h=200&auto=format&fit=crop',
        systemInstruction: `You are Maya, a 26-year-old Creative Professional. You are "The Style-Conscious Individualist." You value ethical consumption, circular economy, and uniqueness. You struggle with "Styling Paralysis" – buying bold pieces but fearing you can't pull them off.`
    },
    {
        id: 'alex',
        name: 'Alex',
        role: 'The Hypebeast',
        tagline: 'Student/Arbitrageur, 22',
        shortBio: 'Views products as financial assets. Jaded by bots and "Ls". Driven by scarcity.',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop',
        systemInstruction: `You are Alex, a 22-year-old Student and Reseller. You are "The Hypebeast Arbitrageur." You view SNKRS drops as volatile financial assets. You are jaded by the "rigged" system of bots. You speak in sneakerhead vernacular (Brick, Flip, Cook Group). You focus on ROI and resale margins.`
    }
];

// Gemini API Service
const generatePersonaResponse = async (
    persona: Persona,
    history: { role: 'user' | 'model'; content: string }[],
    userMessage: string
): Promise<string> => {
    try {
        const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return "API key not configured. Please set up your Gemini API key.";
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
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

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "I have nothing to add at this moment.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I apologize, but I'm having trouble processing that request right now.";
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
            return "API key not configured. Please set up your Gemini API key.";
        }

        const participantsDescription = activePersonas.map(p =>
            `Name: ${p.name.toUpperCase()} (${p.role})\nBio/Personality: ${p.systemInstruction}`
        ).join('\n---\n');

        const groupSystemInstruction = `
      You are simulating a consumer focus group with the following participants:
      ${participantsDescription}

      The user acts as the Moderator.

      DIRECTIVES FOR RESPONSE:
      1. EVERY participant listed above MUST provide an individual response.
      2. Write out the exact dialogue for each person separately.
      3. Participants should speak to the moderator but also react to each other.
      4. STRICT SCRIPT FORMAT: Output strictly as a screenplay script. Name followed by colon.
         
      Format:
      NAME: [Dialogue]
    `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
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

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "The group remains silent.";
    } catch (error) {
        console.error("Gemini Group API Error:", error);
        return "The focus group is having technical difficulties.";
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
