import React from 'react';
import { 
  FileText, Play, Download, Eye, Trash2, CheckCircle2, 
  AlertCircle, Loader2, Archive, RefreshCw 
} from 'lucide-react';

export default function FileListTable({ 
  files, 
  onConvertSingle, 
  onConvertBulk, 
  onDownloadSingle, 
  onDownloadZip, 
  onPreview, 
  onRemove, 
  onClearAll 
}) {
  if (files.length === 0) {
    return null;
  }

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const pendingCount = files.filter(f => f.status === 'pending').length;
  const completedCount = files.filter(f => f.status === 'completed').length;

  return (
    <div style={{ marginBottom: '40px' }}>
      <div className="section-header">
        <div className="section-title">
          <span>Conversion Queue & History</span>
          <span className="badge-count">{files.length} Files</span>
        </div>

        <div className="action-buttons">
          {pendingCount > 0 && (
            <button className="browse-btn" onClick={onConvertBulk}>
              <Play size={16} />
              Convert All Pending ({pendingCount})
            </button>
          )}

          {completedCount > 0 && (
            <button className="secondary-btn" onClick={onDownloadZip}>
              <Archive size={16} style={{ color: '#34d399' }} />
              Download All as ZIP ({completedCount})
            </button>
          )}

          <button className="secondary-btn" onClick={onClearAll}>
            <Trash2 size={16} />
            Clear Queue
          </button>
        </div>
      </div>

      <div className="file-list">
        {files.map((file) => (
          <div key={file.id} className="file-card">
            <div className="file-main-info">
              <div className="doc-type-icon">
                <FileText size={22} />
              </div>
              
              <div className="doc-details">
                <div className="doc-filename" title={file.name}>
                  {file.name}
                </div>
                
                <div className="doc-meta">
                  <span>Size: {formatSize(file.size)}</span>
                  {file.pageCount && <span>• {file.pageCount} Pages</span>}
                  {file.durationMs && <span>• {(file.durationMs / 1000).toFixed(2)}s</span>}
                  {file.engine && <span style={{ color: '#34d399' }}>• {file.engine}</span>}
                </div>

                {file.status === 'converting' && (
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${file.progress || 60}%` }}
                    />
                  </div>
                )}

                {file.status === 'failed' && (
                  <div style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '4px' }}>
                    Error: {file.error || 'Conversion failed'}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span className={`status-pill ${file.status}`}>
                {file.status === 'converting' && <Loader2 size={12} className="animate-spin" />}
                {file.status === 'completed' && <CheckCircle2 size={12} />}
                {file.status === 'failed' && <AlertCircle size={12} />}
                {file.status}
              </span>

              <div className="card-actions">
                {file.status === 'pending' && (
                  <button 
                    className="icon-btn primary" 
                    title="Convert Document"
                    onClick={() => onConvertSingle(file)}
                  >
                    <Play size={16} />
                  </button>
                )}

                {file.status === 'completed' && (
                  <>
                    <button 
                      className="icon-btn" 
                      title="Preview PDF"
                      onClick={() => onPreview(file)}
                    >
                      <Eye size={16} />
                    </button>

                    <button 
                      className="icon-btn download" 
                      title="Download PDF"
                      onClick={() => onDownloadSingle(file)}
                    >
                      <Download size={16} />
                    </button>
                  </>
                )}

                <button 
                  className="icon-btn" 
                  title="Remove from queue"
                  onClick={() => onRemove(file.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
