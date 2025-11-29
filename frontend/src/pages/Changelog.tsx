import React from 'react';
import { GitCommit } from 'lucide-react';
import { AppView } from './types';

interface ChangelogProps {
  onChangeView: (view: AppView) => void;
}

const updates = [
  {
    version: "v2.4.0",
    date: "October 24, 2023",
    title: "Advanced Voice Analysis",
    description: "Introduced pitch and tone detection to provide feedback on confidence levels.",
    type: "Feature",
    tags: ["AI", "Voice"]
  },
  {
    version: "v2.3.1",
    date: "October 10, 2023",
    title: "Performance Improvements",
    description: "Optimized dashboard load times and fixed a bug with PDF export rendering.",
    type: "Fix",
    tags: ["Performance"]
  },
  {
    version: "v2.3.0",
    date: "September 28, 2023",
    title: "New Roles: DevOps & QA",
    description: "Added dedicated interview tracks for DevOps Engineers and QA Specialists.",
    type: "Feature",
    tags: ["Content"]
  },
  {
    version: "v2.2.0",
    date: "September 15, 2023",
    title: "Team Dashboard",
    description: "Enterprise users can now manage team members and view aggregate statistics.",
    type: "Feature",
    tags: ["Enterprise"]
  }
];

export const Changelog: React.FC<ChangelogProps> = ({ onChangeView }) => {
  return (
    <div className="min-h-screen bg-background-dark py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-bold font-display text-white mb-4">Changelog</h1>
          <p className="text-text-muted text-lg">See what's new and improved in InterVu AI.</p>
        </header>

        <div className="space-y-12 relative">
           {/* Timeline line */}
           <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-zinc-800 -z-0"></div>

           {updates.map((update, idx) => (
             <div key={idx} className="relative z-10 pl-12">
               <div className="absolute left-0 top-1.5 w-14 flex justify-center">
                 <div className="w-3 h-3 rounded-full bg-zinc-900 border-2 border-primary"></div>
               </div>
               
               <div className="bg-background-card border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-primary font-bold bg-primary/10 px-2 py-1 rounded text-sm">{update.version}</span>
                      <span className="text-text-muted text-sm flex items-center gap-1">
                        <GitCommit className="w-3 h-3" /> {update.date}
                      </span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${update.type === 'Feature' ? 'bg-blue-500/10 text-blue-400' : 'bg-zinc-700 text-zinc-300'}`}>
                      {update.type}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-2">{update.title}</h2>
                  <p className="text-text-muted mb-4">{update.description}</p>
                  
                  <div className="flex gap-2">
                    {update.tags.map(tag => (
                      <span key={tag} className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};