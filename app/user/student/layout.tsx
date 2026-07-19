"use client"

import { useEffect, useState } from "react";

export default function userLayout({ children }: any) {
    const [user, setUser] = useState<any>(null);
    const fetchUser = async () => {
        try {
            const res = await fetch("/api/auth/signup");
            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div className=" flex min-h-screen ">
            <aside className="w-64 bg-gray-900 text-white p-5">
                <h1>User Dashboard</h1>
                <ul className="my-4 gap-4"><hr />
                    <li> <a href="/user/student/dashboard"> Dashboard </a></li><hr />
                    <li> <a href="/user/student/result/[attemptId]"> Result </a></li><hr />
                    <li> <a href="/user/student/mocktest"> Mocktest </a></li><hr />
                </ul>
            </aside>
            <div className="w-full flex-1">
                <header className="h-16 bg-[#0f172a] text-white shadow flex items-center justify-between mx-2 px-6">

                    <span className="text-xl my-10 mx-5">Hello <strong className="text-red-500">{user?.name}</strong> Welcome to TestHub</span>
                    <img className="w-20 h-20 object-cover"
                        src={"https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369989.png"}
                    />

                </header>

                <main className="flex-1 p-2 bg-gray-100">

                    {children}

                </main>
            </div>
        </div>
    )
}