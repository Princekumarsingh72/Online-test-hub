import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const tests = await db.test.findMany({
  include: {
    subject: true,
    testQuestions: true,
  },
});

const data = tests.map((test) => ({
  id: test.id,
  title: test.title,
  subject: test.subject.name,
  totalQuestions: test.testQuestions.length,
}));

    return NextResponse.json(data);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {message:"Internal Server Error"},
      {status:500}
    );

  }
}