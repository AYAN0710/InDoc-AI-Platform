from typing import Dict

documents: Dict[str,dict]={}

def add_document(
    document_id:str,
    filename:str,
    summary:str,
    total_chunks:int
):
    documents[document_id]={
        "document_id":document_id,
        "filename":filename,
        "summary":summary,
        "total_chunks":total_chunks
    }
    
def get_all_documents():
    return list(documents.values())

def get_document(document_id:str):
    return documents.get(document_id)

def delete_document(document_id:str):
    if document_id in documents:
        del documents[document_id]