import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Github, SquareArrowOutUpRight } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

const NavLink = ({ to, children, isExternal = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <motion.div initial="rest" whileHover="hover" animate="rest">
        <Link 
            to={to} 
            target={isExternal ? "_blank" : undefined}
            className={`text-sm font-medium transition-colors flex items-center gap-1.5 group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
            {children}
        </Link>
    </motion.div>
  );
};

const Header = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 w-full z-50 glass"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <img 
                src="/chest.png" 
                alt="Chest Solutions" 
                className="h-8 w-8 rounded-lg shadow-lg" 
                onError={(e) => {e.target.style.display='none'}} 
              />
            </motion.div>
            <span className="font-bold text-lg tracking-tight group-hover:text-brand-blue transition-colors duration-300">
                CHEST SOLUTIONS
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/downloads">Downloads</NavLink>
            <NavLink to="/docs">Docs</NavLink>
            <NavLink to="/team">Team</NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <motion.a 
                whileHover={{ scale: 1.1, color: "#5865F2" }} 
                href="https://discord.gg/MsWqevupwh" 
                target="_blank" 
                className="text-gray-400 transition-colors"
            >
              <FaDiscord size={20} />
            </motion.a>
            <motion.a 
                whileHover={{ scale: 1.1, color: "#ffffff" }} 
                href="https://github.com/chest-solutions" 
                target="_blank" 
                className="text-gray-400 transition-colors"
            >
              <Github size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;