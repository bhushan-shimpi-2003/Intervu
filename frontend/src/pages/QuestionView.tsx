import { useParams } from "react-router-dom";
import { useInterviewStore } from "@/store/interviewStore";
import QuestionCard from "@/components/interview/QuestionCard";

export default function QuestionView() {
const { index } = useParams();
const idx = Number(index) - 1;

const questions = useInterviewStore((s) => s.questions);

  if (!questions.length) return <div>Loading...</div>;

  const q = questions[idx];

  return (
    <div className="p-6 flex flex-col space-y-6">
      <QuestionCard question={q.text} />

      <button
        className="bg-blue-600 text-white p-3 rounded-lg w-fit"
        onClick={() => {
          window.location.href = `/session/${useInterviewStore.getState().sessionId}/question/${idx + 2}`;
        }}
      >
        Next Question
      </button>
    </div>
  );
}
