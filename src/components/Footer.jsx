import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavLink = ({ to, children, isExternal = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <motion.div initial="rest" whileHover="hover" animate="rest">
        <Link 
            to={to} 
            target={isExternal ? "_blank" : undefined}
            className={`text-sm font-medium transition-colors flex items-center gap-1.5 group ${isActive ? 'text-gray-500' : 'text-gray-500 hover:text-white'}`}
        >
            {children}
        </Link>
    </motion.div>
  );
};

const Footer = () => (
  <footer className="border-t border-white/10 py-12 bg-black relative z-10">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
        <img 
            src="/chest.png" 
            alt="Logo" 
            className="w-6 h-6 grayscale" 
            onError={(e) => {e.target.style.display='none'}} 
        />
        <span className="text-sm font-medium">© 2025 Chest Solutions</span>
      </div>
      <div className="flex gap-8 text-sm text-gray-500">
        <NavLink to="/privacy">Privacy</NavLink>
        <NavLink to="/terms">Terms</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </div>
  </footer>
);

export default Footer;