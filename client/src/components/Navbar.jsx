import React from 'react';
import { FileText, Cpu } from 'lucide-react';

export default function Navbar({ engineStatus }) {
  return (
    <header className="header-bar">
      <div className="logo-section">
        <div className="logo-icon">
          <FileText size={26} />
        </div>
        <div>
          <h1 className="logo-title">DocuConvert Pro</h1>
          <p className="logo-subtitle">34-in-1 PDF Studio Suite • Full House & Visual Workflow Engine</p>
        </div>
      </div>

      <div className="engine-badge">
        <span className="engine-pulse"></span>
        <Cpu size={15} />
        <span>{engineStatus ? engineStatus.engine : 'DocuConvert PDF Studio Full House'}</span>
      </div>
    </header>
  );
}
