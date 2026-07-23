from app.services.vector_search import search
from app.services.llm_service import generate_answer

def ask_question(query:str,document_id:str):
    results=search(query=query,document_id=document_id)
    retrieved_chunks=results["documents"][0]
    context="\n\n".join(retrieved_chunks)
    
    #prompt
    prompt=f"""
    you are an ai assistant.answer only from the context
    given to you. if the answer is not present in that context,
    then reply: 
    "I couldn't find the answer inside the uploaded document."
    Context:{context}
    Question:{query}
    Answer:
    """
    answer=generate_answer(prompt)
    return{
        "question":query,
        "context":retrieved_chunks,
        "answer":answer
    }
    
    