import mongoose, { Types, Document } from "mongoose";



export interface IOrderBook extends Document {
  userId: string;
  bookId:string;
  quantity: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
}
