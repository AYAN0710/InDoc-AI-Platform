from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import DateTime
from datetime import datetime,timezone
from app.database1 import Base

class Document(Base):
    __tablename__="documents"
    document_id=Column(String,primary_key=True,index=True)
    filename=Column(String,nullable=False)
    summary=Column(String,nullable=False)
    file_type=Column(String,nullable=False)
    total_chunks=Column(Integer,nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))