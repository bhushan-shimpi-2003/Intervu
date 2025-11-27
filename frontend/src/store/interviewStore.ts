import { create } from "zustand";

interface Question {
  id: string;
  text: string;
}

interface InterviewState {
  sessionId: string | null;
  questions: Question[];
  currentIndex: number;

  setSession: (id: string, questions: Question[]) => void;
  nextQuestion: () => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  sessionId: null,
  questions: [],
  currentIndex: 0,

  setSession: (id, questions) =>
    set({ sessionId: id, questions, currentIndex: 0 }),

  nextQuestion: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
    })),
}));
