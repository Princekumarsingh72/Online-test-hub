"use client"
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
 
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Welcome to Online Test Hub
      </h1>

      <p className="text-gray-300 text-lg text-center max-w-xl mb-6">
        A platform to take tests, analyze performance, and improve skills efficiently.
      </p>

      <div className="flex gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-xl font-semibold">
          Start Test
        </button>
        <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-xl">
          Explore
        </button>
      </div>

    </div>
  )}