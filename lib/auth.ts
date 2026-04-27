import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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