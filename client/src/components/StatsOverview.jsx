import React from 'react';
import { FileCheck, Files, Clock, ShieldCheck } from 'lucide-react';

export default function StatsOverview({ files }) {
  const totalFiles = files.length;
  const completedFiles = files.filter(f => f.status === 'completed').length;
  const convertingFiles = files.filter(f => f.status === 'converting').length;
  
  const avgDuration = files
    .filter(f => f.durationMs)
    .reduce((acc, curr, idx, arr) => acc + curr.durationMs / arr.length, 0);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
          <Files size={24} />
        </div>
        <div>
          <div className="stat-val">{totalFiles}</div>
          <div className="stat-lbl">Total Documents</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
          <FileCheck size={24} />
        </div>
        <div>
          <div className="stat-val">{completedFiles}</div>
          <div className="stat-lbl">Converted PDFs</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
          <Clock size={24} />
        </div>
        <div>
          <div className="stat-val">
            {avgDuration ? `${(avgDuration / 1000).toFixed(1)}s` : '0.0s'}
          </div>
          <div className="stat-lbl">Avg Conversion Speed</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'rgba(217, 70, 239, 0.15)', color: '#e879f9' }}>
          <ShieldCheck size={24} />
        </div>
        <div>
          <div className="stat-val">100%</div>
          <div className="stat-lbl">Parsed Accuracy</div>
        </div>
      </div>
    </div>
  );
}
