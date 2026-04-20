"use server";

import { connectMongo } from "@/lib/mongoose";
import { Author } from "@/src/models/author";
import { Book } from "@/src/models/book";
import { DEFAULT_AVATAR } from "@/src/shared/constants/defaultAvatar";
import { updateTag } from "next/cache";
import { z } from "zod";
import { authorCreationSchema } from "./author.schema";

export async function createAuthor(data: unknown) {
  try {
    await connectMongo();
    const validatedData = authorCreationSchema.safeParse(data);
    if (!validatedData.success) {
      const flattened = z.flattenError(validatedData.error);
      return {
        success: false,
        message: "Invalid author data",
        errors: flattened.fieldErrors,
      };
    }

    const dataToSave = {
      ...validatedData.data,
      imageUrl: validatedData.data.imageUrl || DEFAULT_AVATAR,
    };

    await Author.create(dataToSave);

    updateTag("authors");

    return { success: true, message: "The author has been successfully created" };
  } catch (error) {
    console.error("DB error while creating an author", error);
    return { success: false, message: "Failed to create an author" };
  }
}

export async function updateAuthor(id: string, data: unknown) {
  try {
    await connectMongo();
    const validatedData = authorCreationSchema.safeParse(data);
    if (!validatedData.success) {
      const flattened = z.flattenError(validatedData.error);
      return {
        success: false,
        message: "Invalid author data",
        errors: flattened.fieldErrors,
      };
    }

    const author = await Author.findById(id);

    if (!author) return { success: false, message: "The author wasn't found" };

    author.set(validatedData.data);
    await author.save();

    updateTag("authors");
    updateTag(`author-${id}`);

    return { success: true, message: "The author has been successfully edited" };
  } catch (error) {
    console.error("DB error while editing an author", error);
    return { success: false, message: "Failed to edit an author" };
  }
}

export async function deleteAuthor(authorId: string) {
  try {
    await connectMongo();

    const hasBooks = await Book.exists({ authorId });
    if (hasBooks) return { success: false, message: "The author has books and cannot be deleted" };

    const result = await Author.findByIdAndDelete(authorId);

    if (!result) return { success: false, message: "The author was not found" };

    updateTag("authors");
    updateTag(`author-${authorId}`);

    return { success: true, message: "The author has been successfully deleted" };
  } catch (error) {
    console.error("DB error in deleteAuthor", error);
    return { success: false, message: "Failed to delete the author" };
  }
}
