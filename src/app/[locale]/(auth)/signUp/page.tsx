import { getRoles } from "@/src/actions/auth/getRoles";
import { SignUpForm } from "@/src/app/[locale]/(auth)/signUp/components/signUpForm";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Auth",
  });

  return {
    title: t("signUpTitle"),
    description: t("signUpDescription"),

    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SignUp() {
  const roles = await getRoles();
  return <SignUpForm roleOptions={roles} />;
}
