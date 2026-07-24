import React, { useState } from 'react';
import { 
  FolderOpen, 
  Search, 
  FileText, 
  Sparkles, 
  X 
} from 'lucide-react';
import DocumentCard from './DocumentCard';
import DocumentSkeleton from './DocumentSkeleton';

export const Sidebar = ({
  isOpen,
  onCloseMobile,
  documents,
  selectedDocument,
  onSelectDocument,
  onDeleteDocumentRequest,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocuments = documents.filter((doc) =>
    doc.filename?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:static top-16 bottom-0 left-0 z-40 w-[290px] h-[calc(100vh-4rem)] flex flex-col glass-panel border-r border-slate-200/60 transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:pointer-events-none'
        }`}
      >
        {/* Header Section */}
        <div className="p-4 border-b border-slate-200/50 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-brand-600" />
              <h3 className="font-bold text-slate-800 text-sm tracking-tight">
                Uploaded Documents ({documents.length})
              </h3>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search */}
          {documents.length > 0 && (
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl glass-input text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Scrollable Document List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {isLoading ? (
            <>
              <DocumentSkeleton />
              <DocumentSkeleton />
              <DocumentSkeleton />
            </>
          ) : filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.document_id}
                document={doc}
                isSelected={selectedDocument?.document_id === doc.document_id}
                onSelect={onSelectDocument}
                onDeleteRequest={onDeleteDocumentRequest}
              />
            ))
          ) : searchTerm ? (
            <div className="text-center py-8 px-4 text-slate-400 text-xs">
              No documents matching "{searchTerm}"
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-500 mb-3">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700">No Documents Uploaded</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
                Uploaded documents will automatically appear here.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-200/50 text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 bg-slate-50/50">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span>InDoc AI Vector Store Active</span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
