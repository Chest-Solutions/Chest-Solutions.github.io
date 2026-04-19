import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Github, ArrowUpRight, Headphones } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

const ContactCard = ({ title, desc, icon, color, link, delay }) => {
  const iconRef = useRef(null);

  return (
    <motion.a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      style={{
        background: `linear-gradient(225deg, ${color}20 0%, transparent 50%)`,
      }}
      className="flex flex-col p-8 rounded-3xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group cursor-pointer h-full"
    >
      <div 
        ref={iconRef}
        className="mb-6 p-4 bg-white/5 rounded-2xl w-fit text-white transition-all duration-300"
        onMouseEnter={(e) => {
          e.currentTarget.style.color = color;
          e.currentTarget.style.background = `linear-gradient(135deg, ${color}20, ${color}10)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        }}
      >
        {icon}
      </div>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-white transition-colors">{title}</h3>
      </div>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
      <ArrowUpRight className="text-gray-500 group-hover:text-white transition-colors self-end" size={20} />
    </motion.a>
  );
};

const Contact = () => (
  <div className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
        <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-white/40">Contact</span>
      </h1>
    </motion.div>
    <div className="grid md:grid-cols-3 gap-8">
      <ContactCard 
        title="Discord server" 
        desc="Join our Discord server to chat with developers, report bugs, get help, or show off your work."
        color="#ffad5b"
        icon={<FaDiscord size={24} />}
        link="https://discord.gg/MsWqevupwh"
        delay={0}
      />
      <ContactCard 
        title="Email Us" 
        desc="For business inquiries or private concerns, shoot us an email. We dont usually check our email."
        icon={<Mail size={24} />}
        color="#e74032"
        link="#wedonthaveonerightnow"
        delay={0.1}
      />
      <ContactCard 
        title="Contribute" 
        desc="Check out the source code, open issues, or submit a pull request on our GitHub organization."
        icon={<Github size={24} />}
        color="#4ed4ec"
        link="https://github.com/Chest-Solutions"
        delay={0.2}
      />
    </div>
  </div>
);

export default Contact;