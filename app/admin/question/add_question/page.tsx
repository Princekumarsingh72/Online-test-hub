"use client"
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';

export default function AddQuestions() {
    const [question, setQuestion] = useState("");
    const [opt1, setOpt1] = useState("");
    const [opt2, setOpt2] = useState("");
    const [opt3, setOpt3] = useState("");
    const [opt4, setOpt4] = useState("");
    const [correctOpt, setCorrectOpt] = useState("");
    const [fetchQuestion, setFetchQuestion] = useState<any[]>([]);
    const [fetchSubject, setFetchSubject] = useState<any[]>([]);
    const [subID, setSubID] = useState("");
    const [diffLevel, setDiffLevel] = useState("");
    const [disableForm, setDesableForm] = useState(false);

    const getAllSubject = async () => {
        const res = await fetch("/api/admin/subjects");
        const data = await res.json();
        setFetchSubject(data);
    }
    useEffect(() => {
        getAllSubject();
    }, []);

    const GetQuestion = async () => {
        try {
            const res = await fetch("/api/admin/question/add_question");
            const data = await res.json();
            setFetchQuestion(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        GetQuestion();
    }, []);

    const DeleteQuestion = async (id: string) => {
        try {
            const res = await fetch("/api/admin/question/add_question", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    const handelsubmit = async () => {
        try {
            const res = await fetch("/api/admin/question/add_question", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question, opt1, opt2, opt3, opt4, correctOpt, subID, diffLevel }),
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.error);
                alert(data.error);
                return;
            }
            alert(
                "Question Added Successfully"
            );
        } catch (e) {
            console.log(e);
            alert("somthing went wrong");
        }

    };
    return (
        <div className="min-h-screen bg-[#0f172a]  ">
            <div className="flex flex-col items-center relative overflow-hidden text-white ">

                <span className="p-3 bg-blue-100 text-black rounded-full my-4">
                    {disableForm ? "Hide" : "Add Question"}

                    <Switch
                        checked={disableForm}
                        checkedChildren="On"
                        unCheckedChildren="Off"
                        onChange={(checked) => setDesableForm(checked)}
                    />
                </span>

                {disableForm && (<>
                    <h1 className="text-4xl"><strong>Add Qustion</strong></h1>

                    <div className="flex flex-col w-[80%]">
                        <input className="border-1 py-1 rounded-lg"
                            type="text" value={question} placeholder="Enter question"
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <input className="border-1 py-1 rounded-lg"
                            type="text" value={opt1} placeholder="Enter opt1"
                            onChange={(e) => setOpt1(e.target.value)}
                        />
                        <input className="border-1 py-1 rounded-lg"
                            type="text" value={opt2} placeholder="Enter opt2"
                            onChange={(e) => setOpt2(e.target.value)}
                        />
                        <input className="border-1 py-1 rounded-lg"
                            type="text" value={opt3} placeholder="Enter opt3"
                            onChange={(e) => setOpt3(e.target.value)}
                        />
                        <input className="border-1 py-1 rounded-lg"
                            type="text" value={opt4} placeholder="Enter opt4"
                            onChange={(e) => setOpt4(e.target.value)}
                        />

                    </div>

                    <div className="flex justify-around w-[80%] my-4">
                        <select
                            className="bg-white text-black cursor-pointer rounded-md bg-blue-600 px-4 py-2 mx-5 text-black hover:bg-blue-700 active:scale-95 transition duration-200 shadow-md shadow-gray-500 hover:shadow-lg"
                            value={correctOpt}
                            onChange={(e) => setCorrectOpt(e.target.value)}
                        >
                            <option value="" disabled hidden>choose correct option</option>
                            <option className="text-black" value="A">A</option>
                            <option className="text-black" value="B">B</option>
                            <option className="text-black" value="C">C</option>
                            <option className="text-black" value="D">D</option>

                        </select>

                        <select
                            className="bg-white text-black cursor-pointer rounded-md bg-blue-600 px-4 py-2 mx-5 text-black hover:bg-blue-700 active:scale-95 transition duration-200 shadow-md shadow-gray-500 hover:shadow-lg"
                            value={subID}
                            onChange={(e) => setSubID(e.target.value)}
                        >
                            <option value="" disabled hidden>Select Subject</option>
                            {fetchSubject.map((sub) => (
                                <option className="text-black" key={sub.id} value={sub.id}>{sub.id}. {sub.name}</option>
                            ))}
                        </select>



                        <select
                            className="bg-white text-black cursor-pointer rounded-md bg-blue-600 px-4 py-2 mx-5 text-black hover:bg-blue-700 active:scale-95 transition duration-200 shadow-md shadow-gray-500 hover:shadow-lg"
                            value={diffLevel}
                            onChange={(e) => setDiffLevel(e.target.value)}
                        >
                            <option className="text-white" value="" disabled hidden>Deficulty Level</option>
                            <option className="text-black" value="EASY">EASY</option>
                            <option className="text-black" value="MEDIUM">MEDIUM</option>
                            <option className="text-black" value="HARD">HARD</option>
                        </select>
                    </div>
                    <button className="bg-blue-500 m-3 px-3 py-1 rounded-lg" onClick={handelsubmit}>
                        Submit
                    </button>
                </>)}
                <div className="m-5 max-h-[500px] overflow-y-auto border rounded-lg">
                    <table className="w-full text-white">
                        <thead className="sticky top-0 bg-gray-900">
                            <tr className="border-1 py-1">
                                <th className="border-1 py-1">ID</th>
                                <th className="border-1 py-1">Question</th>
                                <th className="border-1 py-1">OPT.A</th>
                                <th className="border-1 py-1">OPT.B</th>
                                <th className="border-1 py-1">OPT.C</th>
                                <th className="border-1 py-1">OPT.D</th>
                                <th className="px-2">Correct</th>
                                <th className="border-1 py-1">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {fetchQuestion.map((ques, index) => (
                                <tr key={ques.id} className="py-6 m-6">
                                    <td className="border-1 py-1">{ques.id}</td>
                                    <td className="border-1 py-1 px-2">{ques.question}</td>
                                    <td className="border-1 py-1 px-2">A. {ques.optionA}</td>
                                    <td className="border-1 py-1 px-2">B. {ques.optionB}</td>
                                    <td className="border-1 py-1 px-2">C. {ques.optionC}</td>
                                    <td className="border-1 py-1 px-2">D. {ques.optionD}</td>
                                    <td className="border-1 py-1 px-2">{ques.correctOption}</td>
                                    <td className="border-1 py-1 px-2 text-red-500"><MdDeleteForever onClick={() => DeleteQuestion(ques.id)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}