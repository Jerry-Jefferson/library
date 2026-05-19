"use server";

import { connectMongo } from "@/lib/mongoose";
import { baseSignUpSchema } from "@/src/app/[locale]/(auth)/signUp/components/signUp.schema";
import User from "@/src/models/user";
import { createUser } from "@/src/queries/users";
import bcrypt from "bcrypt";
import { userMessages } from "@/src/shared/constants/userMessages";

export async function signup(data: unknown) {
  try {
    await connectMongo();

    const validatedData = baseSignUpSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        message: userMessages.auth.invalidFormData,
        errors: validatedData.error.flatten().fieldErrors,
      };
    }
    const { name, email, role, password } = validatedData.data;

    const existingUser = await User.exists({ email: email.toLowerCase() });
    if (existingUser) {
      console.error("User already exists");
      return {
        success: false,
        message: userMessages.auth.emailExist,
        errors: { email: [userMessages.auth.emailExist] },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role,
      password: hashedPassword,
    });
    return { success: true, message: userMessages.auth.accountCreated };
  } catch (error) {
    console.error(userMessages.auth.signUpError, error);
    return {
      success: false,
      message: userMessages.auth.wentWrong,
    };
  }
}
