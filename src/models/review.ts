import mongoose, { Schema } from "mongoose";

export interface IReview {
  bookId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
}

const ReviewSchema = new Schema<IReview>({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number },
  comment: { type: String },
});

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
