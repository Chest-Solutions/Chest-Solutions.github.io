import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { BookOpen, Shield, Bomb } from "lucide-react";

const Downloads = () => (
  <div className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-6">
        Upgrade your Server
      </h2>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
      <ProductCard 
        title="FoliaMines"
        desc="FoliaMines is a minecraft mines plugin designed for folia, FoliaMines is a fast, light-weight, easy to use Mod."
        link="https://github.com/Chest-Solutions/FoliaMines"
        gradient="from-[#3a84f6] to-[#25cbef]"
        status="Prealpha"
        icon="plugins/foliamines.png"
      />
      <ProductCard 
        title="RinoAC"
        desc="RinoAC is a minecraft anti-cheat plugin based on GrimAC, Designed to have little to no False positives."
        link="https://github.com/Chest-Solutions/Rino-AC"
        gradient="from-[#f6853a] to-[#efa825]"
        status="Alpha"
        icon="plugins/rinoac2.png"
      />
    </div>
  </div>
);

export default Downloads;