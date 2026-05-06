"use cache";

import { connectMongo } from "@/lib/mongoose";
import { IReview, IReviewSerialized, Review } from "@/src/models/review";
import { isBook, isUser } from "@/src/shared/types/typeGuards";
import { cacheLife, cacheTag } from "next/cache";

function serializeReview(review: IReview): IReviewSerialized {
  const user = review.userId;
  const userName = isUser(user) ? user.name : "Unknown user";
  const userId = isUser(review.userId) ? review.userId._id.toString() : review.userId.toString();

  const book = review.bookId;
  const bookTitle = isBook(book) ? book.title : "";

  return {
    _id: review._id.toString(),
    bookId: review.bookId.toString(),
    bookTitle: bookTitle,
    userId: userId,
    userName: userName,
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

  const reviews = await Review.find({ bookId })
    .sort({ createdAt: -1 })
    .populate("userId", "name")
    .populate("bookId", "title")
    .lean<IReview[]>();

  return reviews.map(serializeReview);
}

export async function getReviewById(id: string): Promise<IReviewSerialized | null> {
  cacheLife("hours");
  cacheTag(`review-${id}`);

  await connectMongo();

  const review = await Review.findById(id)
    .populate("userId", "name")
    .populate("bookId", "title")
    .lean<IReview>();

  if (!review) return null;

  return serializeReview(review);
}

export async function getReviewsByUserId(id: string): Promise<IReviewSerialized[] | null> {
  cacheLife("hours");
  cacheTag(`reviews-user-${id}`);
  cacheTag("all-user-reviews");

  await connectMongo();

  const reviews = await Review.find({ userId: id }).populate("bookId", "title").lean<IReview[]>();

  if (!reviews || reviews.length === 0) return null;

  return reviews ? reviews.map(serializeReview) : null;
}
