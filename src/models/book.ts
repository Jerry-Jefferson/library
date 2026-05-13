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
  createdAt: Date;
  updatedAt: Date;
  image: {
    data: Buffer;
    contentType: string;
  } | null;
  quote: string;
}

export interface IBookSerialized extends Omit<
  IBook,
  "_id" | "authorId" | "image" | "createdAt" | "updatedAt" | "genres"
> {
  _id: string;
  authorId: string;
  authorName: string;
  genres: string[];
  image: string | null;
  createdAt: string;
  updatedAt: string;
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
    image: { data: Buffer, contentType: String },
    quote: { type: String, required: [true, "Quote is required"] },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);
