import React, { useRef, useState } from 'react';
import { UploadCloud, FilePlus, Sparkles, FolderPlus } from 'lucide-react';

export default function UploadZone({ onFilesSelected, onGenerateSample }) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      e.target.value = null;
    }
  };

  return (
    <div
      className={`dropzone-container ${isDragOver ? 'active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept=".pdf,.docx,.doc,.pptx,.ppt,.xlsx,.xls,image/*"
        style={{ display: 'none' }}
      />

      <div className="upload-icon-wrapper">
        <UploadCloud size={36} />
      </div>

      <h3 className="dropzone-title">
        Drag & Drop your PDF or Office documents here
      </h3>
      <p className="dropzone-subtitle">
        Supports single or bulk batch processing. Preserves formatting, images, tables & layout across all 34 PDF Studio tools.
      </p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          className="browse-btn"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        >
          <FolderPlus size={18} />
          Browse Files
        </button>

        <button
          type="button"
          className="secondary-btn"
          onClick={(e) => {
            e.stopPropagation();
            onGenerateSample();
          }}
        >
          <Sparkles size={18} style={{ color: '#e879f9' }} />
          Generate Test Document
        </button>
      </div>

      <div className="sample-bar" onClick={(e) => e.stopPropagation()}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Quick Test Samples:</span>
        <button className="sample-chip" onClick={() => onGenerateSample(1)}>
          <FilePlus size={13} /> Sample Executive Report
        </button>
        <button className="sample-chip" onClick={() => onGenerateSample(3)}>
          <Sparkles size={13} /> Bulk Pack (3 Documents)
        </button>
      </div>
    </div>
  );
}
