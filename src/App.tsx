import React, { useState, useEffect } from 'react';
import { Compass, Utensils, MapPin, Info, Image as ImageIcon, Moon, Sun, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import HistoryTab from './components/HistoryTab';
import FoodTab from './components/FoodTab';
import DestinationsTab from './components/DestinationsTab';
import ResourcesTab from './components/ResourcesTab';
import GalleryTab from './components/GalleryTab';
import AiChat from './components/AiChat';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [activeTab, setActiveTab] = useState('history');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const tabs = [
    { id: 'history', label: 'History', icon: Compass },
    { id: 'food', label: 'Food', icon: Utensils },
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'resources', label: 'Resources', icon: Info },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1A1A1A] text-[#1A1A1A] dark:text-[#FDFBF7] transition-colors duration-300 font-sans pb-24 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/80 dark:bg-[#1A1A1A]/80 backdrop-blur-md border-b border-[#E5A93C]/20 dark:border-[#E5A93C]/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('history')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C85A32] to-[#8B263E] flex items-center justify-center text-white font-bold shadow-lg shadow-[#C85A32]/20">
                VS
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C85A32] to-[#8B263E] dark:from-[#E5A93C] dark:to-[#C85A32]">
                  ValleyScape
                </h1>
                <p className="text-[10px] text-[#5A524C] dark:text-gray-400 font-medium uppercase tracking-wider">
                  Kathmandu
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <nav className="hidden md:flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "px-4 py-2 rounded-lg flex items-center space-x-2 text-sm font-medium transition-all",
                        activeTab === tab.id 
                          ? "bg-[#C85A32]/10 dark:bg-[#C85A32]/20 text-[#C85A32] dark:text-[#E5A93C]" 
                          : "text-[#5A524C] dark:text-gray-400 hover:bg-[#F7F2EA] dark:hover:bg-[#2A2A2A] hover:text-[#1A1A1A] dark:hover:text-[#FDFBF7]"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-[#F7F2EA] dark:bg-[#2A2A2A] text-[#5A524C] dark:text-gray-300 hover:text-[#C85A32] dark:hover:text-[#E5A93C] transition-colors"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'history' && <HistoryTab />}
            {activeTab === 'food' && <FoodTab />}
            {activeTab === 'destinations' && <DestinationsTab />}
            {activeTab === 'resources' && <ResourcesTab />}
            {activeTab === 'gallery' && <GalleryTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/90 dark:bg-[#1A1A1A]/90 backdrop-blur-lg border-t border-[#E5A93C]/20 dark:border-white/10 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <div className="flex justify-around p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-col items-center p-2 rounded-xl min-w-[4rem] transition-all",
                  isActive 
                    ? "text-[#C85A32] dark:text-[#E5A93C]" 
                    : "text-[#5A524C] dark:text-gray-400 hover:text-[#C85A32] dark:hover:text-gray-200"
                )}
              >
                <div className={cn(
                  "p-1 rounded-full mb-1 transition-all",
                  isActive && "bg-[#C85A32]/10 dark:bg-[#C85A32]/20"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Floating AI Chat Launcher */}
      <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50">
        <AnimatePresence>
          {!isChatOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsChatOpen(true)}
              className="group flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#C85A32] to-[#8B263E] text-white rounded-full shadow-lg shadow-[#C85A32]/30 hover:shadow-xl hover:shadow-[#C85A32]/40 transition-all"
            >
              <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
              
              {/* Tooltip badge */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E5A93C] border-2 border-[#FDFBF7] dark:border-[#1A1A1A] rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E5A93C] border-2 border-[#FDFBF7] dark:border-[#1A1A1A] rounded-full"></span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* AI Chat Drawer / Modal */}
      <AiChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

    </div>
  );
}
