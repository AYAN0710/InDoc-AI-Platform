from pathlib import Path

BASE_DIR=Path(__file__).resolve().parent.parent
UPLOAD_FOLDER=BASE_DIR/"uploads"
UPLOAD_FOLDER.mkdir(exist_ok=True)

SUMMARIZATION_MODEL="facebook/bart-large-cnn"
MAX_SUMMARY_LENGTH=250
MIN_SUMMARY_LENGTH=50
CHUNK_SIZE=256
CHUNK_OVERLAP=40
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY=os.getenv("GEMINI_API_KEY")
GEMINI_MODEL="gemini-3.1-flash-lite"