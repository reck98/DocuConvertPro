import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import WorkflowBuilder from './components/WorkflowBuilder';
import ToolRunnerModal from './components/ToolRunnerModal';
import PdfPreviewModal from './components/PdfPreviewModal';

import { CATEGORIES, TOOLS } from './data/toolsData';

import { 
  Grid, FolderKanban, Zap, FileInput, FileOutput, Edit3, 
  ShieldCheck, Sparkles, Workflow, Search, ArrowRight, Layers,
  Scissors, Trash2, FileCheck, Move, Printer, Minimize2, Wrench,
  ScanText, Image, FileText, Presentation, Table, Code, FileImage,
  FileCode, Monitor, FileSpreadsheet, Archive, RotateCw, Hash, Stamp, Crop,
  Type, CheckSquare, Unlock, Lock, PenTool, EyeOff, GitCompare,
  Languages, FileCode2
} from 'lucide-react';

const ICON_MAP = {
  Grid, FolderKanban, Zap, FileInput, FileOutput, Edit3, 
  ShieldCheck, Sparkles, Workflow, Layers, Scissors, Trash2, 
  FileCheck, Move, Printer, Minimize2, Wrench, ScanText, Image, 
  FileText, Presentation, Table, Code, FileImage, FileCode, Monitor, 
  FileSpreadsheet, Archive, RotateCw, Hash, Stamp, Crop, Type, CheckSquare, 
  Unlock, Lock, PenTool, EyeOff, GitCompare, Languages, FileCode2
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTool, setActiveTool] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [engineStatus, setEngineStatus] = useState(null);
  const [statsFiles, setStatsFiles] = useState([]);

  useEffect(() => {
    fetch('/api/engine-status')
      .then(res => res.json())
      .then(data => setEngineStatus(data))
      .catch(() => setEngineStatus({ available: true, engine: 'DocuConvert PDF Studio Full House' }));
  }, []);

  const filteredTools = TOOLS.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderIcon = (iconName, size = 20) => {
    const IconComp = ICON_MAP[iconName] || FileText;
    return <IconComp size={size} />;
  };

  return (
    <div className="app-container">
      <Navbar engineStatus={engineStatus} />

      <StatsOverview files={statsFiles} />

      {/* Category Tabs & Search Bar */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)', padding: '16px 20px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id ? 'browse-btn' : 'secondary-btn'}
                style={{ padding: '8px 16px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
              >
                {renderIcon(cat.icon, 16)}
                {cat.name}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
            <input
              type="text"
              placeholder="Search 27+ PDF tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', background: '#111827', color: 'white', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '8px 12px 8px 36px', fontSize: '0.85rem' }}
            />
          </div>
        </div>
      </div>

      {/* Workflow Builder Section if Workflow Category selected */}
      {selectedCategory === 'workflow' && (
        <WorkflowBuilder onRunWorkflow={(results) => console.log(results)} />
      )}

      {/* 27 Tools Grid */}
      {selectedCategory !== 'workflow' && (
        <div style={{ marginBottom: '40px' }}>
          <div className="section-header">
            <div className="section-title">
              <span>PDF Studio Suite ({filteredTools.length} Tools)</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
            {filteredTools.map(tool => (
              <div
                key={tool.id}
                onClick={() => setActiveTool(tool)}
                className="file-card"
                style={{ cursor: 'pointer', flexDirection: 'column', alignItems: 'flex-start', padding: '22px', height: '100%', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {renderIcon(tool.icon, 22)}
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'white' }}>{tool.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {tool.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '700', color: '#a5b4fc', marginTop: '16px' }}>
                  <span>Open Tool</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tool Runner Modal */}
      {activeTool && (
        <ToolRunnerModal
          tool={activeTool}
          onClose={() => setActiveTool(null)}
          onPreview={setPreviewFile}
        />
      )}

      {/* PDF Preview Modal */}
      {previewFile && (
        <PdfPreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
          onDownload={(f) => {
            const a = document.createElement('a');
            a.href = f.previewUrl;
            a.download = f.pdfFileName || 'converted.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
          }}
        />
      )}
    </div>
  );
}
