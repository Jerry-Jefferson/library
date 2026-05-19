import { userMessages } from "@/src/shared/constants/userMessages";
import * as z from "zod/v4";

export const baseReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, userMessages.reviewValidation.commentMin),
});

export type BaseReviewSchema = z.infer<typeof baseReviewSchema>;

export const reviewCreationSchema = baseReviewSchema.extend({
  bookId: z.string(),
  userId: z.string(),
});

export type ReviewCreationSchema = z.infer<typeof reviewCreationSchema>;

export const reviewUpdateSchema = z
  .object({
    _id: z.string(),
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().min(10).optional(),
  })
  .refine((data) => data.rating !== undefined || data.comment !== undefined, {
    message: userMessages.reviewValidation.atLeastOneField,
  });

export type ReviewUpdateSchema = z.infer<typeof reviewUpdateSchema>;
