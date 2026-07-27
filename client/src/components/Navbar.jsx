import React from 'react';
import { FileText, Cpu, CheckCircle2 } from 'lucide-react';

export default function Navbar({ engineStatus }) {
  return (
    <header className="header-bar">
      <div className="logo-section">
        <div className="logo-icon">
          <FileText size={26} />
        </div>
        <div>
          <h1 className="logo-title">DocuConvert Pro</h1>
          <p className="logo-subtitle">Enterprise Word to PDF Studio • Bulk & Single Converter</p>
        </div>
      </div>

      <div className="engine-badge">
        <span className="engine-pulse"></span>
        <Cpu size={15} />
        <span>{engineStatus ? engineStatus.engine : 'Checking Engine...'}</span>
      </div>
    </header>
  );
}
