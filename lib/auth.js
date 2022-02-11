import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
