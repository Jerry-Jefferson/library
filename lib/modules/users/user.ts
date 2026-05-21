"use server";

import { auth } from "@/src/auth";
import User from "@/src/models/user";
import { Types } from "mongoose";
import { revalidatePath, revalidateTag } from "next/cache";

export async function toggleFavorite(bookId: string) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) throw new Error("Unauthorized");

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const isFavorite = user.favorites.some((fav: Types.ObjectId) => fav.toString() === bookId);

  if (isFavorite) {
    user.favorites.pull(bookId);
  } else {
    user.favorites.push(bookId);
  }

  await user.save();

  revalidatePath("/en/favourites");
  revalidatePath("/ru/favourites");

  return !isFavorite;
}
