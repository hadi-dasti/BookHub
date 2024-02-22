import * as bcrypt from "bcryptjs";



//hash password 
  export  async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
    };

    // compare pasword 
  export async function comparePassword(plainPassword: string,hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  };



