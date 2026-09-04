"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function TestPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;
  const [test, setTest] = useState<any>(null);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
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

  const [index, setIndex] = useState(0);

  const prevQuestion = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
    }

  }
  const nextQuestion = () => {
    if (index < (test?.testquestion?.length ?? 0) - 1) {
      setIndex((prev) => prev + 1);
    }
  };

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

  // Detect tab switching
  // useEffect(() => {
  //   const handleVisibility = () => {
  //     if (document.hidden) {
  //       setTabSwitchCount((prev) => prev + 1);
  //     }
  //   };

  //   document.addEventListener(
  //     "visibilitychange",
  //     handleVisibility
  //   );

  //   return () => {
  //     document.removeEventListener(
  //       "visibilitychange",
  //       handleVisibility
  //     );
  //   };
  // }, []);

  // // Auto submit after 3 tab switches
  // useEffect(() => {
  //   if (tabSwitchCount >= 3) {
  //     alert("Test submitted because of multiple tab switches.");
  //     submitTest();
  //   }
  // }, [tabSwitchCount]);

  const currentQuestion = test?.testquestion?.[index];
  const questionData = currentQuestion?.question;
  const question = currentQuestion?.question.question;
  const optionA = currentQuestion?.question.optionA;
  const optionB = currentQuestion?.question.optionB;
  const optionC = currentQuestion?.question.optionC;
  const optionD = currentQuestion?.question.optionD;

  // Set initial time
useEffect(() => {
  if (test?.duration) {
    setTimeLeft(test.duration * 60);
  }
}, [test]);


// Countdown
useEffect(() => {
  if (timeLeft <= 0) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);


// Auto submit when time is over
useEffect(() => {
  if (timeLeft === 0 && test?.duration) {
    submitTest();
  }
}, [timeLeft, test]);
  if (!test) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }
  return (
    <div className="max-w-5xl mx-auto p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-2">
          {test.title}
        </h1>
        <p className="text-xl text-red-600 font-bold">
          Time Left: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </p>
      </div>

      <h2 className="text-lg mb-5">
        Subject : {test.subject?.name}
      </h2>

      <div>

        <div
          key={questionData.id}
          className="border rounded-lg p-5 mb-5 shadow"
        >
          <h2 className="font-semibold text-lg mb-3">
            {index + 1}. {question}
          </h2>

          <div className="space-y-2">

            <label className="block">
              <input
                type="radio"
                name={`question-${questionData.id}`}
                value="A"
                checked={answers[questionData.id] === "A"}
                onChange={() => handleAnswer(questionData.id, "A")}
              />{" "}
              {optionA}
            </label><br />

            <label className="block">
              <input
                type="radio"
                name={`question-${questionData.id}`}
                value="B"
                checked={answers[questionData.id] === "B"}
                onChange={() => handleAnswer(questionData.id, "B")}
              />{" "}
              {optionB}
            </label><br />

            <label className="block">
              <input
                type="radio"
                name={`question-${questionData.id}`}
                value="C"
                checked={answers[questionData.id] === "C"}
                onChange={() => handleAnswer(questionData.id, "C")}
              />{" "}
              {optionC}
            </label><br />

            <label className="block">
              <input
                type="radio"
                name={`question-${questionData.id}`}
                value="D"
                checked={answers[questionData.id] === "D"}
                onChange={() => handleAnswer(questionData.id, "D")}
              />{" "}
              {optionD}
            </label>

          </div>
        </div>

      </div>
      <button
        onClick={submitTest}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Submit Test
      </button>
      <button
        onClick={prevQuestion}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Previous
      </button>
      <button
        onClick={nextQuestion}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Next
      </button>

    </div>
  );
}