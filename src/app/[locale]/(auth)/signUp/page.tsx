import { getRoles } from "@/src/actions/auth/getRoles";
import { SignUpForm } from "@/src/app/[locale]/(auth)/signUp/components/signUpForm";

export default async function SignUp() {
  const roles = await getRoles();
  return <SignUpForm roleOptions={roles} />;
}
