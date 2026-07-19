"use client";

import { useEffect, useState } from "react";

export default function AssignQuestion() {
  const [tests, setTests] = useState<any[]>([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [subject, setSubject] = useState<any>(null);

  useEffect(() => {
    getTests();
  }, []);

  const getTests = async () => {
    try {
      const res = await fetch("/api/admin/test");
      const data = await res.json();
      setTests(data);
    } catch (error) {
      console.log(error);
    }
  };



  const handleTestChange = async (testId: string) => {
    setSelectedTest(testId);
    setSelectedQuestions([]);
    setQuestions([]);
    const res = await fetch(`/api/admin/assign_test/${testId}`);
    const data = await res.json();

    console.log(data);

    setSubject(data.subject);
    await fetchQuestions(data.subject.id);
  };

  const handleCheckbox = (questionId: number, checked: boolean) => {
    if (checked) {
      setSelectedQuestions((prev) => [...prev, questionId]);
    } else {
      setSelectedQuestions((prev) =>
        prev.filter((id) => id !== questionId)
      );
    }
  };

  const fetchQuestions = async (subjectId: number) => {
    try {
      const res = await fetch(`/api/admin/question/${subjectId}`);
      const data = await res.json();

      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const assignQuestions = async () => {
    try {
      const res = await fetch("/api/admin/assign_test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testId: selectedTest,
          questionIds: selectedQuestions,
        }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <h1>Subject</h1>
      <div>{subject && (
        <div className="mt-4 border p-3 rounded text-black">
          Subject: {subject.name}
        </div>
      )}</div>
      <h1 className="text-2xl font-bold mb-4">Assign Questions</h1>

      <select
        className="border p-2 rounded w-full text-black"
        value={selectedTest}
        onChange={(e) => handleTestChange(e.target.value)}
      >
        <option value="">Select Test</option>

        {tests.map((test) => (
          <option key={test.id} value={test.id}>
            {test.id} - {test.title}
          </option>
        ))}
      </select>

      <div className="mt-5">
        {questions.map((q) => (
          <div key={q.id} className="mb-2 border p-2 rounded text-black">
            <input
              type="checkbox"
              onChange={(e) =>
                handleCheckbox(q.id, e.target.checked)
              }
            />{" "}
            {q.question}
          </div>
        ))}
      </div>

      {questions.length > 0 && (
        <button
          onClick={assignQuestions}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Assign Questions
        </button>
      )}
    </div>
  );
}