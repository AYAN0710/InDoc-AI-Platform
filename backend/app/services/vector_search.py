from app.database.chroma_db import collection
from app.services.embedding_service import generate_embedding


def search(query,document_id,top_k=3):

    query_embedding = generate_embedding(query)

    results = collection.query(
        query_embeddings=[query_embedding.tolist()],
        n_results=top_k,
        where={
            "document_id": document_id
        }
    )

    return results