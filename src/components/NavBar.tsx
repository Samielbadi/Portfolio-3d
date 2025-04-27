import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon, X } from 'lucide-react';

export const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const linkVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sami El badi
            </motion.div>
            
            <div className="hidden md:block">
              <div className="flex space-x-6 items-center">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    variants={linkVariants}
                    whileHover="hover"
                    className={`text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1 rounded-md text-base font-medium ${
                      isScrolled ? 'hover:bg-blue-50 dark:hover:bg-blue-900/30' : ''
                    }`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.label}
                  </motion.button>
                ))}
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  variants={linkVariants}
                  whileHover="hover"
                  className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Resume
                </motion.a>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <MenuIcon size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
      
      <motion.div
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        className="fixed inset-y-0 right-0 md:hidden z-50 w-64 bg-white dark:bg-slate-900 shadow-xl"
      >
        <div className="flex flex-col h-full">
          <div className="px-4 py-6 flex justify-between">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">Sami El badi</div>
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={24} className="text-slate-700 dark:text-slate-200" />
            </button>
          </div>
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-4">
            {sections.map((section) => (
              <button
                key={section.id}
                className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1 text-left text-base font-medium"
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-center mt-4"
            >
              Resume
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
};