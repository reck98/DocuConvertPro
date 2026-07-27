import os
import sys
import pypdf
import fitz # PyMuPDF
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import io

def rotate_pdf(input_path, output_path, angle=90):
    reader = pypdf.PdfReader(input_path)
    writer = pypdf.PdfWriter()
    
    for page in reader.pages:
        page.rotate(angle)
        writer.add_page(page)
        
    with open(output_path, "wb") as f:
        writer.write(f)
    return True, f"Rotated PDF by {angle} degrees"

def add_page_numbers(input_path, output_path, position="bottom-right", start_num=1, format_str="Page {page} of {total}"):
    reader = pypdf.PdfReader(input_path)
    total_pages = len(reader.pages)
    writer = pypdf.PdfWriter()
    
    for idx, page in enumerate(reader.pages):
        packet = io.BytesIO()
        can = canvas.Canvas(packet, pagesize=(float(page.mediabox.width), float(page.mediabox.height)))
        can.setFont("Helvetica", 10)
        can.setFillColorRGB(0.3, 0.3, 0.3)
        
        num_str = format_str.replace("{page}", str(idx + start_num)).replace("{total}", str(total_pages))
        
        w = float(page.mediabox.width)
        h = float(page.mediabox.height)
        
        if position == "bottom-right":
            x, y = w - 100, 20
        elif position == "bottom-center":
            x, y = w / 2 - 30, 20
        else: # bottom-left
            x, y = 40, 20
            
        can.drawString(x, y, num_str)
        can.save()
        packet.seek(0)
        
        num_pdf = pypdf.PdfReader(packet)
        page.merge_page(num_pdf.pages[0])
        writer.add_page(page)
        
    with open(output_path, "wb") as f:
        writer.write(f)
    return True, "Added page numbers"

def add_watermark(input_path, output_path, watermark_text="CONFIDENTIAL", opacity=0.3, rotation=45):
    reader = pypdf.PdfReader(input_path)
    writer = pypdf.PdfWriter()
    
    for page in reader.pages:
        w = float(page.mediabox.width)
        h = float(page.mediabox.height)
        
        packet = io.BytesIO()
        can = canvas.Canvas(packet, pagesize=(w, h))
        can.setFont("Helvetica-Bold", 42)
        can.setFillColorRGB(0.5, 0.5, 0.5, alpha=opacity)
        
        can.saveState()
        can.translate(w / 2, h / 2)
        can.rotate(rotation)
        can.drawCentredString(0, 0, watermark_text)
        can.restoreState()
        can.save()
        
        packet.seek(0)
        wm_pdf = pypdf.PdfReader(packet)
        page.merge_page(wm_pdf.pages[0])
        writer.add_page(page)
        
    with open(output_path, "wb") as f:
        writer.write(f)
    return True, "Watermark stamped"

def crop_pdf(input_path, output_path, top=20, bottom=20, left=20, right=20):
    reader = pypdf.PdfReader(input_path)
    writer = pypdf.PdfWriter()
    
    for page in reader.pages:
        page.cropbox.lower_left = (
            float(page.cropbox.lower_left[0]) + left,
            float(page.cropbox.lower_left[1]) + bottom
        )
        page.cropbox.upper_right = (
            float(page.cropbox.upper_right[0]) - right,
            float(page.cropbox.upper_right[1]) - top
        )
        writer.add_page(page)
        
    with open(output_path, "wb") as f:
        writer.write(f)
    return True, "PDF cropped"

def edit_pdf_text(input_path, output_path, annotations=None):
    # annotations: list of {page, x, y, text, color, fontSize}
    doc = fitz.open(input_path)
    annotations = annotations or []
    
    for ann in annotations:
        p_idx = int(ann.get("page", 0))
        if 0 <= p_idx < len(doc):
            page = doc[p_idx]
            rect = fitz.Point(float(ann.get("x", 50)), float(ann.get("y", 50)))
            page.insert_text(
                rect,
                ann.get("text", "Edited Text"),
                fontsize=float(ann.get("fontSize", 12)),
                color=(0, 0, 0)
            )
            
    doc.save(output_path)
    doc.close()
    return True, "PDF text edit saved"

def fill_pdf_forms(input_path, output_path, form_data=None):
    # form_data: dict of {field_name: field_value}
    reader = pypdf.PdfReader(input_path)
    writer = pypdf.PdfWriter()
    writer.append(reader)
    
    if form_data:
        writer.update_page_form_field_values(writer.pages[0], form_data)
        
    with open(output_path, "wb") as f:
        writer.write(f)
    return True, "PDF form fields updated"
