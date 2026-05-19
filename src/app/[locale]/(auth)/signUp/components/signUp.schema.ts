import { z } from "zod/v4";
import { userMessages } from "@/src/shared/constants/userMessages";

export const baseSignUpSchema = z.object({
  name: z
    .string()
    .min(4, userMessages.authValidation.nameMin)
    .max(26, userMessages.authValidation.nameMax)
    .regex(/^[A-Za-zА-Яа-яЁё0-9._@'\s-]+$/, userMessages.authValidation.nameInvalid),

  email: z.email({
    message: userMessages.authValidation.invalidEmail,
  }),

  role: z.enum(["USER", "ADMIN"]),

  password: z
    .string()
    .min(6, userMessages.authValidation.passwordMin)
    .max(18, userMessages.authValidation.passwordMax)
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,_-])[A-Za-z\d!@#$%^&*.,_-]+$/,
      userMessages.authValidation.passwordWeak
    ),
});

export const signUpSchema = baseSignUpSchema
  .extend({
    confirmPassword: z.string().min(1, userMessages.authValidation.confirmPasswordRequired),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: userMessages.authValidation.passwordsMismatch,
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
