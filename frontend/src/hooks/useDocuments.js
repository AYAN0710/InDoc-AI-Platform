import { useState, useEffect, useCallback } from 'react';
import documentService from '../services/documentService';

export function useDocuments() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [summariesMap, setSummariesMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  // Fetch all documents from API
  const fetchDocuments = useCallback(async (selectDocId = null) => {
    setIsLoading(true);
    setError(null);
    try {
      const docList = await documentService.listDocuments();
      setDocuments(docList);
      
      // Update summariesMap with any existing summaries returned from document list
      setSummariesMap((prevMap) => {
        const newMap = { ...prevMap };
        docList.forEach((doc) => {
          if (doc.summary && !newMap[doc.document_id]) {
            newMap[doc.document_id] = doc.summary;
          }
        });
        return newMap;
      });

      // Handle document selection logic
      if (selectDocId) {
        const found = docList.find((d) => d.document_id === selectDocId);
        if (found) {
          setSelectedDocument(found);
        } else if (docList.length > 0) {
          setSelectedDocument(docList[0]);
        } else {
          setSelectedDocument(null);
        }
      } else if (docList.length > 0 && !selectedDocument) {
        setSelectedDocument(docList[0]);
      } else if (docList.length === 0) {
        setSelectedDocument(null);
      }
    } catch (err) {
      console.error('Failed to load documents:', err);
      setError(err.message || 'Failed to load document list.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedDocument]);

  // Initial load
  useEffect(() => {
    fetchDocuments();
  }, []);

  // Select document and fetch latest details
  const selectDocument = useCallback(async (doc) => {
    if (!doc) {
      setSelectedDocument(null);
      return;
    }
    setSelectedDocument(doc);
    try {
      const details = await documentService.getDocument(doc.document_id);
      setSelectedDocument((prev) => (prev?.document_id === doc.document_id ? { ...prev, ...details } : prev));
      if (details.summary) {
        setSummariesMap((prev) => ({ ...prev, [doc.document_id]: details.summary }));
      }
    } catch (err) {
      console.warn('Failed to fetch full document details, using existing state:', err);
    }
  }, []);

  // Upload document or text
  const uploadDocument = useCallback(async ({ file, text }) => {
    setIsUploading(true);
    setUploadProgress(20);
    setError(null);
    try {
      setUploadProgress(50);
      const result = await documentService.uploadDocument(file, text);
      setUploadProgress(80);

      // Construct a new document object based on response
      const newDoc = {
        document_id: result.document_id,
        filename: result.filename || (file ? file.name : 'UserInput'),
        summary: result.summary,
        total_chunks: result.total_chunks,
        file_type: file ? file.name.split('.').pop() : 'text',
        created_at: new Date().toISOString(),
      };

      // Save summary in map immediately
      if (result.summary) {
        setSummariesMap((prev) => ({
          ...prev,
          [result.document_id]: result.summary,
        }));
      }

      // Immediately update sidebar without full refresh
      setDocuments((prevDocs) => [newDoc, ...prevDocs.filter((d) => d.document_id !== newDoc.document_id)]);
      
      // Auto-select newly uploaded document
      setSelectedDocument(newDoc);
      setUploadProgress(100);

      return newDoc;
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.message || 'Failed to upload document.');
      throw err;
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 500);
    }
  }, []);

  // Delete document
  const deleteDocument = useCallback(async (documentId) => {
    try {
      await documentService.deleteDocument(documentId);
      
      // Remove document from state immediately
      let remainingDocs = [];
      setDocuments((prevDocs) => {
        remainingDocs = prevDocs.filter((d) => d.document_id !== documentId);
        return remainingDocs;
      });

      // Clear summary cache for this ID
      setSummariesMap((prev) => {
        const next = { ...prev };
        delete next[documentId];
        return next;
      });

      // If deleted document was selected
      let wasSelectedDeleted = false;
      setSelectedDocument((currentSelected) => {
        if (currentSelected?.document_id === documentId) {
          wasSelectedDeleted = true;
          // Auto select next document if available, else null
          return remainingDocs.length > 0 ? remainingDocs[0] : null;
        }
        return currentSelected;
      });

      return { success: true, wasSelectedDeleted };
    } catch (err) {
      console.error('Delete failed:', err);
      setError(err.message || 'Failed to delete document.');
      throw err;
    }
  }, []);

  return {
    documents,
    selectedDocument,
    summariesMap,
    isLoading,
    isUploading,
    uploadProgress,
    error,
    fetchDocuments,
    selectDocument,
    uploadDocument,
    deleteDocument,
    setError,
  };
}
