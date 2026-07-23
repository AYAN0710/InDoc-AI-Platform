from app.database.chroma_db import collection

def store_document(chunks,embeddings):
    for index,(chunk,embedding) in enumerate(zip(chunks,embeddings)):
        collection.add(
            ids=[str(index)],
            documents=[chunk],
            embeddings=[embedding.tolist()],
            metadatas=[
                {
                    "chunk_number":index
                }
            ]
        )
    print("Document Stored Successfully !")