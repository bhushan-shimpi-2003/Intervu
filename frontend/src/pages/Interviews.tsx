import React, { useState } from 'react';
import { Play, Code, Layers, Server, Terminal, Sparkles, ArrowRight, Clock, Search, BookOpen, Database, Smartphone } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AppView } from './types';
import { RECENT_INTERVIEWS } from './constants';
import { motion, AnimatePresence } from 'framer-motion';

// Fix: Cast motion.div to any to avoid type errors
const MotionDiv = motion.div as any;

interface InterviewsProps {
  onChangeView: (view: AppView) => void;
}

const CATEGORIES = ['All', 'Frontend', 'Backend', 'System Design', 'Behavioral'];

interface Track {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  questions: number;
  time: string;
  category: string;
  tags: string[];
  color: string;
}

const TRACKS: Track[] = [
  {
    id: '1',
    title: 'Frontend Mastery',
    description: 'Deep dive into React, DOM manipulation, and modern CSS architecture.',
    icon: <Code className="w-6 h-6" />,
    level: 'Intermediate',
    questions: 15,
    time: '45 min',
    category: 'Frontend',
    tags: ['React', 'CSS', 'DOM'],
    color: 'text-blue-400',
  },
  {
    id: '2',
    title: 'System Design',
    description: 'Architect scalable systems. Topics include load balancing, caching, and sharding.',
    icon: <Server className="w-6 h-6" />,
    level: 'Advanced',
    questions: 5,
    time: '60 min',
    category: 'System Design',
    tags: ['Architecture', 'Scaling'],
    color: 'text-purple-400',
  },
  {
    id: '3',
    title: 'Behavioral & Leadership',
    description: 'Master the STAR method for leadership principles and conflict resolution.',
    icon: <Sparkles className="w-6 h-6" />,
    level: 'All Levels',
    questions: 10,
    time: '30 min',
    category: 'Behavioral',
    tags: ['STAR Method', 'Soft Skills'],
    color: 'text-yellow-400',
  },
  {
    id: '4',
    title: 'Node.js Backend',
    description: 'Server-side logic, API design, and database integration with Node.js.',
    icon: <Database className="w-6 h-6" />,
    level: 'Intermediate',
    questions: 12,
    time: '40 min',
    category: 'Backend',
    tags: ['Node', 'API', 'SQL'],
    color: 'text-green-400',
  },
  {
    id: '5',
    title: 'Mobile Architecture',
    description: 'Patterns for iOS and Android development, offline storage, and performance.',
    icon: <Smartphone className="w-6 h-6" />,
    level: 'Advanced',
    questions: 8,
    time: '45 min',
    category: 'Frontend',
    tags: ['React Native', 'Mobile'],
    color: 'text-pink-400',
  },
  {
    id: '6',
    title: 'DevOps Essentials',
    description: 'CI/CD pipelines, containerization with Docker, and cloud infrastructure.',
    icon: <Terminal className="w-6 h-6" />,
    level: 'Intermediate',
    questions: 20,
    time: '50 min',
    category: 'Backend',
    tags: ['Docker', 'AWS'],
    color: 'text-orange-400',
  }
];

