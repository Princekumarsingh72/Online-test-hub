// src/app/api/subjects/route.ts

import { db } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  // verifyAdmin(req);

  const { name } = await req.json();

  const subject = await db.subject.create({
    data:{name} 
  });

  return Response.json(subject);
}