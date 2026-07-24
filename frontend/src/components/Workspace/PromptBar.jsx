import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Send, 
  Sparkles 
} from 'lucide-react';

export const PromptBar = ({
  selectedDocument,
  hasDocuments,
  onOpenUploadModal,
  onSummarize,
  onAsk,
  onDirectTextSubmit,
  isAsking,
}) => {
  const [query, setQuery] = useState('');
  const textareaRef = useRef(null);

  const isDocSelected = !!selectedDocument;

  // Auto-resize textarea height as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskSubmit();
    }
  };

  const handleAskSubmit = () => {
    if (!query.trim() || isAsking) return;

    if (isDocSelected) {
      // Query selected document RAG
      onAsk(query.trim());
    } else {
      // Direct text upload & process
      onDirectTextSubmit(query.trim());
    }
    setQuery('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleUploadButtonClick = () => {
    if (!isDocSelected && query.trim()) {
      // Process text directly if user typed in text box
      onDirectTextSubmit(query.trim());
      setQuery('');
    } else {
      // Open upload modal for files/text
      onOpenUploadModal();
    }
  };

  const handleSummarizeClick = () => {
    if (!isDocSelected) return;
    onSummarize();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-3 pt-2">
      {/* Translucent Glass Prompt Box */}
      <div className="glass-prompt-box rounded-3xl p-3.5 sm:p-4 shadow-2xl transition-all duration-300">
        
        {/* Textarea Input - See-Through Glass Style */}
        <div className="relative flex items-center">
          <textarea
            ref={textareaRef}
            rows={1}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isAsking}
            placeholder={
              isDocSelected
                ? `Ask anything about "${selectedDocument.filename}"...`
                : 'Ask a question or type/paste text directly to begin...'
            }
            className="w-full pl-4 pr-12 py-3.5 text-sm sm:text-base text-slate-900 bg-white/35 backdrop-blur-md rounded-2xl border-2 border-white/80 focus:bg-white/60 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 placeholder-slate-500 font-semibold resize-none transition-all duration-200 shadow-inner"
          />

          {/* Send/Ask Quick Submit Button inside Textarea */}
          <button
            onClick={handleAskSubmit}
            disabled={!query.trim() || isAsking}
            className="absolute right-2.5 bottom-2.5 p-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 text-white shadow-md disabled:shadow-none transition-all duration-200 focus:outline-none"
            title={isDocSelected ? 'Ask Question' : 'Process Typed Text'}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-white/60 flex-wrap">
          {/* Action 1: Upload Document or Text */}
          <button
            type="button"
            onClick={handleUploadButtonClick}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white shadow-glass-button hover:shadow-lg text-xs font-bold transition-all duration-200"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Document or Text</span>
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Action 2: Summarize */}
            <button
              type="button"
              onClick={handleSummarizeClick}
              disabled={!isDocSelected}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50/80 hover:bg-amber-100/90 disabled:bg-white/40 text-amber-900 disabled:text-slate-400 border border-amber-200/90 disabled:border-white/50 shadow-sm text-xs font-bold transition-all duration-200 disabled:cursor-not-allowed"
              title={isDocSelected ? 'Display stored document summary' : 'Select a document first'}
            >
              <FileText className="w-4 h-4 text-amber-600 disabled:text-slate-400" />
              <span>Summarize</span>
            </button>

            {/* Action 3: Ask AI */}
            <button
              type="button"
              onClick={handleAskSubmit}
              disabled={!query.trim() || isAsking}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-xs font-bold shadow-md disabled:shadow-none transition-all duration-200 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>{isDocSelected ? 'Ask AI' : 'Process Text'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptBar;
