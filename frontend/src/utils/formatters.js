import { FileText, FileSpreadsheet, FileCode, Presentation, File, Type } from 'lucide-react';

/**
 * Determine file extension / type string from filename
 * @param {string} filename 
 * @param {string} fileType 
 * @returns {string} Normalized extension
 */
export const getFileExtension = (filename = '', fileType = '') => {
  if (fileType) return fileType.toLowerCase();
  if (filename === 'UserInput') return 'text';
  const parts = filename.split('.');
  if (parts.length > 1) {
    return parts.pop().toLowerCase();
  }
  return 'file';
};

/**
 * Get icon component for a given file type/filename
 * @param {string} filename 
 * @param {string} fileType 
 */
export const getFileIcon = (filename = '', fileType = '') => {
  const ext = getFileExtension(filename, fileType);
  switch (ext) {
    case 'pdf':
      return FileText;
    case 'docx':
    case 'doc':
      return FileText;
    case 'csv':
    case 'xlsx':
    case 'xls':
      return FileSpreadsheet;
    case 'txt':
    case 'text':
      return Type;
    case 'md':
    case 'markdown':
      return FileCode;
    case 'pptx':
    case 'ppt':
      return Presentation;
    default:
      return File;
  }
};

/**
 * Get color badges for different document types
 * @param {string} filename 
 * @param {string} fileType 
 */
export const getFileTypeBadgeStyle = (filename = '', fileType = '') => {
  const ext = getFileExtension(filename, fileType);
  switch (ext) {
    case 'pdf':
      return 'bg-red-50 text-red-600 border-red-200';
    case 'docx':
    case 'doc':
      return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'csv':
    case 'xlsx':
      return 'bg-emerald-50 text-emerald-600 border-emerald-200';
    case 'txt':
    case 'text':
      return 'bg-amber-50 text-amber-600 border-amber-200';
    case 'md':
    case 'markdown':
      return 'bg-purple-50 text-purple-600 border-purple-200';
    case 'pptx':
    case 'ppt':
      return 'bg-orange-50 text-orange-600 border-orange-200';
    default:
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

/**
 * Format ISO date string into readable date format
 * @param {string} dateString 
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'Recently uploaded';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently uploaded';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch {
    return 'Recently uploaded';
  }
};
