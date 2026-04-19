import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from "lucide-react";

const ProductCard = ({ title, desc, link, icon, color, status }) => {
  const isImageUrl = typeof icon === 'string';
  
  return (
    <motion.a 
      href={link}
      target={link.startsWith('http') ? "_blank" : "_self"}
      rel={link.startsWith('http') ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0 }}
      className="flex flex-col items-center text-center rounded-3xl p-8 w-full shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
      style={{
        background: `linear-gradient(to top, ${color}15, transparent 200px)`,
      }}
    >
      <div 
        className="absolute top-0 left-0 w-full h-1 opacity-50 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
      />
      
      <div 
        className="absolute w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"
        style={{ 
          backgroundColor: color,
          bottom: '5%',
          left: '10%',
        }}
      />
      <div 
        className="absolute w-24 h-24 rounded-full blur-[50px] opacity-15 group-hover:opacity-25 transition-opacity"
        style={{ 
          backgroundColor: color,
          top: '20%',
          right: '5%',
        }}
      />
      
      <div 
        className="p-4 rounded-2xl mb-6 shadow-inner text-white flex items-center justify-center relative z-10"
        style={{
          background: `linear-gradient(135deg, ${color}40, ${color}20)`,
          boxShadow: `0 4px 20px ${color}30`,
        }}
      >
        {isImageUrl ? (
          <img 
            src={icon} 
            alt={`${title} icon`} 
            className="w-6 h-6 object-contain" 
          />
        ) : (
          <div className="flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-center gap-2 mb-3 relative z-10">
        <h3 
          className="font-bold text-xl tracking-tight"
          style={{ color: '#fff' }}
        >
          {title}
        </h3>
        {status && (
          <div className="relative group/tooltip">
            <AlertTriangle className="w-5 h-5 text-gray-500 hover:text-white transition-colors cursor-help" />
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#222] border border-[#333] text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition duration-200 pointer-events-none shadow-xl z-20">
              {status}
            </span>
          </div>
        )}
      </div>
      
      <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto relative z-10">
        {desc}
      </p>
    </motion.a>
  );
};

export default ProductCard;