"use server";

import { connectMongo } from "@/lib/mongoose";
import { Book } from "@/src/models/book";
import { DEFAULT_AVATAR } from "@/src/shared/constants/defaultAvatar";
import { updateTag } from "next/cache";
import { z } from "zod";
import { bookCreationSchema } from "./book.schema";

export async function createBook(data: unknown) {
  try {
    await connectMongo();
    const validatedData = bookCreationSchema.safeParse(data);
    if (!validatedData.success) {
      const flattened = z.flattenError(validatedData.error);
      return {
        success: false,
        message: "Invalid book data",
        errors: flattened.fieldErrors,
      };
    }

    const dataToSave = {
      ...validatedData.data,
      imageUrl: validatedData.data.imageUrl || DEFAULT_AVATAR,
    };

    await Book.create(dataToSave);

    updateTag("books");
    updateTag("authors");

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
      const flattened = z.flattenError(validatedData.error);
      return {
        success: false,
        message: "Invalid book data",
        errors: flattened.fieldErrors,
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
    updateTag("authors");

    return { success: true, message: "The book has been successfully deleted" };
  } catch (error) {
    console.error("DB error in deleteBook", error);
    return { success: false, message: "Failed to delete the book" };
  }
}
