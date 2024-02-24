import { model, Schema } from "mongoose";
import { IOrderBook } from "../interface/orderbook.bookhub.interface";


const orderBookSchema = new Schema<IOrderBook>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: {type: String,enum: ["pending", "confirmed", "shipped", "delivered"],default: "pending"}
},
{ timestamps: true }
);

export const OrderBook = model<IOrderBook>("OrderBook", orderBookSchema);