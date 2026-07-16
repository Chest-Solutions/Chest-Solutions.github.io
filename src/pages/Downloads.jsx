import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { BookOpen, Shield, Bomb, X, Download, ChevronDown } from "lucide-react";

const mockData = {
  FoliaMines: {
    versions: ['1.21.11', '1.21.10', '1.21.9', '1.21.8', '1.21.7', '1.21.6', '1.21.5', '1.21.4', '1.21.3', '1.21.2', '1.21.1', '1.21', '1.20.5','1.20.4'],
    software: ['Folia', 'Paper'],
  },
};

const VersionModal = ({ isOpen, onClose, product }) => {
  const [selectedSoftware, setSelectedSoftware] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);

  if (!product) return null;

  const data = mockData[product.title] || { versions: [], software: [] };

  const handleDownload = () => {
    if (selectedSoftware && selectedVersion) {
      alert(`Downloading ${product.title} ${selectedVersion} for ${selectedSoftware}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50"
          >
            <div className="bg-[#111] border border-[#222] rounded-3xl p-8 mx-4 relative overflow-hidden">
              {/* Gradient glow */}
              <div 
                className="absolute top-0 right-0 w-60 h-60 rounded-full blur-[100px] opacity-20 pointer-events-none"
                style={{ backgroundColor: product.color }}
              />
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="text-gray-400 hover:text-white" size={20} />
              </button>
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${product.color}40, ${product.color}20)`,
                  }}
                >
                  <img 
                    src={product.icon} 
                    alt={product.title} 
                    className="w-8 h-8 object-contain" 
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{product.title}</h2>
                  <p className="text-gray-400 text-sm">Select version to download</p>
                </div>
              </div>
              
              {/* Server Software Grid */}
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-3">Server Software</p>
                <div className="grid grid-cols-4 gap-3">
                  {data.software.map((sw) => (
                    <button
                      key={sw}
                      onClick={() => setSelectedSoftware(sw)}
                      className={`p-3 rounded-xl border transition-all duration-200 ${
                        selectedSoftware === sw
                          ? 'border-white/30 bg-white/10 text-white'
                          : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <span className="font-medium">{sw}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Version Selection */}
              <div className="mb-8">
                <p className="text-gray-400 text-sm mb-3">Version</p>
                <div className="relative">
                  <select
                    value={selectedVersion || ''}
                    onChange={(e) => setSelectedVersion(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    <option value="" disabled>Select a version</option>
                    {data.versions.map((ver) => (
                      <option key={ver} value={ver} className="bg-[#111]">
                        {ver}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
              
              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={!selectedSoftware || !selectedVersion}
                className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-200 ${
                  selectedSoftware && selectedVersion
                    ? 'bg-white text-black hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Download size={20} />
                Download
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Downloads = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      title: "FoliaMines",
      desc: "FoliaMines is a minecraft mines plugin designed for folia, FoliaMines is a fast, light-weight, easy to use Mod.",
      link: "https://github.com/Chest-Solutions/FoliaMines",
      color: "#3a84f6",
      status: "Prealpha",
      icon: "plugins/foliamines.png",
    },
    {
      title: "RinoAC",
      desc: "RinoAC is a minecraft anti-cheat plugin based on GrimAC, Designed to have little to no False positives.",
      link: "https://github.com/Chest-Solutions/Rino-AC",
      color: "#f6853a",
      status: "Alpha",
      icon: "plugins/rinoac2.png",
    },
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {products.map((product) => (
          <div 
            key={product.title}
            onClick={() => setSelectedProduct(product)}
            className="cursor-pointer"
          >
            <ProductCard
              title={product.title}
              desc={product.desc}
              link="#"
              color={product.color}
              status={product.status}
              icon={product.icon}
            />
          </div>
        ))}
      </div>
      
      <VersionModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
    </div>
  );
};

export default Downloads;
