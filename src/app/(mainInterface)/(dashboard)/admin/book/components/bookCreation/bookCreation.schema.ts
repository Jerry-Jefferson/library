import * as z from "zod/v4";

export const bookCreationSchema = z.object({
  title: z.string().min(1, "Enter the book's title"),
  description: z.string().min(10, "Write a longer synopsis"),
  authorId: z.string().min(1, "Choose an author"),
  year: z.coerce
    .number<number>()
    .min(1, "Enter a valid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  genres: z.array(z.string()).min(1, "Select at least one genre"),
  imageUrl: z.string(),
});

export type BookCreationSchema = z.infer<typeof bookCreationSchema>;
