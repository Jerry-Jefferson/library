import mongoose, { Query, Schema } from "mongoose";
import { UserRole } from "../shared/types/newUser";
import { Review } from "@/src/models/review";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  favorites: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [4, "Name is too short"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: { values: ["USER", "ADMIN"], message: "{VALUE} is not supported" },
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
