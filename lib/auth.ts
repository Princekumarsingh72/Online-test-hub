import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET=process.env.JWT_SECRET!;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(password, hashedPassword);
}

export function createToken(payload:any) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export const verifyToken=(token:string)=>{
  jwt.verify(token,JWT_SECRET);
}


export const verifyAdmin =async () => {
  const cookieStore = await cookies();   // ✅ server-only

  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized");

  const decoded: any = jwt.verify(token, JWT_SECRET);

  if (decoded.role !== "ADMIN") {
    throw new Error("Access denied");
  }

  return decoded;
};
    
