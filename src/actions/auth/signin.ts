"use server";

import { connectMongo } from "@/lib/mongoose";
import { AuthError } from "next-auth";
import { signInSchema } from "../../app/(auth)/signIn/components/signIn.schema";
import { signIn } from "../../auth";

export async function signin(data: unknown) {
  try {
    await connectMongo();
    const validatedData = signInSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid form data",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }
    const { email, password } = validatedData.data;

    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    console.error(error);

    if (error instanceof AuthError) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
