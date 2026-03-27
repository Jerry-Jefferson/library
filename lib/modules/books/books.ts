"use cache";
import { connectMongo } from "@/lib/mongoose";
import "@/src/models/author";
import { Book, IBook, IBookSerialized } from "@/src/models/book";
import { isAuthor } from "@/src/shared/types/typeGuards";
import { FlattenMaps } from "mongoose";
import { cacheLife, cacheTag } from "next/cache";

function serializeBook(book: FlattenMaps<IBook>): IBookSerialized {
  const author = book.authorId;

  const authorName = isAuthor(author) ? author.name : "Unknown author";
  const authorIdStr = isAuthor(author) ? author._id.toString() : String(author);

  return {
    ...book,
    _id: book._id.toString(),
    authorName: authorName,
    authorId: authorIdStr,
    createdAt: book.createdAt?.toISOString(),
  };
}

export async function getAllBooks(): Promise<IBookSerialized[] | null> {
  cacheLife("hours");
  cacheTag("books");

  await connectMongo();
  const books = await Book.find().populate("authorId", "name").lean<IBook[]>();

  return books ? books.map(serializeBook) : null;
}

export async function getBookById(id: string): Promise<IBookSerialized | null> {
  cacheLife("days");
  cacheTag(`book-${id}`);

  await connectMongo();
  const book = await Book.findById(id).populate("authorId", "name").lean<IBook>();

  if (!book) return null;

  return serializeBook(book);
}

export async function getPopularBooks(limit: number): Promise<IBookSerialized[] | null> {
  cacheLife("days");
  cacheTag("books");

  await connectMongo();
  const popular = await Book.find()
    .populate("authorId", "name")
    .sort({ rating: -1 })
    .limit(limit)
    .lean<IBook[]>();

  return popular ? popular.map(serializeBook) : null;
}

export async function getNewBooks(limit: number): Promise<IBookSerialized[] | null> {
  cacheLife("days");
  cacheTag("books");

  await connectMongo();
  const newBooks = await Book.find()
    .populate("authorId", "name")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<IBook[]>();

  return newBooks ? newBooks.map(serializeBook) : null;
}

export async function getBooksById(ids: string[]): Promise<IBookSerialized[]> {
  cacheLife("hours");

  try {
    await connectMongo();

    const books = await Book.find({ _id: { $in: ids } })
      .populate("authorId", "name")
      .lean<IBook[]>();

    return books.map(serializeBook);
  } catch (error) {
    console.error("DB error in getBooksByIds", error);
    throw error;
  }
}
