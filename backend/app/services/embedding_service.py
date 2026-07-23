import torch
import torch.nn.functional as F
from transformers import AutoTokenizer,AutoModel
from app.config import EMBEDDING_MODEL

tokenizer=AutoTokenizer.from_pretrained(EMBEDDING_MODEL)
model=AutoModel.from_pretrained(EMBEDDING_MODEL)
model.eval()

def mean_pooling(model_output,attention_mask):
    token_embeddings=model_output.last_hidden_state
    input_mask=attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    summed=torch.sum(token_embeddings*input_mask,dim=1)
    counts=torch.clamp(input_mask.sum(dim=1),min=1e-9)
    return summed/counts

def generate_embedding(text:str):
    encoded=tokenizer(text,padding=True,truncation=True,max_length=256,return_tensors="pt")
    input_ids=encoded["input_ids"]
    attention_mask=encoded["attention_mask"]
    with torch.no_grad():
        output=model(input_ids=input_ids,attention_mask=attention_mask)
    embedding=mean_pooling(output,attention_mask)
    embedding=F.normalize(embedding,p=2,dim=1)
    embedding=embedding.squeeze()
    return embedding.numpy()