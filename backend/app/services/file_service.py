from pathlib import Path

UPLOAD_FOLDER = Path("uploads")

def delete_uploaded_file(filename: str):
    file_path = UPLOAD_FOLDER / filename
    if file_path.exists():
        file_path.unlink()