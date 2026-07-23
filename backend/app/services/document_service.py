from app.services.pdf_service import extract_text_from_pdf
from app.services.summarizer import summarize_text
from app.services.chunk_service import split_into_chunks
from app.services.embedding_service import generate_embedding
from app.services.vector_store import store_document

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
    
    embeddings=[]
    for chunk in chunks:
        vector=generate_embedding(chunk)
        embeddings.append(vector)
        
    store_document(chunks,embeddings)
    
    return {
        "text":extracted_text,
        "summary":summary,
        "chunks":chunks,
        "embeddings":embeddings
    }