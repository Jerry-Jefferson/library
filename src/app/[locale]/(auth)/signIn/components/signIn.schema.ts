import * as z from "zod/v4";

export const signInSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(1, "Please enter your password"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
