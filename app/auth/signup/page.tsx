"use client"
import { useState } from "react";

export default function SignupPage() {
    // const router=useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("STUDENT");
    const [error, setError] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const signup = async () => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role })
        });
        const text = await res.text();
        let data;
        try {
            data = JSON.parse(text);
        }
        catch {
            setError("Server Error");
            return;
        }
        if (!res.ok) {
            setError(data.error);
            return;
        }

        setShowAlert(true);
        setName("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);


    }


    return (

        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center relative overflow-hidden">

            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617]" />
            <div className="absolute w-52 h-52 bg-cyan-500 rounded-full blur-[2px] opacity-100 top-0 left-90"></div>
            <div className="absolute w-60 h-60 bg-pink-500 rounded-full blur-[5px] opacity-60 bottom-0 left-70"></div>
            <div className="absolute w-72 h-72 rounded-full 
            bg-[radial-gradient(circle_at_30%_30%,_#ef4444_40%,_#1e3a8a_60%)] 
            blur-[7px] opacity-60 top-0 right-40">

            </div>
            <div className="absolute w-62 h-62 bg-blue-400 rounded-full blur-[6px] opacity-100 right-70 bottom-0"></div>

            <div className="relative z-10 w-[420px] p-8 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
                <h2 className="text-3xl text-white text-center mb-6 font-semibold">
                    SignUP
                </h2>
                <div className="flex flex-col gap-4">
                    <input type="text"
                        placeholder="Name"
                        className="bg-white/10 text-white placeholder-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError("");
                        }}
                    />
                    <input type="email"
                        placeholder="Email"
                        className="bg-white/10 text-white placeholder-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                    />
                    <input type="password"
                        placeholder="Password"
                        className="bg-white/10 text-white placeholder-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 transition text-white py-3 rounded-xl font-medium" onClick={signup}>
                        SignUp
                    </button>
                    {error && <p className="text-sm text-red-800 text-center">{error}</p>}
                </div>
            </div>
            {showAlert && <div className="fixed top-5 right-5 bg-black text-white px-5 py-3 rounded-lg shadow-lg transition-all duration-300">
                ✅ Signup Successfully
            </div>}
        </div>
    )

}