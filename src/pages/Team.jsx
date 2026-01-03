import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

const TeamMember = ({ member }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    whileHover={{ x: 5 }}
    className="flex items-center space-x-4 bg-[#111111] p-4 rounded-xl border border-[#222] hover:border-[#333] transition-all"
  >
    <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-lg object-cover border border-[#333]" />
    <div>
      <div className="font-semibold text-lg text-white">{member.name}</div>
      <div className="flex space-x-3 text-sm text-gray-400 mt-1">
        {member.github && (
          <a href={member.github} target="_blank" className="hover:text-blue-400 transition-colors flex items-center gap-1">
            <Github size={16} /> GitHub
          </a>
        )}
        {member.discord && (
          <span className="flex items-center gap-1">
             <span className="opacity-50">•</span> <FaDiscord size={16} /> {member.discord}
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

const Team = () => {
  const teamMembers = [
    { name: "RedSnicker", role: "Founders", avatar: "https://images-ext-1.discordapp.net/external/nI0LHbOi3qHiIqBeEQhnAs6F9MLINlfeynvf_et1VTQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1043959796778405950/11eff523dd4b97a4229e537a302be246.png?format=webp&quality=lossless", github: "https://github.com/redsnicker", discord: "redsnicker" },
    { name: "Anmvc", role: "Founders", avatar: "https://cdn.discordapp.com/avatars/926199368518864966/de989e4d21de854a95968be1a90a45f9.png?size=1024", github: "https://github.com/anmvc", discord: "anmvc" },
    { name: "Lammy12k", role: "Staffs", avatar: "https://images-ext-1.discordapp.net/external/aKmhMALysXXHzvU7V7hm4aUU5vFlqNe-870kXb_QWNI/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1334287928473551008/dad7e655ad762b8ee8b77780945fbf7c.png?format=webp&quality=lossless", github: "https://github.com/KyfStore11k", discord: "lammy12k" },
    { name: "Maiminhdung", role: "Contributors", avatar: "https://avatars.githubusercontent.com/u/99890979?v=4", github: "https://github.com/maiminhdung" },
    { name: "FelixFoxxy", role: "Contributors", avatar: "https://images-ext-1.discordapp.net/external/9iZffzZedl32jJyYxY5mbeKAAqW6_V_ZPsNDjF81dTI/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/416648572382216192/d3b4b2a318652a77cb4e6f62c4c07549.png?format=webp&quality=lossless&width=788&height=788", github: "https://github.com/felixfoxxy", discord: "felixfoxxy"}
  ];

  const grouped = teamMembers.reduce((acc, member) => {
    if (!acc[member.role]) acc[member.role] = [];
    acc[member.role].push(member);
    return acc;
  }, {});

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet the Team</h1>
        <p className="text-lg text-gray-400 max-w-3xl mb-8 leading-relaxed">
          The minds behind Chest Solutions. We are dedicated to developing free and open-source software with performance and accessibility in mind.
        </p>
        <a href="https://github.com/Chest-Solutions" target="_blank" className="inline-flex items-center gap-2 bg-[#222] hover:bg-[#333] text-white font-medium py-2 px-6 rounded-lg border border-[#333] transition-colors">
          <Github size={18} /> View Organization
        </a>
      </motion.div>

      <div className="space-y-16">
        {Object.entries(grouped).map(([role, members], idx) => (
          <motion.section 
            key={role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-white/10 pb-2 inline-block">{role}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map(member => (
                <TeamMember key={member.name} member={member} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default Team;