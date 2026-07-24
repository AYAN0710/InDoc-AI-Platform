import { useState, useCallback } from 'react';
import documentService from '../services/documentService';

export function useChat() {
  const [responseState, setResponseState] = useState({
    isVisible: false,
    type: null, // 'summary' | 'answer' | 'loading'
    title: '',
    content: '',
    query: '',
    documentId: null,
    timestamp: null,
  });
  const [isAsking, setIsAsking] = useState(false);
  const [chatError, setChatError] = useState(null);

  // Show summary in response panel
  const showSummary = useCallback((summaryText, documentName = 'Document', docId = null) => {
    setChatError(null);
    setResponseState({
      isVisible: true,
      type: 'summary',
      title: `Summary of ${documentName}`,
      content: summaryText || 'No summary available for this document.',
      query: '',
      documentId: docId,
      timestamp: new Date().toISOString(),
    });
  }, []);

  // Ask question (RAG)
  const askQuestion = useCallback(async (documentId, query, documentName = 'Document') => {
    if (!documentId || !query?.trim()) return;

    setIsAsking(true);
    setChatError(null);
    setResponseState({
      isVisible: true,
      type: 'loading',
      title: `Asking about "${documentName}"`,
      content: '',
      query: query.trim(),
      documentId,
      timestamp: new Date().toISOString(),
    });

    try {
      const data = await documentService.askQuestion(documentId, query.trim());
      
      // Backend returns string or object with { answer: "..." } or raw string
      let answerText = typeof data === 'string' ? data : (data.answer || data.response || JSON.stringify(data, null, 2));

      setResponseState({
        isVisible: true,
        type: 'answer',
        title: `AI Response`,
        content: answerText,
        query: query.trim(),
        documentId,
        timestamp: new Date().toISOString(),
      });
      return answerText;
    } catch (err) {
      console.error('Failed to ask question:', err);
      setChatError(err.message || 'Failed to generate answer.');
      setResponseState({
        isVisible: true,
        type: 'error',
        title: 'Error Generating Response',
        content: err.message || 'Failed to retrieve answer from AI backend.',
        query: query.trim(),
        documentId,
        timestamp: new Date().toISOString(),
      });
      throw err;
    } finally {
      setIsAsking(false);
    }
  }, []);

  // Clear response panel
  const clearResponse = useCallback(() => {
    setResponseState({
      isVisible: false,
      type: null,
      title: '',
      content: '',
      query: '',
      documentId: null,
      timestamp: null,
    });
    setChatError(null);
  }, []);

  return {
    responseState,
    isAsking,
    chatError,
    showSummary,
    askQuestion,
    clearResponse,
    setChatError,
  };
}
