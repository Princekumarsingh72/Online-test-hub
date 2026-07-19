import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { testId, userId, answers } = await req.json();

    // Validation
    if (!testId || !userId || !answers) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get test with questions
    const test = await db.test.findUnique({
      where: {
        id: Number(testId),
      },
      include: {
        testquestion: {
          include: {
            question: true,
          },
        },
      },
    });

    if (!test) {
      return NextResponse.json(
        { message: "Test not found" },
        { status: 404 }
      );
    }

    // Create Attempt
    const attempt = await db.testattempt.create({
      data: {
        testId: Number(testId),
        userId: Number(userId),
        startTime: new Date(),
        endTime: new Date(),
        status: "COMPLETED",
      },
    });

    let correctAnswers = 0;
    let wrongAnswers = 0;
    let score = 0;

    // Save every answer
    for (const item of test.testquestion) {
      const question = item.question;

      // Student selected option
      const selectedOption = answers[question.id];

      const isCorrect =
        selectedOption === question.correctOption;

      if (isCorrect) {
        correctAnswers++;
        score += item.marks;
      } else {
        wrongAnswers++;
      }

      await db.studentanswer.create({
        data: {
          attemptId: attempt.id,
          questionId: question.id,
          selectedOption,
          isCorrect,
        },
      });
    }

    const totalQuestions = test.testquestion.length;

    const percentage =
      totalQuestions === 0
        ? 0
        : (correctAnswers / totalQuestions) * 100;

    // Save Result
    await db.result.create({
      data: {
        attemptId: attempt.id,
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        score,
        percentage,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Test submitted successfully",
      attemptId: attempt.id,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}