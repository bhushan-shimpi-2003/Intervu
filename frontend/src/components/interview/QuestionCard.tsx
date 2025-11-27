export default function QuestionCard({ question }: { question: string }) {
  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-lg font-semibold">Interview Question</h2>
      <p className="mt-4 text-gray-800">{question}</p>
    </div>
  );
}
