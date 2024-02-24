import { Document } from "mongoose";


export interface IAdmin extends Document {
  username: string;
  password: string;
  email: string;
  last_login: Date;
  rule: "admin" | "management";
  generateAccessTokenAdmin: () => string;
  serialize: () => any;
}