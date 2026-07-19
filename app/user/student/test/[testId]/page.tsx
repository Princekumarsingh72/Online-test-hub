"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function TestPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;
  const [test, setTest] = useState<any>(null);
  const [answers, setAnswers] = useState<{
    [key: number]: "A" | "B" | "C" | "D";
  }>({});

  const [user, setUser] = useState<any>(null);
    const fetchUser = async () => {
        try {
            const res = await fetch("/api/auth/signup");
            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])


  const handleAnswer = (
    questionId: number,
    option: "A" | "B" | "C" | "D"
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  useEffect(() => {
    if (testId) {
      getTest();
    }
  }, [testId]);

  const getTest = async () => {
    try {
      const res = await fetch(`/api/student/test/${testId}`);
      const data = await res.json();

      setTest(data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitTest = async () => {
    try {
      const res = await fetch("/api/student/test/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testId: Number(testId),
          userId: Number(user?.id), // Replace with logged-in user's id later
          answers,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      router.push(`/user/student/result/${data.attemptId}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!test) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }
  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-2">
        {test.title}
      </h1>

      <h2 className="text-lg mb-5">
        Subject : {test.subject?.name}
      </h2>

      {test && test.testQuestions.map((item: any, index: number) => (
        <div
          key={item.id}
          className="border rounded-lg p-5 mb-5 shadow"
        >
          <h2 className="font-semibold text-lg mb-3">
            {index + 1}. {item.question.question}
          </h2>

          <div className="space-y-2">

            <label className="block">
              <input
                type="radio"
                name={`question-${item.question.id}`}
                value="A"
                checked={answers[item.question.id] === "A"}
                onChange={() => handleAnswer(item.question.id, "A")}
              />{" "}
              {item.question.optionA}
            </label><br />

            <label className="block">
              <input
                type="radio"
                name={`question-${item.question.id}`}
                value="B"
                checked={answers[item.question.id] === "B"}
                onChange={() => handleAnswer(item.question.id, "B")}
              />{" "}
              {item.question.optionB}
            </label><br />

            <label className="block">
              <input
                type="radio"
                name={`question-${item.question.id}`}
                value="C"
                checked={answers[item.question.id] === "C"}
                onChange={() => handleAnswer(item.question.id, "C")}
              />{" "}
              {item.question.optionC}
            </label><br />

            <label className="block">
              <input
                type="radio"
                name={`question-${item.question.id}`}
                value="D"
                checked={answers[item.question.id] === "D"}
                onChange={() => handleAnswer(item.question.id, "D")}
              />{" "}
              {item.question.optionD}
            </label>

          </div>
        </div>
      ))}

      <button
        onClick={submitTest}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Submit Test
      </button>

    </div>
  );
}