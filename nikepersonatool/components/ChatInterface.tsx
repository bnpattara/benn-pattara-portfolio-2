import React, { useEffect, useRef } from 'react';
import { Message, ChatMode } from '../types';
import { PERSONAS } from '../constants';
import { Send, Target } from 'lucide-react';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  mode: ChatMode;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading, mode }) => {
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const getPersonaImage = (name?: string) => {
    if (!name) return null;
    return PERSONAS.find(p => p.name.toUpperCase() === name.toUpperCase())?.imageUrl;
  };

  return (
    <div className="flex flex-col h-full bg-stone-100/50">
      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-stone-400 text-center px-12 space-y-6">
            <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm">
              <Target className="w-8 h-8 text-black opacity-40" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-black mb-2">Awaiting Parameters</h2>
              <p className="text-xs font-medium leading-relaxed max-w-xs text-stone-500 uppercase tracking-widest">
                Select a target audience segment to begin extraction of qualitative insights.
              </p>
            </div>
          </div>
        )}
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end gap-3 max-w-[90%] sm:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar for Model */}
              {msg.role === 'model' && (
                <div className="h-8 w-8 rounded-full overflow-hidden border border-stone-200 bg-white flex-shrink-0 mb-1">
                  {getPersonaImage(msg.senderName) ? (
                    <img src={getPersonaImage(msg.senderName)!} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-[10px] font-bold">NS</div>
                  )}
                </div>
              )}

              <div className="flex flex-col">
                {msg.senderName && (
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-1 ml-1">
                    {msg.senderName}
                  </span>
                )}
                <div
                  className={`
                    p-5 rounded-2xl text-[13px] leading-relaxed tracking-wide
                    ${msg.role === 'user' 
                      ? 'bg-black text-white rounded-br-none shadow-none' 
                      : 'bg-white border border-stone-200 text-stone-800 rounded-bl-none shadow-none'
                    }
                  `}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
                <div className={`text-[8px] mt-1.5 uppercase tracking-[0.2em] font-bold opacity-30 ${msg.role === 'user' ? 'text-right mr-1' : 'ml-1'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="flex items-center gap-2 px-5 py-3 bg-white border border-stone-200 rounded-2xl rounded-bl-none">
              <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-stone-200">
        <form onSubmit={handleSubmit} className="relative flex items-center max-w-3xl mx-auto group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === ChatMode.FOCUS_GROUP ? "INQUIRE THE GROUP..." : "PROBE THE RESEARCHER..."}
            className="w-full py-5 pl-6 pr-14 bg-stone-100 border border-stone-200 rounded-xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all placeholder:text-stone-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-3 p-2.5 bg-black text-white rounded-lg disabled:opacity-20 hover:bg-stone-800 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-[9px] text-stone-300 font-bold uppercase tracking-[0.3em]">
            POWERED BY NIKE BRAND INTEL ENGINE
          </p>
        </div>
      </div>
    </div>
  );
};