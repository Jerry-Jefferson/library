import mongoose, { Schema, Types } from "mongoose";

export interface IGenre {
  _id: Types.ObjectId;
  title: string;
}

export interface IGenreSerialized extends Omit<IGenre, "_id"> {
  _id: string;
}

const GenreSchema = new Schema<IGenre>({
  title: {
    type: String,
    required: [true, "Genre name is required"],
    unique: true,
    trim: true,
  },
});

export const Genre = mongoose.models.Genre || mongoose.model<IGenre>("Genre", GenreSchema);
