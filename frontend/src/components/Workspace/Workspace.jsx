import React from 'react';
import EmptyState from './EmptyState';
import ResponsePanel from './ResponsePanel';
import PromptBar from './PromptBar';

export const Workspace = ({
  selectedDocument,
  hasDocuments,
  responseState,
  onCloseResponsePanel,
  onOpenUploadModal,
  onSummarize,
  onAsk,
  onDirectTextSubmit,
  isAsking,
}) => {
  return (
    <main className="flex-1 flex flex-col justify-between overflow-y-auto px-4 py-3 relative z-10">
      {/* Upper Area: Either Response Panel or Empty State */}
      <div className="flex-1 flex flex-col justify-center max-w-5xl w-full mx-auto">
        {responseState.isVisible ? (
          <ResponsePanel
            responseState={responseState}
            onClose={onCloseResponsePanel}
            selectedDocumentName={selectedDocument?.filename}
          />
        ) : (
          <EmptyState hasDocuments={hasDocuments} />
        )}
      </div>

      {/* Bottom Fixed/Centered Prompt Area & Separated Footer */}
      <div className="w-full">
        <PromptBar
          selectedDocument={selectedDocument}
          hasDocuments={hasDocuments}
          onOpenUploadModal={onOpenUploadModal}
          onSummarize={onSummarize}
          onAsk={onAsk}
          onDirectTextSubmit={onDirectTextSubmit}
          isAsking={isAsking}
        />

        {/* Separated Light Theme Footer with Line */}
        <div className="w-full max-w-4xl mx-auto mt-2 pt-2.5 border-t border-slate-300/80">
          <footer className="text-center pb-2 text-xs sm:text-sm font-semibold text-slate-700 tracking-wide select-none">
            Multi-Format Support (PDF, DOCX, TXT, CSV, MD, PPTX) &bull; Instant Summarization &bull; AI RAG Q&amp;A
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Workspace;
