# from transformers import pipeline
# from app.config import SUMMARIZATION_MODEL,MAX_SUMMARY_LENGTH,MIN_SUMMARY_LENGTH

# summarizer=pipeline(
#     task="summarization",
#     model=SUMMARIZATION_MODEL
# )

# def summarize_text(text:str)->str:
#     text=text.strip()
#     if len(text)==0:
#         return "No text found."
#     text=text[:3500]
#     result=summarizer(
#         text,max_length=MAX_SUMMARY_LENGTH,min_length=MIN_SUMMARY_LENGTH,do_sample=False
#     )
#     return result[0]["summary_text"]


from transformers import AutoTokenizer
from transformers import AutoModelForSeq2SeqLM
import torch
from app.config import SUMMARIZATION_MODEL

tokenizer=AutoTokenizer.from_pretrained(SUMMARIZATION_MODEL)
model=AutoModelForSeq2SeqLM.from_pretrained(SUMMARIZATION_MODEL)
model.eval()

def summarize_text(text:str):
    text=text.strip()
    if text=="":
        return "Empty document."
    text=text[:3500]
    encoded_input=tokenizer(text,return_tensors="pt",max_length=1024,truncation=True)
    input_ids=encoded_input["input_ids"]
    attention_mask=encoded_input["attention_mask"]
    
    # print("\nFIRST 40 TOKENS")
    # tokens=tokenizer.convert_ids_to_tokens(input_ids[0])
    # print(tokens[:40])
    # print("\nFIRST 40 TOKEN IDs")
    # print(input_ids[0][:40])
    # print(tokenizer.vocab_size)
    # print("----------------------------")
    
    # print("\nINPUT SHAPE")
    # print(input_ids.shape)
    # print("\nFIRST 30 TOKEN IDs\n")
    # print(input_ids[0][:30])
    # print("\nATTENTION MASK SHAPE")
    # print(attention_mask.shape)
    
    
    with torch.no_grad():
        generated_ids=model.generate(
            input_ids=input_ids,
            attention_mask=attention_mask,
            max_new_tokens=180,
            num_beams=4,
            no_repeat_ngram_size=3,
            early_stopping=True
        )
    # print("\nGENERATED TOKEN IDs")
    # print(generated_ids[0][:30])
    
    #decode
    summary=tokenizer.decode(generated_ids[0],skip_special_tokens=True)
    return summary
