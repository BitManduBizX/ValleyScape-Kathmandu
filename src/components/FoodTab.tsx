import React from 'react';
import { UtensilsCrossed, Star, Coffee, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import SafeImage from './SafeImage';

export default function FoodTab() {
  const dishes = [
    {
      name: 'Momo',
      desc: 'Steamed or fried dumplings filled with meat or vegetables, served with a spicy tomato-based achaar (pickle).',
      tag: 'Iconic',
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
    },
    {
      name: 'Dal Bhat Tarkari',
      desc: 'The staple meal: lentil soup (dal), boiled rice (bhat), and curried vegetables (tarkari). "Dal Bhat power, 24 hour!"',
      tag: 'Staple',
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    },
    {
      name: 'Samay Baji',
      desc: 'A traditional Newari feast platter featuring beaten rice, choila, black soybeans, spicy potato, and bara.',
      tag: 'Traditional',
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    },
    {
      name: 'Yomari',
      desc: 'A steamed dumpling with an external covering of rice flour and an inner content of sweet substances such as chaku.',
      tag: 'Sweet',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    },
    {
      name: 'Choila',
      desc: 'A typical Newari dish that consists of spiced grilled buffalo meat. Extremely spicy and flavorful.',
      tag: 'Spicy',
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    },
    {
      name: 'Laphing',
      desc: 'A spicy cold mung bean noodle dish with Tibetan roots, extremely popular around the Boudhanath Stupa area.',
      tag: 'Street Food',
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
    }
  ];

  const guides = [
    {
      title: 'Patan / Asan Newari Joints',
      desc: 'Explore hidden alleys (gallis) for the best Bara, Choila, and Chhyang (rice beer). Look for "Honacha" in Patan Durbar Square.',
    },
    {
      title: 'Boudha Road Laphing',
      desc: 'The circular road around Boudhanath Stupa is the Laphing capital. Try both dry and soup versions (spicy!).',
    },
    {
      title: 'Thamel Dining',
      desc: 'A mix of traditional Nepali thali places and international cuisine. Perfect for a relaxed evening with live music.',
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#C85A32] dark:text-[#E5A93C] flex items-center gap-2">
          <UtensilsCrossed className="w-8 h-8" />
          Culinary Guide
        </h2>
        <p className="text-[#5A524C] dark:text-gray-400 mt-2 max-w-2xl">
          From street corners to traditional feasts, explore the rich and diverse flavors of the Kathmandu Valley.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-[#E5A93C]" />
            Signature Dishes
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {dishes.map((dish, idx) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                key={idx} 
                className="bg-white dark:bg-[#2A2A2A] p-5 rounded-2xl border border-[#E5A93C]/20 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-lg dark:text-white">{dish.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${dish.color}`}>
                    {dish.tag}
                  </span>
                </div>
                <p className="text-sm text-[#5A524C] dark:text-gray-300 leading-relaxed">
                  {dish.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <Coffee className="w-5 h-5 text-[#C85A32]" />
            Food Scene Highlights
          </h3>
          
          <div className="bg-gradient-to-b from-[#F7F2EA] to-[#FDFBF7] dark:from-[#2A2A2A] dark:to-[#1A1A1A] p-6 rounded-2xl border border-[#E5A93C]/30 shadow-inner space-y-6">
            <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#E5A93C]/20">
              <SafeImage
                src="/src/assets/images/newari_feast_food_1791436960436.jpg"
                fallbackSrc="https://picsum.photos/seed/nepali-momo-feast/800/500"
                alt="Traditional Newari Feast & Momo"
                fallbackLabel="Traditional Newari Cuisine"
                className="w-full h-full max-w-full object-cover"
                loading="lazy"
              />
            </div>
            {guides.map((guide, idx) => (
              <div key={idx} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-[#C85A32] before:rounded-full">
                <h5 className="font-bold text-[#1A1A1A] dark:text-white mb-1">{guide.title}</h5>
                <p className="text-sm text-[#5A524C] dark:text-gray-400">{guide.desc}</p>
              </div>
            ))}
            
            <div className="mt-4 p-4 bg-white/60 dark:bg-black/20 rounded-xl border border-[#E5A93C]/20 backdrop-blur-sm flex gap-3">
              <Info className="w-5 h-5 text-[#6B5B95] shrink-0 mt-0.5" />
              <p className="text-xs text-[#5A524C] dark:text-gray-300">
                <strong>Local Tip:</strong> Most traditional Newari restaurants (Bhojanalayas) have a separate kitchen for cooking meat to respect dietary boundaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
