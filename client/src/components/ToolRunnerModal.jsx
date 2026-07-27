import React, { useState } from 'react';
import { X, Upload, Play, Download, Eye, Loader2, CheckCircle2, FileText, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ToolRunnerModal({ tool, inline = false, onClose, onPreview }) {
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
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState('');
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
      setErrorMessage(null);
    }
  };

  const handleParamChange = (name, val) => {
    setParams(prev => ({ ...prev, [name]: val }));
  };

  const handleProcess = async () => {
    if (files.length === 0 && tool.id !== 'html_to_pdf') {
      setErrorMessage('Please upload file(s) before running the tool.');
      return;
    }

    setIsProcessing(true);
    setProgress(15);
    setProgressStatus('Uploading document(s)...');
    setResult(null);
    setErrorMessage(null);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 85) {
          clearInterval(interval);
          return 88;
        }
        if (prev === 15) setProgressStatus(`Executing ${tool.title}...`);
        if (prev === 50) setProgressStatus('Applying formatting & optimization...');
        return prev + 12;
      });
    }, 300);

    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    formData.append('params', JSON.stringify(params));

    try {
      const res = await fetch(`/api/tools/${tool.action}`, {
        method: 'POST',
        body: formData
      });

      clearInterval(interval);
      setProgress(95);
      setProgressStatus('Finalizing output document...');

      const contentType = res.headers.get('content-type') || '';

      if (!res.ok || !contentType.includes('application/json')) {
        const rawText = await res.text();
        throw new Error(rawText.includes('500') ? 'Server error processing document. Please check file format.' : 'Invalid response from server.');
      }

      const data = await res.json();
      if (data.success) {
        setProgress(100);
        setProgressStatus('Completed successfully!');
        setResult(data);
      } else {
        throw new Error(data.error || 'Failed to process document');
      }
    } catch (err) {
      clearInterval(interval);
      setErrorMessage(err.message || 'Error processing request');
    } finally {
      setIsProcessing(false);
    }
  };

  const getDownloadLabel = (filename) => {
    if (!filename) return 'Download Result File';
    if (filename.endsWith('.docx')) return 'Download Word Document (.docx)';
    if (filename.endsWith('.pptx')) return 'Download Presentation (.pptx)';
    if (filename.endsWith('.xlsx')) return 'Download Excel Sheet (.xlsx)';
    if (filename.endsWith('.md')) return 'Download Markdown (.md)';
    return 'Download Result PDF';
  };

  const mainContent = (
    <div style={{ padding: inline ? '0' : '24px', overflowY: 'auto', flex: 1 }}>
      {/* File Picker */}
      {tool.id !== 'html_to_pdf' && (
        <div style={{ border: '2px dashed var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '28px', textAlign: 'center', marginBottom: '20px', background: 'var(--bg-glass)' }}>
          <Upload size={32} style={{ color: 'var(--c-dark-amaranth)', marginBottom: '10px' }} />
          <div style={{ fontWeight: '700', marginBottom: '6px', fontSize: '1.1rem' }}>Select {tool.title} Input File(s)</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Accepts: {tool.accept} • {tool.multiple ? 'Multiple files allowed' : 'Single file'}
          </p>
          <input
            type="file"
            multiple={tool.multiple}
            accept={tool.accept}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id={`file-input-${tool.id}`}
          />
          <label htmlFor={`file-input-${tool.id}`} className="browse-btn" style={{ cursor: 'pointer', display: 'inline-flex' }}>
            Browse Files
          </label>

          {files.length > 0 && (
            <div style={{ marginTop: '14px', fontSize: '0.88rem', color: '#d3efbd', fontWeight: '700' }}>
              ✓ {files.length} File(s) Selected: {files.map(f => f.name).join(', ')}
            </div>
          )}
        </div>
      )}

      {/* Dynamic Parameters */}
      {tool.params?.length > 0 && (
        <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '18px', marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '14px', color: 'var(--text-main)' }}>Tool Options & Configuration</h4>
          <div style={{ display: 'grid', gridTemplateColumns: tool.params.length > 1 ? '1fr 1fr' : '1fr', gap: '14px' }}>
            {tool.params.map(p => (
              <div key={p.name} style={{ gridColumn: p.type === 'textarea' ? '1 / -1' : 'auto' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
                  {p.label}
                </label>

                {p.type === 'select' ? (
                  <select
                    value={params[p.name] || p.default}
                    onChange={(e) => handleParamChange(p.name, e.target.value)}
                    style={{ width: '100%', background: 'var(--bg-input)', color: 'var(--text-main)', border: '1px solid var(--border-glass)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem' }}
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
                    style={{ width: '100%', background: 'var(--bg-input)', color: 'var(--text-main)', border: '1px solid var(--border-glass)', padding: '10px', borderRadius: '8px', fontSize: '0.85rem' }}
                  />
                ) : (
                  <input
                    type={p.type || 'text'}
                    placeholder={p.placeholder}
                    value={params[p.name] || ''}
                    onChange={(e) => handleParamChange(p.name, e.target.value)}
                    style={{ width: '100%', background: 'var(--bg-input)', color: 'var(--text-main)', border: '1px solid var(--border-glass)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar Container when processing */}
      {isProcessing ? (
        <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-main)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Loader2 size={16} className="animate-spin" style={{ color: 'var(--c-dark-amaranth)' }} />
              {progressStatus}
            </span>
            <span>{progress}%</span>
          </div>

          <div style={{ width: '100%', height: '10px', background: 'var(--bg-input)', borderRadius: '10px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #8b2635 0%, #d3efbd 100%)',
                borderRadius: '10px'
              }}
            />
          </div>
        </div>
      ) : (
        <button
          onClick={handleProcess}
          className="browse-btn"
          style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}
        >
          <Play size={18} />
          {`Run ${tool.title}`}
        </button>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div style={{ marginTop: '20px', padding: '14px 18px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: '#f87171', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Output Results */}
      {result && (
        <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(211, 239, 189, 0.12)', border: '1px solid rgba(211, 239, 189, 0.4)', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ color: '#d3efbd', fontWeight: '700', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} /> Processing Completed Successfully!
          </h4>

          {result.type === 'single_file' && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href={result.downloadUrl} download={result.pdfFileName} className="browse-btn" style={{ padding: '8px 16px', fontSize: '0.85rem', textDecoration: 'none' }}>
                <Download size={15} /> {getDownloadLabel(result.pdfFileName)}
              </a>
              {result.pdfFileName?.endsWith('.pdf') && (
                <button onClick={() => onPreview({ previewUrl: result.previewUrl, pdfFileName: result.pdfFileName })} className="secondary-btn" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  <Eye size={15} /> Live Preview
                </button>
              )}
            </div>
          )}

          {result.type === 'file_list' && (
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Generated {result.files.length} output files:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {result.files.map((f, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-tertiary)', padding: '8px 14px', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{f.filename}</span>
                    <a href={f.downloadUrl} download={f.filename} className="icon-btn download" style={{ width: '30px', height: '30px' }}>
                      <Download size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.type === 'data' && (
            <div style={{ background: 'var(--bg-input)', padding: '14px', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', color: 'var(--text-main)', maxHeight: '200px', overflowY: 'auto' }}>
              {JSON.stringify(result.data, null, 2)}
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (inline) {
    return mainContent;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px', height: 'auto', maxHeight: '90vh' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', background: 'var(--c-dark-amaranth)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <FileText size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)' }}>{tool.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{tool.description}</p>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
            title="Close modal"
          >
            <X size={20} />
          </motion.button>
        </div>

        {mainContent}
      </div>
    </div>
  );
}
