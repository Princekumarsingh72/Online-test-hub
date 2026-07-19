import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const { testId } = await params;

    console.log(testId);

    const test = await db.test.findUnique({
      where: {
        id: Number(testId),
      },
      include: {
        subject: true,
      },
    });

    return NextResponse.json(test);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
