"use client";

import { signin } from "@/src/actions/auth/signin";
import { FormInput } from "@/src/components/client/input/variants/formInput/formInput";
import { routes } from "@/src/shared/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { signInSchema, SignInSchema } from "./signIn.schema";
import { Button } from "@/src/components/client/button/button";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Auth");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || routes.home;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
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
        toast.error(t(`userMessages.${result.message}`));
        return;
      }
      toast.success(t(`userMessages.${result.message}`));
      reset();
      navigate.push(callbackUrl);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-6 w-[70%] sm:w-[50%]">
      <div>
        <h1 className="text-2xl">{t("signIn.welcomeBack")}</h1>
        <p className="text-secondary text-md sm:text-xl">{t("signIn.signInToAccess")}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormInput
          name="email"
          type="email"
          register={register}
          label={t("base.email")}
          errorMessage={errors.email?.message}
        />
        <FormInput
          name="password"
          password
          register={register}
          label={t("base.password")}
          errorMessage={errors.password?.message}
        />
        <Button
          fullWidth
          size="medium"
          variant="primary"
          disabled={!isValid}
          isLoading={isSubmitting}
        >
          {t("signIn.signIn")}
        </Button>
      </form>
      <div>
        <div className="flex gap-4 justify-between">
          <p className="text-secondary text-xs md:text-sm lg:text-base">
            {t("signIn.doNotHaveAccount")}
          </p>
          <Link
            href={routes.signUp}
            className="text-primary text-xs md:text-sm lg:text-base hover:text-primary-hover focus:border-primary"
          >
            {t("signIn.create")}
          </Link>
        </div>
        <div className="flex gap-4 justify-between">
          <p className="text-secondary text-xs md:text-sm lg:text-base">
            {t("passwordReset.forgotPassword")}
          </p>
          <Link
            href={routes.recovery}
            className="text-primary text-xs md:text-sm lg:text-base hover:text-primary-hover focus:border-primary"
          >
            {t("signIn.recover")}
          </Link>
        </div>
      </div>
    </div>
  );
}
