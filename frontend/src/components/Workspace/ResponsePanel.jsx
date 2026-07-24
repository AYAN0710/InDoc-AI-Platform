import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Sparkles, 
  Copy, 
  Check, 
  X, 
  FileText, 
  MessageSquare, 
  Loader2, 
  Clock, 
  RefreshCw 
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const ResponsePanel = ({
  responseState,
  onClose,
  selectedDocumentName,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const { isVisible, type, title, content, query, timestamp } = responseState;

  if (!isVisible) return null;

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const isSummary = type === 'summary';
  const isAnswer = type === 'answer';
  const isLoading = type === 'loading';
  const isError = type === 'error';

  return (
    <div className="w-full max-w-4xl mx-auto my-4 transition-all duration-300 animate-slide-up">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-white/80 overflow-hidden">
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-500" />

        {/* Header Section */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200/60 mb-6">
          <div className="flex items-center gap-3">
            {/* Header Icon */}
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md ${
                isSummary
                  ? 'bg-gradient-to-tr from-amber-500 to-orange-500'
                  : isAnswer
                  ? 'bg-gradient-to-tr from-brand-600 to-indigo-600'
                  : isError
                  ? 'bg-gradient-to-tr from-red-500 to-rose-600'
                  : 'bg-gradient-to-tr from-purple-500 to-indigo-500'
              }`}
            >
              {isSummary && <FileText className="w-6 h-6" />}
              {isAnswer && <Sparkles className="w-6 h-6" />}
              {isLoading && <Loader2 className="w-6 h-6 animate-spin" />}
              {isError && <X className="w-6 h-6" />}
            </div>

            {/* Title & Document Badge */}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-800 tracking-tight">
                  {title || (isSummary ? 'Document Summary' : 'AI Answer')}
                </h3>
                {selectedDocumentName && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 font-medium">
                    {selectedDocumentName}
                  </span>
                )}
              </div>

              {/* Timestamp */}
              {timestamp && (
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(timestamp)}</span>
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons: Copy & Close */}
          <div className="flex items-center gap-2">
            {!isLoading && content && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 text-xs font-semibold transition-all duration-200"
                title="Copy content to clipboard"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User Query Banner (if Q&A) */}
        {query && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80 flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Question Asked</p>
              <p className="text-sm font-medium text-slate-800 mt-0.5">{query}</p>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-3xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 shadow-inner">
                  <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-base font-bold text-slate-800">Searching Document Vectors...</p>
                <p className="text-xs text-slate-400">Synthesizing intelligent response from extracted chunks</p>
              </div>
            </div>
          ) : isError ? (
            <div className="p-4 rounded-2xl bg-red-50 text-red-800 border border-red-200 text-sm">
              <p className="font-bold">Error Processing Request</p>
              <p className="mt-1 text-xs">{content}</p>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponsePanel;
