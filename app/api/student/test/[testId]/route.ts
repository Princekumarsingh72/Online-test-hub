import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const { testId } = await params;

    const test = await db.test.findUnique({
      where: {
        id: Number(testId),
      },
      include: {
        subject: true,
        testquestion: {
          include: {
            question: true,
          },
        },
      },
    });

    return NextResponse.json(test);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: String(error),
      },
      { status: 500 }
    );
  }
}