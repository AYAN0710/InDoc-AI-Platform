import React, { useState, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  Type, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  File, 
  Sparkles 
} from 'lucide-react';

export const UploadModal = ({
  isOpen,
  onClose,
  onUpload,
  isUploading,
  uploadProgress,
}) => {
  const [activeTab, setActiveTab] = useState('file'); // 'file' | 'text'
  const [selectedFile, setSelectedFile] = useState(null);
  const [userText, setUserText] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [modalError, setModalError] = useState(null);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setModalError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setModalError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError(null);

    if (activeTab === 'file' && !selectedFile) {
      setModalError('Please choose a file to upload.');
      return;
    }
    if (activeTab === 'text' && !userText.trim()) {
      setModalError('Please enter some text to process.');
      return;
    }

    try {
      if (activeTab === 'file') {
        await onUpload({ file: selectedFile, text: null });
      } else {
        await onUpload({ file: null, text: userText.trim() });
      }
      // Reset & Close on success
      setSelectedFile(null);
      setUserText('');
      onClose();
    } catch (err) {
      setModalError(err.message || 'Upload failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
      <div
        className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-white/90"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isUploading}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-slate-800 tracking-tight">Upload Document</h3>
            <p className="text-xs text-slate-500">Supports PDF, DOCX, TXT, CSV, MD, PPTX, or Direct Text</p>
          </div>
        </div>

        {/* Tabs: File vs User Text */}
        <div className="flex rounded-2xl bg-slate-100/80 p-1 mb-6 border border-slate-200/60">
          <button
            type="button"
            onClick={() => setActiveTab('file')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'file'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Upload File</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === 'text'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>User Text Input</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {modalError && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{modalError}</span>
            </div>
          )}

          {activeTab === 'file' ? (
            /* File Dropzone */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
                dragOver
                  ? 'border-brand-500 bg-brand-50/50 scale-[1.01]'
                  : selectedFile
                  ? 'border-emerald-400 bg-emerald-50/30'
                  : 'border-slate-300 hover:border-brand-400 bg-white/50 hover:bg-white/80'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt,.csv,.md,.pptx,.ppt"
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedFile ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-sm text-slate-800 truncate max-w-[260px]">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="text-xs text-red-500 hover:underline pt-1"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-sm">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    Click to browse or drag & drop file
                  </p>
                  <p className="text-xs text-slate-400">
                    PDF, DOCX, TXT, CSV, Markdown, PPTX
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Text Input Tab */
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Paste or Enter Text</label>
              <textarea
                rows={6}
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder="Paste document content, articles, or user text here..."
                className="w-full p-3.5 text-xs sm:text-sm rounded-2xl glass-input text-slate-800 placeholder-slate-400 focus:outline-none resize-none"
              />
            </div>
          )}

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs text-brand-700 font-semibold">
                <span>Uploading & Vectorizing...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-purple-600 transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/50">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading || (activeTab === 'file' && !selectedFile) || (activeTab === 'text' && !userText.trim())}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 text-white text-xs font-bold shadow-glass-button disabled:shadow-none transition-all duration-200"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Process Document</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
