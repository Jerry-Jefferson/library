import { routes } from "@/src/constants/routes";
import Link from "next/link";
import { Button } from "../button/Button";
import { Input } from "../input/Input";

export function PasswordRecoveryForm() {
  return (
    <div className="flex flex-col gap-6 w-[50%]">
      <div>
        <h1 className="text-2xl">Forgot Password?</h1>
        <p className="text-secondary text-xl">
          Enter your email to reset password and regain access to your collection
        </p>
      </div>
      <Input name="Email" type="email" />
      <Button content="Send reset link" />
      <Link
        href={routes.signIn}
        className="text-primary self-center hover:text-primary-hover focus:border-primary"
      >
        Back to Sign In
      </Link>
    </div>
  );
}
