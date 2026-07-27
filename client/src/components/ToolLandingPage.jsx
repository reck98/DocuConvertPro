import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowLeft, CheckCircle2, ShieldCheck, Zap, Sparkles, FileText, ArrowRight, HelpCircle } from 'lucide-react';
import ToolRunnerModal from './ToolRunnerModal';
import { updatePageMeta, injectSchemaJSONLD, getToolSchemas } from '../utils/seoHelper';
import { TOOLS } from '../data/toolsData';

export default function ToolLandingPage({ tool, onBack, onSelectTool, onPreview }) {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (tool) {
      updatePageMeta({
        title: tool.seoTitle || `${tool.title} — DocuConvert Pro`,
        description: tool.seoDescription || tool.description,
        slug: tool.slug
      });

      const schemas = getToolSchemas(tool);
      injectSchemaJSONLD(schemas, 'tool-jsonld-schema');
    }
  }, [tool]);

  if (!tool) return null;

  const relatedTools = TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 4);

  return (
    <div className="tool-landing-page" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
        <button onClick={onBack} className="btn-ghost" style={{ padding: '0', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ArrowLeft size={14} /> Home
        </button>
        <ChevronRight size={14} />
        <span style={{ textTransform: 'capitalize' }}>{tool.category.replace('_', ' ')}</span>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>{tool.title}</span>
      </nav>

      {/* Page Header (H1) */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '12px', letterSpacing: '-0.02em' }}>
          {tool.title} Online
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto 20px', lineHeight: '1.6' }}>
          {tool.description}
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--text-subtle)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={14} style={{ color: '#10b981' }} /> 100% Free & Open Source
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} style={{ color: '#10b981' }} /> Privacy-First Execution
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={14} style={{ color: '#10b981' }} /> High-Speed Transformation
          </span>
        </div>
      </div>

      {/* Embedded Tool Execution Container */}
      <div className="glass-card" style={{ padding: '32px 24px', marginBottom: '48px' }}>
        <ToolRunnerModal 
          tool={tool} 
          inline={true} 
          onClose={onBack} 
          onPreview={onPreview} 
        />
      </div>

      {/* SEO Article: How It Works */}
      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '20px', textAlign: 'center' }}>
          How to {tool.title} in 3 Simple Steps
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-glow)', color: 'var(--c-dark-amaranth)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontWeight: '800' }}>
              1
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px' }}>Select Files</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Choose or drag & drop your documents into the dropzone above.</p>
          </div>

          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-glow)', color: 'var(--c-dark-amaranth)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontWeight: '800' }}>
              2
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px' }}>Configure Options</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Adjust any tool parameters and click Execute to start transformation.</p>
          </div>

          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-glow)', color: 'var(--c-dark-amaranth)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontWeight: '800' }}>
              3
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px' }}>Download Result</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Preview your output PDF inline or download it instantly to your device.</p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={22} style={{ color: 'var(--c-dark-amaranth)' }} />
            <span>Frequently Asked Questions</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tool.faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="glass-card"
                style={{ padding: '16px 20px', cursor: 'pointer' }}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: '700', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>{openFaq === idx ? '-' : '+'}</span>
                </div>
                {openFaq === idx && (
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '10px', lineHeight: '1.6' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools Internal Linking */}
      {relatedTools.length > 0 && (
        <section>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px' }}>
            Related PDF Tools
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {relatedTools.map(rel => (
              <div
                key={rel.id}
                onClick={() => onSelectTool(rel.slug)}
                className="glass-card"
                style={{ padding: '16px', cursor: 'pointer' }}
              >
                <h3 style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>
                  {rel.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  {rel.description.substring(0, 70)}...
                </p>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--c-dark-amaranth)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Open {rel.title} <ArrowRight size={12} />
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
