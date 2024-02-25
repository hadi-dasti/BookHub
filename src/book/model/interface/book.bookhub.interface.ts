import { Document, Types } from "mongoose";
import { IOrderBook } from "../../../order-book/model/interface/orderbook.bookhub.interface";


export interface IBook extends Document {
  title: string;
  author: string;
  genre: "Fiction" | "Non-Fiction" | "Sci-Fi" | "Mystery" | "Romance";
  description: string;
  countBook: number;
  orders: Types.ObjectId | IOrderBook;
}
