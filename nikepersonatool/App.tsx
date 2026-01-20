import React, { useState } from 'react';
import { ChatMode, Message } from './types';
import { PERSONAS } from './constants';
import { PersonaCard } from './components/PersonaCard';
import { ChatInterface } from './components/ChatInterface';
import { generatePersonaResponse, generateFocusGroupResponse } from './services/geminiService';
import { exportToPdf } from './utils/pdfExport';
import { Users, User, RotateCcw, Target, Download, Info, Database } from 'lucide-react';

function App() {
  const [mode, setMode] = useState<ChatMode>(ChatMode.INDIVIDUAL);
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSendMessage = async (text: string) => {
    if (mode === ChatMode.INDIVIDUAL && !selectedPersonaId) return;
    if (mode === ChatMode.FOCUS_GROUP && selectedGroupIds.length === 0) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      if (mode === ChatMode.INDIVIDUAL && selectedPersonaId) {
        const persona = PERSONAS.find(p => p.id === selectedPersonaId);
        if (persona) {
          const responseText = await generatePersonaResponse(
            persona, 
            messages.map(m => ({ role: m.role, content: m.content })), 
            text
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
          text
        );

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

  const handleExport = () => {
    if (messages.length === 0) return;
    let title = 'NIKE SNKRS Persona Analysis';
    let filename = 'Nike_Analysis_Report';
    const dateStr = new Date().toISOString().split('T')[0];
    if (mode === ChatMode.INDIVIDUAL && selectedPersonaId) {
      const p = PERSONAS.find(per => per.id === selectedPersonaId);
      title = `Nike Research: ${p?.name} (${p?.role})`;
      filename = `Nike_Inquiry_${p?.name}_${dateStr}`;
    } else {
      title = `Nike Focus Group Transcript`;
      filename = `Nike_FocusGroup_${dateStr}`;
    }
    exportToPdf(messages, title, filename);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-stone-100">
      
      {/* Sidebar: Editorial Navigation */}
      <aside className="w-80 flex-shrink-0 bg-white border-r border-stone-200 flex flex-col h-full z-20">
        
        {/* Branding */}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-black p-1.5 rounded-lg">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight uppercase text-black">NIKE SNKRS</h1>
          </div>
          <h2 className="text-[10px] text-stone-900 font-bold uppercase tracking-[0.2em] mb-4">
            Persona Tool
          </h2>
          
          {/* Methodology Info Card */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-2">
            <div className="flex items-start gap-3 mb-2">
              <Database className="w-3.5 h-3.5 text-black mt-0.5" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-black">Research Methodology</span>
            </div>
            <p className="text-[10px] leading-relaxed text-stone-500 font-medium">
              Personas were crafted using intelligence from over <span className="text-black font-bold">629 research touchpoints</span>, 258+ survey responses, focus groups, and user interviews.
            </p>
            <p className="text-[9px] leading-relaxed text-stone-400 mt-2 italic">
              These personas are bots using segmented data from the target audience throughout our research.
            </p>
          </div>
        </div>

        {/* Navigation / Mode Selection */}
        <div className="px-8 mb-4">
          <div className="flex p-1 bg-stone-100 rounded-xl border border-stone-200/50">
            <button
              onClick={() => handleModeSwitch(ChatMode.INDIVIDUAL)}
              className={`flex-1 flex items-center justify-center py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${
                mode === ChatMode.INDIVIDUAL 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <User className="w-3.5 h-3.5 mr-2" />
              Inquiry
            </button>
            <button
              onClick={() => handleModeSwitch(ChatMode.FOCUS_GROUP)}
              className={`flex-1 flex items-center justify-center py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${
                mode === ChatMode.FOCUS_GROUP 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Users className="w-3.5 h-3.5 mr-2" />
              Focus Group
            </button>
          </div>
        </div>

        {/* Persona Directory */}
        <div className="flex-1 overflow-y-auto px-8 py-2 space-y-4 no-scrollbar">
          <h2 className="text-[10px] font-bold uppercase text-stone-300 tracking-[0.25em] mb-4">
            Target Audience Segments
          </h2>
          
          {PERSONAS.map(persona => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              isSelected={
                mode === ChatMode.INDIVIDUAL 
                  ? selectedPersonaId === persona.id
                  : selectedGroupIds.includes(persona.id)
              }
              onToggle={handlePersonaToggle}
              multiSelect={mode === ChatMode.FOCUS_GROUP}
            />
          ))}
        </div>

        {/* System Actions */}
        <div className="p-8 border-t border-stone-100 space-y-3">
          <button 
            onClick={resetChat}
            className="w-full flex items-center justify-center px-4 py-3 border border-stone-200 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] text-stone-500 hover:bg-stone-50 hover:text-black hover:border-stone-400 transition-all active:scale-[0.98]"
          >
            <RotateCcw className="w-3 h-3 mr-2" />
            Reset Session
          </button>
        </div>
      </aside>

      {/* Main Experience Panel */}
      <main className="flex-1 h-full relative flex flex-col">
        
        {/* Editorial Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-stone-200 z-10 flex items-center px-10 justify-between">
          <div className="flex items-center gap-4">
             <div className="h-1.5 w-1.5 bg-black rounded-full animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.2)]" />
             <h2 className="text-[11px] font-bold text-black uppercase tracking-[0.2em]">
                {mode === ChatMode.INDIVIDUAL 
                    ? (selectedPersonaId ? `Active Inquiry: ${PERSONAS.find(p => p.id === selectedPersonaId)?.name}` : 'Select Segment')
                    : `Focus Group / ${selectedGroupIds.length} Participants`
                }
             </h2>
          </div>
          
          {messages.length > 0 && (
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-stone-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all active:scale-95 shadow-lg shadow-black/5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Data</span>
            </button>
          )}
        </header>

        <div className="flex-1">
          <ChatInterface 
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            mode={mode}
          />
        </div>
      </main>
    </div>
  );
}

export default App;