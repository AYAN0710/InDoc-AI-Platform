from app.database.chroma_db import collection


def store_document(
    document_id,
    filename,
    chunks,
    embeddings
):

    ids = []
    documents = []
    vectors = []
    metadatas = []

    for index, (chunk, embedding) in enumerate(zip(chunks, embeddings)):

        ids.append(f"{document_id}_{index}")

        documents.append(chunk)

        vectors.append(embedding.tolist())

        metadatas.append(
            {
                "document_id": document_id,
                "filename": filename,
                "chunk_number": index
            }
        )

    collection.add(
        ids=ids,
        documents=documents,
        embeddings=vectors,
        metadatas=metadatas
    )

    print(f"{filename} stored successfully.")