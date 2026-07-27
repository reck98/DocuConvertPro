import os
import sys
import subprocess
import img2pdf
from PIL import Image

def convert_with_libreoffice(input_path, output_path):
    abs_input = os.path.abspath(input_path)
    abs_output = os.path.abspath(output_path)
    out_dir = os.path.dirname(abs_output)
    
    try:
        cmd = ["soffice", "--headless", "--convert-to", "pdf", "--outdir", out_dir, abs_input]
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        
        expected_pdf = os.path.join(out_dir, os.path.splitext(os.path.basename(abs_input))[0] + ".pdf")
        if os.path.exists(expected_pdf):
            if expected_pdf != abs_output:
                if os.path.exists(abs_output): os.remove(abs_output)
                os.rename(expected_pdf, abs_output)
            return True, "Converted via LibreOffice Headless"
        return False, f"LibreOffice failed: {res.stderr}"
    except Exception as e:
        return False, str(e)

def jpg_to_pdf(input_images, output_path):
    valid_images = [img for img in input_images if os.path.exists(img)]
    if not valid_images:
        return False, "No valid image files found"
    try:
        pdf_bytes = img2pdf.convert(valid_images)
        with open(output_path, "wb") as f:
            f.write(pdf_bytes)
        return True, "Converted JPG to PDF"
    except Exception as e:
        images = [Image.open(f).convert("RGB") for f in valid_images]
        images[0].save(output_path, save_all=True, append_images=images[1:])
        return True, "Converted JPG to PDF via Pillow"

def word_to_pdf(input_path, output_path):
    if sys.platform == "win32":
        try:
            import win32com.client
            import pythoncom
            pythoncom.CoInitialize()
            word = win32com.client.DispatchEx("Word.Application")
            word.Visible = False
            word.DisplayAlerts = False
            doc = word.Documents.Open(os.path.abspath(input_path), ReadOnly=True)
            doc.SaveAs2(os.path.abspath(output_path), FileFormat=17)
            doc.Close(False)
            word.Quit()
            pythoncom.CoUninitialize()
            return True, "Word converted to PDF via MS Word COM"
        except Exception:
            pass
    # Fallback / Linux container execution via LibreOffice
    return convert_with_libreoffice(input_path, output_path)

def ppt_to_pdf(input_path, output_path):
    if sys.platform == "win32":
        try:
            import win32com.client
            import pythoncom
            pythoncom.CoInitialize()
            ppt = win32com.client.DispatchEx("PowerPoint.Application")
            presentation = ppt.Presentations.Open(os.path.abspath(input_path), WithWindow=False)
            presentation.SaveAs(os.path.abspath(output_path), 32)
            presentation.Close()
            ppt.Quit()
            pythoncom.CoUninitialize()
            return True, "PowerPoint converted to PDF via MS PPT COM"
        except Exception:
            pass
    return convert_with_libreoffice(input_path, output_path)

def excel_to_pdf(input_path, output_path):
    if sys.platform == "win32":
        try:
            import win32com.client
            import pythoncom
            pythoncom.CoInitialize()
            excel = win32com.client.DispatchEx("Excel.Application")
            excel.Visible = False
            excel.DisplayAlerts = False
            wb = excel.Workbooks.Open(os.path.abspath(input_path), ReadOnly=True)
            wb.ExportAsFixedFormat(0, os.path.abspath(output_path))
            wb.Close(False)
            excel.Quit()
            pythoncom.CoUninitialize()
            return True, "Excel converted to PDF via MS Excel COM"
        except Exception:
            pass
    return convert_with_libreoffice(input_path, output_path)

def html_to_pdf(html_content, output_path):
    import fitz
    try:
        story = fitz.Story(html=html_content)
        writer = fitz.DocumentWriter(output_path)
        more = True
        while more:
            device = writer.begin_page(fitz.Rect(0, 0, 595, 842))
            more, _ = story.place(fitz.Rect(36, 36, 559, 806))
            story.draw(device)
            writer.end_page()
        writer.close()
        return True, "HTML converted to PDF"
    except Exception as e:
        return False, str(e)
