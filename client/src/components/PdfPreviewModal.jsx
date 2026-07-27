import React from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';

export default function PdfPreviewModal({ file, onClose, onDownload }) {
  if (!file) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText size={22} style={{ color: '#818cf8' }} />
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#f3f4f6' }}>
                {file.pdfFileName || file.name}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                Previewing converted PDF document • {file.pageCount || 1} pages
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              className="secondary-btn" 
              onClick={() => onDownload(file)}
              style={{ padding: '6px 14px' }}
            >
              <Download size={15} />
              Download PDF
            </button>

            <a
              href={file.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-btn"
              style={{ padding: '6px 14px', textDecoration: 'none' }}
            >
              <ExternalLink size={15} />
              Open Fullscreen
            </a>

            <button 
              className="icon-btn" 
              onClick={onClose}
              style={{ width: '34px', height: '34px' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          <iframe
            src={file.previewUrl}
            title={`Preview of ${file.name}`}
            className="modal-iframe"
          />
        </div>
      </div>
    </div>
  );
}
