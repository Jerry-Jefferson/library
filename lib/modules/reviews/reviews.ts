"use cache";

import { connectMongo } from "@/lib/mongoose";
import { Review, IReview, IReviewSerialized } from "@/src/models/review";
import { cacheLife, cacheTag } from "next/cache";

function serializeReview(review: IReview): IReviewSerialized {
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

export async function createReview({
  bookId,
  userId,
  rating,
  comment,
}: {
  bookId: string;
  userId: string;
  rating: number;
  comment: string;
}): Promise<IReviewSerialized> {
  await connectMongo();

  const review = await Review.create({
    bookId,
    userId,
    rating,
    comment,
  });

  return serializeReview(review.toObject());
}

export async function updateReview({
  id,
  rating,
  comment,
}: {
  id: string;
  rating?: number;
  comment?: string;
}): Promise<IReviewSerialized | null> {
  await connectMongo();

  const review = await Review.findByIdAndUpdate(
    id,
    {
      ...(rating !== undefined && { rating }),
      ...(comment !== undefined && { comment }),
    },
    { new: true }
  ).lean<IReview>();

  if (!review) return null;

  return serializeReview(review);
}

export async function deleteReview(id: string): Promise<boolean> {
  await connectMongo();

  const review = await Review.findByIdAndDelete(id);

  if (!review) return false;

  return true;
}
