"use server";

import { connectMongo } from "@/lib/mongoose";
import { AuthError } from "next-auth";
import { signInSchema } from "@/src/app/[locale]/(auth)/signIn/components/signIn.schema";
import { signIn } from "../../auth";
import { userMessages } from "@/src/shared/constants/userMessages";

export async function signin(data: unknown) {
  try {
    await connectMongo();
    const validatedData = signInSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        message: userMessages.auth.invalidFormData,
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
      message: userMessages.auth.signedIn,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof AuthError) {
      return {
        success: false,
        message: userMessages.auth.emailOrPassword,
      };
    }

    return {
      success: false,
      message: userMessages.auth.wentWrong,
    };
  }
}
