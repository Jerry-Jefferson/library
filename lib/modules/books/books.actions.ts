"use server";

import { connectMongo } from "@/lib/mongoose";
import { Book } from "@/src/models/book";
import { Review } from "@/src/models/review";
import { updateTag } from "next/cache";
import { z } from "zod";
import { bookCreationSchema } from "./book.schema";

export async function createBook(data: FormData) {
  try {
    await connectMongo();

    const rawData = {
      title: data.get("title"),
      description: data.get("description"),
      authorId: data.get("authorId"),
      year: data.get("year") ? Number(data.get("year")) : null,
      genres: data.getAll("genres"),
      image: data.get("image"),
    };

    const validatedData = bookCreationSchema.safeParse(rawData);
    if (!validatedData.success) {
      const flattened = z.flattenError(validatedData.error);
      return {
        success: false,
        message: "Invalid book data",
        errors: flattened.fieldErrors,
      };
    }

    let imageData = null;
    const file = validatedData.data.image;

    if (file instanceof File && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      imageData = {
        data: buffer,
        contentType: file.type,
      };
    }

    const dataToSave = {
      ...validatedData.data,
      image: imageData,
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

export async function updateBook(id: string, data: FormData) {
  try {
    await connectMongo();

    const rawData = {
      title: data.get("title"),
      description: data.get("description"),
      authorId: data.get("authorId"),
      year: data.get("year") ? Number(data.get("year")) : null,
      genres: data.getAll("genres"),
      image: data.get("image"),
    };
    const validatedData = bookCreationSchema.safeParse(rawData);
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

    const { image, ...otherData } = validatedData.data;
    book.set(otherData);

    const file = image;
    if (file instanceof File && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      book.image = {
        data: buffer,
        contentType: file.type,
      };
    }

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

    await Review.deleteMany({ bookId: id });

    const result = await Book.findByIdAndDelete(id);

    if (!result) return { success: false, message: "The book was not found" };

    updateTag("books");
    updateTag(`book-${id}`);
    updateTag(`reviews-book-${id}`);
    updateTag("all-user-reviews");
    updateTag("authors");

    return { success: true, message: "The book has been successfully deleted" };
  } catch (error) {
    console.error("DB error in deleteBook", error);
    return { success: false, message: "Failed to delete the book" };
  }
}
