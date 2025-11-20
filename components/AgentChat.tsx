import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToAgent } from '../services/geminiService';

export const AgentChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Yo! I'm A-BOT ⚡. Ayush is probably editing or exploring AI tools right now. How can I help you?", timestamp: Date.now() }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const historyForApi = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await sendMessageToAgent(historyForApi, input);

    const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-neon-lime text-black p-4 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
      >
        <MessageSquare className="w-5 h-5" />
        <span>HIRE_ME // CHAT</span>
      </button>
    );
  }

  return (
    <div className={`fixed z-50 transition-all duration-300 ease-in-out border-2 border-zinc-800 bg-zinc-900/95 backdrop-blur-md shadow-[0_0_30px_rgba(204,255,0,0.15)]
      ${isMinimized ? 'bottom-8 right-8 w-72 h-14 overflow-hidden' : 'bottom-8 right-8 w-[90vw] md:w-96 h-[500px]'}
    `}>
      {/* Window Header */}
      <div className="flex items-center justify-between p-3 bg-zinc-950 border-b border-zinc-800 cursor-move">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon-lime animate-pulse"></div>
          <span className="font-mono text-xs text-neon-lime tracking-widest">A-BOT_AGENT v3.0</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-500">
          <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-white">
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="hover:text-white">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      {!isMinimized && (
        <>
          <div className="flex-1 h-[380px] overflow-y-auto p-4 space-y-4 font-mono text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 ${
                  msg.role === 'user' 
                    ? 'bg-zinc-800 text-white border border-zinc-700 rounded-l-lg rounded-tr-lg' 
                    : 'bg-neon-lime/10 text-neon-lime border border-neon-lime/30 rounded-r-lg rounded-tl-lg'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
               <div className="max-w-[80%] p-3 bg-neon-lime/5 border border-neon-lime/20 rounded-r-lg rounded-tl-lg flex items-center gap-2">
                 <Loader2 className="animate-spin w-4 h-4 text-neon-lime" />
                 <span className="text-xs text-neon-lime/50">Thinking...</span>
               </div>
             </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="absolute bottom-0 left-0 w-full p-3 bg-zinc-950 border-t border-zinc-800 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Ayush..."
              className="flex-1 bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-sm focus:outline-none focus:border-neon-lime font-mono placeholder-zinc-600"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-neon-lime text-black p-2 hover:bg-white transition-colors disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};