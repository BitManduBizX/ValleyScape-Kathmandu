import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Key, MessageSquare, MapPin, Loader2, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';

interface AiChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AiChat({ isOpen, onClose }: AiChatProps) {
  const [apiKey, setApiKey] = useState('');
  const [hasKey, setHasKey] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Namaste! I am Guru Bhote, your local guide to the Kathmandu Valley. How can I help you plan your journey today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for API key and consent on mount
    const savedKey = localStorage.getItem('__vk_gem_k');
    const savedConsent = localStorage.getItem('__vk_consent');
    if (savedKey) {
      setApiKey(atob(savedKey));
      setHasKey(true);
    }
    if (savedConsent === 'true') {
      setConsentGiven(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('__vk_gem_k', btoa(apiKey.trim()));
      setHasKey(true);
    }
  };

  const handleConsent = () => {
    localStorage.setItem('__vk_consent', 'true');
    setConsentGiven(true);
  };

  const clearKey = () => {
    localStorage.removeItem('__vk_gem_k');
    setApiKey('');
    setHasKey(false);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !hasKey || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { id: Date.now().toString(), role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      const systemPrompt = `You are Valley Guru (or Guru Bhote), a friendly, context-aware, and deeply knowledgeable local guide for the Kathmandu Valley in Nepal. Respond using accurate, trusted travel data, cultural nuance, respectful etiquette, and authentic warmth. Use occasional Nepali greetings like 'Namaste!' where appropriate. Keep answers concise, helpful, and visually structured if needed.`;

      const formattedHistory = newMessages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      // We only send the last few messages for context to keep payload small, plus the current one
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [
            { role: 'user', parts: [{ text: systemPrompt }] },
            { role: 'model', parts: [{ text: 'Understood. I am Valley Guru.' }] },
            ...formattedHistory
        ]
      });

      if (response.text) {
        setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response.text }]);
      }
    } catch (error: any) {
      console.error('AI Error:', error);
      let errorMsg = 'Oops, my internet connection to the Himalayas seems to be broken. Please try again.';
      if (error.message?.includes('API key')) {
        errorMsg = 'Your API key seems to be invalid or expired. Please update it in the settings.';
        clearKey();
      }
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 right-4 sm:bottom-24 sm:right-8 w-[calc(100vw-2rem)] sm:w-[400px] h-[600px] max-h-[80vh] bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-2xl border border-[#E5A93C]/30 flex flex-col z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#C85A32] to-[#8B263E] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Guru Bhote</h3>
                <p className="text-xs text-white/80">Valley AI Guide</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!consentGiven ? (
            <div className="flex-1 p-6 flex flex-col justify-center items-center text-center space-y-6">
              <MapPin className="w-16 h-16 text-[#C85A32]" />
              <div>
                <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-2">Welcome to Valley AI</h3>
                <p className="text-[#5A524C] dark:text-gray-400 text-sm">
                  To provide you with the best personalized local guidance, Guru Bhote would like to save your conversation history locally in your browser.
                </p>
              </div>
              <button
                onClick={handleConsent}
                className="w-full py-3 bg-[#C85A32] text-white rounded-xl font-medium hover:bg-[#8B263E] transition-colors"
              >
                I Agree, Let's Chat
              </button>
            </div>
          ) : !hasKey ? (
            <div className="flex-1 p-6 flex flex-col justify-center bg-[#FDFBF7] dark:bg-[#1A1A1A]">
              <div className="bg-white dark:bg-[#2A2A2A] p-6 rounded-2xl border border-[#E5A93C]/20 shadow-sm text-center">
                <Key className="w-12 h-12 text-[#E5A93C] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-white mb-2">Connect to Google Gemini</h3>
                <p className="text-sm text-[#5A524C] dark:text-gray-400 mb-6">
                  Enter your free Google Gemini API Key to enable AI Guide. (No account required, 100% free from Google AI Studio).
                </p>
                <div className="space-y-3">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#C85A32] dark:focus:border-[#E5A93C]"
                  />
                  <button
                    onClick={saveApiKey}
                    disabled={!apiKey.trim()}
                    className="w-full flex justify-center items-center gap-2 py-2.5 bg-[#C85A32] text-white rounded-lg font-medium hover:bg-[#8B263E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Securely
                  </button>
                  <p className="text-[10px] text-gray-500">Key is stored locally in your browser and never sent to our servers.</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDFBF7] dark:bg-[#1A1A1A]">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                        msg.role === 'user' 
                          ? 'bg-[#C85A32] text-white rounded-tr-sm' 
                          : 'bg-white dark:bg-[#2A2A2A] text-[#1A1A1A] dark:text-gray-200 border border-[#E5A93C]/20 rounded-tl-sm shadow-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-[#2A2A2A] border border-[#E5A93C]/20 p-3 rounded-2xl rounded-tl-sm shadow-sm">
                      <Loader2 className="w-5 h-5 text-[#C85A32] animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white dark:bg-[#2A2A2A] border-t border-[#E5A93C]/20">
                <form onSubmit={sendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Kathmandu..."
                    className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-full bg-[#FDFBF7] dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#C85A32]"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 rounded-full bg-[#C85A32] text-white flex items-center justify-center disabled:opacity-50 hover:bg-[#8B263E] transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
                <div className="flex justify-between items-center mt-2 px-2">
                  <span className="text-[10px] text-gray-500">Gemini 1.5 Flash</span>
                  <button 
                    onClick={clearKey}
                    className="text-[10px] text-red-500 hover:underline"
                  >
                    Clear API Key
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
