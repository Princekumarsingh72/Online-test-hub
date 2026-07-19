import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, verifyToken } from "@/lib/auth";

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
                name: name,
                email: email,
                password: hashedPassword,
                role: role
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

export async function GET(req: any){
    const token = await req.cookies.get("token")?.value;
    try {
        const decoded: any = await verifyToken(token);
        const role = decoded.role;
console.log(role);
        if (role == "ADMIN") {
            const users = await db.user.findMany();
            return NextResponse.json(users);
        }

        if (role == "STUDENT") {
            const user = await db.user.findUnique({
                where: {
                    id: decoded.id
                }
            });

           return NextResponse.json(user);
        }
        
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {

    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                {
                    success: false,
                    reeor: "email is required"
                },
                { status: 400 }
            )
        }
        await db.user.delete({
            where: {
                email: email
            },
        });


    } catch (error) {
        return NextResponse.json(
            { error: error }
        )
    }

}
