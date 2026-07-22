import shutil
from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File
from pathlib import Path
from app.config import UPLOAD_FOLDER
from app.services.document_service import process_document

app=FastAPI(title="InDoc",version="1.0")

@app.get("/")
def home():
    return{
        "message":"backend running successfully !"
    }
    
@app.post("/upload")
async def upload_pdf(pdf:UploadFile=File(...)):
    if pdf.content_type!="application/pdf":
        return {
            "error":"Only PDF files are allowed."
        }
    pdf_path=UPLOAD_FOLDER/pdf.filename
    with open(pdf_path,"wb") as file:
        shutil.copyfileobj(pdf.file,file)
    result=process_document(str(pdf_path))
    return {
        "filename":pdf.filename,
        "characters":len(result["text"]),
        "summary":result["summary"],
        "text":result["text"],
        "chunks":result["chunks"]
    }