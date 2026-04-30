"use cache";
import { connectMongo } from "@/lib/mongoose";
import { Genre, IGenre, IGenreSerialized } from "@/src/models/genre";
import { cacheLife, cacheTag } from "next/cache";

function serializeGenre(genre: IGenre): IGenreSerialized {
  return {
    ...genre,
    _id: genre._id.toString(),
  };
}

export async function getAllGenres(): Promise<IGenreSerialized[] | null> {
  cacheLife("hours");
  cacheTag("genres");

  await connectMongo();
  const genres = await Genre.find().sort({ title: 1 }).lean<IGenre[]>();

  return genres ? genres.map(serializeGenre) : null;
}

export async function getGenresById(ids: string[]): Promise<IGenreSerialized[] | null> {
  if (!ids || ids.length === 0) return [];
  cacheLife("hours");
  cacheTag("genres");

  await connectMongo();
  const genres = await Genre.find({ _id: { $in: ids } }).lean<IGenre[]>();

  return genres ? genres.map(serializeGenre) : null;
}
