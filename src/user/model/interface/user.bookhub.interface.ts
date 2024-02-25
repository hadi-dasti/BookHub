import { Document, Types} from 'mongoose';
import { IOrderBook } from "../../../order-book/model/interface/orderbook.bookhub.interface";


export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  nationalCode: string;
  gender: "MALE" | "FEMALE";
  isComparePassword: (password: string) => Promise<boolean>;
  refreshToken?: string;
  refreshTokenExpiresAt: Date;
  generateAccessTokenUser: () => string;
  generateRefreshTokenUser: () => string;
  orders: Types.ObjectId | IOrderBook;
}