import mongoose, { Schema } from "mongoose";

export interface IAuthor {
  name: string;
  bio: string;
  birthDate: Date;
}

const AuthorSchema = new Schema<IAuthor>({
  name: { type: String, required: [true, "Author's name is required"] },
  bio: { type: String, required: [true, "Author's biography is required"] },
  birthDate: { type: Date },
});

export const Author = mongoose.models.Author || mongoose.model<IAuthor>("Author", AuthorSchema);
