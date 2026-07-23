import shutil
from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File,Body,Form,HTTPException
from pathlib import Path
from app.config import UPLOAD_FOLDER
from app.services.document_service import process_document
from app.services.vector_search import search
from app.services.loaders.text_loader import extract_user_text
from app.services.document_loader import load_document

app=FastAPI(title="InDoc",version="1.0")

@app.get("/")
def home():
    return{
        "message":"backend running successfully !"
    }
    
@app.post("/upload")
async def process_input(file:UploadFile | None=File(None),
                        text: str | None = Form(None)):
    if file:
        file_path=UPLOAD_FOLDER/file.filename
        with open(file_path,"wb") as buffer:
            shutil.copyfileobj(file.file,buffer)
        document_text=load_document(str(file_path))
        filename=file.filename
    elif text:
        document_text=extract_user_text(text)
        filename=file.filename
    else:
        raise HTTPException(status_code=400,detail="Please provide file or text.")
    
    result=process_document(document_text=document_text,
                            filename=file.filename)
    return {
        "document_id": result["document_id"],
        "filename": result["filename"],
        "summary": result["summary"],
        "total_chunks": len(result["chunks"])
}
    
from pydantic import BaseModel
from app.services.rag_service import ask_question

class SearchRequest(BaseModel):
    query:str
    document_id:str
    
@app.post("/search")
def semantic_search(request:SearchRequest):
    return search(
        query=request.query,
        document_id=request.document_id
    )


class QuestionRequest(BaseModel):
    query:str
    document_id:str

@app.post("/ask")
def ask(request:QuestionRequest):
    return ask_question(request.query,
                        document_id=request.document_id)