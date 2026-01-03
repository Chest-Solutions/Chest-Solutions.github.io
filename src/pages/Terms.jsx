import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, children, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="mb-12"
  >
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <div className="text-gray-400 leading-relaxed space-y-4">
      {children}
    </div>
  </motion.div>
);

const Terms = () => (
  <div className="pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16 border-b border-white/10 pb-8"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
        Terms of Service.
      </h1>
      <p className="text-gray-400 text-lg">Last updated: Saturday, January 3rd 2026</p>
    </motion.div>

    <div className="relative">
      <Section delay={0.1} title="1. Acceptance of Terms">
        <p>
          By accessing and using our software (mods, plugins, applications), and services, you accept and agree to the terms stated below. 
        </p>
      </Section>

      <Section delay={0.2} title="2. Open Source License">
        <p>
          Most of our software is provided under open-source licenses (MIT or GPL). You are free to fork, modify, and redistribute the code subject to the specific license attached to each repository.
        </p>
        <p>
          However, you may not claim our work as your own or remove copyright notices from the source code.
        </p>
      </Section>

      <Section delay={0.3} title="3. Limitations of Liability">
        <p>
          Our tools are provided "as is". We are not liable for any damages to your server, data loss, or corrupted worlds that may occur while using our software. Please always backup your data before installing new plugins.
        </p>
      </Section>

      <Section delay={0.4} title="4. Community Guidelines">
        <p>
          We're mostly not strict when it comes to our community. BUT We don't support or encourage racism, sexism, ableism or any other sort of hate speech
        </p>
      </Section>
    </div>
  </div>
);

export default Terms;