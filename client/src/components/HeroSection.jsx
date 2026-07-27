import React from 'react';
import { UploadCloud, Grid, ShieldCheck, Zap, Lock, Code2, Github, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection({ onUploadClick, onBrowseClick }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="hero-container"
    >
      <div className="hero-badge-pill">
        <Code2 size={14} />
        <span>⭐ Open Source PDF Studio Suite</span>
      </div>

      <h1 className="hero-title">
        <span className="hero-gradient-text">34 Professional</span> PDF Tools
      </h1>

      <p className="hero-subtitle">
        Convert, Edit, OCR, Secure, Sign, Summarize, Translate and Automate PDF workflows in one powerful, open-source platform.
      </p>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={onUploadClick} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
          <UploadCloud size={20} />
          Upload File
        </button>

        <button onClick={onBrowseClick} className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
          <Grid size={20} />
          Browse Tools
        </button>
      </div>

      {/* Trust Indicators Bar */}
      <div className="hero-trust-bar">
        <div className="trust-item">
          <CheckCircle2 size={16} style={{ color: '#10b981' }} />
          <span>Open Source</span>
        </div>
        <div className="trust-item">
          <CheckCircle2 size={16} style={{ color: '#10b981' }} />
          <span>Privacy First</span>
        </div>
        <div className="trust-item">
          <CheckCircle2 size={16} style={{ color: '#10b981' }} />
          <span>Fast Processing</span>
        </div>
        <div className="trust-item">
          <CheckCircle2 size={16} style={{ color: '#10b981' }} />
          <span>Docker Ready</span>
        </div>
      </div>
    </motion.section>
  );
}
