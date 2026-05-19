import * as z from "zod/v4";
import { userMessages } from "@/src/shared/constants/userMessages";

export const authorCreationSchema = z
  .object({
    name: z.string().min(1, userMessages.authorsValidation.nameRequired),

    bio: z.string().min(10, userMessages.authorsValidation.bioTooShort),

    birthYear: z.coerce
      .number<number>({
        message: userMessages.authorsValidation.yearInvalid,
      })
      .int({
        message: userMessages.authorsValidation.yearInvalid,
      })
      .positive({
        message: userMessages.authorsValidation.positiveNumber,
      })
      .min(1, userMessages.authorsValidation.yearInvalid)
      .max(new Date().getFullYear(), userMessages.authorsValidation.yearFuture)
      .nullable(),

    isAlive: z.coerce.boolean<boolean>().optional(),

    deathYear: z.coerce
      .number<number>({
        message: userMessages.authorsValidation.yearInvalid,
      })
      .int({
        message: userMessages.authorsValidation.yearInvalid,
      })
      .positive({
        message: userMessages.authorsValidation.positiveNumber,
      })
      .min(1, userMessages.authorsValidation.yearInvalid)
      .max(new Date().getFullYear(), userMessages.authorsValidation.yearFuture)
      .optional()
      .nullable(),

    image: z.union([z.string(), z.instanceof(File)]).nullable(),
  })

  .refine(
    (data) => {
      if (!data.isAlive && !data.deathYear) {
        return false;
      }
      return true;
    },
    {
      message: userMessages.authorsValidation.deathYearRequired,
      path: ["deathYear"],
    }
  )

  .refine((data) => !(data.isAlive && data.deathYear), {
    message: userMessages.authorsValidation.aliveAuthorDeathYear,
    path: ["deathYear"],
  })

  .refine(
    (data) => {
      if (!data.deathYear || !data.birthYear) {
        return true;
      }

      return data.deathYear > data.birthYear;
    },
    {
      message: userMessages.authorsValidation.deathBeforeBirth,
      path: ["deathYear"],
    }
  )

  .refine(
    (data) => {
      if (!data.image || !(data.image instanceof File)) return true;

      return data.image.size <= 10 * 1024 * 1024;
    },
    {
      message: userMessages.authorsValidation.imageTooLarge,
      path: ["image"],
    }
  )

  .refine(
    (data) => {
      if (!data.image || !(data.image instanceof File)) return true;

      return ["image/jpeg", "image/png", "image/webp"].includes(data.image.type);
    },
    {
      message: userMessages.authorsValidation.imageInvalidType,
      path: ["image"],
    }
  );

export const authorUpdateSchema = z
  .object({
    name: z.string().min(1, userMessages.authorsValidation.nameRequired),

    bio: z.string().min(10, userMessages.authorsValidation.bioTooShort),

    birthYear: z.coerce.number().int().positive().max(new Date().getFullYear()).nullable(),

    deathYear: z.coerce
      .number()
      .int()
      .positive()
      .max(new Date().getFullYear())
      .optional()
      .nullable(),

    image: z.union([z.string(), z.instanceof(File)]).nullable(),
  })

  .refine(
    (data) => {
      if (!data.deathYear || !data.birthYear) return true;

      return data.deathYear > data.birthYear;
    },
    {
      message: userMessages.authorsValidation.deathBeforeBirth,
      path: ["deathYear"],
    }
  );

export type AuthorCreationSchema = z.infer<typeof authorCreationSchema>;
