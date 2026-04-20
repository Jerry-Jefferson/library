import * as z from "zod/v4";

export const authorCreationSchema = z
  .object({
    name: z.string().min(1, "Enter the author's name"),
    bio: z.string().min(10, "Write a biography"),
    birthYear: z.coerce
      .number<number>({ message: "Enter a valid year" })
      .int({ message: "Enter a valid year" })
      .positive({ message: "Enter a positive number" })
      .min(1, "Enter a valid year")
      .max(new Date().getFullYear(), "Year cannot be in the future")
      .nullable(),
    isAlive: z.coerce.boolean<boolean>(),
    deathYear: z.coerce
      .number<number>({ message: "Enter a valid year" })
      .int({ message: "Enter a valid year" })
      .positive({ message: "Enter a positive number" })
      .min(1, "Enter a valid year")
      .max(new Date().getFullYear(), "Year cannot be in the future")
      .optional()
      .nullable(),
    imageUrl: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.isAlive && !data.deathYear) {
        return false;
      }
      return true;
    },
    { message: "Add a death year if the author is no longer alive", path: ["deathYear"] }
  )
  .refine((data) => !(data.isAlive && data.deathYear), {
    message: "Cannot have a death year if the author is alive",
    path: ["deathYear"],
  })
  .refine(
    (data) => {
      if (!data.deathYear || !data.birthYear) {
        return true;
      }
      return data.deathYear > data.birthYear;
    },
    { message: "Death year must be after birth year", path: ["deathYear"] }
  );

export type AuthorCreationSchema = z.infer<typeof authorCreationSchema>;
