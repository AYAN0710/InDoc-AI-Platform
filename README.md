# InDoc

An AI-powered Document Intelligence System that demonstrates how modern Retrieval-Augmented Generation (RAG) pipelines enable intelligent document understanding and question answering.

## Features

- Multi-format document upload (PDF, DOCX, TXT, PPTX, CSV, Markdown)
- Transformer-based document summarization
- Context-aware Question Answering using RAG
- Semantic similarity search with ChromaDB
- Document chunking and vector embedding generation
- Persistent document metadata storage using SQLite

## Tech Stack

- FastAPI
- Hugging Face Transformers (`facebook/bart-large-cnn`)
- Sentence Transformers (`all-MiniLM-L6-v2`)
- ChromaDB
- Google Gemini
- SQLAlchemy
- SQLite
- Pydantic
- React, Tailwind-CSS

## AI Concepts

- Natural Language Processing (NLP)
- Transformer Models
- Abstractive Summarization
- Sentence Embeddings
- Semantic Similarity Search
- Document Chunking
- Retrieval-Augmented Generation (RAG)
- Vector Databases

## Architecture

```text
Document Upload
      │
      ▼
Text Extraction
      │
      ▼
BART Summarization
      │
      ▼
Document Chunking
      │
      ▼
Sentence Embeddings
      │
      ▼
ChromaDB
      │
      ▼
Semantic Context Retrieval
      │
      ▼
Gemini LLM
      │
      ▼
AI-generated Response
```

## Project Structure

- **Backend:** Designed and implemented using FastAPI with a modular architecture.
- **Frontend:** Built using AI-assisted development tools and integrated with the backend APIs.
- **Database:** SQLite (metadata) + ChromaDB (vector embeddings).


**Built for learning and exploring modern AI, NLP, Transformer models, Vector Databases, and Retrieval-Augmented Generation (RAG).**
