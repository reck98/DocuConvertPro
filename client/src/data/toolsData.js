export const CATEGORIES = [
  { id: 'all', name: 'All PDF Tools', icon: 'Grid' },
  { id: 'organize', name: 'Organize PDF', icon: 'FolderKanban' },
  { id: 'optimize', name: 'Optimize PDF', icon: 'Zap' },
  { id: 'convert_to', name: 'Convert to PDF', icon: 'FileInput' },
  { id: 'convert_from', name: 'Convert from PDF', icon: 'FileOutput' },
  { id: 'edit', name: 'Edit PDF', icon: 'Edit3' },
  { id: 'security', name: 'PDF Security', icon: 'ShieldCheck' },
  { id: 'ai', name: 'AI Intelligence', icon: 'Sparkles' },
  { id: 'workflow', name: 'Workflow Automation', icon: 'Workflow' }
];

export const TOOLS = [
  // 1. ORGANIZE PDF
  {
    id: 'merge',
    action: 'merge',
    category: 'organize',
    title: 'Merge PDF',
    description: 'Combine multiple PDF documents into a single unified file in your desired page order.',
    icon: 'Layers',
    accept: '.pdf',
    multiple: true,
    params: []
  },
  {
    id: 'split',
    action: 'split',
    category: 'organize',
    title: 'Split PDF',
    description: 'Separate one PDF into individual pages or extract custom page ranges into standalone files.',
    icon: 'Scissors',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'pages', label: 'Page Ranges (e.g. 1-3, 5)', type: 'text', placeholder: '1-3, 5, 8' }
    ]
  },
  {
    id: 'remove_pages',
    action: 'remove_pages',
    category: 'organize',
    title: 'Remove Pages',
    description: 'Delete specific unwanted pages from a PDF document cleanly.',
    icon: 'Trash2',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'pages', label: 'Pages to Remove (e.g. 2, 4-6)', type: 'text', placeholder: '2, 4-6' }
    ]
  },
  {
    id: 'extract_pages',
    action: 'extract_pages',
    category: 'organize',
    title: 'Extract Pages',
    description: 'Extract selected pages from your PDF file and save them into a new document.',
    icon: 'FileCheck',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'pages', label: 'Pages to Extract (e.g. 1, 3-5)', type: 'text', placeholder: '1, 3-5' }
    ]
  },
  {
    id: 'organize',
    action: 'organize',
    category: 'organize',
    title: 'Organize PDF',
    description: 'Reorder, rotate, or delete pages visually inside your PDF document.',
    icon: 'Move',
    accept: '.pdf',
    multiple: false,
    params: []
  },
  {
    id: 'scan',
    action: 'scan',
    category: 'organize',
    title: 'Scan to PDF',
    description: 'Convert physical image uploads or PDFs into high-contrast black & white scanned documents.',
    icon: 'Printer',
    accept: '.pdf,image/*',
    multiple: true,
    params: [
      { name: 'grayscale', label: 'Grayscale Filter', type: 'checkbox', default: true },
      { name: 'contrast', label: 'Contrast Enhancement', type: 'select', options: ['1.2', '1.5', '2.0'], default: '1.5' }
    ]
  },

  // 2. OPTIMIZE PDF
  {
    id: 'compress',
    action: 'compress',
    category: 'optimize',
    title: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining maximum image and typography quality.',
    icon: 'Minimize2',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'level', label: 'Compression Level', type: 'select', options: ['low', 'medium', 'high'], default: 'medium' }
    ]
  },
  {
    id: 'repair',
    action: 'repair',
    category: 'optimize',
    title: 'Repair PDF',
    description: 'Fix corrupt, damaged, or unreadable PDF files and rebuild document xref structure.',
    icon: 'Wrench',
    accept: '.pdf',
    multiple: false,
    params: []
  },
  {
    id: 'ocr',
    action: 'ocr',
    category: 'optimize',
    title: 'OCR PDF',
    description: 'Convert scanned PDF documents into searchable text PDFs with active text selection layers.',
    icon: 'ScanText',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'lang', label: 'Language', type: 'select', options: ['eng', 'spa', 'fra', 'deu'], default: 'eng' }
    ]
  },

  // 3. CONVERT TO PDF
  {
    id: 'jpg_to_pdf',
    action: 'jpg_to_pdf',
    category: 'convert_to',
    title: 'JPG / Image to PDF',
    description: 'Convert JPG, PNG, WEBP, or BMP images into professional PDF files in seconds.',
    icon: 'Image',
    accept: 'image/*',
    multiple: true,
    params: []
  },
  {
    id: 'word_to_pdf',
    action: 'word_to_pdf',
    category: 'convert_to',
    title: 'Word to PDF',
    description: 'Convert Word (.docx, .doc) files into PDF with 100% native MS Word layout fidelity.',
    icon: 'FileText',
    accept: '.docx,.doc',
    multiple: false,
    params: []
  },
  {
    id: 'ppt_to_pdf',
    action: 'ppt_to_pdf',
    category: 'convert_to',
    title: 'PowerPoint to PDF',
    description: 'Convert PowerPoint (.pptx, .ppt) presentations directly into PDF slides.',
    icon: 'Presentation',
    accept: '.pptx,.ppt',
    multiple: false,
    params: []
  },
  {
    id: 'excel_to_pdf',
    action: 'excel_to_pdf',
    category: 'convert_to',
    title: 'Excel to PDF',
    description: 'Convert Excel (.xlsx, .xls) spreadsheets into formatted vector PDF tables.',
    icon: 'Table',
    accept: '.xlsx,.xls',
    multiple: false,
    params: []
  },
  {
    id: 'html_to_pdf',
    action: 'html_to_pdf',
    category: 'convert_to',
    title: 'HTML to PDF',
    description: 'Convert web pages or raw HTML code snippets into PDF documents.',
    icon: 'Code',
    accept: '*',
    multiple: false,
    params: [
      { name: 'html', label: 'HTML Content', type: 'textarea', placeholder: '<h1>Hello World</h1><p>DocuConvert PDF Tool House</p>' }
    ]
  },

  // 4. CONVERT FROM PDF
  {
    id: 'pdf_to_jpg',
    action: 'pdf_to_jpg',
    category: 'convert_from',
    title: 'PDF to JPG',
    description: 'Extract every page of a PDF document into high-resolution JPG image files.',
    icon: 'FileImage',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'dpi', label: 'Image Quality (DPI)', type: 'select', options: ['150', '300'], default: '150' }
    ]
  },
  {
    id: 'pdf_to_word',
    action: 'pdf_to_word',
    category: 'convert_from',
    title: 'PDF to Word',
    description: 'Convert PDF files into editable Word (.docx) documents with text & layout extraction.',
    icon: 'FileCode',
    accept: '.pdf',
    multiple: false,
    params: []
  },
  {
    id: 'pdf_to_ppt',
    action: 'pdf_to_ppt',
    category: 'convert_from',
    title: 'PDF to PowerPoint',
    description: 'Convert PDF files into editable PowerPoint (.pptx) presentation slides.',
    icon: 'Monitor',
    accept: '.pdf',
    multiple: false,
    params: []
  },
  {
    id: 'pdf_to_excel',
    action: 'pdf_to_excel',
    category: 'convert_from',
    title: 'PDF to Excel',
    description: 'Extract data tables from PDF documents directly into Excel (.xlsx) sheets.',
    icon: 'FileSpreadsheet',
    accept: '.pdf',
    multiple: false,
    params: []
  },
  {
    id: 'pdf_to_pdfa',
    action: 'pdf_to_pdfa',
    category: 'convert_from',
    title: 'PDF to PDF/A',
    description: 'Convert standard PDF documents into ISO-compliant PDF/A archival format.',
    icon: 'Archive',
    accept: '.pdf',
    multiple: false,
    params: []
  },

  // 5. EDIT PDF
  {
    id: 'rotate',
    action: 'rotate',
    category: 'edit',
    title: 'Rotate PDF',
    description: 'Rotate PDF document pages by 90°, 180°, or 270° degrees.',
    icon: 'RotateCw',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'angle', label: 'Rotation Angle', type: 'select', options: ['90', '180', '270'], default: '90' }
    ]
  },
  {
    id: 'page_numbers',
    action: 'page_numbers',
    category: 'edit',
    title: 'Add Page Numbers',
    description: 'Stamp customizable page numbers (e.g., Page X of Y) on header or footer regions.',
    icon: 'Hash',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'position', label: 'Position', type: 'select', options: ['bottom-right', 'bottom-center', 'bottom-left'], default: 'bottom-right' }
    ]
  },
  {
    id: 'watermark',
    action: 'watermark',
    category: 'edit',
    title: 'Add Watermark',
    description: 'Stamp diagonal text watermarks (e.g. CONFIDENTIAL, DRAFT, DO NOT COPY) on your PDF pages.',
    icon: 'Stamp',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'text', label: 'Watermark Text', type: 'text', placeholder: 'CONFIDENTIAL', default: 'CONFIDENTIAL' }
    ]
  },
  {
    id: 'crop',
    action: 'crop',
    category: 'edit',
    title: 'Crop PDF',
    description: 'Trim page margins and adjust bounding box limits of your PDF file.',
    icon: 'Crop',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'top', label: 'Top Margin (px)', type: 'number', default: 20 },
      { name: 'bottom', label: 'Bottom Margin (px)', type: 'number', default: 20 }
    ]
  },
  {
    id: 'edit_text',
    action: 'edit_text',
    category: 'edit',
    title: 'Edit PDF Text',
    description: 'Overlay custom text callouts, notes, and annotations directly onto PDF pages.',
    icon: 'Type',
    accept: '.pdf',
    multiple: false,
    params: []
  },
  {
    id: 'fill_forms',
    action: 'fill_forms',
    category: 'edit',
    title: 'PDF Forms',
    description: 'Fill out interactive AcroForm text fields and submit PDF form data.',
    icon: 'CheckSquare',
    accept: '.pdf',
    multiple: false,
    params: []
  },

  // 6. PDF SECURITY
  {
    id: 'unlock',
    action: 'unlock',
    category: 'security',
    title: 'Unlock PDF',
    description: 'Remove owner passwords and open restriction permissions from protected PDFs.',
    icon: 'Unlock',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'password', label: 'Current Password', type: 'password', placeholder: 'Enter password if needed' }
    ]
  },
  {
    id: 'protect',
    action: 'protect',
    category: 'security',
    title: 'Protect PDF',
    description: 'Encrypt your PDF document with a strong 128/256-bit AES user password.',
    icon: 'Lock',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'password', label: 'Set Password', type: 'password', placeholder: 'Choose strong password' }
    ]
  },
  {
    id: 'sign',
    action: 'sign',
    category: 'security',
    title: 'Sign PDF',
    description: 'Add electronic signatures and verification stamps to official PDF contracts.',
    icon: 'PenTool',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'sign_text', label: 'Signature Text / Name', type: 'text', default: 'Digitally Signed by DocuConvert' }
    ]
  },
  {
    id: 'redact',
    action: 'redact',
    category: 'security',
    title: 'Redact PDF',
    description: 'Permanently blackout confidential keywords, names, or sensitive numbers.',
    icon: 'EyeOff',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'keywords', label: 'Keywords to Blackout (comma separated)', type: 'text', placeholder: 'CONFIDENTIAL, SECRET, SSN' }
    ]
  },
  {
    id: 'compare',
    action: 'compare',
    category: 'security',
    title: 'Compare PDF',
    description: 'Compare 2 PDF documents side-by-side to highlight text and structural differences.',
    icon: 'GitCompare',
    accept: '.pdf',
    multiple: true,
    params: []
  },

  // 7. AI INTELLIGENCE
  {
    id: 'ai_summarize',
    action: 'ai_summarize',
    category: 'ai',
    title: 'AI PDF Summarizer',
    description: 'Extract executive summaries, key takeaways, and word metrics using PDF AI intelligence.',
    icon: 'Sparkles',
    accept: '.pdf',
    multiple: false,
    params: []
  },
  {
    id: 'translate',
    action: 'translate',
    category: 'ai',
    title: 'Translate PDF',
    description: 'Translate PDF document text into Spanish, French, German, Hindi, Japanese, or Chinese.',
    icon: 'Languages',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'lang', label: 'Target Language', type: 'select', options: ['es', 'fr', 'de', 'hi', 'ja', 'zh'], default: 'es' }
    ]
  },
  {
    id: 'to_markdown',
    action: 'to_markdown',
    category: 'ai',
    title: 'PDF to Markdown',
    description: 'Extract structured Markdown (.md) text with headings, lists, and formatted code blocks.',
    icon: 'FileCode2',
    accept: '.pdf',
    multiple: false,
    params: []
  }
];
