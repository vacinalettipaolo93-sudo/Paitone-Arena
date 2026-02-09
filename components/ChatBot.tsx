
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Benvenuto a Paitone Arena! Sono il tuo assistente dedicato. Come posso aiutarti oggi?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const response = await getGeminiResponse(inputValue);
    const botMsg: ChatMessage = { role: 'model', text: response };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-80 md:w-96 h-[500px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-300">
          {/* Header */}
          <div className="bg-[#5C6B89] p-5 flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#A8D695] flex items-center justify-center">
                <i className="fas fa-baseball-ball text-sm text-[#A8D695]"></i>
              </div>
              <div>
                <p className="font-bold text-sm leading-none">Arena Assistant</p>
                <p className="text-[10px] opacity-70">Sempre Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-300">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-[#5C6B89] text-white rounded-br-none' 
                  : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-[#A8D695] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#A8D695] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#A8D695] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Come posso aiutarti?"
                className="flex-1 bg-gray-50 p-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#A8D695]/50 border border-gray-200"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-[#A8D695] text-white w-12 h-12 rounded-2xl hover:bg-[#97c584] transition shadow-lg shadow-[#A8D695]/20 disabled:opacity-50"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#5C6B89] text-white w-16 h-16 rounded-3xl shadow-2xl flex items-center justify-center hover:scale-105 transition-all active:scale-95 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <i className="fas fa-comment-dots text-2xl relative z-10"></i>
          <span className="absolute top-2 right-2 bg-[#A8D695] w-3 h-3 rounded-full border-2 border-[#5C6B89]"></span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
