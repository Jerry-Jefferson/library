"use cache";
import { connectMongo } from "@/lib/mongoose";
import { Author, IAuthor, IAuthorSerialized } from "@/src/models/author";
import { cacheLife } from "next/cache";

export async function getAuthors(): Promise<IAuthorSerialized[]> {
  cacheLife("hours");
  try {
    await connectMongo();
    const authors = await Author.find().lean<IAuthor[]>();
    return authors.map((author) => ({
      ...author,
      _id: author._id.toString(),
      createdAt: author.createdAt.toISOString(),
      updatedAt: author.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}
