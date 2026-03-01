import User from "@/src/models/user";
import { NewUser } from "../shared/types/newUser";

export async function createUser(user: NewUser) {
  try {
    await User.create(user);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create a user");
  }
}
