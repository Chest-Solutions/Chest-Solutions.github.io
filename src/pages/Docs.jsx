import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight, Book } from "lucide-react";

const DocRow = ({ title, desc, link, icon, gradient, status, delay }) => {
  const isImageUrl = typeof icon === 'string';

  return (
    <motion.a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative flex items-center gap-6 p-6 rounded-2xl bg-[#111] border border-[#222] hover:bg-[#161616] hover:border-[#333] transition-all duration-300 w-full overflow-hidden"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b ${gradient} opacity-60 group-hover:opacity-100 transition-opacity`}></div>

      <div className="shrink-0 relative">
        <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${gradient} p-px flex items-center justify-center shadow-lg`}>
           <div className="w-full h-full bg-[#111] rounded-xl flex items-center justify-center overflow-hidden">
              {isImageUrl ? (
                <img src={icon} alt={title} className="w-10 h-10 object-contain" />
              ) : (
                <div className="text-white">{icon}</div>
              )}
           </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{title}</h3>
          {status && (
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-white/10 bg-white/5 text-gray-400`}>
              {status}
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm leading-relaxed truncate sm:whitespace-normal sm:overflow-visible line-clamp-2 sm:line-clamp-1">
          {desc}
        </p>
      </div>

      <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-white/5 bg-white/5 group-hover:bg-white/10 group-hover:scale-110 transition-all">
        <ChevronRight className="text-gray-400 group-hover:text-white" size={20} />
      </div>
    </motion.a>
  );
};

const Docs = () => (
  <div className="pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-8"
    >
      <div>
        <h2 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3">
          Documentation
        </h2>
        <p className="text-gray-400 text-lg">Here you can learn about our software's usage, developer api, etc...</p>
      </div>
    </motion.div>

    <div className="space-y-4">
      <DocRow  // They still dont work anmvc. fixy fixies pleasies?
        title="FoliaMines"
        desc="FoliaMines is a minecraft mines plugin designed for folia, FoliaMines is a fast, light-weight, easy to use Mod"
        link="http://localhost:4321/foliamines"
        gradient="from-[#3a84f6] to-[#25cbef]"
        status="Beta"
        icon="/plugins/foliamines.png"
        delay={0.1}
      />
      <DocRow 
        title="RinoAC"
        desc="RinoAC is a minecraft anti-cheat plugin based on GrimAC, Designed to have little to no False positives"
        link="http://localhost:4321/rinoac"
        gradient="from-[#f6853a] to-[#efa825]"
        status="WIP"
        icon="/plugins/rinoac2.png"
        delay={0.2}
      />
    </div>
  </div>
);

export default Docs;