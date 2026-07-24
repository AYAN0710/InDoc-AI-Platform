import React, { useState, useEffect } from 'react';
import RainbowBorderContainer from './components/Common/RainbowBorderContainer';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Workspace from './components/Workspace/Workspace';
import UploadModal from './components/Modals/UploadModal';
import DeleteConfirmModal from './components/Modals/DeleteConfirmModal';
import Toast from './components/Common/Toast';
import { useDocuments } from './hooks/useDocuments';
import { useChat } from './hooks/useChat';

export function App() {
  // Navigation & UI States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  // Custom Hooks
  const {
    documents,
    selectedDocument,
    summariesMap,
    isLoading,
    isUploading,
    uploadProgress,
    error: documentError,
    selectDocument,
    uploadDocument,
    deleteDocument,
  } = useDocuments();

  const {
    responseState,
    isAsking,
    chatError,
    showSummary,
    askQuestion,
    clearResponse,
  } = useChat();

  // Show errors via toast if document error occurs
  useEffect(() => {
    if (documentError) {
      setToast({ message: documentError, type: 'error' });
    }
  }, [documentError]);

  // Show chat errors via toast
  useEffect(() => {
    if (chatError) {
      setToast({ message: chatError, type: 'error' });
    }
  }, [chatError]);

  // Handlers
  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  // 1. Upload Handler
  const handleUploadSubmit = async ({ file, text }) => {
    try {
      const newDoc = await uploadDocument({ file, text });
      setToast({
        message: `Successfully uploaded ${newDoc.filename}!`,
        type: 'success',
      });
      // Immediately display summary if returned
      if (newDoc.summary) {
        showSummary(newDoc.summary, newDoc.filename, newDoc.document_id);
      }
    } catch (err) {
      // Handled in hook
      throw err;
    }
  };

  // Direct Text Input Handler from Prompt Bar
  const handleDirectTextSubmit = async (userText) => {
    if (!userText?.trim()) return;
    try {
      const newDoc = await uploadDocument({ file: null, text: userText.trim() });
      setToast({
        message: `Processed text input successfully!`,
        type: 'success',
      });
      if (newDoc.summary) {
        showSummary(newDoc.summary, newDoc.filename, newDoc.document_id);
      }
    } catch (err) {
      setToast({
        message: err.message || 'Failed to process text.',
        type: 'error',
      });
    }
  };

  // 2. Summarize Button Handler
  const handleSummarize = () => {
    if (!selectedDocument) return;
    const docId = selectedDocument.document_id;
    const storedSummary = summariesMap[docId] || selectedDocument.summary;
    showSummary(
      storedSummary || 'No summary available for this document.',
      selectedDocument.filename,
      docId
    );
  };

  // 3. Ask Button Handler (RAG)
  const handleAsk = async (queryText) => {
    if (!selectedDocument) return;
    try {
      await askQuestion(selectedDocument.document_id, queryText, selectedDocument.filename);
    } catch (err) {
      // Handled in hook
    }
  };

  // Delete Request Handler
  const handleDeleteRequest = (doc) => {
    setDocumentToDelete(doc);
  };

  const handleConfirmDelete = async () => {
    if (!documentToDelete) return;
    setIsDeleting(true);
    try {
      const { wasSelectedDeleted } = await deleteDocument(documentToDelete.document_id);
      
      // If deleted document was selected, clear response panel
      if (wasSelectedDeleted) {
        clearResponse();
      }

      setToast({
        message: `Deleted "${documentToDelete.filename}" successfully.`,
        type: 'success',
      });
      setDocumentToDelete(null);
    } catch (err) {
      setToast({
        message: err.message || 'Failed to delete document.',
        type: 'error',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <RainbowBorderContainer>
      {/* Top Fixed Glass Navbar */}
      <Navbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        selectedDocument={selectedDocument}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        onOpenUploadModal={handleOpenUploadModal}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Document Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
          documents={documents}
          selectedDocument={selectedDocument}
          onSelectDocument={selectDocument}
          onDeleteDocumentRequest={handleDeleteRequest}
          isLoading={isLoading}
          onOpenUploadModal={handleOpenUploadModal}
        />

        {/* Central AI Workspace */}
        <Workspace
          selectedDocument={selectedDocument}
          hasDocuments={documents.length > 0}
          responseState={responseState}
          onCloseResponsePanel={clearResponse}
          onOpenUploadModal={handleOpenUploadModal}
          onSummarize={handleSummarize}
          onAsk={handleAsk}
          onDirectTextSubmit={handleDirectTextSubmit}
          isAsking={isAsking}
        />
      </div>

      {/* Upload Modal (Files & User Text) */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        onUpload={handleUploadSubmit}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmModal
        isOpen={!!documentToDelete}
        documentToDelete={documentToDelete}
        onClose={() => setDocumentToDelete(null)}
        onConfirmDelete={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* Toast Notifications */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />
    </RainbowBorderContainer>
  );
}

export default App;
