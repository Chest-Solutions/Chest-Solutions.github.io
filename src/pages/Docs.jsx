import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronRight, Book } from "lucide-react";

const DocRow = ({ title, desc, link, icon, gradient, status, delay }) => {
  const isImageUrl = typeof icon === 'string';
  
  return (
    <motion.a 
      href={link}
      target={link.startsWith('http') ? "_blank" : "_self"}
      rel={link.startsWith('http') ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0, ease: [0.16, 1, 0.3, 1], delay }}
      className="group relative flex items-center gap-6 p-6 rounded-3xl overflow-hidden transition-all duration-300 w-full"
      style={{
        background: `linear-gradient(135deg, ${gradient.split(' ')[0].replace('from-[', '').replace(']', '')}20 0%, transparent 60%)`,
      }}
    >
      <div 
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ 
          background: `linear-gradient(to right, ${gradient.split(' ')[0].replace('from-[', '').replace(']', '')}, ${gradient.split(' ')[1].replace('to-[', '').replace(']', '')})` 
        }}
      />
      
      <div 
        className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ 
          background: `linear-gradient(135deg, ${gradient.split(' ')[0].replace('from-[', '').replace(']', '')}, transparent)`,
        }}
      />
      
      <div className="shrink-0 relative z-10">
        <div 
          className="w-16 h-16 rounded-xl p-px flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${gradient.split(' ')[0].replace('from-[', '').replace(']', '')}, ${gradient.split(' ')[1].replace('to-[', '').replace(']', '')})`,
          }}
        >
           <div className="w-full h-full bg-[#111] rounded-xl flex items-center justify-center overflow-hidden">
              {isImageUrl ? (
                <img src={icon} alt={title} className="w-10 h-10 object-contain" />
              ) : (
                <div className="text-white">{icon}</div>
              )}
           </div>
        </div>
      </div>
      
      <div className="flex-1 min-w-0 z-10">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-xl font-bold text-white transition-colors">{title}</h3>
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
      
      <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-white/5 bg-white/5 group-hover:bg-white/10 group-hover:scale-110 transition-all z-10">
        <ChevronRight className="text-gray-400 group-hover:text-white" size={20} />
      </div>
    </motion.a>
  );
};

const Docs = () => (
  <div className="pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto min-h-screen">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DocRow 
        title="FoliaMines"
        desc="FoliaMines is a minecraft mines plugin designed for folia, FoliaMines is a fast, light-weight, easy to use Mod"
        link="/docs/foliamines"
        gradient="from-[#3a84f6] to-[#25cbef]"
        status="Beta"
        icon="/plugins/foliamines.png"
        delay={0.1}
      />
      <DocRow 
        title="RinoAC"
        desc="RinoAC is a minecraft anti-cheat plugin based on GrimAC, Designed to have little to no False positives"
        link="/docs/rinoac"
        gradient="from-[#f6853a] to-[#efa825]"
        status="WIP"
        icon="/plugins/rinoac2.png"
        delay={0.15}
      />
    </div>
  </div>
);

export default Docs;