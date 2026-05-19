"use server";

import { connectMongo } from "@/lib/mongoose";
import { auth } from "@/src/auth";
import { Review } from "@/src/models/review";
import { isMongoError } from "@/src/shared/types/typeGuards";
import { revalidateTag, updateTag } from "next/cache";
import { z } from "zod/v4";
import { reviewCreationSchema, reviewUpdateSchema } from "./review.schema";
import { userMessages } from "@/src/shared/constants/userMessages";

export async function createReview(data: unknown) {
  try {
    await connectMongo();

    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return { success: false, message: userMessages.common.unauthorized };
    }

    const fullData = typeof data === "object" && data !== null ? { ...data, userId } : { userId };

    const parsed = reviewCreationSchema.safeParse(fullData);

    if (!parsed.success) {
      return {
        success: false,
        message: userMessages.review.invalidReviewData,
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

    return { success: true, message: userMessages.review.reviewCreated };
  } catch (error) {
    if (isMongoError(error) && error.code === 11000) {
      return {
        success: false,
        message: userMessages.review.alreadyReviewed,
      };
    }
    console.error("DB error in createReview", error);

    return {
      success: false,
      message: userMessages.review.failedToCreateReview,
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
        message: userMessages.review.invalidReviewData,
        errors: z.treeifyError(parsed.error),
        errorMessage: z.prettifyError(parsed.error),
      };
    }

    const { _id, ...updates } = parsed.data;

    const review = await Review.findByIdAndUpdate(_id, { $set: updates }, { new: true });

    if (!review) {
      return {
        success: false,
        message: userMessages.review.reviewNotFound,
      };
    }

    const bookId = review.bookId.toString();
    const userId = review.userId.toString();

    updateTag(`review-${_id}`);
    updateTag(`reviews-book-${bookId}`);
    updateTag(`book-${bookId}`);
    updateTag("books");
    updateTag(`reviews-user-${userId}`);

    return { success: true, message: userMessages.review.reviewUpdated };
  } catch (error) {
    console.error("DB error in updateReview", error);

    return {
      success: false,
      message: userMessages.review.failedToUpdateReview,
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
        message: userMessages.review.reviewNotFound,
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
      message: userMessages.review.reviewDeleted,
    };
  } catch (error) {
    console.error("DB error in deleteReview", error);

    return {
      success: false,
      message: userMessages.review.failedToDeleteReview,
    };
  }
}
