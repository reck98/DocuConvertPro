import React, { useState } from 'react';
import { Workflow, Plus, Trash2, Play, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function WorkflowBuilder({ onRunWorkflow }) {
  const [steps, setSteps] = useState([
    { id: '1', tool: 'merge', params: {} },
    { id: '2', tool: 'compress', params: { level: 'medium' } },
    { id: '3', tool: 'watermark', params: { text: 'CONFIDENTIAL' } }
  ]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [workflowResults, setWorkflowResults] = useState(null);

  const availableTools = [
    { id: 'merge', label: 'Merge PDF Documents' },
    { id: 'compress', label: 'Compress PDF Size' },
    { id: 'watermark', label: 'Stamp Watermark' },
    { id: 'protect', label: 'Protect with Password' },
    { id: 'rotate', label: 'Rotate Pages 90°' }
  ];

  const handleAddStep = () => {
    setSteps(prev => [...prev, {
      id: Math.random().toString(36).substring(2, 7),
      tool: 'compress',
      params: {}
    }]);
  };

  const handleRemoveStep = (id) => {
    setSteps(prev => prev.filter(s => s.id !== id));
  };

  const handleUpdateStep = (id, tool, params) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, tool, params: params || s.params } : s));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleExecute = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select input PDF files for the workflow!');
      return;
    }
    setIsRunning(true);
    setWorkflowResults(null);

    const formData = new FormData();
    selectedFiles.forEach(f => formData.append('files', f));
    formData.append('steps', JSON.stringify(steps));

    try {
      const res = await fetch('/api/workflow/execute', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setWorkflowResults(data);
    } catch (err) {
      alert('Workflow execution failed: ' + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)', padding: '28px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
        <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Workflow size={24} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'white' }}>Workflow Automation Engine</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Chain multiple PDF tools together to automate repetitive processing pipelines in a single step.</p>
        </div>
      </div>

      {/* Step Pipeline Chain */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {steps.map((step, idx) => (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', padding: '14px 20px', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontWeight: '700', color: '#a5b4fc', fontSize: '0.9rem', minWidth: '70px' }}>
              Step {idx + 1}
            </span>

            <select
              value={step.tool}
              onChange={(e) => handleUpdateStep(step.id, e.target.value)}
              style={{ background: '#111827', color: 'white', border: '1px solid var(--border-glass)', padding: '8px 14px', borderRadius: '8px', fontWeight: '600', fontSize: '0.9rem' }}
            >
              {availableTools.map(t => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>

            {step.tool === 'watermark' && (
              <input
                type="text"
                placeholder="Watermark Text"
                value={step.params.text || 'CONFIDENTIAL'}
                onChange={(e) => handleUpdateStep(step.id, step.tool, { ...step.params, text: e.target.value })}
                style={{ background: '#111827', color: 'white', border: '1px solid var(--border-glass)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem' }}
              />
            )}

            {step.tool === 'protect' && (
              <input
                type="password"
                placeholder="Password"
                value={step.params.password || ''}
                onChange={(e) => handleUpdateStep(step.id, step.tool, { ...step.params, password: e.target.value })}
                style={{ background: '#111827', color: 'white', border: '1px solid var(--border-glass)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem' }}
              />
            )}

            {idx < steps.length - 1 && <ArrowRight size={18} style={{ color: 'var(--text-subtle)', marginLeft: 'auto' }} />}

            {steps.length > 1 && (
              <button onClick={() => handleRemoveStep(step.id)} className="icon-btn" style={{ marginLeft: idx === steps.length - 1 ? 'auto' : '0' }}>
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <button onClick={handleAddStep} className="secondary-btn">
          <Plus size={16} />
          Add Step to Chain
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <input
            type="file"
            id="wf-file-input"
            multiple
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="wf-file-input" className="secondary-btn" style={{ cursor: 'pointer' }}>
            {selectedFiles.length > 0 ? `${selectedFiles.length} PDF(s) Selected` : 'Select Input PDF Files'}
          </label>

          <button onClick={handleExecute} disabled={isRunning} className="browse-btn">
            {isRunning ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
            {isRunning ? 'Running Chain...' : 'Execute Workflow Pipeline'}
          </button>
        </div>
      </div>

      {/* Workflow Output Results */}
      {workflowResults && (
        <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ color: '#34d399', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} /> Workflow Completed Successfully!
          </h4>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
            {workflowResults.logs?.map((log, i) => (
              <div key={i}>• {log}</div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {workflowResults.files?.map((f, i) => (
              <a key={i} href={f.downloadUrl} download className="browse-btn" style={{ padding: '6px 14px', fontSize: '0.85rem', textDecoration: 'none' }}>
                Download Result #{i+1}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
