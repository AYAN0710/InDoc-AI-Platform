from pathlib import Path
from app.services.loaders.pdf_loader import extract_text_from_pdf
from app.services.loaders.docx_loader import extract_docx_text
from app.services.loaders.txt_loader import extract_txt_text
from app.services.loaders.markdown_loader import extract_markdown_text
from app.services.loaders.csv_loader import extract_csv_text
from app.services.loaders.pptx_loader import extract_pptx_text

def load_document(file_path:str)->str:
    extension=Path(file_path).suffix.lower()
    loaders={
        ".pdf": extract_text_from_pdf,

        ".docx": extract_docx_text,

        ".txt": extract_txt_text,

        ".md": extract_markdown_text,

        ".csv": extract_csv_text,

        ".pptx": extract_pptx_text,
    }
    loader=loaders.get(extension)
    if loader is None:
        raise ValueError(
            f"Unsupported file type: {extension}"
        )
    return loader(file_path)