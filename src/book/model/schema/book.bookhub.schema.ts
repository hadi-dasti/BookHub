import { Schema, model } from "mongoose";
import { IBook } from "../interface/book.bookhub.interface";

// Define the Book Schema
const bookSchema = new Schema<IBook>(
  {
    title: { type: String, index: true, required: true },
    author: { type: String, index: true, required: true },
    genre: {
      type: String,
      enum: ["Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Romance"],
      required: true,
    },
    description: { type: String, required: true },
    countBook: { type: Number, default: 1, min: 0 },
    orders: { type: Schema.Types.ObjectId, ref: "OrderBook" },
  },
  { timestamps: true }
);

// Compound Index to optimize searches
bookSchema.index({ title: 1, author: 1 });

bookSchema.methods.decrementCount = async function () {
  if (this.countBook > 0) {
    this.countBook--
    await this.save();
  }
}



export const Book = model<IBook>("Book", bookSchema);