import { userMessages } from "@/src/shared/constants/userMessages";
import * as z from "zod/v4";

export const signInSchema = z.object({
  email: z.email({ message: userMessages.authValidation.invalidEmail }),
  password: z.string().min(1, userMessages.authValidation.passwordRequired),
});

export type SignInSchema = z.infer<typeof signInSchema>;
