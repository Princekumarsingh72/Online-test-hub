"use client"
import { useState, useEffect } from "react";

export default function Test() {
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState("");
    const [noOfQuestion, setNoOfQuestion] = useState("");
    const [subId, setSubId] = useState("");
    const [error, setError] = useState("");
    const [subject, setSubject] = useState<any[]>([]);
    const [fetchTest, setFetchTest] = useState<any[]>([]);
    const test = async () => {
        try {
            const res = await fetch("/api/admin/test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, duration, noOfQuestion, subId })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error);
                return;
            }

            setTitle("");
            setDuration("");
            setNoOfQuestion("");
            setSubId("");


        } catch (err) {
            setError("Server error");
        }
    }
    async function getAllSubject() {
        const res = await fetch("/api/admin/subjects");
        const data = await res.json();
        setSubject(data);
    };
    useEffect(() => {
        getAllSubject();
    }, []);

    async function GetAllTest() {
        const res = await fetch("/api/admin/test");
        const data = await res.json();
        setFetchTest(data);
    }
    useEffect(() => {
        GetAllTest();
    }, []);

    return (
        <div className="min-h-screen bg-[#0f172a] flex flex-col relative overflow-hidden text-white">
            <h1 className="font-23px">Add Test</h1>
            <div className=" flex  justify-center items-center w-[100%">
                <input
                    className="border-1 w-[90%]"
                    value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    className="border-1 w-[90%]"
                    value={duration} placeholder="Duration" type="int" onChange={(e) => setDuration(e.target.value)}
                />
                <input
                    className="border-1 w-[90%]"
                    value={noOfQuestion} placeholder="Number Of Questions" onChange={(e) => setNoOfQuestion(e.target.value)}
                />

                <select
                    value={subId}
                    onChange={(e) => setSubId(e.target.value)}
                >
                    <option>Select Subject</option>
                    {subject.map((sub, index) => (
                        <option className="text-black" key={sub.id} value={sub.id}>{sub.id}{sub.name}</option>
                    ))}
                </select>
                <button className="bg-blue-500 px-3 py-2" onClick={test}>Add</button>
            </div>
            <p>{error}</p>
            <table  className="text-white">
            <thead>
                <tr>
                    <th className="border-2 ">Title</th>
                    <th className="border-2 ">Duration</th>
                    <th className="border-2 ">Questions</th>
                    <th className="border-2 ">Subject</th>
                </tr>
                </thead>
                <tbody>
                {fetchTest.map((test, index) => (
                    <tr key={test.id}>
                        <td className="border-2 px-4">{test.title}</td>
                        <td className="border-2 px-4">{test.duration}</td>
                        <td className="border-2 px-4">{test.noOfQuestions}</td>
                        <td className="border-2 px-4">{test.subjectId}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}