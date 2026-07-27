import os
import sys
import json
import pypdf
import fitz  # PyMuPDF
from PIL import Image, ImageEnhance

def merge_pdfs(input_paths, output_path):
    writer = pypdf.PdfWriter()
    for path in input_paths:
        writer.append(path)
    with open(output_path, "wb") as f:
        writer.write(f)
    writer.close()
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

def organize_pdf(input_path, output_path, page_orders=None, rotations=None, deletions=None):
    reader = pypdf.PdfReader(input_path)
    total_pages = len(reader.pages)
    writer = pypdf.PdfWriter()
    
    rotations = rotations or {}
    deletions = set(deletions or [])

    if not page_orders:
        page_orders = list(range(total_pages))
    
    # Handle both 0-based and 1-based page order arrays
    for item in page_orders:
        try:
            p_idx = int(item)
            if p_idx > 0 and (p_idx == total_pages or max([int(x) for x in page_orders]) == total_pages):
                p_idx -= 1

            if p_idx in deletions or (p_idx + 1) in deletions:
                continue

            if 0 <= p_idx < total_pages:
                page = reader.pages[p_idx]
                rot_val = rotations.get(str(p_idx)) or rotations.get(str(p_idx + 1))
                if rot_val:
                    page.rotate(int(rot_val))
                writer.add_page(page)
        except Exception:
            pass

    with open(output_path, "wb") as f:
        writer.write(f)
    return True, "Organized PDF saved"

def scan_to_pdf(input_images_or_pdf, output_path, grayscale=True, contrast=1.5):
    doc_images = []
    
    if isinstance(input_images_or_pdf, str) and input_images_or_pdf.lower().endswith(".pdf"):
        doc = fitz.open(input_images_or_pdf)
        for page in doc:
            pix = page.get_pixmap(dpi=150)
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            doc_images.append(img)
        doc.close()
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
    parts = str(pages_str).split(",")
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
