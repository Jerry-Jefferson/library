"use client";

import { FormInput } from "@/src/components/client/input/variants/formInput/formInput";
import { Tooltip } from "@/src/components/client/tooltip/tooltip";
import { routes } from "@/src/shared/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { passwordRecoverySchema, PasswordRecoverySchema } from "./passwordRecovery.schema";
import { Button } from "@/src/components/client/button/button";
import { useTranslations } from "next-intl";

const passRecoveryFields = {
  email: "email",
} as const;

const defaultPassRecoveryValues = {
  [passRecoveryFields.email]: "",
};

export function PasswordRecoveryForm() {
  const t = useTranslations("");
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
    <div className="flex flex-col gap-6 w-[70%] sm:w-[50%]">
      <div>
        <h1 className="text-2xl"> {t("Auth.passwordReset.forgotPassword")}</h1>
        <p className="text-secondary text-md sm:text-xl">{t("Auth.passwordReset.enterEmail")}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormInput
          name="email"
          type="email"
          register={register}
          label={t("Auth.base.email")}
          errorMessage={
            errors.email?.message ? t(`Auth.authValidation.${errors.email.message}`) : undefined
          }
        />
        <Tooltip helpText={!isValid ? t(`Common.fillAllFields`) : ""}>
          <Button
            fullWidth
            size="medium"
            variant="primary"
            disabled={!isValid}
            isLoading={isSubmitting}
          >
            {t("Auth.passwordReset.sendLink")}
          </Button>
        </Tooltip>
      </form>
      <Link
        href={routes.signIn}
        className="text-primary self-center hover:text-primary-hover focus:border-primary text-xs md:text-sm lg:text-base"
      >
        {t("Auth.passwordReset.backToSignIn")}
      </Link>
    </div>
  );
}
