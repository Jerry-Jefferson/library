import { IReview, IReviewSerialized, Review } from "@/src/models/review";
import { z } from "zod/v4";
import { reviewCreationSchema, reviewUpdateSchema } from "./review.schema";
import { revalidateTag } from "next/cache";
import { connectMongo } from "@/lib/mongoose";

export function serializeReview(review: IReview): IReviewSerialized {
  return {
    _id: review._id.toString(),
    bookId: review.bookId.toString(),
    userId: review.userId.toString(),
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt?.toISOString(),
    updatedAt: review.updatedAt?.toISOString(),
  };
}
export async function createReview(data: unknown) {
  try {
    await connectMongo();

    const parsed = reviewCreationSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid review data",
        errors: z.treeifyError(parsed.error),
        errorMessage: z.prettifyError(parsed.error),
      };
    }

    const review = await Review.create(parsed.data);

    revalidateTag(`reviews-book-${parsed.data.bookId.toString()}`, "max");

    return {
      success: true,
      data: serializeReview(review.toObject()),
    };
  } catch (error) {
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

    const { id, ...updates } = parsed.data;

    const review = await Review.findByIdAndUpdate(id, { $set: updates }, { new: true });

    if (!review) {
      return {
        success: false,
        message: "Review not found",
      };
    }

    revalidateTag(`review-${id}`, "max");

    return {
      success: true,
      data: serializeReview(review.toObject()),
    };
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

    revalidateTag(`reviews-book-${review.bookId.toString()}`, "max");
    revalidateTag(`review-${id}`, "max");

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
