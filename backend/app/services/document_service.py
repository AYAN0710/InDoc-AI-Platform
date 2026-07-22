from app.services.pdf_service import extract_text_from_pdf
from app.services.summarizer import summarize_text
from app.services.chunk_service import split_into_chunks

def process_document(pdf_path:str):
    extracted_text=extract_text_from_pdf(pdf_path)
    summary=summarize_text(extracted_text)
    chunks=split_into_chunks(extracted_text)
    # print(len(chunks))
    # print()
    # for index,chunk in enumerate(chunks):
    #     print(f"CHUNK{index+1}")
    #     print(chunk)
    #     print("\n")
    return {
        "text":extracted_text,
        "summary":summary,
        "chunks":chunks
    }