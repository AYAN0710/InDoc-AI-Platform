import fitz

def extract_text_from_pdf(pdf_path:str)->str:
    document=fitz.open(pdf_path)
    extracted_text=""
    for page in document:
        extracted_text+=page.get_text()
        extracted_text+="\n"
    document.close()
    return extracted_text.strip()