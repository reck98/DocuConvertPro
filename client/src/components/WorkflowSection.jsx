import React from 'react';
import { Workflow, Layers, Minimize2, Stamp, Lock, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkflowSection({ onOpenWorkflow }) {
  return (
    <section style={{ marginBottom: '48px' }}>
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="glass-card" 
        style={{ 
          padding: '36px 32px', 
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(217, 70, 239, 0.08) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ maxWidth: '580px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '20px', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', fontSize: '0.8rem', fontWeight: '700', marginBottom: '14px' }}>
              <Zap size={14} />
              <span>Flagship Feature</span>
            </div>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '10px' }}>
              Visual Workflow Automation Pipeline
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              Chain multiple PDF operations together sequentially into custom automated workflows and execute the entire pipeline on input files with 1 click!
            </p>

            {/* Visual Pipeline Example */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', padding: '12px 16px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#818cf8', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={14} /> Merge
              </span>
              <span style={{ color: 'var(--text-subtle)' }}>➔</span>
              <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Minimize2 size={14} /> Compress
              </span>
              <span style={{ color: 'var(--text-subtle)' }}>➔</span>
              <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#e879f9', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Stamp size={14} /> Watermark
              </span>
              <span style={{ color: 'var(--text-subtle)' }}>➔</span>
              <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#34d399', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} /> Protect
              </span>
            </div>
          </div>

          <div>
            <button 
              onClick={onOpenWorkflow} 
              className="btn-primary"
              style={{ padding: '16px 32px', fontSize: '1.05rem', boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)' }}
            >
              <Workflow size={20} />
              Open Workflow Builder
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
