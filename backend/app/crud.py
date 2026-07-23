from sqlalchemy.orm import Session
from app.models import Document
from app.schemas import DocumentCreate


def create_document(db: Session,document_id: str,document: DocumentCreate):
     db_document = Document(
        document_id=document_id,
        filename=document.filename,
        summary=document.summary,
        file_type=document.file_type,
        total_chunks=document.total_chunks
    )
     db.add(db_document)
     db.commit()
     db.refresh(db_document)
     return db_document
 
def get_all_documents(db:Session):
    return(db.query(Document).order_by(Document.created_at.desc()).all())

def get_document_by_id(db:Session,document_id:str):
    return (db.query(Document).filter(Document.document_id==document_id).first())

def delete_document(db:Session,document_id:str):
    document=get_document_by_id(db,document_id)
    if document is None:
        return None
    db.delete(document)
    db.commit()
    return document
    