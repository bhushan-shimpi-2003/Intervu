
import React from 'react';
import { Plus, Bell, ChevronRight, TrendingUp, CheckCircle, Activity, User } from 'lucide-react';
import { Button } from '../components/Button';
import { AppView, UserStats } from './types';
import { MOCK_USER_STATS, RECENT_INTERVIEWS } from './constants';

interface DashboardProps {
  onChangeView: (view: AppView) => void;
}

const StatCard: React.FC<{ title: string; value: string | number; change: string; isPositive: boolean; icon: React.ReactNode }> = ({ title, value, change, isPositive, icon }) => (
  <div className="bg-background-card border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition-all duration-300 shadow-sm group">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-text-muted text-sm font-medium">{title}</h3>
      <div className="p-2 bg-zinc-800 rounded-lg text-primary group-hover:text-white group-hover:bg-primary transition-colors duration-300">
        {icon}
      </div>
    </div>
    <div className="flex items-end gap-3">
      <span className="text-4xl font-bold text-white font-display">{value}</span>
      <span className={`text-xs font-medium mb-1.5 py-1 px-2 rounded-full ${isPositive ? 'text-primary bg-primary/10' : 'text-red-400 bg-red-400/10'}`}>
        {change}
      </span>
    </div>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold font-display text-white mb-2">Welcome back, Alex!</h1>
          <p className="text-text-muted flex items-center gap-2">
            You're improving! Let's ace the next one <span className="text-xl">🚀</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onChangeView(AppView.NOTIFICATIONS)}
            className="p-2.5 rounded-lg bg-background-card border border-zinc-800 text-text-muted hover:text-white hover:border-zinc-600 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background-card"></span>
          </button>
          <div 
            onClick={() => onChangeView(AppView.PROFILE)}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-500 p-[2px] cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard 
          title="Average Confidence" 
          value={`${MOCK_USER_STATS.confidence}%`} 
          change="+5% from last week" 
          isPositive={true} 
          icon={<Activity className="w-5 h-5" />}
        />
        <StatCard 
          title="Average Correctness" 
          value={`${MOCK_USER_STATS.correctness}%`} 
          change="+2% from last week" 
          isPositive={true} 
          icon={<CheckCircle className="w-5 h-5" />}
        />
        <StatCard 
          title="Last Session Score" 
          value={`${MOCK_USER_STATS.lastScore}%`} 
          change="-1% from average" 
          isPositive={false} 
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-bold text-white">Recent Interview Sessions</h2>
        <Button onClick={() => onChangeView(AppView.SETUP)} icon={<Plus className="w-5 h-5" />} className="w-full sm:w-auto">
          Start New Interview
        </Button>
      </div>

      <div className="bg-background-card border border-zinc-800 rounded-xl p-1">
        {RECENT_INTERVIEWS.map((interview, idx) => (
          <div 
            key={idx} 
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-zinc-800/50 rounded-lg transition-colors border-b border-zinc-800/50 last:border-0 cursor-pointer gap-4 sm:gap-0"
            onClick={() => interview.status === 'Completed' ? onChangeView(AppView.SUMMARY) : onChangeView(AppView.SESSION)}
          >
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold text-primary group-hover:text-primary-hover transition-colors">{interview.role}</span>
              <span className="text-sm text-text-muted">{interview.date}</span>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
              {interview.status === 'Completed' ? (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  Completed
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-700 text-zinc-300">
                  In Progress
                </span>
              )}
              <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
