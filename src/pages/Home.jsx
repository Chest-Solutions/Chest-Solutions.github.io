import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const FeatureCard = ({ title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group"
  >
    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </motion.div>
);

const Home = () => (
  <>
    <section className="relative pt-12 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[80vh] flex flex-col justify-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none hero-glow opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Column */}
          <div className="text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
            >
              Developer software.
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">
                  Free forever
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg font-light leading-relaxed"
            >
              Chest solutions Is a community driven open source organization aiming to create free and performant software for developers and server owners
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-row gap-4 justify-start"
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
      </div>
    </section>

    <section className="py-24 relative z-10 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard 
            title="Stable" 
            desc="We aim for efficiency, All of our projects are always stable and performant."
            delay={0}
          />
          <FeatureCard 
            title="Open Source" 
            desc="All of our projects are open source, You're always free to contribute or check them out."
            delay={0.1}
          />
          <FeatureCard 
            title="Community Driven" 
            desc="We encourage our community to contribute to our projects."
            delay={0.2}
          />
        </div>
      </div>
    </section>
  </>
);

export default Home;