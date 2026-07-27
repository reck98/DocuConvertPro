# ==========================================
# STAGE 1: Build React Client Frontend
# ==========================================
FROM node:22-alpine AS client-builder
WORKDIR /app/client

# Copy client package manifests and install dependencies via npm ci
COPY client/package*.json ./
RUN npm ci

# Copy client source code and build production static bundle
COPY client/ ./
RUN npm run build

# ==========================================
# STAGE 2: Production Server & Runner
# ==========================================
FROM python:3.12-slim-bookworm AS runner

# Set production environment variables
ENV NODE_ENV=production \
    PORT=5000 \
    PYTHONUNBUFFERED=1 \
    DEBIAN_FRONTEND=noninteractive

WORKDIR /app

# Install Node.js runtime, LibreOffice (headless office converter), and system utilities
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    gnupg \
    libreoffice-writer \
    libreoffice-calc \
    libreoffice-impress \
    wget \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy server package manifests and install production node dependencies via npm ci
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --only=production

# Install Python production PDF processing libraries
RUN pip install --no-cache-dir \
    pypdf==6.14.2 \
    pymupdf==1.28.0 \
    pillow==12.3.0 \
    img2pdf==0.6.3 \
    pdfplumber==0.11.10 \
    python-pptx==1.0.2 \
    openpyxl==3.1.5 \
    reportlab==5.0.0 \
    python-docx==1.2.0 \
    pikepdf==10.10.0

WORKDIR /app

# Copy server source code and python tool scripts
COPY server/ ./server/

# Copy built frontend assets from STAGE 1 into server directory
COPY --from=client-builder /app/client/dist ./client/dist

# Create uploads/outputs directories and grant permissions to non-root user
RUN mkdir -p /app/server/uploads /app/server/outputs && \
    useradd -m -u 10001 appuser && \
    chown -R appuser:appuser /app

# Switch to non-root user for security
USER appuser

# Expose application port
EXPOSE 5000

# Healthcheck monitoring
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:${PORT}/health || exit 1

# Start production server
CMD ["node", "server/index.js"]
