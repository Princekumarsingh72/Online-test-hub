import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { name, email, password, role } = await req.json();

        if (!name || !email || !password || !role) {
            return NextResponse.json(
                { error: "All field are required" },
                { status: 400 }
            )
        }

        const existing = await db.user.findUnique({
            where: {
                email: email
            },
        });
        if (existing) {
            return NextResponse.json(
                { error: "Email Already Registerd" },
                { status: 409 }
            )
        };

        const hashedPassword = await hashPassword(password);

        await db.user.create({
            data: {
                name:name,
                email:email,
                password: hashedPassword,
                role:role
            }
        });
        return NextResponse.json({ success: true });
    }
    catch (error) {
        console.log("Registaration error", error);
        return NextResponse.json(
            { error: String(error) },
            { status: 500 }
        );
    }
}