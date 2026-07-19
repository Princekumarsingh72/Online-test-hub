import { NextResponse } from "next/server";
import { db } from "@/lib/db";
// import { Difficulty } from "@prisma/client";

export async function POST(req: Request) {
    try {

        const formData = await req.formData();

        const subjectId = Number(formData.get("subjectId"));
        // const difficulty = formData.get("difficulty") as Difficulty;
        const file = formData.get("file") as File;

        const text = await file.text();
        const questions = JSON.parse(text);

        for (const q of questions) {
            await db.question.create({
                data: {
                    question: q.question,
                    optionA: q.optionA,
                    optionB: q.optionB,
                    optionC: q.optionC,
                    optionD: q.optionD,
                    correctOption: q.correctAnswer,
                    difficulty: q.difficulty.toUpperCase(),
                    subjectId,
                    topic: q.topic,
                    defaultMarks: 1,
                    createdById: 11
                }
            });
        }

        return NextResponse.json({
            success: true,
            message: "Questions Imported Successfully"
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Import Failed"
            },
            {
                status: 500
            }
        );
    }
}