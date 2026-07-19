"use client"

import { useEffect, useState } from "react";

export default function Users() {
    const [user, setUser] = useState<any[]>([]);
    const test = async () => {

        const res = await fetch("/api/auth/signup");
        const data = await res.json();
        setUser(data);
    };
    useEffect(() => {
        test();
    }, []);

    return (
        <div className="min-h-screen bg-[#0f172a] flex flex-col relative overflow-hidden text-white">

            <h1>USER</h1>
            <table>
                <thead>
                    <tr>
                        <th className="border-2">ID</th>
                        <th className="border-2">Name</th>
                        <th className="border-2">Email</th>
                        <th className="border-2">Role</th>
                    </tr>
                </thead>

                <tbody>
                    {user.map((user) => (
                        <tr key={user.id}>
                            <td className="border-2">{user.id}</td>
                            <td className="border-2">{user.name} </td>
                            <td className="border-2">{user.email}</td>
                            <td className="border-2">{user.role}</td>
                        </tr>


                    ))}
                </tbody>
            </table>
        </div>
    );

}