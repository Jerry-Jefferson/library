import { userMessages } from "@/src/shared/constants/userMessages";
import * as z from "zod/v4";

export const genresCreationSchema = z.object({
  title: z.string().min(1, userMessages.genresValidation.titleRequired),
});

export type GenresCreationSchema = z.infer<typeof genresCreationSchema>;
