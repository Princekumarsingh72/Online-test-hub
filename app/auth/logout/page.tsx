"use client"

export default function Logout() {
    const handelLogout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "DELETE"
            })
            console.log("Logout successfully");
        } catch (error) {
            console.log(error)
        }
    }
}