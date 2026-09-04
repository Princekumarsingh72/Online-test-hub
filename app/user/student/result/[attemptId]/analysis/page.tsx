"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ResultPage() {
  const params = useParams();
  const attemptId = params.attemptId as string;

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!attemptId) return;

    async function getResult() {
      try {
        const response = await fetch(`/api/student/result/${attemptId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch result");
        }

        const data = await response.json();
        console.log(data); // Check API response
        setResult(data);
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setLoading(false);
      }
    }

    getResult();
  }, [attemptId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-red-600 text-xl">Result Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Result Analysis</h1>

      <div className="border rounded-lg p-5 shadow">
        <h2 className="text-xl font-semibold">
          {result.testattempt.test.title}
        </h2>

        <p>Total Questions: {result.totalQuestions}</p>
        <p>Correct: {result.correctAnswers}</p>
        <p>Wrong: {result.wrongAnswers}</p>
        <p>Unattempted: {result.unattemptedQuestions}</p>
        <p>Score: {result.score}</p>
        <p>Percentage: {result.percentage}%</p>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Question Analysis
      </h2>

      {result.testattempt.studentanswer.map((ans: any, index: number) => (
        <div
          key={ans.id}
          className="border rounded-lg p-4 mb-4 shadow"
        >
          <h3 className="font-semibold">
            Q{index + 1}. {ans.question.question}
          </h3>

          <div className="mt-3 space-y-1">
            <p>A. {ans.question.optionA}</p>
            <p>B. {ans.question.optionB}</p>
            <p>C. {ans.question.optionC}</p>
            <p>D. {ans.question.optionD}</p>
          </div>

          <div className="mt-4 space-y-1">
            <p>
              Your Answer:
              <span className="font-bold ml-2">
                {ans.selectedOption || "Not Answered"}
              </span>
            </p>

            <p>
              Correct Answer:
              <span className="font-bold ml-2 text-green-600">
                {ans.question.correctOption}
              </span>
            </p>

            <p
              className={`font-bold ${!ans.selectedOption
                  ? "text-yellow-600"
                  : ans.isCorrect
                    ? "text-green-600"
                    : "text-red-600"
                }`}
            >
              {!ans.selectedOption
                ? "⚪ Unattempted"
                : ans.isCorrect
                  ? "✅ Correct"
                  : "❌ Wrong"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}