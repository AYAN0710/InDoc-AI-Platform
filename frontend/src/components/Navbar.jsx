import React from 'react';
import { 
  Sparkles, 
  PanelLeftClose, 
  PanelLeftOpen, 
  FileText, 
  Layers 
} from 'lucide-react';
import { getFileIcon } from '../utils/formatters';

export const Navbar = ({
  isSidebarOpen,
  onToggleSidebar,
  selectedDocument,
}) => {
  const SelectedIcon = selectedDocument
    ? getFileIcon(selectedDocument.filename, selectedDocument.file_type)
    : FileText;

  return (
    <header className="sticky top-0 z-30 w-full glass-nav px-4 lg:px-6 py-3 flex items-center justify-between transition-all duration-300">
      {/* Left Section: Brand & Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeftOpen className="w-5 h-5" />
          )}
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 animate-pulse-subtle" />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-brand-900 to-indigo-950 bg-clip-text text-transparent">
            InDoc
          </span>
        </div>
      </div>

      {/* Center / Right Section: Selected Document Badge if document is selected */}
      <div className="flex items-center gap-3">
        {selectedDocument && (
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-sm text-sm text-slate-800 max-w-xs sm:max-w-md truncate">
            <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-brand-600 shadow-sm shrink-0">
              <SelectedIcon className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold truncate max-w-[180px] sm:max-w-[260px]">
              {selectedDocument.filename}
            </span>
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1 px-2 py-0.5 bg-white/90 rounded-md border border-slate-200/60 shrink-0">
              <Layers className="w-3 h-3 text-brand-500" />
              {selectedDocument.total_chunks || 0} chunks
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
