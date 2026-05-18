"use server";

import { connectMongo } from "@/lib/mongoose";
import { Genre } from "@/src/models/genre";
import { updateTag } from "next/cache";
import { z } from "zod";
import { genresCreationSchema } from "./genreCreation.schema";

export async function addGenre(data: unknown) {
  try {
    await connectMongo();
    const validatedData = genresCreationSchema.safeParse(data);
    if (!validatedData.success) {
      const flattened = z.flattenError(validatedData.error);
      return {
        success: false,
        message: "invalidGenreData",
        errors: flattened.fieldErrors,
      };
    }

    const normalizedTitle = validatedData.data.title.trim().toLowerCase();
    const existingGenre = await Genre.findOne({ title: normalizedTitle });

    if (existingGenre) {
      return { success: false, message: "genreExists" };
    }

    const dataToSave = {
      ...validatedData.data,
      title: normalizedTitle,
    };

    await Genre.create(dataToSave);

    updateTag("genres");

    return { success: true, message: "genreCreated" };
  } catch (error) {
    console.error("DB error while adding a genre", error);
    return { success: false, message: "failedToCreateGenre" };
  }
}

export async function updateGenre(id: string, data: unknown) {
  try {
    await connectMongo();
    const validatedData = genresCreationSchema.safeParse(data);
    if (!validatedData.success) {
      const flattened = z.flattenError(validatedData.error);
      return {
        success: false,
        message: "invalidGenreData",
        errors: flattened.fieldErrors,
      };
    }

    const normalizedTitle = validatedData.data.title.trim().toLowerCase();
    const existingGenre = await Genre.findOne({ title: normalizedTitle, _id: { $ne: id } });

    if (existingGenre) {
      return { success: false, message: "genreExists" };
    }

    const dataToSave = {
      ...validatedData.data,
      title: normalizedTitle,
    };

    const genre = await Genre.findById(id);

    if (!genre) return { success: false, message: "genreNotFound" };

    genre.set(dataToSave);
    await genre.save();

    updateTag("genres");

    return { success: true, message: "genreUpdated" };
  } catch (error) {
    console.error("DB error while editing genre", error);
    return { success: false, message: "failedToUpdateGenre" };
  }
}

export async function deleteGenre(id: string) {
  try {
    await connectMongo();
    const result = await Genre.findByIdAndDelete(id);

    if (!result) return { success: false, message: "genreNotFound" };

    updateTag("genres");

    return { success: true, message: "genreDeleted" };
  } catch (error) {
    console.error("DB error in deleteGenre", error);
    return { success: false, message: "failedToDeleteGenre" };
  }
}
