import React, { useState, useEffect } from 'react';
import { FileText, Github, Sun, Moon, Cpu, Layers, Sparkles, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ engineStatus, onNavigate }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="glass-card navbar-bar">
      {/* Logo */}
      <div className="logo-section" style={{ cursor: 'pointer' }} onClick={() => onNavigate && onNavigate('all')}>
        <div className="logo-icon">
          <FileText size={24} />
        </div>
        <div>
          <h1 className="logo-title" style={{ fontSize: '1.35rem' }}>DocuConvert Pro</h1>
          <p className="logo-subtitle">34-in-1 Open Source PDF Studio Suite</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <button onClick={() => onNavigate && onNavigate('all')} className="btn-ghost nav-link">
          <Layers size={16} />
          Tools
        </button>
        <button onClick={() => onNavigate && onNavigate('workflow')} className="btn-ghost nav-link">
          <Wrench size={16} />
          Workflow
        </button>
        <button onClick={() => onNavigate && onNavigate('ai')} className="btn-ghost nav-link">
          <Sparkles size={16} />
          AI Suite
        </button>

        {/* GitHub Button */}
        <a
          href="https://github.com/reck98/DocuConvertPro"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: '0.85rem', textDecoration: 'none' }}
        >
          <Github size={16} />
          <span>GitHub</span>
        </a>

        {/* Theme Switcher Toggle */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          onClick={toggleTheme}
          className="icon-btn btn-secondary"
          style={{ padding: '8px', borderRadius: '50%', border: '1px solid var(--border-glass)' }}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {theme === 'dark' ? <Sun size={18} style={{ color: '#f59e0b' }} /> : <Moon size={18} style={{ color: '#6366f1' }} />}
          </motion.div>
        </motion.button>
      </nav>
    </header>
  );
}
