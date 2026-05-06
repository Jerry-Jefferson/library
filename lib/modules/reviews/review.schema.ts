import * as z from "zod/v4";

export const baseReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
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
    message: "At least one field must be provided",
  });

export type ReviewUpdateSchema = z.infer<typeof reviewUpdateSchema>;
