import React from 'react';
import { BookOpen, Clock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import SafeImage from './SafeImage';
import { swayambhunathTempleImg } from '../assets/images';

export default function HistoryTab() {
  const [lang, setLang] = React.useState<'en'|'ne'>('en');

  const content = {
    en: {
      title: "History & Heritage",
      desc: "Discover the ancient roots of the Kathmandu Valley, a place where myth and history intertwine.",
      mythTitle: "The Lake Origin Myth",
      mythDesc: "According to legend, the Kathmandu Valley was once a vast pristine lake known as Nagdaha. The Bodhisattva Manjushri traveled from afar, saw a magnificent lotus radiating in the center of the lake, and used his flaming sword, Chandrahrasa, to cut a gorge at Chhobhar. The waters drained away, leaving behind a fertile valley where civilization flourished.",
      timelineTitle: "Historical Timeline",
      timeline: [
        { year: "Pre-historic", event: "The draining of Nagdaha by Manjushri." },
        { year: "400 - 750 CE", event: "Licchavi Era. Flourishing of art and architecture. First inscriptions found at Changu Narayan." },
        { year: "1200 - 1769 CE", event: "Malla Era. The Golden Age of Newari art, culture, and architecture. The valley is divided into three kingdoms: Kantipur (Kathmandu), Lalitpur (Patan), and Bhaktapur." },
        { year: "1769 CE", event: "Prithvi Narayan Shah conquers the valley, unifying modern Nepal and establishing Kathmandu as its capital." },
      ],
      stats: [
        { label: "Area", value: "933.73 sq km" },
        { label: "Population", value: "~3+ Million" },
        { label: "Highest Peak", value: "Phulchowki (2,782m)" },
        { label: "Districts", value: "Kathmandu, Lalitpur, Bhaktapur" }
      ]
    },
    ne: {
      title: "इतिहास र सम्पदा",
      desc: "काठमाडौँ उपत्यकाको प्राचीन जरा पत्ता लगाउनुहोस्, जहाँ मिथक र इतिहास जोडिन्छन्।",
      mythTitle: "तालको उत्पत्तिको मिथक",
      mythDesc: "पौराणिक कथा अनुसार काठमाडौं उपत्यका कुनै समय नागदह नामक विशाल ताल थियो। मञ्जुश्रीले चोभारमा आफ्नो तरवारले प्रहार गरी पानी निकास गरेपछि यो उर्वर उपत्यकाको रूपमा विकास भयो।",
      timelineTitle: "ऐतिहासिक कालक्रम",
      timeline: [
        { year: "प्रागैतिहासिक", event: "मञ्जुश्रीद्वारा नागदहको पानी निकास।" },
        { year: "४०० - ७५० ई.", event: "लिच्छवि काल। कला र वास्तुकलाको विकास। चाँगुनारायणमा पहिलो शिलालेख फेला परेको।" },
        { year: "१२०० - १७६९ ई.", event: "मल्ल काल। नेवारी कला, संस्कृति र वास्तुकलाको स्वर्ण युग। उपत्यका तीन राज्यमा विभाजित: कान्तिपुर, ललितपुर र भक्तपुर।" },
        { year: "१७६९ ई.", event: "पृथ्वीनारायण शाहद्वारा उपत्यका विजय र आधुनिक नेपालको एकीकरण।" },
      ],
      stats: [
        { label: "क्षेत्रफल", value: "९३३.७३ वर्ग किमी" },
        { label: "जनसंख्या", value: "~३+ मिलियन" },
        { label: "अग्लो चुचुरो", value: "फुल्चोकी (२,७८२ मिटर)" },
        { label: "जिल्लाहरू", value: "काठमाडौं, ललितपुर, भक्तपुर" }
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="space-y-8">
      {/* Header section with toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#C85A32] dark:text-[#E5A93C] flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            {t.title}
          </h2>
          <p className="text-[#5A524C] dark:text-gray-400 mt-2 max-w-2xl">{t.desc}</p>
        </div>
        
        <div className="flex bg-[#F7F2EA] dark:bg-[#2A2A2A] rounded-lg p-1 border border-[#E5A93C]/20">
          <button
            onClick={() => setLang('en')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${lang === 'en' ? 'bg-white dark:bg-[#1A1A1A] text-[#C85A32] shadow-sm' : 'text-[#5A524C] dark:text-gray-400'}`}
          >
            English
          </button>
          <button
            onClick={() => setLang('ne')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${lang === 'ne' ? 'bg-white dark:bg-[#1A1A1A] text-[#C85A32] shadow-sm' : 'text-[#5A524C] dark:text-gray-400'}`}
          >
            नेपाली
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {t.stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="bg-white dark:bg-[#2A2A2A] p-4 rounded-xl border border-[#E5A93C]/20 shadow-sm"
          >
            <div className="text-xs text-[#5A524C] dark:text-gray-400 uppercase tracking-wider mb-1">{stat.label}</div>
            <div className="text-lg font-semibold text-[#1A1A1A] dark:text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Myth Section */}
        <div className="bg-white dark:bg-[#2A2A2A] p-6 rounded-2xl border border-[#E5A93C]/20 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-4 text-[#6B5B95]">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3 dark:text-white">{t.mythTitle}</h3>
          <p className="text-[#5A524C] dark:text-gray-300 leading-relaxed">
            {t.mythDesc}
          </p>
          <div className="mt-6 aspect-video bg-[#F7F2EA] dark:bg-[#1A1A1A] rounded-xl flex items-center justify-center border border-[#E5A93C]/20 overflow-hidden relative">
            <SafeImage
              src={swayambhunathTempleImg}
              fallbackSrc="https://picsum.photos/seed/chhobhar-gorge-kathmandu/800/450"
              alt="Ancient Kathmandu Valley & Swayambhunath Hill"
              fallbackLabel="Chhobhar Gorge & Ancient Valley"
              className="w-full h-full max-w-full object-cover"
              loading="lazy"
            />
            <span className="text-xs text-[#1A1A1A] dark:text-white font-medium z-10 bg-white/85 dark:bg-black/65 px-3 py-1 rounded-full backdrop-blur-sm absolute bottom-3 left-3 border border-[#E5A93C]/30">
              Chhobhar Gorge & Swayambhunath Hill
            </span>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white dark:bg-[#2A2A2A] p-6 rounded-2xl border border-[#E5A93C]/20 shadow-sm">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center mb-4 text-[#C85A32]">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-6 dark:text-white">{t.timelineTitle}</h3>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#E5A93C] before:via-[#C85A32] before:to-transparent">
            {t.timeline.map((item, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#2A2A2A] bg-[#C85A32] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-[#E5A93C]/20 bg-[#FDFBF7] dark:bg-[#1A1A1A] shadow-sm">
                  <div className="font-bold text-[#C85A32] mb-1">{item.year}</div>
                  <div className="text-sm text-[#5A524C] dark:text-gray-300">{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
