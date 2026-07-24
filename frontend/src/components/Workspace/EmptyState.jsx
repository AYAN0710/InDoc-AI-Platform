import React from 'react';

export const EmptyState = ({ hasDocuments }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-center mx-auto my-auto animate-fade-in">
      {/* Compact Glass Card - auto-sized to content */}
      <div className="glass-hero-box rounded-2xl px-14 py-10 sm:px-20 sm:py-14 shadow-xl border border-white/80 flex flex-col items-center relative min-w-[28rem]">
        {/* Shiny Glass Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-500 to-blue-500 rounded-t-2xl" />

        {/* Hero Caption */}
        <h2 className="empty-state-caption text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
          From Documents to Insights
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-500 font-medium tracking-tight leading-snug">
          Generate AI Summaries • Ask Context-Aware Questions
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
