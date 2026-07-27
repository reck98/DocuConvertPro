import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsOverview from './components/StatsOverview';
import UploadZone from './components/UploadZone';
import FeaturedTools from './components/FeaturedTools';
import WorkflowSection from './components/WorkflowSection';
import WorkflowBuilder from './components/WorkflowBuilder';
import AIWorkspaceSection from './components/AIWorkspaceSection';
import RecentActivitySection from './components/RecentActivitySection';
import ToolRunnerModal from './components/ToolRunnerModal';
import PdfPreviewModal from './components/PdfPreviewModal';
import Footer from './components/Footer';

import { CATEGORIES, TOOLS } from './data/toolsData';

import { 
  Grid, FolderKanban, Zap, FileInput, FileOutput, Edit3, 
  ShieldCheck, Sparkles, Workflow, Search, ArrowRight, Layers,
  Scissors, Trash2, FileCheck, Move, Printer, Minimize2, Wrench,
  ScanText, Image, FileText, Presentation, Table, Code, FileImage,
  FileCode, Monitor, FileSpreadsheet, Archive, RotateCw, Hash, Stamp, Crop,
  Type, CheckSquare, Unlock, Lock, PenTool, EyeOff, GitCompare,
  Languages, FileCode2, X, CheckCircle2, Command
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [activities, setActivities] = useState([]);

  const uploadSectionRef = useRef(null);
  const toolsSectionRef = useRef(null);
  const searchInputRef = useRef(null);

  // Engine status & health check
  useEffect(() => {
    fetch('/api/engine-status')
      .then(res => res.json())
      .then(data => setEngineStatus(data))
      .catch(() => setEngineStatus({ available: true, engine: 'DocuConvert PDF Studio Full House' }));
  }, []);

  // Global Keyboard Shortcut (Ctrl+K or Cmd+K) for Search Bar Focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  const handleToolLaunch = (toolId) => {
    const found = TOOLS.find(t => t.id === toolId);
    if (found) {
      setActiveTool(found);
    }
  };

  const handleFilesSelected = (files) => {
    if (files.length > 0) {
      // Default to Merge or Word to PDF based on first file type
      const firstFile = files[0];
      if (firstFile.name.endsWith('.docx') || firstFile.name.endsWith('.doc')) {
        handleToolLaunch('word_to_pdf');
      } else {
        handleToolLaunch('merge');
      }

      // Add to recent activity list
      const newActivity = {
        name: firstFile.name,
        action: files.length > 1 ? `Batch Upload (${files.length} Files)` : 'Document Upload',
        time: 'Just now'
      };
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }
  };

  const handleGenerateSample = (count = 1) => {
    fetch(`/api/generate-sample?count=${count}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.file) {
          setPreviewFile({
            previewUrl: data.file.url,
            pdfFileName: data.file.filename
          });
          setActivities(prev => [{
            name: data.file.filename,
            action: 'Sample Report Generated',
            time: 'Just now'
          }, ...prev.slice(0, 4)]);
        }
      })
      .catch(err => console.error(err));
  };

  const scrollToUpload = () => {
    if (uploadSectionRef.current) {
      uploadSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTools = () => {
    if (toolsSectionRef.current) {
      toolsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <Navbar 
        engineStatus={engineStatus} 
        onNavigate={(cat) => {
          setSelectedCategory(cat);
          scrollToTools();
        }} 
      />

      {/* Hero Section */}
      <HeroSection 
        onUploadClick={scrollToUpload} 
        onBrowseClick={scrollToTools} 
      />

      {/* SaaS Statistics */}
      <StatsOverview />

      {/* Upload Zone */}
      <div ref={uploadSectionRef}>
        <UploadZone 
          onFilesSelected={handleFilesSelected} 
          onGenerateSample={handleGenerateSample} 
        />
      </div>

      {/* Flagship Workflow Banner */}
      {selectedCategory !== 'workflow' && (
        <WorkflowSection onOpenWorkflow={() => setSelectedCategory('workflow')} />
      )}

      {/* AI Workspace Highlight */}
      {selectedCategory === 'all' && (
        <AIWorkspaceSection onSelectTool={handleToolLaunch} />
      )}

      {/* Featured Tools Showcase */}
      {selectedCategory === 'all' && !searchQuery && (
        <FeaturedTools onSelectTool={handleToolLaunch} />
      )}

      {/* Category Pills & Search Filter */}
      <div ref={toolsSectionRef} className="glass-card" style={{ padding: '18px 24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          
          {/* Category Tabs Scroll */}
          <div className="category-scroll-container">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '8px 16px', fontSize: '0.85rem', whiteSpace: 'nowrap', minHeight: '40px' }}
              >
                {renderIcon(cat.icon, 16)}
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Bar with Ctrl+K Badge */}
          <div className="search-wrapper" style={{ position: 'relative', width: '300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search 34 PDF tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-input)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                padding: '8px 38px 8px 38px',
                fontSize: '0.88rem',
                height: '44px'
              }}
            />

            {searchQuery ? (
              <X 
                size={16} 
                onClick={() => setSearchQuery('')} 
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)', cursor: 'pointer' }} 
              />
            ) : (
              <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.72rem', color: 'var(--text-subtle)', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                <Command size={10} /> K
              </span>
            )}
          </div>

        </div>
      </div>

      {/* Visual Workflow Builder Mode */}
      {selectedCategory === 'workflow' && (
        <WorkflowBuilder onRunWorkflow={(results) => console.log(results)} />
      )}

      {/* 34 PDF Tools Grid */}
      {selectedCategory !== 'workflow' && (
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>
              All PDF Tools ({filteredTools.length})
            </h2>
            {searchQuery && (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Showing results for "{searchQuery}"
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '18px' }}>
            <AnimatePresence>
              {filteredTools.map((tool, idx) => (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: idx * 0.02 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => setActiveTool(tool)}
                  className="glass-card"
                  style={{
                    cursor: 'pointer',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '22px',
                    height: '100%',
                    justify: 'space-between',
                    display: 'flex'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {renderIcon(tool.icon, 22)}
                      </div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)' }}>{tool.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>
                      {tool.description}
                    </p>

                    {/* Feature bullets */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <CheckCircle2 size={11} style={{ color: '#10b981' }} /> Fast
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <CheckCircle2 size={11} style={{ color: '#10b981' }} /> Secure
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: '700', color: '#818cf8' }}>
                    <span>Open Tool</span>
                    <ArrowRight size={14} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Recent Activity List / Empty State */}
      <RecentActivitySection 
        activities={activities} 
        onUploadClick={scrollToUpload} 
      />

      {/* Footer */}
      <Footer onNavigate={(cat) => {
        setSelectedCategory(cat);
        scrollToTools();
      }} />

      {/* Tool Runner Modal */}
      {activeTool && (
        <ToolRunnerModal
          tool={activeTool}
          onClose={() => setActiveTool(null)}
          onPreview={(file) => {
            setPreviewFile(file);
            setActivities(prev => [{
              name: file.pdfFileName || 'processed_document.pdf',
              action: `${activeTool.title} Executed`,
              time: 'Just now'
            }, ...prev.slice(0, 4)]);
          }}
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
