import React from 'react';
import { History, FileText, CheckCircle2, UploadCloud, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecentActivitySection({ activities = [], onUploadClick }) {
  return (
    <section style={{ marginBottom: '48px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <History size={22} style={{ color: '#06b6d4' }} />
          <span>Recent Activity</span>
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Your recent document transformations and workflow processing history.
        </p>
      </div>

      {activities.length === 0 ? (
        /* Empty State */
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card" 
          style={{ padding: '40px 24px', textAlignment: 'center', textAlign: 'center' }}
        >
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Clock size={28} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
            No recent documents
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 20px' }}>
            Upload your first file to begin processing, converting, or editing PDFs.
          </p>
          <button onClick={onUploadClick} className="btn-primary">
            <UploadCloud size={18} />
            Upload Your First File
          </button>
        </motion.div>
      ) : (
        <div className="glass-card" style={{ padding: '16px 20px' }}>
          {activities.map((act, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '12px 0',
                borderBottom: idx === activities.length - 1 ? 'none' : '1px solid var(--border-glass)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={20} style={{ color: '#818cf8' }} />
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>{act.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{act.action}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{act.time}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#34d399', fontWeight: '600' }}>
                  <CheckCircle2 size={13} /> Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
