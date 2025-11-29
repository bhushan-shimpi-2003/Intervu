import React, { useEffect } from 'react';
import { Brain } from 'lucide-react';
import { AppView } from './types';

interface AnalyzingProps {
  onChangeView: (view: AppView) => void;
}

export const Analyzing: React.FC<AnalyzingProps> = ({ onChangeView }) => {
  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      onChangeView(AppView.RESULT);
    }, 3500);
    return () => clearTimeout(timer);
  }, [onChangeView]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full w-full px-4">
      <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
        {/* Ripples */}
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75 duration-1000"></div>
        <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping delay-300 duration-1000"></div>
        
        {/* Core Icon */}
        <div className="relative z-10 w-24 h-24 bg-background-card rounded-full flex items-center justify-center border border-zinc-700 shadow-[0_0_30px_rgba(0,194,186,0.2)]">
          <Brain className="w-12 h-12 text-primary animate-pulse" />
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-primary to-white mb-4 text-center">
        Analyzing your answer...
      </h1>
      <p className="text-text-muted text-center max-w-md mb-16">
        Our AI is processing your response to generate detailed feedback on pacing, tone, and technical accuracy.
      </p>

      {/* Shimmer Cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50">
        <div className="md:col-span-2 p-6 bg-background-card rounded-xl border border-zinc-800">
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
            <div className="h-4 bg-zinc-700 rounded w-full"></div>
            <div className="h-4 bg-zinc-700 rounded w-5/6"></div>
            <div className="h-4 bg-zinc-700 rounded w-full"></div>
            <div className="h-4 bg-zinc-700 rounded w-2/3"></div>
          </div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-background-card rounded-xl border border-zinc-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-700 animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-zinc-700 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-zinc-700 rounded w-12 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};