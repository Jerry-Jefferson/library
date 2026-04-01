"use server";

import { connectMongo } from "@/lib/mongoose";
import { Genre } from "@/src/models/genre";
import { updateTag } from "next/cache";
import { genreCreationSchema } from "./genreCreation.schema";

export async function addGenre(data: unknown) {
  try {
    await connectMongo();
    const validatedData = genreCreationSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid genre data",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    await Genre.create(validatedData.data);

    updateTag("genres");

    return { success: true, message: "The genre has been successfully added" };
  } catch (error) {
    console.error("DB error while adding a genre", error);
    return { success: false, message: "Failed to add a genre" };
  }
}

export async function deleteGenre(id: string) {
  try {
    await connectMongo();
    const result = await Genre.findByIdAndDelete(id);

    if (!result) return { success: false, message: "The genre was not found" };

    updateTag("genres");

    return { success: true, message: "The genre has been successfully deleted" };
  } catch (error) {
    console.error("DB error in deleteGenre", error);
    return { success: false, message: "DB error in deleteGenre" };
  }
}
