import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppView, InterviewConfig } from './pages/types';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Interviews } from './pages/Interviews';
import { History } from './pages/History';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { SetupInterview } from './pages/SetupInterview';
import { ActiveSession } from './pages/ActiveSession';
import { Analyzing } from './pages/Analyzing';
import { ResultDetail } from './pages/ResultDetail';
import { FinalReport } from './pages/FinalReport';
import { InterviewSummary } from './pages/InterviewSummary';
import { Pricing } from './pages/Pricing';
import { Enterprise } from './pages/Enterprise';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';

// Fix: Cast motion.div to any to avoid type errors
const MotionDiv = motion.div as any;

interface RouterProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  onConfigComplete: (config: InterviewConfig) => void;
}

export const Router: React.FC<RouterProps> = ({ currentView, onChangeView, onConfigComplete }) => {
  return (
    <AnimatePresence mode="wait">
      <MotionDiv
        key={currentView}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        {currentView === AppView.LANDING && <Landing onChangeView={onChangeView} />}
        {currentView === AppView.LOGIN && <Login onChangeView={onChangeView} />}
        {currentView === AppView.SIGNUP && <Signup onChangeView={onChangeView} />}
        
        {/* Authenticated Views */}
        {currentView === AppView.DASHBOARD && <Dashboard onChangeView={onChangeView} />}
        {currentView === AppView.INTERVIEWS && <Interviews onChangeView={onChangeView} />}
        {currentView === AppView.HISTORY && <History onChangeView={onChangeView} />}
        {currentView === AppView.NOTIFICATIONS && <Notifications onChangeView={onChangeView} />}
        {currentView === AppView.PROFILE && <Profile onChangeView={onChangeView} />}
        {currentView === AppView.SETUP && (
          <SetupInterview 
            onChangeView={onChangeView} 
            onConfigComplete={onConfigComplete} 
          />
        )}
        {currentView === AppView.SESSION && <ActiveSession onChangeView={onChangeView} />}
        {currentView === AppView.ANALYZING && <Analyzing onChangeView={onChangeView} />}
        {currentView === AppView.RESULT && <ResultDetail onChangeView={onChangeView} />}
        {currentView === AppView.REPORT && <FinalReport onChangeView={onChangeView} />}
        {currentView === AppView.SUMMARY && <InterviewSummary onChangeView={onChangeView} />}

        {/* Public Footer Pages */}
        {currentView === AppView.PRICING && <Pricing onChangeView={onChangeView} />}
        {currentView === AppView.ENTERPRISE && <Enterprise onChangeView={onChangeView} />}
        {currentView === AppView.ABOUT && <About onChangeView={onChangeView} />}
        {currentView === AppView.BLOG && <Blog onChangeView={onChangeView} />}
        {currentView === AppView.CONTACT && <Contact onChangeView={onChangeView} />}
        {currentView === AppView.PRIVACY && <Legal view="PRIVACY" onChangeView={onChangeView} />}
        {currentView === AppView.TERMS && <Legal view="TERMS" onChangeView={onChangeView} />}
      </MotionDiv>
    </AnimatePresence>
  );
};