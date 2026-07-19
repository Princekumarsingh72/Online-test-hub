import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { error } from "console";

export async function POST(req: Request) {
    try {
        const {title, duration, noOfQuestion, subId }= await req.json();
        if(!title || !duration || !noOfQuestion || !subId){
return NextResponse.json(
    {error:"All fields are required"},
    {status:500}

)}
const test= await db.test.create({
    data:{
        title:title,
        duration:Number(duration),
        noOfQuestions:Number(noOfQuestion),
        subjectId:Number(subId),
         totalMarks: 0,
        createdById: 11,
        startTime: new Date(), 
        endTime: new Date(), 
    }}
);
return Response.json(test);
    }
catch(e){
    return NextResponse.json(
        {error:"Somthing went wrong in test"},
    )
}
}
export async function GET(req: Request) {
    try{
        const getTest=await db.test.findMany()
    return NextResponse.json(getTest);
    }
    catch(error:any){
        return NextResponse.json(
            {success:false,
                error:error.message || "Something went wrong"
            },
            {status:500},
        )
    }
}