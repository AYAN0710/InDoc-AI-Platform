import shutil
from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File
from pathlib import Path
from app.config import UPLOAD_FOLDER
from app.pdf_service import extract_text_from_pdf

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
    file_path=UPLOAD_FOLDER/pdf.filename
    with open(file_path,"wb") as buffer:
        shutil.copyfileobj(pdf.file,buffer)
    extracted_text=extract_text_from_pdf(str(file_path))
    return {
        "filename":pdf.filename,
        "characters":len(extracted_text),
        "text":extracted_text
    }