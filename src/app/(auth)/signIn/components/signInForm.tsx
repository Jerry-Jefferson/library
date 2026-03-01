"use client";

import { signin } from "@/src/actions/signin";
import { routes } from "@/src/shared/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../../../components/client/input/input";
import { Button } from "../../../../components/server/button/button";
import { signInSchema, SignInSchema } from "./signIn.schema";

const signinFields = {
  email: "email",
  password: "password",
} as const;

const defaultSignInValues = {
  [signinFields.email]: "",
  [signinFields.password]: "",
};

export function SignInForm() {
  const navigate = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setFocus,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: defaultSignInValues,
  });

  useLayoutEffect(() => {
    setFocus(signinFields.email);
  }, [setFocus]);

  async function onSubmit({ email, password }: SignInSchema) {
    try {
      const result = await signin({ email, password });
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      reset();
      navigate.push(callbackUrl);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-6 w-[50%]">
      <div>
        <h1 className="text-2xl">Welcome Back</h1>
        <p className="text-secondary text-xl">Sign in to access your digital bookshelf</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input name="email">
          <Input.Field type="email" register={register} />
          <Input.Label label="Email" />
          <Input.TextError errorMessage={errors.email?.message} />
        </Input>
        <Input name="password">
          <Input.Field type="password" register={register} />
          <Input.Label label="Password" />
          <Input.TextError errorMessage={errors.password?.message} />
        </Input>
        <Button content="Sign in" disabled={!isValid} />
      </form>
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
