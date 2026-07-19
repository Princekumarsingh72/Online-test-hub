import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { error } from "console";

export async function POST(
    req: Request
) {

    try {

        const {

            question,

            opt1,

            opt2,

            opt3,

            opt4,

            correctOpt,
            subID,
            diffLevel

        } = await req.json();

        // Validation
        if (

            !question ||

            !opt1 ||

            !opt2 ||

            !opt3 ||

            !opt4 ||

            !correctOpt||
            !subID||
            !diffLevel

        ) {

            return NextResponse.json(

                {
                    error:
                        "All Fields Are Required"
                },

                {
                    status: 400
                }

            );

        }

        // Insert Question
        const newQuestion =
            await db.question.create({

                data: {

                    question,

                    optionA: opt1,

                    optionB: opt2,

                    optionC: opt3,

                    optionD: opt4,

                    correctOption:
                        correctOpt,

                    difficulty:
                        diffLevel,

                    defaultMarks:
                        1,

                    subjectId:Number(subID),

                    createdById:
                        11,

                },

            });

        return NextResponse.json(

            {
                success: true,
                question:
                    newQuestion,
            },

            {
                status: 201,
            }

        );

    } catch (e) {

        console.log(e);

        return NextResponse.json(

            {
                error:
                    "Failed To Add Question"
            },

            {
                status: 500
            }

        );

    }

}

export async function GET(req:Request){
    try{
        const getAllQuestion= await db.question.findMany();
        return NextResponse.json(getAllQuestion);
    }
    catch(error:any){
        return NextResponse.json(
            {error:error.message || "Something went wrong"},
            {status: 500}
        )

    }
}

export async function DELETE(req:Request){
try{
const {id}=await req.json();
if(!id){
    return NextResponse.json(
        {success:false,
            error:"id not found"
            
        },
        {status:500}
    );
}
await db.question.delete({
    where:{
        id:id,
    }
})

}catch(error){
console.log(error);
}
}