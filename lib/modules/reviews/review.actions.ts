"use server";

import { connectMongo } from "@/lib/mongoose";
import { auth } from "@/src/auth";
import { Review } from "@/src/models/review";
import { isMongoError } from "@/src/shared/types/typeGuards";
import { revalidateTag, updateTag } from "next/cache";
import { z } from "zod/v4";
import { reviewCreationSchema, reviewUpdateSchema } from "./review.schema";

export async function createReview(data: unknown) {
  try {
    await connectMongo();

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return { success: false, message: "You must be logged in" };
    }

    const fullData = typeof data === "object" && data !== null ? { ...data, userId } : { userId };

    const parsed = reviewCreationSchema.safeParse(fullData);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid review data",
        errors: z.treeifyError(parsed.error),
        errorMessage: z.prettifyError(parsed.error),
      };
    }

    await Review.create(parsed.data);

    const bookId = parsed.data.bookId.toString();

    revalidateTag(`reviews-book-${bookId}`, "max");
    updateTag("books");
    updateTag(`book-${bookId}`);
    updateTag(`reviews-user-${userId}`);

    return { success: true, message: "The review has been successfully sent" };
  } catch (error) {
    if (isMongoError(error) && error.code === 11000) {
      return {
        success: false,
        message: "You have written a review to this book",
      };
    }
    console.error("DB error in createReview", error);

    return {
      success: false,
      message: "Failed to create review",
    };
  }
}

export async function updateReview(data: unknown) {
  try {
    await connectMongo();

    const parsed = reviewUpdateSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid review data",
        errors: z.treeifyError(parsed.error),
        errorMessage: z.prettifyError(parsed.error),
      };
    }

    const { _id, ...updates } = parsed.data;

    const review = await Review.findByIdAndUpdate(_id, { $set: updates }, { new: true });

    if (!review) {
      return {
        success: false,
        message: "Review not found",
      };
    }

    const bookId = review.bookId.toString();
    const userId = review.userId.toString();

    updateTag(`review-${_id}`);
    updateTag(`reviews-book-${bookId}`);
    updateTag(`book-${bookId}`);
    updateTag("books");
    updateTag(`reviews-user-${userId}`);

    return { success: true, message: "The review has been successfully edited" };
  } catch (error) {
    console.error("DB error in updateReview", error);

    return {
      success: false,
      message: "Failed to update review",
    };
  }
}

export async function deleteReview(id: string) {
  try {
    await connectMongo();

    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return {
        success: false,
        message: "Review not found",
      };
    }

    const bookId = review.bookId.toString();
    const userId = review.userId.toString();

    updateTag(`review-${id}`);
    updateTag(`reviews-book-${bookId}`);
    updateTag(`book-${bookId}`);
    updateTag("books");
    updateTag(`reviews-user-${userId}`);

    return {
      success: true,
      message: "Review deleted successfully",
    };
  } catch (error) {
    console.error("DB error in deleteReview", error);

    return {
      success: false,
      message: "Failed to delete review",
    };
  }
}
