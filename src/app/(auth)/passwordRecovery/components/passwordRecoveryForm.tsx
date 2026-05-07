"use client";

import { FormInput } from "@/src/components/client/input/variants/formInput/formInput";
import { Tooltip } from "@/src/components/client/tooltip/tooltip";
import { routes } from "@/src/shared/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../components/client/button/button";
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
    formState: { errors, isValid, isSubmitting },
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
        <FormInput
          name="email"
          type="email"
          register={register}
          label="Email"
          errorMessage={errors.email?.message}
        />
        <Tooltip helpText={!isValid ? "Fill in all the fields" : ""}>
          <Button
            fullWidth
            size="medium"
            variant="primary"
            disabled={!isValid}
            isLoading={isSubmitting}
          >
            Send reset link
          </Button>
        </Tooltip>
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
