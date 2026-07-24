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
#from app.services.document_repository import get_all_documents,get_document,delete_document
from fastapi import Depends
from sqlalchemy.orm import Session
from app.database1 import get_db
from app.crud import get_all_documents,get_document_by_id,delete_document
from app.database1 import Base, engine
from app import models
from app.services.vector_store import delete_document_vectors
from app.services.file_service import delete_uploaded_file
from pydantic import BaseModel
from app.services.rag_service import ask_question
from fastapi.middleware.cors import CORSMiddleware


app=FastAPI(title="InDoc",version="1.0")

# Allow all origins so the React frontend (localhost:3000) can connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return{
        "message":"backend running successfully !"
    }
    
@app.post("/upload")
async def process_input(db:Session=Depends(get_db),file:UploadFile | None=File(None),
                        text: str | None = Form(None)):
    if file:
        file_path=UPLOAD_FOLDER/file.filename
        with open(file_path,"wb") as buffer:
            shutil.copyfileobj(file.file,buffer)
        document_text=load_document(str(file_path))
        filename=file.filename
    elif text:
        document_text=extract_user_text(text)
        filename="UserInput"
    else:
        raise HTTPException(status_code=400,detail="Please provide file or text.")
    
    result=process_document(db=db,document_text=document_text,
                            filename=filename)
    return {
        "document_id": result["document_id"],
        "filename": result["filename"],
        "summary": result["summary"],
        "total_chunks": result["total_chunks"]
}
    


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
    

@app.get("/documents")
def list_documents(db:Session=Depends(get_db)):
    return get_all_documents(db)

@app.get("/documents/{document_id}")
def document_details(document_id:str,db:Session=Depends(get_db)):
    document=get_document_by_id(db,document_id)
    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found."
        )
    return document

@app.delete("/documents/{document_id}")
def remove_document(document_id: str,db: Session = Depends(get_db)):
    document = get_document_by_id(db,document_id)
    if document is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found."
        )
    delete_document_vectors(document_id)
    delete_uploaded_file(document.filename)
    delete_document(
        db,
        document_id
    )
    return {
        "message": "Document deleted successfully."
    }