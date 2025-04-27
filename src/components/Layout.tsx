import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { Sun, Moon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-blue-950 transition-colors duration-300">
        <NavBar />
        <main className="relative">
          {children}
        </main>
        <Footer />
        
        <button
          onClick={toggleTheme}
          className="fixed bottom-6 right-6 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={24} className="text-slate-800" /> : <Sun size={24} className="text-yellow-400" />}
        </button>
      </div>
    </div>
  );
};