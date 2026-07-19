"use client"
import { useEffect, useState } from "react";
export default function ImportQuestion() {
    const [subjectId, setSubjectId] = useState("");
    const [subject, setSubject] = useState<any[]>([]);
    // const [difficulty, setDifficulty] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);


    const fetchSubject = async () => {
        const req = await fetch("/api/admin/subjects");
        const data = await req.json();
        setSubject(data);
    }
    useEffect(() => {
        fetchSubject();
    }, []);


    const importquestion = async () => {
        if (!subjectId) {
            alert("Select Subject");
            return;
        }

        // if (!difficulty) {
        //     alert("Select Difficulty");
        //     return;
        // }

        if (!file) {
            alert("Select File");
            return;
        }

        const formData = new FormData();

        formData.append("subjectId", subjectId);
        // formData.append("difficulty", difficulty);
        formData.append("file", file);

        try {
            setLoading(true);

            const response = await fetch("/api/admin/question/import", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Backend Error:", errorText);
                alert("Import Failed");
                return;
            }

            const data = await response.json();

            alert(data.message || "Questions Imported Successfully");

        } catch (error) {
            console.error(error);
            alert("Import Failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-[#0f172a] text-white flex flex-col justify-center items-center gap-10">
            <h1 className="text-4xl"><strong>Import question</strong></h1>
            <div className="felx">
                <select className="bg-white text-black cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-black hover:bg-blue-700 active:scale-95 transition duration-200 shadow-md shadow-gray-500 hover:shadow-lg"
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}>
                    <option value="" disabled hidden>Select Subject</option>
                    {subject && subject.map((sub) => (
                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                </select>

                {/* <select className="bg-white text-black cursor-pointer rounded-md bg-blue-600 px-4 py-2 mx-5 text-black hover:bg-blue-700 active:scale-95 transition duration-200 shadow-md shadow-gray-500 hover:shadow-lg"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="" disabled hidden>Set Difficulty</option>
                    <option value={"EASY"}>Easy</option>
                    <option value={"MEDIUM"}>Medium</option>
                    <option value={"HARD"}>Hard</option>
                </select> */}

            </div>

            <div className="bg-white text-black cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-black hover:bg-blue-700 active:scale-95 transition duration-200 shadow-md shadow-gray-500 hover:shadow-lg">
                <input
                    type="file"
                    accept=".json,.csv"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setFile(e.target.files[0]);
                        }
                    }}
                />
            </div>
            <button
                type="button"
                onClick={importquestion}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {loading ? "Importing..." : "Import Questions"}
            </button>
        </div>
    )

}