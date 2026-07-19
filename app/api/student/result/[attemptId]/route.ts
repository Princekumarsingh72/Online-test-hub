import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ attemptId: string }> }
) {
  try {
    // Await params before using it
    const { attemptId } = await params;

    const result = await db.result.findUnique({
      where: {
        attemptId: Number(attemptId),
      },
      include: {
        testattempt: {
          include: {
            test: true,
            studentanswer: {
              include: {
                question: true,
              },
            },
          },
        },
      },
    });

    if (!result) {
      return NextResponse.json(
        { message: "Result not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Result API Error:", error);

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}