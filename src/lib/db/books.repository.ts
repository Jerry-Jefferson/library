import { connectMongo } from "@/lib/mongoose";
import "@/src/models/author";
import { Book, IBook } from "@/src/models/book";
import { cacheLife } from "next/cache";

export interface GetBooksOptions {
  category?: "new" | "popular" | "all";
  limit?: number;
}

export async function getBooks({ category = "all", limit }: GetBooksOptions = {}): Promise<
  IBook[]
> {
  "use cache";
  if (category === "all") {
    cacheLife("hours");
  } else {
    cacheLife("days");
  }
  try {
    await connectMongo();

    let query = Book.find().populate("authorId", "name");

    if (category === "new") {
      query = query.sort({ createdAt: -1 });
    } else if (category === "popular") {
      query = query.sort({ rating: -1 });
    }

    if (limit) {
      query = query.limit(limit);
    }

    const books = await query.lean();

    return JSON.parse(JSON.stringify(books));
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
}
