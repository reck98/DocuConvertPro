import React from 'react';
import { Layers, Minimize2, FileText, ScanText, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURED_TOOLS = [
  {
    id: 'merge',
    title: 'Merge PDF',
    description: 'Combine multiple PDF documents into a single unified file in your custom page order.',
    icon: Layers,
    color: '#6366f1'
  },
  {
    id: 'compress',
    title: 'Compress PDF',
    description: 'Reduce file size while preserving high visual document resolution.',
    icon: Minimize2,
    color: '#3b82f6'
  },
  {
    id: 'word_to_pdf',
    title: 'Word to PDF',
    description: 'Convert .docx and .doc files to PDF with 100% layout and font fidelity.',
    icon: FileText,
    color: '#10b981'
  },
  {
    id: 'ocr',
    title: 'OCR PDF',
    description: 'Convert scanned PDF documents into searchable text PDFs with active selection layers.',
    icon: ScanText,
    color: '#f59e0b'
  },
  {
    id: 'ai_summarize',
    title: 'AI Summary',
    description: 'Extract executive summaries, key takeaways, and word metrics automatically.',
    icon: Sparkles,
    color: '#d946ef'
  }
];

export default function FeaturedTools({ onSelectTool }) {
  return (
    <section style={{ marginBottom: '48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>
            🔥 Featured Tools
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Most popular tools used by thousands of developers and professionals daily.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '18px' }}>
        {FEATURED_TOOLS.map((tool, idx) => {
          const IconComp = tool.icon;
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onClick={() => onSelectTool(tool.id)}
              className="glass-card"
              style={{
                padding: '24px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}
            >
              <div>
                <div 
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: 'var(--radius-md)', 
                    background: `${tool.color}18`, 
                    color: tool.color, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justify: 'center',
                    marginBottom: '16px' 
                  }}
                >
                  <IconComp size={24} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px' }}>
                  {tool.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                  {tool.description}
                </p>

                {/* Feature Bullets */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} style={{ color: '#10b981' }} /> Fast
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} style={{ color: '#10b981' }} /> Secure
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} style={{ color: '#10b981' }} /> High Quality
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: tool.color }}>
                <span>Open Tool</span>
                <ArrowRight size={14} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
