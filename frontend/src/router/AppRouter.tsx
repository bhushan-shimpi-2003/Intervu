// in AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StartInterview from "@/pages/StartInterview";
import QuestionView from "@/pages/QuestionView";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/start" replace />} />
        <Route path="/start" element={<StartInterview />} />
        <Route path="/session/:sessionId/question/:index" element={<QuestionView />} />
      </Routes>
    </BrowserRouter>
  );
}