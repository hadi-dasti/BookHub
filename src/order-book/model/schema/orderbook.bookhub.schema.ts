import { model, Schema } from "mongoose";
import { IOrderBook } from "../interface/orderbook.bookhub.interface";


const orderBookSchema: Schema = new Schema<IOrderBook>(
  {
    userId: { type: String, required: [true, "Please provide a userId"] },
    bookId: { type: String, required: [true, "Please provide a bookId"] },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const OrderBook = model<IOrderBook>("OrderBook", orderBookSchema);