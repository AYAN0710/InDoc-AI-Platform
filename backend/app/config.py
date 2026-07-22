from pathlib import Path

BASE_DIR=Path(__file__).resolve().parent.parent
UPLOAD_FOLDER=BASE_DIR/"uploads"
UPLOAD_FOLDER.mkdir(exist_ok=True)

SUMMARIZATION_MODEL="facebook/bart-large-cnn"
MAX_SUMMARY_LENGTH=180
MIN_SUMMARY_LENGTH=50
CHUNK_SIZE=256
CHUNK_OVERLAP=40