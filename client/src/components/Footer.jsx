import React from 'react';
import { FileText, Github, Heart, ShieldCheck, Code2, ExternalLink } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="glass-card" style={{ padding: '40px 32px 24px', marginTop: '60px', borderRadius: 'var(--radius-xl)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', marginBottom: '36px' }}>
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div className="logo-icon" style={{ width: '36px', height: '36px' }}>
              <FileText size={20} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>DocuConvert Pro</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '300px' }}>
            Enterprise-grade, open-source 34-in-1 PDF Studio Suite & Visual Workflow Automation Engine.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            <li>
              <button onClick={() => onNavigate && onNavigate('all')} className="btn-ghost" style={{ padding: '4px 0' }}>
                All 34 PDF Tools
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate && onNavigate('workflow')} className="btn-ghost" style={{ padding: '4px 0' }}>
                Workflow Builder
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate && onNavigate('ai')} className="btn-ghost" style={{ padding: '4px 0' }}>
                AI Intelligence Suite
              </button>
            </li>
          </ul>
        </div>

        {/* Developer & Deployment Links */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Open Source & Cloud
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            <li>
              <a href="https://github.com/reck98/DocuConvertPro" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '4px 0', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Github size={14} /> Repository
              </a>
            </li>
            <li>
              <a href="https://github.com/reck98/DocuConvertPro#readme" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '4px 0', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Code2 size={14} /> Docker Setup
              </a>
            </li>
            <li>
              <a href="https://github.com/reck98/DocuConvertPro/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '4px 0', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} /> MIT License
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Line */}
      <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <div>
          Made with <Heart size={14} style={{ color: '#ef4444', verticalAlign: 'middle', margin: '0 2px' }} /> by {' '}
          <a
            href="https://github.com/reck98"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#818cf8', fontWeight: '700', textDecoration: 'none' }}
          >
            reck98 <ExternalLink size={12} style={{ verticalAlign: 'middle' }} />
          </a>
        </div>

        <div>
          © {new Date().getFullYear()} DocuConvert Pro. Privacy-First & 100% Open Source.
        </div>
      </div>
    </footer>
  );
}
