"use server";

import { connectMongo } from "@/lib/mongoose";
import { bookCreationSchema } from "@/src/app/(mainInterface)/(dashboard)/admin/book/components/bookCreation/bookCreation.schema";
import { Book } from "@/src/models/book";
import { updateTag } from "next/cache";

export async function createBook(data: unknown) {
  try {
    await connectMongo();
    const validatedData = bookCreationSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid book data",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    await Book.create(validatedData.data);

    updateTag("books");

    return { success: true, message: "The book has been successfully added" };
  } catch (error) {
    console.error("DB error while adding a book", error);
    return { success: false, message: "Failed to add a book" };
  }
}

export async function updateBook(id: string, data: unknown) {
  try {
    await connectMongo();
    const validatedData = bookCreationSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid book data",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const book = await Book.findById(id);

    if (!book) return { success: false, message: "The book wasn't found" };

    book.set(validatedData.data);
    await book.save();

    updateTag("books");
    updateTag(`book-${id}`);

    return { success: true, message: "The book has been successfully edited" };
  } catch (error) {
    console.error("DB error while editing book", error);
    return { success: false, message: "Failed to edit a book" };
  }
}

export async function deleteBook(id: string) {
  try {
    await connectMongo();
    const result = await Book.findByIdAndDelete(id);

    if (!result) return { success: false, message: "The book was not found" };

    updateTag("books");
    updateTag(`book-${id}`);

    return { success: true, message: "The book has been successfully deleted" };
  } catch (error) {
    console.error("DB error in deleteBook", error);
    return { success: false, message: "Failed to delete the book" };
  }
}
