import React, { useState, useEffect, useRef } from 'react';
import { AppView, InterviewConfig } from './pages/types';
import { Router } from './Router';
import { User, LogOut } from 'lucide-react';

// Header is only shown on authenticated pages
const Header: React.FC<{ onChangeView: (view: AppView) => void; currentView: AppView }> = ({ onChangeView, currentView }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    onChangeView(AppView.LANDING);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-background-dark/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onChangeView(AppView.DASHBOARD)}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
          </div>
          <span className="text-xl font-bold font-display text-white hidden sm:block">InterVu AI</span>
        </div>
        <nav className="flex items-center gap-6">
          <button 
            onClick={() => onChangeView(AppView.DASHBOARD)} 
            className={`text-sm font-medium transition-colors ${currentView === AppView.DASHBOARD ? 'text-white' : 'text-text-muted hover:text-white'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => onChangeView(AppView.INTERVIEWS)} 
            className={`text-sm font-medium transition-colors ${currentView === AppView.INTERVIEWS ? 'text-white' : 'text-text-muted hover:text-white'}`}
          >
            Interviews
          </button>
          <button 
            onClick={() => onChangeView(AppView.HISTORY)} 
            className={`text-sm font-medium transition-colors ${currentView === AppView.HISTORY ? 'text-white' : 'text-text-muted hover:text-white'}`}
          >
            History
          </button>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-8 h-8 rounded-full border cursor-pointer hover:border-primary transition-colors flex items-center justify-center overflow-hidden ${currentView === AppView.PROFILE ? 'bg-zinc-700 border-primary' : 'bg-zinc-800 border-zinc-700'}`}
            >
              <User className="w-4 h-4 text-white" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-background-card border border-zinc-800 rounded-xl shadow-xl py-1 z-50 origin-top-right animate-in fade-in zoom-in-95 duration-100">
                <button
                    onClick={() => {
                        onChangeView(AppView.PROFILE);
                        setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-text-muted hover:text-white hover:bg-zinc-800 flex items-center gap-2 transition-colors"
                >
                    <User className="w-4 h-4" /> Profile
                </button>
                <div className="h-px bg-zinc-800 my-1"></div>
                <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-zinc-800 flex items-center gap-2 transition-colors"
                >
                    <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

// Public Header for non-authenticated marketing pages (excluding Landing which has its own)
const PublicHeader: React.FC<{ onChangeView: (view: AppView) => void }> = ({ onChangeView }) => (
  <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-background-dark/80 backdrop-blur-md">
    <div className="flex h-16 items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onChangeView(AppView.LANDING)}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">I</span>
        </div>
        <span className="text-xl font-bold font-display text-white hidden sm:block">InterVu AI</span>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onChangeView(AppView.LOGIN)} 
          className="text-sm font-medium text-text-muted hover:text-white transition-colors"
        >
          Log In
        </button>
        <button 
          onClick={() => onChangeView(AppView.SIGNUP)} 
          className="text-sm font-medium bg-primary text-background-dark px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors font-bold"
        >
          Sign Up
        </button>
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [config, setConfig] = useState<InterviewConfig | null>(null);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
      } else {
        // Fallback or default state
        setCurrentView(AppView.LANDING);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Ensure initial state exists for proper back navigation to the first page
    if (!window.history.state) {
      window.history.replaceState({ view: AppView.LANDING }, '');
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleViewChange = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState({ view }, '');
  };

  // Views that are part of the main authenticated app
  const isAppPage = [
    AppView.DASHBOARD, 
    AppView.INTERVIEWS, 
    AppView.HISTORY, 
    AppView.NOTIFICATIONS, 
    AppView.PROFILE,
    AppView.SETUP,
    AppView.SESSION,
    AppView.ANALYZING,
    AppView.RESULT,
    AppView.REPORT,
    AppView.SUMMARY
  ].includes(currentView);

  // Views that are public marketing pages but NOT the landing page (which has its own header)
  const isPublicPage = [
    AppView.PRICING,
    AppView.ENTERPRISE,
    AppView.ABOUT,
    AppView.BLOG,
    AppView.CONTACT,
    AppView.PRIVACY,
    AppView.TERMS
  ].includes(currentView);

  return (
    <div className="min-h-screen bg-background-dark text-text-main font-sans selection:bg-primary/30">
      {isAppPage && <Header onChangeView={handleViewChange} currentView={currentView} />}
      {isPublicPage && <PublicHeader onChangeView={handleViewChange} />}
      
      <main className={`flex-1 ${isAppPage ? 'container mx-auto' : ''}`}>
        <Router 
          currentView={currentView}
          onChangeView={handleViewChange}
          onConfigComplete={setConfig}
        />
      </main>
    </div>
  );
};

export default App;