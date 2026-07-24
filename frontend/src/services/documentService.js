import apiClient from './api';

export const documentService = {
  /**
   * Upload a file or user text to the document intelligence system
   * @param {File|null} file - The file to upload (PDF, DOCX, TXT, CSV, MD, PPTX)
   * @param {string|null} text - Optional raw text input
   * @returns {Promise<{document_id: string, filename: string, summary: string, total_chunks: number}>}
   */
  async uploadDocument(file = null, text = null) {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else if (text) {
      formData.append('text', text);
    } else {
      throw new Error('Please provide either a file or text content to upload.');
    }

    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * List all uploaded documents
   * @returns {Promise<Array<{document_id: string, filename: string, summary: string, file_type: string, total_chunks: number, created_at: string}>>}
   */
  async listDocuments() {
    const response = await apiClient.get('/documents');
    return response.data;
  },

  /**
   * Get single document metadata by ID
   * @param {string} documentId 
   * @returns {Promise<Object>}
   */
  async getDocument(documentId) {
    const response = await apiClient.get(`/documents/${documentId}`);
    return response.data;
  },

  /**
   * Delete a document by ID
   * @param {string} documentId 
   * @returns {Promise<{message: string}>}
   */
  async deleteDocument(documentId) {
    const response = await apiClient.delete(`/documents/${documentId}`);
    return response.data;
  },

  /**
   * Ask a question about a specific document (RAG)
   * @param {string} documentId 
   * @param {string} query 
   * @returns {Promise<string|Object>}
   */
  async askQuestion(documentId, query) {
    const response = await apiClient.post('/ask', {
      query,
      document_id: documentId,
    });
    return response.data;
  },
};

export default documentService;
