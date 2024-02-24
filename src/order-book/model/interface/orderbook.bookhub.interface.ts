import { Document } from "mongoose";
import { IBook } from "../../../book/model/interface/book.bookhub.interface";
import { IUser } from "../../../user/model/interface/user.bookhub.interface";


export interface IOrderBook extends Document {
  user: IUser["_id"];
  book: IBook["_id"];
  quantity: number;
  totalPrice: number;
  status: "pending"|"confirmed"|"shipped"|"delivered";
}