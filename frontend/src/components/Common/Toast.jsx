import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl backdrop-blur-xl border transition-all duration-300 ${
          isSuccess
            ? 'bg-emerald-50/90 text-emerald-800 border-emerald-200/80 shadow-emerald-500/10'
            : isError
            ? 'bg-red-50/90 text-red-800 border-red-200/80 shadow-red-500/10'
            : 'bg-indigo-50/90 text-indigo-800 border-indigo-200/80 shadow-indigo-500/10'
        }`}
      >
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-600 shrink-0" />}

        <span className="text-sm font-medium pr-2">{message}</span>

        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-black/5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
