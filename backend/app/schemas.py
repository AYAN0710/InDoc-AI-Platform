from datetime import datetime
from pydantic import BaseModel

class DocumentBase(BaseModel):
    filename: str
    summary: str
    file_type: str
    total_chunks: int
    
class DocumentCreate(DocumentBase):
    pass

class DocumentResponse(DocumentBase):
    document_id: str
    created_at: datetime
    class Config:
        from_attributes = True