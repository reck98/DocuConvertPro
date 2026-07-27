import sys
import os
import time
import json
import argparse
import subprocess

def count_pdf_pages(pdf_path):
    try:
        import pypdf
        reader = pypdf.PdfReader(pdf_path)
        return len(reader.pages)
    except Exception:
        try:
            with open(pdf_path, 'rb') as f:
                content = f.read()
                import re
                pages = re.findall(b'/Type\s*/Page[^s]', content)
                return max(len(pages), 1)
        except Exception:
            return 1

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
            return True, "LibreOffice Headless Engine", None
        return False, "LibreOffice Headless Engine", res.stderr or "Failed to generate PDF"
    except Exception as e:
        return False, "LibreOffice Headless Engine", str(e)

def convert_single_file(word_app, input_path, output_path):
    start_time = time.time()
    abs_input = os.path.abspath(input_path)
    abs_output = os.path.abspath(output_path)
    
    if word_app is not None:
        doc = None
        try:
            doc = word_app.Documents.Open(
                FileName=abs_input,
                ConfirmConversions=False,
                ReadOnly=True,
                AddToRecentFiles=False
            )
            doc.SaveAs2(FileName=abs_output, FileFormat=17)
            duration_ms = int((time.time() - start_time) * 1000)
            
            pdf_size = os.path.getsize(abs_output) if os.path.exists(abs_output) else 0
            pages = count_pdf_pages(abs_output) if os.path.exists(abs_output) else 1
            
            return {
                "success": True,
                "engine": "MS Word Native COM Engine",
                "input_file": os.path.basename(input_path),
                "output_file": os.path.basename(output_path),
                "file_size": pdf_size,
                "page_count": pages,
                "duration_ms": duration_ms,
                "error": None
            }
        except Exception as e:
            pass
        finally:
            if doc is not None:
                try: doc.Close(False)
                except Exception: pass

    # Fallback to LibreOffice Headless
    success, engine_name, error_msg = convert_with_libreoffice(input_path, output_path)
    duration_ms = int((time.time() - start_time) * 1000)
    pdf_size = os.path.getsize(abs_output) if (success and os.path.exists(abs_output)) else 0
    pages = count_pdf_pages(abs_output) if (success and os.path.exists(abs_output)) else 1

    return {
        "success": success,
        "engine": engine_name,
        "input_file": os.path.basename(input_path),
        "output_file": os.path.basename(output_path),
        "file_size": pdf_size,
        "page_count": pages,
        "duration_ms": duration_ms,
        "error": error_msg
    }

def main():
    parser = argparse.ArgumentParser(description="Word to PDF Converter")
    parser.add_argument("input_path", nargs="?", help="Path to input .docx file")
    parser.add_argument("output_path", nargs="?", help="Path to output .pdf file")
    parser.add_argument("--batch", help="JSON string containing list of {input, output} file pairs")
    
    args = parser.parse_args()
    
    word_app = None
    if sys.platform == "win32":
        try:
            import win32com.client
            import pythoncom
            pythoncom.CoInitialize()
            word_app = win32com.client.DispatchEx("Word.Application")
            word_app.Visible = False
            word_app.DisplayAlerts = False
        except Exception:
            word_app = None

    try:
        if args.batch:
            items = json.loads(args.batch)
            results = []
            for item in items:
                res = convert_single_file(word_app, item['input'], item['output'])
                results.append(res)
            print(json.dumps({"batch": True, "results": results}))
        elif args.input_path and args.output_path:
            res = convert_single_file(word_app, args.input_path, args.output_path)
            print(json.dumps(res))
            if not res['success']:
                sys.exit(1)
        else:
            print(json.dumps({"success": False, "error": "Invalid arguments"}))
            sys.exit(1)
            
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)
    finally:
        if word_app is not None:
            try: word_app.Quit()
            except Exception: pass
            if sys.platform == "win32":
                import pythoncom
                pythoncom.CoUninitialize()

if __name__ == "__main__":
    main()
