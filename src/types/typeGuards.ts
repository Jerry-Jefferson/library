import mongoose from "mongoose";
import { IAuthor } from "../models/author";

export function isAuthor(value: mongoose.Types.ObjectId | IAuthor): value is IAuthor {
  return typeof value === "object" && "name" in value;
}
