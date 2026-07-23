from app.services.embedding_service import generate_embedding
from app.services.similarity_service import cosine_similarity

def retrieve_top_chunks(
    query:str,chunks:list,embeddings:list,top_k:int=3
):
    query_embedding=generate_embedding(query)
    scores=[]
    for chunk,embedding in zip(chunks,embeddings):
        score=cosine_similarity(query_embedding,embedding)
        scores.append(score,chunk)
        scores.sort(key=lambda x:x[0],reverse=True)
        return scores[:top_k]