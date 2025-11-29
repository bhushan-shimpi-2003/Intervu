import React, { useState } from 'react';
import { Database, Layout, Layers, Terminal, Bug, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { AppView, InterviewConfig } from './types';
import { motion } from 'framer-motion';

// Fix: Cast motion.div to any to avoid type errors
const MotionDiv = motion.div as any;

interface SetupProps {
  onChangeView: (view: AppView) => void;
  onConfigComplete: (config: InterviewConfig) => void;
}

const roles = [
  { id: 'backend', label: 'Backend', icon: Database },
  { id: 'frontend', label: 'Frontend', icon: Layout },
  { id: 'fullstack', label: 'Fullstack', icon: Layers },
  { id: 'devops', label: 'DevOps', icon: Terminal },
  { id: 'qa', label: 'QA', icon: Bug },
];

export const SetupInterview: React.FC<SetupProps> = ({ onChangeView, onConfigComplete }) => {
  const [selectedRole, setSelectedRole] = useState<string>('fullstack');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

  const handleStart = () => {
    onConfigComplete({
      role: selectedRole,
      difficulty,
      questionCount: 10
    });
    onChangeView(AppView.SESSION);
  };

  return (
    <div className="flex items-center justify-center min-h-full w-full p-4">
      <div className="w-full max-w-2xl bg-background-card/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-zinc-800 shadow-2xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display text-white mb-4">Set Up Your Interview</h1>
          <p className="text-text-muted text-lg">Configure the parameters for your new mock interview session.</p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs">1</span>
              Select Role
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {roles.map((role) => {
                const isSelected = selectedRole === role.id;
                const Icon = role.icon;
                return (
                  <MotionDiv
                    key={role.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedRole(role.id)}
                    className={`
                      cursor-pointer rounded-xl p-4 flex flex-col items-center gap-3 transition-all duration-200 border
                      ${isSelected 
                        ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(0,194,186,0.15)]' 
                        : 'bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600'}
                    `}
                  >
                    <Icon className={`w-8 h-8 ${isSelected ? 'text-primary' : 'text-current'}`} />
                    <span className="text-sm font-medium">{role.label}</span>
                  </MotionDiv>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs">2</span>
              Choose Difficulty
            </h2>
            <div className="grid grid-cols-3 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800">
              {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`
                    py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${difficulty === level 
                      ? 'bg-primary text-background-dark shadow-lg' 
                      : 'text-text-muted hover:text-white hover:bg-white/5'}
                  `}
                >
                  {level}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs">3</span>
              Number of Questions
            </h2>
            <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-text-muted flex justify-between items-center opacity-80 cursor-not-allowed">
              <span>Standard Session</span>
              <span className="text-white font-mono bg-zinc-800 px-2 py-1 rounded">10 Questions</span>
            </div>
          </section>

          <div className="pt-6">
            <Button onClick={handleStart} fullWidth className="h-14 text-lg font-bold shadow-xl shadow-primary/20">
              Begin Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};