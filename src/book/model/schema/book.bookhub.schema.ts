import { Schema, model } from "mongoose";
import { IBook } from '../interface/book.bookhub.interface';


const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);





export const book = model<IBook>("Book", bookSchema);