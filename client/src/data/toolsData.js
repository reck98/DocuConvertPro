export const CATEGORIES = [
  { id: 'all', name: 'All PDF Tools', icon: 'Grid', slug: '' },
  { id: 'organize', name: 'Organize PDF', icon: 'FolderKanban', slug: 'organize' },
  { id: 'optimize', name: 'Optimize PDF', icon: 'Zap', slug: 'optimize' },
  { id: 'convert_to', name: 'Convert to PDF', icon: 'FileInput', slug: 'convert-to-pdf' },
  { id: 'convert_from', name: 'Convert from PDF', icon: 'FileOutput', slug: 'convert-from-pdf' },
  { id: 'edit', name: 'Edit PDF', icon: 'Edit3', slug: 'edit-pdf' },
  { id: 'security', name: 'PDF Security', icon: 'ShieldCheck', slug: 'security' },
  { id: 'ai', name: 'AI Intelligence', icon: 'Sparkles', slug: 'ai' },
  { id: 'workflow', name: 'Workflow Automation', icon: 'Workflow', slug: 'workflow-builder' }
];

export const TOOLS = [
  // 1. ORGANIZE PDF
  {
    id: 'merge',
    action: 'merge',
    slug: 'merge-pdf',
    category: 'organize',
    title: 'Merge PDF',
    seoTitle: 'Merge PDF Files Online — Combine PDFs Free | DocuConvert Pro',
    seoDescription: 'Combine multiple PDF documents into a single unified file online for free. Fast, secure, and 100% open source.',
    description: 'Combine multiple PDF documents into a single unified file in your desired page order.',
    icon: 'Layers',
    accept: '.pdf',
    multiple: true,
    params: [],
    faqs: [
      { q: 'How do I merge multiple PDF files into one?', a: 'Upload two or more PDF files into the dropzone, adjust their order if needed, and click Execute to download your combined PDF.' },
      { q: 'Is there a limit on how many PDFs I can merge?', a: 'No, DocuConvert Pro supports unlimited batch merging of documents.' },
      { q: 'Is my data secure when merging PDFs?', a: 'Yes. All file transformations happen in your isolated server instance and files are deleted automatically.' }
    ]
  },
  {
    id: 'split',
    action: 'split',
    slug: 'split-pdf',
    category: 'organize',
    title: 'Split PDF',
    seoTitle: 'Split PDF Pages Online — Extract Page Ranges Free | DocuConvert Pro',
    seoDescription: 'Separate a PDF document into individual pages or extract custom page ranges into standalone files instantly.',
    description: 'Separate one PDF into individual pages or extract custom page ranges into standalone files.',
    icon: 'Scissors',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'pages', label: 'Page Ranges (e.g. 1-3, 5)', type: 'text', placeholder: '1-3, 5, 8' }
    ],
    faqs: [
      { q: 'How do I specify custom page ranges to split?', a: 'Enter page numbers or ranges such as "1-3, 5, 8" into the Page Ranges field before splitting.' }
    ]
  },
  {
    id: 'remove_pages',
    action: 'remove_pages',
    slug: 'remove-pages',
    category: 'organize',
    title: 'Remove Pages',
    seoTitle: 'Delete & Remove PDF Pages Online Free | DocuConvert Pro',
    seoDescription: 'Delete specific unwanted pages from your PDF documents cleanly without re-creating the file.',
    description: 'Delete specific unwanted pages from a PDF document cleanly.',
    icon: 'Trash2',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'pages', label: 'Pages to Remove (e.g. 2, 4-6)', type: 'text', placeholder: '2, 4-6' }
    ],
    faqs: [
      { q: 'Can I delete multiple pages at once?', a: 'Yes, specify comma-separated page numbers or ranges like "2, 4-6".' }
    ]
  },
  {
    id: 'extract_pages',
    action: 'extract_pages',
    slug: 'extract-pages',
    category: 'organize',
    title: 'Extract Pages',
    seoTitle: 'Extract Pages from PDF Online Free | DocuConvert Pro',
    seoDescription: 'Isolate and extract selected page numbers from your PDF file into a new document.',
    description: 'Extract selected pages from your PDF file and save them into a new document.',
    icon: 'FileCheck',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'pages', label: 'Pages to Extract (e.g. 1, 3-5)', type: 'text', placeholder: '1, 3-5' }
    ],
    faqs: [
      { q: 'What happens to the original PDF when extracting pages?', a: 'Your original file remains completely untouched. A new PDF containing only extracted pages is generated.' }
    ]
  },
  {
    id: 'organize',
    action: 'organize',
    slug: 'organize-pdf',
    category: 'organize',
    title: 'Organize PDF',
    seoTitle: 'Reorder & Organize PDF Pages Online Free | DocuConvert Pro',
    seoDescription: 'Reorder, rotate, or delete pages visually inside your PDF document with instant preview.',
    description: 'Reorder, rotate, or delete pages visually inside your PDF document.',
    icon: 'Move',
    accept: '.pdf',
    multiple: false,
    params: [],
    faqs: [
      { q: 'Can I reorder PDF pages visually?', a: 'Yes, drag and drop page thumbnails to reorder pages as needed.' }
    ]
  },
  {
    id: 'scan',
    action: 'scan',
    slug: 'scan-to-pdf',
    category: 'organize',
    title: 'Scan to PDF',
    seoTitle: 'Convert Photos & Documents to Scanned PDF | DocuConvert Pro',
    seoDescription: 'Transform photos or PDFs into high-contrast black & white scanned style documents.',
    description: 'Convert physical image uploads or PDFs into high-contrast black & white scanned documents.',
    icon: 'Printer',
    accept: '.pdf,image/*',
    multiple: true,
    params: [
      { name: 'grayscale', label: 'Grayscale Filter', type: 'checkbox', default: true },
      { name: 'contrast', label: 'Contrast Enhancement', type: 'select', options: ['1.2', '1.5', '2.0'], default: '1.5' }
    ],
    faqs: [
      { q: 'What image formats can I convert to scanned PDF?', a: 'Supports JPG, PNG, WEBP, BMP, and existing PDF files.' }
    ]
  },

  // 2. OPTIMIZE PDF
  {
    id: 'compress',
    action: 'compress',
    slug: 'compress-pdf',
    category: 'optimize',
    title: 'Compress PDF',
    seoTitle: 'Compress PDF Online — Reduce PDF File Size Free | DocuConvert Pro',
    seoDescription: 'Reduce PDF file size while maintaining maximum visual quality and typography crispness.',
    description: 'Reduce PDF file size while maintaining maximum image and typography quality.',
    icon: 'Minimize2',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'level', label: 'Compression Level', type: 'select', options: ['low', 'medium', 'high'], default: 'medium' }
    ],
    faqs: [
      { q: 'How much can PDF file size be reduced?', a: 'Compression levels can reduce file sizes by 30% to 80% depending on embedded images.' }
    ]
  },
  {
    id: 'repair',
    action: 'repair',
    slug: 'repair-pdf',
    category: 'optimize',
    title: 'Repair PDF',
    seoTitle: 'Repair Corrupt & Damaged PDF Files Online | DocuConvert Pro',
    seoDescription: 'Fix corrupt, damaged, or unreadable PDF files and rebuild document xref structure automatically.',
    description: 'Fix corrupt, damaged, or unreadable PDF files and rebuild document xref structure.',
    icon: 'Wrench',
    accept: '.pdf',
    multiple: false,
    params: [],
    faqs: [
      { q: 'Can it recover unopenable PDF files?', a: 'Yes, the repair tool rebuilds corrupt cross-reference tables and recovers readable streams.' }
    ]
  },
  {
    id: 'ocr',
    action: 'ocr',
    slug: 'ocr-pdf',
    category: 'optimize',
    title: 'OCR PDF',
    seoTitle: 'OCR PDF Online — Convert Scanned PDF to Searchable Text | DocuConvert Pro',
    seoDescription: 'Convert scanned PDF documents into searchable text PDFs with active text selection layers.',
    description: 'Convert scanned PDF documents into searchable text PDFs with active text selection layers.',
    icon: 'ScanText',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'lang', label: 'Language', type: 'select', options: ['eng', 'spa', 'fra', 'deu'], default: 'eng' }
    ],
    faqs: [
      { q: 'What is OCR PDF?', a: 'OCR (Optical Character Recognition) scans document images and overlays selectable, copyable text layers.' }
    ]
  },

  // 3. CONVERT TO PDF
  {
    id: 'jpg_to_pdf',
    action: 'jpg_to_pdf',
    slug: 'jpg-to-pdf',
    category: 'convert_to',
    title: 'JPG to PDF',
    seoTitle: 'Convert JPG Images to PDF Online Free | DocuConvert Pro',
    seoDescription: 'Convert JPG, PNG, WEBP, or BMP images into professional PDF files in seconds.',
    description: 'Convert JPG, PNG, WEBP, or BMP images into professional PDF files in seconds.',
    icon: 'Image',
    accept: 'image/*',
    multiple: true,
    params: [],
    faqs: [
      { q: 'Can I combine multiple JPG images into one PDF?', a: 'Yes! Select multiple images to convert them into a single multi-page PDF document.' }
    ]
  },
  {
    id: 'word_to_pdf',
    action: 'word_to_pdf',
    slug: 'word-to-pdf',
    category: 'convert_to',
    title: 'Word to PDF',
    seoTitle: 'Convert Word to PDF Online — DOCX to PDF Free | DocuConvert Pro',
    seoDescription: 'Convert Word (.docx, .doc) files into PDF with 100% native layout and typography fidelity.',
    description: 'Convert Word (.docx, .doc) files into PDF with 100% native MS Word layout fidelity.',
    icon: 'FileText',
    accept: '.docx,.doc',
    multiple: false,
    params: [],
    faqs: [
      { q: 'Does Word to PDF preserve formatting?', a: 'Yes, formatting, tables, images, and fonts are preserved with 100% accuracy.' }
    ]
  },
  {
    id: 'ppt_to_pdf',
    action: 'ppt_to_pdf',
    slug: 'ppt-to-pdf',
    category: 'convert_to',
    title: 'PowerPoint to PDF',
    seoTitle: 'Convert PowerPoint to PDF Online Free | DocuConvert Pro',
    seoDescription: 'Convert PowerPoint (.pptx, .ppt) presentations directly into vector PDF slides.',
    description: 'Convert PowerPoint (.pptx, .ppt) presentations directly into PDF slides.',
    icon: 'Presentation',
    accept: '.pptx,.ppt',
    multiple: false,
    params: [],
    faqs: [
      { q: 'Can I convert PPTX files to PDF?', a: 'Yes, upload any .pptx or .ppt presentation to convert it into high-resolution PDF slides.' }
    ]
  },
  {
    id: 'excel_to_pdf',
    action: 'excel_to_pdf',
    slug: 'excel-to-pdf',
    category: 'convert_to',
    title: 'Excel to PDF',
    seoTitle: 'Convert Excel Spreadsheets to PDF Online | DocuConvert Pro',
    seoDescription: 'Convert Excel (.xlsx, .xls) spreadsheets into formatted vector PDF tables.',
    description: 'Convert Excel (.xlsx, .xls) spreadsheets into formatted vector PDF tables.',
    icon: 'Table',
    accept: '.xlsx,.xls',
    multiple: false,
    params: [],
    faqs: [
      { q: 'Does Excel to PDF fit tables on pages?', a: 'Yes, spreadsheet tables are auto-formatted into clean vector PDF page layouts.' }
    ]
  },
  {
    id: 'html_to_pdf',
    action: 'html_to_pdf',
    slug: 'html-to-pdf',
    category: 'convert_to',
    title: 'HTML to PDF',
    seoTitle: 'Convert HTML Code & Web Pages to PDF | DocuConvert Pro',
    seoDescription: 'Convert raw HTML code snippets or web pages into styled PDF documents.',
    description: 'Convert web pages or raw HTML code snippets into PDF documents.',
    icon: 'Code',
    accept: '*',
    multiple: false,
    params: [
      { name: 'html', label: 'HTML Content', type: 'textarea', placeholder: '<h1>Hello World</h1><p>DocuConvert PDF Tool House</p>' }
    ],
    faqs: [
      { q: 'Can I input raw HTML code?', a: 'Yes, paste HTML markup directly into the text area to render it as a PDF.' }
    ]
  },

  // 4. CONVERT FROM PDF
  {
    id: 'pdf_to_jpg',
    action: 'pdf_to_jpg',
    slug: 'pdf-to-jpg',
    category: 'convert_from',
    title: 'PDF to JPG',
    seoTitle: 'Convert PDF to High-Res JPG Images | DocuConvert Pro',
    seoDescription: 'Extract every page of a PDF document into high-resolution JPG image files (150/300 DPI).',
    description: 'Extract every page of a PDF document into high-resolution JPG image files.',
    icon: 'FileImage',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'dpi', label: 'Image Quality (DPI)', type: 'select', options: ['150', '300'], default: '150' }
    ],
    faqs: [
      { q: 'What resolution are the extracted JPG images?', a: 'Choose between 150 DPI standard resolution or 300 DPI ultra-high print resolution.' }
    ]
  },
  {
    id: 'pdf_to_word',
    action: 'pdf_to_word',
    slug: 'pdf-to-word',
    category: 'convert_from',
    title: 'PDF to Word',
    seoTitle: 'Convert PDF to Word Online — PDF to DOCX Free | DocuConvert Pro',
    seoDescription: 'Convert PDF files into editable Word (.docx) documents with layout and text extraction.',
    description: 'Convert PDF files into editable Word (.docx) documents with text & layout extraction.',
    icon: 'FileCode',
    accept: '.pdf',
    multiple: false,
    params: [],
    faqs: [
      { q: 'Can I edit the output Word document?', a: 'Yes! Output files are fully editable .docx documents.' }
    ]
  },
  {
    id: 'pdf_to_ppt',
    action: 'pdf_to_ppt',
    slug: 'pdf-to-powerpoint',
    category: 'convert_from',
    title: 'PDF to PowerPoint',
    seoTitle: 'Convert PDF to PowerPoint Presentation | DocuConvert Pro',
    seoDescription: 'Convert PDF pages into editable PowerPoint (.pptx) presentation slides.',
    description: 'Convert PDF files into editable PowerPoint (.pptx) presentation slides.',
    icon: 'Monitor',
    accept: '.pdf',
    multiple: false,
    params: [],
    faqs: [
      { q: 'Does PDF to PowerPoint turn pages into slides?', a: 'Yes, each PDF page is converted into a PowerPoint slide.' }
    ]
  },
  {
    id: 'pdf_to_excel',
    action: 'pdf_to_excel',
    slug: 'pdf-to-excel',
    category: 'convert_from',
    title: 'PDF to Excel',
    seoTitle: 'Extract PDF Data Tables to Excel (.xlsx) | DocuConvert Pro',
    seoDescription: 'Extract data tables from PDF documents directly into structured Excel (.xlsx) sheets.',
    description: 'Extract data tables from PDF documents directly into Excel (.xlsx) sheets.',
    icon: 'FileSpreadsheet',
    accept: '.pdf',
    multiple: false,
    params: [],
    faqs: [
      { q: 'Can I extract financial tables from PDFs?', a: 'Yes, table rows and columns are parsed directly into Excel cells.' }
    ]
  },
  {
    id: 'pdf_to_pdfa',
    action: 'pdf_to_pdfa',
    slug: 'pdf-to-pdfa',
    category: 'convert_from',
    title: 'PDF to PDF/A',
    seoTitle: 'Convert PDF to ISO-Compliant PDF/A Archival Format | DocuConvert Pro',
    seoDescription: 'Convert standard PDF documents into ISO-compliant PDF/A archival format for long-term storage.',
    description: 'Convert standard PDF documents into ISO-compliant PDF/A archival format.',
    icon: 'Archive',
    accept: '.pdf',
    multiple: false,
    params: [],
    faqs: [
      { q: 'What is PDF/A format?', a: 'PDF/A is an ISO-standardized version of PDF specialized for archiving and long-term preservation.' }
    ]
  },

  // 5. EDIT PDF
  {
    id: 'rotate',
    action: 'rotate',
    slug: 'rotate-pdf',
    category: 'edit',
    title: 'Rotate PDF',
    seoTitle: 'Rotate PDF Pages Online Free (90°, 180°, 270°) | DocuConvert Pro',
    seoDescription: 'Rotate PDF document pages by 90°, 180°, or 270° degrees permanently.',
    description: 'Rotate PDF document pages by 90°, 180°, or 270° degrees.',
    icon: 'RotateCw',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'angle', label: 'Rotation Angle', type: 'select', options: ['90', '180', '270'], default: '90' }
    ],
    faqs: [
      { q: 'Can I rotate individual pages?', a: 'Yes, select pages or apply rotation to all pages in your document.' }
    ]
  },
  {
    id: 'page_numbers',
    action: 'page_numbers',
    slug: 'add-page-numbers',
    category: 'edit',
    title: 'Add Page Numbers',
    seoTitle: 'Add Page Numbers to PDF Online | DocuConvert Pro',
    seoDescription: 'Stamp customizable page numbers (Page X of Y) on header or footer regions of your PDF.',
    description: 'Stamp customizable page numbers (e.g., Page X of Y) on header or footer regions.',
    icon: 'Hash',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'position', label: 'Position', type: 'select', options: ['bottom-right', 'bottom-center', 'bottom-left'], default: 'bottom-right' }
    ],
    faqs: [
      { q: 'Where are page numbers stamped?', a: 'Choose bottom-right, bottom-center, or bottom-left placement.' }
    ]
  },
  {
    id: 'watermark',
    action: 'watermark',
    slug: 'add-watermark',
    category: 'edit',
    title: 'Add Watermark',
    seoTitle: 'Stamp Text Watermarks on PDF Online | DocuConvert Pro',
    seoDescription: 'Stamp diagonal text watermarks (CONFIDENTIAL, DRAFT, DO NOT COPY) on your PDF pages.',
    description: 'Stamp diagonal text watermarks (e.g. CONFIDENTIAL, DRAFT, DO NOT COPY) on your PDF pages.',
    icon: 'Stamp',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'text', label: 'Watermark Text', type: 'text', placeholder: 'CONFIDENTIAL', default: 'CONFIDENTIAL' }
    ],
    faqs: [
      { q: 'Can I customize the watermark text?', a: 'Yes, enter any custom text string to stamp across all pages.' }
    ]
  },
  {
    id: 'crop',
    action: 'crop',
    slug: 'crop-pdf',
    category: 'edit',
    title: 'Crop PDF',
    seoTitle: 'Crop & Trim PDF Margins Online | DocuConvert Pro',
    seoDescription: 'Trim page margins and adjust bounding box limits of your PDF file.',
    description: 'Trim page margins and adjust bounding box limits of your PDF file.',
    icon: 'Crop',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'top', label: 'Top Margin (px)', type: 'number', default: 20 },
      { name: 'bottom', label: 'Bottom Margin (px)', type: 'number', default: 20 }
    ],
    faqs: [
      { q: 'How does margin cropping work?', a: 'Specify pixel offsets for top and bottom margins to trim white space.' }
    ]
  },
  {
    id: 'edit_text',
    action: 'edit_text',
    slug: 'edit-pdf-text',
    category: 'edit',
    title: 'Edit PDF Text',
    seoTitle: 'Annotate & Add Text to PDF Online | DocuConvert Pro',
    seoDescription: 'Overlay custom text callouts, notes, and annotations directly onto PDF pages.',
    description: 'Overlay custom text callouts, notes, and annotations directly onto PDF pages.',
    icon: 'Type',
    accept: '.pdf',
    multiple: false,
    params: [],
    faqs: [
      { q: 'Can I add new text boxes to existing PDFs?', a: 'Yes, overlay new annotations and notes anywhere on document pages.' }
    ]
  },
  {
    id: 'fill_forms',
    action: 'fill_forms',
    slug: 'pdf-forms',
    category: 'edit',
    title: 'PDF Forms',
    seoTitle: 'Fill Out Interactive AcroForm PDF Forms | DocuConvert Pro',
    seoDescription: 'Fill out interactive AcroForm text fields and submit PDF form data.',
    description: 'Fill out interactive AcroForm text fields and submit PDF form data.',
    icon: 'CheckSquare',
    accept: '.pdf',
    multiple: false,
    params: [],
    faqs: [
      { q: 'Does it support interactive PDF form fields?', a: 'Yes, parses AcroForm fields and exports populated PDF forms.' }
    ]
  },

  // 6. PDF SECURITY
  {
    id: 'unlock',
    action: 'unlock',
    slug: 'unlock-pdf',
    category: 'security',
    title: 'Unlock PDF',
    seoTitle: 'Remove PDF Password & Restrictions | DocuConvert Pro',
    seoDescription: 'Remove owner passwords and open restriction permissions from protected PDFs.',
    description: 'Remove owner passwords and open restriction permissions from protected PDFs.',
    icon: 'Unlock',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'password', label: 'Current Password', type: 'password', placeholder: 'Enter password if needed' }
    ],
    faqs: [
      { q: 'How do I unlock a password-protected PDF?', a: 'Provide the document password to permanently remove encryption restrictions.' }
    ]
  },
  {
    id: 'protect',
    action: 'protect',
    slug: 'protect-pdf',
    category: 'security',
    title: 'Protect PDF',
    seoTitle: 'Encrypt & Password Protect PDF (128/256-bit AES) | DocuConvert Pro',
    seoDescription: 'Encrypt your PDF document with a strong 128/256-bit AES user password.',
    description: 'Encrypt your PDF document with a strong 128/256-bit AES user password.',
    icon: 'Lock',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'password', label: 'Set Password', type: 'password', placeholder: 'Choose strong password' }
    ],
    faqs: [
      { q: 'What encryption algorithm is used?', a: 'DocuConvert Pro uses industry-standard 128/256-bit AES encryption.' }
    ]
  },
  {
    id: 'sign',
    action: 'sign',
    slug: 'sign-pdf',
    category: 'security',
    title: 'Sign PDF',
    seoTitle: 'Electronic Signature & Digital Stamp on PDF | DocuConvert Pro',
    seoDescription: 'Add electronic signatures and verification stamps to official PDF contracts.',
    description: 'Add electronic signatures and verification stamps to official PDF contracts.',
    icon: 'PenTool',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'sign_text', label: 'Signature Text / Name', type: 'text', default: 'Digitally Signed by DocuConvert' }
    ],
    faqs: [
      { q: 'Can I add custom signature text?', a: 'Yes, customize name, date, and verification text stamps.' }
    ]
  },
  {
    id: 'redact',
    action: 'redact',
    slug: 'redact-pdf',
    category: 'security',
    title: 'Redact PDF',
    seoTitle: 'Permanently Blackout & Redact PDF Text | DocuConvert Pro',
    seoDescription: 'Permanently blackout confidential keywords, names, or sensitive numbers from PDF files.',
    description: 'Permanently blackout confidential keywords, names, or sensitive numbers.',
    icon: 'EyeOff',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'keywords', label: 'Keywords to Blackout (comma separated)', type: 'text', placeholder: 'CONFIDENTIAL, SECRET, SSN' }
    ],
    faqs: [
      { q: 'Is redaction permanent?', a: 'Yes, underlying text content is completely removed from document vector streams.' }
    ]
  },
  {
    id: 'compare',
    action: 'compare',
    slug: 'compare-pdf',
    category: 'security',
    title: 'Compare PDF',
    seoTitle: 'Compare 2 PDF Documents Side-by-Side | DocuConvert Pro',
    seoDescription: 'Compare 2 PDF documents side-by-side to highlight text and structural differences.',
    description: 'Compare 2 PDF documents side-by-side to highlight text and structural differences.',
    icon: 'GitCompare',
    accept: '.pdf',
    multiple: true,
    params: [],
    faqs: [
      { q: 'How does PDF comparison work?', a: 'Upload 2 PDF documents to generate a visual diff highlighting modifications.' }
    ]
  },

  // 7. AI INTELLIGENCE
  {
    id: 'ai_summarize',
    action: 'ai_summarize',
    slug: 'ai-summary',
    category: 'ai',
    title: 'AI PDF Summarizer',
    seoTitle: 'AI PDF Summarizer — Extract Key Insights & Summaries | DocuConvert Pro',
    seoDescription: 'Extract executive summaries, key takeaways, and word metrics using PDF AI intelligence.',
    description: 'Extract executive summaries, key takeaways, and word metrics using PDF AI intelligence.',
    icon: 'Sparkles',
    accept: '.pdf',
    multiple: false,
    params: [],
    faqs: [
      { q: 'Does AI summarization send data to external APIs?', a: 'No, DocuConvert Pro uses native local NLP processing directly on your server.' }
    ]
  },
  {
    id: 'translate',
    action: 'translate',
    slug: 'translate-pdf',
    category: 'ai',
    title: 'Translate PDF',
    seoTitle: 'Translate PDF Online — Multi-Language PDF Translator | DocuConvert Pro',
    seoDescription: 'Translate PDF document text into Spanish, French, German, Hindi, Japanese, or Chinese.',
    description: 'Translate PDF document text into Spanish, French, German, Hindi, Japanese, or Chinese.',
    icon: 'Languages',
    accept: '.pdf',
    multiple: false,
    params: [
      { name: 'lang', label: 'Target Language', type: 'select', options: ['es', 'fr', 'de', 'hi', 'ja', 'zh'], default: 'es' }
    ],
    faqs: [
      { q: 'Which languages are supported?', a: 'Supports Spanish, French, German, Hindi, Japanese, Chinese, and more.' }
    ]
  },
  {
    id: 'to_markdown',
    action: 'to_markdown',
    slug: 'pdf-to-markdown',
    category: 'ai',
    title: 'PDF to Markdown',
    seoTitle: 'Extract PDF to Structured Markdown (.md) | DocuConvert Pro',
    seoDescription: 'Extract structured Markdown (.md) text with headings, lists, and formatted code blocks.',
    description: 'Extract structured Markdown (.md) text with headings, lists, and formatted code blocks.',
    icon: 'FileCode2',
    accept: '.pdf',
    multiple: false,
    params: [],
    faqs: [
      { q: 'Why convert PDF to Markdown?', a: 'Markdown is clean, lightweight, and ideal for AI LLM context windows and documentation.' }
    ]
  }
];
