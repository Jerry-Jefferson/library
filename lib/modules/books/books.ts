import { connectMongo } from "@/lib/mongoose";
import "@/src/models/author";
import { Book, IBook } from "@/src/models/book";
import { cacheLife } from "next/cache";

export async function getAllBooks(): Promise<IBook[]> {
  "use cache";
  cacheLife("hours");
  await connectMongo();
  const books = await Book.find().populate("authorId", "name").lean();
  return JSON.parse(JSON.stringify(books));
}

export async function getPopularBooks(limit: number): Promise<IBook[]> {
  "use cache";
  cacheLife("days");
  await connectMongo();
  const popular = await Book.find()
    .populate("authorId", "name")
    .sort({ rating: -1 })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(popular));
}

export async function getNewBooks(limit: number): Promise<IBook[]> {
  "use cache";
  cacheLife("days");
  await connectMongo();
  const newBooks = await Book.find()
    .populate("authorId", "name")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(newBooks));
}
