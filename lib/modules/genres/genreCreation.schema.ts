import * as z from "zod/v4";

export const genresCreationSchema = z.object({
  title: z.string().min(1, "Enter the genre's title"),
});

export type GenresCreationSchema = z.infer<typeof genresCreationSchema>;