const TrackCard: React.FC<{ track: Track; onClick: () => void }> = ({ track, onClick }) => (
  <MotionDiv 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="group relative bg-background-card border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition-all duration-300 hover:shadow-xl hover:shadow-black/50 flex flex-col"
  >
    <div className={`absolute top-0 right-0 p-24 opacity-5 pointer-events-none rounded-full blur-3xl ${track.color.replace('text', 'bg')}`}></div>
    
    <div className="flex justify-between items-start mb-4">
      <div className={`w-12 h-12 rounded-xl bg-zinc-800/50 border border-zinc-700 flex items-center justify-center ${track.color}`}>
        {track.icon}
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded bg-zinc-900 border border-zinc-800 uppercase tracking-wider ${track.color}`}>
        {track.level}
      </span>
    </div>

    <h3 className="text-xl font-bold text-white mb-2 font-display">{track.title}</h3>
    <p className="text-text-muted text-sm mb-6 flex-1">{track.description}</p>
    
    <div className="flex flex-wrap gap-2 mb-6">
      {track.tags.map(tag => (
        <span key={tag} className="text-xs text-zinc-400 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800">
          #{tag}
        </span>
      ))}
    </div>

    <div className="flex items-center gap-4 text-xs text-text-muted mb-6 pt-4 border-t border-zinc-800/50">
      <div className="flex items-center gap-1">
        <BookOpen className="w-3 h-3" />
        {track.questions} Questions
      </div>
      <div className="flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {track.time}
      </div>
    </div>

    <Button onClick={onClick} fullWidth variant="outline" className="mt-auto group-hover:bg-primary group-hover:text-background-dark group-hover:border-primary transition-colors">
      Start Practice
    </Button>
  </MotionDiv>
);

export const Interviews: React.FC<InterviewsProps> = ({ onChangeView }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const activeSession = RECENT_INTERVIEWS.find(i => i.status === 'In Progress');

  const filteredTracks = TRACKS.filter(track => {
    const matchesCategory = activeCategory === 'All' || track.category === activeCategory;
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          track.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-display text-white mb-2">Interview Library</h1>
        <p className="text-text-muted">Choose a track to sharpen your skills or continue your progress.</p>
      </header>

      {/* Active Session Banner - Enhanced */}
      {activeSession && (
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-1 group hover:border-primary/50 transition-colors duration-500 shadow-2xl shadow-black/50">
             {/* Background glow effect */}
             <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             
             <div className="relative bg-zinc-900/80 backdrop-blur-sm rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6 w-full md:w-auto">
                   <div className="relative flex-shrink-0">
                      {/* Pulse ring */}
                      <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-50"></div>
                      <div className="relative w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(0,194,186,0.15)]">
                         <Play className="w-7 h-7 ml-1 fill-primary/20" />
                      </div>
                   </div>
                   
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                         <span className="flex h-2.5 w-2.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                         </span>
                         <span className="text-xs font-bold text-primary uppercase tracking-widest">Session In Progress</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">{activeSession.role}</h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                         <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Started {activeSession.date}</span>
                         <span className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700"></span>
                         <span className="font-medium text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">Question 3 of 10</span>
                      </div>
                   </div>
                </div>

                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                   <Button onClick={() => onChangeView(AppView.SESSION)} variant="primary" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40" icon={<ArrowRight className="w-5 h-5" />}>
                      Resume Interview
                   </Button>
                </div>
             </div>
          </div>
        </MotionDiv>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 sticky top-[64px] z-30 bg-background-dark/95 backdrop-blur py-4 -mx-4 px-4 border-b border-zinc-800/50 md:static md:bg-transparent md:border-0 md:p-0 md:mx-0">
        
        {/* Category Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 w-full md:w-auto pb-2 md:pb-0">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                ${activeCategory === category 
                  ? 'bg-primary text-background-dark border-primary' 
                  : 'bg-zinc-900 text-text-muted border-zinc-800 hover:border-zinc-600 hover:text-white'}
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full md:w-72">
          <Input 
            placeholder="Search tracks..." 
            icon={<Search className="w-4 h-4" />} 
            className="bg-background-card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="min-h-[400px]">
        <MotionDiv layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTracks.map(track => (
              <TrackCard 
                key={track.id} 
                track={track} 
                onClick={() => onChangeView(AppView.SETUP)} 
              />
            ))}
          </AnimatePresence>
        </MotionDiv>
        
        {filteredTracks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-text-muted">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-lg font-medium">No tracks found</p>
            <p className="text-sm">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>

      <div className="mt-12 p-8 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">Can't find what you're looking for?</h3>
          <p className="text-text-muted">Create a custom session by mixing topics, difficulty levels, and specific question types.</p>
        </div>
        <Button onClick={() => onChangeView(AppView.SETUP)} variant="secondary" icon={<ArrowRight className="w-4 h-4" />}>
          Custom Config
        </Button>
      </div>
    </div>
  );
};