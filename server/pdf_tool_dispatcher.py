import sys
import os
import json
import argparse

sys.path.append(os.path.join(os.path.dirname(__file__), "tools"))

import pdf_organize
import pdf_optimize
import pdf_convert_to
import pdf_convert_from
import pdf_edit
import pdf_security
import pdf_ai
import pdf_workflow

def main():
    parser = argparse.ArgumentParser(description="PDF Studio Tool Dispatcher")
    parser.add_argument("--action", required=True, help="Tool action name (e.g. merge, compress, protect)")
    parser.add_argument("--payload", required=True, help="JSON string containing input files and tool parameters")
    
    args = parser.parse_args()
    
    action = args.action.lower()
    try:
        data = json.loads(args.payload)
    except Exception as e:
        print(json.dumps({"success": False, "error": f"Invalid JSON payload: {str(e)}"}))
        sys.exit(1)
        
    input_path = data.get("input_path")
    input_files = data.get("input_files", [])
    output_path = data.get("output_path")
    output_dir = data.get("output_dir")
    params = data.get("params", {})

    success = False
    result = None

    try:
        # 1. ORGANIZE PDF
        if action == "merge":
            success, result = pdf_organize.merge_pdfs(input_files, output_path)
        elif action == "split":
            success, result = pdf_organize.split_pdf(input_path, output_dir, mode=params.get("mode", "all"), pages_str=params.get("pages", ""))
        elif action == "remove_pages":
            success, result = pdf_organize.remove_pages(input_path, output_path, params.get("pages", ""))
        elif action == "extract_pages":
            success, result = pdf_organize.extract_pages(input_path, output_path, params.get("pages", ""))
        elif action == "organize":
            success, result = pdf_organize.organize_pdf(input_path, output_path, params.get("page_orders", []), params.get("rotations"), params.get("deletions"))
        elif action == "scan":
            success, result = pdf_organize.scan_to_pdf(input_path or input_files, output_path, grayscale=params.get("grayscale", True), contrast=float(params.get("contrast", 1.5)))
            
        # 2. OPTIMIZE PDF
        elif action == "compress":
            success, result = pdf_optimize.compress_pdf(input_path, output_path, level=params.get("level", "medium"))
        elif action == "repair":
            success, result = pdf_optimize.repair_pdf(input_path, output_path)
        elif action == "ocr":
            success, result = pdf_optimize.ocr_pdf(input_path, output_path, lang=params.get("lang", "eng"))

        # 3. CONVERT TO PDF
        elif action == "jpg_to_pdf":
            success, result = pdf_convert_to.jpg_to_pdf(input_files, output_path)
        elif action == "word_to_pdf":
            success, result = pdf_convert_to.word_to_pdf(input_path, output_path)
        elif action == "ppt_to_pdf":
            success, result = pdf_convert_to.ppt_to_pdf(input_path, output_path)
        elif action == "excel_to_pdf":
            success, result = pdf_convert_to.excel_to_pdf(input_path, output_path)
        elif action == "html_to_pdf":
            success, result = pdf_convert_to.html_to_pdf(params.get("html", ""), output_path)

        # 4. CONVERT FROM PDF
        elif action == "pdf_to_jpg":
            success, result = pdf_convert_from.pdf_to_jpg(input_path, output_dir, dpi=int(params.get("dpi", 150)))
        elif action == "pdf_to_word":
            success, result = pdf_convert_from.pdf_to_word(input_path, output_path)
        elif action == "pdf_to_ppt":
            success, result = pdf_convert_from.pdf_to_ppt(input_path, output_path)
        elif action == "pdf_to_excel":
            success, result = pdf_convert_from.pdf_to_excel(input_path, output_path)
        elif action == "pdf_to_pdfa":
            success, result = pdf_convert_from.pdf_to_pdfa(input_path, output_path)

        # 5. EDIT PDF
        elif action == "rotate":
            success, result = pdf_edit.rotate_pdf(input_path, output_path, angle=int(params.get("angle", 90)))
        elif action == "page_numbers":
            success, result = pdf_edit.add_page_numbers(input_path, output_path, position=params.get("position", "bottom-right"))
        elif action == "watermark":
            success, result = pdf_edit.add_watermark(input_path, output_path, watermark_text=params.get("text", "CONFIDENTIAL"))
        elif action == "crop":
            success, result = pdf_edit.crop_pdf(input_path, output_path, top=int(params.get("top", 20)), bottom=int(params.get("bottom", 20)))
        elif action == "edit_text":
            success, result = pdf_edit.edit_pdf_text(input_path, output_path, annotations=params.get("annotations"))
        elif action == "fill_forms":
            success, result = pdf_edit.fill_pdf_forms(input_path, output_path, form_data=params.get("form_data"))

        # 6. PDF SECURITY
        elif action == "protect":
            success, result = pdf_security.protect_pdf(input_path, output_path, user_password=params.get("password", "123456"))
        elif action == "unlock":
            success, result = pdf_security.unlock_pdf(input_path, output_path, password=params.get("password", ""))
        elif action == "sign":
            success, result = pdf_security.sign_pdf(input_path, output_path, sign_text=params.get("sign_text", "Digitally Signed"))
        elif action == "redact":
            success, result = pdf_security.redact_pdf(input_path, output_path, keywords=params.get("keywords", ["CONFIDENTIAL"]))
        elif action == "compare":
            success, result = pdf_security.compare_pdfs(input_files[0], input_files[1], output_path)

        # 7. AI POWERED TOOLS
        elif action == "ai_summarize":
            success, result = pdf_ai.ai_summarize_pdf(input_path)
        elif action == "translate":
            success, result = pdf_ai.translate_pdf(input_path, output_path, target_lang=params.get("lang", "es"))
        elif action == "to_markdown":
            success, result = pdf_ai.pdf_to_markdown(input_path, output_path)

        # 8. WORKFLOW AUTOMATION
        elif action == "workflow":
            success, result = pdf_workflow.execute_workflow(input_files, output_dir, params.get("steps", []))

        else:
            success = False
            result = f"Unknown action: {action}"

        print(json.dumps({"success": success, "result": result}))

    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))

if __name__ == "__main__":
    main()
