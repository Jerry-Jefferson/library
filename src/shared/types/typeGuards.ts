import { IAuthor } from "@/src/models/author";
import mongoose from "mongoose";

export function isAuthor(value: mongoose.Types.ObjectId | IAuthor): value is IAuthor {
  return typeof value === "object" && "name" in value;
}
