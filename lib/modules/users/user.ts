"use server";

import { Types } from "mongoose";
import { auth } from "@/src/auth";
import User from "@/src/models/user";

import { revalidatePath } from "next/cache";
import { routes } from "@/src/shared/constants/routes";

export async function toggleFavorite(bookId: string) {
  const session = await auth();
  const userId = session?.user.id;

  const user = await User.findById(userId);

  const isFavorite = user.favorites.some((fav: Types.ObjectId) => fav.toString() === bookId);

  if (isFavorite) {
    user.favorites.pull(bookId);
  } else {
    user.favorites.push(bookId);
  }

  await user.save();

  revalidatePath(routes.favourites);

  return !isFavorite;
}
