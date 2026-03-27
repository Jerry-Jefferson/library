import mongoose, { Schema, Types } from "mongoose";

export interface IAuthor {
  _id: Types.ObjectId;
  name: string;
  bio: string;
  birthDate?: Date;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthorSerialized extends Omit<IAuthor, "_id" | "createdAt" | "updatedAt"> {
  _id: string;
  createdAt: string;
  updatedAt: string;
  books: string[];
}

export const AuthorSchema = new Schema<IAuthor>(
  {
    name: {
      type: String,
      required: [true, "Author's name is required"],
      trim: true,
      minlength: 1,
    },
    bio: {
      type: String,
      required: [true, "Author's biography is required"],
      trim: true,
    },
    birthDate: {
      type: Date,
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
