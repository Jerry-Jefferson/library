import mongoose, { Schema, Types } from "mongoose";

export interface IAuthor {
  _id: Types.ObjectId;
  name: string;
  bio: string;
  birthYear: number;
  deathYear?: number;
  image: {
    data: Buffer;
    contentType: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthorSerialized extends Omit<
  IAuthor,
  "_id" | "image" | "createdAt" | "updatedAt"
> {
  _id: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
  books: string[];
  genres: string[];
  isAlive: boolean;
}

export const AuthorSchema = new Schema<IAuthor>(
  {
    name: {
      type: String,
      required: [true, "Author's name is required"],
      trim: true,
      minlength: 1,
      index: true,
    },
    bio: {
      type: String,
      required: [true, "Author's biography is required"],
      trim: true,
    },
    birthYear: {
      type: Number,
      min: [1, "Birth year is too far in the past"],
      max: [new Date().getFullYear(), "Birth year cannot be in the future"],
    },
    deathYear: {
      type: Number,
      min: [1, "Death year is too far in the past"],
      max: [new Date().getFullYear(), "Death year cannot be in the future"],
    },
    image: { data: Buffer, contentType: String },
  },
  {
    timestamps: true,
  }
);

export const Author = mongoose.models.Author || mongoose.model<IAuthor>("Author", AuthorSchema);
