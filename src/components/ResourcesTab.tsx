import React, { useState } from 'react';
import { Info, Plane, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResourcesTab() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const tips = [
    { label: "Best Time to Visit", value: "Autumn (Sep-Nov) & Spring (Mar-May)" },
    { label: "Currency", value: "Nepalese Rupee (NPR)" },
    { label: "Transport Apps", value: "Pathao, InDrive (for Bikes/Cabs)" },
    { label: "SIM Cards", value: "Ncell or NTC (Available at Airport)" },
  ];

  const faqs = [
    {
      q: "Is Kathmandu part of Nepal?",
      a: "Yes, Kathmandu is the capital and largest city of Nepal, located in the central part of the country in a bowl-shaped valley."
    },
    {
      q: "What was the old name of Kathmandu?",
      a: "The historical name of the Kathmandu Valley was 'Nepal Mandala', and the city itself was often referred to as 'Kantipur'."
    },
    {
      q: "How to get around safely?",
      a: "Using ride-sharing apps like Pathao or InDrive is highly recommended for fair prices. Taxis are abundant but negotiate the fare before getting in if they refuse to use the meter."
    },
    {
      q: "What is the local etiquette?",
      a: "Greet with 'Namaste' bringing your palms together. Remove your shoes before entering temples or homes. Use your right hand for giving, taking, and eating."
    },
    {
      q: "Emergency Contacts",
      a: "Tourist Police: 1144, Standard Police: 100, Ambulance: 102."
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#C85A32] dark:text-[#E5A93C] flex items-center gap-2">
          <Info className="w-8 h-8" />
          Travel Resources
        </h2>
        <p className="text-[#5A524C] dark:text-gray-400 mt-2 max-w-2xl">
          Everything you need to know for a smooth and respectful journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-[#8B263E] text-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Plane className="w-5 h-5 text-[#E5A93C]" />
              Quick Checklist
            </h3>
            <div className="space-y-4">
              {tips.map((tip, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span className="text-white/80 text-sm">{tip.label}</span>
                  <span className="font-medium text-right">{tip.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#2A2A2A] p-6 rounded-2xl border border-[#E5A93C]/20 shadow-sm flex gap-4 items-start">
            <ShieldCheck className="w-8 h-8 text-[#C85A32] shrink-0" />
            <div>
              <h4 className="font-bold text-[#1A1A1A] dark:text-white mb-2">Safety & Altitude</h4>
              <p className="text-sm text-[#5A524C] dark:text-gray-400 leading-relaxed">
                Kathmandu is situated at an elevation of approximately 1,400 meters (4,600 feet). Altitude sickness is generally not an issue here, but pollution can be high in dry months. Wearing a mask is recommended when navigating dusty roads.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-4">Frequently Asked Questions</h3>
          
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-[#2A2A2A] border border-[#E5A93C]/20 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus:bg-[#F7F2EA]/50 dark:focus:bg-[#1A1A1A]/50 hover:bg-[#F7F2EA]/50 dark:hover:bg-[#1A1A1A]/50 transition-colors"
                >
                  <span className="font-medium text-[#1A1A1A] dark:text-white">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#C85A32]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#5A524C] dark:text-gray-500" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-sm text-[#5A524C] dark:text-gray-400 leading-relaxed pt-2 border-t border-[#E5A93C]/10">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
