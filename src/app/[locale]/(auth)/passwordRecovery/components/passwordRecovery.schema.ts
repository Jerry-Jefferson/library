import * as z from "zod/v4";

export const passwordRecoverySchema = z.object({
  email: z.email({ message: "invalidEmail" }),
});

export type PasswordRecoverySchema = z.infer<typeof passwordRecoverySchema>;
