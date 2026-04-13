import mongoose, { Schema, Types } from "mongoose";

export interface IReviewSerialized extends Omit<
  IReview,
  "_id" | "bookId" | "userId" | "createdAt" | "updatedAt"
> {
  _id: string;
  bookId: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface IReview {
  _id: Types.ObjectId;
  bookId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ bookId: 1, userId: 1 }, { unique: true });

export const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
