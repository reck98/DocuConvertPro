import sys
import os
import win32com.client
import pythoncom
import uuid

def create_sample_docx(output_path, title, count_pages=1):
    pythoncom.CoInitialize()
    word = None
    doc = None
    try:
        word = win32com.client.DispatchEx("Word.Application")
        word.Visible = False
        doc = word.Documents.Add()
        
        # Add Title
        selection = word.Selection
        selection.Style = "Heading 1"
        selection.TypeText(f"{title}\n")
        
        selection.Style = "Normal"
        selection.TypeText("Generated sample document for testing Word to PDF conversion.\n\n")
        
        # Section 1
        selection.Style = "Heading 2"
        selection.TypeText("1. Conversion Overview\n")
        selection.Style = "Normal"
        selection.TypeText(
            "This document tests high-fidelity text formatting, typography hierarchy, "
            "heading structures, and table layouts converted directly via MS Word Engine.\n\n"
        )
        
        # Add a Table
        table = doc.Tables.Add(selection.Range, 4, 3)
        table.Borders.Enable = True
        
        headers = ["ID", "Feature Test", "Expected Outcome"]
        for col_idx, text in enumerate(headers, start=1):
            table.Cell(1, col_idx).Range.Text = text
            table.Cell(1, col_idx).Range.Bold = True
            
        rows_data = [
            ["001", "Text & Fonts", "Preserve exact typography & spacing"],
            ["002", "Tables & Grid", "Clean vector borders & aligned cells"],
            ["003", "Bulk Pipeline", "Fast & parallel conversion queue"]
        ]
        
        for row_idx, row in enumerate(rows_data, start=2):
            for col_idx, val in enumerate(row, start=1):
                table.Cell(row_idx, col_idx).Range.Text = val
                
        # Move cursor past table
        selection.EndKey(Unit=6) # wdStory = 6
        selection.TypeParagraph()
        selection.TypeParagraph()
        
        if count_pages > 1:
            for p in range(2, count_pages + 1):
                selection.InsertBreak(Type=7) # wdPageBreak = 7
                selection.Style = "Heading 1"
                selection.TypeText(f"Page {p} - Detailed Specification\n")
                selection.Style = "Normal"
                selection.TypeText(
                    f"Additional content on page {p} demonstrating multi-page docx layout, "
                    "headers, pagination, and vector output.\n\n"
                )
                
        doc.SaveAs2(FileName=os.path.abspath(output_path))
        doc.Close()
        word.Quit()
        return True, None
    except Exception as e:
        return False, str(e)
    finally:
        pythoncom.CoUninitialize()

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python sample_generator.py <output_path> <title> [pages]")
        sys.exit(1)
        
    out_file = sys.argv[1]
    doc_title = sys.argv[2]
    pages = int(sys.argv[3]) if len(sys.argv) > 3 else 1
    
    success, err = create_sample_docx(out_file, doc_title, pages)
    if success:
        print(f"SUCCESS: Created sample at {out_file}")
    else:
        print(f"ERROR: {err}")
