import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from "lucide-react";

const ProductCard = ({ title, desc, link, icon, gradient, status }) => {
  const isImageUrl = typeof icon === 'string';

  return (
    <motion.a 
      href={link}
      target={link.startsWith('http') ? "_blank" : "_self"}
      rel={link.startsWith('http') ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center bg-[#111111] border border-[#222] hover:bg-[#1a1a1a] hover:border-[#333] rounded-3xl p-8 w-full shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${gradient} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
      
      <div className={`bg-linear-to-br ${gradient} p-4 rounded-2xl mb-6 shadow-inner text-white flex items-center justify-center`}>
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

      <div className="flex items-center justify-center gap-2 mb-3">
        <h3 className="text-white font-bold text-xl tracking-tight">{title}</h3>
        {status && (
          <div className="relative group/tooltip">
            <AlertTriangle className="w-5 h-5 text-gray-500 hover:text-white transition-colors cursor-help" />
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#222] border border-[#333] text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition duration-200 pointer-events-none shadow-xl z-20">
              {status}
            </span>
          </div>
        )}
      </div>

      <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
        {desc}
      </p>
    </motion.a>
  );
};

export default ProductCard;