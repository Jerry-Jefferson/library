import mongoose, { Schema, Types } from "mongoose";

export interface IAuthor {
  _id: Types.ObjectId;
  name: string;
  bio: string;
  birthYear: number;
  isAlive: boolean;
  deathYear?: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthorSerialized extends Omit<IAuthor, "_id" | "createdAt" | "updatedAt"> {
  _id: string;
  createdAt: string;
  updatedAt: string;
  books: string[];
  genres: string[];
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
    isAlive: { type: Boolean },
    deathYear: {
      type: Number,
      min: [1, "Death year is too far in the past"],
      max: [new Date().getFullYear(), "Death year cannot be in the future"],
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Author = mongoose.models.Author || mongoose.model<IAuthor>("Author", AuthorSchema);
