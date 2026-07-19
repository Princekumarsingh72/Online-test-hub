import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { testId, questionIds, marks } = await req.json();

    if (!testId || !questionIds || questionIds.length === 0) {
      return NextResponse.json(
        { message: "Test Id and Questions are required" },
        { status: 400 }
      );
    }

    const data = questionIds.map((questionId: number) => ({
      testId: Number(testId),
      questionId: Number(questionId),
      marks: Number(marks ?? 1), // default marks = 1
    }));

    await db.testQuestion.createMany({
      data,
      skipDuplicates: true,
    });

    return NextResponse.json({
      message: "Questions Assigned Successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}