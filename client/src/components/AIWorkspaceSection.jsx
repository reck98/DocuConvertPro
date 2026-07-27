import React from 'react';
import { Sparkles, Languages, FileCode2, ScanText, MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AI_TOOLS = [
  {
    id: 'ai_summarize',
    title: 'AI Summary',
    description: 'Extract executive summaries, key takeaways, and word metrics automatically.',
    icon: Sparkles,
    badge: 'NLP AI',
    active: true
  },
  {
    id: 'translate',
    title: 'Translate PDF',
    description: 'Translate document text layers while preserving exact formatting layout.',
    icon: Languages,
    badge: 'Multi-Lang',
    active: true
  },
  {
    id: 'to_markdown',
    title: 'Markdown Extraction',
    description: 'Convert PDF content into structured Markdown (.md) for LLM prompts.',
    icon: FileCode2,
    badge: 'Structured',
    active: true
  },
  {
    id: 'ocr',
    title: 'Smart OCR Engine',
    description: 'Recognize scanned document text and render active selection text layers.',
    icon: ScanText,
    badge: 'OCR Engine',
    active: true
  },
  {
    id: 'chat_pdf',
    title: 'Chat with PDF',
    description: 'Ask questions and extract insights directly from your PDF documents.',
    icon: MessageSquare,
    badge: 'Coming Soon',
    active: false
  }
];

export default function AIWorkspaceSection({ onSelectTool }) {
  return (
    <section style={{ marginBottom: '48px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={22} style={{ color: '#d946ef' }} />
          <span>AI Intelligence Workspace</span>
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Powered by local extractive NLP and intelligent document parsing engines.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
        {AI_TOOLS.map((tool, idx) => {
          const IconComp = tool.icon;
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileHover={tool.active ? { y: -4, transition: { duration: 0.2 } } : {}}
              onClick={() => tool.active && onSelectTool(tool.id)}
              className="glass-card"
              style={{
                padding: '20px',
                cursor: tool.active ? 'pointer' : 'default',
                opacity: tool.active ? 1 : 0.7,
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(217, 70, 239, 0.15)', color: '#d946ef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconComp size={22} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', background: tool.active ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.08)', color: tool.active ? '#818cf8' : 'var(--text-subtle)' }}>
                    {tool.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                  {tool.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                  {tool.description}
                </p>
              </div>

              {tool.active ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: '700', color: '#d946ef' }}>
                  <span>Launch AI Tool</span>
                  <ArrowRight size={14} />
                </div>
              ) : (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontStyle: 'italic' }}>
                  In Active Development
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
