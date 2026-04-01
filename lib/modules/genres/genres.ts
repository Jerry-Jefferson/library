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
  const genres = await Genre.find().lean<IGenre[]>();

  return genres ? genres.map(serializeGenre) : null;
}
