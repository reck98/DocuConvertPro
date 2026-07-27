import React from 'react';
import { Layers, FileCode, Sparkles, ScanText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatsOverview() {
  const stats = [
    { label: 'PDF Tools', val: '34 Tools', icon: Layers, color: '#6366f1' },
    { label: 'File Formats', val: '10+ Formats', icon: FileCode, color: '#06b6d4' },
    { label: 'AI Intelligence', val: 'AI Powered', icon: Sparkles, color: '#d946ef' },
    { label: 'Text Recognition', val: 'OCR Ready', icon: ScanText, color: '#10b981' }
  ];

  return (
    <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
      {stats.map((st, idx) => {
        const IconComp = st.icon;
        return (
          <motion.div
            key={st.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="stat-card"
          >
            <div className="stat-icon" style={{ background: `${st.color}15`, color: st.color }}>
              <IconComp size={22} />
            </div>
            <div>
              <div className="stat-val">{st.val}</div>
              <div className="stat-lbl">{st.label}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
