import React from 'react';
import { AppView } from './types';
import { Button } from '../components/Button';
import { Edit2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Fix: Cast motion components to any to avoid type errors
const MotionCircle = motion.circle as any;
const MotionSpan = motion.span as any;
const MotionDiv = motion.div as any;

interface ResultDetailProps {
  onChangeView: (view: AppView) => void;
}

const ScoreCard: React.FC<{ label: string; value: string; subLabel?: string; color?: string }> = ({ label, value, subLabel, color = "text-primary" }) => (
  <div className="bg-background-card border border-zinc-800 p-5 rounded-xl flex flex-col items-center justify-center text-center shadow-sm hover:border-zinc-700 transition-colors">
    <span className="text-text-muted text-xs uppercase tracking-wider font-semibold mb-2">{label}</span>
    <span className={`text-4xl font-bold ${color} mb-1`}>{value}</span>
    {subLabel && <span className="text-xs text-zinc-500">{subLabel}</span>}
  </div>
);

export const ResultDetail: React.FC<ResultDetailProps> = ({ onChangeView }) => {
  // Radius = 70, Circumference = 2 * PI * 70 ≈ 440
  const circumference = 440;
  const percentage = 85;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-3 text-2xl font-bold text-white mb-2">
          <span className="text-primary">Question 2/5 Analysis</span>
        </div>
        <p className="text-text-muted">Describe a challenging project you worked on and how you handled it.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transcript Section */}
        <div className="lg:col-span-2">
          <div className="bg-background-card border border-primary/30 rounded-2xl p-6 h-full shadow-[0_0_30px_rgba(0,194,186,0.05)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-white">Your Answer (Editable Transcript)</h3>
              <button className="flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors">
                <Edit2 className="w-3 h-3" /> Click to edit
              </button>
            </div>
            
            <div className="text-zinc-300 leading-loose text-lg font-light flex-1">
              <p>
                Well, <span className="text-red-400 bg-red-400/10 px-1 rounded border border-red-400/20">um</span>, one of the most challenging projects I worked on was the, <span className="text-red-400 bg-red-400/10 px-1 rounded border border-red-400/20">uh</span>, migration of our legacy monolith to a microservices architecture. It was a pretty big undertaking. <span className="text-yellow-400 bg-yellow-400/10 px-1 rounded border border-yellow-400/20">We had to, like, decompose the</span> entire system into smaller, manageable services. The main goal was to improve scalability and, <span className="text-red-400 bg-red-400/10 px-1 rounded border border-red-400/20">you know</span>, developer velocity. The process <span className="text-yellow-400 bg-yellow-400/10 px-1 rounded border border-yellow-400/20">was tough</span>, but we managed to pull it off successfully in the end.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(0,194,186,0.5)]"></span>
                <span className="text-zinc-400">High Confidence</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"></span>
                <span className="text-zinc-400">Medium Confidence</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]"></span>
                <span className="text-zinc-400">Filler Words</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* Confidence Gauge */}
          <div className="bg-background-card border border-zinc-800 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-white mb-6 text-center">Overall Confidence</h3>
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              {/* Added viewBox to ensure scaling works properly */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                <defs>
                  <linearGradient id="confidenceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00C2BA" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
                {/* Background Circle */}
                <circle 
                  cx="80" 
                  cy="80" 
                  r="70" 
                  stroke="#27272A" 
                  strokeWidth="12" 
                  fill="transparent" 
                />
                {/* Progress Circle */}
                <MotionCircle 
                  initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeDashoffset }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  cx="80" 
                  cy="80" 
                  r="70" 
                  stroke="url(#confidenceGradient)" 
                  strokeWidth="12" 
                  fill="transparent" 
                  strokeLinecap="round" 
                  strokeDasharray={circumference}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <MotionSpan 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-5xl font-bold text-white tracking-tight"
                >
                  {percentage}%
                </MotionSpan>
                <MotionSpan 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm text-primary font-medium mt-1 uppercase tracking-wider"
                >
                  Good
                </MotionSpan>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ScoreCard label="Filler Words" value="4" color="text-red-400" />
            <ScoreCard label="Pace (WPM)" value="160" color="text-white" subLabel="Optimal: 140-160" />
          </div>

          <div className="bg-background-card border border-zinc-800 p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-end mb-3">
              <h3 className="font-bold text-white">Technical Score</h3>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-primary text-background-dark">78%</span>
            </div>
            <div className="w-full bg-zinc-800 h-2.5 rounded-full mb-4 overflow-hidden">
              <MotionDiv 
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(0,194,186,0.5)]"
              />
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Good explanation of the core concept, but could be more detailed about the specific challenges and trade-offs made during the migration.
            </p>
          </div>

          <Button onClick={() => onChangeView(AppView.REPORT)} fullWidth icon={<ArrowRight className="w-4 h-4" />}>
            Final Report
          </Button>
        </div>
      </div>
    </div>
  );
};