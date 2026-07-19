import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ subjectId: string }> }
) {
  try {
    const { subjectId } = await params;

    const questions = await db.question.findMany({
      where: {
        subjectId: Number(subjectId),
      },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}