"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaTrophy,
  FaChartLine
} from "react-icons/fa";
export default function ResultPage() {
  const router = useRouter();
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
        console.log(data);
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

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="text-center mb-8">
        <p className="text-gray-400 uppercase tracking-widest">
          Your Score
        </p>

        <h1 className="text-4xl font-extrabold text-green-400">
          {result.percentage.toFixed(2)}%
        </h1>

        <p className="text-gray-300 mt-2">
          Great Job 🎉
        </p>
      </div>

      <div className=" flex bg-white/10 backdrop-blur-lg gap-5 rounded-3xl border border-white/20 p-8">

        <div className="w-[100%] bg-red-600 rounded-xl p-5 text-center">
          <h2 className="text-3xl font-bold">
            {result.wrongAnswers}
          </h2>
          <p>Wrong</p>
        </div>

        <div className="w-[100%] bg-yellow-500 rounded-xl p-5 text-center">
          <h2 className="text-3xl font-bold">
            {result.totalQuestions}
          </h2>
          <p>Total</p>
        </div>

        <div className="w-[100%] bg-blue-600 rounded-xl p-5 text-center">
          <h2 className="text-3xl font-bold">
            {result.score}
          </h2>
          <p>Score</p>
        </div>

      </div>

      <div className="flex justify-center items-center max-w-3xl mx-auto mt-10">

        <p className="text-center mx-20 text-white text-xl font-semibold mb-5">
          Performance
        </p>

        <div className="flex justify-center">
          <div className="w-40 h-40 ">
            <CircularProgressbar
              value={result.percentage}
              text={`${result.percentage.toFixed(2)}%`}
              styles={buildStyles({
                pathColor: "#22c55e",
                trailColor: "#1051b8",
                textColor: "#ffffff",
                textSize: "14px",
              })}
            />
          </div>
        </div>

        <button className="mx-30 my-10">
          {
            result.percentage >= 80 ?

              <div className="bg-green-600 rounded-full px-6 py-2">
                Excellent 🎉
              </div>

              :

              result.percentage >= 50 ?

                <div className="bg-yellow-500  rounded-full px-6 py-2">
                  Good 👍
                </div>

                :

                <div className="bg-red-600 rounded-full px-6 py-2">
                  Need Improvement 😔
                </div>

          }
        </button>
      </div>

      <div className="flex justify-center gap-5 my-5">

        <button
          onClick={()=>router.push(`/user/student/result/${attemptId}/analysis`)}
        className="bg-blue-600 hover:bg-blue-700 px-6 py- rounded-xl">
          Review Answers
        </button>

        <button 
      onClick={()=>router.push("/user/student/dashboard")}
        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl">
          Dashboard
        </button>

      </div>

    </div>

  );
}