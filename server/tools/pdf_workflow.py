import os
import sys
import json
import shutil
import uuid

import pdf_organize
import pdf_optimize
import pdf_convert_to
import pdf_convert_from
import pdf_edit
import pdf_security
import pdf_ai

def execute_workflow(input_files, output_dir, workflow_steps):
    # input_files: list of file paths
    # workflow_steps: list of dicts e.g. [{"tool": "compress", "params": {...}}, ...]
    
    current_files = list(input_files)
    temp_dir = os.path.join(output_dir, f"wf_temp_{uuid.uuid4().hex[:6]}")
    os.makedirs(temp_dir, exist_ok=True)
    
    step_logs = []
    
    for idx, step in enumerate(workflow_steps):
        tool = step.get("tool")
        params = step.get("params", {})
        
        step_out_dir = os.path.join(temp_dir, f"step_{idx}_{tool}")
        os.makedirs(step_out_dir, exist_ok=True)
        
        next_files = []
        
        if tool == "merge":
            out_pdf = os.path.join(step_out_dir, "merged.pdf")
            success, msg = pdf_organize.merge_pdfs(current_files, out_pdf)
            if success: next_files.append(out_pdf)
            step_logs.append(f"Step {idx+1} [Merge]: {msg}")
            
        elif tool == "compress":
            for f in current_files:
                out_pdf = os.path.join(step_out_dir, f"compressed_{os.path.basename(f)}")
                success, data = pdf_optimize.compress_pdf(f, out_pdf, level=params.get("level", "medium"))
                if success: next_files.append(out_pdf)
            step_logs.append(f"Step {idx+1} [Compress]: Processed {len(next_files)} files")
            
        elif tool == "watermark":
            text = params.get("text", "CONFIDENTIAL")
            for f in current_files:
                out_pdf = os.path.join(step_out_dir, f"wm_{os.path.basename(f)}")
                success, msg = pdf_edit.add_watermark(f, out_pdf, watermark_text=text)
                if success: next_files.append(out_pdf)
            step_logs.append(f"Step {idx+1} [Watermark]: Stamped '{text}'")
            
        elif tool == "protect":
            pwd = params.get("password", "123456")
            for f in current_files:
                out_pdf = os.path.join(step_out_dir, f"protected_{os.path.basename(f)}")
                success, msg = pdf_security.protect_pdf(f, out_pdf, user_password=pwd)
                if success: next_files.append(out_pdf)
            step_logs.append(f"Step {idx+1} [Protect]: Encrypted with password")
            
        elif tool == "rotate":
            angle = int(params.get("angle", 90))
            for f in current_files:
                out_pdf = os.path.join(step_out_dir, f"rotated_{os.path.basename(f)}")
                success, msg = pdf_edit.rotate_pdf(f, out_pdf, angle=angle)
                if success: next_files.append(out_pdf)
            step_logs.append(f"Step {idx+1} [Rotate]: Rotated by {angle}°")

        if next_files:
            current_files = next_files

    # Copy final resulting files to output directory
    final_outputs = []
    for f in current_files:
        dest = os.path.join(output_dir, f"workflow_result_{os.path.basename(f)}")
        shutil.copy(f, dest)
        final_outputs.append(dest)
        
    shutil.rmtree(temp_dir, ignore_errors=True)
    return True, {"logs": step_logs, "output_files": final_outputs}
