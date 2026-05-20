import { userMessages } from "@/src/shared/constants/userMessages";
import * as z from "zod/v4";

export const bookCreationSchema = z
  .object({
    title: z.string().min(1, userMessages.booksValidation.titleRequired),
    description: z.string().min(10, userMessages.booksValidation.descriptionTooShort),
    authorId: z.string({ message: userMessages.booksValidation.authorRequired }),
    year: z.coerce
      .number<number>({ message: userMessages.booksValidation.yearInvalid })
      .int({ message: userMessages.booksValidation.yearInvalid })
      .min(1, userMessages.booksValidation.yearInvalid)
      .max(new Date().getFullYear(), userMessages.booksValidation.yearFuture)
      .nullable(),
    genres: z.array(z.string()).min(1, userMessages.booksValidation.genresRequired),
    image: z.union([z.string(), z.instanceof(File)]).nullable(),
    quote: z.string().min(10, userMessages.booksValidation.quoteLength),
  })
  .refine(
    (data) => {
      if (!data.image || !(data.image instanceof File)) return true;
      return data.image.size <= 10 * 1024 * 1024;
    },
    {
      message: userMessages.booksValidation.imageTooLarge,
      path: ["image"],
    }
  )
  .refine(
    (data) => {
      if (!data.image || !(data.image instanceof File)) return true;
      return ["image/jpeg", "image/png", "image/webp"].includes(data.image.type);
    },
    {
      message: userMessages.booksValidation.imageInvalidType,
      path: ["image"],
    }
  );

export type BookCreationSchema = z.infer<typeof bookCreationSchema>;
