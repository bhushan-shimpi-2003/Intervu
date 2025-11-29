
import React, { useState } from 'react';
import { Calendar, Clock, ChevronRight, Download, BarChart2, Filter, CheckCircle2, PlayCircle, Search, X } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AppView } from './types';
import { RECENT_INTERVIEWS } from './constants';

interface HistoryProps {
  onChangeView: (view: AppView) => void;
}

// Augmented mock data for history
const HISTORY_DATA = [
  ...RECENT_INTERVIEWS,
  { role: 'System Design', date: 'October 15, 2023', status: 'Completed', score: 76 },
  { role: 'Behavioral Round', date: 'October 10, 2023', status: 'Completed', score: 85 },
  { role: 'Python Algorithms', date: 'October 05, 2023', status: 'Completed', score: 94 },
];

export const History: React.FC<HistoryProps> = ({ onChangeView }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'In Progress'>('All');

  // Filter logic
  const filteredHistory = HISTORY_DATA.filter(session => {
    const matchesSearch = session.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // CSV Export logic
  const handleExportCSV = () => {
    const headers = ['Role', 'Date', 'Status', 'Score'];
    const csvContent = [
      headers.join(','),
      ...filteredHistory.map(row => [
        `"${row.role}"`,
        `"${row.date}"`,
        row.status,
        row.score || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'interview_history.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold font-display text-white mb-2">Session History</h1>
          <p className="text-text-muted">Review your past performance and track your improvements.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button 
                variant={showFilters ? "primary" : "ghost"} 
                className={showFilters ? "" : "border border-zinc-800"} 
                icon={showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
                onClick={() => setShowFilters(!showFilters)}
            >
                {showFilters ? 'Close Filters' : 'Filter'}
            </Button>
            <Button 
                variant="secondary" 
                icon={<Download className="w-4 h-4" />}
                onClick={handleExportCSV}
            >
                Export CSV
            </Button>
        </div>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-background-card border border-zinc-800 p-5 rounded-xl">
            <div className="text-text-muted text-sm mb-1">Total Sessions</div>
            <div className="text-2xl font-bold text-white font-display">24</div>
        </div>
        <div className="bg-background-card border border-zinc-800 p-5 rounded-xl">
            <div className="text-text-muted text-sm mb-1">Avg. Score</div>
            <div className="text-2xl font-bold text-primary font-display">86%</div>
        </div>
        <div className="bg-background-card border border-zinc-800 p-5 rounded-xl">
            <div className="text-text-muted text-sm mb-1">Time Practiced</div>
            <div className="text-2xl font-bold text-white font-display">12h 30m</div>
        </div>
        <div className="bg-background-card border border-zinc-800 p-5 rounded-xl">
            <div className="text-text-muted text-sm mb-1">Best Performance</div>
            <div className="text-2xl font-bold text-green-400 font-display">98%</div>
        </div>
      </div>

      {/* Filter Toolbar */}
      {showFilters && (
        <div className="mb-6 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
            <Input
                placeholder="Search by role or topic..."
                icon={<Search className="w-4 h-4" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background-card"
            />
            <div className="relative">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="w-full bg-background-card border border-zinc-800 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
                >
                    <option value="All">All Statuses</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-text-muted">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
            </div>
        </div>
      )}

      <div className="bg-background-card border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-zinc-900/50 border-b border-zinc-800 text-text-muted text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-medium min-w-[250px]">Role / Topic</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Score</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((session, idx) => (
                    <tr 
                      key={idx} 
                      className={`group transition-colors cursor-pointer hover:bg-zinc-800/30`}
                      onClick={() => onChangeView(session.status === 'Completed' ? AppView.SUMMARY : AppView.SESSION)}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center border transition-colors ${
                            session.status === 'Completed' 
                              ? 'bg-zinc-800 border-zinc-700 text-text-muted group-hover:text-white' 
                              : 'bg-primary/10 border-primary/20 text-primary'
                          }`}>
                            {session.role.includes('Design') ? <BarChart2 className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
                          </div>
                          <div className="flex flex-col">
                              <span className="font-bold text-white group-hover:text-primary transition-colors text-base whitespace-nowrap">
                                {session.role}
                              </span>
                              <span className="text-xs text-text-muted">
                                {session.status === 'Completed' ? 'Completed' : 'Resume Session'}
                              </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-text-muted text-sm">
                            <Clock className="w-3 h-3" />
                            {session.date}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        {session.status === 'Completed' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                <CheckCircle2 className="w-3 h-3" />
                                Completed
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                <PlayCircle className="w-3 h-3" />
                                In Progress
                            </span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        {session.score ? (
                            <div className="flex items-center gap-3">
                                 <div className="w-24 h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: `${session.score}%` }}></div>
                                 </div>
                                 <span className="font-mono text-white font-medium">{session.score}%</span>
                            </div>
                        ) : (
                            <span className="text-text-muted text-sm italic">Pending</span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Button variant="ghost" className="p-2 h-8 w-8 text-text-muted hover:text-white rounded-full">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                        No sessions found matching your filters.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {filteredHistory.length > 5 && (
            <div className="p-4 border-t border-zinc-800 text-center bg-zinc-900/30">
                <button className="text-sm text-text-muted hover:text-white transition-colors font-medium">Load more history</button>
            </div>
        )}
      </div>
    </div>
  );
};
