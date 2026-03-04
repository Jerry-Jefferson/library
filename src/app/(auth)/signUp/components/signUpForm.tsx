"use client";

import { roleOption } from "@/src/actions/getRoles";
import { signin } from "@/src/actions/signin";
import { signup } from "@/src/actions/signup";
import { Button } from "@/src/components/client/button/button";
import { Input } from "@/src/components/client/input/input";
import { RadioButton } from "@/src/components/server/radioButton/radioButton";
import { routes } from "@/src/shared/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signUpSchema, SignUpSchema } from "./signUp.schema";

const signUpFields = {
  name: "name",
  email: "email",
  role: "role",
  password: "password",
  confirmPassword: "confirmPassword",
} as const;

const defaultSignUpValues = {
  [signUpFields.name]: "",
  [signUpFields.email]: "",
  [signUpFields.password]: "",
  [signUpFields.confirmPassword]: "",
};

export function SignUpForm({ roleOptions }: { roleOptions: roleOption[] }) {
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setFocus,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: defaultSignUpValues,
  });

  useLayoutEffect(() => {
    setFocus(signUpFields.name);
  }, [setFocus]);

  async function onSubmit({ name, email, role, password }: Omit<SignUpSchema, "confirmPassword">) {
    try {
      const result = await signup({ name, email, role, password });
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      const signinResult = await signin({ email, password });
      if (!signinResult.success) {
        toast.error(signinResult.message);
        return;
      }
      reset();
      navigate.push(routes.home);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-6 w-[50%]">
      <div>
        <h1 className="text-2xl">Create an account</h1>
        <p className="text-secondary text-xl">Start your literary journey today</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input name="name">
          <Input.Field type="text" register={register} />
          <Input.Label label="Name" />
          <Input.TextError errorMessage={errors.name?.message} />
        </Input>
        <Input name="email">
          <Input.Field type="email" register={register} />
          <Input.Label label="Email" />
          <Input.TextError errorMessage={errors.email?.message} />
        </Input>
        <RadioButton legend="Choose Role" name="role" options={roleOptions} register={register} />
        <Input name="password">
          <Input.Field type="password" register={register} />
          <Input.Label label="Password" />
          <Input.TextError errorMessage={errors.password?.message} />
        </Input>
        <Input name="confirmPassword">
          <Input.Field type="password" register={register} />
          <Input.Label label="Confirm password" />
          <Input.TextError errorMessage={errors.confirmPassword?.message} />
        </Input>
        <Button content="Create Account" padding="medium" disabled={!isValid} />
      </form>
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
