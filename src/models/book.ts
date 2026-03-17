import mongoose, { Schema } from "mongoose";
import { IAuthor } from "./author";

export interface IBook {
  _id: string;
  title: string;
  description: string;
  authorId: mongoose.Types.ObjectId | IAuthor;
  year: number;
  genres: string[];
  rating: number;
  createdAt: Date;
  imageUrl: string;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: [true, "Book name is required"] },
    description: { type: String, required: [true, "Book description is required"] },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    year: { type: Number },
    genres: [{ type: String }],
    rating: { type: Number },
    createdAt: { type: Date },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);
