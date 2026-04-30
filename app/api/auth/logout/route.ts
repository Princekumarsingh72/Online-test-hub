import { NextResponse } from "next/server";

export default function Logout(req: Request) {
    try {
        const response = NextResponse.json(
            {
                success: true,
                message: "Logout Successfully"
            }
        )
        response.cookies.set("token", "", {
            httpOnly: true,
            path: "/",
            expires: new Date(0)
        })
        return response;
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Logout Error"
            },
            { status: 500 }
        )
    }
}