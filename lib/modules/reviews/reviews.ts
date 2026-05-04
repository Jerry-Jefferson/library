"use cache";

import { connectMongo } from "@/lib/mongoose";
import { IReview, IReviewSerialized, Review } from "@/src/models/review";
import { cacheLife, cacheTag } from "next/cache";

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

export async function getReviewsByBookId(bookId: string): Promise<IReviewSerialized[]> {
  cacheLife("hours");
  cacheTag(`reviews-book-${bookId}`);

  await connectMongo();

  const reviews = await Review.find({ bookId }).sort({ createdAt: -1 }).lean<IReview[]>();

  return reviews.map(serializeReview);
}

export async function getReviewById(id: string): Promise<IReviewSerialized | null> {
  cacheLife("hours");
  cacheTag(`review-${id}`);

  await connectMongo();

  const review = await Review.findById(id).lean<IReview>();

  if (!review) return null;

  return serializeReview(review);
}
