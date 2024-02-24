import * as bcrypt from "bcryptjs";

//hash password
export async function hashPasswordAdmin(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
