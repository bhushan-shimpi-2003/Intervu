
export enum AppView {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  DASHBOARD = 'DASHBOARD',
  SETUP = 'SETUP',
  SESSION = 'SESSION',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  REPORT = 'REPORT',
  SUMMARY = 'SUMMARY',
  INTERVIEWS = 'INTERVIEWS',
  HISTORY = 'HISTORY',
  NOTIFICATIONS = 'NOTIFICATIONS',
  PROFILE = 'PROFILE',
  // Footer Pages
  PRICING = 'PRICING',
  ENTERPRISE = 'ENTERPRISE',
  ABOUT = 'ABOUT',
  BLOG = 'BLOG',
  CONTACT = 'CONTACT',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS'
}

export interface InterviewConfig {
  role: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionCount: number;
}

export interface UserStats {
  confidence: number;
  correctness: number;
  lastScore: number;
}

export interface InterviewAnswer {
  questionId: number;
  question: string;
  transcript: string;
  feedback: string;
  score: number;
}