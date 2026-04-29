import * as z from "zod/v4";

export const bookCreationSchema = z
  .object({
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
    image: z.union([z.string(), z.instanceof(File)]).nullable(),
  })
  .refine(
    (data) => {
      if (!data.image || data.image instanceof File === false) return true;
      return data.image.size <= 10 * 1024 * 1024;
    },
    { message: "File must be less than 10MB", path: ["image"] }
  )
  .refine(
    (data) => {
      if (!data.image || data.image instanceof File === false) return true;
      return ["image/jpeg", "image/png", "image/webp"].includes(data.image.type);
    },
    { message: "Only .jpeg, .png, .webp are allowed", path: ["image"] }
  );

export type BookCreationSchema = z.infer<typeof bookCreationSchema>;
