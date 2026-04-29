"use server";

import { connectMongo } from "@/lib/mongoose";
import { Author } from "@/src/models/author";
import { Book } from "@/src/models/book";
import { updateTag } from "next/cache";
import { z } from "zod";
import { authorCreationSchema, authorUpdateSchema } from "./author.schema";

export async function createAuthor(data: FormData) {
  try {
    await connectMongo();

    const rawData = {
      name: data.get("name"),
      bio: data.get("bio"),
      birthYear: data.get("birthYear") ? Number(data.get("birthYear")) : null,
      deathYear: data.get("deathYear") ? Number(data.get("deathYear")) : null,
      isAlive: data.get("isAlive") === "true",
      image: data.get("image"),
    };

    const validatedData = authorCreationSchema.safeParse(rawData);

    console.log(validatedData);
    if (!validatedData.success) {
      const flattened = z.flattenError(validatedData.error);
      return {
        success: false,
        message: "Invalid author data",
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
      name: validatedData.data.name,
      bio: validatedData.data.bio,
      birthYear: validatedData.data.birthYear,
      deathYear: validatedData.data.deathYear,
      image: imageData,
    };

    await Author.create(dataToSave);

    updateTag("authors");

    return { success: true, message: "The author has been successfully created" };
  } catch (error) {
    console.error("DB error while creating an author", error);
    return { success: false, message: "Failed to create an author" };
  }
}

export async function updateAuthor(id: string, data: FormData) {
  try {
    await connectMongo();

    const rawData = {
      name: data.get("name"),
      bio: data.get("bio"),
      birthYear: data.get("birthYear") ? Number(data.get("birthYear")) : null,
      deathYear: data.get("deathYear") ? Number(data.get("deathYear")) : null,
      image: data.get("image"),
    };

    const validatedData = authorUpdateSchema.safeParse(rawData);
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

    const { image, ...otherData } = validatedData.data;
    author.set(otherData);

    const file = image;
    if (file instanceof File && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      author.image = {
        data: buffer,
        contentType: file.type,
      };
    }

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
