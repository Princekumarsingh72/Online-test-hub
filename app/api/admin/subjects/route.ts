// src/app/api/subjects/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  
  try{
   await verifyAdmin();

  const { name } = await req.json();

  const subject = await db.subject.create({
    data:{name} 
  });

  return Response.json(subject);
}catch(error:any){
  return Response.json(
    {error:error.message || "Something went worng"},
    {status:500}
  );
}}

export async function GET(req: Request){
  try{
    
    const getAllSubject= await db.subject.findMany();
    return Response.json(getAllSubject);
  }catch(error:any){
    return Response.json(
      {error:error.message || "Something went wrong"},
      {status:500}
    )
  }
}

export async function DELETE(req: Request) {

    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    reeor: "ID is required"
                },
                { status: 400 }
            )
        }
await db.subject.delete({
    where:{
        id:id
          },
    });


    } catch (error) {
return NextResponse.json(
    {error:error}
)
    }

}