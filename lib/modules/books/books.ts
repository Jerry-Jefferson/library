"use cache";
import { connectMongo } from "@/lib/mongoose";
import "@/src/models/author";
import { Book, IBook, IBookSerialized } from "@/src/models/book";
import "@/src/models/genre";
import { isAuthor, isGenre } from "@/src/shared/types/typeGuards";
import { cacheLife, cacheTag } from "next/cache";

function serializeBook(book: IBook): IBookSerialized {
  const author = book.authorId;
  const genres = book.genres || [];

  const authorName = isAuthor(author) ? author.name : "Unknown author";
  const authorIdStr = isAuthor(author) ? author._id.toString() : String(author);

  const genresIds = genres.map((genre) => {
    return isGenre(genre) ? genre._id.toString() : String(genre);
  });

  return {
    ...book,
    _id: book._id.toString(),
    authorName: authorName,
    authorId: authorIdStr,
    genres: genresIds,
    createdAt: book.createdAt?.toISOString(),
  };
}

export async function getAllBooks(): Promise<IBookSerialized[] | null> {
  cacheLife("hours");
  cacheTag("books");

  await connectMongo();
  const books = await Book.find().populate("authorId", "name").lean<IBook[]>();

  return books.map(serializeBook);
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

  return popular.map(serializeBook);
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

  return newBooks.map(serializeBook);
}

export async function getBooksByAuthorId(ids: string[]): Promise<IBookSerialized[]> {
  cacheLife("hours");

  await connectMongo();

  const books = await Book.find({ _id: { $in: ids } })
    .populate("authorId", "name")
    .lean<IBook[]>();

  return books.map(serializeBook);
}

export async function getFilteredBooks({
  genres,
  page,
  itemsPerPage,
}: {
  genres: string[];
  page: number;
  itemsPerPage: number;
}): Promise<{ items: IBookSerialized[]; totalPages: number }> {
  cacheLife("hours");
  cacheTag("books");

  await connectMongo();

  const query: Partial<{ genres: { $in: string[] } }> = {};

  if (genres.length) {
    query.genres = { $in: genres };
  }

  const skip = (page - 1) * itemsPerPage;

  const [books, totalPages] = await Promise.all([
    Book.find(query).populate("authorId", "name").skip(skip).limit(itemsPerPage).lean<IBook[]>(),

    Book.countDocuments(query),
  ]);
  return {
    items: books.map(serializeBook),
    totalPages,
  };
}
