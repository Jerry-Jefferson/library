import mongoose, { Schema, Types } from "mongoose";

export interface IReview {
  _id: Types.ObjectId;
  bookId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReviewSerialized extends Omit<
  IReview,
  "_id" | "bookId" | "userId" | "createdAt" | "updatedAt"
> {
  _id: string;
  bookId: string;
  bookTitle: string;
  userId: string;
  userName: string;
  createdAt?: string;
  updatedAt?: string;
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

const updateBookRating = async (bookId: Types.ObjectId) => {
  const stats = await mongoose
    .model("Review")
    .aggregate([
      { $match: { bookId: bookId } },
      { $group: { _id: "$bookId", rating: { $avg: "$rating" } } },
    ]);

  if (stats.length > 0) {
    await mongoose
      .model("Book")
      .findByIdAndUpdate(bookId, { rating: Math.round(stats[0].rating * 10) / 10 });
  } else {
    await mongoose.model("Book").findByIdAndUpdate(bookId, { rating: 0 });
  }
};

ReviewSchema.post("save", async function () {
  await updateBookRating(this.bookId);
});
ReviewSchema.post("findOneAndDelete", async function (doc) {
  await updateBookRating(doc.bookId);
});

export const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
