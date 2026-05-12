import { z } from "zod/v4";

export const baseSignUpSchema = z.object({
  name: z
    .string()
    .min(4, "At least 4 characters required")
    .max(26, "Login must be under 26 characters")
    .regex(/^[A-Za-zА-Яа-яЁё0-9._@'\s-]+$/, "Only letters, numbers, and . _ @ ' - are allowed"),
  email: z.email({ message: "Invalid email" }),
  role: z.enum(["USER", "ADMIN"]),
  password: z
    .string()
    .min(6, "At least 6 characters required")
    .max(18, "Password must be under 18 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,_-])[A-Za-z\d!@#$%^&*.,_-]+$/,
      "Use Latin letters, 1 uppercase, 1 number, and 1 special (!@#$%^&*.,_-)"
    ),
});

export const signUpSchema = baseSignUpSchema
  .extend({
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords must match",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
