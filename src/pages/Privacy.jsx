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

const Privacy = () => (
  <div className="pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto min-h-screen">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16 border-b border-white/10 pb-8"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
        Privacy Policy
      </h1>
      <p className="text-gray-400 text-lg">We respect your privacy</p>
    </motion.div>

    <div className="relative">
      <Section delay={0.1} title="1. Data Collection">
        <p>
          Our software does not collect personal usage data, IP addresses, or server details unless explicitly stated in a specific software's configuration (e.g., for metrics/bStats).
        </p>
      </Section>

      <Section delay={0.2} title="2. Website Analytics">
        <p>
          This website does not collect any data 
        </p>
      </Section>

      <Section delay={0.3} title="3. Third Party Services">
        <p>
          We use third party services to provide you with our software (Like github, discord, modrinth), those platforms have their own privacy policies. We encourage you to read them.
        </p>
      </Section>

      <Section delay={0.4} title="4. Contact Us">
        <p>
          If you have any questions about this Privacy Policy, please contact us via our community Discord or email.
        </p>
      </Section>
    </div>
  </div>
);

export default Privacy;