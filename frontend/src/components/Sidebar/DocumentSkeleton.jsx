import React from 'react';

export const DocumentSkeleton = () => {
  return (
    <div className="p-3 rounded-2xl bg-white/40 border border-slate-200/50 animate-pulse flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-slate-200/70 shrink-0" />
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-slate-200/70 rounded w-3/4" />
        <div className="flex gap-2">
          <div className="h-3 bg-slate-200/60 rounded w-12" />
          <div className="h-3 bg-slate-200/60 rounded w-16" />
        </div>
        <div className="h-3 bg-slate-200/50 rounded w-1/2" />
      </div>
    </div>
  );
};

export default DocumentSkeleton;
