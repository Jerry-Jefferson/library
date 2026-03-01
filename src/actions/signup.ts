"use server";

import { connectMongo } from "@/lib/mongoose";
import User from "@/src/models/user";
import bcrypt from "bcrypt";
import { baseSignUpSchema } from "../app/(auth)/signUp/components/signUp.schema";
import { createUser } from "../queries/users";

export async function signup(data: unknown) {
  try {
    await connectMongo();

    const validatedData = baseSignUpSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid form data",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }
    const { name, email, role, password } = validatedData.data;

    const existingUser = await User.exists({ email: email.toLowerCase() });
    if (existingUser) {
      console.error("User already exists");
      return {
        success: false,
        message: "User with this email already exists",
        errors: { email: ["User with this email already exists"] },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role,
      password: hashedPassword,
    });
    return { success: true, message: "Account created successfully" };
  } catch (error) {
    console.error("Sign up error", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later",
    };
  }
}
