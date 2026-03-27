import mongoose, { Schema } from "mongoose";
import { IAuthorSerialized } from "./author";

export interface IBook {
  _id: string;
  title: string;
  description: string;
  authorId: mongoose.Types.ObjectId | IAuthorSerialized;
  year: number;
  genres: string[];
  rating: number;
  createdAt?: Date;
  imageUrl: string;
}

export interface IBookSerialized extends Omit<IBook, "_id" | "authorId" | "createdAt"> {
  _id: string;
  authorId: string;
  authorName: string;
  createdAt?: string;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: [true, "Book name is required"] },
    description: { type: String, required: [true, "Book description is required"] },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    year: { type: Number },
    genres: [String],
    rating: { type: Number, default: 0 },
    createdAt: { type: Date },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);
