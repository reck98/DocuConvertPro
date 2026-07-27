const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { execFile, exec } = require('child_process');
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure upload and output directories exist
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const OUTPUTS_DIR = path.join(__dirname, 'outputs');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(OUTPUTS_DIR)) fs.mkdirSync(OUTPUTS_DIR, { recursive: true });

// Configure Multer storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4().substring(0, 8)}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB per file
});

// Helper: Run Python Tool Dispatcher
function runToolDispatcher(action, payloadData) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, 'pdf_tool_dispatcher.py');
    const payloadStr = JSON.stringify(payloadData);

    execFile('python', [scriptPath, '--action', action, '--payload', payloadStr], { maxBuffer: 30 * 1024 * 1024 }, (error, stdout, stderr) => {
      try {
        if (stdout && stdout.trim()) {
          const parsed = JSON.parse(stdout.trim());
          if (parsed.success) {
            return resolve(parsed.result);
          } else {
            return reject(new Error(parsed.error || 'Tool execution failed'));
          }
        }
      } catch (e) {}

      if (error) {
        return reject(new Error(stderr || error.message || 'Error executing tool dispatcher'));
      }
      reject(new Error('Unknown tool execution error'));
    });
  });
}

// 1. Lightweight Healthcheck Endpoint (For Docker / Cloud Run / Northflank)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    port: PORT
  });
});

// 2. Engine Health & Registered Tools Status
app.get('/api/engine-status', (req, res) => {
  res.json({
    available: true,
    engine: 'DocuConvert PDF Studio Full House (27 Tools)',
    os: process.platform,
    categoriesCount: 8,
    totalTools: 27,
    details: 'All PDF processing tools and Workflow Automation active.'
  });
});

// 3. Generic Tool Dispatcher Endpoint for all 27 PDF Tools
app.post('/api/tools/:action', upload.array('files', 20), async (req, res) => {
  const action = req.params.action;
  let params = {};
  
  if (req.body.params) {
    try {
      params = typeof req.body.params === 'string' ? JSON.parse(req.body.params) : req.body.params;
    } catch (e) {}
  }

  const uploadedFiles = req.files || [];
  const inputPaths = uploadedFiles.map(f => f.path);
  const primaryInput = inputPaths[0] || null;

  const outputFileName = `studio_${action}_${uuidv4().substring(0, 8)}.pdf`;
  const outputPath = path.join(OUTPUTS_DIR, outputFileName);

  const payload = {
    input_path: primaryInput,
    input_files: inputPaths,
    output_path: outputPath,
    output_dir: OUTPUTS_DIR,
    params
  };

  try {
    const result = await runToolDispatcher(action, payload);

    if (Array.isArray(result)) {
      const fileMetas = result.map(f => ({
        filename: path.basename(f),
        downloadUrl: `/api/download/${path.basename(f)}`,
        previewUrl: `/api/preview/${path.basename(f)}`
      }));
      return res.json({ success: true, action, type: 'file_list', files: fileMetas });
    }

    if (typeof result === 'object' && result !== null && !fs.existsSync(outputPath)) {
      return res.json({ success: true, action, type: 'data', data: result });
    }

    res.json({
      success: true,
      action,
      type: 'single_file',
      pdfFileName: outputFileName,
      downloadUrl: `/api/download/${outputFileName}`,
      previewUrl: `/api/preview/${outputFileName}`,
      details: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      action,
      error: error.message || 'Failed to process PDF tool action'
    });
  } finally {
    inputPaths.forEach(p => fs.unlink(p, () => {}));
  }
});

// 4. Workflow Automation Endpoint
app.post('/api/workflow/execute', upload.array('files', 20), async (req, res) => {
  const uploadedFiles = req.files || [];
  const inputPaths = uploadedFiles.map(f => f.path);

  let steps = [];
  if (req.body.steps) {
    try {
      steps = typeof req.body.steps === 'string' ? JSON.parse(req.body.steps) : req.body.steps;
    } catch (e) {}
  }

  const payload = {
    input_files: inputPaths,
    output_dir: OUTPUTS_DIR,
    params: { steps }
  };

  try {
    const result = await runToolDispatcher('workflow', payload);
    
    const outputFiles = (result.output_files || []).map(f => {
      const fn = path.basename(f);
      return {
        filename: fn,
        downloadUrl: `/api/download/${fn}`,
        previewUrl: `/api/preview/${fn}`
      };
    });

    res.json({
      success: true,
      logs: result.logs || [],
      files: outputFiles
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  } finally {
    inputPaths.forEach(p => fs.unlink(p, () => {}));
  }
});

// 5. Download Output File
app.get('/api/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(OUTPUTS_DIR, filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, filename);
  } else {
    res.status(404).json({ error: 'Requested file not found or expired.' });
  }
});

// 6. Preview PDF File
app.get('/api/preview/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(OUTPUTS_DIR, filename);

  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.status(404).send('PDF file not found');
  }
});

// Serve production static assets
const CLIENT_BUILD = path.join(__dirname, '../client/dist');
if (fs.existsSync(CLIENT_BUILD)) {
  app.use(express.static(CLIENT_BUILD));
  app.get('*', (req, res) => {
    res.sendFile(path.join(CLIENT_BUILD, 'index.html'));
  });
}

const server = app.listen(PORT, HOST, () => {
  console.log(`DocuConvert PDF Studio Server listening on http://${HOST}:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️ Port ${PORT} is already in use.`);
  } else {
    console.error('Server error:', err);
  }
});

// Graceful Shutdown Handler for SIGTERM & SIGINT (Container platforms e.g. Northflank, Cloud Run)
const gracefulShutdown = (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed cleanly.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Forcing shutdown after 10s timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
