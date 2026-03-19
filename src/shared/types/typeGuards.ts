import { IAuthorSerialized } from "@/src/models/author";
import mongoose from "mongoose";

export function isAuthor(
  value: mongoose.Types.ObjectId | IAuthorSerialized
): value is IAuthorSerialized {
  return value && typeof value === "object" && "name" in value;
}
