import React, { useState } from 'react';
import { Map, MapPin, Navigation, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import SafeImage from './SafeImage';

export default function DestinationsTab() {
  const [filter, setFilter] = useState('all');

  const places = [
    {
      id: 1,
      name: 'Kathmandu Durbar Square',
      district: 'kathmandu',
      desc: 'Historic seat of the former Kathmandu Kingdom, rich in traditional architecture.',
      type: 'Heritage',
      img: '/src/assets/images/patan_durbar_square_1791436949522.jpg',
      fallbackImg: 'https://picsum.photos/seed/kathmandu-durbar-square/600/400'
    },
    {
      id: 2,
      name: 'Patan Durbar Square',
      district: 'patan',
      desc: 'Marvel at the fine Newari architecture and the stunning Krishna Mandir.',
      type: 'Heritage',
      img: '/src/assets/images/patan_durbar_square_1791436949522.jpg',
      fallbackImg: 'https://picsum.photos/seed/patan-durbar-square/600/400'
    },
    {
      id: 3,
      name: 'Bhaktapur Durbar Square',
      district: 'bhaktapur',
      desc: 'A museum of medieval art and architecture with many examples of sculpture and woodcarving.',
      type: 'Heritage',
      img: 'https://picsum.photos/seed/bhaktapur-durbar-square/600/400',
      fallbackImg: 'https://picsum.photos/seed/bhaktapur-heritage/600/400'
    },
    {
      id: 4,
      name: 'Swayambhunath',
      district: 'kathmandu',
      desc: 'The Monkey Temple, offering panoramic views of the entire valley.',
      type: 'Temple',
      img: '/src/assets/images/swayambhunath_temple_1791436985637.jpg',
      fallbackImg: 'https://picsum.photos/seed/swayambhunath-monkey-temple/600/400'
    },
    {
      id: 5,
      name: 'Boudhanath Stupa',
      district: 'kathmandu',
      desc: 'One of the largest spherical stupas in Nepal and the world.',
      type: 'Stupa',
      img: '/src/assets/images/boudhanath_stupa_1791436937624.jpg',
      fallbackImg: 'https://picsum.photos/seed/boudhanath-stupa-nepal/600/400'
    },
    {
      id: 6,
      name: 'Pashupatinath Temple',
      district: 'kathmandu',
      desc: 'Sacred Hindu temple complex on the banks of the Bagmati River.',
      type: 'Temple',
      img: 'https://picsum.photos/seed/pashupatinath-bagmati/600/400',
      fallbackImg: 'https://picsum.photos/seed/pashupatinath-temple/600/400'
    },
    {
      id: 7,
      name: 'Chandragiri Hills',
      district: 'kathmandu',
      desc: 'Cable car ride offering sweeping views of the valley and the Himalayas.',
      type: 'Nature',
      img: '/src/assets/images/nagarkot_himalayas_1791436974184.jpg',
      fallbackImg: 'https://picsum.photos/seed/chandragiri-hills/600/400'
    },
    {
      id: 8,
      name: 'Nagarkot',
      district: 'bhaktapur',
      desc: 'Famous for its sunrise views of the Himalayas, including Mount Everest on clear days.',
      type: 'Nature',
      img: '/src/assets/images/nagarkot_himalayas_1791436974184.jpg',
      fallbackImg: 'https://picsum.photos/seed/nagarkot-sunrise/600/400'
    }
  ];

  const filteredPlaces = filter === 'all' ? places : places.filter(p => p.district === filter);

  const itineraries = [
    {
      title: "1-Day Heritage Tour",
      stops: ["Swayambhunath (Morning)", "Kathmandu Durbar Square", "Patan Durbar Square (Afternoon)", "Boudhanath (Evening)"]
    },
    {
      title: "3-Day Culture & Nature",
      stops: ["Day 1: KTM Heritage (Pashupatinath & Boudha)", "Day 2: Patan & Kirtipur Exploration", "Day 3: Bhaktapur & Nagarkot Sunset"]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#C85A32] dark:text-[#E5A93C] flex items-center gap-2">
          <Map className="w-8 h-8" />
          Destinations & Itineraries
        </h2>
        <p className="text-[#5A524C] dark:text-gray-400 mt-2 max-w-2xl">
          Navigate through ancient cities, sacred temples, and panoramic viewpoints.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {['all', 'kathmandu', 'patan', 'bhaktapur'].map((dist) => (
          <button
            key={dist}
            onClick={() => setFilter(dist)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
              filter === dist 
                ? 'bg-[#C85A32] text-white shadow-md' 
                : 'bg-white dark:bg-[#2A2A2A] text-[#5A524C] dark:text-gray-300 border border-[#E5A93C]/20 hover:bg-[#F7F2EA] dark:hover:bg-[#1A1A1A]'
            }`}
          >
            {dist === 'all' ? 'All Districts' : dist}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredPlaces.map((place) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                key={place.id}
                className="bg-white dark:bg-[#2A2A2A] rounded-xl overflow-hidden border border-[#E5A93C]/20 shadow-sm group hover:border-[#C85A32] transition-colors flex flex-col"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-[#F7F2EA] dark:bg-[#1A1A1A]">
                  <SafeImage
                    src={place.img}
                    fallbackSrc={place.fallbackImg}
                    alt={place.name}
                    fallbackLabel={place.name}
                    className="w-full h-full max-w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-[#1A1A1A] dark:text-white pr-4">{place.name}</h4>
                    <MapPin className="w-5 h-5 text-[#C85A32] opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <div className="text-xs text-[#E5A93C] uppercase tracking-wider mb-2 font-medium">
                    {place.type} • {place.district}
                  </div>
                  <p className="text-sm text-[#5A524C] dark:text-gray-400">
                    {place.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#6B5B95]" />
            Curated Itineraries
          </h3>
          
          <div className="space-y-4">
            {itineraries.map((itinerary, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[#FDFBF7] to-[#F7F2EA] dark:from-[#2A2A2A] dark:to-[#1A1A1A] rounded-2xl p-5 border border-[#E5A93C]/20 shadow-sm">
                <h4 className="font-bold text-lg text-[#C85A32] dark:text-[#E5A93C] mb-4">
                  {itinerary.title}
                </h4>
                <div className="space-y-3 relative before:absolute before:inset-0 before:ml-2 before:h-full before:w-0.5 before:bg-[#E5A93C]/30">
                  {itinerary.stops.map((stop, i) => (
                    <div key={i} className="relative flex items-center pl-6">
                      <div className="absolute left-1 w-2.5 h-2.5 rounded-full bg-[#C85A32] dark:bg-[#E5A93C] border-2 border-white dark:border-[#2A2A2A]"></div>
                      <p className="text-sm text-[#1A1A1A] dark:text-gray-300 font-medium">{stop}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-5 w-full flex items-center justify-center gap-2 py-2 bg-white dark:bg-black/30 border border-[#E5A93C]/20 rounded-lg text-sm font-medium text-[#C85A32] dark:text-[#E5A93C] hover:bg-[#F7F2EA] dark:hover:bg-black/50 transition-colors">
                  <Navigation className="w-4 h-4" />
                  View Route
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
