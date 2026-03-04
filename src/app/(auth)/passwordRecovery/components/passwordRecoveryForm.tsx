"use client";

import { routes } from "@/src/shared/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../components/client/button/button";
import { Input } from "../../../../components/client/input/input";
import { passwordRecoverySchema, PasswordRecoverySchema } from "./passwordRecovery.schema";

const passRecoveryFields = {
  email: "email",
} as const;

const defaultPassRecoveryValues = {
  [passRecoveryFields.email]: "",
};

export function PasswordRecoveryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm<PasswordRecoverySchema>({
    resolver: zodResolver(passwordRecoverySchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: defaultPassRecoveryValues,
  });

  useLayoutEffect(() => {
    setFocus(passRecoveryFields.email);
  }, [setFocus]);

  const onSubmit = (data: PasswordRecoverySchema) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-6 w-[50%]">
      <div>
        <h1 className="text-2xl">Forgot Password?</h1>
        <p className="text-secondary text-xl">
          Enter your email to reset password and regain access to your collection
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input name="email">
          <Input.Field type="email" register={register} />
          <Input.Label label="Email" />
          <Input.TextError errorMessage={errors.email?.message} />
        </Input>
        <Button content="Send reset link" padding="medium" disabled={!isValid} />
      </form>
      <Link
        href={routes.signIn}
        className="text-primary self-center hover:text-primary-hover focus:border-primary"
      >
        Back to Sign In
      </Link>
    </div>
  );
}
