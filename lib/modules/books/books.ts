import { connectMongo } from "@/lib/mongoose";
import "@/src/models/author";
import { Book, IBook } from "@/src/models/book";
import { cacheLife } from "next/cache";

export async function getAllBooks(): Promise<IBook[] | null> {
  "use cache";
  cacheLife("hours");
  try {
    await connectMongo();
    const books = await Book.find().populate("authorId", "name").lean();

    if (!books) return null;

    return JSON.parse(JSON.stringify(books));
  } catch (error) {
    console.error("DB error in getAllBooks", error);
    throw error;
  }
}

export async function getBookById(id: string): Promise<IBook | null> {
  "use cache";
  cacheLife("days");
  try {
    await connectMongo();
    const book = await Book.findById(id).populate("authorId", "name").lean();

    if (!book) return null;

    return JSON.parse(JSON.stringify(book));
  } catch (error) {
    console.error("DB error in getBookById", error);
    throw error;
  }
}

export async function getPopularBooks(limit: number): Promise<IBook[] | null> {
  "use cache";
  cacheLife("days");
  try {
    await connectMongo();
    const popular = await Book.find()
      .populate("authorId", "name")
      .sort({ rating: -1 })
      .limit(limit)
      .lean();

    if (!popular) return null;

    return JSON.parse(JSON.stringify(popular));
  } catch (error) {
    console.error("DB error in getPopularBooks", error);
    throw error;
  }
}

export async function getNewBooks(limit: number): Promise<IBook[] | null> {
  "use cache";
  cacheLife("days");
  try {
    await connectMongo();
    const newBooks = await Book.find()
      .populate("authorId", "name")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    if (!newBooks) return null;

    return JSON.parse(JSON.stringify(newBooks));
  } catch (error) {
    console.error("DB error in getNewBooks", error);
    throw error;
  }
}
