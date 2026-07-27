import os
import sys
import json
import pypdf
import fitz  # PyMuPDF
from PIL import Image, ImageEnhance

def merge_pdfs(input_paths, output_path):
    merger = pypdf.PdfMerger()
    for path in input_paths:
        merger.append(path)
    merger.write(output_path)
    merger.close()
    return True, "Merged successfully"

def split_pdf(input_path, output_dir, mode="all", pages_str=""):
    reader = pypdf.PdfReader(input_path)
    total_pages = len(reader.pages)
    output_files = []
    
    if mode == "all":
        for idx in range(total_pages):
            writer = pypdf.PdfWriter()
            writer.add_page(reader.pages[idx])
            out_file = os.path.join(output_dir, f"split_page_{idx+1}.pdf")
            with open(out_file, "wb") as f:
                writer.write(f)
            output_files.append(out_file)
    else:
        # Range mode e.g., "1-3, 5"
        pages_to_extract = parse_page_ranges(pages_str, total_pages)
        writer = pypdf.PdfWriter()
        for page_idx in pages_to_extract:
            writer.add_page(reader.pages[page_idx])
        out_file = os.path.join(output_dir, "split_extracted.pdf")
        with open(out_file, "wb") as f:
            writer.write(f)
        output_files.append(out_file)
        
    return True, output_files

def remove_pages(input_path, output_path, pages_str):
    reader = pypdf.PdfReader(input_path)
    total_pages = len(reader.pages)
    remove_indices = set(parse_page_ranges(pages_str, total_pages))
    
    writer = pypdf.PdfWriter()
    for idx in range(total_pages):
        if idx not in remove_indices:
            writer.add_page(reader.pages[idx])
            
    with open(output_path, "wb") as f:
        writer.write(f)
    return True, "Pages removed"

def extract_pages(input_path, output_path, pages_str):
    reader = pypdf.PdfReader(input_path)
    total_pages = len(reader.pages)
    extract_indices = parse_page_ranges(pages_str, total_pages)
    
    writer = pypdf.PdfWriter()
    for idx in extract_indices:
        writer.add_page(reader.pages[idx])
        
    with open(output_path, "wb") as f:
        writer.write(f)
    return True, "Pages extracted"

def organize_pdf(input_path, output_path, page_orders, rotations=None, deletions=None):
    # page_orders: array of 0-based page indices
    # rotations: dict of {page_index: angle_deg}
    # deletions: list of 0-based page indices to delete
    reader = pypdf.PdfReader(input_path)
    writer = pypdf.PdfWriter()
    
    rotations = rotations or {}
    deletions = set(deletions or [])
    
    for idx in page_orders:
        if idx in deletions:
            continue
        page = reader.pages[idx]
        if str(idx) in rotations:
            angle = int(rotations[str(idx)])
            page.rotate(angle)
        writer.add_page(page)
        
    with open(output_path, "wb") as f:
        writer.write(f)
    return True, "Organized PDF saved"

def scan_to_pdf(input_images_or_pdf, output_path, grayscale=True, contrast=1.5):
    # Converts input images or PDF into high-contrast "scanned document" style PDF
    doc_images = []
    
    if isinstance(input_images_or_pdf, str) and input_images_or_pdf.lower().endswith(".pdf"):
        doc = fitz.open(input_images_or_pdf)
        for page in doc:
            pix = page.get_pixmap(dpi=150)
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            doc_images.append(img)
    elif isinstance(input_images_or_pdf, list):
        for img_path in input_images_or_pdf:
            img = Image.open(img_path).convert("RGB")
            doc_images.append(img)
            
    processed_images = []
    for img in doc_images:
        if grayscale:
            img = img.convert("L")
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(contrast)
        processed_images.append(img.convert("RGB"))
        
    if processed_images:
        processed_images[0].save(output_path, save_all=True, append_images=processed_images[1:])
        return True, "Scan to PDF completed"
    return False, "No valid pages to scan"

def parse_page_ranges(pages_str, total_pages):
    indices = []
    parts = pages_str.split(",")
    for part in parts:
        part = part.strip()
        if "-" in part:
            try:
                start, end = part.split("-")
                s = max(0, int(start) - 1)
                e = min(total_pages, int(end))
                indices.extend(range(s, e))
            except Exception:
                pass
        else:
            try:
                val = int(part) - 1
                if 0 <= val < total_pages:
                    indices.append(val)
            except Exception:
                pass
    return indices
