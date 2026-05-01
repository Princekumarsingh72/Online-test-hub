"use client"
import { useState } from "react"

export default function Subject() {
    const [subName, setSubName] = useState("");
    const [error, setError] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    
    const subject = async () => {
        setError("");

try{       
const res = await fetch("/api/subjects", {
            method: "POST",
            credentials:"include",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name:subName})

        });
        const data = await res.json();
         if (!res.ok) {
            setError(data.error);
            return;
        }
      
        setSubName("");
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 2000);
    }
    catch(err) {
            setError("Server error");
           
        }
    };
    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center relative overflow-hidden">

           

            <div className="relative z-10 w-[420px] p-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
                <h2 className="text-3xl text-white text-center mb-6 font-semibold">
                    Add Subject
                </h2>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Subject Name"
                        value={subName}
                        onChange={(e) => {
                            setSubName(e.target.value);
                            setError("");
                        }}
                        className="bg-white/10 text-white placeholder-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button className="bg-blue-500 hover:bg-blue-600 transition text-white py-3 rounded-xl font-medium" onClick={subject}>
                        Add
                    </button>

                    {error && <p className="text-sm text-red-800 text-center">{error}</p>}
                </div>
            </div>
            {showAlert && <div className="fixed top-5 right-5 bg-black text-white px-5 py-3 rounded-lg shadow-lg transition-all duration-300">
                ✅ Added Successfully
            </div>}
        </div>




    )
}