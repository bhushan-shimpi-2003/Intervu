import React, { useState } from 'react';
import { Bell, Check, Trash2, Info, AlertTriangle, CheckCircle, Calendar } from 'lucide-react';
import { Button } from '../components/Button';
import { AppView } from './types';
import { motion, AnimatePresence } from 'framer-motion';

// Fix: Cast motion.div to any to avoid type errors
const MotionDiv = motion.div as any;

interface NotificationsProps {
  onChangeView: (view: AppView) => void;
}

interface NotificationItem {
  id: number;
  type: 'info' | 'success' | 'warning' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    type: 'success',
    title: 'Interview Analysis Ready',
    message: 'Your "Senior Product Manager" session report is ready to view.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'reminder',
    title: 'Daily Streak Reminder',
    message: 'You are on a 3-day streak! Complete one session today to keep it going.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'New Feature: Custom Questions',
    message: 'You can now add your own custom questions to the practice bank.',
    time: '1 day ago',
    read: true,
  },
  {
    id: 4,
    type: 'warning',
    title: 'Subscription Expiring Soon',
    message: 'Your pro trial ends in 3 days. Upgrade to keep premium features.',
    time: '2 days ago',
    read: true,
  }
];

export const Notifications: React.FC<NotificationsProps> = ({ onChangeView }) => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'reminder': return <Calendar className="w-5 h-5 text-primary" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-display text-white mb-2">Notifications</h1>
          <p className="text-text-muted">Stay updated with your progress and system alerts.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={markAllRead} className="text-text-muted hover:text-white">
            <Check className="w-4 h-4 mr-2" /> Mark all read
          </Button>
        </div>
      </header>

      <div className="space-y-4">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <MotionDiv 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-background-card border border-zinc-800 rounded-2xl"
            >
              <Bell className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-1">All caught up!</h3>
              <p className="text-text-muted">You have no new notifications.</p>
            </MotionDiv>
          ) : (
            notifications.map((item) => (
              <MotionDiv
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`
                  relative p-5 rounded-xl border transition-all duration-200 group
                  ${item.read 
                    ? 'bg-background-card border-zinc-800' 
                    : 'bg-zinc-800/40 border-primary/30 shadow-[0_0_15px_rgba(0,194,186,0.05)]'}
                `}
              >
                {!item.read && (
                  <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                )}
                
                <div className="flex gap-4">
                  <div className={`mt-1 p-2 rounded-lg bg-zinc-900/50 border border-zinc-800`}>
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start pr-6">
                      <h3 className={`font-semibold text-lg mb-1 ${item.read ? 'text-zinc-300' : 'text-white'}`}>
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-text-muted text-sm mb-3 leading-relaxed max-w-2xl">
                      {item.message}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-zinc-500 font-medium">{item.time}</span>
                      {!item.read && (
                        <button 
                          onClick={() => markAsRead(item.id)}
                          className="text-xs text-primary hover:text-primary-hover font-medium"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => deleteNotification(item.id)}
                      className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </MotionDiv>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};