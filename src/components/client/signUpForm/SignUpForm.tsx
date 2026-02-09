import { routes } from "@/src/constants/routes";
import Link from "next/link";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { RadioButton } from "../radioButton/RadioButton";

const options = [
  { name: "Role", value: "User" },
  { name: "Role", value: "Admin" },
];

export function SignUpForm() {
  return (
    <div className="flex flex-col gap-6 w-[50%]">
      <div>
        <h1 className="text-2xl">Create an account</h1>
        <p className="text-secondary text-xl">Start your literary journey today</p>
      </div>
      <Input name="Name" type="text" />
      <Input name="Email" type="email" />
      <RadioButton legend="Choose Role" options={options} />
      <Input name="Password" type="password" />
      <Input name="Confirm Password" type="password" />
      <Button content="Create Account" />
      <div>
        <div className="flex gap-4 justify-between">
          <p className="text-secondary">Already have an account?</p>
          <Link
            href={routes.signIn}
            className="text-primary hover:text-primary-hover focus:border-primary"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
