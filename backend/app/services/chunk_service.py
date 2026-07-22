# from app.config import CHUNK_OVERLAP,CHUNK_SIZE

# def split_into_chunks(text:str):
#     chunks=[]
#     start=0
#     while(start<len(text)):
#         end=start+CHUNK_SIZE
#         chunk=text[start:end]
#         chunks.append(chunk)
#         start=start+(CHUNK_SIZE-CHUNK_OVERLAP)
#     return chunks

from transformers import AutoTokenizer
from app.config import SUMMARIZATION_MODEL,CHUNK_OVERLAP,CHUNK_SIZE

tokenizer=AutoTokenizer.from_pretrained(SUMMARIZATION_MODEL)

def split_into_chunks(text:str):
    token_ids=tokenizer.encode(text,add_special_tokens=False)
    print("TOTAL TOKENS: ",len(token_ids))
    chunks=[]
    start=0
    while(start<len(token_ids)):
        end=start+CHUNK_SIZE
        chunk_ids=token_ids[start:end]
        chunk_text=tokenizer.decode(chunk_ids,skip_special_tokens=True)
        chunks.append(chunk_text)
        start+=(CHUNK_SIZE-CHUNK_OVERLAP)
    return chunks
