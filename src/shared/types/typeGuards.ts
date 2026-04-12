import { IAuthorSerialized } from "@/src/models/author";
import { IGenreSerialized } from "@/src/models/genre";
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
