"use client";

import { roleOption } from "@/src/actions/auth/getRoles";
import { signin } from "@/src/actions/auth/signin";
import { signup } from "@/src/actions/auth/signup";
import { Button } from "@/src/components/client/button/button";
import { FormInput } from "@/src/components/client/input/variants/formInput/formInput";
import { Tooltip } from "@/src/components/client/tooltip/tooltip";
import { RadioButton } from "@/src/components/server/radioButton/radioButton";
import { routes } from "@/src/shared/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signUpSchema, SignUpSchema } from "./signUp.schema";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
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
        toast.error(t(`Auth.userMessages.${result.message}`));
        return;
      }
      toast.success(t(`Auth.userMessages.${result.message}`));
      const signinResult = await signin({ email, password });
      if (!signinResult.success) {
        toast.error(t(`Auth.userMessages.${result.message}`));
        return;
      }
      reset();
      navigate.push(routes.home);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-6 w-[70%] sm:w-[50%]">
      <div>
        <h1 className="text-2xl">{t("Auth.signUp.createAccount")}</h1>
        <p className="text-secondary text-md sm:text-xl">{t("Auth.signUp.startJourney")}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 sm:gap-6">
        <FormInput
          name="name"
          type="text"
          register={register}
          label={t("Auth.base.name")}
          errorMessage={
            errors.name?.message ? t(`Auth.authValidation.${errors.name.message}`) : undefined
          }
        />
        <FormInput
          name="email"
          type="email"
          register={register}
          label={t("Auth.base.email")}
          errorMessage={
            errors.email?.message ? t(`Auth.authValidation.${errors.email.message}`) : undefined
          }
        />
        <RadioButton
          legend={t("Auth.signUp.chooseRole")}
          name="role"
          options={roleOptions}
          register={register}
        />
        <FormInput
          name="password"
          password
          register={register}
          label={t("Auth.base.password")}
          errorMessage={
            errors.password?.message
              ? t(`Auth.authValidation.${errors.password.message}`)
              : undefined
          }
        />
        <FormInput
          name="confirmPassword"
          password
          register={register}
          label={t("Auth.signUp.confirmPassword")}
          errorMessage={
            errors.confirmPassword?.message
              ? t(`Auth.authValidation.${errors.confirmPassword.message}`)
              : undefined
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
            {t("Auth.signUp.createAccount")}
          </Button>
        </Tooltip>
      </form>
      <div>
        <div className="flex gap-4 justify-between">
          <p className="text-secondary text-xs md:text-sm lg:text-base">
            {t("Auth.signUp.haveAnAccount")}
          </p>
          <Link
            href={routes.signIn}
            className="text-primary hover:text-primary-hover focus:border-primary text-xs md:text-sm lg:text-base"
          >
            {t("Auth.signUp.signInHere")}
          </Link>
        </div>
      </div>
    </div>
  );
}
