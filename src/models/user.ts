import mongoose, { Schema } from "mongoose";
import { Role } from "../types/roles";

type UserRole = Exclude<Role, "GUEST">;

export interface IUser {
  email: string;
  password: string;
  role: UserRole;
  favourites: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  email: String,
  password: String,
  role: { type: String, enum: ["USER", "ADMIN"] },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
