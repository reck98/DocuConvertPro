import os
import sys
import pypdf
import fitz  # PyMuPDF
import difflib

def protect_pdf(input_path, output_path, user_password, owner_password=None):
    reader = pypdf.PdfReader(input_path)
    writer = pypdf.PdfWriter()
    
    for page in reader.pages:
        writer.add_page(page)
        
    writer.encrypt(user_password=user_password, owner_password=owner_password or user_password)
    
    with open(output_path, "wb") as f:
        writer.write(f)
    return True, "PDF protected with password encryption"

def unlock_pdf(input_path, output_path, password):
    reader = pypdf.PdfReader(input_path)
    if reader.is_encrypted:
        success = reader.decrypt(password)
        if not success:
            return False, "Incorrect password"
            
    writer = pypdf.PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
        
    with open(output_path, "wb") as f:
        writer.write(f)
    return True, "PDF unlocked"

def sign_pdf(input_path, output_path, signature_image_path=None, sign_text="Digitally Signed", page_idx=0, x=100, y=100):
    doc = fitz.open(input_path)
    if 0 <= page_idx < len(doc):
        page = doc[page_idx]
        if signature_image_path and os.path.exists(signature_image_path):
            rect = fitz.Rect(x, y, x + 150, y + 60)
            page.insert_image(rect, filename=signature_image_path)
        else:
            rect = fitz.Point(x, y)
            page.insert_text(rect, f"✔ {sign_text}", fontsize=14, color=(0, 0.4, 0.8))
            
    doc.save(output_path)
    doc.close()
    return True, "Digital signature applied"

def redact_pdf(input_path, output_path, keywords=None):
    # Permanently blackouts sensitive keywords
    doc = fitz.open(input_path)
    keywords = keywords or ["CONFIDENTIAL", "SECRET", "SSN"]
    
    for page in doc:
        for kw in keywords:
            areas = page.search_for(kw)
            for rect in areas:
                page.add_redact_annot(rect, fill=(0, 0, 0))
        page.apply_redactions()
        
    doc.save(output_path)
    doc.close()
    return True, "Sensitive information redacted"

def compare_pdfs(pdf1_path, pdf2_path, output_path):
    doc1 = fitz.open(pdf1_path)
    doc2 = fitz.open(pdf2_path)
    
    text1 = "\n".join([page.get_text("text") for page in doc1])
    text2 = "\n".join([page.get_text("text") for page in doc2])
    
    diff = list(difflib.unified_diff(
        text1.splitlines(),
        text2.splitlines(),
        fromfile=os.path.basename(pdf1_path),
        tofile=os.path.basename(pdf2_path),
        lineterm=""
    ))
    
    # Save diff comparison summary to text / HTML PDF report
    out_doc = fitz.open()
    page = out_doc.new_page()
    page.insert_text((36, 36), f"PDF Comparison Report\nFile 1: {os.path.basename(pdf1_path)}\nFile 2: {os.path.basename(pdf2_path)}\n\nDifferences Detected:\n", fontsize=14)
    
    y = 120
    for line in diff[:40]:
        color = (0.8, 0, 0) if line.startswith("-") else (0, 0.6, 0) if line.startswith("+") else (0.2, 0.2, 0.2)
        page.insert_text((36, y), line[:80], fontsize=10, color=color)
        y += 14
        if y > 800:
            page = out_doc.new_page()
            y = 36
            
    out_doc.save(output_path)
    out_doc.close()
    doc1.close()
    doc2.close()
    
    return True, f"Comparison report generated with {len(diff)} diff entries"
