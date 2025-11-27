import { useState } from "react";
import { createSession, type CreateSessionResponse } from "../../api/sessions";
import { useInterviewStore } from "@/store/interviewStore";
import { useNavigate } from "react-router-dom";

type AxiosErrorLike = {
  isAxiosError?: boolean;
  message?: string;
  response?: { data?: { detail?: string } };
};

export default function StartInterviewForm() {
  const navigate = useNavigate();
  const setSession = useInterviewStore((s) => s.setSession);

  const [domain, setDomain] = useState("IT");
  const [role, setRole] = useState("Backend Engineer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buildErrorMessage = (err: unknown): string => {
    if (!err) return "Failed to start session.";

    if (typeof err === "string") return err;

    if (typeof err === "object") {
      const maybeAxios = err as AxiosErrorLike;
      if (maybeAxios.isAxiosError) {
        const detail = maybeAxios.response?.data?.detail;
        return detail || maybeAxios.message || "Failed to start session.";
      }

      if ("message" in err && typeof (err as { message?: string }).message === "string") {
        return (err as { message: string }).message;
      }
    }

    return "Failed to start session.";
  };

  const handleStart = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await createSession({
        domain,
        role,
        difficulty,
        num_questions: numQuestions,
      });
      setSession(data.sessionId, data.questions);
      navigate(`/session/${data.sessionId}/question/1`);
    } catch (err) {
      console.error(err);
      setError(buildErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold">Start Technical Interview</h2>

      <div>
        <label className="text-sm">Domain</label>
        <select className="border w-full p-2" value={domain} onChange={(e) => setDomain(e.target.value)}>
          <option>IT</option>
        </select>
      </div>

      <div>
        <label className="text-sm">Job Role</label>
        <select className="border w-full p-2" value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Backend Engineer</option>
          <option>Frontend Engineer</option>
          <option>DevOps Engineer</option>
          <option>FullStack Developer</option>
        </select>
      </div>

      <div>
        <label className="text-sm">Difficulty</label>
        <select className="border w-full p-2" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <div>
        <label className="text-sm">Number of Questions</label>
        <input
          type="number"
          min={1}
          max={20}
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value) || 1)}
          className="border w-full p-2"
        />
        <p className="text-xs text-gray-500 mt-1">Between 1 and 20 prompts per session.</p>
      </div>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      <button
        onClick={handleStart}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
      >
        {loading ? "Starting..." : "Start Interview"}
      </button>
    </div>
  );
}
