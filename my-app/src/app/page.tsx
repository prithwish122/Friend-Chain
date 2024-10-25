"use client"
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, MessageCircle, Twitter } from 'lucide-react';
import Link from 'next/link';
// import Link from 'next/link';

const ExperimentalLayout = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  useEffect(() => {
    // Updated font import to match the design
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400&family=Pinyon+Script&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Dynamic cursor */}
      <div 
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none mix-blend-difference z-50"
        style={{
          left: mousePosition.x * window.innerWidth,
          top: mousePosition.y * window.innerHeight,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl tracking-wider"
            style={{ fontFamily: 'Pinyon ' }}
          >
            FRIEND CHAIN
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-x-8"
            style={{ fontFamily: 'Raleway' }}
          >
            <a href="#about" className="hover:opacity-50 transition-opacity tracking-wider">ABOUT</a>
            <a href="#tokens" className="hover:opacity-50 transition-opacity tracking-wider">TOKENS</a>
            {/* <a href="#connect" className="hover:opacity-50 transition-opacity tracking-wider">CONNECT</a> */}
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div 
        style={{ opacity: headerOpacity }}
        className="h-screen flex flex-col items-center justify-center relative top-10"
      >
        <div className="text-center">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 relative"
          >
            {/* <span 
              className="text-[6vw] block leading-none mb-4 tracking-wider"
              style={{ fontFamily: 'Raleway', fontWeight: 300 }}
            >
              Welcome to
            </span> */}
            <span 
              className="text-[13vw] block leading-none bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
              style={{ fontFamily: 'Pinyon Script' }}
            >
              Friend Chain
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-24 h-[1px] bg-white mx-auto mb-8"
          />
          
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl max-w-xl mx-auto px-6 leading-relaxed text-gray-300 tracking-wide"
            style={{ fontFamily: 'Raleway', fontWeight: 300 }}
          >
            Experience authentic connections through blockchain technology
          </motion.p>
          
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all tracking-wider"
            style={{ fontFamily: 'Raleway' }}
          >
            <Link href="/explore">Start Your Journey</Link>
            
          </motion.button>
        </div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.1) 0%, transparent 60%)`
          }}
        />
      </motion.div>

      {/* About Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-16"
          >
            <div className="space-y-8">
              <h2 
                className="text-4xl tracking-wider"
                style={{ fontFamily: 'Raleway', fontWeight: 300 }}
              >
                ABOUT THE PLATFORM
              </h2>
              <p className="text-lg text-gray-300" style={{ fontFamily: 'Raleway' }}>
                Friend Chain revolutionizes how we form connections in the digital age. 
                Through blockchain technology, we ensure authentic, secure, and meaningful friendships.
              </p>
            </div>
            <div className="space-y-8">
              <p className="text-lg text-gray-300" style={{ fontFamily: 'Raleway' }}>
                Our platform leverages AIA chain for transparent transactions and verified identities, 
                creating a trusted environment for forming new friendships.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/20">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-4 gap-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 
            className="tracking-wider"
            style={{ fontFamily: 'Raleway', fontWeight: 300 }}
          >
            FRIEND CHAIN
          </h4>
          <p className="text-sm text-gray-300" style={{ fontFamily: 'Raleway' }}>
            Building the future of friendship through secure and transparent connections. 
            Join a decentralized community where relationships are strengthened with trust and technology.
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="space-y-4">
        <h4 className="tracking-wider" style={{ fontFamily: 'Raleway', fontWeight: 300 }}>
          PLATFORM
        </h4>
        <ul className="space-y-2">
          <li className="text-sm">
            <a href="#" className="hover:opacity-50 transition-opacity text-gray-300" 
              style={{ fontFamily: 'Raleway' }}>Explore Features</a>
          </li>
          <li className="text-sm">
            <a href="#" className="hover:opacity-50 transition-opacity text-gray-300" 
              style={{ fontFamily: 'Raleway' }}>Community Guidelines</a>
          </li>
          <li className="text-sm">
            <a href="#" className="hover:opacity-50 transition-opacity text-gray-300" 
              style={{ fontFamily: 'Raleway' }}>Marketplace</a>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="tracking-wider" style={{ fontFamily: 'Raleway', fontWeight: 300 }}>
          LEGAL
        </h4>
        <ul className="space-y-2">
          <li className="text-sm">
            <a href="#" className="hover:opacity-50 transition-opacity text-gray-300" 
              style={{ fontFamily: 'Raleway' }}>Privacy Policy</a>
          </li>
          <li className="text-sm">
            <a href="#" className="hover:opacity-50 transition-opacity text-gray-300" 
              style={{ fontFamily: 'Raleway' }}>Terms of Service</a>
          </li>
          <li className="text-sm">
            <a href="#" className="hover:opacity-50 transition-opacity text-gray-300" 
              style={{ fontFamily: 'Raleway' }}>Cookie Policy</a>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="tracking-wider" style={{ fontFamily: 'Raleway', fontWeight: 300 }}>
          CONNECT
        </h4>
        <ul className="space-y-2">
          <li className="text-sm">
            <a href="#" className="hover:opacity-50 transition-opacity text-gray-300" 
              style={{ fontFamily: 'Raleway' }}>Contact Support</a>
          </li>
          <li className="text-sm">
            <a href="#" className="hover:opacity-50 transition-opacity text-gray-300" 
              style={{ fontFamily: 'Raleway' }}>Partner with Us</a>
          </li>
          <li className="text-sm">
            <a href="#" className="hover:opacity-50 transition-opacity text-gray-300" 
              style={{ fontFamily: 'Raleway' }}>API for Developers</a>
          </li>
        </ul>
      </div>
    </div>

    {/* Social Media Icons and Copyright */}
    <div className="mt-8 flex flex-col items-center space-y-4">
      {/* Social Media Icons */}
      <div className="flex space-x-4">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
          className="text-gray-300 hover:text-white transition-colors">
          <Github size={20} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors">
          <Linkedin size={20} />
        </a>
        <a href="https://t.me" target="_blank" rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors">
          <MessageCircle size={20} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors">
          <Twitter size={20} />
        </a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors">
          {/* <Discord size={20} /> */}
        </a>
      </div>

      {/* Copyright */}
      <p className="text-sm text-gray-400" style={{ fontFamily: 'Raleway' }}>
        © {new Date().getFullYear()} Friend Chain. All rights reserved.
      </p>
    </div>
  </div>
</footer>

    </div>
  );
};

export default ExperimentalLayout;