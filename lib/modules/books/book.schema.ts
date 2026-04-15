import * as z from "zod/v4";

export const bookCreationSchema = z.object({
  title: z.string().min(1, "Enter the book's title"),
  description: z.string().min(10, "Write a longer synopsis"),
  authorId: z.string({ message: "Choose an author" }),
  year: z.coerce
    .number<number>({ message: "Enter a valid year" })
    .int({ message: "Enter a valid year" })
    .min(1, "Enter a valid year")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .nullable(),
  genres: z.array(z.string()).min(1, "Select at least one genre"),
  imageUrl: z.string().min(1, "Please upload a cover image"),
});

export type BookCreationSchema = z.infer<typeof bookCreationSchema>;
