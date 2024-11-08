import bcrypt from "bcrypt";

export async function HashPassword(password: string) {
  const saltRounds = 10; // Number of rounds of hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}