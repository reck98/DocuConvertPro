import React, { useState } from 'react';
import { X, Upload, Play, Download, Eye, Loader2, CheckCircle2, FileText, Sparkles } from 'lucide-react';

export default function ToolRunnerModal({ tool, onClose, onPreview }) {
  if (!tool) return null;

  const [files, setFiles] = useState([]);
  const [params, setParams] = useState(() => {
    const initial = {};
    tool.params?.forEach(p => {
      if (p.default !== undefined) initial[p.name] = p.default;
    });
    return initial;
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleParamChange = (name, val) => {
    setParams(prev => ({ ...prev, [name]: val }));
  };

  const handleProcess = async () => {
    if (files.length === 0 && tool.id !== 'html_to_pdf') {
      alert('Please upload file(s) to process!');
      return;
    }

    setIsProcessing(true);
    setResult(null);

    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    formData.append('params', JSON.stringify(params));

    try {
      const res = await fetch(`/api/tools/${tool.action}`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setResult(data);
      } else {
        alert('Tool error: ' + (data.error || 'Failed to process document'));
      }
    } catch (err) {
      alert('Request error: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px', height: 'auto', maxHeight: '90vh' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--accent-gradient)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <FileText size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'white' }}>{tool.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{tool.description}</p>
            </div>
          </div>

          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* File Picker */}
          {tool.id !== 'html_to_pdf' && (
            <div style={{ border: '2px dashed var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '28px', textAlign: 'center', marginBottom: '20px', background: 'rgba(255,255,255,0.02)' }}>
              <Upload size={32} style={{ color: 'var(--accent-primary)', marginBottom: '10px' }} />
              <div style={{ fontWeight: '600', marginBottom: '6px' }}>Select {tool.title} Input File(s)</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Accepts: {tool.accept} • {tool.multiple ? 'Multiple files allowed' : 'Single file'}
              </p>
              <input
                type="file"
                multiple={tool.multiple}
                accept={tool.accept}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="modal-file-input"
              />
              <label htmlFor="modal-file-input" className="browse-btn" style={{ cursor: 'pointer', display: 'inline-flex' }}>
                Browse Files
              </label>

              {files.length > 0 && (
                <div style={{ marginTop: '14px', fontSize: '0.85rem', color: '#34d399', fontWeight: '600' }}>
                  ✓ {files.length} File(s) Selected: {files.map(f => f.name).join(', ')}
                </div>
              )}
            </div>
          )}

          {/* Dynamic Parameters */}
          {tool.params?.length > 0 && (
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '18px', marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '14px', color: '#a5b4fc' }}>Tool Options & Configuration</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {tool.params.map(p => (
                  <div key={p.name} style={{ gridColumn: p.type === 'textarea' ? '1 / -1' : 'auto' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
                      {p.label}
                    </label>

                    {p.type === 'select' ? (
                      <select
                        value={params[p.name] || p.default}
                        onChange={(e) => handleParamChange(p.name, e.target.value)}
                        style={{ width: '100%', background: '#111827', color: 'white', border: '1px solid var(--border-glass)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem' }}
                      >
                        {p.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : p.type === 'textarea' ? (
                      <textarea
                        rows={4}
                        placeholder={p.placeholder}
                        value={params[p.name] || ''}
                        onChange={(e) => handleParamChange(p.name, e.target.value)}
                        style={{ width: '100%', background: '#111827', color: 'white', border: '1px solid var(--border-glass)', padding: '10px', borderRadius: '8px', fontSize: '0.85rem' }}
                      />
                    ) : (
                      <input
                        type={p.type || 'text'}
                        placeholder={p.placeholder}
                        value={params[p.name] || ''}
                        onChange={(e) => handleParamChange(p.name, e.target.value)}
                        style={{ width: '100%', background: '#111827', color: 'white', border: '1px solid var(--border-glass)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Execution Button */}
          <button
            onClick={handleProcess}
            disabled={isProcessing}
            className="browse-btn"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
          >
            {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
            {isProcessing ? `Processing ${tool.title}...` : `Run ${tool.title}`}
          </button>

          {/* Output Results */}
          {result && (
            <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ color: '#34d399', fontWeight: '700', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} /> Processing Completed Successfully!
              </h4>

              {result.type === 'single_file' && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a href={result.downloadUrl} download className="browse-btn" style={{ padding: '8px 16px', fontSize: '0.85rem', textDecoration: 'none' }}>
                    <Download size={15} /> Download Result PDF
                  </a>
                  <button onClick={() => onPreview({ previewUrl: result.previewUrl, pdfFileName: result.pdfFileName })} className="secondary-btn" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    <Eye size={15} /> Live Preview
                  </button>
                </div>
              )}

              {result.type === 'file_list' && (
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Generated {result.files.length} output files:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {result.files.map((f, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '8px 14px', borderRadius: '6px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{f.filename}</span>
                        <a href={f.downloadUrl} download className="icon-btn download" style={{ width: '30px', height: '30px' }}>
                          <Download size={14} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.type === 'data' && (
                <div style={{ background: '#111827', padding: '14px', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', color: '#a5b4fc', maxHeight: '200px', overflowY: 'auto' }}>
                  {JSON.stringify(result.data, null, 2)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
