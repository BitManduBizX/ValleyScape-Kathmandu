import React, { useState } from 'react';
import { ImageIcon, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeImage from './SafeImage';
import {
  boudhanathStupaImg,
  nagarkotHimalayasImg,
  patanDurbarSquareImg,
  newariFeastFoodImg,
  swayambhunathTempleImg,
} from '../assets/images';

export default function GalleryTab() {
  const [filter, setFilter] = useState('all');

  const photos = [
    {
      id: 1,
      category: 'heritage',
      url: boudhanathStupaImg,
      fallbackUrl: 'https://picsum.photos/seed/boudhanath-stupa/800/1000',
      title: 'Boudhanath Stupa'
    },
    {
      id: 2,
      category: 'nature',
      url: nagarkotHimalayasImg,
      fallbackUrl: 'https://picsum.photos/seed/nagarkot-himalayas/800/1000',
      title: 'Himalayan View from Nagarkot'
    },
    {
      id: 3,
      category: 'heritage',
      url: patanDurbarSquareImg,
      fallbackUrl: 'https://picsum.photos/seed/patan-durbar-square/800/1000',
      title: 'Patan Durbar Square'
    },
    {
      id: 4,
      category: 'food',
      url: newariFeastFoodImg,
      fallbackUrl: 'https://picsum.photos/seed/newari-feast-food/800/1000',
      title: 'Newari Feast (Samay Baji)'
    },
    {
      id: 5,
      category: 'heritage',
      url: swayambhunathTempleImg,
      fallbackUrl: 'https://picsum.photos/seed/swayambhunath-temple/800/1000',
      title: 'Swayambhunath Architecture'
    },
    {
      id: 6,
      category: 'festivals',
      url: 'https://picsum.photos/seed/indra-jatra-kathmandu/800/1000',
      fallbackUrl: 'https://picsum.photos/seed/nepal-festival/800/1000',
      title: 'Indra Jatra Festival'
    },
    {
      id: 7,
      category: 'nature',
      url: 'https://picsum.photos/seed/chandragiri-hills-nepal/800/1000',
      fallbackUrl: 'https://picsum.photos/seed/nepal-hills/800/1000',
      title: 'Chandragiri Cable Car'
    },
    {
      id: 8,
      category: 'heritage',
      url: 'https://picsum.photos/seed/pashupatinath-temple-nepal/800/1000',
      fallbackUrl: 'https://picsum.photos/seed/nepal-heritage/800/1000',
      title: 'Pashupatinath Temple'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'heritage', label: 'Heritage' },
    { id: 'nature', label: 'Nature' },
    { id: 'food', label: 'Food' },
    { id: 'festivals', label: 'Festivals' }
  ];

  const filteredPhotos = filter === 'all' ? photos : photos.filter(p => p.category === filter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#C85A32] dark:text-[#E5A93C] flex items-center gap-2">
            <ImageIcon className="w-8 h-8" />
            Visual Journey
          </h2>
          <p className="text-[#5A524C] dark:text-gray-400 mt-2 max-w-2xl">
            A glimpse into the colors, architecture, and life of the valley.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#F7F2EA] dark:bg-[#2A2A2A] p-1.5 rounded-xl overflow-x-auto max-w-full">
          <Filter className="w-4 h-4 text-[#5A524C] ml-2 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === cat.id 
                  ? 'bg-white dark:bg-[#1A1A1A] text-[#C85A32] shadow-sm' 
                  : 'text-[#5A524C] dark:text-gray-400 hover:bg-white/50 dark:hover:bg-[#1A1A1A]/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredPhotos.map((photo) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={photo.id}
              className="group relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-[#F7F2EA] dark:bg-[#2A2A2A] border border-[#E5A93C]/20"
            >
              <SafeImage 
                src={photo.url} 
                fallbackSrc={photo.fallbackUrl}
                alt={photo.title} 
                fallbackLabel={photo.title}
                className="w-full h-full max-w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                <div>
                  <span className="text-xs font-medium text-[#E5A93C] uppercase tracking-wider mb-1 block">
                    {photo.category}
                  </span>
                  <h4 className="text-white font-bold">{photo.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
