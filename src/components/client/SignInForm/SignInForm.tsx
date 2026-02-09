import { routes } from "@/src/constants/routes";
import Link from "next/link";
import { Button } from "../button/Button";
import { Input } from "../input/Input";

export function SignInForm() {
  return (
    <div className="flex flex-col gap-6 w-[50%]">
      <div>
        <h1 className="text-2xl">Welcome Back</h1>
        <p className="text-secondary text-xl">Sign in to access your digital bookshelf</p>
      </div>
      <Input name="Email" type="email" />
      <Input name="Password" type="password" />
      <Button content="Sign in" />
      <div>
        <div className="flex gap-4 justify-between">
          <p className="text-secondary">Don&apos;t have an account?</p>
          <Link
            href={routes.signUp}
            className="text-primary hover:text-primary-hover focus:border-primary"
          >
            Create an account
          </Link>
        </div>
        <div className="flex gap-4 justify-between">
          <p className="text-secondary">Forgot password?</p>
          <Link
            href={routes.recovery}
            className="text-primary hover:text-primary-hover focus:border-primary"
          >
            Recover
          </Link>
        </div>
      </div>
    </div>
  );
}
