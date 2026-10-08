import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageSquare, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Namaste! I am Guru Bhote, your local guide to the Kathmandu Valley. How can I help you plan your journey today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Read environment configuration safely without hardcoding any keys
  const envApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  useEffect(() => {
    const savedConsent = localStorage.getItem('__vk_consent');
    const savedHistory = localStorage.getItem('__vk_chat_history');
    if (savedConsent === 'true') {
      setConsentGiven(true);
    }
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      } catch {
        // Ignore corrupted history
      }
    }
  }, []);

  useEffect(() => {
    if (consentGiven && messages.length > 1) {
      localStorage.setItem('__vk_chat_history', JSON.stringify(messages));
    }
  }, [messages, consentGiven]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleConsent = () => {
    localStorage.setItem('__vk_consent', 'true');
    setConsentGiven(true);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages: Message[] = [
      ...messages,
      { id: Date.now().toString(), role: 'user', content: userMsg },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(envApiKey ? { 'X-Client-Env-Configured': 'true' } : {}),
        },
        body: JSON.stringify({
          messages: newMessages.slice(-10),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to reach AI guide.');
      }

      if (data.text) {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), role: 'assistant', content: data.text },
        ]);
      }
    } catch (error: any) {
      console.error('AI Error:', error);
      const errorMsg =
        error?.message ||
        'Oops, my connection to the Himalayas encountered a temporary hiccup. Please try again.';
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: errorMsg },
      ]);
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
                <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-2">
                  Welcome to Valley AI
                </h3>
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
                      className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
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
                  <span className="text-[10px] text-gray-500">Valley AI Guide</span>
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
