import React from 'react';
import { Trash2, Calendar, Layers, CheckCircle } from 'lucide-react';
import { 
  getFileIcon, 
  getFileExtension, 
  getFileTypeBadgeStyle, 
  formatDate 
} from '../../utils/formatters';

export const DocumentCard = ({
  document,
  isSelected,
  onSelect,
  onDeleteRequest,
}) => {
  const { document_id, filename, created_at, file_type, total_chunks } = document;

  const IconComponent = getFileIcon(filename, file_type);
  const badgeStyle = getFileTypeBadgeStyle(filename, file_type);
  const extension = getFileExtension(filename, file_type);

  const handleCardClick = (e) => {
    e.stopPropagation();
    onSelect(document);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDeleteRequest(document);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'bg-white/95 border-2 border-brand-500 shadow-glass-md translate-x-1'
          : 'glass-card hover:bg-white/80 border border-slate-200/60'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Document Icon Box */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
            isSelected
              ? 'bg-brand-500 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-600'
          }`}
        >
          <IconComponent className="w-5 h-5" />
        </div>

        {/* Info Area */}
        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-2">
            <h4
              className={`text-sm font-semibold truncate transition-colors ${
                isSelected ? 'text-brand-900' : 'text-slate-800 group-hover:text-brand-700'
              }`}
              title={filename}
            >
              {filename}
            </h4>
          </div>

          {/* Metadata Badges */}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span
              className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md border ${badgeStyle}`}
            >
              {extension}
            </span>

            {total_chunks !== undefined && (
              <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                <Layers className="w-3 h-3 text-slate-400" />
                {total_chunks} chunks
              </span>
            )}
          </div>

          {/* Date */}
          <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(created_at)}</span>
          </div>
        </div>

        {/* Selected Indicator Checkmark */}
        {isSelected && (
          <div className="absolute top-3 right-3 text-brand-500">
            <CheckCircle className="w-4 h-4 fill-brand-500 text-white" />
          </div>
        )}

        {/* Delete Button */}
        <button
          onClick={handleDeleteClick}
          className="absolute bottom-3 right-3 p-1.5 rounded-lg text-slate-400 opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
          title="Delete Document"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DocumentCard;
