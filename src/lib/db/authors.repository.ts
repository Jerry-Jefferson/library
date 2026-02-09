import { connectMongo } from "@/lib/mongoose";
import { Author, IAuthor } from "@/src/models/author";

export async function getAuthors(): Promise<IAuthor[]> {
  try {
    await connectMongo();
    const authors = await Author.find().lean();
    return authors;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
