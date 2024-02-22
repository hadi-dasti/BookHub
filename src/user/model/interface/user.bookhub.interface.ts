import { Document} from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  nationalCode: string;
  gender: "MALE" | "FEMALE";
  comparePassword: (password: string) => Promise<boolean>;
  refreshToken?: string;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}