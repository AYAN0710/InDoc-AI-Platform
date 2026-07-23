from app.services.document_loader import load_document
from app.services.summarizer import summarize_text
from app.services.chunk_service import split_into_chunks
from app.services.embedding_service import generate_embedding
from app.services.vector_store import store_document
from app.utils.id_generator import generate_document_id

def process_document(document_text:str,filename:str):
    
    summary=summarize_text(document_text)
    chunks=split_into_chunks(document_text)
    
    # print(len(chunks))
    # print()
    # for index,chunk in enumerate(chunks):
    #     print(f"CHUNK{index+1}")
    #     print(chunk)
    #     print("\n")
    document_id=generate_document_id()
    
    embeddings=[]
    
    for chunk in chunks:
        vector=generate_embedding(chunk)
        embeddings.append(vector)
        
    store_document(
        document_id=document_id,
        filename=filename,
        chunks=chunks,
        embeddings=embeddings
    )
    
    return {
        "document_id":document_id,
        "filename":filename,
        "summary":summary,
        "chunks":chunks
    }