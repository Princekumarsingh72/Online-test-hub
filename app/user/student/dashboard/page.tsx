"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Loader from "@/app/component/loader";

export default function GetAllUsers() {
       const router = useRouter();

    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {

        getTests();

    }, []);

    const getTests = async () => {
setLoading(true);
try{
        const res = await fetch("/api/student/test");

        const data = await res.json();


        setTests(data);
}catch(error){
    console.error("Error fetching tests: ",error)
}
finally{
    setLoading(false);
}

    }
    if(loading){
        return (<Loader/>)
    }
console.log(tests);
    return (
        <div className="min-h-screen bg-[#0f172a] flex flex-col  relative overflow-hidden text-white">
            
            <div className="flex">
                <div className="grid md:grid-cols-3 gap-5 p-8 text-black ">
                    {
                        tests.map((test: any) => (
                            <div
                                key={test.id}
                                className="border rounded-lg shadow-md p-5 backdrop-blur-lg bg-white"
                            >
                                <h2 className="text-xl font-bold">
                                    {test.title}
                                </h2>
                                <p>
                                    Subject : {test.subject}
                                </p>
                                <p>
                                    Questions : {test.testquestion}
                                </p>
                                <p>
                                    Duration : {test.duration} min
                                </p>
                                <button
                                    onClick={() => router.push(`/user/student/test/${test.id}`)}
                                    className="bg-blue-500 text-white px-5 py-2 rounded mt-4"
                                >
                                    Start Test
                                </button>
                            </div>
                        ))}
                </div>
            </div>

        </div>
    )
}

