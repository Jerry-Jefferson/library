import { IAuthorSerialized } from "@/src/models/author";
import { IBookSerialized } from "@/src/models/book";
import { IGenreSerialized } from "@/src/models/genre";
import { IUserSerialized } from "@/src/models/user";
import mongoose from "mongoose";

export function isAuthor(
  value: mongoose.Types.ObjectId | IAuthorSerialized
): value is IAuthorSerialized {
  return value && typeof value === "object" && "name" in value;
}

export function isGenre(
  value: mongoose.Types.ObjectId | IGenreSerialized
): value is IGenreSerialized {
  return value && typeof value === "object" && value !== null && "title" in value;
}

export function isUser(user: mongoose.Types.ObjectId | IUserSerialized): user is IUserSerialized {
  return user && typeof user === "object" && "name" in user;
}

export function isBook(book: mongoose.Types.ObjectId | IBookSerialized): book is IBookSerialized {
  return book && typeof book === "object" && "title" in book;
}

export interface MongoDriverError extends Error {
  code: number;
}

export function isMongoError(error: unknown): error is MongoDriverError {
  return (
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    typeof (error as Record<string, unknown>).code === "number"
  );
}
