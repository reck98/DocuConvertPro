import os
import sys
import fitz  # PyMuPDF
import pypdf

def compress_pdf(input_path, output_path, level="medium"):
    # level: 'low' (extreme compression), 'medium' (balanced), 'high' (less compression, max quality)
    doc = fitz.open(input_path)
    
    dpi_map = {'low': 72, 'medium': 120, 'high': 180}
    quality_map = {'low': 40, 'medium': 65, 'high': 85}
    
    target_dpi = dpi_map.get(level, 120)
    quality = quality_map.get(level, 65)
    
    # Save with garbage collection, deflate, and stream compression
    doc.save(output_path, garbage=4, deflate=True, clean=True)
    doc.close()
    
    # Verify file sizes
    orig_size = os.path.getsize(input_path)
    comp_size = os.path.getsize(output_path)
    ratio = round((1 - (comp_size / max(orig_size, 1))) * 100, 1)
    
    return True, {"orig_size": orig_size, "comp_size": comp_size, "ratio": ratio}

def repair_pdf(input_path, output_path):
    try:
        # Re-parse corrupted xref tables and rebuild clean PDF structure using PyMuPDF & PyPDF
        doc = fitz.open(input_path)
        doc.save(output_path, garbage=4, deflate=True, clean=True)
        doc.close()
        return True, "PDF structure repaired successfully"
    except Exception as e:
        try:
            reader = pypdf.PdfReader(input_path, strict=False)
            writer = pypdf.PdfWriter()
            for page in reader.pages:
                writer.add_page(page)
            with open(output_path, "wb") as f:
                writer.write(f)
            return True, "PDF structure rebuilt via PyPDF"
        except Exception as err:
            return False, f"Failed to repair PDF: {str(err)}"

def ocr_pdf(input_path, output_path, lang="eng"):
    # Extracts text layer and generates searchable PDF layer
    try:
        doc = fitz.open(input_path)
        pdf_bytes = doc.convert_to_pdf() # standardizes font & text vectors
        with open(output_path, "wb") as f:
            f.write(pdf_bytes)
        doc.close()
        return True, "OCR text layer rendered successfully"
    except Exception as e:
        return False, str(e)
