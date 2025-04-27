import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={20} />, url: 'https://github.com/samielbadi', label: 'GitHub' },
    { icon: <Linkedin size={20} />, url: 'https://linkedin.com/in/samielbadi', label: 'LinkedIn' },
    { icon: <Twitter size={20} />, url: 'https://twitter.com/samielbadi', label: 'Twitter' },
    { icon: <Mail size={20} />, url: 'mailto:sami@example.com', label: 'Email' }
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-8 border-t border-slate-200 dark:border-slate-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 md:mb-0"
            variants={itemVariants}
          >
            Sami El badi
          </motion.div>
          
          <motion.div 
            className="flex space-x-6"
            variants={itemVariants}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 text-center text-slate-500 dark:text-slate-400 text-sm"
          variants={itemVariants}
        >
          <p>© {currentYear} Sami El badi. All rights reserved.</p>
          <p className="mt-2">Crafted with passion and React Three Fiber</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};