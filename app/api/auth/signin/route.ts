import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePassword, createToken } from "@/lib/auth";

export async function POST(req: Request) {
   
    try {
        const { email, password } = await req.json();

        if (!email || !password ) {
            return NextResponse.json(
                { error: "All field are required" },
                { status: 409 }
            )
        }
        const existing = await db.user.findUnique({
            where: {
                email: email
            }
        })
        if (!existing) {
            return NextResponse.json(
                { error: "User not Found" },
                { status: 401 }
            )
        }
        const isValid = await comparePassword(password, existing.password);
        if (!isValid) {
            return NextResponse.json(
                { error: "Password does not match" },
                { status: 401 }
            )
        }
        const token = await createToken({
            id: existing.id,
            role: existing.role
        })
        const res = NextResponse.json({
            success: true,
            role: existing.role
        })
        res.cookies.set("token", token, {
            httpOnly: true,
            path: "/"
        });
        return res;
    }
    catch (error) {
        console.error("LOGIN ERROR 👉", error);
        return NextResponse.json(
            { error: String( "Something went wrong. Please try again later.") },
            { status: 500 }
        );
    }
}