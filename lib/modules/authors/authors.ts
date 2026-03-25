"use cache";

import { connectMongo } from "@/lib/mongoose";
import { Author, IAuthor, IAuthorSerialized } from "@/src/models/author";
import { Book, IBook } from "@/src/models/book";
import { cacheLife } from "next/cache";

function serializeAuthor(author: IAuthor, books: IBook[]): IAuthorSerialized {
  const authorBooks = books
    .filter((book) => book.authorId.toString() === author._id.toString())
    .map((book) => book._id.toString());

  return {
    ...author,
    _id: author._id.toString(),
    createdAt: author.createdAt.toISOString(),
    updatedAt: author.updatedAt.toISOString(),
    books: authorBooks,
  };
}

export async function getAuthors(): Promise<IAuthorSerialized[] | null> {
  cacheLife("hours");

  await connectMongo();

  const authors = await Author.find().lean<IAuthor[]>();
  if (!authors.length) return null;

  const books: IBook[] = await Book.find().select("_id authorId").lean();

  return authors.map((author) => serializeAuthor(author, books));
}

export async function getAuthorById(id: string): Promise<IAuthorSerialized | null> {
  cacheLife("days");

  await connectMongo();

  const author = await Author.findById(id).lean<IAuthor>();
  if (!author) return null;

  const books: IBook[] = await Book.find({ authorId: id }).select("_id authorId").lean();

  return serializeAuthor(author, books);
}
