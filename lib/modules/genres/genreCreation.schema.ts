import * as z from "zod/v4";

export const genreCreationSchema = z.object({
  title: z.string().min(1, "Enter the genre's title"),
});

export type GenreCreationSchema = z.infer<typeof genreCreationSchema>;
