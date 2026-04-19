import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const FeatureCard = ({ title, desc, delay, image, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className="relative p-6 overflow-hidden group rounded-3xl transition-all hover:scale-[1.05] bg-neutral-550 min-h-100 md:min-h-125 flex flex-col justify-end"
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
    
    <div 
      className="absolute w-40 h-40 rounded-full blur-[80px] opacity-60"
      style={{ 
        backgroundColor: color,
        top: '10%',
        left: '5%',
      }}
    />
    <div 
      className="absolute w-32 h-32 rounded-full blur-[60px] opacity-40"
      style={{ 
        backgroundColor: color,
        bottom: '20%',
        right: '10%',
      }}
    />
    
    <div className="relative z-10">
      <h3 className="text-xl font-bold mb-3 text-white transition-colors">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const Home = () => (
  <>
    <section className="relative pt-12 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            Developer software.
            <span className="block text-transparent bg-clip-text bg-[#ff995b]">
                Free forever
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Chest solutions Is a community driven open source organization aiming to create free and performant software for developers and server owners
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row gap-4 justify-center"
          >
            <Link to="/downloads" className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
                Downloads
                <Download size={14} />
            </Link>
            <Link to="/docs" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-lg bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all hover:scale-105 active:scale-95">
                Documentation
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            title="Stability" 
            desc="We ensure our projects are stable before deployment."
            image="/showcases/stable.png"
            color="#f8702c"
            delay={0}
          />
          <FeatureCard 
            title="Open Source" 
            desc="All of our projects are open source, You're always free to contribute or check them out."
            image="/showcases/opensource.png"
            color="#5748f8"
            delay={0.1}
          />
          <FeatureCard 
            title="Performant" 
            desc="We aim to improve the performance of our projects."
            image="/showcases/performant.png"
            color="#48f889"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  </>
);

export default Home;