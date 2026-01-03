import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFound = () => (
  <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-20 animate-blob top-1/4 left-1/4"></div>
      <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-[100px] opacity-20 animate-blob animation-delay-2000 top-1/3 right-1/4"></div>
      <div className="absolute w-80 h-80 bg-indigo-600 rounded-full blur-[100px] opacity-20 animate-blob animation-delay-4000 bottom-1/4 left-1/2"></div>
    </div>

    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="text-center z-10 px-4"
    >
      <h1 className="text-8xl font-black mb-4 bg-clip-text text-transparent bg-linear-to-b from-white to-gray-600">404</h1>
      <h3 className="text-2xl font-bold mb-2 text-white">OOPS!</h3>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        Seems like the website has returned error code 404. This page doesn't exist in our dimension.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
      >
        <Home /> Go Home
      </Link>
    </motion.div>
  </div>
);

export default NotFound;