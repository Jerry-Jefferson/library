import mongoose, { Schema, Types } from "mongoose";
import { IAuthorSerialized } from "./author";
import { IGenreSerialized } from "./genre";

export interface IBook {
  _id: Types.ObjectId;
  title: string;
  description: string;
  authorId: Types.ObjectId | IAuthorSerialized;
  year: number;
  genres: Types.ObjectId[] | IGenreSerialized[];
  rating: number;
  createdAt?: Date;
  imageUrl: string;
}

export interface IBookSerialized extends Omit<IBook, "_id" | "authorId" | "createdAt" | "genres"> {
  _id: string;
  authorId: string;
  authorName: string;
  genres: string[];
  createdAt?: string;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: [true, "Book name is required"] },
    description: { type: String, required: [true, "Book description is required"] },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    year: { type: Number },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    rating: { type: Number, default: 0 },
    createdAt: { type: Date },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);
