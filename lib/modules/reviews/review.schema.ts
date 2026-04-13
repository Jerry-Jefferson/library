import * as z from "zod/v4";

export const reviewCreationSchema = z.object({
  bookId: z.string(),
  userId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
});

export type ReviewCreationSchema = z.infer<typeof reviewCreationSchema>;

export const reviewUpdateSchema = z
  .object({
    id: z.string(),
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().min(10).optional(),
  })
  .refine((data) => data.rating !== undefined || data.comment !== undefined, {
    message: "At least one field must be provided",
  });

export type ReviewUpdateSchema = z.infer<typeof reviewUpdateSchema>;
